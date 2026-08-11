from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime
from bson import ObjectId
from models import ContactCreate, ContactUpdate, ContactResponse
from db import db
from dependencies import get_current_user
from audit_logger import log_audit_action
from routers.notifications_router import create_notification

router = APIRouter(prefix="/contacts", tags=["Contacts"])
contacts_collection = db["contacts"]
audit_logs_collection = db["audit_logs"]

@router.post("", response_model=ContactResponse)
async def create_contact(contact: ContactCreate, current_user: dict = Depends(get_current_user)):
    # Uniqueness check
    existing = await contacts_collection.find_one({
        "$or": [
            {"email": contact.email},
            {"contact_number": contact.contact_number}
        ]
    })
    if existing:
        if existing.get("email") == contact.email and existing.get("contact_number") == contact.contact_number:
            raise HTTPException(
                status_code=409, 
                detail={
                    "message": "Contact with this mobile and email already exists",
                    "merge_candidate_id": str(existing["_id"])
                }
            )
        elif existing.get("email") == contact.email:
            raise HTTPException(status_code=400, detail="Contact with this email already exists")
        else:
            raise HTTPException(status_code=400, detail="Contact with this phone number already exists")

    contact_dict = contact.model_dump()
    contact_dict["created_by"] = str(current_user["_id"])
    now = datetime.utcnow()
    contact_dict["created_at"] = now
    contact_dict["updated_at"] = now
    
    result = await contacts_collection.insert_one(contact_dict)
    contact_dict["_id"] = str(result.inserted_id)
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Create", 
        "Contacts", 
        f"Created contact: {contact.contact_name}"
    )
    
    return ContactResponse(**contact_dict)

@router.get("", response_model=List[ContactResponse])
async def get_contacts(current_user: dict = Depends(get_current_user)):
    contacts = []
    cursor = contacts_collection.find().sort("created_at", -1)
        
    async for contact in cursor:
        contact["_id"] = str(contact["_id"])
        contacts.append(ContactResponse(**contact))
        
    return contacts

@router.put("/{contact_id}", response_model=ContactResponse)
async def update_contact(contact_id: str, contact_update: ContactUpdate, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(contact_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid Contact ID")
        
    # If updating email or phone, check uniqueness
    if contact_update.email or contact_update.contact_number:
        query = {"_id": {"$ne": obj_id}, "$or": []}
        if contact_update.email:
            query["$or"].append({"email": contact_update.email})
        if contact_update.contact_number:
            query["$or"].append({"contact_number": contact_update.contact_number})
            
        if query["$or"]:
            existing = await contacts_collection.find_one(query)
            if existing:
                if contact_update.email and existing.get("email") == contact_update.email:
                    raise HTTPException(status_code=400, detail="Email already belongs to another contact")
                else:
                    raise HTTPException(status_code=400, detail="Phone number already belongs to another contact")

    update_data = contact_update.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
        
    update_data["updated_at"] = datetime.utcnow()
    
    result = await contacts_collection.update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
        
    updated_contact = await contacts_collection.find_one({"_id": obj_id})
    updated_contact["_id"] = str(updated_contact["_id"])
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Update", 
        "Contacts", 
        f"Updated contact: {updated_contact.get('contact_name')}"
    )
    
    return ContactResponse(**updated_contact)

@router.delete("/{contact_id}")
async def delete_contact(contact_id: str, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(contact_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid Contact ID")
        
    contact = await contacts_collection.find_one({"_id": obj_id})
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
        
    await contacts_collection.delete_one({"_id": obj_id})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Delete", 
        "Contacts", 
        f"Deleted contact: {contact.get('contact_name')}"
    )
    
    return {"message": "Contact deleted successfully"}
