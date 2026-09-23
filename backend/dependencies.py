from fastapi import Header, HTTPException
from auth_utils import decode_access_token
from db import users_collection
from typing import List, Optional

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

async def get_allowed_user_ids(current_user: dict) -> Optional[List[str]]:
    """
    Returns a list of user IDs that the current user is allowed to see data for.
    If the user is Super Admin or admin, returns None (meaning they can see everything).
    Otherwise, returns their own ID plus the IDs of all their descendants in the hierarchy.
    """
    role = current_user.get("role")
    if role == "Super Admin":
        return None
        
    # Find all descendants (users who have this user in their ancestors list)
    cursor = users_collection.find({"ancestors": current_user["_id"]}, {"_id": 1})
    descendant_ids = [doc["_id"] async for doc in cursor]
    
    # Allowed IDs: self + descendants
    return [current_user["_id"]] + descendant_ids
