from fastapi import APIRouter, HTTPException, Request
from typing import List
from bson import ObjectId
import datetime
from models import ReminderCreate, ReminderUpdate, ReminderResponse
from db import db, audit_logs_collection
from audit_logger import log_audit_action

router = APIRouter()

def serialize_doc(doc):
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.post("/reminders", response_model=ReminderResponse)
async def create_reminder(reminder: ReminderCreate, request: Request):
    reminder_data = reminder.dict()
    reminder_data["created_at"] = datetime.datetime.utcnow().isoformat()
    reminder_data["updated_at"] = reminder_data["created_at"]
    reminder_data["created_by"] = "current_user_id"  # Dummy auth
    
    result = await db["reminders"].insert_one(reminder_data)
    created = await db["reminders"].find_one({"_id": result.inserted_id})
    
    await log_audit_action(
        audit_logs_collection,
        {"_id": "system", "name": "System"},
        "Create",
        "Reminders",
        f"Created reminder '{reminder_data.get('title', 'Untitled')}'"
    )
    
    return serialize_doc(created)

@router.get("/reminders", response_model=List[ReminderResponse])
async def get_reminders(request: Request):
    reminders = await db["reminders"].find().to_list(1000)
    return [serialize_doc(r) for r in reminders]

@router.put("/reminders/{id}", response_model=ReminderResponse)
async def update_reminder(id: str, reminder: ReminderUpdate, request: Request):
    update_data = {k: v for k, v in reminder.dict().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
        
    update_data["updated_at"] = datetime.datetime.utcnow().isoformat()
    
    result = await db["reminders"].update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Reminder not found")
        
    updated = await db["reminders"].find_one({"_id": ObjectId(id)})
    
    await log_audit_action(
        audit_logs_collection,
        {"_id": "system", "name": "System"},
        "Update",
        "Reminders",
        f"Updated reminder '{updated.get('title', 'Untitled')}'"
    )
    
    return serialize_doc(updated)

@router.delete("/reminders/{id}")
async def delete_reminder(id: str, request: Request):
    reminder = await db["reminders"].find_one({"_id": ObjectId(id)})
    
    result = await db["reminders"].delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reminder not found")
        
    title = reminder.get("title", "Untitled") if reminder else id
    await log_audit_action(
        audit_logs_collection,
        {"_id": "system", "name": "System"},
        "Delete",
        "Reminders",
        f"Deleted reminder '{title}'"
    )
        
    return {"status": "deleted"}
