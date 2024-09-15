import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const Header: React.FC<{
  setDashboardOpen: (dashboardOpen: boolean) => void;
}> = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {isSmallScreen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => props.setDashboardOpen(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              position: isSmallScreen ? "absolute" : "relative",
              left: isSmallScreen ? "50%" : "0",
              transform: isSmallScreen ? "translateX(-50%)" : "none",
            }}
          >
            MyMeal
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
