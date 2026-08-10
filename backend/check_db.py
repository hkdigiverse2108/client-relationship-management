import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def main():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client.crm_db
    projects = await db.projects.find().to_list(100)
    for p in projects:
        print(p.get('_id'), p.get('title'), p.get('category'))

asyncio.run(main())
