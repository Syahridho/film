import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";
import { loginGoogle } from "../../../services/firebase/services";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase/init";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;

    await signInWithEmailAndPassword(
      auth,
      form.email.value,
      form.password.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login berhasil :", JSON.stringify(user));
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleGoogle = async () => {
    try {
      const result = await loginGoogle();
      console.log("Login google : ", result);
      setSuccess(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout title="Masuk">
      <Form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Link
          to="/forgot"
          className="text-right italic text-sm underline text-blue-900"
        >
          Lupa Password
        </Link>
        <Button type="submit">{isLoading ? "Loading..." : "Masuk"}</Button>
      </Form>
      <AuthPrompt
        title="Belum punya akun? sini"
        to="/signup"
        linkTitle="Daftar"
      />
      <AuthOtherLayout onClick={() => handleGoogle()}>
        <FaGoogle />
        Masuk dengan google
      </AuthOtherLayout>
    </AuthLayout>
  );
};

export default Login;
