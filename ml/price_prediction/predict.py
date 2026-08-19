from catboost import CatBoostRegressor
import pandas as pd

MODEL_FILE = "ml/price_prediction/models/price_prediction_model.cbm"

model = CatBoostRegressor()
model.load_model(MODEL_FILE)

print("FarmStack Price Prediction")
print("--------------------------")

commodity = input("Enter Commodity: ")
state = input("Enter State: ")
district = input("Enter District: ")
market = input("Enter Market: ")
variety = input("Enter Variety: ")
arrival_date = input("Enter Arrival Date (YYYY-MM-DD): ")

date = pd.to_datetime(arrival_date)

input_data = pd.DataFrame([{
    "State": state,
    "District": district,
    "Market": market,
    "Commodity": commodity,
    "Variety": variety,
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

print("\nPredicted Modal Price:")
print(f"₹{prediction:,.2f} / quintal")
print(f"₹{prediction / 100:,.2f} / kg")