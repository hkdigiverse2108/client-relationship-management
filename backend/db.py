import os
from motor.motor_asyncio import AsyncIOMotorClient

# Get settings from environment
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "crm_db")

client = AsyncIOMotorClient(MONGODB_URI)
db = client[MONGODB_DB_NAME]

# Collections
users_collection = db.get_collection("users")
otps_collection = db.get_collection("otps")
audit_logs_collection = db.get_collection("audit_logs")
leads_collection = db.get_collection("leads")
notifications_collection = db.get_collection("notifications")
contacts_collection = db.get_collection("contacts")
clients_collection = db.get_collection("clients")
deals_collection = db.get_collection("deals")
projects_collection = db.get_collection("projects")
invoices_collection = db.get_collection("invoices")
payments_collection = db.get_collection("payments")
settings_collection = db.get_collection("settings")
tasks_collection = db.get_collection("tasks")
expenses_collection = db.get_collection("expenses")
client_history_collection = db.get_collection("client_history")
orders_collection = db.get_collection("orders")
customers_collection = db.get_collection("customers")

async def init_db():
    # Create unique indexes
    await users_collection.create_index("email", unique=True)
    await otps_collection.create_index("email")
    await clients_collection.create_index("client_id", unique=True)
