import { Box, Paper, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../config/superbase";

export const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Welcome
        </Typography>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]} // Keep Google
          view="sign_in"
          showLinks={true} // 🔑 Show email registration/login links
          redirectTo={`${window.location.origin}`} // optional for OAuth redirect
        />
      </Paper>
    </Box>
  );
};
