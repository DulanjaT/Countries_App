import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { countriesApi } from "../../api/services/countries";
import { weatherApi } from "../../api/services/weather";
import { Country } from "../../types/country";
import { WeatherData } from "../../types/weather";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { WeatherInfo } from "../Weather/WeatherInfo";
import { favoritesApi } from "../../api/services/favorites";
import { useAuth } from "../../context/AuthContext";

export const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favError, setFavError] = useState("");

  useEffect(() => {
    if (!name) return;
    const fetchData = async () => {
      try {
        const all = await countriesApi.getAllCountries();
        const match = all.find((c) => c.name.common === name);
        if (!match) throw new Error("Country not found");
        setCountry(match);

        const city = match.capital?.[0];
        if (city) {
          const w = await weatherApi.getWeatherByCity(city);
          setWeather(w);
        }

        if (user && match) {
          const favStatus = await favoritesApi.isFavorite(match.name.common);
          setIsFavorite(favStatus);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name, user]);

  const toggleFavorite = async () => {
    if (!country) return;
    try {
      if (isFavorite) {
        await favoritesApi.removeFavorite(country.name.common);
        setIsFavorite(false);
      } else {
        await favoritesApi.addFavorite(country);
        setIsFavorite(true);
      }
    } catch (err: any) {
      setFavError(err.message);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        {error}
      </Typography>
    );
  if (!country) return null;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Button component={Link} to="/countries" sx={{ mb: 3 }}>
        ← Back to Countries
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight={600}>
            {country.name.common}
          </Typography>

          <img
            src={country.flags.png}
            alt={country.flags.alt}
            style={{ width: 160, borderRadius: 8 }}
          />

          <Typography variant="body1">Region: {country.region}</Typography>
          <Typography variant="body1">Capital: {country.capital?.[0]}</Typography>
          <Typography variant="body1">
            Population: {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            Area: {country.area.toLocaleString()} km²
          </Typography>

          {user && (
            <Button
              variant={isFavorite ? "outlined" : "contained"}
              color="primary"
              onClick={toggleFavorite}
              sx={{ mt: 2 }}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          )}
          {favError && <Typography color="error">{favError}</Typography>}
        </Stack>
      </Paper>

      {weather && (
        <Box sx={{ mt: 4 }}>
          <WeatherInfo weather={weather} />
        </Box>
      )}
    </Box>
  );
};
