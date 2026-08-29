from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, List
from datetime import datetime

class PermissionDict(BaseModel):
    view: bool = False
    add: bool = False
    edit: bool = False
    delete: bool = False

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str # Super Admin, admin, manager, sales, support, HR
    password: str
    permissions: Optional[Dict[str, PermissionDict]] = None
    parent_id: Optional[str] = None
    ancestors: List[str] = []
    dob: Optional[datetime] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    bank_name: Optional[str] = None
    account_holder_name: Optional[str] = None
    account_number: Optional[str] = None
    ifsc_code: Optional[str] = None
    pan_number: Optional[str] = None
    aadhar_number: Optional[str] = None
    employee_id: Optional[str] = None
    joining_date: Optional[str] = None
    attendance_status: Optional[str] = None
    basic_salary: Optional[float] = None
    hra_allowance: Optional[float] = None
    special_allowances: Optional[float] = None
    manager_id: Optional[str] = None

class UserInDB(UserCreate):
    id: str = Field(alias="_id")
    password_hash: str
    plain_password: str
    is_active: bool = True
    is_first_login: bool = True
    created_at: datetime
    updated_at: datetime

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str
    permissions: Dict[str, PermissionDict]
    plain_password: Optional[str] = None
    is_active: bool = True
    is_first_login: bool
    parent_id: Optional[str] = None
    dob: Optional[datetime] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None
    designation: Optional[str] = None
    department: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    bank_name: Optional[str] = None
    account_holder_name: Optional[str] = None
    account_number: Optional[str] = None
    ifsc_code: Optional[str] = None
    pan_number: Optional[str] = None
    aadhar_number: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    employee_id: Optional[str] = None
    joining_date: Optional[str] = None
    attendance_status: Optional[str] = None
    basic_salary: Optional[float] = None
    hra_allowance: Optional[float] = None
    special_allowances: Optional[float] = None
    manager_id: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None
    permissions: Optional[Dict[str, PermissionDict]] = None
    dob: Optional[datetime] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None
    designation: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    bank_name: Optional[str] = None
    account_holder_name: Optional[str] = None
    account_number: Optional[str] = None
    ifsc_code: Optional[str] = None
    pan_number: Optional[str] = None
    aadhar_number: Optional[str] = None
    department: Optional[str] = None
    employee_id: Optional[str] = None
    joining_date: Optional[str] = None
    attendance_status: Optional[str] = None
    basic_salary: Optional[float] = None
    hra_allowance: Optional[float] = None
    special_allowances: Optional[float] = None
    manager_id: Optional[str] = None

class StatusUpdate(BaseModel):
    is_active: bool

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

class OTPInDB(BaseModel):
    email: str
    otp: str
    expires_at: datetime

class AuditLogCreate(BaseModel):
    user_id: Optional[str] = None
    user_name: Optional[str] = "System"
    action: str
    module: str
    details: str
    ip_address: Optional[str] = None

class AuditLogResponse(AuditLogCreate):
    id: str = Field(alias="_id")
    timestamp: datetime

class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    type: str = "info" # info, success, warning, error
    link: Optional[str] = None
    is_read: bool = False
    
class NotificationResponse(NotificationCreate):
    id: str = Field(alias="_id")
    created_at: datetime

class LeadCreate(BaseModel):
    lead_name: str
    company_name: str
    first_name: str
    last_name: str
    mobile_number: str
    alternate_number: Optional[str] = None
    email: EmailStr
    website: Optional[str] = None
    industry: Optional[str] = None
    source: str
    status: str
    priority: str
    tags: Optional[str] = None
    expected_value: float
    probability: Optional[float] = None
    customer_type: Optional[str] = None
    preferred_channel: Optional[str] = None
    next_followup_date: Optional[str] = None
    followup_status: Optional[str] = None
    assigned_to: str
    city: str
    state: str
    country: str
    pincode: str
    requirement: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None

