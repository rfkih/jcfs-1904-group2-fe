import React, { useContext } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { CartContext } from "../../helper/Context";
import Logo from "@mui/icons-material/HealingRounded";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/actions";

function Navigation() {
  const dispatch = useDispatch();
  const { setUserId, cart, setCart } = useContext(CartContext);
  const { username, role } = useSelector((state) => {
    return state.auth;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    dispatch(logoutAction());
    setUserId(0);
    setCart([]);
  };

  return (
    <Box>
      <AppBar color="inherit">
        <Toolbar className="navbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
            component="a"
            href="/"
          >
            <Logo fontSize="large" sx={{ mr: 1 }} />
            PHARMACY
          </IconButton>

          <div className="product-navbar">
            <Typography
              sx={{ mr: 3 }}
              component={Link}
              to="/"
              className="product"
              variant="h6"
            >
              {" "}
              Products{" "}
            </Typography>
            <Typography
              component={Link}
              to="/customorders"
              className="product"
              variant="h6"
            >
              {" "}
              Custom Products{" "}
            </Typography>
          </div>

          {username ? (
            <div>
              <Button component={Link} to="/cart">
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCart color="primary" />
                </Badge>
              </Button>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {username}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link to="/edit-profile-picture" className="profile-bar">
                    {" "}
                    Profile Picture{" "}
                  </Link>

                </MenuItem>
                <MenuItem>
                  <Link to="/edit-profile" className="profile-bar">
                    Edit Profile

                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/usertransactions" className="profile-bar">
                    Transaction
                  </Link>
                </MenuItem>
                <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="register-login-navbar">
              <Typography sx={{ mr: 3 }} variant="h6">
                <Link to="/register" className="register">
                  Register
                </Link>
              </Typography>
              <Typography variant="h6">
                <Link to="/login" className="login">
                  Login
                </Link>
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
