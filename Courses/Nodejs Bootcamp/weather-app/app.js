const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const LOCATION = process.argv[2]
if (LOCATION === "" || LOCATION === null ) {
    console.log(`Please provide a location ${LOCATION}`);
}else{
    geocode(LOCATION, (error, {longitude, latitude, location}) => {
        if (error) {
            //? The return statement will exit out the function execution
            return console.log(`Error: ${error}`);
        }
        forecast(longitude, latitude , (error, {summary, temperature, rainchance}) => {
            if (error) {
                return console.log(`Error: ${error}`);
            }
            console.log(`${location} \n${summary} It is currently ${temperature} and there is a ${rainchance}% of raining.`);         
        });
    })
}

