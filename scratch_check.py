import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check():
    client = AsyncIOMotorClient('mongodb://localhost:27017/')
    db = client['crm_db']
    invoices = await db['invoices'].find().to_list(100)
    print("Total invoices:", len(invoices))
    if invoices:
        print("Sample:", invoices[0])

asyncio.run(check())
