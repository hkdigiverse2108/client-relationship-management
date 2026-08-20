from pymongo import MongoClient
import os
from datetime import datetime

mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
client = MongoClient(mongodb_uri)
db = client["crm_db"]

# Find all completed payments
cursor = db.payments.find({"status": "completed"})

count = 0
for payment in cursor:
    # Check if a ledger entry already exists for this payment
    exists = db.ledger.find_one({"reference_id": str(payment["_id"])})
    if not exists:
        ledger_entry = {
            "entry_id": f"LEDG-{int(datetime.utcnow().timestamp()) + count}",
            "date": payment.get("payment_date", datetime.utcnow().strftime('%Y-%m-%d')),
            "description": f"Payment Received via {payment.get('payment_method', 'Unknown')}",
            "reference_id": str(payment["_id"]),
            "client_id": payment.get("client_id"),
            "type": "Credit",
            "amount": payment.get("amount_received", 0),
            "status": "settled",
            "created_by": payment.get("created_by", "system"),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        db.ledger.insert_one(ledger_entry)
        count += 1

print(f"✅ Successfully seeded {count} old payments into the General Ledger!")
