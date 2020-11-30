import React from "react";
import { AppBar, Toolbar, Button, TextField } from "@material-ui/core";
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
    <AppBar position="static" className={classes.nav}>
      <Toolbar>
        <Button>Logo</Button>
        <TextField label="Search" variant="outlined" className={classes.grow} />
        <Button>Sign Up</Button>
        <Button>Login</Button>
        <Button>Cart</Button>
        <Button>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
