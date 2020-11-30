import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <footer style={{ position: "relative", bottom: 0 }}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" align="center">
                Footer
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
