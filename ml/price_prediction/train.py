import pandas as pd
from catboost import CatBoostRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

DATA_FILE = "ml/price_prediction/data/price_2025_prepared.parquet"

print("Loading dataset...")

df = pd.read_parquet(DATA_FILE)

# Convert date
df["Arrival_Date"] = pd.to_datetime(
    df["Year"].astype(str)
    + "-"
    + df["Month"].astype(str)
    + "-"
    + df["Day"].astype(str)
)

# Sort chronologically
df = df.sort_values("Arrival_Date")

# Remove rows with missing target
df = df.dropna(subset=["Modal_Price"])

# Time-based split
split_index = int(len(df) * 0.8)

train_df = df.iloc[:split_index]
test_df = df.iloc[split_index:]

# Features
features = [
    "State",
    "District",
    "Market",
    "Commodity",
    "Variety",
    "Year",
    "Month",
    "Day",
    "DayOfWeek"
]

target = "Modal_Price"

X_train = train_df[features].copy()
y_train = train_df[target]

X_test = test_df[features].copy()
y_test = test_df[target]

# Categorical columns
categorical_features = [
    "State",
    "District",
    "Market",
    "Commodity",
    "Variety"
]
# Make categorical values strings
for column in categorical_features:
    X_train[column] = X_train[column].fillna("Unknown").astype(str)
    X_test[column] = X_test[column].fillna("Unknown").astype(str)

print("Training rows:", len(X_train))
print("Testing rows:", len(X_test))

print("Training CatBoost model...")

model = CatBoostRegressor(
    iterations=500,
    depth=8,
    learning_rate=0.1,
    loss_function="RMSE",
    verbose=50,
    random_seed=42
)

model.fit(
    X_train,
    y_train,
    cat_features=categorical_features
)

print("Model training completed.")

# Prediction
predictions = model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, predictions)
rmse = np.sqrt(mean_squared_error(y_test, predictions))

print("\nMODEL RESULTS")
print("----------------------")
print("MAE:", mae)
print("RMSE:", rmse)

# Save trained model
model.save_model(
    "ml/price_prediction/models/price_prediction_model.cbm"
)

print("\nModel saved successfully!")