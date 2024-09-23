import {  useState } from 'react';
import { Button, TextField } from '@mui/material';
import useWeather from '../hooks/useWeather'; 
import SpinnerComponent from './Spinner';
import CityWeatherCard from './CityWheaterCard';
import ForecastCardData from './ForecastCardData';
import { possibleCitys } from '../utils/citys';
import { Autocomplete } from '@mui/material';

const Search = () => {
  
  const [city, setCity] = useState<string>(""); 
  const [searchCity, setSearchCity] = useState<string>("");
  const { weatherData, dailyData, loading, error } = useWeather(searchCity);

  const handleInputChange = (event: any, newValue: string) => {
    console.log(event)
    setCity(newValue);
  };

  const handleSearchClick = () => {
    setSearchCity(city); 
  };

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#fff', zIndex: 1000, padding: '10px'}}>
      
      <Autocomplete freeSolo options={possibleCitys} onInputChange={handleInputChange}
       renderInput={(params) => (
          <TextField {...params} label="Buscar ciudad" variant="outlined" />
        )}

        filterOptions={(options, { inputValue }) =>  options.filter((option) =>  option.toLowerCase().includes(inputValue.toLowerCase()))}
        onChange={(event, newValue) => {setCity(newValue || "")}}
      />

      <Button style={{marginTop: "2px", width:"20%", alignItems:"start"}} onClick={handleSearchClick} variant="contained" disableElevation>Buscar</Button>
  
      {loading && 
         <div style={{display:"flex", alignItems:"center", justifyContent: "center"}}> 
            <SpinnerComponent/> 
          </div> 
      }
   
      <div style={{display:"flex", flexDirection: 'column', alignItems:"center", justifyContent: "center"}}> 
          {weatherData && !loading ? (
             <> 
            <h2>Clima actual en {city}</h2>
            <CityWeatherCard wheaterData={weatherData}/>
            </>
          ) : null}

          {dailyData && !loading ? (
            <> 
              <h2>Prevision de los proximos 5 dias en {city}</h2>
              <ForecastCardData dailyData={dailyData}/>
            </>
          ) : null}
      </div>

    </div>
  );
};

export default Search;