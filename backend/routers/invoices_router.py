from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import InvoiceCreate, InvoiceResponse
from db import invoices_collection, client_history_collection, audit_logs_collection
from history_logger import log_client_history
from audit_logger import log_audit_action
from dependencies import get_current_user, get_allowed_user_ids

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
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Invoices",
        f"Created invoice '{data.get('invoice_number', '')}'"
    )
        
    # Auto-create pending payment for this invoice
    from db import payments_collection, ledger_collection
    
    payment_status = "Pending"
    if data.get("status") == "Paid":
        payment_status = "Completed"
    elif data.get("status") == "Partially Paid":
        payment_status = "Partial"

    import random
    payment_entry = {
        "payment_id": f"PAY-{random.randint(1000, 9999)}",
        "invoice_id": str(result.inserted_id),
        "client_id": data.get("client_id"),
        "amount_received": data.get("total_due", data.get("total_amount", 0)),
        "payment_date": datetime.utcnow().strftime('%Y-%m-%d'),
        "payment_method": "Auto-generated",
        "status": payment_status,
        "created_by": current_user["_id"],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "reference": data.get("invoice_number", ""),
        "transaction_reference": data.get("invoice_number", ""),
        "source_type": "Invoice"
    }
    await payments_collection.insert_one(payment_entry)
    
    # Auto-create reminder for payment collection
    if payment_status != "Completed":
        try:
            # Use next_issue_date if recurring, else due_date
            rem_date = data.get("next_issue_date") if data.get("is_recurring") and data.get("next_issue_date") else data.get("due_date")
            if not rem_date:
                rem_date = datetime.utcnow().strftime('%Y-%m-%d')
                
            reminder_entry = {
                "description": f"Collect payment for Invoice {data.get('invoice_number', '')}",
                "category": "Payment Collection",
                "priority": "high",
                "client_id": str(data.get("client_id", "")),
                "due_date": f"{rem_date} 10:00:00",
                "status": "pending",
                "created_by": current_user["_id"],
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat(),
                "linked_invoice_id": str(result.inserted_id)
            }
            from db import db
            await db["reminders"].insert_one(reminder_entry)
        except Exception as e:
            print("Failed to auto-create reminder:", e)
        
    if payment_status == "Completed":
        ledger_entry = {
            "entry_id": f"LEDG-{int(datetime.utcnow().timestamp())}",
            "date": datetime.utcnow().strftime('%Y-%m-%d'),
            "description": f"Invoice Payment: {data.get('invoice_number', 'N/A')}",
            "reference_id": payment_entry["payment_id"],
            "client_id": data.get("client_id"),
            "type": "Credit",
            "amount": payment_entry["amount_received"],
            "status": "settled",
            "created_by": current_user["_id"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        await ledger_collection.insert_one(ledger_entry)

    created["_id"] = str(created["_id"])
    return created

@router.get("/stats")
async def get_invoice_stats(current_user: dict = Depends(get_current_user)):
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"created_by": {"$exists": False}}
        ]
        
    cursor = invoices_collection.find(query)
    
    total_invoices = 0
    partially_paid = 0
    paid = 0
    overdue = 0
    unpaid = 0
    revenue = 0.0
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    async for i in cursor:
        total_invoices += 1
        status = i.get("status", "Draft")
        amt = float(i.get("total_due", i.get("total_amount", 0)))
        
        # Dynamic overdue check
        if status in ["Sent", "Partially Paid", "Draft", "Pending"] and i.get("due_date", "") < today_str:
            status = "Overdue"
            
        if status == "Partially Paid":
            partially_paid += 1
            revenue += amt
        elif status == "Paid":
            paid += 1
            revenue += amt
        elif status == "Overdue":
            overdue += 1
            unpaid += 1
        elif status in ["Sent", "Draft", "Pending"]:
            unpaid += 1
            
    return {
        "total_invoices": total_invoices,
        "partially_paid": partially_paid,
        "paid_invoices": paid,
        "overdue_invoices": overdue,
        "unpaid_invoices": unpaid,
        "revenue": revenue
    }

