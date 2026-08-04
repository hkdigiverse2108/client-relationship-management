from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from typing import Dict, Any
from dependencies import get_current_user
from models import UserResponse
from db import leads_collection, audit_logs_collection

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

def compute_delta(current: float, previous: float) -> float:
    if previous == 0:
        return 100.0 if current > 0 else 0.0
    return round(((current - previous) / previous) * 100, 1)

@router.get("/stats", response_model=Dict[str, Any])
async def get_dashboard_stats(current_user: UserResponse = Depends(get_current_user)):
    now = datetime.utcnow()
    last_30_days = now - timedelta(days=30)
    prev_30_days = now - timedelta(days=60)

    # 1. Total Revenue (Won Leads)
    # 2. Active Leads (Not Won, Not Lost)
    # 3. Conversion Rate (Won Leads / Total Leads * 100)
    
    # We will compute these for the entire time or last 30 days? 
    # Usually KPI cards show all-time value but the delta is for the period.
    # We will do all-time for the KPI values, or last 30 days for everything?
    # Let's do all-time for values, and 30-day delta.
    
    # Actually, typically "Total Revenue" is all-time or YTD, but delta is vs last period.
    # Let's query all leads.
    pipeline = [
        {
            "$facet": {
                "current_period": [
                    {"$match": {"created_at": {"$gte": last_30_days.isoformat()}}}
                ],
                "previous_period": [
                    {"$match": {"created_at": {"$gte": prev_30_days.isoformat(), "$lt": last_30_days.isoformat()}}}
                ],
                "all_time": [
                    {"$match": {}}
                ]
            }
        }
    ]

    result = await leads_collection.aggregate(pipeline).to_list(1)
    data = result[0] if result else {"current_period": [], "previous_period": [], "all_time": []}

    def calc_metrics(leads_list):
        active_statuses = ["New Lead", "Contacted", "Qualified", "Proposal Sent", "Negotiation"]
        
        total_leads = len(leads_list)
        active_leads = sum(1 for l in leads_list if l.get("status") in active_statuses)
        won_leads = sum(1 for l in leads_list if l.get("status") == "Won")
        
        # Assume value is stored under 'value' key as a float/int
        revenue = sum(float(l.get("value", 0)) for l in leads_list if l.get("status") == "Won")
        
        conversion_rate = (won_leads / total_leads * 100) if total_leads > 0 else 0
        
        # Calculate Funnel
        qualified_leads = sum(1 for l in leads_list if l.get("status") in ["Qualified", "Proposal Sent", "Negotiation", "Won"])
        
        funnel = [
            {"label": "Visitors", "value": 0},
            {"label": "Leads Captured", "value": total_leads},
            {"label": "Qualified", "value": qualified_leads},
            {"label": "Closed Won", "value": won_leads},
        ]
        
        # Calculate Sources (all time usually makes more sense, but we'll return it per-period or just use all_time)
        source_counts = {}
        for l in leads_list:
            src = l.get("source") or "Other"
            source_counts[src] = source_counts.get(src, 0) + 1
            
        sources = []
        if total_leads > 0:
            for src, count in source_counts.items():
                pct = round((count / total_leads) * 100)
                sources.append({
                    "label": f"{src} ({pct}%)",
                    "value": count
                })
        
        return {
            "revenue": revenue,
            "active_leads": active_leads,
            "conversion_rate": conversion_rate,
            "won_leads": won_leads,
            "sources": sorted(sources, key=lambda x: x["value"], reverse=True),
            "funnel": funnel
        }

    all_metrics = calc_metrics(data["all_time"])
    curr_metrics = calc_metrics(data["current_period"])
    prev_metrics = calc_metrics(data["previous_period"])

    revenue_delta = compute_delta(curr_metrics["revenue"], prev_metrics["revenue"])
    active_delta = compute_delta(curr_metrics["active_leads"], prev_metrics["active_leads"])
    conv_delta = compute_delta(curr_metrics["conversion_rate"], prev_metrics["conversion_rate"])

    stats = [
        {
            "key": "revenue",
            "label": "Total Revenue",
            "value": all_metrics["revenue"],
            "delta": revenue_delta,
            "trend": "up" if revenue_delta >= 0 else "down",
            "format": "currency"
        },
        {
            "key": "deals",
            "label": "Active Leads",
            "value": all_metrics["active_leads"],
            "delta": active_delta,
            "trend": "up" if active_delta >= 0 else "down",
            "format": "number"
        },
        {
            "key": "leads",
            "label": "Conversion Rate",
            "value": round(all_metrics["conversion_rate"], 1),
            "delta": conv_delta,
            "trend": "up" if conv_delta >= 0 else "down",
            "format": "percent"
        },
        {
            "key": "winrate",
            "label": "WhatsApp Volume",
            "value": 63, # Static as requested
            "delta": 4.5,
            "trend": "up",
            "format": "percent"
        }
    ]

    # Fetch Recent Activity (Audit Logs)
    # Exclude "Login" actions as requested by the user
    activity_cursor = audit_logs_collection.find(
        {"action": {"$ne": "Login"}}
    ).sort("timestamp", -1).limit(5)
    
    activity_docs = await activity_cursor.to_list(5)
    activity = []
    
    for doc in activity_docs:
        # Determine a type for styling based on the action/module
        action = doc.get("action", "")
        module = doc.get("module", "")
        
        type_str = "note"
        if "Create" in action and "Lead" in module:
            type_str = "lead"
        elif "Create" in action and "User" in module:
            type_str = "task"
        elif "Update" in action and "Lead" in module:
            type_str = "deal"
        elif "Won" in action or "Closed" in action:
            type_str = "deal"
            
        activity.append({
            "id": str(doc.get("_id")),
            "type": type_str,
            "text": doc.get("details", ""),
            "time": doc.get("timestamp", "").isoformat() if hasattr(doc.get("timestamp"), 'isoformat') else str(doc.get("timestamp"))
        })

    # Fetch 30-day Activity Heatmap (Only Leads)
    heatmap_cursor = audit_logs_collection.aggregate([
        {
            "$match": {
                "timestamp": {"$gte": last_30_days},
                "module": "Lead"
            }
        },
        {
            "$project": {
                "dayOfWeek": {"$dayOfWeek": "$timestamp"}, # 1: Sun, 7: Sat
                "hour": {"$hour": "$timestamp"}
            }
        },
        {
            "$group": {
                "_id": {"day": "$dayOfWeek", "hour": "$hour"},
                "count": {"$sum": 1}
            }
        }
    ])
    
    heatmap_docs = await heatmap_cursor.to_list(1000)
    heatmap = []
    for doc in heatmap_docs:
        day_of_week = doc["_id"]["day"] - 1 # Convert 1-7 to 0-6 (Sun-Sat)
        hour = doc["_id"]["hour"]
        heatmap.append({"day": day_of_week, "hour": hour, "count": doc["count"]})

    return {
        "stats": stats,
        "sources": all_metrics["sources"],
        "funnel": all_metrics["funnel"],
        "activity": activity,
        "heatmap": heatmap
    }

