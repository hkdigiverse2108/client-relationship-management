from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from bson import ObjectId
from models import (
    HRNoticeCreate, HRNoticeResponse, 
    HREventCreate, HREventResponse, 
    HRCustomTypeCreate, HRCustomTypeResponse,
    HRAssetCreate, HRAssetResponse,
    HRAppraisalCreate, HRAppraisalResponse
)
from db import db
from dependencies import get_current_user
import math

router = APIRouter()

# --- HR Notices / Announcements ---
@router.post("/notices", response_model=HRNoticeResponse)
async def create_notice(notice: HRNoticeCreate, current_user: dict = Depends(get_current_user)):
    notice_data = notice.dict()
    notice_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_notices.insert_one(notice_data)
    notice_data["_id"] = str(result.inserted_id)
    return notice_data

@router.get("/notices", response_model=List[HRNoticeResponse])
async def get_notices(current_user: dict = Depends(get_current_user)):
    notices = await db.hr_notices.find().sort("created_at", -1).to_list(1000)
    for n in notices:
        n["_id"] = str(n["_id"])
    return notices

@router.put("/notices/{notice_id}", response_model=HRNoticeResponse)
async def update_notice(notice_id: str, notice: HRNoticeCreate, current_user: dict = Depends(get_current_user)):
    update_data = notice.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_notices.find_one_and_update(
        {"_id": ObjectId(notice_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Notice not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/notices/{notice_id}")
async def delete_notice(notice_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_notices.delete_one({"_id": ObjectId(notice_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Notice not found")
    return {"message": "Notice deleted"}

@router.delete("/custom-types/{type_id}")
async def delete_type(type_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_custom_types.delete_one({"_id": ObjectId(type_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Type not found")
    return {"message": "Type deleted"}

# --- HR Assets ---
@router.post("/assets", response_model=HRAssetResponse)
async def create_asset(asset: HRAssetCreate, current_user: dict = Depends(get_current_user)):
    asset_data = asset.dict()
    asset_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_assets.insert_one(asset_data)
    asset_data["_id"] = str(result.inserted_id)
    return asset_data

@router.get("/assets", response_model=List[HRAssetResponse])
async def get_assets(current_user: dict = Depends(get_current_user)):
    assets = await db.hr_assets.find().sort("created_at", -1).to_list(1000)
    for a in assets:
        a["_id"] = str(a["_id"])
    return assets

@router.put("/assets/{asset_id}", response_model=HRAssetResponse)
async def update_asset(asset_id: str, asset: HRAssetCreate, current_user: dict = Depends(get_current_user)):
    update_data = asset.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_assets.find_one_and_update(
        {"_id": ObjectId(asset_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Asset not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/assets/{asset_id}")
async def delete_asset(asset_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_assets.delete_one({"_id": ObjectId(asset_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Asset not found")
    return {"message": "Asset deleted"}


# --- HR Appraisals ---
@router.post("/appraisals", response_model=HRAppraisalResponse)
async def create_appraisal(appraisal: HRAppraisalCreate, current_user: dict = Depends(get_current_user)):
    appraisal_data = appraisal.dict()
    appraisal_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_appraisals.insert_one(appraisal_data)
    appraisal_data["_id"] = str(result.inserted_id)
    return appraisal_data

@router.get("/appraisals", response_model=List[HRAppraisalResponse])
async def get_appraisals(current_user: dict = Depends(get_current_user)):
    appraisals = await db.hr_appraisals.find().sort("created_at", -1).to_list(1000)
    for a in appraisals:
        a["_id"] = str(a["_id"])
    return appraisals

@router.put("/appraisals/{appraisal_id}", response_model=HRAppraisalResponse)
async def update_appraisal(appraisal_id: str, appraisal: HRAppraisalCreate, current_user: dict = Depends(get_current_user)):
    update_data = appraisal.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_appraisals.find_one_and_update(
        {"_id": ObjectId(appraisal_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Appraisal not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/appraisals/{appraisal_id}")
async def delete_appraisal(appraisal_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_appraisals.delete_one({"_id": ObjectId(appraisal_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appraisal not found")
    return {"message": "Appraisal deleted"}

# --- HR Dashboard Stats ---
@router.get("/dashboard/department-stats")
async def get_department_stats(current_user: dict = Depends(get_current_user)):
    # 1. Fetch all departments
    departments_cursor = db.hr_custom_types.find({"type": "department"})
    departments = await departments_cursor.to_list(1000)
    
    # default departments if none
    if not departments:
        dept_names = ['Engineering', 'Sales', 'HR', 'Marketing', 'Customer Support']
    else:
        dept_names = [d["name"] for d in departments]

    # 2. Total employees (users)
    total_employees = await db.users.count_documents({})
    if total_employees == 0:
        return [{"name": name, "count": 0, "percentage": 0} for name in dept_names]

    # 3. Aggregate users by department
    pipeline = [
        {"$group": {"_id": "$department", "count": {"$sum": 1}}}
    ]
    dept_counts = await db.users.aggregate(pipeline).to_list(1000)
    
    # Create a lookup dictionary (handle None department)
    count_map = {}
    for d in dept_counts:
        key = d["_id"] if d["_id"] else "Unassigned"
        count_map[key] = d["count"]

    # 4. Map counts to known departments
    stats = []
    for name in dept_names:
        count = count_map.get(name, 0)
        percentage = math.floor((count / total_employees) * 100) if total_employees > 0 else 0
        stats.append({
            "name": name,
            "count": count,
            "percentage": percentage
        })
        # Remove from count_map so we can add the rest
        if name in count_map:
            del count_map[name]

    # 5. Add any remaining departments (e.g. Unassigned, or old departments)
    for name, count in count_map.items():
        percentage = math.floor((count / total_employees) * 100) if total_employees > 0 else 0
        stats.append({
            "name": name,
            "count": count,
            "percentage": percentage
        })

    return stats


# --- HR Events ---
@router.post("/events", response_model=HREventResponse)
async def create_event(event: HREventCreate, current_user: dict = Depends(get_current_user)):
    event_data = event.dict()
    event_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_events.insert_one(event_data)
    event_data["_id"] = str(result.inserted_id)
    return event_data

@router.get("/events", response_model=List[HREventResponse])
async def get_events(current_user: dict = Depends(get_current_user)):
    events = await db.hr_events.find().sort("date", 1).to_list(1000)
    for e in events:
        e["_id"] = str(e["_id"])
    return events

@router.put("/events/{event_id}", response_model=HREventResponse)
async def update_event(event_id: str, event: HREventCreate, current_user: dict = Depends(get_current_user)):
    update_data = event.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_events.find_one_and_update(
        {"_id": ObjectId(event_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Event not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/events/{event_id}")
async def delete_event(event_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_events.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}


# --- Custom Event Types ---
@router.post("/event-types", response_model=HRCustomTypeResponse)
async def create_event_type(custom_type: HRCustomTypeCreate, current_user: dict = Depends(get_current_user)):
    type_data = custom_type.dict()
    type_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_event_types.insert_one(type_data)
    type_data["_id"] = str(result.inserted_id)
    return type_data

@router.get("/event-types", response_model=List[HRCustomTypeResponse])
async def get_event_types(current_user: dict = Depends(get_current_user)):
    types = await db.hr_event_types.find().to_list(1000)
    for t in types:
        t["_id"] = str(t["_id"])
    return types

# --- Generic Custom Types (for Departments, etc.) ---
@router.post("/custom-types", response_model=HRCustomTypeResponse)
async def create_custom_type(custom_type: HRCustomTypeCreate, current_user: dict = Depends(get_current_user)):
    type_data = custom_type.dict()
    type_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_custom_types.insert_one(type_data)
    type_data["_id"] = str(result.inserted_id)
    return type_data

@router.get("/custom-types", response_model=List[HRCustomTypeResponse])
async def get_custom_types(current_user: dict = Depends(get_current_user)):
    types = await db.hr_custom_types.find().to_list(1000)
    for t in types:
        t["_id"] = str(t["_id"])
    return types

