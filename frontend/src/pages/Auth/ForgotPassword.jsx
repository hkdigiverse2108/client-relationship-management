import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});
export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async ({ email }) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success(`Reset link sent to ${email}`);
  };
  return (
    <div>
      <h1 className="mb-1" style={{ fontSize: "1.75rem" }}>Forgot your password?</h1>
      <p className="text-muted-2 mb-4" style={{ fontSize: 14 }}>
        Enter your email and we'll send you a reset link.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Email address" type="email" icon={FiMail} placeholder="you@company.com" error={errors.email?.message} {...register("email")} />
        <Button type="submit" block loading={isSubmitting} size="lg">Send reset link</Button>
      </form>
      <p className="text-center mt-4" style={{ fontSize: 14 }}>
        Remembered it? <Link to="/login">Back to sign in</Link>
      </p>
    </div>
  );
}
