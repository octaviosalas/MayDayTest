import {  useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import useWeather from '../hooks/useWeather'; 
import SpinnerComponent from './Spinner';
import CityWeatherCard from './CityWheaterCard';
import ForecastCardData from './ForecastCardData';
import { possibleCitys } from '../utils/citys';
import { Autocomplete } from '@mui/material';
import { ToggleButton } from './ToggleBtn';
import { useThemeToggle } from '../store/themeContext';

const Search = () => {
  
  const [city, setCity] = useState<string>(""); 
  const [searchCity, setSearchCity] = useState<string>("");
  const { weatherData, dailyData, loading, resetData, error} = useWeather(searchCity);
  const { mode } = useThemeToggle();

  const handleInputChange = (_: any, newValue: string) => {
    setCity(newValue);
  };

  const handleSearchClick = () => {
    setSearchCity(city); 
  };

  const handleResetClick = () => {
    setCity("");
    setSearchCity("");
    resetData();
  };

  return (
    <Box 
      sx={{
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      backgroundColor: mode === 'dark' ? '#1e1e1e' : '#fff', 
      zIndex: 1000, 
      padding: '10px',
      color: mode === 'dark' ? '#fff' : '#000',
    }}
  >
      <ToggleButton/>
      <Autocomplete
        freeSolo={!weatherData} 
        options={possibleCitys}
        value={city}
        onInputChange={handleInputChange}  
        renderInput={(params) => (
          <TextField {...params} variant="outlined"  disabled={!!weatherData}/>
        )}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
      />

      {!weatherData && !error ? 

        <Button style={{marginTop: "2px", width:"20%", alignItems:"start"}} onClick={handleSearchClick} variant="contained" disableElevation>Buscar</Button> : error ? ( 

        <Button style={{marginTop: "2px", width:"20%", alignItems:"start"}} onClick={handleResetClick} variant="contained" disableElevation>Resetear</Button>

         ) : weatherData && !error ? ( 

        <Button style={{marginTop: "2px", width:"20%", alignItems:"start"}} onClick={handleResetClick} variant="contained" disableElevation>Resetear</Button>
         ) :

        null}

  
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

    </Box>
  );
};

export default Search;
