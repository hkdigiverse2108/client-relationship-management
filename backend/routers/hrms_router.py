from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from datetime import datetime, timedelta
from bson import ObjectId
from models import (
    HRNoticeCreate, HRNoticeResponse, 
    HREventCreate, HREventResponse, 
    HRCustomTypeCreate, HRCustomTypeResponse,
    HRAssetCreate, HRAssetResponse,
    HRAppraisalCreate, HRAppraisalResponse,
    LeaveCreate, LeaveResponse, LeaveStatusUpdate,
    PunchAction, AttendanceResponse
)
from db import db, users_collection
from dependencies import get_current_user, get_allowed_user_ids
from models import UserResponse
import math

router = APIRouter()

# --- Employees (HRMS View of Users) ---
@router.get("/employees", response_model=List[UserResponse])
async def get_employees(current_user: dict = Depends(get_current_user)):
    # Fetch all users that have an employee_id (or just all users if they are considered employees)
    # Based on the requirement, all users are employees, but let's fetch those that have the employee fields
    # actually we can just fetch all users, or those with employee_id exists. Let's fetch all users, 
    # but maybe only active ones.
    cursor = users_collection.find({})
    employees = []
    async for emp in cursor:
        emp["id"] = emp.pop("_id")
        employees.append(UserResponse(**emp))
    return employees

@router.get("/employees/{employee_id}", response_model=UserResponse)
async def get_employee(employee_id: str, current_user: dict = Depends(get_current_user)):
    # Can fetch by user ID (which is the employee's DB ID) or employee_id string
    emp = await users_collection.find_one({"$or": [{"_id": employee_id}, {"employee_id": employee_id}]})
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    emp["id"] = emp.pop("_id")
    return UserResponse(**emp)

# --- HR Notices / Announcements ---
@router.post("/notices", response_model=HRNoticeResponse)
async def create_notice(notice: HRNoticeCreate, current_user: dict = Depends(get_current_user)):
    notice_data = notice.dict()
    notice_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_notices.insert_one(notice_data)
    notice_data["_id"] = str(result.inserted_id)
    return notice_data

@router.get("/notices", response_model=List[HRNoticeResponse])
async def get_notices(current_user: dict = Depends(get_current_user)):
    notices = await db.hr_notices.find().sort("created_at", -1).to_list(1000)
    for n in notices:
        n["_id"] = str(n["_id"])
    return notices

