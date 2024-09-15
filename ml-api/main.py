from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from ner_tagging import Predictor, model, tokenizer


app = FastAPI()

# Define request body
class InputData(BaseModel):
    address: str


def run_model(address: str):
    # This is where you will process the address with your ML model, 
    #currently reversed string for testing purposes
    predictor = Predictor(model, tokenizer)
    return predictor.predict(address)

# Route to receive POST request
@app.post("/predict/")
async def predict(data: InputData):
    input_text = data.address
    result = run_model(input_text)
    return {"output": result}

# Run the app (when not using uvicorn separately)
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
