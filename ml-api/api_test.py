import requests

data={"address":"User Address Here"}
response=requests.post('http://127.0.0.1:8000/predict/',json=data)
if response.status_code == 200:

    result = response.json()
    print("Output from the API:", result['output'])
else:
    print(f"Request failed with status code {response.status_code}")