@router.get("/revenue-chart")
async def get_revenue_chart(range: str = "1m", current_user: UserResponse = Depends(get_current_user)):
    now = datetime.utcnow()
    
    if range == "1m":
        start_date = now - timedelta(days=30)
        group_format = "%Y-%m-%d" # Group by day
    elif range == "3m":
        start_date = now - timedelta(days=90)
        group_format = "%Y-%U" # Group by week (Year-WeekNumber)
    elif range == "6m":
        start_date = now - timedelta(days=180)
        group_format = "%Y-%m" # Group by month
    elif range == "1y":
        start_date = now - timedelta(days=365)
        group_format = "%Y-%m"
    else:
        start_date = now - timedelta(days=30)
        group_format = "%Y-%m-%d"

    pipeline = [
        {"$match": {"created_at": {"$gte": start_date.isoformat()}}},
        {
            "$addFields": {
                "date_str": {"$substr": ["$created_at", 0, 10]}
            }
        }
    ]
    
    leads = await leads_collection.aggregate(pipeline).to_list(10000)

    # Dictionary to hold groupings: { "date_label": {"actual": 0, "projected": 0} }
    grouped_data = {}
    
    projected_statuses = ["Qualified", "Proposal Sent", "Negotiation"]

    for l in leads:
        created_at_str = l.get("created_at", "")
        if not created_at_str:
            continue
            
        try:
            dt = datetime.fromisoformat(created_at_str.replace("Z", "+00:00"))
        except ValueError:
            continue
            
        # Format key based on grouping
        key = dt.strftime(group_format)
        
        if key not in grouped_data:
            grouped_data[key] = {"actual": 0, "projected": 0}
            
        status = l.get("status")
        value = float(l.get("value", 0))
        
        if status == "Won":
            grouped_data[key]["actual"] += value
        elif status in projected_statuses:
            grouped_data[key]["projected"] += value

    # Sort keys
    sorted_keys = sorted(grouped_data.keys())
    
    # Optional: We could fill in empty dates to make the graph contiguous, 
    # but Chart.js usually handles skipping if labels are correct. Let's just return what we have.
    
    labels = []
    actual = []
    projected = []
    
    for k in sorted_keys:
        labels.append(k)
        actual.append(grouped_data[k]["actual"])
        projected.append(grouped_data[k]["projected"])

    return {
        "labels": labels,
        "actual": actual,
        "projected": projected
    }
