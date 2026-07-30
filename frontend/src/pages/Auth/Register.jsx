import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { registerSchema } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
export default function Register() {
  const { register: signUp, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (values) => {
    try {
      await signUp(values);
      toast.success("Account created — welcome!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Could not create account");
    }
  };
  return (
    <div>
      <h1 className="mb-1" style={{ fontSize: "1.75rem" }}>Create your account</h1>
      <p className="text-muted-2 mb-4" style={{ fontSize: 14 }}>
        Start a 14-day free trial. No credit card required.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Full name" icon={FiUser} placeholder="Jane Doe" error={errors.name?.message} {...register("name")} />
        <Input label="Email address" type="email" icon={FiMail} placeholder="you@company.com" error={errors.email?.message} {...register("email")} />
        <Input label="Password" type="password" icon={FiLock} placeholder="Minimum 6 characters" error={errors.password?.message} {...register("password")} />
        <Input label="Confirm password" type="password" icon={FiLock} placeholder="Repeat password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
        <Button type="submit" block loading={loading} size="lg">Create account</Button>
      </form>
      <p className="text-center mt-4" style={{ fontSize: 14 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}