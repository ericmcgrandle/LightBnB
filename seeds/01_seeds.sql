INSERT INTO users (name, email, password) VALUES
('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jackson Rose', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Victoria Blackwell', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jason Vincent', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jackson David', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Cherlie Evy', 'charlielevy@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Makay Laweiss', 'makaylaweiss@icloud.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties 
(owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, 
country, street, city, province, post_code, active)
VALUES
(1, 'Compass House', 'description', 'url', 'url', 1000, 5, 7, 7, 'Canada', 'Knight St', 'Vancouver', 'BC', 'V5E2H8', Yes),
(1, 'Bear Palace', 'description', 'url', 'url', 800, 3, 5, 3, 'Canada', 'Barret Ave', 'Calgary', 'AB', 'a6g3h6', Yes),
(4, 'Residence', 'description', 'url', 'url', 700, 2, 4, 2, 'Canada', 'Grave St', 'Toronto', 'ON', 'b9k2g5', No),
(6, 'Downtown Place', 'description', 'url', 'url', 1200, 5, 7, 5, 'Canada', 'Burrard St', 'Vancouver', 'BC', 'V1e6H8', No);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
(2019-05-04, 2019-12-04, 1, 3),
(2018-10-03, 2018-20-03, 3, 2),
(2018-21-03, 2018-30-03, 3, 5),
(2020-01-01, 2020-10-01, 4, 6);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(3, 1, 1, 4, 'message'),
(2, 3, 2, 3, 'message'),
(5, 3, 3, 5, 'message'),
(6, 4, 4, 5, 'message');


