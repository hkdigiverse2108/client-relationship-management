from fastapi import APIRouter, HTTPException, Depends
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
async def create_task(task: TaskCreate):
    task_dict = task.dict()
    task_dict["created_at"] = datetime.utcnow().isoformat()
    task_dict["updated_at"] = task_dict["created_at"]
    task_dict["created_by"] = "system" # Mocking user for now
    
    result = await db.tasks.insert_one(task_dict)
    created_task = await db.tasks.find_one({"_id": result.inserted_id})
    
    # Send notification if assigned to a specific user
    if task_dict.get("assigned_to"):
        assignee_name = task_dict["assigned_to"]
        user_doc = await db.users.find_one({"$or": [{"name": assignee_name}, {"email": assignee_name}]})
        if user_doc:
            await create_notification(
                user_id=str(user_doc["_id"]),
                title="New Task Assigned",
                message=f"You have been assigned a new task: {task_dict.get('title', 'Untitled')}",
                type="info",
                link="/tasks"
            )
        
        
    await log_audit_action(
        audit_logs_collection,
        {"_id": "system", "name": "System"},
        "Create",
        "Tasks",
        f"Created task '{task_dict.get('title', 'Untitled')}'"
    )

    return serialize_doc(created_task)

@router.get("", response_model=List[TaskResponse])
async def get_tasks(project_id: str = None):
    query = {}
    if project_id:
        query["project_id"] = project_id
    
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
async def update_task(task_id: str, task_update: TaskUpdate):
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
        user_doc = await db.users.find_one({"$or": [{"name": new_assignee}, {"email": new_assignee}]})
        if user_doc:
            await create_notification(
                user_id=str(user_doc["_id"]),
                title="Task Assigned to You",
                message=f"You have been assigned a task: {updated_task.get('title', 'Untitled')}",
                type="info",
                link="/tasks"
            )
        
        
    await log_audit_action(
        audit_logs_collection,
        {"_id": "system", "name": "System"},
        "Update",
        "Tasks",
        f"Updated task '{updated_task.get('title', 'Untitled')}'"
    )

    return serialize_doc(updated_task)

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    task = await db.tasks.find_one({"_id": ObjectId(task_id)})
    
    result = await db.tasks.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
        
    title = task.get("title", "Untitled") if task else task_id
    await log_audit_action(
        audit_logs_collection,
        {"_id": "system", "name": "System"},
        "Delete",
        "Tasks",
        f"Deleted task '{title}'"
    )
        
    return {"status": "deleted"}
