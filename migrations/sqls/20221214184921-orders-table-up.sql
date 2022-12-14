CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    status VARCHAR(100) DEFAULT 'active' NOT NULL CHECK (status IN ('active', 'completed')),
    FOREIGN KEY (user_id) REFERENCES users(id)
);