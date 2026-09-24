from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from models import ClientCreate, ClientResponse, ClientUpdate, ClientStatsResponse
from db import clients_collection, audit_logs_collection, deals_collection, projects_collection, invoices_collection, payments_collection, client_history_collection
from dependencies import get_current_user
from audit_logger import log_audit_action
from history_logger import log_client_history
from bson import ObjectId

router = APIRouter(prefix="/clients", tags=["clients"])

async def generate_client_id():
    # Find the client with the highest client_id
    # Assuming format CL-0001, sort by client_id descending
    latest_client = await clients_collection.find_one(
        {"client_id": {"$regex": "^CL-"}},
        sort=[("client_id", -1)]
    )
    if latest_client and "client_id" in latest_client:
        try:
            latest_num = int(latest_client["client_id"].split("-")[1])
            new_num = latest_num + 1
            return f"CL-{new_num:04d}"
        except Exception:
            return "CL-0001"
    return "CL-0001"

@router.post("", response_model=ClientResponse)
async def create_client(client: ClientCreate, current_user: dict = Depends(get_current_user)):
    # Generate client ID if not provided
    if not client.client_id:
        client.client_id = await generate_client_id()
        
    client_dict = client.model_dump(exclude_unset=True)
    client_dict["created_by"] = current_user["_id"]
    client_dict["created_at"] = datetime.utcnow()
    client_dict["updated_at"] = client_dict["created_at"]
    
    result = await clients_collection.insert_one(client_dict)
    created_client = await clients_collection.find_one({"_id": result.inserted_id})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Create", 
        "Clients", 
        f"Created client {client.company_name} ({client.client_id})"
    )
    
    await log_client_history(
        client_history_collection,
        str(created_client["_id"]),
        current_user,
        "Client Created",
        f"Client {client.client_name or client.company_name} was created."
    )
    
    created_client["_id"] = str(created_client["_id"])
    return ClientResponse(**created_client)

from datetime import timedelta

@router.get("/stats", response_model=ClientStatsResponse)
async def get_client_stats(current_user: dict = Depends(get_current_user)):
    base_query = {}
    
    # Optional RBAC: If Super Admin or admin, see all. Else might restrict (commented out for now if clients are global, 
    # but let's apply same logic as leads if needed)
    if current_user["role"] not in ["Super Admin", "admin"]:
        base_query = {
            "created_by": str(current_user["_id"])
        }

    now = datetime.utcnow()
    one_week_ago = now - timedelta(days=7)
    two_weeks_ago = now - timedelta(days=14)

    def build_stat_detail(current_count, previous_count, all_time_count):
        if previous_count == 0:
            percent_change = 100.0 if current_count > 0 else 0.0
        else:
            percent_change = ((current_count - previous_count) / previous_count) * 100
        
        return {
            "count": all_time_count,
            "percent_change": round(abs(percent_change), 2),
            "is_positive": percent_change >= 0
        }

    async def fetch_count(match):
        if not match:
            query = base_query
        elif not base_query:
            query = match
        else:
            query = {"$and": [base_query, match]}
        return await clients_collection.count_documents(query)

    # 1. Total Clients
    total_all_time = await fetch_count({})
    total_current = await fetch_count({"created_at": {"$gte": one_week_ago}})
    total_previous = await fetch_count({"created_at": {"$gte": two_weeks_ago, "$lt": one_week_ago}})
    total_stat = build_stat_detail(total_current, total_previous, total_all_time)

    # 2. Active Clients
    active_all_time = await fetch_count({"status": "active"})
    active_current = await fetch_count({"status": "active", "created_at": {"$gte": one_week_ago}})
    active_previous = await fetch_count({"status": "active", "created_at": {"$gte": two_weeks_ago, "$lt": one_week_ago}})
    active_stat = build_stat_detail(active_current, active_previous, active_all_time)

    # 3. Inactive Clients
    inactive_all_time = await fetch_count({"status": "inactive"})
    inactive_current = await fetch_count({"status": "inactive", "created_at": {"$gte": one_week_ago}})
    inactive_previous = await fetch_count({"status": "inactive", "created_at": {"$gte": two_weeks_ago, "$lt": one_week_ago}})
    inactive_stat = build_stat_detail(inactive_current, inactive_previous, inactive_all_time)

    # 4. New Clients (Same as Total current in this logic, but let's measure based on last 30 days or just total)
    # The requirement says "New Clients". Usually this implies created recently. Let's use last 30 days as new clients count
    # Or just use same logic as total_current for all_time, but only count those in last month.
    # We will use "created_at in last 30 days" for the all_time count for "New Clients".
    thirty_days_ago = now - timedelta(days=30)
    new_all_time = await fetch_count({"created_at": {"$gte": thirty_days_ago}})
    # For percent change, compare current week vs previous week
    new_current = await fetch_count({"created_at": {"$gte": one_week_ago}})
    new_previous = await fetch_count({"created_at": {"$gte": two_weeks_ago, "$lt": one_week_ago}})
    new_stat = build_stat_detail(new_current, new_previous, new_all_time)

    return ClientStatsResponse(
        total_clients=total_stat,
        active_clients=active_stat,
        inactive_clients=inactive_stat,
        new_clients=new_stat
    )

