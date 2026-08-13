from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from bson import ObjectId
from models import OrderCreate, OrderResponse, OrderUpdate
from db import orders_collection, audit_logs_collection
from audit_logger import log_audit_action
from dependencies import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])

async def generate_order_id():
    # Find the order with the highest order_id
    latest_order = await orders_collection.find_one(
        {"order_id": {"$regex": "^ORD-"}},
        sort=[("order_id", -1)]
    )
    if latest_order and "order_id" in latest_order:
        try:
            parts = latest_order["order_id"].split("-")
            if len(parts) > 1:
                latest_num = int(parts[1])
                new_num = latest_num + 1
                return f"ORD-{new_num:05d}"
        except Exception:
            pass
    return "ORD-10001"

@router.post("", response_model=OrderResponse)
async def create_order(order: OrderCreate, current_user: dict = Depends(get_current_user)):
    data = order.model_dump()
    data["order_id"] = await generate_order_id()
    data["created_by"] = str(current_user["_id"])
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await orders_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Orders",
        f"Simulated E-com order {data['order_id']} for {order.customer_name} ({order.product_name})"
    )
    
    return OrderResponse(**data)

@router.get("", response_model=List[OrderResponse])
async def get_orders(current_user: dict = Depends(get_current_user)):
    cursor = orders_collection.find()
    orders = []
    async for o in cursor:
        o["_id"] = str(o["_id"])
        if not o.get("order_id"):
            o["order_id"] = "ORD-UNKNOWN"
        orders.append(o)
    return orders

@router.put("/{obj_id}", response_model=OrderResponse)
async def update_order(obj_id: str, order: OrderUpdate, current_user: dict = Depends(get_current_user)):
    data = order.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    
    data["updated_at"] = datetime.utcnow()
    
    result = await orders_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
        
    updated = await orders_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
    if not updated.get("order_id"):
        updated["order_id"] = "ORD-UNKNOWN"
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Orders",
        f"Updated simulated E-com order {updated.get('order_id')} for {updated.get('customer_name')}"
    )
    
    return OrderResponse(**updated)

@router.delete("/{obj_id}")
async def delete_order(obj_id: str, current_user: dict = Depends(get_current_user)):
    # Find order to log it
    order = await orders_collection.find_one({"_id": ObjectId(obj_id)})
    if not order:
         raise HTTPException(status_code=404, detail="Order not found")
         
    result = await orders_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Orders",
        f"Deleted simulated E-com order {order.get('order_id', 'ORD-UNKNOWN')} for {order.get('customer_name')}"
    )
    
    return {"message": "Order deleted successfully"}
