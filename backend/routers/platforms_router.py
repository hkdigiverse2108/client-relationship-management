from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from db import platforms_collection
from dependencies import get_current_user, get_allowed_user_ids

router = APIRouter(prefix="/platforms", tags=["Platforms"])

class PlatformCreate(BaseModel):
    name: str
    status: Optional[str] = "Active"
    description: Optional[str] = ""

class PlatformResponse(PlatformCreate):
    id: str = Field(alias="_id")

@router.post("", response_model=PlatformResponse)
async def create_platform(platform: PlatformCreate, current_user: dict = Depends(get_current_user)):
    data = platform.model_dump()
    data["created_at"] = datetime.utcnow()
    data["created_by"] = str(current_user["_id"])
    result = await platforms_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return PlatformResponse(**data)

@router.get("", response_model=List[PlatformResponse])
async def get_platforms(current_user: dict = Depends(get_current_user)):
    allowed_ids = await get_allowed_user_ids(current_user)
    query = {"is_deleted": {"$ne": True}}
    if allowed_ids is not None:
        query["created_by"] = {"$in": allowed_ids}
        
    cursor = platforms_collection.find(query).sort("name", 1)
    platforms = []
    async for p in cursor:
        p["_id"] = str(p["_id"])
        platforms.append(PlatformResponse(**p))
    return platforms

@router.put("/{obj_id}", response_model=PlatformResponse)
async def update_platform(obj_id: str, platform: PlatformCreate, current_user: dict = Depends(get_current_user)):
    data = platform.model_dump()
    result = await platforms_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Platform not found")
        
    updated = await platforms_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
    return PlatformResponse(**updated)

@router.delete("/{obj_id}")
async def delete_platform(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await platforms_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": {"is_deleted": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Platform not found")
    return {"status": "success", "message": "Platform deleted successfully"}
