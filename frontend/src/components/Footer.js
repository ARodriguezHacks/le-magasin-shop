import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#777887",
    justifyContent: "space-around",

    "& *": {
      color: "#fff",
    },
  },
  logo: {
    textAlign: "center",
  },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer
      style={{
        position: "relative",
        bottom: 0,
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar className={classes.footer}>
          <Typography>2021 Angie Rodriguez. All rights reserved</Typography>
          <div className={classes.logo}>
            <Link component={RouterLink} to="/">
              <img
                src="../../images/logo.png"
                alt="Le Magasin Logo"
                width="25%"
              />
            </Link>
            <Typography>
              <Link href="https://icons8.com" target="_blank" rel="noreferrer">
                Above icon by Icons8
              </Link>
            </Typography>
          </div>
          <Link
            href="https://github.com/ARodriguezHacks/mern-videogame-ecommerce"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </Link>
          <Link
            href="https://angierodriguez.dev"
            target="_blank"
            rel="noreferrer"
          >
            <Typography>Website</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
