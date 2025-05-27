import {
  Grid,
  CircularProgress,
  Typography,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { countriesApi } from "../../api/services/countries";
import { Country } from "../../types/country";
import { CountryCard } from "./CountryCard";
import SearchIcon from "@mui/icons-material/Search";

export const CountriesList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    countriesApi
      .getAllCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [search, countries]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <TextField
          label="Search countries"
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              height: 40,
              fontSize: "0.9rem",
            },
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
