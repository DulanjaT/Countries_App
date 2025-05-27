import { Box, Switch, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/themeContext";

export const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body2" sx={{ mr: 1 }}>
        {mode === "dark" ? "Dark" : "Light"}
      </Typography>
      <Switch
        checked={mode === "dark"}
        onChange={toggleColorMode}
        color="default"
        inputProps={{ "aria-label": "toggle dark mode" }}
      />
    </Box>
  );
};
