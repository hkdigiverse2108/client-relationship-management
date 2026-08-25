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

    # 1. Lead Metrics Aggregation
    lead_pipeline = [
        {
            "$facet": {
                "all_time": [
                    {"$group": {
                        "_id": None,
                        "total": {"$sum": 1},
                        "active": {"$sum": {"$cond": [{"$in": ["$status", ["new", "contacted", "qualified", "negotiation"]]}, 1, 0]}},
                        "won": {"$sum": {"$cond": [{"$eq": ["$status", "won"]}, 1, 0]}},
                        "qualified": {"$sum": {"$cond": [{"$in": ["$status", ["qualified", "negotiation", "won"]]}, 1, 0]}}
                    }}
                ],
                "current_period": [
                    {"$match": {"created_at": {"$gte": last_30_days}}},
                    {"$group": {
                        "_id": None,
                        "total": {"$sum": 1},
                        "active": {"$sum": {"$cond": [{"$in": ["$status", ["new", "contacted", "qualified", "negotiation"]]}, 1, 0]}},
                        "won": {"$sum": {"$cond": [{"$eq": ["$status", "won"]}, 1, 0]}},
                    }}
                ],
                "previous_period": [
                    {"$match": {"created_at": {"$gte": prev_30_days, "$lt": last_30_days}}},
                    {"$group": {
                        "_id": None,
                        "total": {"$sum": 1},
                        "active": {"$sum": {"$cond": [{"$in": ["$status", ["new", "contacted", "qualified", "negotiation"]]}, 1, 0]}},
                        "won": {"$sum": {"$cond": [{"$eq": ["$status", "won"]}, 1, 0]}},
                    }}
                ],
                "sources": [
                    {"$group": {"_id": {"$ifNull": ["$source", "Other"]}, "count": {"$sum": 1}}},
                    {"$sort": {"count": -1}}
                ]
            }
        }
    ]

    leads_res = await leads_collection.aggregate(lead_pipeline).to_list(1)
    lead_data = leads_res[0] if leads_res else {}

    def extract_lead_metrics(key):
        arr = lead_data.get(key, [])
        if arr and len(arr) > 0:
            return arr[0]
        return {"total": 0, "active": 0, "won": 0, "qualified": 0}

    all_time_leads = extract_lead_metrics("all_time")
    curr_leads = extract_lead_metrics("current_period")
    prev_leads = extract_lead_metrics("previous_period")

    total_leads_count = all_time_leads.get("total", 0)

    # Calculate Funnel
    funnel = [
        {"label": "Visitors", "value": 0},
        {"label": "Leads Captured", "value": total_leads_count},
        {"label": "Qualified", "value": all_time_leads.get("qualified", 0)},
        {"label": "Closed Won", "value": all_time_leads.get("won", 0)},
    ]

    # Calculate Sources
    sources = []
    if total_leads_count > 0:
        for src in lead_data.get("sources", []):
            count = src.get("count", 0)
            pct = round((count / total_leads_count) * 100)
            sources.append({
                "label": f"{src['_id']} ({pct}%)",
                "value": count
            })

    # 2. Deals Revenue Aggregation
    deal_pipeline = [
        {
            "$match": {"stage": "won"}
        },
        {
            "$facet": {
                "all_time": [
                    {"$group": {"_id": None, "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}}}
                ],
                "current_period": [
                    {"$match": {"created_at": {"$gte": last_30_days}}},
                    {"$group": {"_id": None, "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}}}
                ],
                "previous_period": [
                    {"$match": {"created_at": {"$gte": prev_30_days, "$lt": last_30_days}}},
                    {"$group": {"_id": None, "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}}}
                ]
            }
        }
    ]

    deals_res = await deals_collection.aggregate(deal_pipeline).to_list(1)
    deal_data = deals_res[0] if deals_res else {}

    def extract_revenue(key):
        arr = deal_data.get(key, [])
        if arr and len(arr) > 0:
            return arr[0].get("revenue", 0)
        return 0

    all_time_rev = extract_revenue("all_time")
    curr_rev = extract_revenue("current_period")
    prev_rev = extract_revenue("previous_period")

    def calc_conv(won, total):
        return (won / total * 100) if total > 0 else 0

    all_time_conv = calc_conv(all_time_leads.get("won", 0), total_leads_count)
    curr_conv = calc_conv(curr_leads.get("won", 0), curr_leads.get("total", 0))
    prev_conv = calc_conv(prev_leads.get("won", 0), prev_leads.get("total", 0))

    revenue_delta = compute_delta(curr_rev, prev_rev)
    active_delta = compute_delta(curr_leads.get("active", 0), prev_leads.get("active", 0))
    conv_delta = compute_delta(curr_conv, prev_conv)

    stats = [
        {
            "key": "revenue",
            "label": "Total Revenue",
            "value": all_time_rev,
            "delta": revenue_delta,
            "trend": "up" if revenue_delta >= 0 else "down",
            "format": "currency"
        },
        {
            "key": "deals",
            "label": "Active Leads",
            "value": all_time_leads.get("active", 0),
            "delta": active_delta,
            "trend": "up" if active_delta >= 0 else "down",
            "format": "number"
        },
        {
            "key": "leads",
            "label": "Conversion Rate",
            "value": round(all_time_conv, 1),
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

    # 3. Fetch Recent Activity (Audit Logs)
    activity_cursor = audit_logs_collection.find(
        {"action": {"$ne": "Login"}}
    ).sort("timestamp", -1).limit(5)
    
    activity_docs = await activity_cursor.to_list(5)
    activity = []
    
    for doc in activity_docs:
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

    # 4. Heatmap Aggregation
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
        "sources": sources,
        "funnel": funnel,
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

    projected_stages = ["qualified", "proposal_sent", "negotiation"]

    pipeline = [
        {"$match": {"created_at": {"$gte": start_date}}},
        {
            "$addFields": {
                "parsed_date": {
                    "$convert": {
                        "input": "$created_at",
                        "to": "date",
                        "onError": None,
                        "onNull": None
                    }
                }
            }
        },
        {"$match": {"parsed_date": {"$ne": None}}},
        {
            "$group": {
                "_id": {"$dateToString": {"format": group_format, "date": "$parsed_date"}},
                "actual": {
                    "$sum": {
                        "$cond": [{"$eq": ["$stage", "won"]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]
                    }
                },
                "projected": {
                    "$sum": {
                        "$cond": [{"$in": ["$stage", projected_stages]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]
                    }
                }
            }
        },
        {"$sort": {"_id": 1}}
    ]
    
    grouped_deals = await deals_collection.aggregate(pipeline).to_list(10000)
    
    labels = []
    actual = []
    projected = []
    
    for doc in grouped_deals:
        if doc["_id"] is not None:
            labels.append(doc["_id"])
            actual.append(doc["actual"])
            projected.append(doc["projected"])

    return {
        "labels": labels,
        "actual": actual,
        "projected": projected
    }

@router.get("/sales-metrics")
async def get_sales_metrics(current_user: UserResponse = Depends(get_current_user)):
    current_month_str = datetime.utcnow().strftime("%Y-%m")
    
    # 1. Global KPIs & Stage Breakdown
    kpi_pipeline = [
        {
            "$facet": {
                "totals": [
                    {
                        "$group": {
                            "_id": None,
                            "total_deals_count": {"$sum": 1},
                            "won_deals_count": {"$sum": {"$cond": [{"$eq": ["$stage", "won"]}, 1, 0]}},
                            "total_won_revenue": {"$sum": {"$cond": [{"$eq": ["$stage", "won"]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}},
                            "total_pipeline": {"$sum": {"$cond": [{"$not": {"$in": ["$stage", ["won", "lost"]]}}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}},
                        }
                    }
                ],
                "stage_breakdown": [
                    {
                        "$group": {
                            "_id": "$stage",
                            "value": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}
                        }
                    }
                ]
            }
        }
    ]
    
    kpi_res = await deals_collection.aggregate(kpi_pipeline).to_list(1)
    kpi_data = kpi_res[0] if kpi_res else {"totals": [], "stage_breakdown": []}
    
    totals = kpi_data["totals"][0] if kpi_data["totals"] else {"total_deals_count": 0, "won_deals_count": 0, "total_won_revenue": 0, "total_pipeline": 0}
    
    total_pipeline = totals.get("total_pipeline", 0)
    total_won_revenue = totals.get("total_won_revenue", 0)
    total_deals_count = totals.get("total_deals_count", 0)
    won_deals_count = totals.get("won_deals_count", 0)
    
    stage_breakdown = [{"id": doc["_id"], "value": doc["value"]} for doc in kpi_data["stage_breakdown"] if doc["value"] > 0]
    stage_breakdown.sort(key=lambda x: x["value"], reverse=True)
    
    # 2. Monthly Revenue (Needs a separate date string matching)
    monthly_rev_pipeline = [
        {"$match": {"stage": "won"}},
        {
            "$addFields": {
                "date_str": {
                    "$cond": {
                        "if": {"$eq": [{"$type": "$updated_at"}, "string"]},
                        "then": "$updated_at",
                        "else": {
                            "$cond": {
                                "if": {"$eq": [{"$type": "$created_at"}, "string"]},
                                "then": "$created_at",
                                "else": {"$dateToString": {"format": "%Y-%m", "date": {"$ifNull": ["$updated_at", "$created_at"]}}}
                            }
                        }
                    }
                }
            }
        },
        {"$match": {"date_str": {"$regex": f"^{current_month_str}"}}},
        {
            "$group": {
                "_id": None,
                "monthly_revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}
            }
        }
    ]
    
    monthly_rev_res = await deals_collection.aggregate(monthly_rev_pipeline).to_list(1)
    monthly_revenue = monthly_rev_res[0]["monthly_revenue"] if monthly_rev_res else 0
    
    # 3. Rep Performance
    rep_pipeline = [
        {"$match": {"assigned_to": {"$ne": None, "$ne": ""}}},
        {
            "$group": {
                "_id": "$assigned_to",
                "total_deals": {"$sum": 1},
                "won_deals": {"$sum": {"$cond": [{"$eq": ["$stage", "won"]}, 1, 0]}},
                "won_revenue": {"$sum": {"$cond": [{"$eq": ["$stage", "won"]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}},
                "pipeline": {"$sum": {"$cond": [{"$not": {"$in": ["$stage", ["won", "lost"]]}}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}},
            }
        }
    ]
    
    rep_stats_docs = await deals_collection.aggregate(rep_pipeline).to_list(100)
    
    rep_results = []
    if rep_stats_docs:
        from bson import ObjectId
        user_ids = []
        for doc in rep_stats_docs:
            uid = doc["_id"]
            if isinstance(uid, str) and len(uid) == 24:
                try:
                    user_ids.append(ObjectId(uid))
                except:
                    user_ids.append(uid)
            else:
                user_ids.append(uid)
                
        users = await users_collection.find({"_id": {"$in": user_ids}}).to_list(100)
        string_user_ids = [str(uid) for uid in user_ids]
        users_str = await users_collection.find({"_id": {"$in": string_user_ids}}).to_list(100)
        
        user_map = {}
        for u in users + users_str:
            user_map[str(u["_id"])] = u.get("name", "Unknown")
            
        for stats in rep_stats_docs:
            uid_str = str(stats["_id"])
            win_r = (stats["won_deals"] / stats["total_deals"] * 100) if stats["total_deals"] > 0 else 0
            rep_results.append({
                "id": uid_str,
                "name": user_map.get(uid_str, "Unknown"),
                "won_revenue": stats["won_revenue"],
                "pipeline": stats["pipeline"],
                "won_deals": stats["won_deals"],
                "total_deals": stats["total_deals"],
                "win_rate": round(win_r, 1)
            })
            
    # 4. Recent Wins
    recent_wins_pipeline = [
        {"$match": {"stage": "won"}},
        {
            "$addFields": {
                "sort_date": {
                    "$ifNull": ["$updated_at", "$created_at"]
                }
            }
        },
        {"$sort": {"sort_date": -1}},
        {"$limit": 5}
    ]
    recent_wins = await deals_collection.aggregate(recent_wins_pipeline).to_list(5)
    
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
        "stage_breakdown": stage_breakdown,
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
    deals_workload = await deals_collection.aggregate([
        {"$match": {"stage": {"$nin": ["won", "lost"]}}},
        {"$group": {"_id": "$assigned_to", "count": {"$sum": 1}}}
    ]).to_list(None)
    for d in deals_workload:
        rep_id = str(d["_id"])
        if rep_id in workload:
            workload[rep_id]["deals"] += d["count"]
            workload[rep_id]["total_items"] += d["count"]
            
    # Aggregate Projects
    projects_workload = await projects_collection.aggregate([
        {"$match": {"status": {"$ne": "completed"}}},
        {"$group": {"_id": "$assigned_to", "count": {"$sum": 1}}}
    ]).to_list(None)
    for p in projects_workload:
        rep_id = str(p["_id"])
        if rep_id in workload:
            workload[rep_id]["projects"] += p["count"]
            workload[rep_id]["total_items"] += p["count"]
                
    # Aggregate Tasks
    tasks_workload = await tasks_collection.aggregate([
        {"$match": {"status": {"$nin": ["completed", "done", "closed"]}}},
        {"$group": {"_id": "$assigned_to", "count": {"$sum": 1}}}
    ]).to_list(None)
    for t in tasks_workload:
        rep_id = str(t["_id"])
        if rep_id in workload:
            workload[rep_id]["tasks"] += t["count"]
            workload[rep_id]["total_items"] += t["count"]
            
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
        details = log.get("details", "")
        
        # Friendly message
        if isinstance(details, dict):
            msg = f"{uname} performed {action} in {module}"
            if "title" in details:
                msg = f"{uname} {action} {module}: {details['title']}"
            elif "name" in details:
                msg = f"{uname} {action} {module}: {details['name']}"
        elif isinstance(details, str) and details:
            msg = f"{uname}: {details}"
        else:
            msg = f"{uname} performed {action} in {module}"
            
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

    # 1. Deals Aggregations (Revenue, MRR, Velocity, Channels, Services)
    deals_pipeline = [
        {
            "$facet": {
                "current": [
                    {"$match": {**query_curr, "stage": "won"}},
                    {"$group": {
                        "_id": None,
                        "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}},
                        "mrr": {"$sum": {"$cond": [{"$eq": ["$is_recurring", True]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}},
                        "total_days": {"$sum": {
                            "$divide": [
                                {"$subtract": [
                                    {"$convert": {"input": "$updated_at", "to": "date", "onError": None, "onNull": None}},
                                    {"$convert": {"input": "$created_at", "to": "date", "onError": None, "onNull": None}}
                                ]},
                                1000 * 60 * 60 * 24
                            ]
                        }},
                        "valid_deals": {"$sum": {"$cond": [
                            {"$and": [
                                {"$ne": [{"$convert": {"input": "$updated_at", "to": "date", "onError": None, "onNull": None}}, None]},
                                {"$ne": [{"$convert": {"input": "$created_at", "to": "date", "onError": None, "onNull": None}}, None]}
                            ]},
                            1,
                            0
                        ]}}
                    }}
                ],
                "previous": [
                    {"$match": {**query_prev, "stage": "won"}},
                    {"$group": {
                        "_id": None,
                        "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}},
                        "mrr": {"$sum": {"$cond": [{"$eq": ["$is_recurring", True]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}}
                    }}
                ],
                "channels": [
                    {"$match": {**query_curr, "stage": "won"}},
                    {"$group": {
                        "_id": "$source",
                        "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}
                    }}
                ],
                "services": [
                    {"$match": {**query_curr, "stage": "won"}},
                    {"$group": {
                        "_id": "$service_category",
                        "revenue": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}
                    }}
                ]
            }
        }
    ]
    
    deals_res = await deals_collection.aggregate(deals_pipeline).to_list(1)
    d_data = deals_res[0] if deals_res else {"current": [], "previous": [], "channels": [], "services": []}
    
    curr = d_data["current"][0] if d_data["current"] else {"revenue": 0, "mrr": 0, "total_days": 0, "valid_deals": 0}
    prev = d_data["previous"][0] if d_data["previous"] else {"revenue": 0, "mrr": 0}
    
    rev_curr = curr.get("revenue", 0)
    rev_prev = prev.get("revenue", 0)
    rev_growth = compute_delta(rev_curr, rev_prev)
    
    mrr_curr = curr.get("mrr", 0)
    mrr_prev = prev.get("mrr", 0)
    mrr_growth = compute_delta(mrr_curr, mrr_prev)
    
    velocity_days = 0
    if curr.get("valid_deals", 0) > 0:
        velocity_days = max(curr.get("total_days", 0) / curr["valid_deals"], 0)
        
    # 2. Net Profit Aggregations
    exp_pipeline = [
        {
            "$facet": {
                "current": [
                    {"$match": exp_curr},
                    {"$group": {"_id": None, "amount": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}}}
                ],
                "previous": [
                    {"$match": exp_prev},
                    {"$group": {"_id": None, "amount": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}}}}
                ]
            }
        }
    ]
    
    exp_res = await expenses_collection.aggregate(exp_pipeline).to_list(1)
    e_data = exp_res[0] if exp_res else {"current": [], "previous": []}
    
    exp_curr_val = e_data["current"][0]["amount"] if e_data["current"] else 0
    exp_prev_val = e_data["previous"][0]["amount"] if e_data["previous"] else 0
    
    profit_curr = rev_curr - exp_curr_val
    profit_prev = rev_prev - exp_prev_val
    profit_growth = compute_delta(profit_curr, profit_prev)
    
    # 3. Churn Rate
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
            
    # 4. Growth Dynamics (Last 6 Months Trend)
    six_months_ago = (now.replace(day=1) - timedelta(days=30*5)).replace(day=1, hour=0, minute=0, second=0)
    
    growth_pipeline = [
        {"$match": {"created_at": {"$gte": six_months_ago}, "stage": "won"}},
        {
            "$addFields": {
                "parsed_date": {
                    "$convert": {
                        "input": "$created_at",
                        "to": "date",
                        "onError": None,
                        "onNull": None
                    }
                }
            }
        },
        {"$match": {"parsed_date": {"$ne": None}}},
        {
            "$group": {
                "_id": {"$dateToString": {"format": "%Y-%m", "date": "$parsed_date"}},
                "arr": {"$sum": {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}},
                "mrr": {"$sum": {"$cond": [{"$eq": ["$is_recurring", True]}, {"$convert": {"input": "$amount", "to": "double", "onError": 0, "onNull": 0}}, 0]}}
            }
        }
    ]
    
    growth_res = await deals_collection.aggregate(growth_pipeline).to_list(100)
    
    months_labels = []
    mrr_data = []
    arr_data = []
    
    growth_map = {doc["_id"]: doc for doc in growth_res}
    
    for i in range(5, -1, -1):
        m_start = (now.replace(day=1) - timedelta(days=30*i)).replace(day=1, hour=0, minute=0, second=0)
        m_key = m_start.strftime("%Y-%m")
        months_labels.append(m_start.strftime("%b"))
        
        doc = growth_map.get(m_key, {"arr": 0, "mrr": 0})
        arr_data.append(doc["arr"])
        mrr_data.append(doc["mrr"])
        
    growth_dynamics = {
        "labels": months_labels,
        "mrr": mrr_data,
        "arr": arr_data
    }
    
    # 5. Channel Attribution
    channel_counts = {
        "WhatsApp CRM": 0,
        "Direct Sales": 0,
        "Marketing Ads": 0
    }
    for doc in d_data.get("channels", []):
        src = doc["_id"]
        if src:
            channel_counts[src] = channel_counts.get(src, 0) + doc.get("revenue", 0)
        
    channels_list = []
    sorted_ch = sorted(channel_counts.items(), key=lambda x: x[1], reverse=True)
    colors = ["#25D366", "#4f46e5", "#f59e0b", "#ec4899", "#14b8a6"]
    for i, (name, val) in enumerate(sorted_ch[:5]):
        percentage = round((val / rev_curr) * 100) if rev_curr > 0 else 0
        channels_list.append({
            "name": name,
            "percentage": percentage,
            "color": colors[i % len(colors)]
        })
            
    # 6. Revenue by Service
    revenue_by_service = {"labels": [], "values": []}
    for doc in d_data.get("services", []):
        srv = doc["_id"]
        if srv:
            revenue_by_service["labels"].append(srv)
            revenue_by_service["values"].append(doc.get("revenue", 0))
        
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
