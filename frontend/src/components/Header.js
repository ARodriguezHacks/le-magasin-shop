import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";
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
  ClickAwayListener,
} from "@material-ui/core";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import MobileNavigation from "./MobileNavigation";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,

    "& .MuiOutlinedInput-root": {
      borderRadius: "25px",
    },
  },
  logo: {
    fontFamily: "'Redressed', cursive",
  },

  link: {
    display: "flex",
    alignItems: "center",
  },

  nav: {
    backgroundColor: "#fff",
    padding: "0.5rem",
    "& *": {
      margin: "0 4px",
    },
  },
});

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();
  let location = useLocation();

  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

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

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  const adminHandleClose = () => {
    if (adminOpen) {
      setAdminOpen(false);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    setOpen(false);
    if (location.pathname !== "/") {
      history.push("/login");
    }
  };

  useEffect(() => {
    if (matches) {
      setDrawer(true);
    } else {
      setDrawer(false);
    }
    console.log(drawer);
  }, [matches, drawer]);

  return (
    <header>
      <Grid container justify="center">
        <Grid container item justify="center">
          <AppBar position="static" className={classes.nav}>
            <Toolbar style={{ justifyContent: "center" }}>
              {matches ? (
                <MobileNavigation drawer={drawer} />
              ) : (
                <>
                  <Link component={RouterLink} to="/" className={classes.link}>
                    <img src="../../images/logo.png" alt="Le Magasin Logo" />
                    <Typography variant="h5" className={classes.logo}>
                      Le Magasin Shop
                    </Typography>
                  </Link>
                  <Route
                    render={({ history }) => (
                      <SearchBox history={history} width="40%" />
                    )}
                  />
                  {userInfo && (
                    <Link component={RouterLink} to="/cart">
                      <Typography>Cart</Typography>
                    </Link>
                  )}
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
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={open}
                                  id="menu-list-grow"
                                >
                                  <MenuItem onClick={handleClose}>
                                    <Link component={RouterLink} to="/profile">
                                      <Typography>Profile</Typography>
                                    </Link>
                                  </MenuItem>
                                  <MenuItem onClick={logoutHandler}>
                                    <Typography>Logout</Typography>
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
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
                              <ClickAwayListener onClickAway={adminHandleClose}>
                                <MenuList
                                  autoFocusItem={adminOpen}
                                  id="admin-menu"
                                >
                                  <MenuItem onClick={adminHandleClose}>
                                    <Link
                                      component={RouterLink}
                                      to="/admin/userlist"
                                    >
                                      <Typography>Users</Typography>
                                    </Link>
                                  </MenuItem>
                                  <MenuItem onClick={adminHandleClose}>
                                    <Link
                                      component={RouterLink}
                                      to="/admin/productlist"
                                    >
                                      <Typography>Products</Typography>
                                    </Link>
                                  </MenuItem>
                                  <MenuItem onClick={adminHandleClose}>
                                    <Link
                                      component={RouterLink}
                                      to="/admin/orderlist"
                                    >
                                      <Typography>Orders</Typography>
                                    </Link>
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </>
                  )}
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
