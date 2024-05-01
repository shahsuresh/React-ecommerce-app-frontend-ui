import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";

//?======greeting message function============================
const greetByTime = () => {
  const timeNow = new Date().getHours();

  let greeting;
  if (timeNow < 12) {
    greeting = "Good Morning";
  } else if (timeNow >= 12 && timeNow < 17) {
    greeting = "Good Afternoon";
  } else if (timeNow >= 17 && timeNow < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Evening";
  }

  return greeting;
};
//?======================================================
const drawerWidth = 240;
const navItems = [
  { id: 1, name: "Home", path: "/home" },
  { id: 2, name: "Product", path: "/products" },
  { id: 3, name: "About", path: "/about" },
];

const Header = (props) => {
  //?=====get user role ======
  const userRole = localStorage.getItem("role");

  //?==== get cart item count api hit ============
  const { isPending, data } = useQuery({
    queryKey: ["get-cart-item-count"],
    queryFn: async () => {
      return await $axios.get("/cart/item/count");
    },
    enabled: userRole === "buyer",
  });

  const cartItemCount = data?.data?.cartItemCount;

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Nepal E-Mart
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "red"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            Nepal E-Mart
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
             {userRole === "buyer" && (
              <IconButton
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <Badge badgeContent={cartItemCount} color="success">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
          <Typography
            sx={{
              margin: "0 1rem",
              fontWeight: "bold",
              fontFamily: "cursive",
            }}
          >
            Hi,
            {localStorage.getItem("firstName").toUpperCase() +
              ", " +
              greetByTime()}
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => {
                navigate("/login");

      //?======= clear local storage when user click logout button=========
                localStorage.clear();
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Header;
