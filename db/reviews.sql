CREATE TABLE reviews (
    id SERIAL,
    show_id INT NOT NULL,
    author VARCHAR(100) NOT NULL,
    profile_image VARCHAR(255),
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT pk_reviews PRIMARY KEY (id),
        CONSTRAINT fk_reviews_show FOREIGN KEY (show_id) REFERENCES shows (id) ON DELETE CASCADE,
        CONSTRAINT chk_reviews_rating CHECK (rating BETWEEN 1 AND 10)
);


SELECT * FROM reviews;
DELETE FROM reviews *;