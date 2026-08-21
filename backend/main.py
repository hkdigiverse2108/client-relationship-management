from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles

# Load env variables from root .env
load_dotenv(dotenv_path="../.env")

# Ensure uploads directory exists
os.makedirs("uploads/profile_photos", exist_ok=True)
os.makedirs("uploads/products", exist_ok=True)

from db import init_db
from scheduler import start_scheduler, stop_scheduler
from routers import (
    auth_router,
    user_router,
    audit_router,
    dashboard_router,
    notifications_router,
    leads_router,
    role_router,
    contacts_router,
    clients_router,
    deals_router,
    projects_router,
    invoices_router,
    payments_router,
    tasks_router,
    reminders_router,
    orders_router,
    customers_router,
    products_router,
    categories_router,
    finance_router,
    quotes_router,
    ledger_router,
    expenses_router
)

app = FastAPI(title="AIO CRM API")

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup_event():
    await init_db()
    start_scheduler()

@app.on_event("shutdown")
async def shutdown_event():
    stop_scheduler()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(user_router.router, prefix="/api/v1")
app.include_router(leads_router.router, prefix="/api/v1")
app.include_router(contacts_router.router, prefix="/api/v1")
app.include_router(clients_router.router, prefix="/api/v1")
app.include_router(audit_router.router, prefix="/api/v1")
app.include_router(dashboard_router.router, prefix="/api/v1")
app.include_router(role_router.router, prefix="/api/v1")
app.include_router(notifications_router.router, prefix="/api/v1")
app.include_router(deals_router.router, prefix="/api/v1")
app.include_router(projects_router.router, prefix="/api/v1")
app.include_router(tasks_router.router, prefix="/api/v1/tasks", tags=["tasks"])
app.include_router(invoices_router.router, prefix="/api/v1")
app.include_router(payments_router.router, prefix="/api/v1")
app.include_router(orders_router.router, prefix="/api/v1")
app.include_router(customers_router.router, prefix="/api/v1")
app.include_router(products_router.router, prefix="/api/v1")
app.include_router(categories_router.router, prefix="/api/v1")
app.include_router(finance_router.router, prefix="/api/v1")
app.include_router(quotes_router.router, prefix="/api/v1")
app.include_router(ledger_router.router)
app.include_router(expenses_router.router)

app.include_router(reminders_router.router, prefix="/api/v1", tags=["reminders"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AIO CRM API"}

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}

