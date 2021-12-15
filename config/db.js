const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('swapi_clon', 'root', '', {
//   host: 'localhost',
//   dialect: 'mariadb'
// });

// user: bf8ba3a4e303d4
// password: 32947316
// host: us-cdbr-east-05.cleardb.net
// db: heroku_d3b4ab191c2ac85

const sequelize = new Sequelize('heroku_d3b4ab191c2ac85', 'bf8ba3a4e303d4', '32947316', {
  host: 'us-cdbr-east-05.cleardb.net',
  dialect: 'mysql'
});

module.exports = sequelize;

// TEST Connection
//  try {
//      sequelize.authenticate();
//      console.log('Connection has been established successfully.');
//  } catch (error) {
//      console.error('Unable to connect to the database:', error);
//  }