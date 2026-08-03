import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiKey } from "react-icons/fi";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { authService } from "@/api/services/authService";

const emailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const resetSchema = yup.object({
  otp: yup.string().required("OTP is required").length(6, "OTP must be 6 digits"),
  new_password: yup.string().required("New password is required").min(8, "Must be at least 8 characters"),
});

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const emailForm = useForm({
    resolver: yupResolver(emailSchema),
  });

  const resetForm = useForm({
    resolver: yupResolver(resetSchema),
  });

  const onEmailSubmit = async (values) => {
    try {
      await authService.forgotPassword(values.email);
      setEmail(values.email);
      setStep(2);
      toast.success(`OTP sent to ${values.email}`);
    } catch (err) {
      toast.error(err?.message || "Failed to send reset link");
    }
  };

  const onResetSubmit = async (values) => {
    try {
      await authService.resetPassword({
        email,
        otp: values.otp,
        new_password: values.new_password
      });
      toast.success("Password reset successfully. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.message || "Failed to reset password");
    }
  };

  return (
    <div>
      <h1 className="mb-1" style={{ fontSize: "1.75rem" }}>
        {step === 1 ? "Forgot your password?" : "Reset Password"}
      </h1>
      <p className="text-muted-2 mb-4" style={{ fontSize: 14 }}>
        {step === 1 
          ? "Enter your email and we'll send you an OTP."
          : `Enter the OTP sent to ${email} and your new password.`}
      </p>
      
      {step === 1 ? (
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} noValidate>
          <Input 
            label="Email address" 
            type="email" 
            icon={FiMail} 
            placeholder="you@company.com" 
            error={emailForm.formState.errors.email?.message} 
            {...emailForm.register("email")} 
          />
          <Button type="submit" block loading={emailForm.formState.isSubmitting} size="lg">
            Send OTP
          </Button>
        </form>
      ) : (
        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} noValidate>
          <Input 
            label="6-Digit OTP" 
            type="text" 
            icon={FiKey} 
            placeholder="123456" 
            error={resetForm.formState.errors.otp?.message} 
            {...resetForm.register("otp")} 
          />
          <Input 
            label="New Password" 
            type="password" 
            icon={FiLock} 
            placeholder="••••••••" 
            error={resetForm.formState.errors.new_password?.message} 
            {...resetForm.register("new_password")} 
          />
          <Button type="submit" block loading={resetForm.formState.isSubmitting} size="lg">
            Reset Password
          </Button>
        </form>
      )}

      <p className="text-center mt-4" style={{ fontSize: 14 }}>
        Remembered it? <Link to="/login">Back to sign in</Link>
      </p>
    </div>
  );
}
