from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import DealCreate, DealResponse
from db import deals_collection
from dependencies import get_current_user

router = APIRouter(prefix="/deals", tags=["deals"])

@router.post("", response_model=DealResponse)
async def create_deal(deal: DealCreate, current_user: dict = Depends(get_current_user)):
    data = deal.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await deals_collection.insert_one(data)
    created = await deals_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return created

@router.get("", response_model=List[DealResponse])
async def get_deals(current_user: dict = Depends(get_current_user)):
    cursor = deals_collection.find()
    deals = []
    async for d in cursor:
        d["_id"] = str(d["_id"])
        deals.append(d)
    return deals

from models import DealUpdate
from bson import ObjectId

@router.put("/{obj_id}", response_model=DealResponse)
async def update_deal(obj_id: str, deal: DealUpdate, current_user: dict = Depends(get_current_user)):
    data = deal.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided")
    data["updated_at"] = datetime.utcnow()
    
    result = await deals_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Deal not found")
        
    updated = await deals_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_deal(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await deals_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"message": "Deal deleted successfully"}
