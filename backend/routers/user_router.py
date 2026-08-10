from fastapi import APIRouter, HTTPException, Depends, Header, UploadFile, File
from typing import List, Optional, Dict
from datetime import datetime
import uuid
import secrets
import string
from models import UserCreate, UserResponse, PermissionDict, UserUpdate, StatusUpdate
from db import users_collection, audit_logs_collection
from auth_utils import get_password_hash, decode_access_token
from dependencies import get_current_user
from audit_logger import log_audit_action
from routers.notifications_router import create_notification
from email_utils import send_new_account_email, send_password_changed_by_admin_email
import os
import aiofiles

router = APIRouter(prefix="/users", tags=["users"])

ROLE_CREATION_MAP = {
    "Super Admin": ["admin", "manager", "HR", "sales", "support"],
    "admin": ["manager", "HR", "sales", "support"],
    "HR": ["manager", "sales", "support"],
    "manager": ["sales", "support"],
    "sales": [],
    "support": []
}

def generate_random_password(length=12):
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(alphabet) for i in range(length))

def get_default_permissions(role: str) -> dict:
    # Set default permissions based on role
    # Since permissions are now dynamic and page-based, we default to empty dict 
    # and rely on the frontend to send the correct permissions during creation.
    # We can still provide a few defaults if needed.
    perms = {}
    if role == "Super Admin" or role == "admin":
        perms["/dashboard"] = PermissionDict(view=True, edit=True, delete=True)
    elif role == "manager" or role == "sales":
        perms["/dashboard"] = PermissionDict(view=True, edit=False, delete=False)
    return perms

@router.post("", response_model=UserResponse)
async def create_user(user_in: UserCreate, current_user: dict = Depends(get_current_user)):
    allowed_to_create = ROLE_CREATION_MAP.get(current_user["role"], [])
    if user_in.role not in allowed_to_create:
        raise HTTPException(status_code=403, detail=f"Not authorized to create role: {user_in.role}")
        
    existing = await users_collection.find_one({"email": user_in.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Use the manually entered password
    raw_password = user_in.password
    hashed_password = get_password_hash(raw_password)
    
    # Assign permissions
    perms = user_in.permissions
    if not perms:
        perms = get_default_permissions(user_in.role)
        
    now = datetime.utcnow()
    ancestors = current_user.get("ancestors", []) + [current_user["_id"]]
    
    user_dict = {
        "_id": str(uuid.uuid4()),
        "name": user_in.name,
        "email": user_in.email,
        "phone": user_in.phone,
        "role": user_in.role,
        "permissions": {k: v.model_dump() for k, v in perms.items()},
        "parent_id": current_user["_id"],
        "ancestors": ancestors,
        "password_hash": hashed_password,
        "plain_password": raw_password,
        "is_active": True,
        "is_first_login": True,
        "created_at": now,
        "updated_at": now
    }
    
    await users_collection.insert_one(user_dict)
    
    # Send email
    login_url = os.getenv("VITE_APP_URL", "http://localhost:5173") + "/login"
    send_new_account_email(user_in.email, user_in.name, raw_password, login_url)
    
    # Audit log
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Create", 
        "Users", 
        f"Created user {user_in.name} ({user_in.email}) with role {user_in.role}"
    )
    
    # Notification to the creator
    await create_notification(
        user_id=str(current_user["_id"]),
        title="User Created Successfully",
        message=f"You added {user_in.name} ({user_in.role}) to the team.",
        type="success"
    )
    
    # Notification to Super Admin (if someone else created it)
    if current_user["role"] != "Super Admin":
        super_admin = await users_collection.find_one({"role": "Super Admin"})
        if super_admin:
            await create_notification(
                user_id=str(super_admin["_id"]),
                title="New Team Member Added",
                message=f"{current_user.get('name', 'Someone')} added {user_in.name} as {user_in.role}.",
                type="info"
            )
            
    # Return user
    user_dict["id"] = user_dict.pop("_id")
    return UserResponse(**user_dict)

@router.get("", response_model=List[UserResponse])
async def get_users(current_user: dict = Depends(get_current_user)):
    users = []
    
    if current_user["role"] == "Super Admin":
        cursor = users_collection.find({})
    else:
        # User can only see their descendants
        cursor = users_collection.find({"ancestors": current_user["_id"]})
        
    async for user in cursor:
        user["id"] = user.pop("_id")
        users.append(UserResponse(**user))
        
    return users

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    target_user = await users_collection.find_one({"_id": user_id})
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if current_user["role"] != "Super Admin" and current_user["_id"] not in target_user.get("ancestors", []):
        raise HTTPException(status_code=403, detail="Not authorized to edit this user")
        
    if user_update.role and user_update.role != target_user["role"]:
        allowed_roles = ROLE_CREATION_MAP.get(current_user["role"], [])
        if user_update.role not in allowed_roles:
            raise HTTPException(status_code=403, detail=f"Not authorized to assign role: {user_update.role}")
        
    update_data = user_update.model_dump(exclude_unset=True)
    
    if "role" in update_data and update_data["role"] == "Super Admin" and target_user["role"] != "Super Admin":
        existing_super = await users_collection.find_one({"role": "Super Admin"})
        if existing_super:
            raise HTTPException(status_code=400, detail="A Super Admin already exists.")
            
    update_data["updated_at"] = datetime.utcnow()
    
    if "password" in update_data:
        raw_password = update_data.pop("password")
        update_data["password_hash"] = get_password_hash(raw_password)
        update_data["plain_password"] = raw_password
        login_url = os.getenv("VITE_APP_URL", "http://localhost:5173") + "/login"
        send_password_changed_by_admin_email(target_user["email"], target_user["name"], raw_password, login_url)

    await users_collection.update_one({"_id": user_id}, {"$set": update_data})
    
    updated_user = await users_collection.find_one({"_id": user_id})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Update", 
        "Users", 
        f"Updated user {updated_user['name']} ({updated_user['email']})"
    )
    
    updated_user["id"] = updated_user.pop("_id")
    return UserResponse(**updated_user)

