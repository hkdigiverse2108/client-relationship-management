from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import List
import os
from datetime import datetime
from bson import ObjectId

from models import (
    ATSJobCreate, ATSJobResponse,
    ATSCandidateCreate, ATSCandidateResponse
)
from db import db
from dependencies import get_current_user

router = APIRouter()

# --- ATS Jobs ---
@router.post("/jobs", response_model=ATSJobResponse)
async def create_job(job: ATSJobCreate, current_user: dict = Depends(get_current_user)):
    job_data = job.dict()
    job_data["created_at"] = datetime.utcnow()
    
    result = await db.ats_jobs.insert_one(job_data)
    job_data["_id"] = str(result.inserted_id)
    return job_data

@router.get("/jobs", response_model=List[ATSJobResponse])
async def get_jobs(current_user: dict = Depends(get_current_user)):
    jobs = await db.ats_jobs.find().sort("created_at", -1).to_list(1000)
    for j in jobs:
        j["_id"] = str(j["_id"])
    return jobs

@router.put("/jobs/{job_id}", response_model=ATSJobResponse)
async def update_job(job_id: str, job: ATSJobCreate, current_user: dict = Depends(get_current_user)):
    update_data = job.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.ats_jobs.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    
    update_data["_id"] = job_id
    return update_data

@router.delete("/jobs/{job_id}")
async def delete_job(job_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.ats_jobs.delete_one({"_id": ObjectId(job_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    # Also delete associated candidates
    await db.ats_candidates.delete_many({"job_id": job_id})
    return {"message": "Job and associated candidates deleted"}

# --- ATS Candidates ---
@router.post("/candidates", response_model=ATSCandidateResponse)
async def create_candidate(candidate: ATSCandidateCreate, current_user: dict = Depends(get_current_user)):
    candidate_data = candidate.dict()
    candidate_data["applied_date"] = datetime.utcnow()
    
    result = await db.ats_candidates.insert_one(candidate_data)
    candidate_data["_id"] = str(result.inserted_id)

    # Increment applications count for the job
    await db.ats_jobs.update_one(
        {"_id": ObjectId(candidate.job_id)},
        {"$inc": {"applications_count": 1}}
    )

    return candidate_data

@router.get("/candidates", response_model=List[ATSCandidateResponse])
async def get_candidates(job_id: str = None, current_user: dict = Depends(get_current_user)):
    query = {}
    if job_id:
        query["job_id"] = job_id
    candidates = await db.ats_candidates.find(query).sort("applied_date", -1).to_list(1000)
    for c in candidates:
        c["_id"] = str(c["_id"])
    return candidates

@router.put("/candidates/{candidate_id}", response_model=ATSCandidateResponse)
async def update_candidate(candidate_id: str, candidate: ATSCandidateCreate, current_user: dict = Depends(get_current_user)):
    update_data = candidate.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.ats_candidates.update_one(
        {"_id": ObjectId(candidate_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    update_data["_id"] = candidate_id
    return update_data

@router.delete("/candidates/{candidate_id}")
async def delete_candidate(candidate_id: str, current_user: dict = Depends(get_current_user)):
    # Get candidate first to decrement count
    candidate = await db.ats_candidates.find_one({"_id": ObjectId(candidate_id)})
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
        
    result = await db.ats_candidates.delete_one({"_id": ObjectId(candidate_id)})
    if result.deleted_count > 0:
        await db.ats_jobs.update_one(
            {"_id": ObjectId(candidate["job_id"])},
            {"$inc": {"applications_count": -1}}
        )
    return {"message": "Candidate deleted"}

@router.put("/candidates/{candidate_id}/stage")
async def update_candidate_stage(candidate_id: str, stage: str, current_user: dict = Depends(get_current_user)):
    result = await db.ats_candidates.update_one(
        {"_id": ObjectId(candidate_id)},
        {"$set": {"stage": stage, "updated_at": datetime.utcnow()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return {"message": "Stage updated successfully"}

@router.post("/candidates/upload-resume")
async def upload_resume(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    try:
        import uuid
        file_ext = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4().hex}.{file_ext}"
        file_path = f"uploads/resumes/{file_name}"
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
            
        file_url = f"/uploads/resumes/{file_name}"
        return {"resume_url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload resume: {str(e)}")
