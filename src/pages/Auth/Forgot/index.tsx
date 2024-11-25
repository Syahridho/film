import { SetStateAction, useState } from "react";
import Button from "../../../components/element/Button";
import Input from "../../../components/element/Input";
import Form from "../../../components/fragments/Form";
import AuthLayout from "../../../components/layout/AuthLayout";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import { forgotPassword } from "../../../services/firebase/services";

const Forgot = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const form = event.target as HTMLFormElement;

    try {
      await forgotPassword(form.email.value);
      setIsLoading(false);
      setMessage("Silahkan cek email anda");
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Terjadi kesalahan yang tidak diketahui");
      }
      console.log(error);
    }
  };

  return (
    <AuthLayout title="Lupa password">
      <Form onSubmit={handleSubmit}>
        {message && (
          <div className="w-full bg-green-400 text-white p-4 border-2 border-green-500 rounded shadow">
            {message}
          </div>
        )}
        <Input label="Email" name="email" type="email" />
        <Button type="submit">
          {isLoading ? "Loading..." : "Reset Password"}
        </Button>
      </Form>
      <AuthPrompt
        title="Sudah ganti password? sini"
        to="/login"
        linkTitle="Masuk"
        or={false}
      />
    </AuthLayout>
  );
};

export default Forgot;
