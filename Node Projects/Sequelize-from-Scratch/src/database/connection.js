//! Import Sequelize into our project
const Sequelize = require('sequelize')

//* Create a instance for Sequelize
//? This takes a couple parameters for the constructor:
//? new Sequelize([database name], [username], [password], {options})
//? In the options object we seet
const sequelize = new Sequelize('socialnetwork', 'Jeremy', 'password123',
{
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0
})

module.exports = sequelize

//! Exporting the sequelize as a global variable
global.sequelize = sequelize