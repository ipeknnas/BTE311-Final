import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState(''); // İlk başta boş
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('default'); // İlk açılışta default

  const API_KEY = 'BNJGMJ29VY29Y3C45A9RECQEQ';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      setWeatherData(response.data);

      // Hava durumu durumuna göre arka plan belirle
      const condition = response.data.currentConditions.conditions.toLowerCase();
      if (condition.includes('rain')) {
        setBackground('rainy');
      } else if (condition.includes('cloud')) {
        setBackground('partly-cloudy');
      } else if (condition.includes('sun') || condition.includes('clear')) {
        setBackground('sunny');
      } else if (condition.includes('snow')) {
        setBackground('snowy');
      } else {
        setBackground('default');
      }
    } catch (error) {
      console.error('Hava durumu bilgisi alınırken bir hata oluştu:', error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {  // Şehir ismi boş değilse arama yap
      fetchWeather();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && city.trim() !== '') {
      fetchWeather();
    }
  };

  return (
      <div className={`app ${background}`}>
        <div className="container">
          <h1>Hava Durumu Uygulaması</h1>
          <input
              type="text"
              placeholder="Şehir Giriniz"
              value={city}
              onChange={handleCityChange}
              onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Ara</button>
          {weatherData && (
              <div className="weather-info">
                <h2>{weatherData.address}</h2>
                <p>Sıcaklık: {weatherData.currentConditions.temp}°C</p>
                <p>Durum: {weatherData.currentConditions.conditions}</p>
                <p>Rüzgar: {weatherData.currentConditions.windspeed} km/sa</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default App;
