import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/init";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { loginGoogle } from "../../../services/firebase/services";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(false);
    const form = event.target as HTMLFormElement;

    await createUserWithEmailAndPassword(
      auth,
      form.email.value,
      form.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Registered user: ${JSON.stringify(user)}`);
        setSuccess(true);
        setIsLoading(false);
        form.reset();
      })
      .catch((error) => {
        setError(error.code);
        setIsLoading(false);
      });
  };

  const handleGoogle = async () => {
    try {
      const result = await loginGoogle();
      console.log("Login google : ", result);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout title="Daftar">
      <Form onSubmit={handleSubmit}>
        {success && (
          <div className="w-full bg-green-400 text-white p-4 border-2 border-green-500 rounded shadow">
            Berhasil daftar silahkan{" "}
            <Link to={"/login"} className="underline italic">
              Masuk
            </Link>
          </div>
        )}
        {error && (
          <div className="w-full bg-red-400 text-white p-4 border-2 border-red-500 rounded shadow">
            {error}
          </div>
        )}
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Button type="submit">{isLoading ? "Loading..." : "Daftar"}</Button>
      </Form>
      <AuthPrompt
        title="Sudah punya akun? sini"
        to="/login"
        linkTitle="Masuk"
      />
      <AuthOtherLayout onClick={() => handleGoogle()}>
        <FaGoogle />
        Masuk dengan google
      </AuthOtherLayout>
    </AuthLayout>
  );
};

export default SignUp;
