from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import DealCreate, DealResponse, NotificationCreate
from db import deals_collection, notifications_collection, client_history_collection, audit_logs_collection
from history_logger import log_client_history
from audit_logger import log_audit_action
from dependencies import get_current_user, get_allowed_user_ids

router = APIRouter(prefix="/deals", tags=["deals"])

@router.post("", response_model=DealResponse)
async def create_deal(deal: DealCreate, current_user: dict = Depends(get_current_user)):
    data = deal.model_dump(exclude_unset=True)
    data["created_by"] = current_user["_id"]
    if not data.get("assigned_to"):
        data["assigned_to"] = current_user["_id"]
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await deals_collection.insert_one(data)
    created = await deals_collection.find_one({"_id": result.inserted_id})
    
    if data.get("client_id"):
        await log_client_history(
            client_history_collection,
            data["client_id"],
            current_user,
            "Deal Created",
            f"Deal '{data.get('title', '')}' was created with value {data.get('value', 0)}"
        )
        
    created["_id"] = str(created["_id"])
    
    # Notify assigned user
    if data.get("assigned_to"):
        notification = NotificationCreate(
            user_id=data["assigned_to"],
            title="New Deal Assigned",
            message=f"You have been assigned a new deal: {data['title']}",
            type="info",
            link="/pipeline"
        )
        notif_data = notification.model_dump(exclude_unset=True)
        notif_data["created_at"] = datetime.utcnow()
        notif_data["created_at"] = datetime.utcnow()
        await notifications_collection.insert_one(notif_data)

    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Deals",
        f"Created deal '{data.get('title', '')}'"
    )

    return created

@router.get("", response_model=List[DealResponse])
async def get_deals(client_id: str = None, current_user: dict = Depends(get_current_user)):
    query = {"is_deleted": {"$ne": True}}
    if client_id:
        query["client_id"] = client_id
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"assigned_to": {"$in": allowed_ids}}
        ]
        
    cursor = deals_collection.find(query)
    deals = []
    async for d in cursor:
        d["_id"] = str(d["_id"])
        deals.append(d)
    return deals

@router.get("/summary/stats")
async def get_deals_stats(current_user: dict = Depends(get_current_user)):
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"assigned_to": {"$in": allowed_ids}}
        ]
        
    pipeline = [
        {"$match": query},
        {"$group": {"_id": "$stage", "total_amount": {"$sum": "$amount"}, "count": {"$sum": 1}}}
    ]
    cursor = deals_collection.aggregate(pipeline)
    stats = {}
    async for doc in cursor:
        stage = doc["_id"] or "Unknown"
        stats[stage] = {
            "total_amount": doc["total_amount"],
            "count": doc["count"]
        }
    return stats

@router.get("/forecast/stats")
async def get_forecast_stats(current_user: dict = Depends(get_current_user)):
    from datetime import timedelta
    now = datetime.utcnow()
    current_month_str = now.strftime("%Y-%m")
    current_year_str = now.strftime("%Y")
    last_month = now - timedelta(days=30)
    last_month_str = last_month.strftime("%Y-%m")
    
    query = {"is_deleted": {"$ne": True}}
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None:
        query["$or"] = [
            {"created_by": {"$in": allowed_ids}},
            {"assigned_to": {"$in": allowed_ids}}
        ]
        
    cursor = deals_collection.find(query)
    deals = []
    async for d in cursor:
        deals.append(d)
        
    total_pipeline = 0
    weighted_pipeline = 0
    expected_this_month = 0
    won_value = 0
    total_overall_value = 0
    
    prev_total_pipeline = 0
    prev_weighted_pipeline = 0
    prev_expected_month = 0
    prev_won_value = 0
    
    monthly_forecast = [0] * 12
    hot_deals_list = []
    
    try:
        for d in deals:
            amt = float(d.get("amount") or 0)
            prob = float(d.get("probability") or 0)
            stage = d.get("stage", "")
            weight = amt * (prob / 100)
            total_overall_value += amt
            
            # Date parsing
            close_date_str = ""
            created_at_str = ""
            
            cd = d.get("expected_close_date")
            ca = d.get("created_at")
            
            if cd:
                if isinstance(cd, datetime):
                    close_date_str = cd.strftime("%Y-%m")
                    cd_date = cd
                elif isinstance(cd, str):
                    try:
                        cd_date = datetime.strptime(cd[:10], "%Y-%m-%d")
                        close_date_str = cd_date.strftime("%Y-%m")
                    except:
                        cd_date = None
                        pass
            else:
                cd_date = None
                        
            if ca:
                if isinstance(ca, datetime):
                    created_at_str = ca.strftime("%Y-%m")
                elif isinstance(ca, str):
                    try:
                        created_at_str = datetime.strptime(ca[:10], "%Y-%m-%d").strftime("%Y-%m")
                    except:
                        pass
            
            is_won = stage == "Won"
            is_lost = stage == "Lost"
            is_active = not is_won and not is_lost
            
            if is_won:
                won_value += amt
                if close_date_str == last_month_str or created_at_str == last_month_str:
                    prev_won_value += amt
            elif is_active:
                total_pipeline += amt
                weighted_pipeline += weight
                
                if created_at_str == last_month_str:
                    prev_total_pipeline += amt
                    prev_weighted_pipeline += weight
                    
                if close_date_str == current_month_str:
                    expected_this_month += weight
                elif close_date_str == last_month_str:
                    prev_expected_month += weight
                    
                if cd_date:
                    days_diff = (cd_date - now).days
                    if 0 <= days_diff <= 30:
                        hot_deals_list.append({
                            "id": str(d.get("_id", "")),
                            "title": d.get("title", "Untitled Deal"),
                            "amount": amt,
                            "probability": prob,
                            "expected_close_date": cd_date.strftime("%Y-%m-%d")
                        })
                    
            if close_date_str.startswith(current_year_str) and is_active:
                try:
                    month_index = int(close_date_str.split("-")[1]) - 1
                    monthly_forecast[month_index] += weight
                except:
                    pass

        # Chart Percentages (0-100)
        total_pipeline_pct = (total_pipeline / total_overall_value * 100) if total_overall_value else 0
        weighted_pipeline_pct = (weighted_pipeline / total_pipeline * 100) if total_pipeline else 0
        expected_month_pct = (expected_this_month / total_pipeline * 100) if total_pipeline else 0
        won_value_pct = (won_value / total_overall_value * 100) if total_overall_value else 0
        
        def calc_growth(curr, prev):
            if prev == 0:
                return 100.0 if curr > 0 else 0.0
            return ((curr - prev) / prev) * 100
            
        return {
            "won_value": won_value,
            "total_pipeline": total_pipeline,
            "weighted_pipeline": weighted_pipeline,
            "expected_this_month": expected_this_month,
            
            "percentages": {
                "total_pipeline": round(total_pipeline_pct),
                "weighted_pipeline": round(weighted_pipeline_pct),
                "expected_this_month": round(expected_month_pct),
                "won_value": round(won_value_pct)
            },
            "growth": {
                "total_pipeline": round(calc_growth(total_pipeline, prev_total_pipeline), 1),
                "weighted_pipeline": round(calc_growth(weighted_pipeline, prev_weighted_pipeline), 1),
                "expected_this_month": round(calc_growth(expected_this_month, prev_expected_month), 1),
                "won_value": round(calc_growth(won_value, prev_won_value), 1)
            },
            "monthly_forecast": monthly_forecast,
            "hot_deals": sorted(hot_deals_list, key=lambda x: x["expected_close_date"])[:5]
        }
    except Exception as e:
        print("Forecast stats error:", e)
        pass
        
    return {
        "won_value": 0,
        "total_pipeline": 0,
        "weighted_pipeline": 0,
        "expected_this_month": 0,
        "percentages": { "total_pipeline": 0, "weighted_pipeline": 0, "expected_this_month": 0, "won_value": 0 },
        "growth": { "total_pipeline": 0.0, "weighted_pipeline": 0.0, "expected_this_month": 0.0, "won_value": 0.0 },
        "monthly_forecast": [0]*12,
        "hot_deals": []
    }


