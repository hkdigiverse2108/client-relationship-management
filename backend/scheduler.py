import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime, timedelta
from db import db, notifications_collection
import uuid
from routers.notifications_router import create_notification

scheduler = AsyncIOScheduler()

async def check_overdue_deadlines():
    now_iso = datetime.utcnow().isoformat()
    
    # 1. Check Overdue Reminders
    # We look for reminders where due_date < now and status != 'completed' and not notified yet
    overdue_reminders = await db.reminders.find({
        "due_date": {"$lt": now_iso},
        "status": {"$ne": "completed"},
        "overdue_notified": {"$ne": True}
    }).to_list(length=100)

    for reminder in overdue_reminders:
        # Determine who to notify. For now, notify the user who created it, or a default user.
        # If reminder has assigned_to or created_by, use that.
        user_id = reminder.get("created_by", "admin")
        title = "Reminder Overdue"
        message = f"The reminder '{reminder.get('description', 'Untitled')}' is overdue!"
        
        await create_notification(
            user_id=user_id,
            title=title,
            message=message,
            type="error",
            link="/reminders"
        )
        # Mark as notified to avoid spam
        await db.reminders.update_one(
            {"_id": reminder["_id"]},
            {"$set": {"overdue_notified": True}}
        )

    # 2. Check Overdue Tasks
    # Task has end_date
    overdue_tasks = await db.tasks.find({
        "end_date": {"$lt": now_iso},
        "status": {"$ne": "Completed"}, # Tasks have 'Completed' (capital C usually based on UI)
        "overdue_notified": {"$ne": True}
    }).to_list(length=100)

    for task in overdue_tasks:
        user_id = task.get("assigned_to") or task.get("created_by", "admin")
        title = "Task Overdue"
        message = f"The task '{task.get('title', 'Untitled')}' is overdue!"
        
        await create_notification(
            user_id=user_id,
            title=title,
            message=message,
            type="error",
            link="/tasks"
        )
        # Mark as notified
        await db.tasks.update_one(
            {"_id": task["_id"]},
            {"$set": {"overdue_notified": True}}
        )

async def process_recurring_invoices():
    now_date = datetime.utcnow().date()
    now_iso = now_date.isoformat()
    
    # Find active recurring invoices where next_issue_date is today or passed
    recurring_invoices = await db.invoices.find({
        "is_recurring": True,
        "next_issue_date": {"$lte": now_iso}
    }).to_list(length=100)

    for inv in recurring_invoices:
        # Check if we passed recurring end date
        if inv.get("recurring_end_date") and inv["recurring_end_date"] < now_iso:
            await db.invoices.update_one({"_id": inv["_id"]}, {"$set": {"is_recurring": False}})
            continue
            
        # 1. Clone the invoice
        new_inv = inv.copy()
        new_inv.pop("_id", None)
        new_inv["invoice_number"] = f"INV-REC-{str(uuid.uuid4())[:6].upper()}"
        new_inv["issue_date"] = now_iso
        
        # Calculate new due date based on old offset
        try:
            old_issue = datetime.strptime(inv["issue_date"], "%Y-%m-%d")
            old_due = datetime.strptime(inv["due_date"], "%Y-%m-%d")
            delta = old_due - old_issue
            new_inv["due_date"] = (datetime.utcnow() + delta).strftime("%Y-%m-%d")
        except:
            new_inv["due_date"] = now_iso # Fallback
            
        new_inv["status"] = "draft" # Or sent, depending on business logic
        new_inv["is_recurring"] = False # The clone is not a template itself
        new_inv["next_issue_date"] = None
        new_inv["created_at"] = datetime.utcnow()
        new_inv["updated_at"] = datetime.utcnow()
        
        # Insert new invoice
        await db.invoices.insert_one(new_inv)
        
        # 2. Update the parent's next_issue_date
        freq = inv.get("recurring_frequency", "monthly")
        next_dt = datetime.strptime(inv["next_issue_date"], "%Y-%m-%d")
        if freq == "weekly":
            next_dt += timedelta(days=7)
        elif freq == "yearly":
            next_dt = next_dt.replace(year=next_dt.year + 1)
        else: # monthly
            month = next_dt.month
            year = next_dt.year
            month += 1
            if month > 12:
                month = 1
                year += 1
            next_dt = next_dt.replace(month=month, year=year)
            
        new_next_iso = next_dt.strftime("%Y-%m-%d")
        
        # Check if new next_dt exceeds end date
        if inv.get("recurring_end_date") and new_next_iso > inv["recurring_end_date"]:
            await db.invoices.update_one({"_id": inv["_id"]}, {"$set": {"next_issue_date": new_next_iso, "is_recurring": False}})
        else:
            await db.invoices.update_one({"_id": inv["_id"]}, {"$set": {"next_issue_date": new_next_iso}})
            
        # Send Notification
        user_id = inv.get("created_by", "admin")
        await create_notification(
            user_id=user_id,
            title="Recurring Invoice Generated",
            message=f"A new invoice {new_inv['invoice_number']} was auto-generated from {inv.get('invoice_number')}",
            type="info",
            link="/invoices"
        )

def start_scheduler():
    # Run the check every 5 minutes for deadlines
    scheduler.add_job(check_overdue_deadlines, IntervalTrigger(minutes=5), id="overdue_check", replace_existing=True)
    # Run recurring invoice check every 24 hours (daily)
    scheduler.add_job(process_recurring_invoices, IntervalTrigger(hours=24), id="recurring_invoices", replace_existing=True)
    scheduler.start()

def stop_scheduler():
    scheduler.shutdown()
