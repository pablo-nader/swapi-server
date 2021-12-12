const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('swapi_clon', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = sequelize;

// TEST Connection
//  try {
//      sequelize.authenticate();
//      console.log('Connection has been established successfully.');
//  } catch (error) {
//      console.error('Unable to connect to the database:', error);
//  }