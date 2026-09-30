import asyncio
from pymongo import MongoClient
from datetime import datetime

client = MongoClient('mongodb://localhost:27017/')
db = client['crm_db']

now = datetime.now()
current_year_start = f'{now.year}-01-01'
today_str = now.strftime('%Y-%m-%d')

# Revenue
pipeline_rev = [
    {'$match': {'is_deleted': {'$ne': True}, 'status': {'$in': ['Completed', 'Partial']}, 'payment_date': {'$gte': current_year_start}}},
    {'$group': {'_id': None, 'total': {'$sum': '$amount_received'}}}
]
rev_res = list(db.payments.aggregate(pipeline_rev))
print('Total Revenue:', rev_res[0]['total'] if rev_res else 0)

# Pending
pipeline_pending = [
    {'$match': {'is_deleted': {'$ne': True}, 'status': {'$in': ['Sent', 'Partially Paid', 'Draft']}, 'due_date': {'$gte': today_str}}},
    {'$group': {'_id': None, 'total': {'$sum': '$total_due'}}}
]
pending_res = list(db.invoices.aggregate(pipeline_pending))
print('Pending Receivables:', pending_res[0]['total'] if pending_res else 0)

# Overdue
pipeline_overdue = [
    {'$match': {'is_deleted': {'$ne': True}, 'status': {'$in': ['Sent', 'Partially Paid', 'Draft', 'Overdue']}, 'due_date': {'$lt': today_str}}},
    {'$group': {'_id': None, 'total': {'$sum': '$total_due'}}}
]
overdue_res = list(db.invoices.aggregate(pipeline_overdue))
print('Overdue Invoices:', overdue_res[0]['total'] if overdue_res else 0)

# Expenses
pipeline_exp = [
    {'$match': {'is_deleted': {'$ne': True}, 'expense_date': {'$gte': current_year_start}}},
    {'$group': {'_id': None, 'total': {'$sum': '$amount'}}}
]
exp_res = list(db.expenses.aggregate(pipeline_exp))
print('Total Expenses:', exp_res[0]['total'] if exp_res else 0)
