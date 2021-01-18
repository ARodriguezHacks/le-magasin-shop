import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listProducts } from "../actions/productActions";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "2rem 0",
  },
});

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const classes = useStyles();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid container item>
        <Typography>Latest Products</Typography>
      </Grid>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        products.map((product) => (
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
        ))
      )}
    </Grid>
  );
};

export default HomeScreen;
