from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime
from bson import ObjectId
from dependencies import get_current_user
from models import UserResponse, NotificationResponse
from db import notifications_collection

router = APIRouter(prefix="/notifications", tags=["Notifications"])

# Utility function for internal usage to create notifications
async def create_notification(user_id: str, title: str, message: str, type: str = "info", link: str = None):
    new_notif = {
        "user_id": user_id,
        "title": title,
        "message": message,
        "type": type,
        "link": link,
        "is_read": False,
        "created_at": datetime.utcnow()
    }
    await notifications_collection.insert_one(new_notif)

@router.get("", response_model=List[NotificationResponse])
async def get_notifications(current_user: dict = Depends(get_current_user)):
    cursor = notifications_collection.find({"user_id": str(current_user["_id"])}).sort("created_at", -1).limit(50)
    notifications = await cursor.to_list(50)
    
    result = []
    for notif in notifications:
        notif["id"] = str(notif.pop("_id"))
        result.append(notif)
        
    return result

@router.patch("/{notif_id}/read")
async def mark_as_read(notif_id: str, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(notif_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid notification ID")

    result = await notifications_collection.update_one(
        {"_id": obj_id, "user_id": str(current_user["_id"])},
        {"$set": {"is_read": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    return {"status": "success", "message": "Notification marked as read"}

@router.patch("/read-all")
async def mark_all_as_read(current_user: dict = Depends(get_current_user)):
    await notifications_collection.update_many(
        {"user_id": str(current_user["_id"]), "is_read": False},
        {"$set": {"is_read": True}}
    )
    return {"status": "success", "message": "All notifications marked as read"}
