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
    password: str
    permissions: Optional[Dict[str, PermissionDict]] = None
    parent_id: Optional[str] = None
    ancestors: List[str] = []
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
    stage: str
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
    stage: Optional[str] = None
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
    created_by: str
    created_at: datetime
    updated_at: datetime
