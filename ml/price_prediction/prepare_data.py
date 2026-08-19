import pandas as pd

input_file = "ml/price_prediction/data/price_2025_clean.parquet"
output_file = "ml/price_prediction/data/price_2025_prepared.parquet"

print("Loading data...")

df = pd.read_parquet(input_file)

# Convert arrival date
df["Arrival_Date"] = pd.to_datetime(df["Arrival_Date"])

# Create date features
df["Year"] = df["Arrival_Date"].dt.year
df["Month"] = df["Arrival_Date"].dt.month
df["Day"] = df["Arrival_Date"].dt.day
df["DayOfWeek"] = df["Arrival_Date"].dt.dayofweek

# Remove original date column
df = df.drop(columns=["Arrival_Date"])

print("Columns:")
print(df.columns.tolist())

df.to_parquet(output_file, index=False)

print("Prepared dataset saved!")