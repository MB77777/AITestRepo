CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO clients (id, name, email)
VALUES
    (1, 'Ada Lovelace', 'ada@example.com'),
    (2, 'Grace Hopper', 'grace@example.com'),
    (3, 'Alan Turing', 'alan@example.com')
ON CONFLICT (id) DO UPDATE
SET
    name = EXCLUDED.name,
    email = EXCLUDED.email;
