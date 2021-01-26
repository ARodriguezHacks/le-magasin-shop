import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Rating from "../components/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Message from "../components/Message";
import Loader from "../components/Loader";

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

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={9}>
          <Typography>
            <Link to="/">Go Back</Link>
          </Typography>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
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

                  {product.countInStock > 0 && (
                    <TableRow>
                      <TableCell>Qty</TableCell>
                      <TableCell>
                        <FormControl>
                          <InputLabel id="qty">Qty</InputLabel>
                          <Select
                            labelId="qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow variant="footer">
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductScreen;
