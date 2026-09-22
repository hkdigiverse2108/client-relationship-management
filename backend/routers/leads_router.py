from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import List
import csv
from io import StringIO
from datetime import datetime
from bson import ObjectId
from models import LeadCreate, LeadUpdate, LeadResponse
from dependencies import get_current_user
from db import leads_collection, audit_logs_collection, users_collection, clients_collection
from audit_logger import log_audit_action
from routers.notifications_router import create_notification

router = APIRouter(prefix="/leads", tags=["Leads"])

@router.post("", response_model=LeadResponse)
async def create_lead(lead_in: LeadCreate, current_user: dict = Depends(get_current_user)):
    lead_dict = lead_in.model_dump()
    now = datetime.utcnow()
    lead_dict["created_by"] = str(current_user["_id"])
    lead_dict["created_at"] = now
    lead_dict["updated_at"] = now
    
    # Verify assignee exists
    assignee = await users_collection.find_one({"_id": lead_in.assigned_to})
    if not assignee and lead_in.assigned_to != str(current_user["_id"]):
        # Fallback if invalid assignee passed, assign to self
        lead_dict["assigned_to"] = str(current_user["_id"])
    
    result = await leads_collection.insert_one(lead_dict)
    lead_dict["_id"] = str(result.inserted_id)
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Create", 
        "Leads", 
        f"Created lead {lead_in.lead_name} ({lead_in.company_name})"
    )
    
    # Trigger Notifications
    if lead_dict["assigned_to"] != str(current_user["_id"]):
        # Notify the assigned user
        await create_notification(
            user_id=lead_dict["assigned_to"],
            title="New Lead Assigned",
            message=f"{current_user.get('name')} assigned a new lead to you: {lead_in.lead_name}.",
            type="info"
        )
        
    return LeadResponse(**lead_dict)

@router.post("/import")
async def import_leads(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
        
    content = await file.read()
    # Use utf-8-sig to automatically strip BOM (Byte Order Mark) if present from Excel
    try:
        decoded_content = content.decode('utf-8-sig')
    except UnicodeDecodeError:
        decoded_content = content.decode('latin1')
        
    # Read CSV and normalize headers
    csv_reader = csv.reader(StringIO(decoded_content))
    try:
        raw_headers = next(csv_reader)
    except StopIteration:
        raise HTTPException(status_code=400, detail="CSV file is empty")
        
    # Normalize headers: lower case, replace spaces with underscores, remove trailing spaces
    headers = [h.strip().lower().replace(" ", "_") for h in raw_headers]
    
    valid_leads = []
    skipped = 0
    now = datetime.utcnow()
    
    for row_values in csv_reader:
        if not any(row_values): # Skip empty rows
            continue
            
        row = dict(zip(headers, row_values))
        try:
            # Check mandatory fields based on schema
            if not row.get("lead_name") or not row.get("email"):
                skipped += 1
                continue
                
            lead_dict = {}
            lead_dict["lead_name"] = row.get("lead_name", "")
            lead_dict["company_name"] = row.get("company_name", "")
            lead_dict["first_name"] = row.get("first_name", "")
            lead_dict["last_name"] = row.get("last_name", "")
            lead_dict["mobile_number"] = row.get("mobile_number", "")
            lead_dict["alternate_number"] = row.get("alternate_number", "")
            lead_dict["email"] = row.get("email", "")
            lead_dict["website"] = row.get("website", "")
            lead_dict["industry"] = row.get("industry", "")
            lead_dict["source"] = row.get("source", "website")
            lead_dict["status"] = row.get("status", "new")
            lead_dict["priority"] = row.get("priority", "medium")
            lead_dict["tags"] = row.get("tags", "")
            lead_dict["expected_value"] = float(row.get("expected_value", 0))
            lead_dict["probability"] = float(row.get("probability", 0)) if row.get("probability") else None
            lead_dict["customer_type"] = row.get("customer_type", "individual")
            lead_dict["preferred_channel"] = row.get("preferred_channel", "Email")
            lead_dict["next_followup_date"] = row.get("next_followup_date", "")
            lead_dict["followup_status"] = row.get("followup_status", "scheduled")
            
            # Handle assignment
            assigned_to = row.get("assigned_to", "").strip()
            if not assigned_to:
                assigned_to = str(current_user["_id"])
            lead_dict["assigned_to"] = assigned_to
            
            lead_dict["city"] = row.get("city", "")
            lead_dict["state"] = row.get("state", "")
            lead_dict["country"] = row.get("country", "")
            lead_dict["pincode"] = row.get("pincode", "")
            lead_dict["requirement"] = row.get("requirement", "")
            lead_dict["description"] = row.get("description", "")
            lead_dict["notes"] = row.get("notes", "")
            
            lead_dict["created_by"] = str(current_user["_id"])
            lead_dict["created_at"] = now
            lead_dict["updated_at"] = now
            
            valid_leads.append(lead_dict)
        except Exception as e:
            skipped += 1
            
    if not valid_leads:
        raise HTTPException(status_code=400, detail=f"No valid leads found. Skipped {skipped} rows.")
        
    result = await leads_collection.insert_many(valid_leads)
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Import", 
        "Leads", 
        f"Imported {len(valid_leads)} leads successfully."
    )
    
    return {"message": f"Successfully imported {len(valid_leads)} leads.", "skipped": skipped}

