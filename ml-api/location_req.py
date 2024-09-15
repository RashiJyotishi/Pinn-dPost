import requests

url = "https://photon.komoot.io/api/"

def get_loc(q : list):
    q.reverse()
    lat = None
    lon = None
    for item in q:
        params = {
            'q': item,  
            'lat': lat,  
            'lon': lon
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            try :
                lat = data['features'][0]["geometry"]["coordinates"][1]
                lon = data['features'][0]["geometry"]["coordinates"][0]
            except:
                pass
        else:
            return f"Error: {response.status_code}"
        
    return lat, lon
    
if __name__ == "__main__" :

    print(get_loc(["Satish Dhawan Hostel", "IIT BHU", "Near Hyderabad Gate", "Varanasi"]))
