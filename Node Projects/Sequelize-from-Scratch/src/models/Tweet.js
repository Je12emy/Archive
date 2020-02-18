const Sequelize = require('sequelize')

//! Create a schema in the sequelize instance which was exported as a global
module.exports = sequelize.define('Tweet', {
    // First way of defining a column is with an object
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // Another way for defining a column
    content: Sequelize.STRING(300)
})