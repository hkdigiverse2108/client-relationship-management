from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import ProjectCreate, ProjectResponse
from db import projects_collection, client_history_collection
from history_logger import log_client_history
from dependencies import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("", response_model=ProjectResponse)
async def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user)):
    data = project.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await projects_collection.insert_one(data)
    created = await projects_collection.find_one({"_id": result.inserted_id})
    
    if data.get("client_id"):
        await log_client_history(
            client_history_collection,
            data["client_id"],
            current_user,
            "Project Created",
            f"Project '{data.get('title', '')}' was created."
        )
        
    created["_id"] = str(created["_id"])
    return created

@router.get("", response_model=List[ProjectResponse])
async def get_projects(current_user: dict = Depends(get_current_user)):
    cursor = projects_collection.find()
    projects = []
    async for p in cursor:
        p["_id"] = str(p["_id"])
        projects.append(p)
    return projects

from models import ProjectUpdate
from bson import ObjectId

@router.put("/{obj_id}", response_model=ProjectResponse)
async def update_project(obj_id: str, project: ProjectUpdate, current_user: dict = Depends(get_current_user)):
    data = project.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided")
    data["updated_at"] = datetime.utcnow()
    
    result = await projects_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
        
    updated = await projects_collection.find_one({"_id": ObjectId(obj_id)})
    
    if updated.get("client_id"):
        await log_client_history(
            client_history_collection,
            updated["client_id"],
            current_user,
            "Project Updated",
            f"Project '{updated.get('title', '')}' was updated (Status: {updated.get('status', 'Unknown')}."
        )
        
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_project(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await projects_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}
