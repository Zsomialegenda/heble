const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DATABASE, 
  process.env.USERNAME, 
  process.env.PASSWORD, 
  {
  host: process.env.HOST,
  dialect: 'mariadb'
  });

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connection established.'))
  .catch(err => console.error('Unable to connect to the database:', err));


module.exports = sequelize;
