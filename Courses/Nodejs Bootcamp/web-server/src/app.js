//! Express is a function and we invoke it
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();

//! Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views');
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
        name:'Jeremy Z.'
    });
})
//* Route for About
app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About Page',
        name:'Jeremy Z.'
    })
});
//* Route for Help
app.get('/help', (req, res) => {
    res.render('help', {
        message:'This is the help page',
        title:'Help',
        name:'Jeremy Z.'
    })
});

//* Route for Weather forecast
app.get('/weather', (req,res) => {
    res.send({
        location:'',
        sumary:'',
        rainChance:''
    });
})

//* 404 Route for help
app.get('/help/*', (req, res) => {
        res.render('404',{
            errorMessage:'Help Article not found!'
        })
});

//* Route for 404
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage:'404 Page not found'
    })
});


//! Server config
//* Now we need to start a server up, we listen for a port
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});



