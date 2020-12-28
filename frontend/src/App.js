import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container, Grid } from "@material-ui/core";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Grid container justify="center">
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
          </Grid>
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
