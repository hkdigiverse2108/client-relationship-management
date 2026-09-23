from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import RolePresetCreate, RolePresetResponse
from db import db, audit_logs_collection
from dependencies import get_current_user
from audit_logger import log_audit_action
import pymongo

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.get("/presets", response_model=List[RolePresetResponse])
async def get_role_presets(current_user = Depends(get_current_user)):
    # Any user can view presets, but only the ones they are allowed to see
    # Global roles or roles created by their tenant admin
    
    presets = []
    role_presets_collection = db.get_collection("role_presets")
    
    query = {}
    if current_user.get("role") != "Super Admin":
        # Find the tenant admin ID
        if current_user.get("role") == "admin":
            tenant_admin_id = current_user["_id"]
        else:
            ancestors = current_user.get("ancestors", [])
            tenant_admin_id = ancestors[1] if len(ancestors) > 1 else current_user["_id"]
            
        query["$or"] = [
            {"created_by": tenant_admin_id},
            {"created_by": None},
            {"created_by": "system"},
            {"created_by": {"$exists": False}}
        ]

    async for preset in role_presets_collection.find(query):
        preset["id"] = str(preset.pop("_id"))
        presets.append(RolePresetResponse(**preset))
    return presets

@router.put("/presets/{role_name}", response_model=RolePresetResponse)
async def update_role_preset(role_name: str, preset: RolePresetCreate, current_user = Depends(get_current_user)):
    if current_user.get("role") not in ["Super Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to edit role presets")
        
    if preset.role_name != role_name:
        raise HTTPException(status_code=400, detail="Role name mismatch")
        
    preset_dict = preset.model_dump()
    # Add created_by if it's a new preset or being updated by an admin
    preset_dict["created_by"] = current_user["_id"]
    
    role_presets_collection = db.get_collection("role_presets")
    
    # Update or insert
    updated = await role_presets_collection.find_one_and_update(
        {"role_name": role_name, "created_by": current_user["_id"]},
        {"$set": preset_dict},
        upsert=True,
        return_document=pymongo.ReturnDocument.AFTER
    )
    
    if not updated:
        updated = await role_presets_collection.find_one({"role_name": role_name, "created_by": current_user["_id"]})
        
    if updated and "_id" in updated:
        updated["id"] = str(updated.pop("_id"))
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Roles",
        f"Updated role preset '{role_name}'"
    )
        
    return RolePresetResponse(**updated)
