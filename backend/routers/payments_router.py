from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import PaymentCreate, PaymentResponse, PaymentUpdate, LedgerEntryCreate
from db import payments_collection, client_history_collection, audit_logs_collection, ledger_collection
from history_logger import log_client_history
from audit_logger import log_audit_action
from dependencies import get_current_user, get_allowed_user_ids

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("", response_model=PaymentResponse)
async def create_payment(payment: PaymentCreate, current_user: dict = Depends(get_current_user)):
    data = payment.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await payments_collection.insert_one(data)
    created = await payments_collection.find_one({"_id": result.inserted_id})
    
    if data.get("client_id"):
        await log_client_history(
            client_history_collection,
            data["client_id"],
            current_user,
            "Payment Received",
            f"Payment of {data.get('amount_received', 0)} received via {data.get('payment_method', 'Unknown')}"
        )
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Payments",
        f"Created payment of {data.get('amount_received', 0)}"
    )
    
    # Auto-create Ledger Entry (Credit)
    if data.get("status", "").lower() == "completed":
        ledger_entry = {
            "entry_id": f"LEDG-{int(datetime.utcnow().timestamp())}",
            "date": data.get("payment_date", datetime.utcnow().strftime('%Y-%m-%d')),
            "description": f"Payment Received via {data.get('payment_method', 'Unknown')}",
            "reference_id": created.get("payment_id", str(result.inserted_id)),
            "client_id": data.get("client_id"),
            "type": "Credit",
            "amount": data.get("amount_received", 0),
            "status": "settled",
            "created_by": current_user["_id"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        await ledger_collection.insert_one(ledger_entry)
        
    created["_id"] = str(created["_id"])
    return created

@router.get("", response_model=List[PaymentResponse])
async def get_payments(current_user: dict = Depends(get_current_user)):
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["created_by"] = {"$in": allowed_ids}
        
    cursor = payments_collection.find(query)
    payments = []
    async for p in cursor:
        p["_id"] = str(p["_id"])
        payments.append(p)
    return payments

from bson import ObjectId

@router.put("/{obj_id}", response_model=PaymentResponse)
async def update_payment(obj_id: str, payment: PaymentUpdate, current_user: dict = Depends(get_current_user)):
    data = payment.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided")
    data["updated_at"] = datetime.utcnow()
    
    old_payment = await payments_collection.find_one({"_id": ObjectId(obj_id)})
    if not old_payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None and old_payment.get("created_by") not in allowed_ids:
        raise HTTPException(status_code=403, detail="Not authorized to edit this payment")
    
    result = await payments_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    updated = await payments_collection.find_one({"_id": ObjectId(obj_id)})
    
    if updated.get("client_id"):
        changes = []
        for k, v in data.items():
            if k not in ["updated_at", "updated_by"] and old_payment.get(k) != v:
                changes.append(f"{k} changed from '{old_payment.get(k, '')}' to '{v}'")
        change_str = " Changes: " + ", ".join(changes) if changes else ""
        
        await log_client_history(
            client_history_collection,
            updated["client_id"],
            current_user,
            "Payment Updated",
            f"Payment {updated.get('payment_id', '')} was updated.{change_str}"
        )
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Payments",
        f"Updated payment {obj_id}"
    )
    
    # Update Ledger Entry if status changed to completed, or update amount
    # Simplified approach: upsert based on reference_id
    if updated.get("status", "").lower() == "completed":
        ledger_entry = {
            "entry_id": f"LEDG-{int(datetime.utcnow().timestamp())}",
            "date": updated.get("payment_date", datetime.utcnow().strftime('%Y-%m-%d')),
            "description": f"Payment Received via {updated.get('payment_method', 'Unknown')}",
            "reference_id": updated.get("payment_id", str(updated["_id"])),
            "client_id": updated.get("client_id"),
            "type": "Credit",
            "amount": updated.get("amount_received", 0),
            "status": "settled",
            "updated_at": datetime.utcnow()
        }
        
        # Check if ledger entry exists
        existing = await ledger_collection.find_one({"reference_id": updated.get("payment_id", str(updated["_id"]))})
        if existing:
            await ledger_collection.update_one({"_id": existing["_id"]}, {"$set": ledger_entry})
        else:
            ledger_entry["created_by"] = current_user["_id"]
            ledger_entry["created_at"] = datetime.utcnow()
            await ledger_collection.insert_one(ledger_entry)
            
    # Sync status back to Invoice if it is linked
    if "status" in data and updated.get("invoice_id"):
        from db import invoices_collection
        inv_status = "Sent" # Default fallback for Pending/Failed
        if data["status"] == "Completed":
            inv_status = "Paid"
        elif data["status"] == "Partial":
            inv_status = "Partially Paid"
            
        try:
            await invoices_collection.update_one(
                {"_id": ObjectId(updated["invoice_id"])},
                {"$set": {"status": inv_status, "updated_at": datetime.utcnow()}}
            )
            
            if data["status"] == "Completed":
                from db import db
                await db.reminders.update_many(
                    {"linked_invoice_id": updated["invoice_id"]},
                    {"$set": {"status": "completed", "updated_at": datetime.utcnow().isoformat()}}
                )
        except Exception as e:
            print("Failed to sync invoice status or reminder:", e)

    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_payment(obj_id: str, current_user: dict = Depends(get_current_user)):
    payment = await payments_collection.find_one({"_id": ObjectId(obj_id)})
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None and payment.get("created_by") not in allowed_ids:
        raise HTTPException(status_code=403, detail="Not authorized to delete this payment")
    
    result = await payments_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    amount = payment.get("amount_received", 0) if payment else "unknown"
    
    if payment.get("client_id"):
        await log_client_history(
            client_history_collection,
            payment["client_id"],
            current_user,
            "Payment Deleted",
            f"Payment of {amount} was deleted."
        )

    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Payments",
        f"Deleted payment of {amount}"
    )
    
    return {"message": "Payment deleted successfully"}
