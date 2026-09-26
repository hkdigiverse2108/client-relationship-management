from fastapi import APIRouter, HTTPException, Depends
from dependencies import get_current_user, get_allowed_user_ids
from typing import List
from bson import ObjectId
from datetime import datetime

from db import db, audit_logs_collection
from audit_logger import log_audit_action
from models import TaskCreate, TaskUpdate, TaskResponse
from routers.notifications_router import create_notification

router = APIRouter()

# Helper to serialize Mongo documents
def serialize_doc(doc):
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.post("", response_model=TaskResponse)
async def create_task(task: TaskCreate, current_user: dict = Depends(get_current_user)):
    task_dict = task.dict()
    task_dict["created_at"] = datetime.utcnow().isoformat()
    task_dict["updated_at"] = task_dict["created_at"]
    task_dict["created_by"] = str(current_user["_id"])
    
    result = await db.tasks.insert_one(task_dict)
    created_task = await db.tasks.find_one({"_id": result.inserted_id})
    
    # Send notification if assigned to a specific user
    if task_dict.get("assigned_to"):
        assignee_id = task_dict["assigned_to"]
        print(f"DEBUG: Attempting to assign task to assignee_id: {assignee_id}")
        user_doc = await db.users.find_one({"_id": assignee_id})
        print(f"DEBUG: Result of db.users.find_one for assignee_id: {user_doc}")
        
        if user_doc:
            await create_notification(
                user_id=str(user_doc["_id"]),
                title="📌 New Task Assigned to You",
                message=f"{current_user.get('name', 'Admin')} assigned you a new task: '{task_dict.get('title', 'Untitled')}'",
                type="info",
                link="/task-board",
                pref_key="new_task_assigned"
            )
        
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Tasks",
        f"Created task '{task_dict.get('title', 'Untitled')}'"
    )

    return serialize_doc(created_task)

@router.get("", response_model=List[TaskResponse])
async def get_tasks(project_id: str = None, current_user: dict = Depends(get_current_user)):
    query = {"is_deleted": {"$ne": True}}
    if project_id:
        query["project_id"] = project_id
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"assigned_to": {"$in": allowed_ids}},
            {"assigned_to": {"$in": [current_user.get("name"), current_user.get("email")]}} # Fallback for old records using name/email
        ]
    
    cursor = db.tasks.find(query)
    tasks = await cursor.to_list(length=1000)
    return [serialize_doc(t) for t in tasks]

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: str):
    task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return serialize_doc(task)

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(task_id: str, task_update: TaskUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {k: v for k, v in task_update.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
        
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    # Fetch old task to see if assigned_to is changing
    old_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    
    result = await db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
        
    updated_task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    
    # Check if assigned_to changed or was just updated
    new_assignee = update_data.get("assigned_to")
    if new_assignee and (not old_task or old_task.get("assigned_to") != new_assignee):
        user_doc = await db.users.find_one({"_id": new_assignee})
        
        if user_doc:
            await create_notification(
                user_id=str(user_doc["_id"]),
                title="📌 Task Re-assigned to You",
                message=f"{current_user.get('name', 'Admin')} assigned you an existing task: '{updated_task.get('title', 'Untitled')}'",
                type="info",
                link="/task-board",
                pref_key="new_task_assigned"
            )
        
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Tasks",
        f"Updated task '{updated_task.get('title', 'Untitled')}'"
    )

    return serialize_doc(updated_task)

@router.delete("/{task_id}")
async def delete_task(task_id: str, current_user: dict = Depends(get_current_user)):
    task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    
    result = await db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
        
    title = task.get("title", "Untitled") if task else task_id
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Tasks",
        f"Deleted task '{title}'"
    )
        
    return {"status": "deleted"}
