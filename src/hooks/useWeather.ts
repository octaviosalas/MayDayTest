import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherDataType, DailyDataType, ForecastItem, Weather } from '../types/wheater';
import handleError from '../utils/handleError';
import { shootErrorToast } from '../utils/toastError';

const useWeather = (city: string) => {

  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [dailyData, setDailyData] = useState<DailyDataType| null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city)  return console.log("#");
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_API_KEY;

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        setWeatherData(response.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        const processedDailyData = getForecastOfNextFiveDays(forecastResponse.data.list);
        setDailyData(processedDailyData);

      } catch (err) {
        setWeatherData(null)
        setDailyData(null)
        handleError(err, setLoading)
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const getForecastOfNextFiveDays = (forecastList: ForecastItem[]) => {
    const dailyData: { [key: string]: { temp_max: number; temp_min: number; weather: Weather[] } } = {};

    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0]; 
      if (!dailyData[date]) {
        dailyData[date] = {
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          weather: item.weather,
        };
      } else {
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
      }
    });

    return dailyData; 
  };

  return { weatherData, dailyData, loading, error };
};

export default useWeather;

