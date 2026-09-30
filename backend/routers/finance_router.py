from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime, timedelta
import calendar
from bson import ObjectId
from db import invoices_collection, payments_collection, expenses_collection, ledger_collection, clients_collection
from dependencies import get_current_user, get_allowed_user_ids

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get("/dashboard/metrics")
async def get_dashboard_metrics(current_user: dict = Depends(get_current_user)):
    # 1. Calculate Revenue (Total from Payments or Paid Invoices)
    now = datetime.now()
    current_year_start = f"{now.year}-01-01"
    last_year_start = f"{now.year - 1}-01-01"
    last_year_end = f"{now.year - 1}-12-31"

    base_query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        base_query["created_by"] = {"$in": allowed_ids}

    # Current Year Revenue
    rev_cursor = payments_collection.aggregate([
        {"$match": {**base_query, "status": {"$in": ["Completed", "Partial"]}, "payment_date": {"$gte": current_year_start}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount_received"}}}
    ])
    rev_res = await rev_cursor.to_list(length=1)
    revenue = rev_res[0]["total"] if rev_res else 0

    # Last Year Revenue
    last_rev_cursor = payments_collection.aggregate([
        {"$match": {**base_query, "status": {"$in": ["Completed", "Partial"]}, "payment_date": {"$gte": last_year_start, "$lte": last_year_end}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount_received"}}}
    ])
    last_rev_res = await last_rev_cursor.to_list(length=1)
    last_revenue = last_rev_res[0]["total"] if last_rev_res else 0

    revenue_growth = ((revenue - last_revenue) / last_revenue * 100) if last_revenue > 0 else (100 if revenue > 0 else 0)

    # 2. Calculate Pending Receivables (Invoices not fully paid and not overdue)
    today_str = now.strftime("%Y-%m-%d")
    pending_cursor = invoices_collection.aggregate([
        {"$match": {**base_query, "status": {"$in": ["Sent", "Partially Paid", "Draft"]}, "due_date": {"$gte": today_str}}},
        {"$group": {"_id": None, "total": {"$sum": "$total_due"}}}
    ])
    pending_res = await pending_cursor.to_list(length=1)
    pending = pending_res[0]["total"] if pending_res else 0
    pending_growth = -2.1 # Mocking monthly pending shift for now

    # 3. Calculate Overdue (Invoices not fully paid and past due date)
    overdue_cursor = invoices_collection.aggregate([
        {"$match": {
            **base_query, 
            "status": {"$in": ["Sent", "Partially Paid", "Draft", "Overdue"]}, 
            "due_date": {"$lt": today_str}
        }},
        {"$group": {"_id": None, "total": {"$sum": "$total_due"}}}
    ])
    overdue_res = await overdue_cursor.to_list(length=1)
    overdue = overdue_res[0]["total"] if overdue_res else 0
    overdue_growth = 5.4 # Mocking monthly overdue shift for now
        
    # 4. Expenses
    exp_cursor = expenses_collection.aggregate([
        {"$match": {**base_query, "date": {"$gte": current_year_start}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ])
    exp_res = await exp_cursor.to_list(length=1)
    expenses = exp_res[0]["total"] if exp_res else 0

    last_exp_cursor = expenses_collection.aggregate([
        {"$match": {**base_query, "date": {"$gte": last_year_start, "$lte": last_year_end}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ])
    last_exp_res = await last_exp_cursor.to_list(length=1)
    last_expenses = last_exp_res[0]["total"] if last_exp_res else 0
    
    expenses_growth = ((expenses - last_expenses) / last_expenses * 100) if last_expenses > 0 else (100 if expenses > 0 else 0)

    # 5. Source Breakdown (Using Invoices)
    pipeline_source = [
        {"$match": base_query},
        {"$group": {"_id": "$source_type", "total": {"$sum": "$total_amount"}}}
    ]
    source_cursor = invoices_collection.aggregate(pipeline_source)
    source_results = await source_cursor.to_list(length=None)
    
    color_map = {
        "Project": "#0088FE",
        "E-commerce": "#00C49F",
        "Retainer": "#FFBB28",
        "Ad-hoc": "#FF8042"
    }
    
    sourceBreakdown = []
    for s in source_results:
        source_name = s["_id"] or "Unknown"
        sourceBreakdown.append({
            "name": source_name,
            "value": s["total"],
            "color": color_map.get(source_name, "#8884d8")
        })

    # 6. Recent Transactions (Fetch latest ledger entries for true Credit/Debit view)
    recent_ledger = await ledger_collection.find(base_query).sort("date", -1).limit(10).to_list(length=10)
    recentTransactions = []
    for entry in recent_ledger:
        entry_copy = dict(entry)
        entry_copy["_id"] = str(entry_copy["_id"])
        entry_copy["id"] = entry_copy.get("entry_id", "N/A")
        
        # Get client name if exists
        client_name = entry_copy.get("description", "System")
        if entry_copy.get("client_id"):
            client = await clients_collection.find_one({"_id": ObjectId(entry_copy["client_id"])})
            if client:
                client_name = client.get("name", client.get("company_name", "Unknown Client"))
                
        entry_copy["client"] = client_name
        entry_copy["date"] = entry_copy.get("date", "")
        entry_copy["amount"] = entry_copy.get("amount", 0)
        
        # Map ledger 'type' (Credit/Debit) to 'status' for frontend badge
        # We can pass Credit/Debit in the status column so the frontend handles it properly
        entry_copy["status"] = entry_copy.get("type", "Unknown")
        
        recentTransactions.append(entry_copy)

    # 7. Cash Flow (Live calculation for all 12 months of current year)
    cash_flow_dict = {}
    now = datetime.now()
    current_year = now.year
    
    # Generate 12 months keys
    for m in range(1, 13):
        month_str = f"{m:02d}"
        month_key = f"{current_year}-{month_str}"
        month_name = calendar.month_abbr[m]
        cash_flow_dict[month_key] = {"name": month_name, "income": 0, "expense": 0}

    # Start date string for aggregation
    year_start_str = f"{current_year}-01-01"
    year_end_str = f"{current_year}-12-31"

    # Aggregate Income (Payments)
    pipeline_cash_in = [
        {"$match": {**base_query, "status": {"$in": ["Completed", "Partial"]}, "payment_date": {"$gte": year_start_str, "$lte": year_end_str}}},
        {"$addFields": {"month": {"$substr": ["$payment_date", 0, 7]}}},
        {"$group": {"_id": "$month", "income": {"$sum": "$amount_received"}}}
    ]
    income_cursor = payments_collection.aggregate(pipeline_cash_in)
    income_results = await income_cursor.to_list(length=None)
    
    # Aggregate Expenses
    pipeline_cash_out = [
        {"$match": {**base_query, "date": {"$gte": year_start_str, "$lte": year_end_str}}},
        {"$addFields": {"month": {"$substr": ["$date", 0, 7]}}},
        {"$group": {"_id": "$month", "expense": {"$sum": "$amount"}}}
    ]
    expense_cursor = expenses_collection.aggregate(pipeline_cash_out)
    expense_results = await expense_cursor.to_list(length=None)

    for r in income_results:
        if r["_id"] in cash_flow_dict:
            cash_flow_dict[r["_id"]]["income"] = r["income"]
            
    for r in expense_results:
        if r["_id"] in cash_flow_dict:
            cash_flow_dict[r["_id"]]["expense"] = r["expense"]
            
    cashFlow = list(cash_flow_dict.values())

    return {
        "metrics": {
            "revenue": revenue,
            "pending": pending,
            "overdue": overdue,
            "expenses": expenses,
            "revenue_growth": round(revenue_growth, 1),
            "pending_growth": round(pending_growth, 1),
            "overdue_growth": round(overdue_growth, 1),
            "expenses_growth": round(expenses_growth, 1)
        },
        "sourceBreakdown": sourceBreakdown,
        "recentTransactions": recentTransactions,
        "cashFlow": cashFlow
    }

@router.post("/seed")
async def seed_finance_data():
    # Insert dummy invoices, payments, and expenses to test the dashboard
    import random
    
    invoices_to_insert = [
        {"invoice_number": "INV-001", "source_type": "Project", "total_amount": 45000, "gst_amount": 8100, "status": "paid", "issue_date": "2023-10-25", "due_date": "2023-11-25"},
        {"invoice_number": "ORD-892", "source_type": "E-commerce", "total_amount": 2500, "gst_amount": 450, "status": "paid", "issue_date": "2023-10-24", "due_date": "2023-10-24"},
        {"invoice_number": "INV-002", "source_type": "Retainer", "total_amount": 15000, "gst_amount": 2700, "status": "sent", "issue_date": "2023-10-20", "due_date": "2023-11-20"},
        {"invoice_number": "INV-003", "source_type": "Project", "total_amount": 85000, "gst_amount": 15300, "status": "sent", "issue_date": "2023-09-15", "due_date": "2023-10-15"}, # Overdue
    ]
    
    # Delete existing test data to avoid duplication on multiple clicks
    await invoices_collection.delete_many({"invoice_number": {"$in": ["INV-001", "ORD-892", "INV-002", "INV-003"]}})
    await payments_collection.delete_many({"transaction_reference": "SEED_TEST"})
    await expenses_collection.delete_many({"transaction_reference": "SEED_TEST"})

    # Insert Invoices
    result = await invoices_collection.insert_many(invoices_to_insert)
    
    # Insert corresponding payments for the "paid" invoices
    # We will use recent dates so they show up in the current 6 months cash flow.
    now = datetime.now()
    current_month_str = now.strftime("%Y-%m-%d")
    last_month_str = (now.replace(day=1) - timedelta(days=1)).strftime("%Y-%m-%d")
    two_months_ago_str = ((now.replace(day=1) - timedelta(days=1)).replace(day=1) - timedelta(days=1)).strftime("%Y-%m-%d")

    payments_to_insert = [
        {"amount_received": 45000, "payment_date": current_month_str, "payment_method": "bank_transfer", "transaction_reference": "SEED_TEST", "source_type": "Project"},
        {"amount_received": 2500, "payment_date": last_month_str, "payment_method": "upi", "transaction_reference": "SEED_TEST", "source_type": "E-commerce"},
        {"amount_received": 15000, "payment_date": two_months_ago_str, "payment_method": "bank_transfer", "transaction_reference": "SEED_TEST", "source_type": "Retainer"}
    ]
    await payments_collection.insert_many(payments_to_insert)

    # Insert Expenses
    expenses_to_insert = [
        {"description": "Office Rent", "amount": 25000, "expense_date": current_month_str, "transaction_reference": "SEED_TEST"},
        {"description": "Software Subscriptions", "amount": 15000, "expense_date": last_month_str, "transaction_reference": "SEED_TEST"},
        {"description": "Marketing", "amount": 5000, "expense_date": two_months_ago_str, "transaction_reference": "SEED_TEST"},
    ]
    await expenses_collection.insert_many(expenses_to_insert)

    return {"message": "Dummy finance data seeded successfully. Reload dashboard to see live data."}
