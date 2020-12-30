import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container } from "@material-ui/core";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
