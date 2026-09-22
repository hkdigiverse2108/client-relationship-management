import os
import shutil
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from datetime import datetime
from bson import ObjectId
from models import ProductCreate, ProductResponse, ProductUpdate, TransferStockRequest
from db import products_collection, audit_logs_collection
from audit_logger import log_audit_action
from dependencies import get_current_user

router = APIRouter(prefix="/products", tags=["E-Commerce Products"])

@router.post("/upload-image")
async def upload_product_image(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    try:
        file_extension = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        file_name = f"product_{int(datetime.utcnow().timestamp())}.{file_extension}"
        file_path = f"uploads/products/{file_name}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {"url": f"/{file_path}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")

@router.post("", response_model=ProductResponse)
async def create_product(product: ProductCreate, current_user: dict = Depends(get_current_user)):
    data = product.model_dump()
    data["created_by"] = str(current_user["_id"])
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = data["created_at"]
    
    result = await products_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Create",
        "Products",
        f"Created product {data['product_name']} ({data['sku_code']})"
    )
    
    return ProductResponse(**data)

@router.get("", response_model=List[ProductResponse])
async def get_products(current_user: dict = Depends(get_current_user)):
    cursor = products_collection.find().sort("created_at", -1)
    products = []
    async for p in cursor:
        p["_id"] = str(p["_id"])
        
        # Fix legacy variants data
        if "variants" in p:
            for v in p["variants"]:
                if "value" in v and "values" not in v:
                    # Convert old string value to list
                    v["values"] = [v["value"]] if isinstance(v["value"], str) else v["value"]
                    
        try:
            # Validate manually to catch errors before FastAPI does
            ProductResponse(**p)
            products.append(p)
        except Exception as e:
            print(f"Skipping invalid product {p.get('_id')}: {e}")
            
    return products

@router.put("/{obj_id}", response_model=ProductResponse)
async def update_product(obj_id: str, product: ProductUpdate, current_user: dict = Depends(get_current_user)):
    data = product.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    
    data["updated_at"] = datetime.utcnow()
    
    result = await products_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
        
    updated = await products_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Products",
        f"Updated product {updated.get('product_name')} ({updated.get('sku_code')})"
    )
    
    return ProductResponse(**updated)

@router.delete("/{obj_id}")
async def delete_product(obj_id: str, current_user: dict = Depends(get_current_user)):
    product = await products_collection.find_one({"_id": ObjectId(obj_id)})
    if not product:
         raise HTTPException(status_code=404, detail="Product not found")
         
    result = await products_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
        
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Delete",
        "Products",
        f"Deleted product {product.get('product_name')} ({product.get('sku_code')})"
    )
    
    return {"message": "Product deleted successfully"}

@router.post("/{obj_id}/transfer", response_model=ProductResponse)
async def transfer_stock(obj_id: str, transfer: TransferStockRequest, current_user: dict = Depends(get_current_user)):
    product = await products_collection.find_one({"_id": ObjectId(obj_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    warehouse_stocks = product.get("warehouse_stocks") or {}
    
    # Initialize Main Warehouse with total stock if no warehouse data exists
    if not warehouse_stocks and product.get("initial_stock_qty"):
        warehouse_stocks["Main Warehouse"] = product.get("initial_stock_qty")
        
    from_loc = transfer.from_location
    to_loc = transfer.to_location
    qty = transfer.quantity
    
    if qty <= 0:
        raise HTTPException(status_code=400, detail="Transfer quantity must be greater than zero")
        
    current_from_qty = warehouse_stocks.get(from_loc, 0)
    if current_from_qty < qty:
        raise HTTPException(status_code=400, detail=f"Insufficient stock in {from_loc}. Available: {current_from_qty}")
        
    # Deduct from source
    warehouse_stocks[from_loc] -= qty
    # Add to destination
    warehouse_stocks[to_loc] = warehouse_stocks.get(to_loc, 0) + qty
    
    # Update document
    await products_collection.update_one(
        {"_id": ObjectId(obj_id)}, 
        {"$set": {"warehouse_stocks": warehouse_stocks, "updated_at": datetime.utcnow()}}
    )
    
    updated = await products_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
    
    await log_audit_action(
        audit_logs_collection,
        current_user,
        "Update",
        "Products",
        f"Transferred {qty} units of {updated.get('product_name')} from {from_loc} to {to_loc}"
    )
    
    return ProductResponse(**updated)
