from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from datetime import datetime, timezone
from db import audit_logs_collection
from dependencies import get_current_user
from models import UserResponse, AuditLogResponse

router = APIRouter(prefix="/audit", tags=["Audit Logs"])

@router.get("", response_model=List[AuditLogResponse])
async def get_audit_logs(
    current_user: UserResponse = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(100000, ge=1)
):
    # Only super admin or admin should view audit logs (adjust per requirement, but usually true)
    if current_user.get("role") not in ["Super Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to view audit logs")
        
    logs_cursor = audit_logs_collection.find().sort("timestamp", -1).skip(skip).limit(limit)
    logs = await logs_cursor.to_list(length=limit)
    
    for log in logs:
        log["_id"] = str(log["_id"])
        if "timestamp" in log and log["timestamp"]:
            log["timestamp"] = log["timestamp"].replace(tzinfo=timezone.utc)
        
    return logs
