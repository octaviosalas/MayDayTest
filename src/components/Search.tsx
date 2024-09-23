import { useState } from 'react';
import { Button, Input } from '@mui/material';
import useWeather from '../hooks/useWeather'; 
import SpinnerComponent from './Spinner';
import CityWeatherCard from './CityWheaterCard';
import ForecastCardData from './ForecastCardData';

const Search = () => {
  const [city, setCity] = useState<string>(""); 
  const [searchCity, setSearchCity] = useState<string>("");
  const { weatherData, dailyData, loading, error } = useWeather(searchCity);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchCity(city); 
  };

  return (
    <div>
      <Input type="text" value={city} onChange={handleInputChange} placeholder="Buscar ciudad"/>
      <Button onClick={handleSearchClick}>Buscar</Button>
  
       {loading && <SpinnerComponent/>}

       {error && <p>Error: {error}</p>}

       {weatherData && (
         <CityWeatherCard wheaterData={weatherData}/>
        )}

        {dailyData && (
           <ForecastCardData dailyData={dailyData}/>
        )}
    </div>
  );
};

export default Search;