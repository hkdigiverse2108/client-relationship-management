from datetime import datetime
from db import db, users_collection

def extract_month_day(dob_val):
    if not dob_val:
        return None, None
    if isinstance(dob_val, datetime):
        return dob_val.month, dob_val.day
    if isinstance(dob_val, str):
        try:
            cleaned = dob_val.split("T")[0].strip()
            if "-" in cleaned:
                parts = cleaned.split("-")
                if len(parts) >= 3:
                    # YYYY-MM-DD
                    return int(parts[1]), int(parts[2])
            elif "/" in cleaned:
                parts = cleaned.split("/")
                if len(parts) >= 3:
                    p1, p2 = int(parts[0]), int(parts[1])
                    if p1 > 12:  # p1 is day
                        return p2, p1
                    return p1, p2
        except Exception:
            pass
    return None, None

async def sync_employee_birthday_event(user_id: str, user_name: str, dob_val, is_active: bool = True):
    if not user_id:
        return

    # Clear previous birthday events for this user to keep dates updated and clean
    await db.hr_events.delete_many({"user_id": str(user_id), "is_birthday": True})

    if not is_active:
        return

    m, d = extract_month_day(dob_val)
    if not m or not d:
        return

    now = datetime.utcnow()
    # Sync for previous year, current year, and next 2 years
    years = [now.year - 1, now.year, now.year + 1, now.year + 2]

    events_to_insert = []
    for y in years:
        event_date = f"{y}-{m:02d}-{d:02d}"
        events_to_insert.append({
            "title": f"{user_name}'s Birthday",
            "desc": f"Wishing {user_name} a very Happy Birthday! 🎂",
            "date": event_date,
            "type": "birthday",
            "duration": "",
            "user_id": str(user_id),
            "is_birthday": True,
            "is_deleted": False,
            "created_at": datetime.utcnow()
        })
    if events_to_insert:
        await db.hr_events.insert_many(events_to_insert)

async def auto_sync_all_birthdays():
    """Ensure all active users with a valid DOB have their birthday events generated in hr_events."""
    try:
        now = datetime.utcnow()
        users_with_dob = await users_collection.find({
            "is_deleted": {"$ne": True},
            "is_active": {"$ne": False},
            "dob": {"$ne": None}
        }).to_list(2000)

        for u in users_with_dob:
            user_id = str(u["_id"])
            m, d = extract_month_day(u.get("dob"))
            if not m or not d:
                continue
            cur_date = f"{now.year}-{m:02d}-{d:02d}"
            exists = await db.hr_events.find_one({
                "user_id": user_id,
                "is_birthday": True,
                "date": cur_date,
                "is_deleted": {"$ne": True}
            })
            if not exists:
                await sync_employee_birthday_event(user_id, u.get("name", "Employee"), u.get("dob"), u.get("is_active", True))
    except Exception as e:
        print(f"[ERROR] Birthday auto-sync error: {e}")
