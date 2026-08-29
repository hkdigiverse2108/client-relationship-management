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
from dependencies import get_current_user
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
    
    query = {}
    if not is_hr:
        query["employee_id"] = current_user["_id"]
        
    leaves = await db.hr_leaves.find(query).sort("created_at", -1).to_list(1000)
    for l in leaves:
        l["_id"] = str(l["_id"])
        if "employee_id" in l and isinstance(l["employee_id"], ObjectId):
            l["employee_id"] = str(l["employee_id"])
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

