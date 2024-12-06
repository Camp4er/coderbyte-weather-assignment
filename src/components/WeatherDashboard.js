import React, { useState } from 'react';

function WeatherDashboard() {
  // Predefined mock data
  const mockWeatherData = {
    'New York': { temperature: '22°C', humidity: '56%', windSpeed: '15 km/h' },
    'Los Angeles': { temperature: '27°C', humidity: '45%', windSpeed: '10 km/h' },
    London: { temperature: '15°C', humidity: '70%', windSpeed: '20 km/h' },
  };

  // State to store user input and current weather data
  const [searchCity, setSearchCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [previousSearches, setPreviousSearches] = useState([]);

  // Search button handler
  const handleSearch = () => {
    const weather = mockWeatherData[searchCity];
    if (weather) {
      setCurrentWeather(weather);
      if (!previousSearches.includes(searchCity)) {
        setPreviousSearches([...previousSearches, searchCity]);
      }
    } else {
      setCurrentWeather('City not found.');
    }
  };

  return (
    <div>
      <input
        type="text"
        id="citySearch"
        placeholder="Search for a city..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button id="searchButton" onClick={handleSearch}>
        Search
      </button>
      <div id="weatherData">
        {currentWeather ? (
          typeof currentWeather === 'string' ? (
            <div>{currentWeather}</div>
          ) : (
            <>
              <div>Temperature: {currentWeather.temperature}</div>
              <div>Humidity: {currentWeather.humidity}</div>
              <div>Wind Speed: {currentWeather.windSpeed}</div>
            </>
          )
        ) : (
          <div>Enter a city to see the weather!</div>
        )}
      </div>
      <div id="previousSearches">
        {previousSearches.map((city, index) => (
          <button key={index} onClick={() => setSearchCity(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherDashboard;
