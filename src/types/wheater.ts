interface Coordinates {
    lat: number;
    lon: number;
}
  
export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
  
interface MainData {
    feels_like: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}
  
interface Wind {
    speed: number;
    deg: number;
    gust: number;
}
  
interface Clouds {
    all: number;
}
  
interface Sys {
    country: string;
    sunrise: number;
    sunset: number;
    type: number;
    id: number;
}
  
export type WeatherDataType = {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: MainData;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastItem {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    dt_txt: string; 
}
  
interface City {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}
  
export type ForecastDataType = {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: City;
}

interface DailyWeather {
    temp_max: number; 
    temp_min: number; 
    weather: Weather[]; 
}

export type DailyDataType = {
    [date: string]: DailyWeather; 
}  