import { Link } from "react-router-dom";
import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";

const Login = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log(form);
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
      <AuthOtherLayout />
    </AuthLayout>
  );
};

export default Login;
