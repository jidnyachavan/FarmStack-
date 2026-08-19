import pyarrow.parquet as pq
import pyarrow.parquet as parquet

input_file = "ml/price_prediction/data/price_2025.parquet"
output_file = "ml/price_prediction/data/price_2025_clean.parquet"

columns = [
    "State",
    "District",
    "Market",
    "Commodity",
    "Variety",
    "Arrival_Date",
    "Modal_Price"
]

print("Reading selected columns...")

table = pq.read_table(
    input_file,
    columns=columns
)

print("Removing duplicate rows...")

df = table.to_pandas()

before = len(df)

df = df.drop_duplicates()

after = len(df)

print("Rows before:", before)
print("Rows after:", after)
print("Duplicates removed:", before - after)

clean_table = table.from_pandas(df)

parquet.write_table(
    clean_table,
    output_file
)

print("Clean dataset saved!")