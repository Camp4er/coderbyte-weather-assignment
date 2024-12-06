import React, { useState } from "react";
import "./WeatherDashboard.css";

function WeatherDashboard() {
  const [searchCity, setSearchCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchedCities, setSearchedCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // New loading state

  const mockWeatherData = {
    "New York": { temperature: "22°C", humidity: "56%", windSpeed: "15 km/h" },
    "Los Angeles": { temperature: "27°C", humidity: "45%", windSpeed: "10 km/h" },
    "London": { temperature: "15°C", humidity: "70%", windSpeed: "20 km/h" },
    "Paris": { temperature: "18°C", humidity: "60%", windSpeed: "12 km/h" },
  };

  const handleSearch = () => {
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    // Simulate a delay (to mimic API call)
    setTimeout(() => {
      const weather = mockWeatherData[searchCity];
      if (weather) {
        setCurrentWeather(weather);
        setSearchedCities((prevCities) => [...prevCities, searchCity]);
      } else {
        setCurrentWeather(null);
        setError("City not found.");
      }

      setSearchCity(""); // Clear the search bar
      setLoading(false);  // End loading
    }, 1000); // Simulate 1 second delay
  };

  const handleCityClick = (city) => {
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    setTimeout(() => {
      const weather = mockWeatherData[city];
      setCurrentWeather(weather);
      setLoading(false); // End loading
    }, 1000); // Simulate 1 second delay
  };

  const handleReset = () => {
    setSearchCity("");
    setCurrentWeather(null);
    setSearchedCities([]);
    setError("");
  };

  return (
    <div className="weather-dashboard">
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset</button>

      {loading && <div className="loading-spinner">Loading...</div>}

      {error && <div className="error-message">{error}</div>}

      {currentWeather ? (
        <div className="weather-info">
          <div>Temperature: {currentWeather.temperature}</div>
          <div>Humidity: {currentWeather.humidity}</div>
          <div>Wind Speed: {currentWeather.windSpeed}</div>
        </div>
      ) : (
        <div>Enter a city to see the weather!</div>
      )}

      <div className="searched-cities">
        {searchedCities.length > 0 && <h3>Previously Searched Cities:</h3>}
        {searchedCities.map((city, index) => (
          <button
            key={index}
            onClick={() => handleCityClick(city)}
            className="city-button"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherDashboard;
