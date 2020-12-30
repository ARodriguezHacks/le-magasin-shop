import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "2rem 0",
  },
});

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");

      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid container item>
        <Typography>Latest Products</Typography>
      </Grid>
      {products.map((product) => (
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
          key={product._id}
        >
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeScreen;
