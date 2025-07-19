CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE drugs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    type TEXT NOT NULL,  -- e.g., tablet, capsule, liquid, etc.
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    source TEXT,         -- optional: source system or format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);