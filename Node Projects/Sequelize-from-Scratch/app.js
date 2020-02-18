//! Require express
const express = require('express')
const app = express()

//! DB connection
require('./src/database/connection.js')
require('./src/bootstrap')()

//* Parse incoming requests into JSON
app.use(express.json())
//* Port configuration
const PORT = 3000
//* Listen on PORT and log a message if succesfull
app.listen(PORT, () => {
    console.log(`Express server is up at: http://localhost:${PORT}`);
})