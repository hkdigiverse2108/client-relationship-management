from fastapi import APIRouter, HTTPException, Depends
from typing import List
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
from db import categories_collection
from dependencies import get_current_user

router = APIRouter(prefix="/categories", tags=["Categories"])

class CategoryCreate(BaseModel):
    name: str

class CategoryResponse(CategoryCreate):
    id: str = Field(alias="_id")

@router.post("", response_model=CategoryResponse)
async def create_category(category: CategoryCreate, current_user: dict = Depends(get_current_user)):
    data = category.model_dump()
    data["created_at"] = datetime.utcnow()
    result = await categories_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return CategoryResponse(**data)

@router.get("", response_model=List[CategoryResponse])
async def get_categories(current_user: dict = Depends(get_current_user)):
    cursor = categories_collection.find().sort("name", 1)
    categories = []
    async for c in cursor:
        c["_id"] = str(c["_id"])
        categories.append(CategoryResponse(**c))
    return categories

@router.put("/{obj_id}", response_model=CategoryResponse)
async def update_category(obj_id: str, category: CategoryCreate, current_user: dict = Depends(get_current_user)):
    data = category.model_dump()
    result = await categories_collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
        
    updated = await categories_collection.find_one({"_id": ObjectId(obj_id)})
    updated["_id"] = str(updated["_id"])
    return CategoryResponse(**updated)

@router.delete("/{obj_id}")
async def delete_category(obj_id: str, current_user: dict = Depends(get_current_user)):
    result = await categories_collection.delete_one({"_id": ObjectId(obj_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}
