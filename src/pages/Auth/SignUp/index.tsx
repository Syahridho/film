import AuthLayout from "../../../components/layout/AuthLayout";
import Input from "../../../components/element/Input";
import Button from "../../../components/element/Button";
import Form from "../../../components/fragments/Form";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";
import AuthOtherLayout from "../../../components/layout/AuthOtherLayout";

const SignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log(form);
  };
  return (
    <AuthLayout title="Daftar">
      <Form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" />
        <Input label="Password" type="password" name="password" />
        <Button type="submit">Daftar</Button>
      </Form>
      <AuthPrompt
        title="Sudah punya akun? sini"
        to="/login"
        linkTitle="Masuk"
      />
      <AuthOtherLayout />
    </AuthLayout>
  );
};

export default SignUp;
