import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData, Table, insert
from datetime import datetime

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create SQLAlchemy engine and metadata
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)

# Reference to the "comparison" table
comparison_table = metadata.tables["comparisons"]

# Load and combine all CSVs
dataframes = []
for filename in os.listdir("./outputs/"):
    if filename.endswith(".csv"):
        # Extract scenario name from filename: e.g., `1234_hiring_decision.csv` → "hiring_decision"
        base = os.path.splitext(filename)[0]
        scenario = base.rsplit("_", 1)[-1]  # everything after first underscore

        df = pd.read_csv(os.path.join("./outputs/", filename))
        df["scenario"] = scenario
        dataframes.append(df)

# Combine all rows
full_df = pd.concat(dataframes, ignore_index=True)

# Add timestamp
full_df["created_at"] = datetime.utcnow()

# Insert into database
with engine.begin() as conn:
    conn.execute(insert(comparison_table), full_df.to_dict(orient="records"))
