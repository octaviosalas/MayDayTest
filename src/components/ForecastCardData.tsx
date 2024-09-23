import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DailyDataType } from "../types/wheater";
import { transformToCelcius } from '../utils/transformToCelcius';

interface Props { 
    dailyData: DailyDataType | null;
}

const ForecastCardData = ({ dailyData }: Props) => {
  if (!dailyData) return null; // Maneja el caso en que no hay datos

  return (
        <Box sx={{ minWidth: 275, display:"flex" }}>
            {Object.entries(dailyData).map(([date, data]) => (
                <Card variant="outlined" key={date} sx={{ mb: 2 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Fecha: {date}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Temp. Max: {transformToCelcius( data.temp_max)} C
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Temp. Min: {transformToCelcius(data.temp_min)} c
                    </Typography>
                    <Typography variant="body2">
                    Estado: {data.weather[0]?.description || 'N/A'}
                    </Typography>
                </CardContent>
                </Card>
            ))}
        </Box>
  );
}

export default ForecastCardData;