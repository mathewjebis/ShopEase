import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Sign Up", to: "/sign-up" },
  { label: "Login", to: "/login/Guest" },
];

function NavbarMenu() {
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.length);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{ background: "white", color: "#1a1a2e" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            fontSize: "1.3em",
            color: "#1a1a2e",
            textDecoration: "none",
          }}
        >
          ShopEase
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              sx={{ color: "#1a1a2e" }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => navigate("/wishlist")} sx={{ color: "#f59e0b" }}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "#1a1a2e" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.to} component={Link} to={link.to}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default NavbarMenu;