from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import List, Optional
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

def check_ats_permission(current_user: dict):
    role = current_user.get("role", "").lower()
    if role not in ["super admin", "superadmin", "admin", "hr"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied. Only Super Admin, Admin, and HR can manage ATS pipeline."
        )

def get_oid_query(id_str: str):
    try:
        oid = ObjectId(id_str)
        return {"$or": [{"_id": oid}, {"_id": id_str}]}
    except Exception:
        return {"_id": id_str}

# --- ATS Jobs ---
@router.post("/jobs", response_model=ATSJobResponse)
async def create_job(job: ATSJobCreate, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    job_data = job.dict()
    job_data["created_at"] = datetime.utcnow()
    
    result = await db.ats_jobs.insert_one(job_data)
    job_data["_id"] = str(result.inserted_id)
    return job_data

@router.get("/jobs", response_model=List[ATSJobResponse])
async def get_jobs(current_user: dict = Depends(get_current_user)):
    # Auto-seed initial sample jobs & candidates if completely empty
    if await db.ats_jobs.count_documents({}) == 0:
        j1 = {
            "title": "Senior React Developer",
            "department": "Engineering",
            "location": "Surat / Hybrid",
            "employment_type": "Full Time",
            "status": "Open",
            "applications_count": 3,
            "posted_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "experience": "3-5 years",
            "salary_range": "₹8L - ₹12L",
            "description": "Looking for an experienced React.js developer with expertise in Vite, modern state management, and REST APIs.",
            "stage": "APPLIED",
            "created_at": datetime.utcnow()
        }
        res1 = await db.ats_jobs.insert_one(j1)
        j1_id = str(res1.inserted_id)

        j2 = {
            "title": "UI/UX Product Designer",
            "department": "Design",
            "location": "Remote",
            "employment_type": "Full Time",
            "status": "Open",
            "applications_count": 2,
            "posted_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "experience": "2-4 years",
            "salary_range": "₹6L - ₹10L",
            "description": "Talented product designer with Figma mastery and experience crafting enterprise SaaS user experiences.",
            "stage": "APPLIED",
            "created_at": datetime.utcnow()
        }
        res2 = await db.ats_jobs.insert_one(j2)
        j2_id = str(res2.inserted_id)

        sample_candidates = [
            {
                "name": "Aarav Mehta",
                "email": "aarav.mehta@example.com",
                "phone": "+91 98765 43210",
                "job_id": j1_id,
                "stage": "APPLIED",
                "department": "Engineering",
                "resume_url": "",
                "applied_date": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "name": "Priya Sharma",
                "email": "priya.sharma@example.com",
                "phone": "+91 98123 45678",
                "job_id": j1_id,
                "stage": "SCREENING",
                "department": "Engineering",
                "resume_url": "",
                "applied_date": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "name": "Rohan Patel",
                "email": "rohan.patel@example.com",
                "phone": "+91 97234 56789",
                "job_id": j1_id,
                "stage": "INTERVIEW SCHEDULED",
                "department": "Engineering",
                "resume_url": "",
                "applied_date": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "name": "Sneha Roy",
                "email": "sneha.roy@example.com",
                "phone": "+91 99887 76655",
                "job_id": j2_id,
                "stage": "SELECTED",
                "department": "Design",
                "resume_url": "",
                "applied_date": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "name": "Karan Verma",
                "email": "karan.verma@example.com",
                "phone": "+91 98777 66554",
                "job_id": j2_id,
                "stage": "SCREENING",
                "department": "Design",
                "resume_url": "",
                "applied_date": datetime.utcnow(),
                "created_at": datetime.utcnow()
            }
        ]
        await db.ats_candidates.insert_many(sample_candidates)

    jobs = await db.ats_jobs.find({"is_deleted": {"$ne": True}}).sort("created_at", -1).to_list(1000)
    for j in jobs:
        j["_id"] = str(j["_id"])
    return jobs

@router.put("/jobs/{job_id}", response_model=ATSJobResponse)
async def update_job(job_id: str, job: ATSJobCreate, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    update_data = job.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.ats_jobs.update_one(
        get_oid_query(job_id),
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    
    update_data["_id"] = job_id
    return update_data

@router.delete("/jobs/{job_id}")
async def delete_job(job_id: str, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    result = await db.ats_jobs.update_one(
        get_oid_query(job_id),
        {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    # Also soft delete associated candidates
    await db.ats_candidates.update_many(
        {"job_id": job_id},
        {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}}
    )
    return {"message": "Job and associated candidates deleted"}

# --- ATS Candidates ---
@router.post("/candidates", response_model=ATSCandidateResponse)
async def create_candidate(candidate: ATSCandidateCreate, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    candidate_data = candidate.dict()
    candidate_data["applied_date"] = datetime.utcnow()
    
    result = await db.ats_candidates.insert_one(candidate_data)
    candidate_data["_id"] = str(result.inserted_id)

    # Increment applications count for the job
    await db.ats_jobs.update_one(
        get_oid_query(candidate.job_id),
        {"$inc": {"applications_count": 1}}
    )

    return candidate_data

@router.get("/candidates", response_model=List[ATSCandidateResponse])
async def get_candidates(job_id: str = None, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    query = {"is_deleted": {"$ne": True}}
    if job_id and job_id != "all":
        query["job_id"] = job_id
    candidates = await db.ats_candidates.find(query).sort("applied_date", -1).to_list(1000)
    for c in candidates:
        c["_id"] = str(c["_id"])
    return candidates

@router.put("/candidates/{candidate_id}", response_model=ATSCandidateResponse)
async def update_candidate(candidate_id: str, candidate: ATSCandidateCreate, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    update_data = candidate.dict()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.ats_candidates.update_one(
        get_oid_query(candidate_id),
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    update_data["_id"] = candidate_id
    return update_data

@router.delete("/candidates/{candidate_id}")
async def delete_candidate(candidate_id: str, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    candidate = await db.ats_candidates.find_one(get_oid_query(candidate_id))
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
        
    result = await db.ats_candidates.update_one(
        get_oid_query(candidate_id),
        {"$set": {"is_deleted": True, "deleted_at": datetime.utcnow()}}
    )
    if result.matched_count > 0 and candidate.get("job_id"):
        await db.ats_jobs.update_one(
            get_oid_query(candidate["job_id"]),
            {"$inc": {"applications_count": -1}}
        )
    return {"message": "Candidate deleted"}

@router.put("/candidates/{candidate_id}/stage")
async def update_candidate_stage(candidate_id: str, stage: str, current_user: dict = Depends(get_current_user)):
    check_ats_permission(current_user)
    result = await db.ats_candidates.update_one(
        get_oid_query(candidate_id),
        {"$set": {"stage": stage, "updated_at": datetime.utcnow()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return {"message": "Stage updated successfully"}

@router.post("/candidates/upload-resume")
async def upload_resume(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    try:
        import uuid
        os.makedirs("uploads/resumes", exist_ok=True)
        file_ext = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4().hex}.{file_ext}"
        file_path = os.path.join("uploads", "resumes", file_name)
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
            
        file_url = f"/uploads/resumes/{file_name}"
        return {"resume_url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload resume: {str(e)}")
