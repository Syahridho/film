import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "./init";

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

export const loginEmailPassword = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Login berhasil :", JSON.stringify(user));
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

export const loginGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      throw error;
    });
};
