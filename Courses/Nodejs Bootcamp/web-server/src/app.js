//! Express is a function and we invoke it
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();
//? Import the Geocode and Forecast functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//! Port for heroku deploy and local server
//! This is provided by heroku
const PORT = proccess.env.PORT || 3000

//! Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//! Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//! Setup for handdlebars  engine and views location
//? Set a view engine, which is hbs
app.set('view engine', 'hbs');
//? Point express towards our views dir
//* Set the view engine
app.set('views', viewsPath);
//* Register the partials path for hbs
hbs.registerPartials(partialsPath);

//! Routes
//* Route for Index
app.get('', (req, res) => {
    //? Render a template view
    res.render('index', {
        //! Object with properties for this view
        title: 'Weather App',
        name: 'Jeremy Z.'
    });
})
//* Route for About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Jeremy Z.'
    })
});
//* Route for Help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Jeremy Z.'
    })
});

//* Route for Weather forecast
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a Address search term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location = 'Location not found' } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, { summary, temperature, rainChance }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                address: req.query.address,
                location: location,
                sumary: summary,
                rainChance: rainChance
            });
        })
    })
})

//* API endpoint
app.get('/products', (req, res) => {
    //! If the search param is NOT provided
    if (!req.query.search) {
        //? Respond with JSON and end this function execution
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


//* 404 Route for help
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article not found!'
    })
});

//* Route for 404
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 Page not found'
    })
});


//! Server config
//* Now we need to start a server up, we listen for a port

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});



