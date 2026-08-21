import os
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
import urllib.request
import json
import re
from db import invoices_collection, expenses_collection

router = APIRouter(prefix="/gst", tags=["gst"])

class GSTVerifyRequest(BaseModel):
    gstin: str = Field(..., description="15-digit GST Number")

def verify_gst_format(gstin: str) -> bool:
    # Standard format: 2 numbers, 5 letters, 4 numbers, 1 letter, 1 alphanumeric, Z, 1 alphanumeric
    pattern = r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
    return bool(re.match(pattern, gstin.upper()))

@router.post("/verify")
async def verify_gst(request: GSTVerifyRequest):
    gstin = request.gstin.strip().upper()
    
    if not verify_gst_format(gstin):
        raise HTTPException(status_code=400, detail="GST no is invalid")
        
    client_id = os.environ.get("CASHFREE_CLIENT_ID", "").strip().strip('"').strip("'")
    client_secret = os.environ.get("CASHFREE_CLIENT_SECRET", "").strip().strip('"').strip("'")
    
    if not client_id or not client_secret:
        raise HTTPException(status_code=500, detail="Cashfree API credentials not configured in .env")
        
    env = os.environ.get("CASHFREE_ENV", "sandbox").lower()
    
    # Auto-detect sandbox from keys if env is not explicitly set to production
    if "test" in client_id.lower() or "test" in client_secret.lower():
        env = "sandbox"
        
    if env == "sandbox" or env == "test":
        url = "https://sandbox.cashfree.com/verification/gstin"
    else:
        url = "https://api.cashfree.com/verification/gstin"
    
    # Payload can be either lowercase or uppercase, let's provide both or standard lowercase if they updated it
    # Older docs used GSTIN, newer docs use gstin. Let's stick to gstin or provide both just in case, or stick to what's documented.
    payload = json.dumps({
        "GSTIN": gstin,
        "gstin": gstin
    }).encode('utf-8')
    
    headers = {
        'x-client-id': client_id,
        'x-client-secret': client_secret,
        'Content-Type': 'application/json'
    }
    
    req = urllib.request.Request(url, data=payload, headers=headers, method='POST')
    
    try:
        # We use a blocking call here, but it's acceptable for this simple router. 
        # For full async, we would use httpx or aiohttp.
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return {"status": "success", "data": result}
    except urllib.error.HTTPError as e:
        error_msg = e.read().decode('utf-8')
        try:
            error_data = json.loads(error_msg)
            # Try to grab common error keys from Cashfree
            message = error_data.get('message') or error_data.get('message_details') or error_msg
        except:
            message = error_msg or 'Failed to verify GSTIN via Cashfree'
        
        # Adding a fallback log so we can see it in terminal
        print(f"[CASHFREE ERROR] {e.code}: {error_msg}")
        raise HTTPException(status_code=400, detail=str(message))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/crm-summary/{gstin}")
async def get_crm_summary(gstin: str):
    gstin = gstin.strip().upper()
    
    # 1. Sales (Invoices)
    sales_pipeline = [
        {"$match": {"client_gstin": gstin, "status": {"$ne": "draft"}}},
        {"$group": {
            "_id": None,
            "total_billed": {"$sum": "$total_due"},
            "total_gst_collected": {"$sum": "$total_tax_amount"},
            "invoice_count": {"$sum": 1}
        }}
    ]
    sales_cursor = invoices_collection.aggregate(sales_pipeline)
    sales_results = await sales_cursor.to_list(length=1)
    sales_data = sales_results[0] if sales_results else {"total_billed": 0, "total_gst_collected": 0, "invoice_count": 0}
    
    # 2. Purchases (Expenses)
    purchases_pipeline = [
        {"$match": {"merchant_gstin": gstin}},
        {"$group": {
            "_id": None,
            "total_purchases": {"$sum": "$amount"},
            "total_gst_paid": {"$sum": "$tax_amount"},
            "expense_count": {"$sum": 1}
        }}
    ]
    purchases_cursor = expenses_collection.aggregate(purchases_pipeline)
    purchases_results = await purchases_cursor.to_list(length=1)
    purchases_data = purchases_results[0] if purchases_results else {"total_purchases": 0, "total_gst_paid": 0, "expense_count": 0}
    
    return {
        "status": "success",
        "data": {
            "sales": {
                "total_billed": sales_data.get("total_billed", 0),
                "total_gst_collected": sales_data.get("total_gst_collected", 0),
                "count": sales_data.get("invoice_count", 0)
            },
            "purchases": {
                "total_purchases": purchases_data.get("total_purchases", 0),
                "total_gst_paid": purchases_data.get("total_gst_paid", 0),
                "count": purchases_data.get("expense_count", 0)
            }
        }
    }
