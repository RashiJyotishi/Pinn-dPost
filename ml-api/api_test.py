import requests

data={"address":"Satish Dhawan Hostel, IIT(BHU), Bhelupur, Varanasi, Uttar Pradesh, 221005"}
response=requests.post('http://127.0.0.1:8000/predict/',json=data)
if response.status_code == 200:

    result = response.json()
    print("Output from the API:", result['output'])
else:
    print(f"Request failed with status code {response.status_code}")