const Sequelize = require('sequelize')

//! Create a schema in the sequelize instance which was exported as a global
module.exports = sequelize.define('User', {
    // First way of defining a column is with an object
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
})