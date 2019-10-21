const noteRoutes = require('./note_routes')

//? Index.js is our master file which takes all the individual routes
module.exports = function(app,db) {
    noteRoutes(app,db)
};