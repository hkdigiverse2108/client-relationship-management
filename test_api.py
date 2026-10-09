import urllib.request
import json
try:
    response = urllib.request.urlopen('http://localhost:8000/api/v1/dashboard/workload-distribution?time_filter=monthly')
    data = json.loads(response.read())
    print("SUCCESS!")
    print("Users length:", len(data.get('users', [])))
    print("Users:", data.get('users'))
    print("Deals:", data.get('deals'))
except Exception as e:
    print("ERROR:", e)
