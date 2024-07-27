import Button from "../../../components/element/Button";
import Input from "../../../components/element/Input";
import Form from "../../../components/fragments/Form";
import AuthLayout from "../../../components/layout/AuthLayout";
import AuthPrompt from "../../../components/layout/AuthPromptLayout";

const Forgot = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log(form.email.value);
  };

  return (
    <AuthLayout title="Lupa password">
      <Form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Button type="submit">Reset password</Button>
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
