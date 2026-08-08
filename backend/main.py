from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles

# Load env variables from root .env
load_dotenv(dotenv_path="../.env")

# Ensure uploads directory exists
os.makedirs("uploads/profile_photos", exist_ok=True)

from db import init_db
from routers import auth_router, user_router, audit_router, dashboard_router, notifications_router, leads_router

app = FastAPI(title="AIO CRM API")

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup_event():
    await init_db()

# Setup CORS
default_origin = os.getenv("VITE_APP_URL") or os.getenv("VITE_API_URL")
cors_origins_env = os.getenv("CORS_ORIGINS", default_origin)
origins = cors_origins_env.split(",") if cors_origins_env else []
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(user_router.router, prefix="/api/v1")
app.include_router(leads_router.router, prefix="/api/v1")
app.include_router(audit_router.router, prefix="/api/v1")
app.include_router(dashboard_router.router, prefix="/api/v1")
app.include_router(notifications_router.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to AIO CRM API"}

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}

