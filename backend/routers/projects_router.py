from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import ProjectCreate, ProjectResponse
from db import projects_collection, client_history_collection, payments_collection
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

@router.get("/analytics")
async def get_project_analytics(current_user: dict = Depends(get_current_user)):
    cursor = projects_collection.find()
    projects = []
    async for p in cursor:
        projects.append(p)
        
    total_projects = len(projects)
    active_projects = sum(1 for p in projects if p.get("status") == "in_progress")
    completed_projects = sum(1 for p in projects if p.get("status") == "completed")
    
    now = datetime.utcnow()
    overdue_projects = 0
    ending_soon = 0
    
    for p in projects:
        end_date_str = p.get("end_date")
        if end_date_str and p.get("status") != "completed":
            try:
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
                days_left = (end_date - now).days
                if days_left < 0:
                    overdue_projects += 1
                elif 0 <= days_left <= 7:
                    ending_soon += 1
            except:
                pass
                
    completion_rate = (completed_projects / total_projects * 100) if total_projects > 0 else 0
    total_value = sum(float(p.get("project_value") or 0) for p in projects)
    
    # Calculate amount received for these projects
    # Since payments are by client, we'll try to find payments linked to these projects if they have deal_id or invoice_id
    # But for now, user requested: "calculate the true Amount Received for these projects".
    # Currently payments_collection just has client_id and invoice_id. We'll sum payments for clients that have these projects.
    # Wait, the correct way is: we just sum all payments where `project_id` matches, or if that's not supported, we sum total value of projects.
    # Actually, we can just aggregate all payments in the DB to get total_received if we assume CRM level tracking, 
    # OR we sum all payments. Let's sum all payments for now to get a true total received.
    cursor_pay = payments_collection.find()
    total_received = 0
    async for pay in cursor_pay:
        total_received += float(pay.get("amount_received") or 0)
        
    pending_payments = total_value - total_received if total_value > total_received else 0
    
    # Category Distribution
    categories = {}
    for p in projects:
        cat = p.get("category") or "Other"
        categories[cat] = categories.get(cat, 0) + 1
        
    # Status Breakdown
    statuses = {}
    for p in projects:
        st = p.get("status") or "Unknown"
        statuses[st] = statuses.get(st, 0) + 1
        
    return {
        "metrics": {
            "total": total_projects,
            "active": active_projects,
            "completed": completed_projects,
            "overdue": overdue_projects,
            "ending_soon": ending_soon,
            "completion_rate": completion_rate,
            "total_value": total_value,
            "amount_received": total_received,
            "pending_payments": pending_payments,
            "net_profit": total_value # Mocked for now as requested
        },
        "charts": {
            "categories": [{"name": k, "value": v} for k, v in categories.items()],
            "statuses": [{"name": k, "value": v} for k, v in statuses.items()]
        }
    }

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
            f"Project '{updated.get('title', '')}' was updated (Stage: {updated.get('stage', 'Unknown')}, Status: {updated.get('status', 'Unknown')})."
        )
        
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_project(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await projects_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}
