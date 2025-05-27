import { Box, Typography } from "@mui/material";
import { WeatherData } from "../../types/weather";

interface Props {
  weather: WeatherData;
}

export const WeatherInfo = ({ weather }: Props) => {
  const condition = weather.weather[0];
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Current Weather</Typography>
      <img src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={condition.description} />
      <Typography>{condition.description}</Typography>
      <Typography>Temp: {weather.main.temp}°C</Typography>
      <Typography>Feels Like: {weather.main.feels_like}°C</Typography>
      <Typography>Humidity: {weather.main.humidity}%</Typography>
      <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
    </Box>
  );
};
