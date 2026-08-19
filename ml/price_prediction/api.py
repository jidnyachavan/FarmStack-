from fastapi import FastAPI
from pydantic import BaseModel
from catboost import CatBoostRegressor
import pandas as pd

app = FastAPI()

MODEL_FILE = "ml/price_prediction/models/price_prediction_model.cbm"

model = CatBoostRegressor()
model.load_model(MODEL_FILE)


class PriceRequest(BaseModel):
    commodity: str
    state: str
    district: str
    market: str
    variety: str
    arrival_date: str


@app.get("/")
def home():
    return {"message": "FarmStack Price Prediction API is running"}


@app.post("/predict")
def predict_price(data: PriceRequest):

    date = pd.to_datetime(data.arrival_date)

    input_data = pd.DataFrame([{
        "State": data.state,
        "District": data.district,
        "Market": data.market,
        "Commodity": data.commodity,
        "Variety": data.variety,
        "Year": date.year,
        "Month": date.month,
        "Day": date.day,
        "DayOfWeek": date.dayofweek
    }])

    categorical_features = [
        "State",
        "District",
        "Market",
        "Commodity",
        "Variety"
    ]

    for column in categorical_features:
        input_data[column] = input_data[column].astype(str)

    prediction = model.predict(input_data)[0]

    return {
        "predicted_modal_price": round(float(prediction), 2),
        "unit": "INR/quintal",
        "price_per_kg": round(float(prediction) / 100, 2)
    }