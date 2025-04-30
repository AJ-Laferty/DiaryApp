import React from 'react';
import '../styles/WeatherWidget.css';

const WeatherWidget = ({ weather }) => {
  const { condition, temperature, location } = weather;

  const getWeatherClass = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'sunny';
      case 'cloudy':
        return 'cloudy';
      case 'rainy':
        return 'rainy';
      case 'snowy':
        return 'snowy';
      default:
        return 'cloudy';
    }
  };

  return (
    <div className="weather-widget">
      <h3 className="weather-location">{location}</h3>
      <div className="weather-main">
        <div className={`weather-icon ${getWeatherClass(condition)}`} />
        <div className="weather-info">
          <p className="temperature">{temperature}°C</p>
          <p className="condition">{condition}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
