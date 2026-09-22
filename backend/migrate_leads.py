import asyncio
from db import leads_collection

async def migrate_leads():
    cursor = leads_collection.find({})
    updated_count = 0
    async for lead in cursor:
        stage = lead.get("stage")
        if stage:
            # Overwrite status with stage, and drop stage
            await leads_collection.update_one(
                {"_id": lead["_id"]},
                {
                    "$set": {"status": stage},
                    "$unset": {"stage": ""}
                }
            )
            updated_count += 1
    
    print(f"Migration completed. Updated {updated_count} leads.")

if __name__ == "__main__":
    asyncio.run(migrate_leads())
