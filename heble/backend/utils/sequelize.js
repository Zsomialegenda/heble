const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: console.log,
  }
);

sequelize.authenticate()
.then(() => {
  console.log('Success/Siker:', config.db.name);
})
.catch(err => {
  console.error('Connection failed/Kapcsolat nem sikerült:', err.message);
});


module.exports = sequelize;
