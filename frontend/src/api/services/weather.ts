import { WeatherData } from "../../types/weather";

export const weatherApi = {
  async getWeatherByCity(city: string): Promise<WeatherData> {
    const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    );
    if (!res.ok) throw new Error("Failed to fetch weather");
    return res.json();
  },
};
