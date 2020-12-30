import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Table,
  TableBody,
  Button,
  TableCell,
  TableContainer,
  TableRow,
  TableFooter,
  CardMedia,
  CardContent,
  Typography,
  Paper,
} from "@material-ui/core";
import Rating from "../components/Rating";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    margin: "2rem 0",
  },

  media: {
    height: 310,
  },

  content: {
    textAlign: "center",
  },
});

const ProductScreen = ({ match }) => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/api/products/${match.params.id}`);

      setProduct(res.data);
    };
    fetchProduct();
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={9}>
          <Typography>
            <Link to="/">Go Back</Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root} justify="center">
        <Grid item xs={12} sm={6} md={3}>
          <CardMedia
            className={classes.media}
            image={product.image}
            component="img"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Typography>
            <Typography>{product.description}</Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={10} md={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Price:</TableCell>
                  <TableCell>${product.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow variant="footer">
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Add to Cart
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductScreen;
