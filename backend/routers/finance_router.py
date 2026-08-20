from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime, timedelta
from bson import ObjectId
from db import invoices_collection, payments_collection
from dependencies import get_current_user

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get("/dashboard/metrics")
async def get_dashboard_metrics(current_user: dict = Depends(get_current_user)):
    # 1. Calculate Revenue (Total from Payments or Paid Invoices)
    # Using Payments for actual cash flow Revenue
    pipeline_revenue = [
        {"$group": {"_id": None, "total": {"$sum": "$amount_received"}}}
    ]
    revenue_cursor = payments_collection.aggregate(pipeline_revenue)
    revenue_result = await revenue_cursor.to_list(length=1)
    revenue = revenue_result[0]["total"] if revenue_result else 0

    # 2. Calculate Pending Receivables (Invoices not fully paid)
    # Status in ["sent", "partial", "draft"] maybe? For now, "sent" or "partial"
    pending_cursor = invoices_collection.find({"status": {"$in": ["sent", "partial"]}})
    pending = 0
    async for inv in pending_cursor:
        pending += inv.get("total_amount", 0)

    # 3. Calculate Overdue
    today_str = datetime.now().strftime("%Y-%m-%d")
    overdue_cursor = invoices_collection.find({
        "status": {"$in": ["sent", "partial"]},
        "due_date": {"$lt": today_str}
    })
    overdue = 0
    async for inv in overdue_cursor:
        overdue += inv.get("total_amount", 0)
        
    # 4. Expenses (Placeholder until Expense model is created)
    expenses = 450000

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
        recentTransactions.append({
            "id": inv.get("invoice_number", "N/A"),
            "source": inv.get("source_type", "Unknown"),
            "client": "Client Data" if inv.get("client_id") else "Direct Customer",
            "date": inv.get("issue_date", ""),
            "amount": inv.get("total_amount", 0),
            "status": "Paid" if inv.get("status") == "paid" else "Pending",
            "gst_amount": inv.get("gst_amount", 0)
        })

    # 7. Cash Flow (Placeholder for last 6 months, real calculation requires monthly grouping)
    # We will use dummy trend to keep UI looking good until full transactions are seeded.
    cashFlow = [
        {"name": "Jan", "income": 400000, "expense": 240000},
        {"name": "Feb", "income": 300000, "expense": 139800},
        {"name": "Mar", "income": 200000, "expense": 980000},
        {"name": "Apr", "income": 278000, "expense": 390800},
        {"name": "May", "income": 189000, "expense": 480000},
        {"name": "Jun", "income": 239000, "expense": 380000},
        {"name": "Jul", "income": 349000, "expense": 430000},
    ]

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
    # Insert dummy invoices and payments to test the dashboard
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

    # Insert Invoices
    result = await invoices_collection.insert_many(invoices_to_insert)
    
    # Insert corresponding payments for the "paid" invoices
    payments_to_insert = [
        {"amount_received": 45000, "payment_date": "2023-10-26", "payment_method": "bank_transfer", "transaction_reference": "SEED_TEST", "source_type": "Project"},
        {"amount_received": 2500, "payment_date": "2023-10-24", "payment_method": "upi", "transaction_reference": "SEED_TEST", "source_type": "E-commerce"}
    ]
    await payments_collection.insert_many(payments_to_insert)

    return {"message": "Dummy finance data seeded successfully. Reload dashboard to see live data."}
