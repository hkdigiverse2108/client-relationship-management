from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, List
from datetime import datetime

class PermissionDict(BaseModel):
    view: bool = False
    edit: bool = False
    delete: bool = False

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: str # Super Admin, admin, manager, sales, support, HR
    permissions: Optional[Dict[str, PermissionDict]] = None
    parent_id: Optional[str] = None
    ancestors: List[str] = []
    dob: Optional[datetime] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None

class UserInDB(UserCreate):
    id: str = Field(alias="_id")
    password_hash: str
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
    is_active: bool = True
    is_first_login: bool
    parent_id: Optional[str] = None
    dob: Optional[datetime] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    permissions: Optional[Dict[str, PermissionDict]] = None
    dob: Optional[datetime] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None

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

# --- Invoice Models (Accounting Source of Truth) ---
class InvoiceCreate(BaseModel):
    invoice_number: str
    client_id: str
    deal_id: Optional[str] = None
    total_amount: float
    status: str = "draft"  # draft, sent, paid, partial, overdue
    issue_date: str
    due_date: str
    notes: Optional[str] = None

class InvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    client_id: Optional[str] = None
    deal_id: Optional[str] = None
    total_amount: Optional[float] = None
    status: Optional[str] = None
    issue_date: Optional[str] = None
    due_date: Optional[str] = None
    notes: Optional[str] = None

class InvoiceResponse(InvoiceCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# --- Payment Models ---
class PaymentCreate(BaseModel):
    client_id: str
    invoice_id: Optional[str] = None
    amount_received: float
    payment_date: str
    payment_method: str = "bank_transfer"
    transaction_reference: Optional[str] = None
    notes: Optional[str] = None

class PaymentUpdate(BaseModel):
    client_id: Optional[str] = None
    invoice_id: Optional[str] = None
    amount_received: Optional[float] = None
    payment_date: Optional[str] = None
    payment_method: Optional[str] = None
    transaction_reference: Optional[str] = None
    notes: Optional[str] = None

class PaymentResponse(PaymentCreate):
    id: str = Field(alias="_id")
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

