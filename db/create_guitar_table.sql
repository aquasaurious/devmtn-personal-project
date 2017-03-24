CREATE TABLE guitars(
    id SERIAL PRIMARY KEY,
    classification VARCHAR(16),
    imgsrc VARCHAR(32),
    model VARCHAR(32),
    qualities VARCHAR(32)[],
    price VARCHAR(8)
);