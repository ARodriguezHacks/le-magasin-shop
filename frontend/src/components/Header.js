import React from "react";
import { Grid, AppBar, Toolbar, Button, TextField } from "@material-ui/core";
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
    <Grid container>
      <Grid container item>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Button>Logo</Button>
            <Button>Sign Up</Button>
            <Button>Cart</Button>
            <Button>Cart</Button>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Header;
