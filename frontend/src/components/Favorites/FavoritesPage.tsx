import { useEffect, useState } from "react";
import { favoritesApi } from "../../api/services/favorites";
import { CountryFavorite } from "../../types/favorite";
import {
  Box,
  Typography,
  CircularProgress,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Paper,
  Fade,
} from "@mui/material";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await favoritesApi.getFavorites(false);
      setFavorites(data);
    } catch (err) {
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (countryName: string) => {
    try {
      await favoritesApi.removeFavorite(countryName);
      setFavorites((prev) =>
        prev.filter((fav) => fav.country_name !== countryName)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (favorites.length === 0)
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5" color="text.secondary">
          No favorite countries found.
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        🌍 Your Favorite Countries
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {favorites.map((fav) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={fav.id}>
            <Fade in timeout={500}>
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={fav.country_flag}
                  alt={`${fav.country_name} flag`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {fav.country_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Country Code: {fav.country_code}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => handleRemove(fav.country_name)}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
