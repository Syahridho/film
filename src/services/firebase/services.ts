import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, googleProvider, db } from "./init";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { setFavorite, setUser } from "../../store/action";

// Tipe untuk data pengguna
interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dispatch = (action: any) => void;

export const signUpEmailPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(`Registered user: ${JSON.stringify(user)}`);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const loginEmailPassword = async (
  email: string,
  password: string,
  dispatch: Dispatch
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Login berhasil :", JSON.stringify(user));
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(setUser(userData));
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<boolean> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const loginGoogle = async (dispatch: Dispatch): Promise<User | null> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(setUser(userData));
    return user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const signOutUser = async (dispatch: Dispatch): Promise<void> => {
  try {
    await signOut(auth);
    dispatch(setUser(null));
    localStorage.removeItem("user");
    console.log("Berhasil log out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getUserFavorites = async (
  idUser: string,
  dispatch: Dispatch
): Promise<string[]> => {
  try {
    const docRef = doc(db, "film", idUser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as { favorite: string[] };
      dispatch(setFavorite(data.favorite));
      return data.favorite || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

export const addFavorite = async (
  idFilm: string,
  idUser: string
): Promise<void> => {
  try {
    const docRef = doc(db, "film", idUser);
    await setDoc(docRef, { favorite: arrayUnion(idFilm) }, { merge: true });
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (
  idFilm: string,
  idUser: string
): Promise<void> => {
  try {
    const docRef = doc(db, "film", idUser);
    await updateDoc(docRef, {
      favorite: arrayRemove(idFilm),
    });
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};