@router.put("/notices/{notice_id}", response_model=HRNoticeResponse)
async def update_notice(notice_id: str, notice: HRNoticeCreate, current_user: dict = Depends(get_current_user)):
    update_data = notice.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_notices.find_one_and_update(
        {"_id": ObjectId(notice_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Notice not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/notices/{notice_id}")
async def delete_notice(notice_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_notices.delete_one({"_id": ObjectId(notice_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Notice not found")
    return {"message": "Notice deleted"}

@router.delete("/custom-types/{type_id}")
async def delete_type(type_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_custom_types.delete_one({"_id": ObjectId(type_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Type not found")
    return {"message": "Type deleted"}

# --- HR Assets ---
@router.post("/assets", response_model=HRAssetResponse)
async def create_asset(asset: HRAssetCreate, current_user: dict = Depends(get_current_user)):
    asset_data = asset.dict()
    asset_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_assets.insert_one(asset_data)
    asset_data["_id"] = str(result.inserted_id)
    return asset_data

@router.get("/assets", response_model=List[HRAssetResponse])
async def get_assets(current_user: dict = Depends(get_current_user)):
    assets = await db.hr_assets.find().sort("created_at", -1).to_list(1000)
    for a in assets:
        a["_id"] = str(a["_id"])
    return assets

@router.put("/assets/{asset_id}", response_model=HRAssetResponse)
async def update_asset(asset_id: str, asset: HRAssetCreate, current_user: dict = Depends(get_current_user)):
    update_data = asset.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_assets.find_one_and_update(
        {"_id": ObjectId(asset_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Asset not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/assets/{asset_id}")
async def delete_asset(asset_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_assets.delete_one({"_id": ObjectId(asset_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Asset not found")
    return {"message": "Asset deleted"}


# --- HR Appraisals ---
@router.post("/appraisals", response_model=HRAppraisalResponse)
async def create_appraisal(appraisal: HRAppraisalCreate, current_user: dict = Depends(get_current_user)):
    appraisal_data = appraisal.dict()
    appraisal_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_appraisals.insert_one(appraisal_data)
    appraisal_data["_id"] = str(result.inserted_id)
    return appraisal_data

@router.get("/appraisals", response_model=List[HRAppraisalResponse])
async def get_appraisals(current_user: dict = Depends(get_current_user)):
    appraisals = await db.hr_appraisals.find().sort("created_at", -1).to_list(1000)
    for a in appraisals:
        a["_id"] = str(a["_id"])
    return appraisals

@router.put("/appraisals/{appraisal_id}", response_model=HRAppraisalResponse)
async def update_appraisal(appraisal_id: str, appraisal: HRAppraisalCreate, current_user: dict = Depends(get_current_user)):
    update_data = appraisal.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_appraisals.find_one_and_update(
        {"_id": ObjectId(appraisal_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Appraisal not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/appraisals/{appraisal_id}")
async def delete_appraisal(appraisal_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_appraisals.delete_one({"_id": ObjectId(appraisal_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appraisal not found")
    return {"message": "Appraisal deleted"}

# --- HR Leaves ---
@router.get("/leaves/balance")
async def get_leave_balance(current_user: dict = Depends(get_current_user)):
    now = datetime.utcnow()
    year_start = datetime(now.year, 1, 1)
    
    first_day = datetime(now.year, now.month, 1)
    if now.month == 12:
        next_month = datetime(now.year + 1, 1, 1)
    else:
        next_month = datetime(now.year, now.month + 1, 1)

    leaves = await db.hr_leaves.find({
        "employee_id": current_user["_id"],
        "created_at": {"$gte": year_start}
    }).to_list(length=1000)
    
    balances = {
        "Monthly Leave": {"allowed": 1, "taken": 0, "pending": 0},
        "Sick Leave": {"allowed": 6, "taken": 0, "pending": 0},
        "Casual Leave": {"allowed": 6, "taken": 0, "pending": 0},
        "Unpaid Leave": {"allowed": 0, "taken": 0, "pending": 0},
        "Other Leave": {"allowed": 0, "taken": 0, "pending": 0},
        "Other": {"allowed": 0, "taken": 0, "pending": 0}, # For backward compatibility with old data
    }

    for leave in leaves:
        l_type = leave.get("leave_type")
        if l_type not in balances:
            continue
            
        status = leave.get("status", "Pending")
        if status in ["Rejected", "Cancelled"]:
            continue
            
        start = leave.get("start_date")
        end = leave.get("end_date")
        day_type = leave.get("day_type", "Full Day")
        
        days = 1
        if start and end:
            try:
                s_date = datetime.strptime(start, "%Y-%m-%d")
                e_date = datetime.strptime(end, "%Y-%m-%d")
                days = (e_date - s_date).days + 1
            except Exception:
                pass
                
        if day_type in ["First Half", "Second Half"]:
            days = days * 0.5
                
        if l_type == "Monthly Leave":
            created_at = leave.get("created_at")
            if created_at < first_day or created_at >= next_month:
                continue

        if status == "Pending":
            balances[l_type]["pending"] += days
        else:
            balances[l_type]["taken"] += days
            
    for l_type, data in balances.items():
        if data["allowed"] > 0:
            data["remaining"] = max(0, data["allowed"] - (data["taken"] + data["pending"]))
        else:
            data["remaining"] = 0
            
    # Map "Other" back to "Other Leave" if needed, but we will return the full dict
    return balances

@router.post("/leaves", response_model=LeaveResponse)
async def create_leave(leave: LeaveCreate, current_user: dict = Depends(get_current_user)):
    leave_data = leave.dict()
    leave_data["created_at"] = datetime.utcnow()
    leave_data["updated_at"] = datetime.utcnow()
    leave_data["employee_id"] = current_user["_id"]
    leave_data["employee_name"] = current_user.get("name", "Unknown")
    
    result = await db.hr_leaves.insert_one(leave_data)
    leave_data["_id"] = str(result.inserted_id)
    
    # Notify HR and Admins
    hr_users = await db.users.find({"role": {"$in": ["Super Admin", "admin", "HR", "superadmin", "Admin", "hr"]}}).to_list(100)
    now = datetime.utcnow()
    notifications = []
    for hr in hr_users:
        if str(hr["_id"]) != current_user["_id"]:
            notifications.append({
                "user_id": str(hr["_id"]),
                "title": "New Leave Request",
                "message": f"{leave_data['employee_name']} has submitted a {leave.leave_type} request.",
                "type": "info",
                "link": "/leaves",
                "is_read": False,
                "created_at": now
            })
    if notifications:
        await db.notifications.insert_many(notifications)
        
    return leave_data

@router.get("/leaves", response_model=List[LeaveResponse])
async def get_leaves(current_user: dict = Depends(get_current_user)):
    user_role = current_user.get("role", "employee").lower()
    is_hr = user_role in ["admin", "hr", "superadmin", "super admin"]
    
    query = {"is_deleted": {"$ne": True}}
    if not is_hr:
        query["employee_id"] = current_user["_id"]
        
    leaves = await db.hr_leaves.find(query).sort("created_at", -1).to_list(1000)
    
    # Fetch avatars
    users = await db.users.find({}, {"_id": 1, "profile_photo": 1, "avatar": 1, "profile_picture": 1, "image": 1}).to_list(1000)
    user_images = {}
    for u in users:
        img = u.get("profile_photo") or u.get("profile_picture") or u.get("avatar") or u.get("image")
        if img:
            user_images[str(u["_id"])] = img
            
    for l in leaves:
        l["_id"] = str(l["_id"])
        
        # Inject employee image
        if "employee_id" in l:
            eid = str(l["employee_id"])
            l["employee_id"] = eid
            if eid in user_images:
                l["employee_image"] = user_images[eid]
                
        # Inject reviewer image
        if l.get("reviewer_id") and str(l["reviewer_id"]) in user_images:
            l["reviewer_image"] = user_images[str(l["reviewer_id"])]
            
        # Calculate days if missing
        if "days" not in l or l["days"] is None:
            try:
                s = datetime.strptime(l["start_date"], "%Y-%m-%d")
                e = datetime.strptime(l["end_date"], "%Y-%m-%d")
                days = (e - s).days + 1
                if days < 0: days = 0
                if l.get("day_type") in ["First Half", "Second Half"] and days == 1:
                    days = 0.5
                l["days"] = float(days)
            except Exception:
                l["days"] = 0
                
    return leaves

@router.put("/leaves/{leave_id}/status", response_model=LeaveResponse)
async def update_leave_status(leave_id: str, update_data: LeaveStatusUpdate, current_user: dict = Depends(get_current_user)):
    user_role = current_user.get("role", "employee").lower()
    if user_role not in ["admin", "hr", "superadmin", "super admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to update leave status")
        
    leave = await db.hr_leaves.find_one({"_id": ObjectId(leave_id)})
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
        
    await db.hr_leaves.update_one(
        {"_id": ObjectId(leave_id)},
        {"$set": {
            "status": update_data.status,
            "updated_at": datetime.utcnow(),
            "reviewer_id": current_user["_id"],
            "reviewer_name": current_user.get("name", "Admin")
        }}
    )
    
    # Notify Employee
    employee_id = leave.get("employee_id")
    if employee_id and str(employee_id) != current_user["_id"]:
        notif = {
            "user_id": str(employee_id),
            "title": f"Leave Request {update_data.status}",
            "message": f"Your {leave.get('leave_type', 'leave')} request has been {update_data.status.lower()} by {current_user.get('name', 'HR')}.",
            "type": "success" if update_data.status == "Approved" else ("error" if update_data.status in ["Rejected", "Cancelled"] else "info"),
            "link": "/leaves",
            "is_read": False,
            "created_at": datetime.utcnow()
        }
        await db.notifications.insert_one(notif)
    
    updated_leave = await db.hr_leaves.find_one({"_id": ObjectId(leave_id)})
    updated_leave["_id"] = str(updated_leave["_id"])
    if "employee_id" in updated_leave and isinstance(updated_leave["employee_id"], ObjectId):
        updated_leave["employee_id"] = str(updated_leave["employee_id"])
        
    return updated_leave

@router.delete("/leaves/{leave_id}")
async def delete_leave(leave_id: str, current_user: dict = Depends(get_current_user)):
    user_role = current_user.get("role", "employee").lower()
    if user_role not in ["admin", "hr", "superadmin", "super admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete leave request")
        
    leave = await db.hr_leaves.find_one({"_id": ObjectId(leave_id)})
    if not leave:
        raise HTTPException(status_code=404, detail="Leave request not found")
        
    await db.hr_leaves.update_one(
        {"_id": ObjectId(leave_id)},
        {"$set": {
            "is_deleted": True,
            "deleted_at": datetime.utcnow()
        }}
    )
    return {"message": "Leave request deleted successfully"}

@router.put("/leaves/{leave_id}", response_model=LeaveResponse)
async def update_leave(leave_id: str, leave_data: LeaveCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.hr_leaves.find_one({"_id": ObjectId(leave_id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Leave request not found")
        
    if existing.get("status") != "Pending":
        raise HTTPException(status_code=400, detail="Only pending leaves can be edited")
        
    user_role = current_user.get("role", "employee").lower()
    if user_role not in ["admin", "hr", "superadmin", "super admin"] and str(existing.get("employee_id")) != current_user["_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to edit this leave")
        
    update_doc = leave_data.dict(exclude_unset=True)
    update_doc["updated_at"] = datetime.utcnow()
    
    await db.hr_leaves.update_one(
        {"_id": ObjectId(leave_id)},
        {"$set": update_doc}
    )
    
    updated = await db.hr_leaves.find_one({"_id": ObjectId(leave_id)})
    updated["_id"] = str(updated["_id"])
    if "employee_id" in updated and isinstance(updated["employee_id"], ObjectId):
        updated["employee_id"] = str(updated["employee_id"])
    return updated

# --- Attendance ---
@router.post("/attendance/punch")
async def punch_attendance(action_data: PunchAction, current_user: dict = Depends(get_current_user)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    employee_id = current_user["_id"]
    now = datetime.utcnow()
    
    record = await db.hr_attendance.find_one({
        "employee_id": employee_id,
        "date": today_str
    })
    
    if not record:
        # First punch of the day (must be punch_in)
        if action_data.action != "punch_in":
            raise HTTPException(status_code=400, detail="Must punch in first.")
            
        ist_now = now + timedelta(hours=5, minutes=30)
        status = "On Time"
        if ist_now.hour > 9 or (ist_now.hour == 9 and ist_now.minute > 30):
            status = "Late"
            
        record_data = {
            "employee_id": employee_id,
            "employee_name": current_user.get("name", "Unknown"),
            "date": today_str,
            "punch_in": now,
            "punch_out": None,
            "work_seconds": 0,
            "break_seconds": 0,
            "overtime_seconds": 0,
            "status": status,
            "method": action_data.method,
            "photo": current_user.get("profile_photo_url")
        }
        await db.hr_attendance.insert_one(record_data)
        return {"message": "Punched in successfully"}
        
    # Update existing record
    update_fields = {}
    if action_data.action == "punch_out":
        update_fields["punch_out"] = now
        # simple calculation if needed, frontend might already do it or we can do a rough one
        if record.get("punch_in"):
            total_seconds = int((now - record["punch_in"]).total_seconds())
            update_fields["work_seconds"] = total_seconds - record.get("break_seconds", 0)
    elif action_data.action == "break_start":
        update_fields["last_break_start"] = now
    elif action_data.action == "break_end":
        last_break = record.get("last_break_start")
        if last_break:
            break_duration = int((now - last_break).total_seconds())
            update_fields["break_seconds"] = record.get("break_seconds", 0) + break_duration
            update_fields["last_break_start"] = None

    if update_fields:
        await db.hr_attendance.update_one(
            {"_id": record["_id"]},
            {"$set": update_fields}
        )
        
    return {"message": f"Action {action_data.action} recorded"}

@router.get("/attendance/me/stats")
async def get_my_attendance_stats(current_user: dict = Depends(get_current_user)):
    now = datetime.utcnow()
    today_str = now.strftime("%Y-%m-%d")
    yesterday_str = (now - timedelta(days=1)).strftime("%Y-%m-%d")
    
    pipeline = [
        {"$match": {"employee_id": current_user["_id"]}},
        {"$group": {
            "_id": None,
            "all_time_work_seconds": {"$sum": "$work_seconds"},
            "today_work_seconds": {
                "$sum": {
                    "$cond": [{"$eq": ["$date", today_str]}, "$work_seconds", 0]
                }
            },
            "yesterday_work_seconds": {
                "$sum": {
                    "$cond": [{"$eq": ["$date", yesterday_str]}, "$work_seconds", 0]
                }
            },
            "today_break_seconds": {
                "$sum": {
                    "$cond": [{"$eq": ["$date", today_str]}, "$break_seconds", 0]
                }
            }
        }}
    ]
    
    result = await db.hr_attendance.aggregate(pipeline).to_list(1)
    
    if not result:
        return {
            "all_time_work_seconds": 0,
            "today_work_seconds": 0,
            "yesterday_work_seconds": 0,
            "today_break_seconds": 0,
            "percentage_change": 0,
            "trend": "up"
        }
        
    stats = result[0]
    today = stats.get("today_work_seconds", 0)
    yesterday = stats.get("yesterday_work_seconds", 0)
    
    percentage_change = 0
    if yesterday > 0:
        percentage_change = round(((today - yesterday) / yesterday) * 100)
    elif today > 0:
        percentage_change = 100
        
    stats["percentage_change"] = abs(percentage_change)
    stats["trend"] = "up" if percentage_change >= 0 else "down"
    
    if "_id" in stats:
        del stats["_id"]
        
    return stats

@router.get("/attendance", response_model=List[AttendanceResponse])
async def get_attendance(date: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    user_role = current_user.get("role", "employee").lower()
    is_hr = user_role in ["admin", "hr", "superadmin", "super admin"]
    
    query_date = date if date else datetime.utcnow().strftime("%Y-%m-%d")
    query = {"date": query_date}
    if not is_hr:
        query["employee_id"] = current_user["_id"]
        
    records = await db.hr_attendance.find(query).to_list(1000)
    for r in records:
        r["_id"] = str(r["_id"])
        
    return records

@router.get("/attendance/weekly")
async def get_weekly_attendance(current_user: dict = Depends(get_current_user)):
    user_role = current_user.get("role", "employee").lower()
    is_hr = user_role in ["admin", "hr", "superadmin", "super admin"]
    
    query = {}
    if not is_hr:
        query["employee_id"] = current_user["_id"]
        
    # Get last 7 days
    now = datetime.utcnow()
    dates = [(now - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(6, -1, -1)]
    query["date"] = {"$in": dates}
    
    records = await db.hr_attendance.find(query).to_list(1000)
    
    # Calculate daily present count
    daily_present = {d: 0 for d in dates}
    for r in records:
        daily_present[r["date"]] += 1
        
    # Formatting for chart
    result = []
    days_map = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    # also fetch total employees for percentage
    total_employees = await db.users.count_documents({})
    if total_employees == 0: total_employees = 1
    
    for d in dates:
        dt = datetime.strptime(d, "%Y-%m-%d")
        day_str = days_map[dt.weekday()]
        percentage = round((daily_present[d] / total_employees) * 100)
        result.append({
            "name": day_str,
            "present": percentage
        })
        
    return result

# --- HR Dashboard Stats ---
@router.get("/dashboard/department-stats")
async def get_department_stats(current_user: dict = Depends(get_current_user)):
    # 1. Fetch all departments
    departments_cursor = db.hr_custom_types.find({"type": "department"})
    departments = await departments_cursor.to_list(1000)
    
    # default departments if none
    if not departments:
        dept_names = ['Engineering', 'Sales', 'HR', 'Marketing', 'Customer Support']
    else:
        dept_names = [d["name"] for d in departments]

    # 2. Total employees (users)
    total_employees = await db.users.count_documents({})
    if total_employees == 0:
        return [{"name": name, "count": 0, "percentage": 0} for name in dept_names]

    # 3. Aggregate users by department
    pipeline = [
        {"$group": {"_id": "$department", "count": {"$sum": 1}}}
    ]
    dept_counts = await db.users.aggregate(pipeline).to_list(1000)
    
    # Create a lookup dictionary (handle None department)
    count_map = {}
    for d in dept_counts:
        key = d["_id"] if d["_id"] else "Unassigned"
        count_map[key] = d["count"]

    # 4. Map counts to known departments
    stats = []
    for name in dept_names:
        count = count_map.get(name, 0)
        percentage = math.floor((count / total_employees) * 100) if total_employees > 0 else 0
        stats.append({
            "name": name,
            "count": count,
            "percentage": percentage
        })
        # Remove from count_map so we can add the rest
        if name in count_map:
            del count_map[name]

    # 5. Add any remaining departments (e.g. Unassigned, or old departments)
    for name, count in count_map.items():
        percentage = math.floor((count / total_employees) * 100) if total_employees > 0 else 0
        stats.append({
            "name": name,
            "count": count,
            "percentage": percentage
        })

    return stats


# --- HR Events ---
@router.post("/events", response_model=HREventResponse)
async def create_event(event: HREventCreate, current_user: dict = Depends(get_current_user)):
    event_data = event.dict()
    event_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_events.insert_one(event_data)
    event_data["_id"] = str(result.inserted_id)
    return event_data

@router.get("/events", response_model=List[HREventResponse])
async def get_events(current_user: dict = Depends(get_current_user)):
    events = await db.hr_events.find().sort("date", 1).to_list(1000)
    for e in events:
        e["_id"] = str(e["_id"])
    return events

@router.put("/events/{event_id}", response_model=HREventResponse)
async def update_event(event_id: str, event: HREventCreate, current_user: dict = Depends(get_current_user)):
    update_data = event.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.hr_events.find_one_and_update(
        {"_id": ObjectId(event_id)},
        {"$set": update_data},
        return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Event not found")
    result["_id"] = str(result["_id"])
    return result

@router.delete("/events/{event_id}")
async def delete_event(event_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.hr_events.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}


# --- Custom Event Types ---
@router.post("/event-types", response_model=HRCustomTypeResponse)
async def create_event_type(custom_type: HRCustomTypeCreate, current_user: dict = Depends(get_current_user)):
    type_data = custom_type.dict()
    type_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_event_types.insert_one(type_data)
    type_data["_id"] = str(result.inserted_id)
    return type_data

@router.get("/event-types", response_model=List[HRCustomTypeResponse])
async def get_event_types(current_user: dict = Depends(get_current_user)):
    types = await db.hr_event_types.find().to_list(1000)
    for t in types:
        t["_id"] = str(t["_id"])
    return types

# --- Generic Custom Types (for Departments, etc.) ---
@router.post("/custom-types", response_model=HRCustomTypeResponse)
async def create_custom_type(custom_type: HRCustomTypeCreate, current_user: dict = Depends(get_current_user)):
    type_data = custom_type.dict()
    type_data["created_at"] = datetime.utcnow()
    
    result = await db.hr_custom_types.insert_one(type_data)
    type_data["_id"] = str(result.inserted_id)
    return type_data

@router.get("/custom-types", response_model=List[HRCustomTypeResponse])
async def get_custom_types(current_user: dict = Depends(get_current_user)):
    types = await db.hr_custom_types.find().to_list(1000)
    for t in types:
        t["_id"] = str(t["_id"])
    return types

# --- Attendance / Punch-in System ---

@router.get("/attendance/live/stats/today")
async def get_today_attendance_stats(current_user: dict = Depends(get_current_user)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    
    # Custom logic only for these dashboard cards:
    # Super Admin sees all. Admin sees their branch.
    # Anyone under an Admin sees that Admin's branch stats.
    # If no Admin is in ancestors, they see all (company wide).
    role = current_user.get("role", "").lower()
    
    if role in ["super admin", "superadmin"]:
        user_query = {"is_deleted": {"$ne": True}}
    elif role == "admin":
        user_query = {"is_deleted": {"$ne": True}, "$or": [{"ancestors": current_user["_id"]}, {"_id": current_user["_id"]}]}
    else:
        ancestors = current_user.get("ancestors", [])
        admin_id = None
        if ancestors:
            ancestor_docs = await users_collection.find({"_id": {"$in": ancestors}}).to_list(length=None)
            for doc in ancestor_docs:
                if doc.get("role", "").lower() == "admin":
                    admin_id = doc["_id"]
                    break
        
        if admin_id:
            user_query = {"is_deleted": {"$ne": True}, "$or": [{"ancestors": admin_id}, {"_id": admin_id}]}
        else:
            user_query = {"is_deleted": {"$ne": True}}
        
    staff_cursor = users_collection.find(user_query)
    staff_users = await staff_cursor.to_list(length=None)
    staff_ids = [u["_id"] for u in staff_users]
    
    total_staff = len(staff_ids)
    
    attendance_cursor = db.hr_attendance.find({
        "employee_id": {"$in": staff_ids},
        "date": today_str
    })
    attendances = await attendance_cursor.to_list(length=None)
    
    present_today = len([a for a in attendances if a.get("punches") and len(a["punches"]) > 0])
    absent_today = max(0, total_staff - present_today)
    
    late_today = 0
    staff_map = {u["_id"]: u for u in staff_users}
    for att in attendances:
        if att.get("punches") and len(att["punches"]) > 0:
            first_punch_str = att["punches"][0].get("in")
            if not first_punch_str: continue
            
            try:
                # Ensure compatibility with Python 3.9+ fromisoformat by removing Z if present
                first_punch_time = datetime.fromisoformat(first_punch_str.replace("Z", "+00:00"))
                first_punch_local = first_punch_time + timedelta(hours=5, minutes=30)
                
                user = staff_map.get(att["employee_id"])
                start_time_str = user.get("start_time") if user else None
                
                if start_time_str:
                    start_h, start_m = map(int, start_time_str.split(':'))
                    if first_punch_local.hour * 60 + first_punch_local.minute > start_h * 60 + start_m:
                        late_today += 1
            except Exception:
                pass

    pending_leaves = await db.hr_leaves.count_documents({
        "employee_id": {"$in": staff_ids},
        "status": "Pending"
    })
    
    department_counts = {}
    for user in staff_users:
        dept = user.get("department") or "Unassigned"
        department_counts[dept] = department_counts.get(dept, 0) + 1
        
    department_allocations = []
    for dept, count in department_counts.items():
        department_allocations.append({
            "department": dept,
            "count": count,
            "percentage": round((count / total_staff) * 100) if total_staff > 0 else 0
        })
    department_allocations.sort(key=lambda x: x["count"], reverse=True)
    
    return {
        "total_staff": total_staff,
        "present_today": present_today,
        "absent_today": absent_today,
        "late_today": late_today,
        "pending_leaves": pending_leaves,
        "department_allocations": department_allocations
    }

@router.get("/attendance/live/today")
async def get_today_attendance(current_user: dict = Depends(get_current_user)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    record = await db.hr_attendance.find_one({
        "employee_id": current_user["_id"],
        "date": today_str
    })
    
    if not record:
        return {
            "date": today_str,
            "punches": [],
            "breaks": [],
            "is_punched_in": False,
            "is_on_break": False
        }
        
    record["_id"] = str(record["_id"])
    return record

@router.post("/attendance/live/punch")
async def toggle_punch(current_user: dict = Depends(get_current_user)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    now = datetime.utcnow()
    
    record = await db.hr_attendance.find_one({
        "employee_id": current_user["_id"],
        "date": today_str
    })
    
    if not record:
        # First punch in of the day
        new_record = {
            "employee_id": current_user["_id"],
            "date": today_str,
            "punches": [{"in": now, "out": None}],
            "breaks": [],
            "is_punched_in": True,
            "is_on_break": False,
            "created_at": now,
            "updated_at": now
        }
        await db.hr_attendance.insert_one(new_record)
        new_record["_id"] = str(new_record["_id"])
        return new_record
        
    punches = record.get("punches", [])
    is_punched_in = record.get("is_punched_in", False)
    breaks = record.get("breaks", [])
    is_on_break = record.get("is_on_break", False)
    
    if is_punched_in:
        # Punch out
        if punches and punches[-1]["out"] is None:
            punches[-1]["out"] = now
            
        # If on break, automatically end break
        if is_on_break and breaks and breaks[-1]["end"] is None:
            breaks[-1]["end"] = now
            is_on_break = False
            
        is_punched_in = False
    else:
        # Punch in again
        punches.append({"in": now, "out": None})
        is_punched_in = True
        
    await db.hr_attendance.update_one(
        {"_id": record["_id"]},
        {"$set": {
            "punches": punches,
            "breaks": breaks,
            "is_punched_in": is_punched_in,
            "is_on_break": is_on_break,
            "updated_at": now
        }}
    )
    
    record["punches"] = punches
    record["breaks"] = breaks
    record["is_punched_in"] = is_punched_in
    record["is_on_break"] = is_on_break
    record["_id"] = str(record["_id"])
    return record

@router.post("/attendance/live/break")
async def toggle_break(current_user: dict = Depends(get_current_user)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    now = datetime.utcnow()
    
    record = await db.hr_attendance.find_one({
        "employee_id": current_user["_id"],
        "date": today_str
    })
    
    if not record or not record.get("is_punched_in", False):
        raise HTTPException(status_code=400, detail="Must be punched in to take a break")
        
    breaks = record.get("breaks", [])
    is_on_break = record.get("is_on_break", False)
    
    if is_on_break:
        # End break
        if breaks and breaks[-1]["end"] is None:
            breaks[-1]["end"] = now
        is_on_break = False
    else:
        # Start break
        breaks.append({"start": now, "end": None})
        is_on_break = True
        
    await db.hr_attendance.update_one(
        {"_id": record["_id"]},
        {"$set": {
            "breaks": breaks,
            "is_on_break": is_on_break,
            "updated_at": now
        }}
    )
    
    record["breaks"] = breaks
    record["is_on_break"] = is_on_break
    record["_id"] = str(record["_id"])
    return record

@router.get("/attendance/records")
async def get_attendance_records(
    start_date: str = None,
    end_date: str = None,
    current_user: dict = Depends(get_current_user)
):
    if not start_date:
        start_date = datetime.utcnow().strftime("%Y-%m-%d")
    if not end_date:
        end_date = start_date
        
    allowed_ids = await get_allowed_user_ids(current_user)
    
    if allowed_ids is None:
        user_query = {"is_deleted": {"$ne": True}}
    else:
        # Check if they are admin or just an employee looking at their top-level admin
        role = current_user.get("role", "").lower()
        if role != "admin":
            ancestors = current_user.get("ancestors", [])
            admin_id = None
            if ancestors:
                ancestor_docs = await users_collection.find({"_id": {"$in": ancestors}}).to_list(length=None)
                for doc in ancestor_docs:
                    if doc.get("role", "").lower() == "admin":
                        admin_id = doc["_id"]
                        break
            if admin_id:
                user_query = {"is_deleted": {"$ne": True}, "$or": [{"ancestors": admin_id}, {"_id": admin_id}]}
            else:
                user_query = {"is_deleted": {"$ne": True}}
        else:
            user_query = {"is_deleted": {"$ne": True}, "_id": {"$in": allowed_ids}}
            
    staff_cursor = users_collection.find(user_query)
    staff_users = await staff_cursor.to_list(length=None)
    staff_ids = [u["_id"] for u in staff_users]
    
    # Generate list of dates between start_date and end_date
    start_dt = datetime.strptime(start_date, "%Y-%m-%d")
    end_dt = datetime.strptime(end_date, "%Y-%m-%d")
    
    date_list = []
    current_dt = start_dt
    while current_dt <= end_dt:
        date_list.append(current_dt.strftime("%Y-%m-%d"))
        current_dt += timedelta(days=1)
        
    # Limit to maximum 31 days to prevent overload
    if len(date_list) > 31:
        date_list = date_list[:31]
    
    # Fetch attendances for these staff on the dates
    attendance_cursor = db.hr_attendance.find({
        "employee_id": {"$in": staff_ids},
        "date": {"$in": date_list}
    })
    attendances = await attendance_cursor.to_list(length=None)
    att_map = {(a["employee_id"], a["date"]): a for a in attendances}
    
    # Fetch leaves for these staff on the dates
    leaves_cursor = db.hr_leaves.find({
        "employee_id": {"$in": staff_ids},
        "status": "Approved",
        "start_date": {"$lte": date_list[-1]},
        "end_date": {"$gte": date_list[0]}
    })
    leaves = await leaves_cursor.to_list(length=None)
    
    leave_map = {}
    for l in leaves:
        emp = l["employee_id"]
        try:
            ls = datetime.strptime(l["start_date"], "%Y-%m-%d")
            le = datetime.strptime(l["end_date"], "%Y-%m-%d")
            curr = ls
            while curr <= le:
                leave_map[(emp, curr.strftime("%Y-%m-%d"))] = True
                curr += timedelta(days=1)
        except:
            pass
    
    results = []
    
    import re
    def parse_time_str(t_str, default_h=9, default_m=0):
        if not t_str: return default_h, default_m
        match = re.search(r'(\d+):(\d+)', t_str)
        if match:
            h, m = int(match.group(1)), int(match.group(2))
            if 'pm' in t_str.lower() and h != 12:
                h += 12
            elif 'am' in t_str.lower() and h == 12:
                h = 0
            return h, m
        return default_h, default_m
    
    def format_duration(secs):
        if secs <= 0: return "-"
        h = int(secs // 3600)
        m = int((secs % 3600) // 60)
        return f"{h}h {m}m"
        
    for user in staff_users:
        emp_id = user["_id"]
        for d in date_list:
            att = att_map.get((emp_id, d))
        
        # Parse start and end time
        start_time_str = user.get("start_time")
        end_time_str = user.get("end_time")
        
        try:
            sh, sm = parse_time_str(start_time_str, 9, 0)
            eh, em = parse_time_str(end_time_str, 18, 0)
            assigned_working_secs = (eh * 3600 + em * 60) - (sh * 3600 + sm * 60)
        except:
            assigned_working_secs = 9 * 3600
        
        # Calculate punches
        punches = att.get("punches", []) if att else []
        breaks = att.get("breaks", []) if att else []
        is_punched_in = att.get("is_punched_in", False) if att else False
        is_on_break = att.get("is_on_break", False) if att else False
        
        # Current Status
        if leave_map.get((emp_id, d)):
            current_status = "Punch Out"
            status = "Leave"
        elif not att or not punches:
            current_status = "Punch Out"
            status = "Absent"
        else:
            status = "Present"
            if is_on_break:
                current_status = "Break In"
            elif is_punched_in:
                if len(breaks) > 0:
                    current_status = "Break Out"
                else:
                    current_status = "Punch In"
            else:
                current_status = "Punch Out"
                
        # Times
        punch_in = "-"
        punch_out = "-"
        first_punch_dt = None
        
        def parse_dt(val):
            if isinstance(val, datetime):
                return val
            if isinstance(val, str):
                return datetime.fromisoformat(val.replace("Z", "+00:00"))
            return None

        if punches:
            try:
                first_punch_time = parse_dt(punches[0]["in"])
                if first_punch_time:
                    first_punch_dt = first_punch_time + timedelta(hours=5, minutes=30)
                    punch_in = first_punch_dt.strftime("%I:%M %p")
                
                last_out = punches[-1]["out"]
                if last_out:
                    last_punch_time = parse_dt(last_out)
                    if last_punch_time:
                        last_punch_dt = last_punch_time + timedelta(hours=5, minutes=30)
                        punch_out = last_punch_dt.strftime("%I:%M %p")
            except:
                pass
                
        # Late
        late_duration = "-"
        if first_punch_dt:
            try:
                sh, sm = parse_time_str(start_time_str, 9, 0)
                punch_minutes = first_punch_dt.hour * 60 + first_punch_dt.minute
                start_minutes = sh * 60 + sm
                if punch_minutes > start_minutes:
                    late_duration = format_duration((punch_minutes - start_minutes) * 60)
            except:
                pass
                
        # Calculate actual working time
        prod_secs = 0
        now_dt = datetime.utcnow()
        for p in punches:
            try:
                pt_in = parse_dt(p["in"])
                pt_out = parse_dt(p.get("out")) if p.get("out") else now_dt
                if pt_in and pt_out:
                    prod_secs += (pt_out - pt_in).total_seconds()
            except:
                pass
                
        # Calculate break time
        break_secs = 0
        for b in breaks:
            try:
                bt_in = parse_dt(b["start"])
                bt_out = parse_dt(b.get("end")) if b.get("end") else now_dt
                if bt_in and bt_out:
                    break_secs += (bt_out - bt_in).total_seconds()
            except:
                pass
                
        # Total working hours = prod_secs (time from punch in to punch out)
        total_worked_secs = prod_secs
        total_working_hours = format_duration(total_worked_secs) if status == "Present" else "-"
        
        # Sub breaks from production
        actual_prod_secs = max(0, total_worked_secs - break_secs)
        
        production_hours = format_duration(actual_prod_secs) if status == "Present" else "-"
        break_time = format_duration(break_secs) if break_secs > 0 else "-"
        
        overtime_secs = max(0, actual_prod_secs - assigned_working_secs)
        over_time = format_duration(overtime_secs) if overtime_secs > 0 else "-"
        
        # Date string
        try:
            d_obj = datetime.strptime(d, "%Y-%m-%d")
            display_date = d_obj.strftime("%d %b %Y")
            display_day = d_obj.strftime("%A")
        except:
            display_date = d
            display_day = ""
            
        results.append({
            "id": f"{emp_id}_{d}",
            "employee_id": user.get("id_number", f"Emp-{emp_id[-4:].upper()}"),
            "employee_name": user.get("name", "Unknown"),
            "employee_profile_photo": user.get("profile_photo"),
            "date": display_date,
            "day": display_day,
            "current_status": current_status,
            "status": status,
            "punch_in": punch_in,
            "punch_out": punch_out,
            "break_time": break_time,
            "over_time": over_time,
            "late": late_duration,
            "production_hours": production_hours,
            "total_working_hours": total_working_hours,
            "method": "Web Portal"
        })
        
    return results
