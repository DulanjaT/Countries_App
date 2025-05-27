import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Typography,
  Switch,
} from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useThemeMode } from "./theme/ThemeProvider";

import { Login } from "./components/Auth/Login";

import { CountriesList } from "./components/Countries/CountriesList";
import { CountryDetail } from "./components/Countries/CountryDetail";
import { FavoritesPage } from "./components/Favorites/FavoritesPage";

// -------------------- Theme Toggle --------------------
const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2">{mode === "dark" ? "Dark" : "Light"} Mode</Typography>
      <Switch checked={mode === "dark"} onChange={toggleMode} />
    </Box>
  );
};

// -------------------- Protected Route --------------------
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};

// -------------------- Logout Button --------------------
const LogoutButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

// -------------------- Home Page --------------------
const HomePage = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3,
      mt: 4,
    }}
  >
    <Typography variant="h3" gutterBottom>
      Welcome to Countries App 🌍
    </Typography>
    <Typography variant="h6" color="text.secondary">
      Your personal travel and country explorer.
    </Typography>
    <Typography sx={{ mt: 2, maxWidth: 600, mx: "auto" }}>
      Browse countries, check capital city weather, and favorite your dream
      destinations. OctaveFlow helps you plan your next adventure — all in one place.
    </Typography>
  </Box>
);

// -------------------- App Content --------------------
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        background: theme.palette.mode === "light"
          ? "linear-gradient(to bottom right, #fce4ec, #e3f2fd)"
          : "linear-gradient(to bottom right, #121212, #2c2c2c)",
        color: theme.palette.text.primary,
        px: 3,
        py: 2,
      })}
    >
      {user && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Button component={RouterLink} to="/" variant="outlined">Home</Button>
            <Button component={RouterLink} to="/countries" variant="outlined">Countries</Button>
            <Button component={RouterLink} to="/favorites" variant="outlined">Favorites</Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ThemeToggle />
            <LogoutButton />
          </Box>
        </Box>
      )}

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/countries" element={<ProtectedRoute><CountriesList /></ProtectedRoute>} />
        <Route path="/countries/:name" element={<ProtectedRoute><CountryDetail /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Box>
  );
};

// -------------------- Root App --------------------
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
