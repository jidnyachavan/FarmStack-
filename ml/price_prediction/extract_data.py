import pyarrow.parquet as pq
import pyarrow as pa
import pyarrow.parquet as parquet

input_file = "ml/price_prediction/data/parquet/2025.parquet"
output_file = "ml/price_prediction/data/price_2025.parquet"

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

parquet.write_table(
    table,
    output_file
)

print("Done!")
print("Saved:", output_file)
print("Rows:", table.num_rows)