import { ReactNode, useState, useMemo } from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { ThemeContext } from "./themeContext";
import { lightTheme, darkTheme } from "./theme"; // adjust if path differs

// Component that provides theme context and applies MUI theming
const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

// ✅ Re-export to support intuitive usage elsewhere
export { CustomThemeProvider as ThemeProvider };
export { useThemeMode } from "./themeContext";
