CREATE TABLE comparisons (
    id SERIAL PRIMARY KEY,
    group1 TEXT,
    group2 TEXT,
    num_group1 INTEGER,
    num_group2 INTEGER,
    preference_group1 REAL,
    preference_group2 REALL,
    preference_diff REAL,
    scenario TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE rankings (
    id SERIAL PRIMARY KEY,
    "group" TEXT ,
    rating REAL ,
    scenario TEXT ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

