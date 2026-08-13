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

export const contactSchema = yup.object().shape({
  contact_name: yup.string().required("Contact Name is required"),
  company_name: yup.string().required("Company Name is required"),
  contact_number: yup.string().required("Contact Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  country: yup.string().nullable(),
  gstin: yup.string().nullable().test(
    "is-valid-gstin",
    "Invalid GSTIN format (e.g. 22AAAAA0000A1Z5)",
    (value) => {
      if (!value) return true; // Optional
      return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
    }
  ),
  department: yup.string().nullable(),
  status: yup.string().required("Status is required"),
  tags: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export const dealSchema = yup.object({
  title: yup.string().required("Deal title is required"),
  company_name: yup.string().nullable(),
  amount: yup.number().typeError("Amount must be a number").min(0).required("Amount is required"),
  stage: yup.string().required("Stage is required"),
  probability: yup.number().typeError("Probability must be a number").min(0).max(100).nullable(),
  assigned_to: yup.string().required("Assigned user is required"),
  reason: yup.string().nullable(),
  expected_close_date: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export const clientSchema = yup.object({
  client_name: yup.string().required("Client Name is required"),
  company_name: yup.string().required("Company Name is required"),
  contact_person: yup.string().nullable(),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile_number: yup.string().required("Mobile Number is required"),
  alternate_number: yup.string().nullable(),
  website: yup.string().nullable(),
  industry: yup.string().nullable(),
  customer_type: yup.string().nullable(),
  status: yup.string().required("Client Status is required"),
  assigned_to: yup.string().required("Assign To is required"),
  address: yup.string().nullable(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
  contract_value: yup.number().typeError("Must be a number").nullable().min(0, "Must be positive"),
  requirement: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export const invoiceSchema = yup.object({
  invoice_number: yup.string().required("Invoice Number is required"),
  total_amount: yup.number().typeError("Must be a number").required("Total Amount is required").min(0),
  issue_date: yup.string().required("Issue Date is required"),
  due_date: yup.string().required("Due Date is required"),
  status: yup.string().required("Status is required"),
  notes: yup.string().nullable(),
});

export const paymentSchema = yup.object({
  amount_received: yup.number().typeError("Must be a number").required("Amount is required").min(0),
  payment_date: yup.string().required("Payment Date is required"),
  payment_method: yup.string().required("Payment Method is required"),
  transaction_reference: yup.string().nullable(),
  notes: yup.string().nullable(),
});

export const projectSchema = yup.object({
  title: yup.string().required("Project title is required"),
  status: yup.string().required("Status is required"),
  start_date: yup.string().nullable(),
  end_date: yup.string().nullable(),
  description: yup.string().nullable(),
});

export const orderSchema = yup.object({
  product_name: yup.string().required("Product Name is required"),
  platform: yup.string().required("Platform is required"),
  quantity: yup.number().typeError("Quantity must be a number").integer("Quantity must be a whole number").min(1, "Quantity must be at least 1").required("Quantity is required"),
  unit_price: yup.number().typeError("Unit Price must be a number").min(0, "Unit Price cannot be negative").required("Unit Price is required"),
  discount: yup.number().typeError("Discount must be a number").min(0, "Discount cannot be negative").required("Discount is required"),
  tax: yup.number().typeError("Tax must be a number").min(0, "Tax cannot be negative").required("Tax is required"),
  payment_status: yup.string().required("Payment Status is required"),
  order_status: yup.string().required("Order Status is required"),
  customer_name: yup.string().required("Customer Name is required"),
  destination_city: yup.string().required("Destination City is required"),
  description: yup.string().nullable(),
});

