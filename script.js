async  function getLatLon() {
    let location = document.getElementById('location').value;
     await fetch(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${location}&format=json&limit=1`)
        .then(res => res.json())
        .then(json => {
            console.log(json, "jijiii")
            json.forEach(e => {
                document.getElementById('lat').value = e.lat;
                document.getElementById('lon').setAttribute("value", e.lon);
                console.log(e.lat, e.lon);

            });
        });
}

async function getWeather() {
    await getLatLon();
    let location = document.getElementById('location').value;
    let lat = document.getElementById('lat').value;
    let lon = document.getElementById('lon').value;
    // let apikey='97859b8b38f339dc2282abd5944e8b9e';
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=97859b8b38f339dc2282abd5944e8b9e`)
        .then(res => res.json())
        .then(json => {
            document.getElementById('city').textContent = json.name;
            document.getElementById('country').textContent = json.sys.country;
            const temperatureKelvin = json.main.temp;
            const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
            const temperatureDigits = temperatureCelsius;
            console.log(temperatureDigits);
            document.getElementById('celseis').textContent = temperatureDigits;
            document.getElementById('description').textContent = (json.weather[0].main);
            document.getElementById('windspeed').textContent = json.wind.speed;
            document.getElementById('humidity').textContent = json.main.humidity;

            //sunrise and sunset times
            const sunriseTimestamp = json.sys.sunrise;
            const sunsetTimestamp = json.sys.sunset;

            const sunrise = new Date(sunriseTimestamp * 1000);
            const sunset = new Date(sunsetTimestamp * 1000);

            const sunriseFormatted = sunrise.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
            const sunsetFormatted = sunset.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

            console.log(`Sunrise: ${sunriseFormatted}`);
            console.log(`Sunset: ${sunsetFormatted}`);
            document.getElementById('sunrise').textContent = `${sunriseFormatted}`;
            document.getElementById('sunset').textContent = `${sunsetFormatted}`;
            document.getElementById('visibility').textContent = json.visibility / 1000;
            document.getElementById('pressure').textContent = json.main.pressure;
            document.getElementById('pressure').textContent = json.main.pressure;
            console.log(json, 'mohann')
        });
}