from models import DealUpdate
from bson import ObjectId

@router.put("/{obj_id}", response_model=DealResponse)
async def update_deal(obj_id: str, deal: DealUpdate, current_user: dict = Depends(get_current_user)):
    data = deal.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided")
    data["updated_at"] = datetime.utcnow()
    
    old_deal = await deals_collection.find_one({"_id": ObjectId(obj_id)})
    if not old_deal:
        raise HTTPException(status_code=404, detail="Deal not found")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None and old_deal.get("created_by") not in allowed_ids and old_deal.get("assigned_to") not in allowed_ids:
        raise HTTPException(status_code=403, detail="Not authorized to edit this deal")

    result = await deals_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
        
    updated = await deals_collection.find_one({"_id": ObjectId(obj_id)})
    
    if updated.get("client_id"):
        changes = []
        for key, new_val in data.items():
            if key in ["updated_at"]: continue
            old_val = old_deal.get(key)
            if old_val != new_val:
                readable_key = key.replace("_", " ").title()
                if new_val or old_val: # Only log if there's an actual value change from or to something
                    changes.append(f"{readable_key} changed from '{old_val or 'Empty'}' to '{new_val or 'Empty'}'")
        
        desc = f"Deal '{updated.get('title', '')}' was updated."
        if changes:
            desc += " Updates: " + ", ".join(changes)
            
        await log_client_history(
            client_history_collection,
            updated["client_id"],
            current_user,
            "Deal Updated",
            desc
        )
        
    updated["_id"] = str(updated["_id"])
    
    # Notify if assigned_to changed
    if data.get("assigned_to") and data.get("assigned_to") != old_deal.get("assigned_to"):
        notification = NotificationCreate(
            user_id=data["assigned_to"],
            title="Deal Assigned",
            message=f"You have been assigned an existing deal: {updated['title']}",
            type="info",
            link="/pipeline"
        )
        notif_data = notification.model_dump(exclude_unset=True)
        notif_data["created_at"] = datetime.utcnow()
        notif_data["created_at"] = datetime.utcnow()
        await notifications_collection.insert_one(notif_data)

    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Deals",
        f"Updated deal '{updated.get('title', '')}'"
    )

    return updated

@router.delete("/{obj_id}")
async def delete_deal(obj_id: str, current_user: dict = Depends(get_current_user)):
    deal = await deals_collection.find_one({"_id": ObjectId(obj_id)})
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
        
    allowed_ids = await get_allowed_user_ids(current_user)
    if allowed_ids is not None and deal.get("created_by") not in allowed_ids and deal.get("assigned_to") not in allowed_ids:
        raise HTTPException(status_code=403, detail="Not authorized to delete this deal")
    
    result = await deals_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Deal not found")
        
    title = deal.get("title", "") if deal else obj_id
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Deals",
        f"Deleted deal '{title}'"
    )
    return {"message": "Deal deleted successfully"}
