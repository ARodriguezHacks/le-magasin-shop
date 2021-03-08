import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Paper,
  MenuItem,
  MenuList,
  Popper,
  Button,
  Grow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../actions/userActions";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,

    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
    },
  },

  nav: {
    backgroundColor: "#fff",
    padding: "1rem",
    "& *": {
      margin: "0 4px",
    },
  },
});

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const anchorRef = useRef(null);
  const adminAnchorRef = useRef(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleAdminToggle = () => {
    setAdminOpen((prevOpen) => !prevOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Grid container justify="center">
        <Grid container item justify="center">
          <AppBar position="static" className={classes.nav}>
            <Toolbar style={{ justifyContent: "center" }}>
              <Link component={RouterLink} to="/">
                <Typography>Logo</Typography>
              </Link>
              <Link component={RouterLink} to="/cart">
                <Typography>Cart</Typography>
              </Link>
              {userInfo ? (
                <>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    {userInfo.name}
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <MenuList autoFocusItem={open} id="menu-list-grow">
                            <MenuItem>
                              <Link component={RouterLink} to="/profile">
                                <Typography>Profile</Typography>
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={logoutHandler}>
                              <Typography>Logout</Typography>
                            </MenuItem>
                          </MenuList>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <Link component={RouterLink} to="/login">
                  <Typography>Log In</Typography>
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <>
                  <Button
                    ref={adminAnchorRef}
                    aria-controls={adminOpen ? "admin-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleAdminToggle}
                  >
                    Admin
                  </Button>
                  <Popper
                    open={adminOpen}
                    anchorEl={adminAnchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <MenuList autoFocusItem={adminOpen} id="admin-menu">
                            <MenuItem>
                              <Link component={RouterLink} to="/admin/userlist">
                                <Typography>Users</Typography>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                component={RouterLink}
                                to="/admin/productlist"
                              >
                                <Typography>Products</Typography>
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                component={RouterLink}
                                to="/admin/orderlist"
                              >
                                <Typography>Orders</Typography>
                              </Link>
                            </MenuItem>
                          </MenuList>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
