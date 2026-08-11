from fastapi import APIRouter, Depends, Query
from datetime import datetime, timedelta
from typing import Dict, Any
from dependencies import get_current_user
from models import UserResponse
from db import leads_collection, audit_logs_collection, deals_collection, users_collection, settings_collection, projects_collection, tasks_collection, expenses_collection

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
                    {"$match": {"created_at": {"$gte": last_30_days}}}
                ],
                "previous_period": [
                    {"$match": {"created_at": {"$gte": prev_30_days, "$lt": last_30_days}}}
                ],
                "all_time": [
                    {"$match": {}}
                ]
            }
        }
    ]

    result = await leads_collection.aggregate(pipeline).to_list(1)
    data = result[0] if result else {"current_period": [], "previous_period": [], "all_time": []}

    # Fetch Deals for Revenue calculation
    deals_result = await deals_collection.aggregate(pipeline).to_list(1)
    deals_data = deals_result[0] if deals_result else {"current_period": [], "previous_period": [], "all_time": []}

    def calc_metrics(leads_list, deals_list):
        active_statuses = ["new", "contacted", "qualified", "negotiation"]
        
        total_leads = len(leads_list)
        active_leads = sum(1 for l in leads_list if l.get("status") in active_statuses)
        won_leads = sum(1 for l in leads_list if l.get("status") == "won")
        
        # Calculate revenue from deals
        revenue = sum(float(d.get("amount", 0)) for d in deals_list if d.get("stage") == "won")
        
        conversion_rate = (won_leads / total_leads * 100) if total_leads > 0 else 0
        
        # Calculate Funnel
        qualified_leads = sum(1 for l in leads_list if l.get("status") in ["qualified", "negotiation", "won"])
        
        funnel = [
            {"label": "Visitors", "value": 0},
            {"label": "Leads Captured", "value": total_leads},
            {"label": "Qualified", "value": qualified_leads},
            {"label": "Closed Won", "value": won_leads},
        ]
        
        # Calculate Sources
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

    all_metrics = calc_metrics(data["all_time"], deals_data["all_time"])
    curr_metrics = calc_metrics(data["current_period"], deals_data["current_period"])
    prev_metrics = calc_metrics(data["previous_period"], deals_data["previous_period"])

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

    heatmap_cursor = audit_logs_collection.aggregate([
        {
            "$match": {
                "timestamp": {"$gte": last_30_days}
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
        {"$match": {"created_at": {"$gte": start_date}}}
    ]
    
    deals = await deals_collection.aggregate(pipeline).to_list(10000)

    # Dictionary to hold groupings: { "date_label": {"actual": 0, "projected": 0} }
    grouped_data = {}
    
    projected_stages = ["qualified", "proposal_sent", "negotiation"]

    for d in deals:
        created_at_val = d.get("created_at")
        if not created_at_val:
            continue
            
        if isinstance(created_at_val, str):
            try:
                dt = datetime.fromisoformat(created_at_val.replace("Z", "+00:00"))
            except ValueError:
                continue
        else:
            dt = created_at_val
            
        # Format key based on grouping
        key = dt.strftime(group_format)
        
        if key not in grouped_data:
            grouped_data[key] = {"actual": 0, "projected": 0}
            
        stage = d.get("stage")
        value = float(d.get("amount", 0))
        
        if stage == "won":
            grouped_data[key]["actual"] += value
        elif stage in projected_stages:
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

@router.get("/sales-metrics")
async def get_sales_metrics(current_user: UserResponse = Depends(get_current_user)):
    deals = await deals_collection.find().to_list(10000)
    
    total_pipeline = 0
    total_won_revenue = 0
    total_deals_count = len(deals)
    won_deals_count = 0
    monthly_revenue = 0
    
    current_month_str = datetime.utcnow().strftime("%Y-%m")
    
    rep_stats = {}
    stage_breakdown = {}
    
    for d in deals:
        stage = d.get("stage", "")
        amt = float(d.get("amount", 0))
        
        stage_breakdown[stage] = stage_breakdown.get(stage, 0) + amt
        
        if stage == "won":
            total_won_revenue += amt
            won_deals_count += 1
            dt_val = d.get("updated_at") or d.get("created_at")
            if dt_val:
                dt_str = dt_val.isoformat() if hasattr(dt_val, "isoformat") else str(dt_val)
                if dt_str.startswith(current_month_str):
                    monthly_revenue += amt
        elif stage != "lost":
            total_pipeline += amt
            
        rep_id = d.get("assigned_to")
        if rep_id:
            if rep_id not in rep_stats:
                rep_stats[rep_id] = {"won_revenue": 0, "pipeline": 0, "won_deals": 0, "total_deals": 0}
            
            rep_stats[rep_id]["total_deals"] += 1
            if stage == "won":
                rep_stats[rep_id]["won_revenue"] += amt
                rep_stats[rep_id]["won_deals"] += 1
            elif stage != "lost":
                rep_stats[rep_id]["pipeline"] += amt
                
    stage_data = [{"id": k, "value": v} for k, v in stage_breakdown.items() if v > 0]
    
    rep_results = []
    if rep_stats:
        user_ids = list(rep_stats.keys())
        users = await users_collection.find({"_id": {"$in": user_ids}}).to_list(100)
        user_map = {str(u["_id"]): u.get("name", "Unknown") for u in users}
        
        for uid, stats in rep_stats.items():
            uid_str = str(uid)
            win_r = (stats["won_deals"] / stats["total_deals"] * 100) if stats["total_deals"] > 0 else 0
            rep_results.append({
                "id": uid_str,
                "name": user_map.get(uid_str, "Unassigned"),
                "won_revenue": stats["won_revenue"],
                "pipeline": stats["pipeline"],
                "won_deals": stats["won_deals"],
                "total_deals": stats["total_deals"],
                "win_rate": round(win_r, 1)
            })
            
    won_deals_sorted = [d for d in deals if d.get("stage") == "won"]
    def get_sort_key(doc):
        dt = doc.get("updated_at") or doc.get("created_at")
        if hasattr(dt, "timestamp"):
            return dt.timestamp()
        if isinstance(dt, str):
            return dt
        return ""
        
    won_deals_sorted.sort(key=get_sort_key, reverse=True)
    recent_wins = won_deals_sorted[:5]
    
    formatted_recent_wins = []
    for d in recent_wins:
        rep_id = str(d.get("assigned_to", ""))
        rep_name = next((r["name"] for r in rep_results if r["id"] == rep_id), "Unknown")
        dt_val = d.get("updated_at") or d.get("created_at")
        dt_str = dt_val.isoformat() if hasattr(dt_val, "isoformat") else str(dt_val)
        formatted_recent_wins.append({
            "id": str(d["_id"]),
            "title": d.get("title", ""),
            "company_name": d.get("company_name", ""),
            "amount": d.get("amount", 0),
            "date": dt_str,
            "rep_name": rep_name
        })

    win_rate = (won_deals_count / total_deals_count * 100) if total_deals_count > 0 else 0
    avg_deal = (total_won_revenue / won_deals_count) if won_deals_count > 0 else 0

    settings = await settings_collection.find_one({"_id": "dashboard_settings"})
    monthly_target = 500000
    if settings and "monthly_sales_target" in settings:
        monthly_target = settings["monthly_sales_target"]

    return {
        "kpis": {
            "total_pipeline": total_pipeline,
            "closed_revenue": total_won_revenue,
            "win_rate": round(win_rate, 1),
            "avg_deal_size": avg_deal
        },
        "target": {
            "monthly_target": monthly_target,
            "monthly_achieved": monthly_revenue
        },
        "rep_performance": sorted(rep_results, key=lambda x: x["won_revenue"], reverse=True),
        "stage_breakdown": sorted(stage_data, key=lambda x: x["value"], reverse=True),
        "recent_wins": formatted_recent_wins
    }

from pydantic import BaseModel

class SalesTargetUpdate(BaseModel):
    monthly_sales_target: float

@router.get("/sales-target")
async def get_sales_target(current_user: UserResponse = Depends(get_current_user)):
    settings = await settings_collection.find_one({"_id": "dashboard_settings"})
    if settings and "monthly_sales_target" in settings:
        return {"monthly_sales_target": settings["monthly_sales_target"]}
    return {"monthly_sales_target": 500000}

@router.put("/sales-target")
async def update_sales_target(target_data: SalesTargetUpdate, current_user: UserResponse = Depends(get_current_user)):
    await settings_collection.update_one(
        {"_id": "dashboard_settings"},
        {"$set": {"monthly_sales_target": target_data.monthly_sales_target}},
        upsert=True
    )
    return {"message": "Sales target updated successfully"}

@router.get("/team-metrics")
async def get_team_metrics(current_user: UserResponse = Depends(get_current_user)):
    # 1. KPIs
    active_users = await users_collection.count_documents({"is_active": True})
    open_deals = await deals_collection.count_documents({"stage": {"$nin": ["won", "lost"]}})
    active_projects = await projects_collection.count_documents({"status": {"$ne": "completed"}})
    
    one_day_ago = datetime.utcnow() - timedelta(days=1)
    recent_activities_24h = await audit_logs_collection.count_documents({"timestamp": {"$gte": one_day_ago}})
    
    # 2. Roles Distribution
    cursor = users_collection.aggregate([
        {"$match": {"is_active": True}},
        {"$group": {"_id": "$role", "count": {"$sum": 1}}}
    ])
    roles_data = [{"id": r["_id"] or "Unknown", "value": r["count"]} async for r in cursor]
    
    # 3. Workload per Rep & Roster
    users = await users_collection.find({"is_active": True}).to_list(100)
    user_map = {}
    workload = {}
    
    for u in users:
        uid_str = str(u["_id"])
        user_map[uid_str] = u.get("name", "Unknown")
        workload[uid_str] = {
            "id": uid_str,
            "name": u.get("name", "Unknown"),
            "email": u.get("email", ""),
            "role": u.get("role", "Unknown"),
            "deals": 0,
            "projects": 0,
            "tasks": 0,
            "total_items": 0
        }
        
    # Aggregate Deals
    open_deals_cursor = deals_collection.find({"stage": {"$nin": ["won", "lost"]}})
    async for d in open_deals_cursor:
        rep_id = str(d.get("assigned_to", ""))
        if rep_id in workload:
            workload[rep_id]["deals"] += 1
            workload[rep_id]["total_items"] += 1
            
    # Aggregate Projects
    active_projects_cursor = projects_collection.find({"status": {"$ne": "completed"}})
    async for p in active_projects_cursor:
        rep_id = str(p.get("assigned_to", ""))
        if rep_id in workload:
            workload[rep_id]["projects"] += 1
            workload[rep_id]["total_items"] += 1
                
    # Aggregate Tasks
    open_tasks_cursor = tasks_collection.find({"status": {"$nin": ["completed", "done", "closed"]}})
    async for t in open_tasks_cursor:
        rep_id = str(t.get("assigned_to", ""))
        if rep_id in workload:
            workload[rep_id]["tasks"] += 1
            workload[rep_id]["total_items"] += 1
            
    workload_list = list(workload.values())
    workload_list.sort(key=lambda x: x["total_items"], reverse=True)
    
    # 4. Recent Activity Feed
    logs = await audit_logs_collection.find().sort("timestamp", -1).limit(15).to_list(15)
    formatted_logs = []
    for log in logs:
        uid = str(log.get("user_id", ""))
        uname = user_map.get(uid) or log.get("user_name", "Unknown")
        action = log.get("action", "")
        module = log.get("module", "")
        details = log.get("details", {})
        
        # Friendly message
        msg = f"{uname} performed {action} in {module}"
        if "title" in details:
            msg = f"{uname} {action} {module}: {details['title']}"
        elif "name" in details:
            msg = f"{uname} {action} {module}: {details['name']}"
            
        dt_val = log.get("timestamp", datetime.utcnow())
        dt_str = dt_val.isoformat() if hasattr(dt_val, "isoformat") else str(dt_val)
        
        formatted_logs.append({
            "id": str(log["_id"]),
            "user": uname,
            "message": msg,
            "timestamp": dt_str,
            "module": module,
            "action": action
        })
        
    return {
        "kpis": {
            "total_members": active_users,
            "open_deals": open_deals,
            "active_projects": active_projects,
            "recent_activities": recent_activities_24h
        },
        "roles_distribution": roles_data,
        "workload": workload_list,
        "recent_activities_feed": formatted_logs
    }

@router.get("/analytics-metrics")
async def get_analytics_metrics(
    start_date: str = Query(None),
    end_date: str = Query(None),
    current_user: UserResponse = Depends(get_current_user)
):
    now = datetime.utcnow()
    # Default to current month if no dates provided
    if start_date and end_date:
        start_dt = datetime.strptime(start_date[:10], "%Y-%m-%d")
        end_dt = datetime.strptime(end_date[:10], "%Y-%m-%d").replace(hour=23, minute=59, second=59)
    else:
        start_dt = now.replace(day=1, hour=0, minute=0, second=0)
        end_dt = now
        
    duration = end_dt - start_dt
    prev_end_dt = start_dt - timedelta(seconds=1)
    prev_start_dt = prev_end_dt - duration

    # Base Queries
    query_curr = {"created_at": {"$gte": start_dt, "$lte": end_dt}}
    query_prev = {"created_at": {"$gte": prev_start_dt, "$lte": prev_end_dt}}
    
    exp_curr = {"date": {"$gte": start_dt, "$lte": end_dt}}
    exp_prev = {"date": {"$gte": prev_start_dt, "$lte": prev_end_dt}}

    # 1. Total Revenue
    won_curr = await deals_collection.find({**query_curr, "stage": "won"}).to_list(None)
    won_prev = await deals_collection.find({**query_prev, "stage": "won"}).to_list(None)
    
    rev_curr = sum(d.get("amount", 0) for d in won_curr)
    rev_prev = sum(d.get("amount", 0) for d in won_prev)
    rev_growth = compute_delta(rev_curr, rev_prev)
    
    # 2. Net Profit
    exp_curr_list = await expenses_collection.find(exp_curr).to_list(None)
    exp_prev_list = await expenses_collection.find(exp_prev).to_list(None)
    
    profit_curr = rev_curr - sum(e.get("amount", 0) for e in exp_curr_list)
    profit_prev = rev_prev - sum(e.get("amount", 0) for e in exp_prev_list)
    profit_growth = compute_delta(profit_curr, profit_prev)
    
    # 3. MRR
    mrr_curr = sum(d.get("amount", 0) for d in won_curr if d.get("is_recurring", False))
    mrr_prev = sum(d.get("amount", 0) for d in won_prev if d.get("is_recurring", False))
    mrr_growth = compute_delta(mrr_curr, mrr_prev)
    
    # 4. Churn Rate
    def calc_churn(q):
        return deals_collection.count_documents({**q, "stage": "lost"})
    def calc_total(q):
        return deals_collection.count_documents(q)
        
    total_curr = await calc_total(query_curr)
    lost_curr = await calc_churn(query_curr)
    churn_curr = (lost_curr / total_curr * 100) if total_curr > 0 else 0
    
    total_prev = await calc_total(query_prev)
    lost_prev = await calc_churn(query_prev)
    churn_prev = (lost_prev / total_prev * 100) if total_prev > 0 else 0
    churn_growth = compute_delta(churn_curr, churn_prev)
    
    # 5. Deal Velocity (Average days to close)
    velocity_days = 0
    if len(won_curr) > 0:
        total_days = 0
        valid_deals = 0
        for d in won_curr:
            created = d.get("created_at")
            updated = d.get("updated_at")
            if isinstance(created, datetime) and isinstance(updated, datetime):
                days = (updated - created).days
                total_days += max(days, 0)
                valid_deals += 1
        if valid_deals > 0:
            velocity_days = total_days / valid_deals
            
    # 6. Growth Dynamics (Last 6 Months Trend)
    months_labels = []
    mrr_data = []
    arr_data = []
    
    for i in range(5, -1, -1):
        m_start = (now.replace(day=1) - timedelta(days=30*i)).replace(day=1, hour=0, minute=0, second=0)
        # Next month's first day minus 1 second = last day of this month
        if m_start.month == 12:
            m_end = m_start.replace(year=m_start.year+1, month=1) - timedelta(seconds=1)
        else:
            m_end = m_start.replace(month=m_start.month+1) - timedelta(seconds=1)
            
        months_labels.append(m_start.strftime("%b"))
        
        m_deals = await deals_collection.find({
            "created_at": {"$gte": m_start, "$lte": m_end},
            "stage": "won"
        }).to_list(None)
        
        m_arr = sum(d.get("amount", 0) for d in m_deals)
        m_mrr = sum(d.get("amount", 0) for d in m_deals if d.get("is_recurring", False))
        
        arr_data.append(m_arr)
        mrr_data.append(m_mrr)
        
    growth_dynamics = {
        "labels": months_labels,
        "mrr": mrr_data,
        "arr": arr_data
    }
    
    # 7. Channel Attribution
    # Pre-populate with expected channels so they always show up
    channel_counts = {
        "WhatsApp CRM": 0,
        "Direct Sales": 0,
        "Marketing Ads": 0
    }
    for d in won_curr:
        src = d.get("source")
        if src:
            channel_counts[src] = channel_counts.get(src, 0) + d.get("amount", 0)
        
    channels_list = []
    # Always show them even if total revenue is 0
    sorted_ch = sorted(channel_counts.items(), key=lambda x: x[1], reverse=True)
    colors = ["#25D366", "#4f46e5", "#f59e0b", "#ec4899", "#14b8a6"]
    for i, (name, val) in enumerate(sorted_ch[:5]):
        percentage = round((val / rev_curr) * 100) if rev_curr > 0 else 0
        channels_list.append({
            "name": name,
            "percentage": percentage,
            "color": colors[i % len(colors)]
        })
            
    # 8. Revenue by Service
    service_counts = {}
    for d in won_curr:
        srv = d.get("service_category")
        if srv:
            service_counts[srv] = service_counts.get(srv, 0) + d.get("amount", 0)
        
    revenue_by_service = {"labels": [], "values": []}
    for k, v in service_counts.items():
        revenue_by_service["labels"].append(k)
        revenue_by_service["values"].append(v)
        
    # If no data, provide an empty structure so charts don't break
    if not revenue_by_service["labels"]:
        revenue_by_service = {"labels": ["No Data"], "values": [0]}

    return {
        "kpis": {
            "total_revenue": rev_curr,
            "revenue_growth": rev_growth,
            "net_profit": profit_curr,
            "profit_growth": profit_growth,
            "mrr": mrr_curr,
            "mrr_growth": mrr_growth,
            "churn_rate": round(churn_curr, 1),
            "churn_growth": churn_growth,
            "deal_velocity": round(velocity_days, 1)
        },
        "growth_dynamics": growth_dynamics,
        "channel_attribution": channels_list,
        "revenue_by_service": revenue_by_service
    }
