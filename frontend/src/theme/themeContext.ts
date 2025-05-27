import { createContext, useContext } from "react";

export interface ThemeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ✅ This is the hook you're trying to import
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};
