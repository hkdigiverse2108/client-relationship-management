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
