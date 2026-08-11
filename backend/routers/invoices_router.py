from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import InvoiceCreate, InvoiceResponse
from db import invoices_collection, client_history_collection
from history_logger import log_client_history
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
    
    if data.get("client_id"):
        await log_client_history(
            client_history_collection,
            data["client_id"],
            current_user,
            "Invoice Created",
            f"Invoice {data.get('invoice_number', '')} was created for {data.get('total_amount', 0)}"
        )
        
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
    
    if updated.get("client_id"):
        await log_client_history(
            client_history_collection,
            updated["client_id"],
            current_user,
            "Invoice Updated",
            f"Invoice {updated.get('invoice_number', '')} was updated."
        )
        
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_invoice(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await invoices_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return {"message": "Invoice deleted successfully"}
