const properties = require('./json/properties.json');
const users = require('./json/users.json');
const pool = require('../db/index.js');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users WHERE users.email = $1;
  `, [email])
  .then (res => res.rows[0])
  .catch(err => console.log('err', err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users WHERE users.id = $1;
  `, [id])
  .then (res => res.rows[0])
  .catch(err => console.log('err', err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows)
  .catch(err => console.log('error', err));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
    SELECT properties.*, reservations.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN reservations ON (properties.id = reservations.property_id)
    JOIN property_reviews ON (properties.id = property_reviews.property_id)
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    HAVING reservations.end_date < NOW()
    ORDER BY reservations.start_date
    LIMIT $2;
    `, [guest_id, limit])
    .then(res => res.rows)
    .catch(err => console.log('err', err));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 5) {
  const queryParams = [];
  let needAnd = false;

  let queryString = 
    `SELECT properties.*, AVG(property_reviews.rating) as average_rating 
    FROM properties
    JOIN property_reviews ON (properties.id = property_id) `;

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += `WHERE owner_id = $${queryParams.length} `;
    needAnd = true;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    if(needAnd){
      queryString += `AND city LIKE $${queryParams.length} `;
    } else {
      queryString += `WHERE city LIKE $${queryParams.length} `;
      needAnd = true;
    }
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {

    if(needAnd) {
      queryParams.push(100 * (options.minimum_price_per_night));
      queryString += `AND cost_per_night >= $${queryParams.length} `;
      queryParams.push(100 * (options.maximum_price_per_night));
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryParams.push(100 * (options.minimum_price_per_night));
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
      queryParams.push(100 * (options.maximum_price_per_night));
      queryString += `AND cost_per_night <= $${queryParams.length} `;
      needAnd = true;
    }
  } else if (options.minimum_price_per_night) {
    queryParams.push(100 * (options.minimum_price_per_night));
    if(needAnd) {
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
      console.log('HERE', queryParams);
      needAnd = true;
    }
  } else if (options.maximum_price_per_night) {
    queryParams.push(100 * (options.maximum_price_per_night));
    if(needAnd) {
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
    }
  }

  queryString += `GROUP BY properties.id `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `; 
     
  return pool.query(queryString, queryParams)
   .then(res => res.rows);
  
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(p) {
  //property -> p
  return pool.query(`
  INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING *;`, 
  [p.title, p.description, p.owner_id, p.cover_photo_url, p.thumbnail_photo_url, p.cost_per_night, p.parking_spaces, p.number_of_bathrooms, p.number_of_bedrooms, true, p.province, p.city, p.country, p.street, p.post_code])
  .then(res => res.rows)
  .catch(err => console.log('err', err));

  
}
exports.addProperty = addProperty;