class LeadUpdate(BaseModel):
    lead_name: Optional[str] = None
    company_name: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    mobile_number: Optional[str] = None
    alternate_number: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    tags: Optional[str] = None
    expected_value: Optional[float] = None
    probability: Optional[float] = None
    customer_type: Optional[str] = None
    preferred_channel: Optional[str] = None
    next_followup_date: Optional[str] = None
    followup_status: Optional[str] = None
    assigned_to: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None
    requirement: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None

class LeadResponse(LeadCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class RolePresetCreate(BaseModel):
    role_name: str
    permissions: Dict[str, PermissionDict]

class RolePresetResponse(RolePresetCreate):
    id: str

# --- Leave Models ---
class LeaveCreate(BaseModel):
    leave_type: str
    start_date: str
    end_date: str
    day_type: str
    reason: str
    proof_url: Optional[str] = None
    status: str = "Pending"

class LeaveResponse(LeaveCreate):
    id: str = Field(alias="_id")
    employee_id: str
    employee_name: str
    created_at: datetime
    updated_at: datetime
    reviewer_id: Optional[str] = None
    reviewer_name: Optional[str] = None

class LeaveStatusUpdate(BaseModel):
    status: str

# --- Attendance Models ---
class PunchAction(BaseModel):
    action: str # "punch_in", "punch_out", "break_start", "break_end"
    method: str = "Web Portal"

class AttendanceResponse(BaseModel):
    id: str = Field(alias="_id")
    employee_id: str
    employee_name: str
    date: str # YYYY-MM-DD
    punch_in: Optional[datetime] = None
    punch_out: Optional[datetime] = None
    work_seconds: int = 0
    break_seconds: int = 0
    overtime_seconds: int = 0
    status: str = "Present" # Present, Absent, Late, Half Day
    method: str = "Web Portal"
    photo: Optional[str] = None

# --- Contacts Models ---

class ContactCreate(BaseModel):
    contact_name: str
    company_name: str
    contact_number: str
    email: EmailStr
    address: Optional[str] = ""
    city: Optional[str] = ""
    state: Optional[str] = ""
    country: Optional[str] = ""
    gstin: Optional[str] = ""
    department: Optional[str] = ""
    status: str = "Active"
    tags: Optional[str] = ""
    notes: Optional[str] = ""

class ContactUpdate(BaseModel):
    contact_name: Optional[str] = None
    company_name: Optional[str] = None
    contact_number: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    gstin: Optional[str] = None
    department: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[str] = None
    notes: Optional[str] = None

class ContactResponse(ContactCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Clients Models ---

class ClientCreate(BaseModel):
    client_id: Optional[str] = None
    client_name: Optional[str] = ""
    company_name: Optional[str] = ""
    contact_person: Optional[str] = None
    mobile_number: Optional[str] = ""
    alternate_number: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    customer_type: Optional[str] = None
    status: str = "Active"
    assigned_to: str
    address: Optional[str] = None
    city: str
    state: str
    country: str
    pincode: str
    contract_value: Optional[float] = None
    requirement: Optional[str] = None
    notes: Optional[str] = None
    converted_from_lead_id: Optional[str] = "Manual"

class ClientHistoryModel(BaseModel):
    client_id: str
    user_id: Optional[str] = None
    user_name: Optional[str] = "System"
    action: str
    description: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ClientHistoryResponse(ClientHistoryModel):
    id: str = Field(alias="_id")

class ClientUpdate(BaseModel):
    client_name: Optional[str] = None
    company_name: Optional[str] = None
    contact_person: Optional[str] = None
    mobile_number: Optional[str] = None
    alternate_number: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    customer_type: Optional[str] = None
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None
    contract_value: Optional[float] = None
    requirement: Optional[str] = None
    notes: Optional[str] = None

class ClientResponse(ClientCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Deal Models ---
class DealCreate(BaseModel):
    title: str
    client_id: str
    company_name: Optional[str] = None
    amount: float
    stage: str = "new_lead"
    probability: Optional[float] = None
    expected_close_date: Optional[str] = None
    assigned_to: Optional[str] = None
    reason: Optional[str] = None
    notes: Optional[str] = None
    is_recurring: bool = False
    source: Optional[str] = None
    service_category: Optional[str] = None

class DealUpdate(BaseModel):
    title: Optional[str] = None
    client_id: Optional[str] = None
    company_name: Optional[str] = None
    amount: Optional[float] = None
    stage: Optional[str] = None
    probability: Optional[float] = None
    expected_close_date: Optional[str] = None
    assigned_to: Optional[str] = None
    reason: Optional[str] = None
    notes: Optional[str] = None
    is_recurring: Optional[bool] = None
    source: Optional[str] = None
    service_category: Optional[str] = None

class DealResponse(DealCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Project Models ---
class ProjectCreate(BaseModel):
    title: str
    client_id: str
    deal_id: Optional[str] = None
    status: str = "active"
    stage: str = "new"
    category: str
    priority: str
    department: str
    budget: float
    project_value: float
    tags: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    assigned_to: str
    description: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    client_id: Optional[str] = None
    deal_id: Optional[str] = None
    status: Optional[str] = None
    stage: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    department: Optional[str] = None
    budget: Optional[float] = None
    project_value: Optional[float] = None
    tags: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    assigned_to: Optional[str] = None
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    client_id: str
    deal_id: Optional[str] = None
    status: str = "active"
    stage: str = "new"
    category: Optional[str] = None
    priority: Optional[str] = None
    department: Optional[str] = None
    budget: Optional[float] = None
    project_value: Optional[float] = None
    tags: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    assigned_to: Optional[str] = None
    description: Optional[str] = None
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Task Models (For Gantt Chart & Task Management) ---
class TaskCreate(BaseModel):
    title: str
    task_type: str
    priority: str
    project_id: str
    start_date: str
    end_date: str
    status: str = "To Do"
    assigned_to: str
    reminder_date: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None
    # Fields for Gantt Compatibility
    dependencies: List[str] = []
    is_milestone: bool = False

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    task_type: Optional[str] = None
    priority: Optional[str] = None
    project_id: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    status: Optional[str] = None
    assigned_to: Optional[str] = None
    reminder_date: Optional[str] = None
    description: Optional[str] = None
    notes: Optional[str] = None
    # Fields for Gantt Compatibility
    dependencies: Optional[List[str]] = None
    is_milestone: Optional[bool] = None

class TaskResponse(TaskCreate):
    id: str
    created_at: str
    updated_at: str
    created_by: str

class InvoiceLineItem(BaseModel):
    description: str
    sac: Optional[str] = None
    qty: float
    rate: float
    discount: float = 0.0
    amount: float

# --- Invoice Models (Accounting Source of Truth) ---
class InvoiceCreate(BaseModel):
    invoice_number: str
    client_id: Optional[str] = None
    client_name: Optional[str] = None
    client_address: Optional[str] = None
    client_phone: Optional[str] = None
    client_gstin: str
    state: Optional[str] = None
    brand: Optional[str] = None
    invoice_type: str = "Tax Invoice"
    mode_of_payment: str = "Current Account"
    
    deal_id: Optional[str] = None
    source_type: str = "Project"  # Project, E-commerce, Retainer, Ad-hoc
    source_id: Optional[str] = None
    
    line_items: List[InvoiceLineItem] = []
    
    total_amount: float # Total Before Tax
    tax_type: str = "CGST + SGST"
    cgst_percent: float = 0.0
    sgst_percent: float = 0.0
    igst_percent: float = 0.0
    total_tax_amount: float = 0.0
    additional_discount: float = 0.0
    rounded_total: float = 0.0
    calculated_round_off: float = 0.0
    total_due: float = 0.0
    
    status: str = "draft"  # draft, sent, paid, partial, overdue
    issue_date: str
    due_date: str
    notes: Optional[str] = None
    is_recurring: bool = False
    recurring_frequency: Optional[str] = None
    next_issue_date: Optional[str] = None
    recurring_end_date: Optional[str] = None

class InvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    client_id: Optional[str] = None
    client_name: Optional[str] = None
    client_address: Optional[str] = None
    client_phone: Optional[str] = None
    client_gstin: Optional[str] = None
    state: Optional[str] = None
    brand: Optional[str] = None
    invoice_type: Optional[str] = None
    mode_of_payment: Optional[str] = None
    
    deal_id: Optional[str] = None
    source_type: Optional[str] = None
    source_id: Optional[str] = None
    
    line_items: Optional[List[InvoiceLineItem]] = None
    
    total_amount: Optional[float] = None
    tax_type: Optional[str] = None
    cgst_percent: Optional[float] = None
    sgst_percent: Optional[float] = None
    igst_percent: Optional[float] = None
    total_tax_amount: Optional[float] = None
    additional_discount: Optional[float] = None
    rounded_total: Optional[float] = None
    calculated_round_off: Optional[float] = None
    total_due: Optional[float] = None
    
    status: Optional[str] = None
    issue_date: Optional[str] = None
    due_date: Optional[str] = None
    notes: Optional[str] = None
    is_recurring: Optional[bool] = None
    recurring_frequency: Optional[str] = None
    next_issue_date: Optional[str] = None
    recurring_end_date: Optional[str] = None

class InvoiceResponse(InvoiceCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Payment Models ---
class PaymentCreate(BaseModel):
    payment_id: str
    client_id: Optional[str] = None
    invoice_id: Optional[str] = None
    source_type: str = "Project"
    amount_received: float
    payment_date: str
    payment_method: str = "Bank NEFT/RTGS" # Razorpay, UPI Transfer, Bank NEFT/RTGS, Cheque, Cash
    status: str = "completed" # pending, partial, completed, failed
    transaction_reference: Optional[str] = None
    notes: Optional[str] = None

class PaymentUpdate(BaseModel):
    payment_id: Optional[str] = None
    client_id: Optional[str] = None
    invoice_id: Optional[str] = None
    source_type: Optional[str] = None
    amount_received: Optional[float] = None
    payment_date: Optional[str] = None
    payment_method: Optional[str] = None
    status: Optional[str] = None
    transaction_reference: Optional[str] = None
    notes: Optional[str] = None

class PaymentResponse(PaymentCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Expense Models ---
class ExpenseCreate(BaseModel):
    expense_id: str
    date: str
    category: str
    amount: float
    merchant: str
    merchant_gstin: Optional[str] = None
    tax_amount: float = 0.0
    payment_method: str
    reference_id: Optional[str] = None
    notes: Optional[str] = None
    receipt_url: Optional[str] = None
    status: str = "Cleared" # Pending, Cleared

class ExpenseUpdate(BaseModel):
    expense_id: Optional[str] = None
    date: Optional[str] = None
    category: Optional[str] = None
    amount: Optional[float] = None
    merchant: Optional[str] = None
    merchant_gstin: Optional[str] = None
    tax_amount: Optional[float] = None
    payment_method: Optional[str] = None
    reference_id: Optional[str] = None
    notes: Optional[str] = None
    receipt_url: Optional[str] = None
    status: Optional[str] = None

class ExpenseResponse(ExpenseCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Reminder Models ---
class ReminderCreate(BaseModel):
    description: str
    category: str
    priority: str
    client_id: str
    due_date: str
    status: str = "pending"

class ReminderUpdate(BaseModel):
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    client_id: Optional[str] = None
    due_date: Optional[str] = None
    status: Optional[str] = None

class ReminderResponse(ReminderCreate):
    id: str
    created_at: str
    updated_at: str
    created_by: str


# --- Order Models ---
class OrderCreate(BaseModel):
    order_id: Optional[str] = None
    customer_id: Optional[str] = None
    product_name: str
    platform: str
    quantity: int
    unit_price: float
    discount: float
    tax: float
    payment_status: str
    order_status: str
    customer_name: str
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    destination_city: str
    destination_state: Optional[str] = None
    destination_country: Optional[str] = None
    description: Optional[str] = None

class OrderResponse(OrderCreate):
    id: str = Field(alias="_id")
    order_id: Optional[str] = "N/A"
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class OrderUpdate(BaseModel):
    customer_id: Optional[str] = None
    product_name: Optional[str] = None
    platform: Optional[str] = None
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
    discount: Optional[float] = None
    tax: Optional[float] = None
    payment_status: Optional[str] = None
    order_status: Optional[str] = None
    customer_name: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    destination_city: Optional[str] = None
    destination_state: Optional[str] = None
    destination_country: Optional[str] = None
    description: Optional[str] = None

# --- E-Commerce Customer Models ---
class CustomerCreate(BaseModel):
    customer_id: Optional[str] = None
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    tags: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    assigned_to: Optional[str] = None
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    client_id: str
    deal_id: Optional[str] = None
    status: str = "active"
    stage: str = "new"
    category: Optional[str] = None
    priority: Optional[str] = None
    department: Optional[str] = None
    budget: Optional[float] = None
    project_value: Optional[float] = None
    tags: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    assigned_to: Optional[str] = None
    description: Optional[str] = None
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None




# --- Order Models ---
class OrderCreate(BaseModel):
    order_id: Optional[str] = None
    customer_id: Optional[str] = None
    product_name: str
    platform: str
    quantity: int
    unit_price: float
    discount: float
    tax: float
    payment_status: str
    order_status: str
    customer_name: str
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    destination_city: str
    destination_state: Optional[str] = None
    destination_country: Optional[str] = None
    description: Optional[str] = None

class OrderResponse(OrderCreate):
    id: str = Field(alias="_id")
    order_id: Optional[str] = "N/A"
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class OrderUpdate(BaseModel):
    customer_id: Optional[str] = None
    product_name: Optional[str] = None
    platform: Optional[str] = None
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
    discount: Optional[float] = None
    tax: Optional[float] = None
    payment_status: Optional[str] = None
    order_status: Optional[str] = None
    customer_name: Optional[str] = None
    customer_email: Optional[EmailStr] = None
    customer_phone: Optional[str] = None
    destination_city: Optional[str] = None
    destination_state: Optional[str] = None
    destination_country: Optional[str] = None
    description: Optional[str] = None

# --- E-Commerce Customer Models ---
class CustomerCreate(BaseModel):
    customer_id: Optional[str] = None
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    status: str = "Active"
    tags: Optional[str] = ""
    notes: Optional[str] = ""

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    status: Optional[str] = None
    tags: Optional[str] = None
    notes: Optional[str] = None

class CustomerResponse(CustomerCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Product Models ---
class ProductVariant(BaseModel):
    name: str
    values: List[str]

class ProductCreate(BaseModel):
    product_name: str
    sku_code: str
    category: str
    brand_name: str
    image: Optional[str] = None
    status: str = "active"
    initial_stock_qty: int = 0
    safety_stock_limit: int = 0
    cost_price: float = 0.0
    retail_price: float
    tax: float
    discount: float = 0.0
    fulfillment_warehouse: str
    platforms: List[str] = []
    variants: List[ProductVariant] = []
    description: Optional[str] = None
    warehouse_stocks: Optional[Dict[str, int]] = None

class ProductUpdate(BaseModel):
    product_name: Optional[str] = None
    sku_code: Optional[str] = None
    category: Optional[str] = None
    brand_name: Optional[str] = None
    image: Optional[str] = None
    status: Optional[str] = None
    initial_stock_qty: Optional[int] = None
    safety_stock_limit: Optional[int] = None
    cost_price: Optional[float] = None
    retail_price: Optional[float] = None
    tax: Optional[float] = None
    discount: Optional[float] = None
    fulfillment_warehouse: Optional[str] = None
    platforms: Optional[List[str]] = None
    variants: Optional[List[ProductVariant]] = None
    description: Optional[str] = None
    warehouse_stocks: Optional[Dict[str, int]] = None

class ProductResponse(ProductCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class TransferStockRequest(BaseModel):
    from_location: str
    to_location: str
    quantity: int

# --- Quote Models (Quotation Engine) ---
class QuoteCreate(BaseModel):
    quote_number: str
    client_id: Optional[str] = None
    product_name: str
    unit_price: float
    quantity: int
    discount: float = 0.0
    tax_percentage: float = 0.0
    validity_days: int = 30
    status: str = "Draft" # Draft, Sent, Accepted, Expired, Rejected
    notes: Optional[str] = None
    sub_total: float
    tax_amount: float
    total_amount: float
    date_sent: Optional[str] = None
    valid_until: Optional[str] = None

class QuoteUpdate(BaseModel):
    quote_number: Optional[str] = None
    client_id: Optional[str] = None
    product_name: Optional[str] = None
    unit_price: Optional[float] = None
    quantity: Optional[int] = None
    discount: Optional[float] = None
    tax_percentage: Optional[float] = None
    validity_days: Optional[int] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    sub_total: Optional[float] = None
    tax_amount: Optional[float] = None
    total_amount: Optional[float] = None
    date_sent: Optional[str] = None
    valid_until: Optional[str] = None

class QuoteResponse(QuoteCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- General Ledger Models ---
class LedgerEntryCreate(BaseModel):
    entry_id: str
    date: str
    description: str
    reference_id: Optional[str] = None # e.g. Payment ID or Expense ID
    client_id: Optional[str] = None
    type: str # "Credit" (Inflow) or "Debit" (Outflow)
    amount: float
    status: str = "settled"

class LedgerEntryResponse(LedgerEntryCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- HRMS Models ---
class HRNoticeCreate(BaseModel):
    title: str
    desc: str
    date: str
    author: str

class HRNoticeResponse(HRNoticeCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None

class HREventCreate(BaseModel):
    title: str
    desc: str
    date: str
    type: str
    duration: Optional[str] = None

class HREventResponse(HREventCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None

class HRCustomTypeCreate(BaseModel):
    type: str = "event"
    name: str
    value: str

class HRCustomTypeResponse(HRCustomTypeCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None

# --- ATS Recruitment Pipeline Models ---
class ATSJobCreate(BaseModel):
    title: str
    department: str
    location: str
    employment_type: str
    status: str
    applications_count: Optional[int] = 0
    posted_date: str
    experience: str
    salary_range: str
    description: str

class ATSJobResponse(ATSJobCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None

class ATSCandidateCreate(BaseModel):
    job_id: str
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    stage: str
    department: Optional[str] = None
    resume_url: Optional[str] = None

class ATSCandidateResponse(ATSCandidateCreate):
    id: str = Field(alias="_id")
    applied_date: Optional[datetime] = None

class HRAssetCreate(BaseModel):
    asset_name: str
    assigned_to: str
    status: str = "Unassigned"
    assigned_date: Optional[str] = None

class HRAssetResponse(HRAssetCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None

class HRAppraisalCreate(BaseModel):
    employee_id: str
    review_period: str
    rating_technical: int = 0
    rating_communication: int = 0
    rating_punctuality: int = 0
    rating_initiative: int = 0
    overall_score: float = 0.0
    note: str = ""
    status: str = "Draft"

class HRAppraisalResponse(HRAppraisalCreate):
    id: str = Field(alias="_id")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
