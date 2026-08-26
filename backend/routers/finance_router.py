from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime, timedelta
import calendar
from bson import ObjectId
from db import invoices_collection, payments_collection, expenses_collection
from dependencies import get_current_user

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get("/dashboard/metrics")
async def get_dashboard_metrics(current_user: dict = Depends(get_current_user)):
    # 1. Calculate Revenue (Total from Payments or Paid Invoices)
    pipeline_revenue = [
        {"$group": {"_id": None, "total": {"$sum": "$amount_received"}}}
    ]
    revenue_cursor = payments_collection.aggregate(pipeline_revenue)
    revenue_result = await revenue_cursor.to_list(length=1)
    revenue = revenue_result[0]["total"] if revenue_result else 0

    # 2. Calculate Pending Receivables (Invoices not fully paid)
    pipeline_pending = [
        {"$match": {"status": {"$in": ["sent", "partial"]}}},
        {"$group": {"_id": None, "total": {"$sum": "$total_amount"}}}
    ]
    pending_cursor = invoices_collection.aggregate(pipeline_pending)
    pending_result = await pending_cursor.to_list(length=1)
    pending = pending_result[0]["total"] if pending_result else 0

    # 3. Calculate Overdue
    today_str = datetime.now().strftime("%Y-%m-%d")
    pipeline_overdue = [
        {"$match": {"status": {"$in": ["sent", "partial"]}, "due_date": {"$lt": today_str}}},
        {"$group": {"_id": None, "total": {"$sum": "$total_amount"}}}
    ]
    overdue_cursor = invoices_collection.aggregate(pipeline_overdue)
    overdue_result = await overdue_cursor.to_list(length=1)
    overdue = overdue_result[0]["total"] if overdue_result else 0
        
    # 4. Expenses
    pipeline_expenses = [
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ]
    expenses_cursor = expenses_collection.aggregate(pipeline_expenses)
    expenses_result = await expenses_cursor.to_list(length=1)
    expenses = expenses_result[0]["total"] if expenses_result else 0

    # 5. Source Breakdown (Using Invoices)
    pipeline_source = [
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

    # 6. Recent Transactions (Fetch latest invoices and payments, merge and sort)
    recent_invoices = await invoices_collection.find().sort("issue_date", -1).limit(5).to_list(length=5)
    recentTransactions = []
    for inv in recent_invoices:
        inv_copy = dict(inv)
        inv_copy["_id"] = str(inv_copy["_id"])
        inv_copy["id"] = inv_copy.get("invoice_number", "N/A")
        inv_copy["source"] = inv_copy.get("source_type", "Unknown")
        inv_copy["client"] = "Client Data" if inv_copy.get("client_id") else "Direct Customer"
        inv_copy["date"] = inv_copy.get("issue_date", "")
        inv_copy["amount"] = inv_copy.get("total_amount", 0)
        status = inv_copy.get("status", "draft")
        inv_copy["status"] = "Paid" if status == "paid" else ("Pending" if status in ["sent", "partial"] else status.capitalize())
        inv_copy["gst_amount"] = inv_copy.get("gst_amount", 0)
        recentTransactions.append(inv_copy)

    # 7. Cash Flow (Live calculation for last 6 months using aggregation)
    cash_flow_dict = {}
    now = datetime.now()
    
    # Generate last 6 months keys
    for i in range(5, -1, -1):
        m = now.month - i
        y = now.year
        if m <= 0:
            m += 12
            y -= 1
        month_str = f"{m:02d}"
        month_key = f"{y}-{month_str}"
        month_name = calendar.month_abbr[m]
        cash_flow_dict[month_key] = {"name": month_name, "income": 0, "expense": 0}

    # Six months ago start string
    six_months_ago_m = now.month - 5
    six_months_ago_y = now.year
    if six_months_ago_m <= 0:
        six_months_ago_m += 12
        six_months_ago_y -= 1
    six_months_ago_str = f"{six_months_ago_y}-{six_months_ago_m:02d}-01"

    # Aggregate Income (Payments)
    pipeline_cash_in = [
        {"$match": {"payment_date": {"$gte": six_months_ago_str}}},
        {"$addFields": {"month": {"$substr": ["$payment_date", 0, 7]}}},
        {"$group": {"_id": "$month", "income": {"$sum": "$amount_received"}}}
    ]
    income_cursor = payments_collection.aggregate(pipeline_cash_in)
    income_results = await income_cursor.to_list(length=None)
    
    # Aggregate Expenses
    pipeline_cash_out = [
        {"$match": {"expense_date": {"$gte": six_months_ago_str}}},
        {"$addFields": {"month": {"$substr": ["$expense_date", 0, 7]}}},
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
            "expenses": expenses
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
