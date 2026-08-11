from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import DealCreate, DealResponse, NotificationCreate
from db import deals_collection, notifications_collection, client_history_collection
from history_logger import log_client_history
from dependencies import get_current_user

router = APIRouter(prefix="/deals", tags=["deals"])

@router.post("", response_model=DealResponse)
async def create_deal(deal: DealCreate, current_user: dict = Depends(get_current_user)):
    data = deal.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    if not data.get("assigned_to"):
        data["assigned_to"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await deals_collection.insert_one(data)
    created = await deals_collection.find_one({"_id": result.inserted_id})
    
    if data.get("client_id"):
        await log_client_history(
            client_history_collection,
            data["client_id"],
            current_user,
            "Deal Created",
            f"Deal '{data.get('title', '')}' was created with value {data.get('value', 0)}"
        )
        
    created["_id"] = str(created["_id"])
    
    # Notify assigned user
    if data.get("assigned_to"):
        notification = NotificationCreate(
            user_id=data["assigned_to"],
            title="New Deal Assigned",
            message=f"You have been assigned a new deal: {data['title']}",
            type="info",
            link="/pipeline"
        )
        notif_data = notification.model_dump(exclude_unset=True)
        notif_data["created_at"] = datetime.utcnow()
        await notifications_collection.insert_one(notif_data)

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
    
    old_deal = await deals_collection.find_one({"_id": ObjectId(obj_id)})
    if not old_deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    result = await deals_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
        
    updated = await deals_collection.find_one({"_id": ObjectId(obj_id)})
    
    if updated.get("client_id"):
        await log_client_history(
            client_history_collection,
            updated["client_id"],
            current_user,
            "Deal Updated",
            f"Deal '{updated.get('title', '')}' was updated (Stage: {updated.get('stage', 'Unknown')})."
        )
        
    updated["_id"] = str(updated["_id"])
    
    # Notify if assigned_to changed
    if data.get("assigned_to") and data.get("assigned_to") != old_deal.get("assigned_to"):
        notification = NotificationCreate(
            user_id=data["assigned_to"],
            title="Deal Assigned",
            message=f"You have been assigned an existing deal: {updated['title']}",
            type="info",
            link="/pipeline"
        )
        notif_data = notification.model_dump(exclude_unset=True)
        notif_data["created_at"] = datetime.utcnow()
        await notifications_collection.insert_one(notif_data)

    return updated

@router.delete("/{obj_id}")
async def delete_deal(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await deals_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"message": "Deal deleted successfully"}
