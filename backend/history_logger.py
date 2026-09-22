from datetime import datetime, timezone
import uuid
from typing import Optional

async def log_client_history(
    history_collection,
    client_id: str,
    user: dict,
    action: str,
    description: str
):
    log_entry = {
        "_id": str(uuid.uuid4()),
        "client_id": client_id,
        "user_id": user.get("_id") or user.get("id") if user else None,
        "user_name": user.get("name") if user else "System",
        "action": action,
        "description": description,
        "timestamp": datetime.now(timezone.utc)
    }
    await history_collection.insert_one(log_entry)
