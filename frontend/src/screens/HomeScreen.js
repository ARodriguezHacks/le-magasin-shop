import React from "react";
import products from "../products";
import Product from "../components/Product";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
});

const HomeScreen = () => {
  const classes = useStyles();
  return (
    // <main className={classes.root}>
    //   <h1>Latest Products</h1>
    <Grid container justify="center">
      {products.map((product) => (
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          key={product._id}
          justify="center"
        >
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
    // </main>
  );
};

export default HomeScreen;
