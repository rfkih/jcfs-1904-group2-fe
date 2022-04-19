import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShopingCart, ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/logo.png";

import useStyles from "./styles";

function Navbar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position="fixed" className={classes.AppBar} color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <img
            src={logo}
            alt="pharmacy"
            height="25px"
            className={classes.image}
          />
          Pharmacy
        </Typography>
        <div className={classes.grow} />
        {location.pathname === "/" && (
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cat items"
              color="inherit"
            >
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
