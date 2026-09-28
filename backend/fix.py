import asyncio
import time
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

async def fix_payments():
    # Load correct connection string from .env
    load_dotenv(dotenv_path="../.env")
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB_NAME", "crm_db")
    
    print(f"Connecting to DB: {db_name} at {uri.split('@')[-1] if '@' in uri else uri}")
    client = AsyncIOMotorClient(uri)
    db = client[db_name]
    
    cursor = db.payments.find({'payment_id': {'$exists': False}})
    count = 0
    async for p in cursor:
        new_id = 'PAY-' + str(int(time.time())) + str(p['_id'])[-4:]
        print('Fixing payment:', p['_id'], 'with', new_id)
        await db.payments.update_one({'_id': p['_id']}, {'$set': {'payment_id': new_id, 'source_type': 'Invoice'}})
        count += 1
    print(f"Done. Fixed {count} payments.")

if __name__ == "__main__":
    asyncio.run(fix_payments())
