CREATE TABLE acoustics(
    id SERIAL PRIMARY KEY,
    imgsrc CHAR(40),
    model CHAR(40),
    qualities CHAR(20)[],
    price CHAR(10)
);