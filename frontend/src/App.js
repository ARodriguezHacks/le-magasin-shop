import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid container justify="center">
      <Header />
      <HomeScreen />
      <Footer />
    </Grid>
  );
};

export default App;
