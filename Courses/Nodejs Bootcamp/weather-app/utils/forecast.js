const request = require('request');
const forecast = (long, lat, callback) => {
    //? Concat the GET request
    const url = `https://api.darksky.net/forecast/02cd7b5d24e3a37b58281875116d6b66/${long},${lat}`
    // Request
    request({url, json: true}, (error, {body})=>{
        //? Error handling
        if (error) {
            callback("Unable to connect to the weather API.", undefined);
        }
        else if (body.error) {
            callback("Unable to find location", undefined);
        }
        else{
            //* Normal Flow
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast