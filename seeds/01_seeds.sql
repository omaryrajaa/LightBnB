INSERT INTO users (name,email,password)
 VALUES 
('Eva Stanley', 'evastanley@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'louisameyer@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'dominicparks@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'sueluna@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'rosaliegarza@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rajaa Omary', 'rajaarajaa@yahoo.fr', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description,thumbnail_photo_url,cover_photo_url,cost_per_night,  parking_spaces, number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) 
VALUES 
(6, 'Speed lamp','description','https://www.pexels.com/photo/white-and-brown-house-1974596/', 'https://www.pexels.com/photo/interior-design-of-home-1643383/',1000,3,3,4,'Canada','123 Livery', 'Ottawa', 'Ontario', 'K2S1M4', true),
(6, 'Blank corner','description','https://www.pexels.com/photo/living-room-3797991/', 'https://www.pexels.com/photo/architecture-building-driveway-entrance-259685/',650,2,2,3,'Canada','325 Livery', 'Ottawa', 'Ontario', 'K2S1M5', false),
(1, 'Blank corner','description','https://www.pexels.com/photo/interior-design-1139785/', 'https://www.pexels.com/photo/modern-building-against-sky-323780/',1650,3,3,4,'UAE','1125 Jumeirah', 'Dubai', 'Dubai', '52000', true);

INSERT INTO reservations (start_date,end_date,property_id,guest_id)
VALUES
('2020-09-11', '2020-09-26',1,4),
('2020-11-04', '2020-11-10',2,3),
('2020-09-11', '2020-09-26',1,4),
('2019-11-04', '2019-11-11',2,1),
('2021-08-01', '2021-08-30',3,6);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message)
VALUES
(4,1,1,4,'message1'),
(3,2,2,3,'message2'),
(4,1,3,5,'message3');