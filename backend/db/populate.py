import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData, Table, insert
from datetime import datetime

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Set up SQLAlchemy
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)
comparison_table = metadata.tables["comparisons"]

# Load and combine CSVs
dataframes = []
for filename in os.listdir("./outputs/trolley/"):
    if filename.endswith(".csv"):
        base = os.path.splitext(filename)[0]
        scenario = base.rsplit("_", 1)[-1]  # after last underscore
        df = pd.read_csv(os.path.join("./outputs/trolley/", filename))
        df["scenario"] = scenario
        dataframes.append(df)

# Combine
df = pd.concat(dataframes, ignore_index=True)

# Add created_at timestamp
df["created_at"] = datetime.utcnow()

# Create reversed copy with group1 <-> group2
swapped_df = df.rename(columns={
    "group1": "group2",
    "group2": "group1",
    "num_group1": "num_group2",
    "num_group2": "num_group1",
    "preference_group1": "preference_group2",
    "preference_group2": "preference_group1",
})

swapped_df["preference_diff"] = -df["preference_diff"]  # Flip diff
swapped_df["created_at"] = df["created_at"]
swapped_df["scenario"] = df["scenario"]

# Combine both versions
full_df = pd.concat([df, swapped_df], ignore_index=True)

# Insert
with engine.begin() as conn:
    conn.execute(insert(comparison_table), full_df.to_dict(orient="records"))
