function fetchWeather() {
    const apiKey = '7a3ab43e363bd861df687f3e0a672b8c';
    const cityInput = document.querySelector('.city-input').value;

    if (!cityInput) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => { 
            updateWeatherDisplay(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            updateHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function updateWeatherDisplay(data) {
    const temperatureDiv = document.querySelector('.temperature-display');
    const weatherDetailsDiv = document.querySelector('.weather-details');
    const weatherIcon = document.querySelector('.weather-icon');
    const hourlyForecastDiv = document.querySelector('.hourly-forecast');

    weatherDetailsDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    temperatureDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherDetailsDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        temperatureDiv.innerHTML = temperatureHTML;
        weatherDetailsDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        }
}

function updateHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.querySelector('.hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function showWeatherIcon() {
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.style.display = 'block'; 
}
