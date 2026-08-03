from datetime import datetime, timezone
import uuid
from typing import Optional

async def log_audit_action(
    audit_collection,
    user: dict,
    action: str,
    module: str,
    details: str,
    ip_address: Optional[str] = None
):
    log_entry = {
        "_id": str(uuid.uuid4()),
        "user_id": user.get("_id") if user else None,
        "user_name": user.get("name") if user else "System",
        "action": action,
        "module": module,
        "details": details,
        "ip_address": ip_address,
        "timestamp": datetime.now(timezone.utc)
    }
    await audit_collection.insert_one(log_entry)
