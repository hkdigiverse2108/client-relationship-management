from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from datetime import datetime, timedelta
from bson import ObjectId
import math

from models import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from db import expenses_collection, ledger_collection
from dependencies import get_current_user

router = APIRouter(prefix="/api/v1/expenses", tags=["Expenses"])

@router.get("/", response_model=List[ExpenseResponse])
async def list_expenses(
    category: str = None, 
    start_date: str = None, 
    end_date: str = None, 
    current_user: dict = Depends(get_current_user)
):
    query = {}
    if category:
        query["category"] = category
    
    if start_date or end_date:
        query["date"] = {}
        if start_date:
            query["date"]["$gte"] = start_date
        if end_date:
            query["date"]["$lte"] = end_date

    cursor = expenses_collection.find(query).sort("date", -1)
    expenses = await cursor.to_list(length=1000)
    
    # Format ObjectId to string
    for exp in expenses:
        exp["_id"] = str(exp["_id"])
    return expenses

@router.post("/", response_model=ExpenseResponse)
async def create_expense(expense: ExpenseCreate, current_user: dict = Depends(get_current_user)):
    data = expense.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await expenses_collection.insert_one(data)
    created = await expenses_collection.find_one({"_id": result.inserted_id})
    created["_id"] = str(created["_id"])
    
    # Auto-create Ledger Entry if status is Cleared
    if data.get("status", "Pending") == "Cleared":
        ledger_entry = {
            "entry_id": f"LEDG-EXP-{int(datetime.utcnow().timestamp())}",
            "date": data.get("date", datetime.utcnow().strftime('%Y-%m-%d')),
            "description": f"Expense: {data.get('category')} - {data.get('merchant')}",
            "reference_id": created["_id"],
            "client_id": "", # Expenses typically don't have clients in this context
            "type": "Debit", # Outflow
            "amount": data.get("amount", 0),
            "status": "settled",
            "created_by": current_user["_id"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        await ledger_collection.insert_one(ledger_entry)

    return created

@router.put("/{expense_id}", response_model=ExpenseResponse)
async def update_expense(expense_id: str, expense: ExpenseUpdate, current_user: dict = Depends(get_current_user)):
    data = expense.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    data["updated_at"] = datetime.utcnow()
    
    # Check current status before update
    existing_expense = await expenses_collection.find_one({"_id": ObjectId(expense_id)})
    if not existing_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
        
    old_status = existing_expense.get("status", "Pending")
    new_status = data.get("status", old_status)

    result = await expenses_collection.update_one(
        {"_id": ObjectId(expense_id)},
        {"$set": data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Update failed")
        
    # Handle Ledger updates if status changed
    if old_status != "Cleared" and new_status == "Cleared":
        # It just cleared, add to ledger
        ledger_entry = {
            "entry_id": f"LEDG-EXP-{int(datetime.utcnow().timestamp())}",
            "date": data.get("date", existing_expense.get("date")),
            "description": f"Expense: {data.get('category', existing_expense.get('category'))} - {data.get('merchant', existing_expense.get('merchant'))}",
            "reference_id": expense_id,
            "client_id": "",
            "type": "Debit",
            "amount": data.get("amount", existing_expense.get("amount", 0)),
            "status": "settled",
            "created_by": current_user["_id"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        await ledger_collection.insert_one(ledger_entry)
    elif old_status == "Cleared" and new_status != "Cleared":
        # Status reverted from Cleared, remove from ledger
        await ledger_collection.delete_many({"reference_id": expense_id, "type": "Debit"})
    elif old_status == "Cleared" and new_status == "Cleared":
        # Status remained Cleared, update the existing ledger entry
        await ledger_collection.update_one(
            {"reference_id": expense_id, "type": "Debit"},
            {"$set": {
                "date": data.get("date", existing_expense.get("date")),
                "description": f"Expense: {data.get('category', existing_expense.get('category'))} - {data.get('merchant', existing_expense.get('merchant'))}",
                "amount": data.get("amount", existing_expense.get("amount")),
                "updated_at": datetime.utcnow()
            }}
        )

    updated = await expenses_collection.find_one({"_id": ObjectId(expense_id)})
    updated["_id"] = str(updated["_id"])
    return updated

@router.delete("/{expense_id}")
async def delete_expense(expense_id: str, current_user: dict = Depends(get_current_user)):
    # Delete the expense
    result = await expenses_collection.delete_one({"_id": ObjectId(expense_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")
        
    # Also delete corresponding ledger entries
    await ledger_collection.delete_many({"reference_id": expense_id, "type": "Debit"})
    
    return {"message": "Expense and associated ledger entries deleted"}

@router.get("/metrics", response_model=Dict[str, Any])
async def get_expense_metrics(current_user: dict = Depends(get_current_user)):
    now = datetime.utcnow()
    current_month_str = now.strftime('%Y-%m')
    current_year_str = now.strftime('%Y')
    
    pipeline_month = [
        {"$match": {"date": {"$regex": f"^{current_month_str}"}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
    ]
    
    pipeline_year = [
        {"$match": {"date": {"$regex": f"^{current_year_str}"}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ]
    
    pipeline_category = [
        {"$match": {"date": {"$regex": f"^{current_month_str}"}}},
        {"$group": {"_id": "$category", "total": {"$sum": "$amount"}}},
        {"$sort": {"total": -1}},
        {"$limit": 1}
    ]
    
    month_res = await expenses_collection.aggregate(pipeline_month).to_list(1)
    year_res = await expenses_collection.aggregate(pipeline_year).to_list(1)
    cat_res = await expenses_collection.aggregate(pipeline_category).to_list(1)
    
    total_month = month_res[0]["total"] if month_res else 0
    total_year = year_res[0]["total"] if year_res else 0
    
    # Calculate Average Daily (for current month up to today)
    days_in_month = now.day
    avg_daily = round(total_month / days_in_month, 2) if days_in_month > 0 else 0
    
    top_category = "N/A"
    top_category_amount = 0
    if cat_res:
        top_category = cat_res[0]["_id"]
        top_category_amount = cat_res[0]["total"]
        
    return {
        "this_month": total_month,
        "ytd": total_year,
        "average_daily": avg_daily,
        "top_category": top_category,
        "top_category_amount": top_category_amount
    }
