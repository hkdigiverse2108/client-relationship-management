import urllib.request, json
try:
    p = json.loads(urllib.request.urlopen('http://localhost:8000/projects').read())
    c = json.loads(urllib.request.urlopen('http://localhost:8000/clients').read())
    print('Projects:')
    for x in p[:3]:
        print(f"  - _id: {x.get('_id')}, title: {x.get('title')}, client_id: {x.get('client_id')}")
    print('Clients:')
    for x in c[:3]:
        print(f"  - _id: {x.get('_id')}, client_name: {x.get('client_name')}, client_id: {x.get('client_id')}")
except Exception as e:
    print(e)
