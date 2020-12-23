import React from "react";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
//import Product from "./components/Product";
//import products from "./products";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    // <div>
    //   {/* <Grid item xs={12}>
    //       <Header />
    //     </Grid> */}
    //   {/* <Grid container justify="center"> */}
    // <Grid container spacing={6} justify="center">
    //   {products.map((product) => (
    //     <Grid
    //       container
    //       item
    //       xs={12}
    //       sm={6}
    //       md={6}
    //       lg={4}
    //       xl={3}
    //       key={product._id}
    //       spacing={2}
    //       justify="center"
    //     >
    //       <Product product={product} />
    //     </Grid>
    //   ))}
    // </Grid>
    //   {/* </Grid> */}
    //   {/* <Grid item xs={12}>
    //       <Footer />
    //     </Grid> */}
    // </div>
    <Grid container justify="center">
      {/* <Header /> */}
      <HomeScreen />
    </Grid>
  );
};

export default App;
