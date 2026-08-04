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
  lead_name: yup.string().required("Lead Name is required"),
  company_name: yup.string().required("Company Name is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  mobile_number: yup.string().required("Mobile Number is required"),
  alternate_number: yup.string().nullable(),
  email: yup.string().email("Invalid email").required("Email Address is required"),
  website: yup.string().nullable(),
  industry: yup.string().nullable(),
  source: yup.string().required("Lead Source is required"),
  status: yup.string().required("Lead Status is required"),
  stage: yup.string().required("Lead Stage is required"),
  priority: yup.string().required("Priority is required"),
  tags: yup.string().nullable(),
  expected_value: yup.number().typeError("Must be a number").required("Expected Value is required").min(0, "Must be positive"),
  probability: yup.number().typeError("Must be a number").nullable().min(0).max(100),
  customer_type: yup.string().nullable(),
  preferred_channel: yup.string().nullable(),
  next_followup_date: yup.string().nullable(),
  followup_status: yup.string().nullable(),
  assigned_to: yup.string().required("Assign To is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
  requirement: yup.string().nullable(),
  description: yup.string().nullable(),
  notes: yup.string().nullable(),
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
