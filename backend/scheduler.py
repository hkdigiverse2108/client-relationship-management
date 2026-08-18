import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime
from db import db, notifications_collection
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

def start_scheduler():
    # Run the check every 5 minutes
    scheduler.add_job(check_overdue_deadlines, IntervalTrigger(minutes=5), id="overdue_check", replace_existing=True)
    scheduler.start()

def stop_scheduler():
    scheduler.shutdown()
