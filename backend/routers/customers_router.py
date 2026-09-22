from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models import CustomerCreate, CustomerResponse, CustomerUpdate
from db import customers_collection, audit_logs_collection
from audit_logger import log_audit_action
from dependencies import get_current_user

router = APIRouter(prefix="/customers", tags=["E-Commerce Customers"])

async def generate_customer_id():
    latest = await customers_collection.find_one(
        {"customer_id": {"$regex": "^CUST-"}},
        sort=[("customer_id", -1)]
    )
    if latest and "customer_id" in latest:
        try:
            parts = latest["customer_id"].split("-")
            if len(parts) > 1:
                latest_num = int(parts[1])
                new_num = latest_num + 1
                return f"CUST-{new_num:05d}"
        except Exception:
            pass
    return "CUST-10001"

@router.post("", response_model=CustomerResponse)
async def create_customer(customer: CustomerCreate, current_user: dict = Depends(get_current_user)):
    query = []
    if customer.email:
        query.append({"email": customer.email})
    if customer.phone:
        query.append({"phone": customer.phone})
        
    if query:
        existing = await customers_collection.find_one({"$or": query})
        if existing:
            raise HTTPException(status_code=400, detail="A customer with this email or phone number already exists")

    data = customer.model_dump()
    if not data.get("customer_id"):
        data["customer_id"] = await generate_customer_id()
    data["created_by"] = str(current_user["_id"])
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await customers_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Customers",
        f"Created customer {data['customer_id']} - {data['name']}"
    )
    
    return CustomerResponse(**data)

@router.get("", response_model=List[CustomerResponse])
async def get_customers(current_user: dict = Depends(get_current_user)):
    cursor = customers_collection.find().sort("created_at", -1)
    customers = []
    async for c in cursor:
        c["_id"] = str(c["_id"])
        if not c.get("customer_id"):
            c["customer_id"] = "CUST-UNKNOWN"
        customers.append(c)
    return customers

@router.put("/{obj_id}", response_model=CustomerResponse)
async def update_customer(obj_id: str, customer: CustomerUpdate, current_user: dict = Depends(get_current_user)):
    data = customer.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    
    query = []
    if data.get("email"):
        query.append({"email": data["email"]})
    if data.get("phone"):
        query.append({"phone": data["phone"]})
        
    if query:
        existing = await customers_collection.find_one({
            "$or": query,
            "_id": {"$ne": ObjectId(obj_id)}
        })
        if existing:
            raise HTTPException(status_code=400, detail="Another customer with this email or phone number already exists")
    
    data["updated_at"] = datetime.utcnow()
    
    result = await customers_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
        
    updated = await customers_collection.find_one({"_id": ObjectId(obj_id)})
    
    # Sync to orders
    order_update = {}
    if "name" in data: order_update["customer_name"] = data["name"]
    if "email" in data: order_update["customer_email"] = data["email"]
    if "phone" in data: order_update["customer_phone"] = data["phone"]
    if "city" in data: order_update["destination_city"] = data["city"]
    if "state" in data: order_update["destination_state"] = data["state"]
    if "country" in data: order_update["destination_country"] = data["country"]
    
    if order_update:
        from db import orders_collection
        order_update["updated_at"] = datetime.utcnow()
        await orders_collection.update_many(
            {"customer_id": obj_id},
            {"$set": order_update}
        )

    updated["_id"] = str(updated["_id"])
    if not updated.get("customer_id"):
        updated["customer_id"] = "CUST-UNKNOWN"
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Customers",
        f"Updated customer {updated.get('customer_id')} - {updated.get('name')}"
    )
    
    return CustomerResponse(**updated)

@router.delete("/{obj_id}")
async def delete_customer(obj_id: str, current_user: dict = Depends(get_current_user)):
    customer = await customers_collection.find_one({"_id": ObjectId(obj_id)})
    if not customer:
         raise HTTPException(status_code=404, detail="Customer not found")
         
    result = await customers_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Customers",
        f"Deleted customer {customer.get('customer_id', 'CUST-UNKNOWN')} - {customer.get('name')}"
    )
    
    return {"message": "Customer deleted successfully"}
