const Sequelize = require("sequelize");

const conns = new Sequelize('service_db', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

conns.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = conns;