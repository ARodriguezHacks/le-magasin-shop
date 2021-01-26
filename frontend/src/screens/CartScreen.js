import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  List,
  ListItem,
  Card,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const useStyles = makeStyles({
  media: {
    height: 110,
  },
});

function CartScreen({ match, location, history }) {
  const classes = useStyles();
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log("remove");
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Grid container>
      <Grid item md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.product}>
                <Grid container>
                  <Grid item md={2}>
                    <CardMedia className={classes.media} image={item.image} />
                  </Grid>
                  <Grid item md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Grid>
                  <Grid item md={2}>
                    ${item.price}
                  </Grid>
                  <Grid item md={2}>
                    <FormControl>
                      <InputLabel id="qty">Qty</InputLabel>
                      <Select
                        labelId="qty"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={2}>
                    <Button onClick={() => removeFromCartHandler(item.product)}>
                      Remove Item
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
      <Grid item md={4}>
        <Card>
          <List>
            <ListItem>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, currentItem) => acc + currentItem.qty,
                  0
                )}
                ) items
              </h2>
            </ListItem>
            <ListItem>
              $
              {cartItems
                .reduce(
                  (acc, currentItem) =>
                    acc + currentItem.qty * currentItem.price,
                  0
                )
                .toFixed(2)}
            </ListItem>
            <ListItem>
              <Button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                variant="contained"
                color="secondary"
              >
                Proceed to Checkout
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CartScreen;
