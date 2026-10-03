from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from datetime import datetime, timezone
from db import audit_logs_collection, users_collection
from dependencies import get_current_user, get_allowed_user_ids
from models import UserResponse, AuditLogResponse

router = APIRouter(prefix="/audit", tags=["Audit Logs"])

@router.get("", response_model=List[AuditLogResponse])
async def get_audit_logs(
    current_user: UserResponse = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(100000, ge=1)
):
    # Only super admin or admin should view audit logs
    if current_user.get("role") not in ["Super Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to view audit logs")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    query = {}
    if allowed_ids is not None:
        query = {
            "$or": [
                {"user_id": {"$in": allowed_ids}},
                {"user_id": None},
                {"user_id": {"$exists": False}}
            ]
        }
        
    logs_cursor = audit_logs_collection.find(query).sort("timestamp", -1).skip(skip).limit(limit)
    logs = await logs_cursor.to_list(length=limit)
    
    users_cursor = users_collection.find({}, {"name": 1, "profile_photo": 1})
    users = await users_cursor.to_list(length=None)
    user_avatar_map = {u.get("name"): u.get("profile_photo") for u in users if u.get("name") and u.get("profile_photo")}
    
    for log in logs:
        log["_id"] = str(log["_id"])
        if "timestamp" in log and log["timestamp"]:
            log["timestamp"] = log["timestamp"].replace(tzinfo=timezone.utc)
            
        user_name = log.get("user_name")
        if user_name and user_name in user_avatar_map:
            log["avatar"] = user_avatar_map[user_name]
        
    return logs
