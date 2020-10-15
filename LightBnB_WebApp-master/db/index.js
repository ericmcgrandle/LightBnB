const { Pool }  = require('pg');

const pool = new Pool({
  user: 'vagrant',
  database: 'lightbnb',
  host: 'localhost',
  password: '123'
});

pool.connect(() => {
  console.log('Connected to DB');
});


module.exports = pool;