import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def main():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["crm_db"]
    
    tasks = await db.tasks.find().sort([("_id", -1)]).limit(1).to_list(1)
    print("Latest task:", tasks)
    
    if tasks:
        assignee_id = tasks[0].get("assigned_to")
        print("Task assigned_to:", assignee_id)
        print("Task assigned_to type:", type(assignee_id))
        
        user = await db.users.find_one({"_id": assignee_id})
        print("Found User:", bool(user))
        
        notifs = await db.notifications.find({"user_id": str(assignee_id)}).to_list(10)
        print("Notifications for user_id (str):", len(notifs))
        
        notifs2 = await db.notifications.find({"user_id": assignee_id}).to_list(10)
        print("Notifications for user_id (raw):", len(notifs2))
        
        all_notifs = await db.notifications.find().sort([("_id", -1)]).limit(3).to_list(3)
        print("Latest 3 notifications:")
        for n in all_notifs:
            print(n)

if __name__ == "__main__":
    asyncio.run(main())
