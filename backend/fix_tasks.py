import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def migrate_tasks():
    # Connect to MongoDB
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['crm_db']
    
    # Get all users to build a Name -> ID mapping
    users = await db.users.find({}).to_list(None)
    user_map = {u.get('name'): str(u.get('_id')) for u in users if u.get('name')}
    
    tasks = await db.tasks.find({}).to_list(None)
    fixed = 0
    
    for t in tasks:
        assignee = t.get('assigned_to')
        # If assignee exists and is a valid name from our map (meaning it's not an ID)
        if assignee and assignee in user_map:
            correct_id = user_map[assignee]
            await db.tasks.update_one({'_id': t['_id']}, {'$set': {'assigned_to': correct_id}})
            fixed += 1
            print(f"Fixed task '{t.get('title')}': Changed '{assignee}' to ID '{correct_id}'")
            
    print(f'\nTotal tasks fixed: {fixed}')
    print("Database is now clean and proper!")

if __name__ == '__main__':
    asyncio.run(migrate_tasks())
