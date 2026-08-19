from catboost import CatBoostRegressor

model = CatBoostRegressor()

model.load_model(
    "ml/price_prediction/models/price_prediction_model.cbm"
)

print("Model loaded successfully!")