import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./init";

export const loginGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return user;
};
