//? Get the form from the DOM
const weatherForm = document.querySelector('form')
const inputAddress = document.querySelector('input')

const errorMessage = document.querySelector('#errorMessage')
const forecast = document.querySelector('#forecast')

//? The fetch API is a browser api not accesible to Node, here we provide a URL and with .then we have access to the response
let GetWeather = (address) => {
    
    const URL = `http://localhost:3000/weather?address=${address}`
    fetch(URL)
    .then(response => {
        //? Reads the body and parses it into json: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
        response.json().then(data => {
            if (data.error) {   
                errorMessage.textContent = `Error: ${data.error}`
                inputAddress.value = ''
            }else{
                console.log(data);
                forecast.textContent = `Your location is: ${data.location} and your Forecast is: ${data.sumary} there is a ${data.rainChance}% of rain`
            }
            
        })
    });
}

weatherForm.addEventListener('submit',(e) => {
    //? Prevent the default event of reloading
    e.preventDefault()
    const location = inputAddress.value;
    errorMessage.textContent = ''
    forecast.textContent = ''
    GetWeather(location)
})



