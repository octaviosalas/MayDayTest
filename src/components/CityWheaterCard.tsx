import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { WeatherDataType } from '../types/wheater';
import { transformToCelcius } from '../utils/transformToCelcius';
import Avatar from '@mui/material/Avatar';

interface Props { 
    wheaterData: WeatherDataType | null,
}

const CityWeatherCard = ({wheaterData}: Props) => { 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <div style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
           <Avatar alt="Remy Sharp" style={{width: "40%",  height: "40%"}} src={`http://openweathermap.org/img/wn/${wheaterData?.weather[0].icon}.png`} />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {wheaterData?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <p>Temperatura: {transformToCelcius(wheaterData?.main.temp)} °C</p>
                <p>Sensacion Termica: {transformToCelcius(wheaterData?.main.feels_like)} °C</p>
                <p>Estado del Clima: {wheaterData?.weather[0].description}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}

export default CityWeatherCard
