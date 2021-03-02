import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

// const useStyles = makeStyles({
//   grow: {
//     flexGrow: 1,

//     "& .MuiOutlinedInput-root": {
//       borderRadius: "25px",
//     },
//   },

//   nav: {
//     backgroundColor: "#fff",
//     padding: "1rem",
//     "& *": {
//       margin: "0 4px",
//     },
//   },
// });

const Footer = () => {
  // const classes = useStyles();
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
        <Toolbar>
          <Typography variant="h5" align="center">
            Footer
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
