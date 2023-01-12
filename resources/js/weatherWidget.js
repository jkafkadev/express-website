
// "borrowed" from MDN's geolocation API example
function geoFindMe() {
    console.log("calling geofindme");
    const status = document.querySelector('#weatherStatus');
    
    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const latitude_input = document.querySelector("#latitude-input");
        const longitude_input = document.querySelector("#longitude-input");

        longitude_input.value = longitude;
        latitude_input.value = latitude;
        console.log(`${latitude}, ${longitude}`);
        status.textContent = "";
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
}

WEATHER_CODES = {
0:  'Clear sky',
1:  'Mainly clear',
2:  'Partly cloudy',
3:  'Overcast',
45: 'Fog',
48: 'Depositing Rime fog',
51: 'Light Drizzle',
53: 'Moderate Drizzle',
55: 'Dense Drizzle',
57: 'Light Freezing Drizzle',
57: 'Dense Freezing Drizzle',
61: 'Slight Rain',
63: 'Moderate Rain',
65: 'Heavy Rain',
66: 'Light Freezing Rain',
67: 'Heavy Freezing Rain',
71: 'Slight Snow fall',
73: 'Moderate Snow fall',
75: 'Heavy Snow fall',
77: 'Snow grains',
80: 'Slight Rain showers',
81: 'Moderate Rain showers',
82: 'Violent Rain showers',
85: 'Slight Snow showers slight and heavy',
86: 'Heavy Snow showers slight and heavy',
95: 'Thunderstorm',
96: 'Thunderstorm with slight hail',
99: 'Thunderstorm with heavy hail',
}

async function getWeather() {
    let latitude = document.getElementById("latitude-input").value
    let longitude = document.getElementById("longitude-input").value
    let weatherUrl = "https://api.open-meteo.com/v1/forecast";
    weatherUrl += "?latitude=" + latitude + "&longitude=" + longitude;
    weatherUrl += "&current_weather=true&temperature_unit=fahrenheit";
    let sunUrl = "https://api.sunrise-sunset.org/json?lat=";
    sunUrl += latitude + "&lng=" + longitude + "&date=today&formatted=0";

    fetch(weatherUrl).then((res) => {
      return res.json();
    }).then((json) => {
      const temp = json.current_weather.temperature;
      const weathercode = json.current_weather.weathercode;
      document.getElementById("temp-display").innerText = "Temperature: " + temp;
      document.getElementById("cloud-cover-display").innerText = WEATHER_CODES[weathercode];
    }).catch(() => {
      document.getElementById("weatherStatus").innerText = "Error";
    });
    fetch(sunUrl).then((res) => {
      return res.json();
    }).then((json) => {
      const sunriseDate = new Date(json.results.sunrise);
      const sunsetDate = new Date(json.results.sunset);
      document.getElementById("sunrise-display").innerText = "Sunrise: " + sunriseDate.toLocaleTimeString();
      document.getElementById("sunset-display").innerText = "Sunset: " + sunsetDate.toLocaleTimeString();
    }).catch(() => {
      document.getElementById("weatherStatus").innerText = "Error";
    });
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.querySelector("#get-weather-btn").addEventListener('click', getWeather);