@router.patch("/{user_id}/status", response_model=UserResponse)
async def toggle_user_status(user_id: str, status_update: StatusUpdate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] not in ["Super Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to deactivate/activate users")
        
    target_user = await users_collection.find_one({"_id": user_id})
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if current_user["role"] != "Super Admin" and current_user["_id"] not in target_user.get("ancestors", []):
        raise HTTPException(status_code=403, detail="Not authorized to deactivate/activate this user")
        
    if target_user["role"] == "Super Admin":
        raise HTTPException(status_code=400, detail="Cannot deactivate Super Admin")
        
    await users_collection.update_one(
        {"_id": user_id},
        {"$set": {"is_active": status_update.is_active, "updated_at": datetime.utcnow()}}
    )
    
    updated_user = await users_collection.find_one({"_id": user_id})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Update", 
        "Users", 
        f"Changed status of {updated_user['name']} to {'Active' if status_update.is_active else 'Inactive'}"
    )
    
    updated_user["id"] = updated_user.pop("_id")
    return UserResponse(**updated_user)

@router.delete("/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] not in ["Super Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete users")
        
    target_user = await users_collection.find_one({"_id": user_id})
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if current_user["role"] != "Super Admin" and current_user["_id"] not in target_user.get("ancestors", []):
        raise HTTPException(status_code=403, detail="Not authorized to delete this user")
        
    if target_user["role"] == "Super Admin":
        raise HTTPException(status_code=400, detail="Cannot delete Super Admin")
        
    await users_collection.delete_one({"_id": user_id})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Delete", 
        "Users", 
        f"Deleted user {target_user['name']} ({target_user['email']})"
    )
    
    return {"message": "User deleted successfully"}

@router.patch("/me/profile", response_model=UserResponse)
async def update_my_profile(user_update: UserUpdate, current_user: dict = Depends(get_current_user)):
    update_data = user_update.model_dump(exclude_unset=True)
    
    # Users cannot change their own role or permissions through this endpoint
    if "role" in update_data:
        del update_data["role"]
    if "permissions" in update_data:
        del update_data["permissions"]
        
    update_data["updated_at"] = datetime.utcnow()
    
    await users_collection.update_one({"_id": current_user["_id"]}, {"$set": update_data})
    
    updated_user = await users_collection.find_one({"_id": current_user["_id"]})
    updated_user["id"] = updated_user.pop("_id")
    return UserResponse(**updated_user)

@router.post("/me/photo")
async def upload_profile_photo(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    allowed_extensions = [".jpg", ".jpeg", ".png", ".webp"]
    ext = os.path.splitext(file.filename)[1].lower()
    
    if ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type")
        
    filename = f"{current_user['_id']}_{uuid.uuid4().hex}{ext}"
    filepath = os.path.join("uploads", "profile_photos", filename)
    
    async with aiofiles.open(filepath, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
        
    photo_url = f"/uploads/profile_photos/{filename}"
    
    await users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"profile_photo": photo_url, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Profile photo uploaded successfully", "profile_photo": photo_url}
