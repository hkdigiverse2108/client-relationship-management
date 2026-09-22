from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from models import QuoteCreate, QuoteUpdate, QuoteResponse
from db import quotes_collection, audit_logs_collection
from dependencies import get_current_user
from audit_logger import log_audit_action

router = APIRouter(prefix="/quotes", tags=["quotes"])

@router.post("", response_model=QuoteResponse)
async def create_quote(quote: QuoteCreate, current_user: dict = Depends(get_current_user)):
    quote_dict = quote.dict()
    quote_dict["created_at"] = datetime.utcnow()
    quote_dict["updated_at"] = datetime.utcnow()
    quote_dict["created_by"] = str(current_user.get("_id", "system"))
    
    result = await quotes_collection.insert_one(quote_dict)
    quote_dict["_id"] = str(result.inserted_id)
    
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Quotes",
        f"Created quote '{quote_dict.get('quote_number', '')}'"
    )
    
    return quote_dict

@router.get("", response_model=List[QuoteResponse])
async def get_quotes(current_user: dict = Depends(get_current_user)):
    cursor = quotes_collection.find()
    quotes = []
    async for q in cursor:
        q["_id"] = str(q["_id"])
        quotes.append(q)
    return quotes

@router.get("/{obj_id}", response_model=QuoteResponse)
async def get_quote(obj_id: str, current_user: dict = Depends(get_current_user)):
    quote = await quotes_collection.find_one({"_id": ObjectId(obj_id)})
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    quote["_id"] = str(quote["_id"])
    return quote

@router.put("/{obj_id}", response_model=QuoteResponse)
async def update_quote(obj_id: str, quote: QuoteUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {k: v for k, v in quote.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
        
    update_data["updated_at"] = datetime.utcnow()
    
    result = await quotes_collection.update_one(
        {"_id": ObjectId(obj_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
        
    updated = await quotes_collection.find_one({"_id": ObjectId(obj_id)})
    
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Quotes",
        f"Updated quote '{updated.get('quote_number', '')}'"
    )
        
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_quote(obj_id: str, current_user: dict = Depends(get_current_user)):
    quote = await quotes_collection.find_one({"_id": ObjectId(obj_id)})
    
    result = await quotes_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
        
    quote_number = quote.get("quote_number", "") if quote else obj_id
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Quotes",
        f"Deleted quote '{quote_number}'"
    )
    
    return {"message": "Quote deleted successfully"}