@router.get("", response_model=List[ClientResponse])
async def get_all_clients(current_user: dict = Depends(get_current_user)):
    # In future, filter based on user permissions
    cursor = clients_collection.find()
    clients = []
    async for client in cursor:
        client["_id"] = str(client["_id"])
        try:
            clients.append(ClientResponse(**client))
        except Exception as e:
            print(f"Skipping client {client.get('_id')} due to validation error: {e}")
    return clients

@router.put("/{client_id}", response_model=ClientResponse)
async def update_client(client_id: str, client_update: ClientUpdate, current_user: dict = Depends(get_current_user)):
    target_client = await clients_collection.find_one({"_id": ObjectId(client_id)})
    if not target_client:
        raise HTTPException(status_code=404, detail="Client not found")
        
    update_data = client_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await clients_collection.update_one({"_id": ObjectId(client_id)}, {"$set": update_data})
    updated_client = await clients_collection.find_one({"_id": ObjectId(client_id)})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Update", 
        "Clients", 
        f"Updated client {updated_client.get('company_name')} ({updated_client.get('client_id')})"
    )
    
    await log_client_history(
        client_history_collection,
        client_id,
        current_user,
        "Client Updated",
        "Client details were updated."
    )
    
    updated_client["_id"] = str(updated_client["_id"])
    return ClientResponse(**updated_client)

@router.delete("/{client_id}")
async def delete_client(client_id: str, current_user: dict = Depends(get_current_user)):
    target_client = await clients_collection.find_one({"_id": ObjectId(client_id)})
    if not target_client:
        raise HTTPException(status_code=404, detail="Client not found")
        
    await clients_collection.delete_one({"_id": ObjectId(client_id)})
    
    await log_audit_action(
        audit_logs_collection, 
        current_user, 
        "Delete", 
        "Clients", 
        f"Deleted client {target_client.get('company_name')} ({target_client.get('client_id')})"
    )
    
    return {"message": "Client deleted successfully"}

@router.get("/{client_id}/history")
async def get_client_history(client_id: str, current_user: dict = Depends(get_current_user)):
    cursor = client_history_collection.find({"client_id": client_id}).sort("timestamp", -1)
    history = []
    async for entry in cursor:
        entry["_id"] = str(entry["_id"])
        if "timestamp" in entry and entry["timestamp"]:
            entry["timestamp"] = entry["timestamp"].replace(tzinfo=timezone.utc)
        history.append(entry)
    return history

@router.get("/{obj_id}/dashboard")
async def get_client_dashboard(obj_id: str, current_user: dict = Depends(get_current_user)):
    try:
        client = await clients_collection.find_one({"_id": ObjectId(obj_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Client ID")
        
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
        
    client["_id"] = str(client["_id"])
    client_id_str = client["_id"]
    
    # 1. Fetch related entities
    deals_cursor = deals_collection.find({"client_id": client_id_str})
    deals = []
    async for d in deals_cursor:
        d["_id"] = str(d["_id"])
        deals.append(d)
        
    projects_cursor = projects_collection.find({"client_id": client_id_str})
    projects = []
    async for p in projects_cursor:
        p["_id"] = str(p["_id"])
        projects.append(p)
        
    invoices_cursor = invoices_collection.find({"client_id": client_id_str})
    invoices = []
    async for i in invoices_cursor:
        i["_id"] = str(i["_id"])
        invoices.append(i)
        
    payments_cursor = payments_collection.find({"client_id": client_id_str})
    payments = []
    async for p in payments_cursor:
        p["_id"] = str(p["_id"])
        payments.append(p)
        
    # 2. Calculate Financials
    total_contract_value = sum(inv.get("total_amount", 0) for inv in invoices if inv.get("status") in ["sent", "paid", "partial", "overdue", "draft"])
    amount_received = sum(pay.get("amount_received", 0) for pay in payments)
    pending_amount = total_contract_value - amount_received
    
    return {
        "client": client,
        "deals": deals,
        "projects": projects,
        "invoices": invoices,
        "payments": payments,
        "financials": {
            "total_contract_value": total_contract_value,
            "amount_received": amount_received,
            "pending_amount": pending_amount
        }
    }
