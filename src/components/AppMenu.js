import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useAuth } from "../hooks/useAuth";
import { MODALS, useModals } from "../hooks/useModal";

export default function AppMenu() {
  const navigate = useNavigate();
  const { sessionUser, logout } = useAuth();
  const { showModal } = useModals();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleRegisterClick = () => {
    showModal(MODALS.REG);
  };

  const handleWalletsClick = () => {
    navigate("/wallets");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleWalletsClick}
          >
            Wallets
          </Typography>
          {sessionUser == null ? (
            <>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
              <Button color="inherit" onClick={handleRegisterClick}>
                Regisztráció
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleWalletsClick}>
                Tárcáim
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
