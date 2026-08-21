
import os
import pandas as pd
from catboost import CatBoostRegressor
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from pathlib import Path

# ============================================================
# ENVIRONMENT / OPENAI
# ============================================================

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError(
        "OPENAI_API_KEY is not set. Check your .env file."
    )

client = OpenAI(api_key=api_key)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="FarmStack AI API",
    description="FarmStack agricultural prediction and AI chatbot API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# CATBOOST PRICE PREDICTION MODEL
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_FILE = BASE_DIR / "models" / "price_prediction_model.cbm"

model = CatBoostRegressor()
model.load_model(str(MODEL_FILE))


# ============================================================
# REQUEST MODELS
# ============================================================

class PriceRequest(BaseModel):
    commodity: str
    state: str
    district: str
    market: str
    variety: str
    arrival_date: str


class MarketPriceRequest(BaseModel):
    commodity: str
    state: str
    district: str
    market: str


class ChatRequest(BaseModel):
    message: str


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():
    return {
        "message": "FarmStack AI API is running"
    }


# ============================================================
# PRICE PREDICTION
# ============================================================

@app.post("/predict")
def predict_price(data: PriceRequest):

    date = pd.to_datetime(data.arrival_date)

    input_data = pd.DataFrame([
        {
            "State": data.state,
            "District": data.district,
            "Market": data.market,
            "Commodity": data.commodity,
            "Variety": data.variety,
            "Year": date.year,
            "Month": date.month,
            "Day": date.day,
            "DayOfWeek": date.dayofweek,
        }
    ])

    categorical_features = [
        "State",
        "District",
        "Market",
        "Commodity",
        "Variety",
    ]

    for column in categorical_features:
        input_data[column] = input_data[column].astype(str)

    prediction = model.predict(input_data)[0]

    return {
        "predicted_modal_price": round(float(prediction), 2),
        "unit": "INR/quintal",
        "price_per_kg": round(float(prediction) / 100, 2),
    }


# ============================================================
# REAL MARKET PRICES
# ============================================================

@app.post("/market-prices")
def get_market_prices(data: MarketPriceRequest):

    DATA_FILE = (
        "ml/price_prediction/data/parquet/2025.parquet"
    )

    df = pd.read_parquet(
        DATA_FILE,
        engine="pyarrow",
    )

    filtered = df[
        (
            df["Commodity"]
            .astype(str)
            .str.lower()
            == data.commodity.lower()
        )
        &
        (
            df["State"]
            .astype(str)
            .str.lower()
            == data.state.lower()
        )
        &
        (
            df["District"]
            .astype(str)
            .str.lower()
            == data.district.lower()
        )
        &
        (
            df["Market"]
            .astype(str)
            .str.lower()
            == data.market.lower()
        )
    ].copy()

    if filtered.empty:
        return {
            "found": False,
            "message": (
                "No market price data found for "
                "the selected combination."
            ),
        }

    filtered["Arrival_Date"] = pd.to_datetime(
        filtered["Arrival_Date"],
        errors="coerce",
    )

    filtered = filtered.dropna(
        subset=["Arrival_Date"]
    )

    if filtered.empty:
        return {
            "found": False,
            "message": "No valid arrival-date records found.",
        }

    latest_date = filtered["Arrival_Date"].max()

    latest_data = filtered[
        filtered["Arrival_Date"] == latest_date
    ]

    min_price = latest_data["Min_Price"].min()
    max_price = latest_data["Max_Price"].max()
    modal_price = latest_data["Modal_Price"].mean()

    return {
        "found": True,
        "commodity": data.commodity,
        "state": data.state,
        "district": data.district,
        "market": data.market,
        "arrival_date": latest_date.strftime("%Y-%m-%d"),
        "min_price": round(float(min_price), 2),
        "modal_price": round(float(modal_price), 2),
        "max_price": round(float(max_price), 2),
        "unit": "INR/quintal",
        "price_per_kg": round(
            float(modal_price) / 100,
            2,
        ),
    }


# ============================================================
# FARMSTACK AI CHATBOT
# ============================================================

@app.post("/chat")
def chat(data: ChatRequest):

    user_message = data.message.strip()

    if not user_message:
        return {
            "response": "Please enter a question."
        }

    response = client.responses.create(
        model="gpt-5.6",
        instructions="""
You are FarmStack AI, an agricultural decision-support
assistant.

Your role is to help farmers understand and make decisions
about agriculture.

You can help with:

- crop selection
- crop cultivation
- irrigation
- fertilizers
- pesticides
- crop diseases
- agricultural markets
- market prices
- price prediction
- yield
- farming practices
- profit concepts
- risk concepts
- weather-related farming decisions

Give practical, clear and easy-to-understand answers.

Use simple language suitable for farmers and students.

Do not claim that you have access to real-time weather,
market or government data unless FarmStack has actually
provided that data to you.

Do not invent numerical market prices, yields or weather
conditions.

When information is uncertain, clearly say so.

Keep answers useful and reasonably concise.
""",
        input=user_message,
    )

    return {
        "response": response.output_text
    }