psql -U postgres

CREATE DATABASE repertorio;

\c repertorio

CREATE TABLE cancion (
    id SERIAL PRIMARY KEY,
    cancion VARCHAR(50) NOT NULL,
    artista VARCHAR(50) NOT NULL,
    tono VARCHAR(10) NOT NULL
);