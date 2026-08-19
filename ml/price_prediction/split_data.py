import pandas as pd

input_file = "ml/price_prediction/data/price_2025_prepared.parquet"

df = pd.read_parquet(input_file)

# Make sure date is available
df["Arrival_Date"] = pd.to_datetime(
    df["Year"].astype(str) + "-" +
    df["Month"].astype(str) + "-" +
    df["Day"].astype(str)
)

# Sort chronologically
df = df.sort_values("Arrival_Date")

# Training: first 80% chronologically
split_index = int(len(df) * 0.8)

train_df = df.iloc[:split_index]
test_df = df.iloc[split_index:]

# Separate features and target
X_train = train_df.drop(columns=["Modal_Price", "Arrival_Date"])
y_train = train_df["Modal_Price"]

X_test = test_df.drop(columns=["Modal_Price", "Arrival_Date"])
y_test = test_df["Modal_Price"]

print("Total rows:", len(df))
print("Training rows:", len(train_df))
print("Testing rows:", len(test_df))

print("\nTraining date range:")
print(train_df["Arrival_Date"].min(), "to", train_df["Arrival_Date"].max())

print("\nTesting date range:")
print(test_df["Arrival_Date"].min(), "to", test_df["Arrival_Date"].max())

print("\nFeatures:")
print(X_train.columns.tolist())