@router.get("", response_model=List[LeadResponse])
async def get_leads(current_user: dict = Depends(get_current_user)):
    leads = []
    
    # If Super Admin or admin, see all leads. Else see assigned or created leads.
    if current_user["role"] in ["Super Admin", "admin"]:
        cursor = leads_collection.find().sort("created_at", -1)
    else:
        cursor = leads_collection.find({
            "$or": [
                {"assigned_to": str(current_user["_id"])},
                {"created_by": str(current_user["_id"])}
            ]
        }).sort("created_at", -1)
        
    async for lead in cursor:
        lead["_id"] = str(lead["_id"])
        leads.append(LeadResponse(**lead))
        
    return leads

@router.put("/{lead_id}", response_model=LeadResponse)
async def update_lead(lead_id: str, lead_update: LeadUpdate, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(lead_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid Lead ID")
        
    target_lead = await leads_collection.find_one({"_id": obj_id})
    if not target_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    if current_user["role"] not in ["Super Admin", "admin"] and target_lead.get("assigned_to") != str(current_user["_id"]) and target_lead.get("created_by") != str(current_user["_id"]):
        raise HTTPException(status_code=403, detail="Not authorized to edit this lead")

    update_data = lead_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Check if assignment changed
    old_assignee = target_lead.get("assigned_to")
    new_assignee = update_data.get("assigned_to")
    
    await leads_collection.update_one({"_id": obj_id}, {"$set": update_data})
    updated_lead = await leads_collection.find_one({"_id": obj_id})
    updated_lead["_id"] = str(updated_lead["_id"])
    
    # Auto-convert to client if status changed to 'won'
    if update_data.get("status") == "won" and target_lead.get("status") != "won":
        existing_client = await clients_collection.find_one({"converted_from_lead_id": lead_id})
        if not existing_client:
            latest_client = await clients_collection.find_one(
                {"client_id": {"$regex": "^CL-"}},
                sort=[("client_id", -1)]
            )
            new_client_id = "CL-0001"
            if latest_client and "client_id" in latest_client:
                try:
                    latest_num = int(latest_client["client_id"].split("-")[1])
                    new_client_id = f"CL-{latest_num + 1:04d}"
                except Exception:
                    pass
            
            new_client = {
                "client_id": new_client_id,
                "client_name": updated_lead.get("lead_name", ""),
                "company_name": updated_lead.get("company_name", ""),
                "mobile_number": updated_lead.get("mobile_number", ""),
                "alternate_number": updated_lead.get("alternate_number"),
                "email": updated_lead.get("email"),
                "website": updated_lead.get("website"),
                "industry": updated_lead.get("industry"),
                "customer_type": updated_lead.get("customer_type", "individual"),
                "status": "active",
                "assigned_to": updated_lead.get("assigned_to"),
                "address": updated_lead.get("address"),
                "city": updated_lead.get("city"),
                "state": updated_lead.get("state"),
                "country": updated_lead.get("country"),
                "pincode": updated_lead.get("pincode"),
                "converted_from_lead_id": lead_id,
                "created_by": current_user["_id"],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            await clients_collection.insert_one(new_client)
            await log_audit_action(
                audit_logs_collection, 
                current_user, 
                "Create", 
                "Clients", 
                f"Auto-converted client {new_client.get('company_name')} ({new_client_id}) from lead"
            )
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Update", 
        "Leads", 
        f"Updated lead {updated_lead.get('lead_name')}"
    )
    
    if new_assignee and new_assignee != old_assignee and new_assignee != str(current_user["_id"]):
        await create_notification(
            user_id=new_assignee,
            title="Lead Re-assigned",
            message=f"{current_user.get('name')} assigned a lead to you: {updated_lead.get('lead_name')}.",
            type="info"
        )
        
    return LeadResponse(**updated_lead)

@router.delete("/{lead_id}")
async def delete_lead(lead_id: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] not in ["Super Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete leads")
        
    try:
        obj_id = ObjectId(lead_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid Lead ID")
        
    target_lead = await leads_collection.find_one({"_id": obj_id})
    if not target_lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    await leads_collection.delete_one({"_id": obj_id})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Delete", 
        "Leads", 
        f"Deleted lead {target_lead.get('lead_name')}"
    )
    
    return {"status": "success", "message": "Lead deleted successfully"}
