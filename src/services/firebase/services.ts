import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, db } from "./init";
import { setUser } from "../../store/action";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const singUpEmailPassword = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`Registered user: ${JSON.stringify(user)}`);
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

export const loginEmailPassword = async (
  email: string,
  password: string,
  dispatch: any
) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login berhasil :", JSON.stringify(user));
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(user));
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

export const forgotPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const loginGoogle = async (dispatch: any) => {
  await signInWithPopup(auth, googleProvider)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch(setUser(user));
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return user;
    })
    .catch((error) => {
      throw error;
    });
};

export const signOutUser = async (dispatch: any) => {
  await signOut(auth)
    .then(() => {
      dispatch(setUser(null));
      localStorage.removeItem("user");
      console.log("berhasil log out");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addFavorite = async (idFilm: string, idUser: string) => {
  try {
    const data: any = { favorite: arrayUnion(idFilm) };
    const docRef = doc(db, "film", idUser);
    await updateDoc(docRef, data, { merge: true });

    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
