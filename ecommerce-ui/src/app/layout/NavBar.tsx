import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";

const midLinks = [
  { title: "Catalogue", path: "/products" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

type NavBarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
  const { data: user } = useUserInfoQuery();

  const { isLoading } = useAppSelector((state) => state.ui);

  const { data: basketData } = useFetchBasketQuery();

  const basketCount =
    basketData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography sx={navStyles} component={NavLink} to="/" variant="h6">
              E-Commerce
            </Typography>
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
            </IconButton>
          </Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          <Box display="flex" alignItems="center">
            <IconButton
              component={Link}
              to="/basket"
              size="large"
              sx={{ color: "inherit" }}
            >
              <Badge badgeContent={basketCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <List sx={{ display: "flex" }}>
                {rightLinks.map(({ title, path }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Toolbar>
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="secondary" />
          </Box>
        )}
      </AppBar>
    </Fragment>
  );
};

export default NavBar;
