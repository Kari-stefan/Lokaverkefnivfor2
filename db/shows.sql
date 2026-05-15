DROP TABLE IF EXISTS shows CASCADE;

CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INTEGER CHECK (year > 1950),
    genre VARCHAR(64),
    seasons INTEGER,
    image_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shows (title, year, genre, seasons, image_url, description) VALUES
('Breaking Bad', 2008, 'Drama', 5, '/images/breakingbad.jpg', 'Efnafræði kennari missir vitið og byrjar að selja meth'),
('Game of Thrones', 2011, 'Fantasy', 8, '/images/GOT.jpg', 'Dreka þættir og eitthvað þannig'),
('The Wire', 2002, 'Crime', 5, '/images/thewire.jpg', 'Dópsölu þættir'),
('Stranger Things', 2016, 'Sci-Fi', 4, '/images/stranger-things.jpg', 'Krakki týnist og kemur einhver random stelpa og hun er með krafta'),
('True detective', 2014, 'Crime', 3, '/images/True-Detective.jpg', 'Geggjaðir þættir um lögregluvinnu en djöfulli þunglindir');

SELECT * FROM shows;
DELETE FROM shows *;
