import asyncio
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_super_admin():
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB_NAME", "crm_db")
    
    client = AsyncIOMotorClient(uri)
    db = client[db_name]
    users_collection = db.get_collection("users")
    
    # Check if admin already exists
    existing = await users_collection.find_one({"email": "admin@aiocrm.com"})
    if existing:
        print("Admin user already exists!")
        return

    # Create permissions
    modules = ["dashboard", "leads", "contacts", "companies", "deals", "tasks", "users"]
    permissions = {}
    for mod in modules:
        permissions[mod] = {"view": True, "edit": True, "delete": True}
        
    admin_id = str(uuid.uuid4())
    hashed_password = pwd_context.hash("admin123")
    
    user = {
        "_id": admin_id,
        "name": "Pratvi Jikadra",
        "email": "admin@aiocrm.com",
        "phone": "+910000000000",
        "role": "Super Admin",
        "permissions": permissions,
        "parent_id": admin_id, # Parent is self
        "password_hash": hashed_password,
        "is_first_login": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await users_collection.insert_one(user)
    print("Super Admin created successfully!")
    print("Email: admin@aiocrm.com")
    print("Password: admin123")

if __name__ == "__main__":
    asyncio.run(create_super_admin())
