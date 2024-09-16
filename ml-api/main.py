from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from ner_tagging import Predictor, model, tokenizer
from location_req import get_loc
import pandas as pd
import numpy as np
import pathlib

PINCODE_DATA_PATH = pathlib.Path(__file__).parent / 'pincode_list.feather'
app = FastAPI()
post_office_data = pd.read_feather(PINCODE_DATA_PATH)
address_heirarchy = ['state', 'city_town', 'landmark', 'street', 'area_locality_name', 'sub_locality', 'society_name', 'flat_apartment_number']


# Define request body
class InputData(BaseModel):
    address: str


def run_model(address: str):
    # This is where you will process the address with your ML model, 
    #currently reversed string for testing purposes
    predictor = Predictor(model, tokenizer)
    return predictor.predict(address)

def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in meters
    R = 6371e3  
    
    # Convert degrees to radians
    phi1 = np.radians(lat1)
    phi2 = np.radians(lat2)
    delta_phi = np.radians(lat2 - lat1)
    delta_lambda = np.radians(lon2 - lon1)

    # Haversine formula
    a = np.sin(delta_phi / 2) ** 2 + np.cos(phi1) * np.cos(phi2) * np.sin(delta_lambda / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

    # Distance in meters
    return R * c

def get_closest_postoffices(coordinates, k=5):
    # Calculate distances for all coordinates
    distances = [haversine(coordinates[0], coordinates[1], lat, lon) for lat, lon in post_office_data.loc[:, ["Latitude", 'Longitude']].to_numpy()]
    
    # Get the indices of the k smallest distances
    k_indices = np.argsort(distances)[:k]
    
    # Return the data of k closest post-offices in dictionary format
    return post_office_data.iloc[k_indices, :].to_dict()

# Route to receive POST request
@app.post("/predict/")
async def predict(data: InputData):
    input_text = data.address
    result = run_model(input_text)

    address_list = []
    for address_part in reversed(address_heirarchy):
        if len(result[address_part]) > 0:
            #print(result[address_part])
            address_list.append(" ".join(l[0] for l in result[address_part]))
    coordinates = get_loc(address_list)
    post_offices = get_closest_postoffices(coordinates)
    return {"output": post_offices}

# Run the app (when not using uvicorn separately)
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
