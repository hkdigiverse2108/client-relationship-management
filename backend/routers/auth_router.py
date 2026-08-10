from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timedelta
import random
import string
from models import LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest, OTPInDB, UserResponse
from db import users_collection, otps_collection, audit_logs_collection
from auth_utils import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from email_utils import send_otp_email
from dependencies import get_current_user
from audit_logger import log_audit_action

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(request: LoginRequest):
    user = await users_collection.find_one({"email": request.email})
    if not user or not verify_password(request.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
        
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been deactivate by admin.please contact admin."
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}, expires_delta=access_token_expires
    )
    
    # Map MongoDB _id to Pydantic id
    user["id"] = str(user.pop("_id"))
    
    # Return user without password_hash
    user_out = UserResponse(**user)
    
    await log_audit_action(
        audit_logs_collection,
        user,
        "Login",
        "Authentication",
        f"User logged in successfully"
    )
    
    return {"access_token": access_token, "token_type": "bearer", "user": user_out.model_dump(by_alias=True)}

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    user = await users_collection.find_one({"email": request.email})
    if not user:
        # Don't reveal if user exists or not
        return {"message": "If your email is registered, you will receive an OTP."}
        
    otp = ''.join(random.choices(string.digits, k=6))
    expires_at = datetime.utcnow() + timedelta(minutes=15)
    
    # Upsert OTP
    await otps_collection.update_one(
        {"email": request.email},
        {"$set": {"otp": otp, "expires_at": expires_at}},
        upsert=True
    )
    
    # Send email
    send_otp_email(request.email, otp)
    
    return {"message": "If your email is registered, you will receive an OTP."}

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    otp_record = await otps_collection.find_one({"email": request.email})
    
    if not otp_record or otp_record["otp"] != request.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    if otp_record["expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")
        
    # Update password
    hashed_password = get_password_hash(request.new_password)
    await users_collection.update_one(
        {"email": request.email},
        {"$set": {"password_hash": hashed_password, "plain_password": request.new_password, "updated_at": datetime.utcnow()}}
    )
    
    # Delete OTP
    await otps_collection.delete_one({"email": request.email})
    
    return {"message": "Password reset successfully"}

@router.post("/change-password")
async def change_password(request: ChangePasswordRequest, current_user: dict = Depends(get_current_user)):
    user = await users_collection.find_one({"_id": current_user["_id"]})
    
    if not verify_password(request.current_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Incorrect current password")
        
    hashed_password = get_password_hash(request.new_password)
    
    await users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"password_hash": hashed_password, "plain_password": request.new_password, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Password changed successfully"}
