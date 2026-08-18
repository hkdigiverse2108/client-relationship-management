import requests
import json

def get_token():
    res = requests.post('http://127.0.0.1:8000/api/v1/auth/login', json={'email': 'admin@aiocrm.com', 'password': 'password123'})
    if res.status_code == 200:
        return res.json()['access_token']
    return None

token = get_token()
print("Token:", token)

if token:
    with open('backend/requirements.txt', 'rb') as f:
        files = {'file': ('requirements.txt', f, 'text/plain')}
        res = requests.post('http://127.0.0.1:8000/api/v1/products/upload-image', files=files, headers={'Authorization': f'Bearer {token}'})
    print(res.status_code, res.text)
