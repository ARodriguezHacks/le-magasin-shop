import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
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
  List,
  ListItem,
  ListItemText,
  TextField,
  FormGroup,
} from "@material-ui/core";
import Rating from "../components/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";

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
  const classes = useStyles();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <Grid container>
      <Grid container item spacing={2} justify="center">
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
        <>
          <Meta title={product.name} />
          <Grid container spacing={2} className={classes.root} justify="center">
            <Grid item xs={12} sm={6} md={5}>
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
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
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Reviews</Typography>

              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <List>
                {product.reviews.map((review) => (
                  <ListItem key={review._id} divider>
                    <ListItemText>
                      <Typography variant="subtitle2">{review.name}</Typography>
                      <Rating value={review.rating} />
                      <Typography variant="body1">
                        {review.createdAt.substring(0, 10)}
                      </Typography>
                      <Typography variant="body1">{review.comment}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
                <ListItem>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        Write a Customer Review
                      </Typography>
                      {errorProductReview && (
                        <Message severity="error">{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <form onSubmit={submitHandler}>
                          <FormGroup>
                            <FormControl variant="filled">
                              <InputLabel id="rating">Rating</InputLabel>
                              <Select
                                labelId="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <MenuItem value={1}>1 - Poor</MenuItem>
                                <MenuItem value={2}>2 - Fair</MenuItem>
                                <MenuItem value={3}>3 - Good</MenuItem>
                                <MenuItem value={4}>4 - Very Good</MenuItem>
                                <MenuItem value={5}>5 - Excellent</MenuItem>
                              </Select>
                            </FormControl>
                          </FormGroup>
                          <FormGroup>
                            <TextField
                              id="comment"
                              label="Comment"
                              placeholder="Placeholder"
                              value={comment}
                              rows={4}
                              onChange={(e) => setComment(e.target.value)}
                              multiline
                              variant="filled"
                            />
                          </FormGroup>
                          <Button variant="contained" type="submit">
                            Submit
                          </Button>
                        </form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review
                        </Message>
                      )}
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductScreen;
