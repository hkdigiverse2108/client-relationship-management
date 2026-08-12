import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
export default function Login() {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };
  return (
    <div>
      <h1 className="mb-1" style={{ fontSize: "1.75rem" }}>Welcome back</h1>
      <p className="text-muted-2 mb-4" style={{ fontSize: 14 }}>
        Sign in to your AIO CRM account to continue.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="Enter Your Email"
          icon={FiMail}
          error={errors.email?.message}
          {...register("email")}
        />
        <div className="position-relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            icon={FiLock}
            error={errors.password?.message}
            {...register("password")}
          />
          <button 
            type="button"
            className="btn btn-link position-absolute p-0"
            style={{ right: 10, top: 33, color: "var(--color-text-subtle)" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-flex align-items-center gap-2" style={{ fontSize: 13 }}>
            <input type="checkbox" className="form-check-input m-0" defaultChecked />
            Remember me
          </label>
          <Link to="/forgot-password" style={{ fontSize: 13 }}>Forgot password?</Link>
        </div>
        <Button type="submit" block loading={loading} size="lg">Sign in</Button>
      </form>
    </div>
  );
}