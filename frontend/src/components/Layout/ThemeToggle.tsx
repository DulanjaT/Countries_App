import { Box, Switch, Typography } from "@mui/material";
import { useThemeMode } from "../../theme/themeContext"; 


export const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body2" sx={{ mr: 1 }}>
        {mode === "dark" ? "Dark" : "Light"}
      </Typography>
      <Switch
        checked={mode === "dark"}
        onChange={toggleMode}
        color="default"
        inputProps={{ "aria-label": "toggle dark mode" }}
      />
    </Box>
  );
};
