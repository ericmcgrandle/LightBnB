SELECT properties.*, reservations.*, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN reservations ON (properties.id = reservations.property_id)
JOIN property_reviews ON (properties.id = property_reviews.property_id)
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
HAVING reservations.end_date < NOW()
ORDER BY reservations.start_date
LIMIT 10;