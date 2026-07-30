import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});
export const registerSchema = yup.object({
  name: yup.string().min(2, "Name too short").required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
export const leadSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().nullable(),
  company: yup.string().nullable(),
  source: yup.string().nullable(),
  status: yup.string().required("Status is required"),
  value: yup
    .number()
    .transform((v, o) => (o === "" ? null : v))
    .nullable()
    .min(0, "Must be positive"),
});
export const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().nullable(),
  company: yup.string().nullable(),
  title: yup.string().nullable(),
});
export const dealSchema = yup.object({
  title: yup.string().required("Deal title is required"),
  amount: yup.number().typeError("Amount must be a number").min(0).required("Amount is required"),
  stage: yup.string().required("Stage is required"),
  contact: yup.string().nullable(),
  closeDate: yup.string().nullable(),
});
