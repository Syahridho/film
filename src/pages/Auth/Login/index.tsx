import { Link } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";
import { loginGoogle } from "../../../services/firebase/services";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log(form);
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
        <Button type="submit">Masuk</Button>
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