@router.get("", response_model=List[InvoiceResponse])
async def get_invoices(current_user: dict = Depends(get_current_user)):
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"created_by": {"$exists": False}}
        ]
        
    today_str = datetime.now().strftime("%Y-%m-%d")
    
    cursor = invoices_collection.find(query)
    invoices = []
    async for i in cursor:
        i["_id"] = str(i["_id"])
        
        # Dynamic overdue check
        status = i.get("status", "Draft")
        if status in ["Sent", "Partially Paid", "Draft", "Pending"] and i.get("due_date", "") < today_str:
            i["status"] = "Overdue"
            
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
    
    old_invoice = await invoices_collection.find_one({"_id": ObjectId(obj_id)})
    if not old_invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None and old_invoice.get("created_by") not in allowed_ids:
        raise HTTPException(status_code=403, detail="Not authorized to edit this invoice")
    
    result = await invoices_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    # If status updated to Paid, complete the reminder
    if data.get("status") == "Paid":
        from db import db
        await db.reminders.update_many(
            {"linked_invoice_id": obj_id},
            {"$set": {"status": "completed", "updated_at": datetime.utcnow().isoformat()}}
        )
        
    updated = await invoices_collection.find_one({"_id": ObjectId(obj_id)})
    
    if updated.get("client_id"):
        changes = []
        for k, v in data.items():
            if k not in ["updated_at", "updated_by"] and old_invoice.get(k) != v:
                if isinstance(v, list) or isinstance(v, dict):
                    changes.append(f"{k} was updated")
                else:
                    changes.append(f"{k} changed from '{old_invoice.get(k, '')}' to '{v}'")
        change_str = " Changes: " + ", ".join(changes) if changes else ""

        await log_client_history(
            client_history_collection,
            updated["client_id"],
            current_user,
            "Invoice Updated",
            f"Invoice {updated.get('invoice_number', '')} was updated.{change_str}"
        )
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Invoices",
        f"Updated invoice '{updated.get('invoice_number', '')}'"
    )
        
    # Sync status to Payments and Ledger
    if "status" in data:
        from db import payments_collection, ledger_collection
        payment_status = "Pending"
        if data["status"] == "Paid":
            payment_status = "Completed"
        elif data["status"] == "Partially Paid":
            payment_status = "Partial"
            
        await payments_collection.update_many(
            {"invoice_id": obj_id},
            {"$set": {"status": payment_status, "updated_at": datetime.utcnow()}}
        )
        
        if payment_status == "Completed":
            # Find the payments updated and create ledger entries if they don't exist
            payments = await payments_collection.find({"invoice_id": obj_id}).to_list(length=None)
            for p in payments:
                existing_ledger = await ledger_collection.find_one({"reference_id": p.get("payment_id")})
                if not existing_ledger:
                    ledger_entry = {
                        "entry_id": f"LEDG-{int(datetime.utcnow().timestamp())}",
                        "date": datetime.utcnow().strftime('%Y-%m-%d'),
                        "description": f"Invoice Payment: {updated.get('invoice_number', 'N/A')}",
                        "reference_id": p.get("payment_id"),
                        "client_id": updated.get("client_id"),
                        "type": "Credit",
                        "amount": p.get("amount_received", 0),
                        "status": "settled",
                        "created_by": current_user["_id"],
                        "created_at": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    }
                    await ledger_collection.insert_one(ledger_entry)

    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{obj_id}")
async def delete_invoice(obj_id: str, current_user: dict = Depends(get_current_user)):
    invoice = await invoices_collection.find_one({"_id": ObjectId(obj_id)})
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None and invoice.get("created_by") not in allowed_ids:
        raise HTTPException(status_code=403, detail="Not authorized to delete this invoice")
    
    result = await invoices_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")
        
    invoice_number = invoice.get("invoice_number", "") if invoice else obj_id
    
    if invoice.get("client_id"):
        await log_client_history(
            client_history_collection,
            invoice["client_id"],
            current_user,
            "Invoice Deleted",
            f"Invoice {invoice_number} was deleted."
        )

    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Invoices",
        f"Deleted invoice '{invoice_number}'"
    )
    
    return {"message": "Invoice deleted successfully"}
