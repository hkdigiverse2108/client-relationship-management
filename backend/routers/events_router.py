from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from db import db
from dependencies import get_current_user

router = APIRouter(prefix="/events", tags=["events"])

class EventCreate(BaseModel):
    title: str
    date: str
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    className: Optional[str] = "bg-transparent-primary"

class EventUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    className: Optional[str] = None

class EventResponse(EventCreate):
    id: str = Field(alias="_id")
    created_by: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

def serialize_doc(doc):
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.get("", response_model=List[EventResponse])
async def get_events(current_user: dict = Depends(get_current_user)):
    cursor = db.events.find({"is_deleted": {"$ne": True}})
    events = await cursor.to_list(length=1000)
    return [serialize_doc(e) for e in events]

@router.post("", response_model=EventResponse)
async def create_event(event_in: EventCreate, current_user: dict = Depends(get_current_user)):
    now = datetime.utcnow()
    event_dict = event_in.dict()
    event_dict["created_by"] = current_user["_id"]
    event_dict["created_at"] = now
    event_dict["updated_at"] = now
    event_dict["is_deleted"] = False
    
    result = await db.events.insert_one(event_dict)
    created = await db.events.find_one({"_id": result.inserted_id})
    return serialize_doc(created)

@router.put("/{event_id}", response_model=EventResponse)
async def update_event(event_id: str, event_update: EventUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {k: v for k, v in event_update.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
        
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.events.update_one(
        {"_id": ObjectId(event_id), "is_deleted": {"$ne": True}},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
        
    updated = await db.events.find_one({"_id": ObjectId(event_id)})
    return serialize_doc(updated)

@router.delete("/{event_id}")
async def delete_event(event_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.events.update_one(
        {"_id": ObjectId(event_id), "is_deleted": {"$ne": True}},
        {"$set": {"is_deleted": True, "updated_at": datetime.utcnow()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}
