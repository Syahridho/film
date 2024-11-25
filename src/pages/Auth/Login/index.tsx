import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";
import {
  loginEmailPassword,
  loginGoogle,
} from "../../../services/firebase/services";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { CodedError } from "@/types/global";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;

    try {
      await loginEmailPassword(form.email.value, form.password.value, dispatch);
      setIsLoading(false);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error && "code" in error) {
        const codedError = error as CodedError;
        switch (codedError.code) {
          case "auth/invalid-credential":
            setError("Email/Password salah");
            break;
          case "auth/weak-password":
            setError("Password minimal 6 karakter");
            break;
          case "auth/too-many-requests":
            setError("Terlalu banyak percobaan, coba lagi nanti");
            break;
          default:
            setError(codedError.code);
            break;
        }
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(false);
    setError(null);
    try {
      await loginGoogle(dispatch);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error && "code" in error) {
        const codeError = error as CodedError;
        setError(codeError.code);
      } else {
        setError("terjadi kesalahan yang tidak diketahui");
      }
    }
  };

  return (
    <AuthLayout title="Masuk">
      <Form onSubmit={handleSubmit}>
        {error && (
          <div className="w-full bg-red-400 text-white p-4 border-2 border-red-500 rounded shadow">
            {error}
          </div>
        )}
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Link
          to="/forgot"
          className="text-right italic text-sm underline text-blue-900"
        >
          Lupa Password
        </Link>
        <Button type={"submit"} disabled={isLoading}>
          {isLoading ? "Loading..." : "Masuk"}
        </Button>
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
