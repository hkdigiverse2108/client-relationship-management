from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import InvoiceCreate, InvoiceResponse
from db import invoices_collection
from dependencies import get_current_user

router = APIRouter(prefix="/invoices", tags=["invoices"])

@router.post("", response_model=InvoiceResponse)
async def create_invoice(invoice: InvoiceCreate, current_user: dict = Depends(get_current_user)):
    data = invoice.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await invoices_collection.insert_one(data)
    created = await invoices_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    return created

@router.get("", response_model=List[InvoiceResponse])
async def get_invoices(current_user: dict = Depends(get_current_user)):
    cursor = invoices_collection.find()
    invoices = []
    async for i in cursor:
        i["_id"] = str(i["_id"])
        invoices.append(i)
    return invoices

from models import InvoiceUpdate
from bson import ObjectId

@router.put("/{obj_id}", response_model=InvoiceResponse)
async def update_invoice(obj_id: str, invoice: InvoiceUpdate, current_user: dict = Depends(get_current_user)):
    data = invoice.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided")
    data["updated_at"] = datetime.utcnow()
    
    result = await invoices_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    updated = await invoices_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_invoice(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await invoices_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return {"message": "Invoice deleted successfully"}
