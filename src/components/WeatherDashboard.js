import React, { useState, useEffect, useRef } from "react";
import "./WeatherDashboard.css";

function WeatherDashboard() {
  const mockWeatherData = {
    "New York": { temperature: "22°C", humidity: "56%", windSpeed: "15 km/h" },
    "Los Angeles": { temperature: "27°C", humidity: "45%", windSpeed: "10 km/h" },
    London: { temperature: "15°C", humidity: "70%", windSpeed: "20 km/h" },
  };

  const [searchCity, setSearchCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  // Save recent searches to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Handle search
  const handleSearch = () => {
    const weather = mockWeatherData[searchCity];
    if (weather) {
      setCurrentWeather(weather);

      // Update recent searches
      if (!recentSearches.includes(searchCity)) {
        setRecentSearches((prevSearches) => [searchCity, ...prevSearches].slice(0, 5)); // Keep only the last 5 searches
      }
    } else {
      setCurrentWeather("City not found.");
    }
    setDropdownVisible(false); // Close dropdown after search
  };

  // Handle recent search selection
  const handleSelectSearch = (city) => {
    setSearchCity(city);
    const weather = mockWeatherData[city];
    if (weather) {
      setCurrentWeather(weather);
    }
    setDropdownVisible(false);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("Clicked outside, hiding dropdown...");
        setDropdownVisible(false);
      }
    };
  
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  

  return (
    <div className="weather-dashboard">
      <div className="search-container" ref={dropdownRef}>
        <input
          type="text"
          id="citySearch"
          placeholder="Search for a city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onClick={() => {
            console.log("Input clicked, showing dropdown...");
            setDropdownVisible(true);
          }}// Show dropdown on click
          autoComplete="off" // Disable Google Autofill
        />
        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>

        {dropdownVisible && recentSearches.length > 0 && (
  <>
    {console.log("Rendering dropdown with recent searches:", recentSearches)}
    <ul className="dropdown">
      {recentSearches.map((city, index) => (
        <li key={index} onClick={() => handleSelectSearch(city)}>
          {city}
        </li>
      ))}
    </ul>
  </>
)}

      </div>

      <div id="weatherData">
        {currentWeather ? (
          typeof currentWeather === "string" ? (
            <div>{currentWeather}</div>
          ) : (
            <div className="weather-info">
              <div>Temperature: {currentWeather.temperature}</div>
              <div>Humidity: {currentWeather.humidity}</div>
              <div>Wind Speed: {currentWeather.windSpeed}</div>
            </div>
          )
        ) : (
          <div>Enter a city to see the weather!</div>
        )}
      </div>
    </div>
  );
}

export default WeatherDashboard;
