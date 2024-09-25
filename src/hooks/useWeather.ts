import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { WeatherDataType, DailyDataType, ForecastItem, Weather } from '../types/wheater';
import handleError from '../utils/handleError';

const useWeather = (city: string) => {

  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
  const [dailyData, setDailyData] = useState<DailyDataType| null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  

  const fetchWeatherData = useMemo(() => {
    return async () => {
      if (!city) return;

      setLoading(true);
      setError(false);

      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const dailyResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        const processedDailyData = getForecastOfNextFiveDays(dailyResponse.data.list);
        setWeatherData(weatherResponse.data);
        setDailyData(processedDailyData);
        setError(false)
      } catch (err) {
        console.log(err)
        handleError(err, setLoading);
        setError(true)
      } finally {
        setLoading(false);
      }
    };
  }, [city]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

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

  const resetData = () => {
    setWeatherData(null);
    setDailyData(null);
    setError(false)
  };

  return { weatherData, dailyData, loading, error, resetData  };
};

export default useWeather;





  
