import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { WeatherDataType } from '../types/wheater';
import { transformToCelcius } from '../utils/transformToCelcius';

interface Props { 
    wheaterData: WeatherDataType | null,
}

const CityWeatherCard = ({wheaterData}: Props) => { 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://openweathermap.org/img/wn/${wheaterData?.weather[0].icon}.png`} 
        />
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
