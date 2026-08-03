from fastapi import Header, HTTPException
from auth_utils import decode_access_token
from db import users_collection

async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token")
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await users_collection.find_one({"email": payload.get("sub")})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Your account has been deactivate by admin.please contact admin.")
        
    return user
