import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Country } from "../../types/country";

interface Props {
  country: Country;
}

export const CountryCard = ({ country }: Props) => {
  return (
    <Link to={`/countries/${encodeURIComponent(country.name.common)}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="150"
          image={country.flags.png}
          alt={country.flags.alt || country.name.common}
        />
        <CardContent>
          <Typography variant="h6">{country.name.common}</Typography>
          <Typography variant="body2">Region: {country.region}</Typography>
          <Typography variant="body2">Capital: {country.capital?.[0]}</Typography>
          <Typography variant="body2">Population: {country.population.toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
