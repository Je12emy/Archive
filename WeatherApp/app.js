// Get user longitude and latitude
window.addEventListener('load', () => {
    let long, lat
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    // Learn to select this with child nodes
    let temperatureSpan = document.querySelector('.degree-section span')
    // if this is supported in the browser or enabled in the browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            // API from DarkSky: https://darksky.net/dev
            // Since we cant use this api from local host we will use a 'proxy': https://cors-anywhere.herokuapp.com/
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/02cd7b5d24e3a37b58281875116d6b66/${lat},${long}`
            // Get the information and after we get it back
            fetch(api)
                .then(response => {
                    // Convert response data into JSON
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    // Object destructuring
                    const { temperature, summary, icon } = data.currently
                    const { timezone } = data
                    const daily = data.daily.data
                    console.log(daily)

                    // Set DOM elements from the API
                    temperatureDegree.textContent = temperature
                    temperatureDescription.textContent = summary
                    locationTimezone.textContent = timezone.replace(/_/g, " ")

                    // Formula for Cª
                    //let celsius = (temperature - 32) * (5 / 9)

                    // Set icons passing the icon type and icon ID
                    setIcons(icon, document.querySelector('.icon'))

                    let time = []
                    let temperatureDaily = []

                    ChangeMeasurement(temperature, daily, time, temperatureDaily)
                    // Transform Fº to Cº
                    temperatureSection.addEventListener('click', () => {
                        ChangeMeasurement(temperature, daily, time, temperatureDaily)
                    })
                })
        })
    }

    // Icons taken from: https://darkskyapp.github.io/skycons/
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" })
        // This replaces every - with a _ in order to acess the icon inside the script
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        // Start animations
        skycons.play()
        // Set icons giving the ID and the Icon itself
        return skycons.set(iconID, Skycons[currentIcon])
    }
    function ChangeMeasurement(temperature, daily, time, temperatureDaily) {
        if (temperatureSpan.textContent === 'Fº') {
            temperatureSpan.textContent = 'Cº'
            temperatureDegree.textContent = Math.round((parseFloat(temperature - 32) * (5 / 9)) * 100) / 100
            SetData(daily, time, temperatureDaily, true)
        } else {
            temperatureSpan.textContent = 'Fº'
            temperatureDegree.textContent = temperature
            SetData(daily, time, temperatureDaily)
        }
    }

    function SetData(daily, time, temperatureDaily, useCelsius = false) {
       time = []
       temperatureDaily = []
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        if (useCelsius) {
            let fahrenheit;
            for (let i = 0; i < daily.length; i++) {
                let element = daily[i];
                let timeofDay = new Date(parseFloat(daily[i].time * 1000))
                time.push(`${daysOfWeek[timeofDay.getDay()]} ${timeofDay.getDate()}`)
                fahrenheit = ((parseFloat(daily[i].temperatureHigh) + parseFloat(daily[i].temperatureLow)) / 2)
                temperatureDaily.push(Math.round((parseFloat(fahrenheit - 32) * (5 / 9)) * 100) / 100)
            }
        } else {
            for (let i = 0; i < daily.length; i++) {
                // Push the values into the arrays
                let timeofDay = new Date(parseFloat(daily[i].time * 1000))
                time.push(`${daysOfWeek[timeofDay.getDay()]} ${timeofDay.getDate()}`)
                temperatureDaily.push(((parseFloat(daily[i].temperatureHigh) + parseFloat(daily[i].temperatureLow)) / 2))
            }
        }
        CreateChart(time, temperatureDaily)
    }

    function CreateChart(time, temperature) {
        var ctx = document.getElementById('myChart');
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'Average Temperature Expected',
                    data: temperature,
                    borderColor: ['rgba(255, 255, 255, 255)'],
                    borderWidth: 3,
                    lineTension: 0.4,
                    fill: false,
                    spanGaps: false,
                    pointBackgroundColor: 'rgba(255, 255, 255, 255)',
                    pointRadius: 5,
                    borderCapStyle: 'butt',
                    borderJoinStyle: 'miter',
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(255, 255, 255, 255)",
                    pointHoverBorderColor: "rgb(255, 255, 255, 255)"
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Predicted temperature over the next week',
                    fontSize: 32,
                    fontColor: 'rgba(255, 255, 255, 255)',
                    fontFamily: "sans-serif",
                    padding: 30
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontFamily: "sans-serif",
                            fontSize: 14,
                            fontColor: 'rgba(255, 255, 255, 255)',
                            padding: 10

                        },
                        gridLines: {
                            color: 'rgba(255, 255, 255, 255)',
                            borderWidth: 2,
                            display: true,
                            lineWidth: 0.1
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontColor: 'rgba(255, 255, 255, 255)',
                            padding: 20

                        },
                        gridLines: {
                            color: 'rgba(255, 255, 255, 255)',
                            borderWidth: 2,
                            display: true,
                            lineWidth: 0.1
                        }
                    }],
                    tooltips: {
                        mode: 'index',
                        axis: 'y'
                    }
                }
            }
        });
    }
})