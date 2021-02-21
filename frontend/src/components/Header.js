import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  return (
    <header>
      <Grid container justify="center">
        <Grid container item justify="center">
          <AppBar position="static" className={classes.nav}>
            <Toolbar style={{ justifyContent: "center" }}>
              <Link component={RouterLink} to="/">
                <Typography>Logo</Typography>
              </Link>
              <Link component={RouterLink} to="/">
                <Typography>Sign Up</Typography>
              </Link>
              <Link component={RouterLink} to="/">
                <Typography>Cart</Typography>
              </Link>
              <Link component={RouterLink} to="/login">
                <Typography>Log In</Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
