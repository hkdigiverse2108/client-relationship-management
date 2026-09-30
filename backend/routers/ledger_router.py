from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from models import LedgerEntryResponse
from db import ledger_collection, clients_collection
from dependencies import get_current_user, get_allowed_user_ids
from bson import ObjectId

router = APIRouter(prefix="/api/v1/ledger", tags=["General Ledger"])

@router.get("", response_model=List[dict])
async def get_ledger(current_user: dict = Depends(get_current_user)):
    """Fetch all ledger entries, enriched with client details."""
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["created_by"] = {"$in": allowed_ids}
        
    cursor = ledger_collection.find(query).sort("date", -1)
    entries = await cursor.to_list(length=1000)
    
    # Enrich with client details
    result = []
    for entry in entries:
        entry["_id"] = str(entry["_id"])
        
        # Optionally attach client name if client_id exists
        if entry.get("client_id"):
            client = await clients_collection.find_one({"_id": ObjectId(entry["client_id"])})
            if client:
                entry["client_name"] = client.get("name", client.get("company_name", "Unknown Client"))
                
        result.append(entry)
        
    return result

@router.get("/metrics")
async def get_ledger_metrics(current_user: dict = Depends(get_current_user)):
    """Get metrics for the Ledger dashboard cards."""
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["created_by"] = {"$in": allowed_ids}

    pipeline = [
        {
            "$match": query
        },
        {
            "$group": {
                "_id": "$type",
                "total": {"$sum": "$amount"},
                "count": {"$sum": 1}
            }
        }
    ]
    
    results = await ledger_collection.aggregate(pipeline).to_list(length=None)
    
    metrics = {
        "total_inflow": 0.0,
        "total_outflow": 0.0,
        "net_balance": 0.0,
        "total_entries": await ledger_collection.count_documents(query)
    }
    
    for row in results:
        t = row["_id"].lower()
        if t == "credit":
            metrics["total_inflow"] = row["total"]
        elif t == "debit":
            metrics["total_outflow"] = row["total"]
            
    metrics["net_balance"] = metrics["total_inflow"] - metrics["total_outflow"]
    
    return metrics
