from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load env variables from root .env
load_dotenv(dotenv_path="../.env")

app = FastAPI(title="AIO CRM API")

# Setup CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AIO CRM API"}

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}
