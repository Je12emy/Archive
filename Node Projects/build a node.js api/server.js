//! Require statements
const express       = require('express')
const MongoClient   = require('mongodb').MongoClient
const bodyParser    = require('body-parser')
//? Path into the object with the connection string
const db            = require('./config/db')

const app           = express()
const PORT          = 8000

//! Set up body parser to interpret the request body
app.use(bodyParser.urlencoded({extended:true})) 
    //* Connect using the connection string and a callback function
    MongoClient.connect(db.url, (err, database) => {
    
    //? This is how we import the routes into our server
    require('./app/routes')(app,database)

    if (err) {
        return console.log('There was an error:' + err); 
    }
    //? Set up the app to listen for request on said Ports
    app.listen(PORT, () => {
        console.log('Server is live on port:' + PORT);  
        }
    );
})
