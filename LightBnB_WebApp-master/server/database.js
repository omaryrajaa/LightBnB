const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

//connect to bootcampx database
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const sqlQuery = {
    text: `SELECT * 
    FROM users 
    WHERE email = $1;`,
    values: [email]
  };
  return pool
    .query(sqlQuery)
    .then((result) => {
      if (result.rowCount > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((error) => error);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const sqlQuery = {
    text: `SELECT * 
    FROM users 
    WHERE id = $1;`,
    values: [id]
  };
  return pool
    .query(sqlQuery)
    .then((result) => result.rows[0])
    .catch((error) => error);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const sqlQuery = {
    text: `INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *;`,
    values: [user.name, user.password, user.email]
  };
  return pool
    .query(sqlQuery)
    .then((result) => result.rows[0])
    .catch((error) => error);
  /*
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);
  */
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guestIid, limit = 10) {
  const sqlQuery = {
    text: `SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`,
    values: [guestIid, limit]
  };
  return pool
    .query(sqlQuery)
    .then((result) => result.rows)
    .catch((error) => error);

};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  // 3

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {

    queryParams.push(`${options.minimum_price_per_night * 100}`, `${options.maximum_price_per_night * 100}`);

    if (queryParams.length === 2) {
      queryString += `WHERE cost_per_night >= $${queryParams.length - 1} \n  AND cost_per_night <= $${queryParams.length} `;
    } else if (queryParams.length === 3) {
      queryString += `\n  AND cost_per_night >= $${queryParams.length - 1} \n  AND cost_per_night <= $${queryParams.length} `;
    }
  }
  
  if (options.minimum_rating) {

    queryParams.push(`${options.minimum_rating}`);

    if (queryParams.length === 1) {
      queryString += `WHERE rating >= $${queryParams.length} `;
    } else if (queryParams.length > 1) {
      queryString += `\n  AND rating >= $${queryParams.length} `;

    }
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `WHERE owner_id = $${queryParams.length} `;

  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  
  //console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch((error) => error);
};
  

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  const sqlQuery = {
    text: `INSERT INTO properties (owner_id ,title, description,thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,    country, street, city, province, post_code) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,
    values: [property.owner_id,property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night * 100, property.parking_spaces,  property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street,  property.city, property.province, property.post_code]
  };
  
  return pool
    .query(sqlQuery)
    .then((result) => result.rows[0])
    .catch((error) => error);
    
  /*
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
  */
};
exports.addProperty = addProperty;
