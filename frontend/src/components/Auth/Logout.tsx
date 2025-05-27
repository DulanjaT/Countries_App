import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
