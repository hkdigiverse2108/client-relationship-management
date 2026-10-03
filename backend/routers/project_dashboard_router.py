from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from typing import Dict, Any
from db import projects_collection, payments_collection, db
from dependencies import get_current_user, get_allowed_user_ids

router = APIRouter(prefix="/project-dashboard", tags=["Project Dashboard"])

@router.get("/stats", response_model=Dict[str, Any])
async def get_project_dashboard_stats(current_user: dict = Depends(get_current_user)):
    # fetch all projects and payments
    projects_cursor = projects_collection.find({"is_deleted": {"$ne": True}})
    projects = await projects_cursor.to_list(length=None)
    
    payments_cursor = payments_collection.find({})
    payments = await payments_cursor.to_list(length=None)

    now = datetime.utcnow()
    last7 = now - timedelta(days=7)
    prev7 = now - timedelta(days=14)

    totalValue = 0
    netProfit = 0
    amountReceived = 0
    pendingPayments = 0

    tvCurrent = 0
    tvPrev = 0
    npCurrent = 0
    npPrev = 0
    arCurrent = 0
    arPrev = 0
    ppCurrent = 0
    ppPrev = 0
    
    validProjects = []
    
    for p in projects:
        stage = (p.get("stage") or "").lower()
        status = (p.get("status") or "").lower()
        if "cancelled" in stage or "cancelled" in status:
            continue
        validProjects.append(p)
        
        val = float(p.get("project_value") or 0)
        budget = float(p.get("budget") or 0)
        profit = val - budget

        totalValue += val
        netProfit += profit

        pDate_str = p.get("created_at") or p.get("start_date") or now
        if isinstance(pDate_str, str):
            try:
                pDate = datetime.fromisoformat(pDate_str.replace("Z", "+00:00")).replace(tzinfo=None)
            except:
                pDate = now
        else:
            pDate = pDate_str

        if pDate >= last7:
            tvCurrent += val
            npCurrent += profit
        elif prev7 <= pDate < last7:
            tvPrev += val
            npPrev += profit

    for p in payments:
        amt = float(p.get("amount_received") or 0)
        stat = (p.get("status") or "").lower()
        pDate_str = p.get("payment_date") or p.get("created_at") or now
        
        if isinstance(pDate_str, str):
            try:
                pDate = datetime.fromisoformat(pDate_str.replace("Z", "+00:00")).replace(tzinfo=None)
            except:
                pDate = now
        else:
            pDate = pDate_str

        if stat in ["completed", "paid"]:
            amountReceived += amt
            if pDate >= last7:
                arCurrent += amt
            elif prev7 <= pDate < last7:
                arPrev += amt
        elif stat == "pending":
            pendingPayments += amt
            if pDate >= last7:
                ppCurrent += amt
            elif prev7 <= pDate < last7:
                ppPrev += amt

    def calcTrend(curr, prev):
        if prev == 0:
            isUp = curr >= 0
            percent = 100 if curr > 0 else 0
            text = "+100%" if curr > 0 else "0%"
            return {"isUp": isUp, "percent": percent, "text": text}
        change = ((curr - prev) / prev) * 100
        isUp = change >= 0
        percent = abs(round(change))
        text = f"+{percent}%" if isUp else f"-{percent}%"
        return {"isUp": isUp, "percent": percent, "text": text}

    tvTrend = calcTrend(tvCurrent, tvPrev)
    arTrend = calcTrend(arCurrent, arPrev)
    ppTrend = calcTrend(ppCurrent, ppPrev)
    npTrend = calcTrend(npCurrent, npPrev)
    
    def format_currency(val):
        if val >= 10000000:
            return f"₹{val / 10000000:.2f}Cr"
        elif val >= 100000:
            return f"₹{val / 100000:.2f}L"
        elif val >= 1000:
            return f"₹{val / 1000:.2f}K"
        else:
            return f"₹{val:.2f}"

    finStats = {
        "totalValue": format_currency(totalValue),
        "amountReceived": format_currency(amountReceived),
        "pendingPayments": format_currency(pendingPayments),
        "netProfit": format_currency(netProfit) if netProfit >= 0 else f"-{format_currency(abs(netProfit))}",
        "tvTrend": tvTrend,
        "arTrend": arTrend,
        "ppTrend": ppTrend,
        "npTrend": npTrend,
        "rawValues": {
            "totalValue": totalValue,
            "amountReceived": amountReceived,
            "pendingPayments": pendingPayments,
            "netProfit": netProfit
        }
    }
    
    # categoryData
    catMap = {}
    total_valid = len(validProjects)
    for p in validProjects:
        cat = p.get("category")
        if not cat or cat == "Uncategorized":
            cat = "-"
        catMap[cat] = catMap.get(cat, 0) + 1

    sortedCats = sorted(
        [{"name": k, "count": v, "percent": round((v / total_valid) * 100) if total_valid > 0 else 0} for k, v in catMap.items()],
        key=lambda x: x["count"],
        reverse=True
    )
    
    topCats = sortedCats[:4]
    if len(sortedCats) > 5:
        othersCount = sum(c["count"] for c in sortedCats[4:])
        othersPercent = round((othersCount / total_valid) * 100) if total_valid > 0 else 0
        topCats.append({"name": "Others", "count": othersCount, "percent": othersPercent})
    else:
        topCats = sortedCats

    defaultColors = ['#03C95A', '#AB47BC', '#FFC107', '#1B84FF', '#FF6F28']
    cssClasses = ['bg-success', 'bg-purple', 'bg-warning', 'bg-info', 'bg-primary']

    for i, c in enumerate(topCats):
        c["color"] = defaultColors[i % len(defaultColors)]
        c["cssClass"] = cssClasses[i % len(cssClasses)]
        
    if not topCats:
        topCats = [{"name": "No Projects", "count": 0, "percent": 0, "color": "#E5E5E5", "cssClass": "bg-secondary"}]

    categoryData = topCats

    # projectStats (top 6 cards)
    now_midnight = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    sevenDaysFromNow = now_midnight + timedelta(days=7)
    
    total_valid = len(validProjects)
    comp_count, hold_count, active_count, overdue_count, endingSoon_count = 0, 0, 0, 0, 0
    
    def parse_date(date_str):
        if not date_str: return None
        if isinstance(date_str, datetime): return date_str.replace(tzinfo=None)
        
        try:
            return datetime.fromisoformat(str(date_str).replace("Z", "+00:00")).replace(tzinfo=None)
        except:
            pass
            
        formats = ["%Y-%m-%d", "%d %b %Y", "%d %B %Y", "%d/%m/%Y", "%m/%d/%Y"]
        for fmt in formats:
            try:
                return datetime.strptime(str(date_str), fmt)
            except:
                pass
        return None

    for p in validProjects:
        s = (p.get("status") or "").lower()
        st = (p.get("stage") or "").lower()
        
        isComp = s in ["completed", "finished", "done"] or st in ["completed", "finished", "done"]
        isHold = "hold" in s or "hold" in st
        
        end_date = parse_date(p.get("end_date"))

        if isComp:
            comp_count += 1
        elif isHold:
            hold_count += 1
        else:
            active_count += 1
            
        if not isComp and end_date:
            if end_date < now_midnight:
                overdue_count += 1
            elif now_midnight <= end_date <= sevenDaysFromNow:
                endingSoon_count += 1

    projectStats = {
        "total": total_valid,
        "active": active_count,
        "completed": comp_count,
        "overdue": overdue_count,
        "onHold": hold_count,
        "endingSoon": endingSoon_count
    }

    # statusData (breakdown chart)
    comp, hold, od, pend, act = 0, 0, 0, 0, 0
    for p in validProjects:
        s = (p.get("status") or "").lower()
        st = (p.get("stage") or "").lower()
        isComp = s in ["completed", "finished", "done"] or st in ["completed", "finished", "done"]
        isHold = "hold" in s or "hold" in st
        
        end_date = parse_date(p.get("end_date"))
            
        isOd = not isComp and end_date and end_date < now_midnight
        isPend = not isComp and not isHold and not isOd and (s in ["pending", "not started", "new"] or st in ["pending", "not started", "new"])
        
        if isComp: comp += 1
        elif isHold: hold += 1
        elif isOd: od += 1
        elif isPend: pend += 1
        else: act += 1
        
    def getPct(val):
        return round((val / total_valid) * 100) if total_valid > 0 else 0

    statusData = [
      { "name": 'Pending', "count": pend, "percent": getPct(pend), "colorClass": 'bg-primary' },
      { "name": 'Active', "count": act, "percent": getPct(act), "colorClass": 'bg-info' },
      { "name": 'Completed', "count": comp, "percent": getPct(comp), "colorClass": 'bg-success' },
      { "name": 'Overdue', "count": od, "percent": getPct(od), "colorClass": 'bg-danger' },
      { "name": 'On Hold', "count": hold, "percent": getPct(hold), "colorClass": 'bg-warning' }
    ]
    
    # recentProjectsData
    sorted_projects = sorted(
        validProjects,
        key=lambda x: x.get("created_at") or x.get("start_date") or now,
        reverse=True
    )
    recentProjectsData = []
    for p in sorted_projects[:10]:
        pStage_orig = p.get("stage") or p.get("status") or "Active"
        pStage = pStage_orig.lower()
        displayStage = "New"
        if "progress" in pStage: displayStage = "In Progress"
        elif "review" in pStage: displayStage = "In Review"
        elif "completed" in pStage: displayStage = "Completed"
        elif "hold" in pStage: displayStage = "On Hold"
        else: displayStage = pStage_orig.capitalize()
        
        val = float(p.get("project_value") or 0)
        valStr = format_currency(val)
        
        badgeClass = "success"
        if "pending" in pStage or "new" in pStage or "not started" in pStage: badgeClass = "primary"
        elif "hold" in pStage: badgeClass = "warning"
        elif "cancel" in pStage: badgeClass = "danger"
        elif "progress" in pStage or "active" in pStage: badgeClass = "info"
        
        end_date = parse_date(p.get("end_date"))
        if end_date:
            end_date_formatted = end_date.strftime("%d %b %Y")
        else:
            end_date_formatted = "-"
            
        recentProjectsData.append({
            "id": str(p.get("_id") or p.get("id")),
            "name": p.get("project_name") or p.get("title") or "-",
            "category": p.get("category") if p.get("category") and p.get("category") != "Uncategorized" else "-",
            "stage": displayStage,
            "badgeClass": badgeClass,
            "endDate": end_date_formatted,
            "value": valStr
        })

    # Team Productivity (Tasks)
    allowed_ids = await get_allowed_user_ids(current_user)
    
    # Fetch tasks
    tasks_query = {"is_deleted": {"$ne": True}}
    if allowed_ids is not None:
        tasks_query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"assigned_to": {"$in": allowed_ids}},
            {"assigned_to": {"$in": [current_user.get("name"), current_user.get("email")]}}
        ]
    tasks_cursor = db.tasks.find(tasks_query)
    tasks = await tasks_cursor.to_list(length=None)

    # Calculate last 5 weeks productivity
    teamProductivityData = {
        "categories": [],
        "series": [
            {"name": "Total Tasks", "data": []},
            {"name": "Completed Tasks", "data": []}
        ]
    }
    
    # We will compute stats for the last 5 weeks (including current week)
    # A week is considered as 7 days ending on today.
    # So Week 5 is (today-6 to today), Week 4 is (today-13 to today-7), etc.
    for i in range(4, -1, -1):
        week_end = now_midnight + timedelta(days=1) - timedelta(days=7*i)
        week_start = week_end - timedelta(days=7)
        
        # category label
        if i == 0:
            cat_label = "This Week"
        elif i == 1:
            cat_label = "Last Week"
        else:
            cat_label = f"{i} Weeks Ago"
            
        teamProductivityData["categories"].append(cat_label)
        
        total_for_week = 0
        comp_for_week = 0
        
        for t in tasks:
            t_created_str = t.get("created_at")
            if t_created_str:
                t_created = parse_date(t_created_str)
            else:
                t_created = parse_date(t.get("due_date")) or now_midnight
                
            if t_created and week_start <= t_created < week_end:
                total_for_week += 1
                t_stat = (t.get("status") or "").lower()
                if t_stat in ["completed", "done", "finished"]:
                    comp_for_week += 1
                    
        teamProductivityData["series"][0]["data"].append(total_for_week)
        teamProductivityData["series"][1]["data"].append(comp_for_week)

    return {
        "projectStats": projectStats,
        "finStats": finStats,
        "categoryData": categoryData,
        "statusData": statusData,
        "recentProjectsData": recentProjectsData,
        "teamProductivityData": teamProductivityData
    }
