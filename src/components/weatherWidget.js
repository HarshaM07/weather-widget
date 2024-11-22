import React, { useState, useEffect } from "react";
import "./weatherwidget.css";  

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  // Simulated function to fetch weather data
  const fetchWeatherData = () => {
    return new Promise((resolve, reject) => {
      const conditions = ["Sunny", "Cloudy", "Rainy"];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      const temperature = Math.floor(Math.random() * 30) + 15;

      setTimeout(() => {
        // Simulate success 95% of the time, 5% for failure
        if (Math.random() > 0.05) {
          resolve({ condition, temperature });
        } else {
          reject("Failed to fetch weather data");
        }
      }, 1000); // Simulate network delay
    });
  };

  // Fetch weather data when the component mounts
  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);  
      try {
        const data = await fetchWeatherData();
        setWeather(data);  
      } catch (err) {
        setError(err);  
      } finally {
        setLoading(false);  
      }
    };

    getWeather();  
  }, []);

  // Get corresponding icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return "☀";
      case "Cloudy":
        return "☁";
      case "Rainy":
        return "🌧";
      default:
        return "❓"; // Default icon for unknown conditions
    }
  };

  // Render the weather widget
  return (
    <div className="weather-widget">
      <h3>Current Weather</h3>
      {loading && <div>Loading weather data...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {weather && !loading && !error && (
        <div>
          <div>
            {getWeatherIcon(weather.condition)} {weather.condition}
          </div>
          <div>Temperature: {weather.temperature}°C</div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;