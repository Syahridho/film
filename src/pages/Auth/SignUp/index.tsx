import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import {
  loginGoogle,
  singUpEmailPassword,
} from "../../../services/firebase/services";

const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    const form = event.target as HTMLFormElement;

    try {
      await singUpEmailPassword(form.email.value, form.password.value);
      setSuccess(true);
      setIsLoading(false);
      form.reset();
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email sudah digunakan");
          break;
        case "auth/weak-password":
          setError("Password minimal 6 karakter");
          break;
        default:
          setError("Error");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(false);
    setSuccess(false);
    setError(null);
    try {
      await loginGoogle();
      setSuccess(true);
      navigate("/");
    } catch (error: any) {
      setError(error);
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Daftar"}
        </Button>
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
