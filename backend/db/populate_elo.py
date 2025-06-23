import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData, Table, insert
from sqlalchemy.exc import SQLAlchemyError

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Set up SQLAlchemy
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)

# Reference the rankings table
rankings_table = metadata.tables["rankings"]

# Load and combine CSVs
dataframes = []
for filename in os.listdir("./outputs/elo/"):
    if filename.endswith(".csv"):
        base = os.path.splitext(filename)[0]
        df = pd.read_csv(os.path.join("./outputs/elo/", filename))
        dataframes.append(df)

# Combine all CSV data into one DataFrame
df = pd.concat(dataframes, ignore_index=True)

# Ensure columns are correctly named
df.columns = df.columns.str.lower()  # Make sure they're lowercase
df = df.rename(columns={"group": "group",
               "rating": "rating", "scenario": "scenario"})

# Upload to the rankings table
with engine.begin() as conn:
    try:
        conn.execute(insert(rankings_table), df.to_dict(orient="records"))
        print(f"Inserted {len(df)} rows into 'rankings' table.")
    except SQLAlchemyError as e:
        print("Error inserting data:", e)
