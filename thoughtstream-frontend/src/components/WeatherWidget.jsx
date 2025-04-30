import React from "react";
import "../styles/WeatherWidget.css";

const WeatherWidget = ({ weather }) => {
  const { condition, temperature, location, iconCode } = weather;

  // Function to determine if we have a custom icon class for this condition
  const getWeatherClass = (condition) => {
    if (!condition) return null;
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return "sunny";
    } else if (conditionLower.includes("cloud")) {
      return "cloudy";
    } else if (
      conditionLower.includes("rain") ||
      conditionLower.includes("drizzle")
    ) {
      return "rainy";
    } else if (conditionLower.includes("snow")) {
      return "snowy";
    }
    // Return null if no match (will use OpenWeather icon)
    return null;
  };

  // Get the appropriate CSS class for the weather condition
  const weatherClass = getWeatherClass(condition);

  return (
    <div className="weather-widget">
      <h3 className="weather-location">{location}</h3>
      <div className="weather-main">
        {weatherClass ? (
          // Show our custom icon if we have a matching class
          <div className={`weather-icon ${weatherClass}`} />
        ) : (
          // Fall back to OpenWeather API icon if no matching class
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt="weather icon"
          />
        )}
        <div className="weather-info">
          <p className="temperature">{temperature}°C</p>
          <p className="condition">{condition}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
