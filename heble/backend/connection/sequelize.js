const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'mariadb',
    port: process.env.DATABASE_PORT || 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connection established.'))
  .catch(err => console.error('Unable to connect to the database:', err.message));

module.exports = sequelize;
