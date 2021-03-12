import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { createOrder } from "../actions/orderActions";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

const PlaceOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 20);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 step4 />
      </FormContainer>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h5">Shipping</Typography>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemText>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </ListItemText>
            </ListItem>
          </List>

          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h5">Payment Method</Typography>
              </ListItemText>
            </ListItem>
            <ListItem divider>
              <ListItemText>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </ListItemText>
            </ListItem>
          </List>

          <List>
            <ListItem>
              <ListItemText>
                <Typography variant="h5">Order Items</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <List>
                  {cart.cartItems.map((item, index) => (
                    <ListItem key={index} divider>
                      <Grid container>
                        <Grid container item md={1}>
                          <Card>
                            <CardMedia
                              component="img"
                              image={item.image}
                              alt={item.name}
                            />
                          </Card>
                        </Grid>
                        <Grid item md={1}>
                          <Link to={`/product/${item.product}`} />
                        </Grid>
                        <Grid item md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Grid>
                        <Grid item md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          </List>
        </Grid>

        <Grid item md={4}>
          <Card>
            <CardContent>
              <List>
                <ListItem divider>
                  <ListItemText>
                    <Typography variant="h5">Order Summary</Typography>
                  </ListItemText>
                </ListItem>

                <ListItem divider>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemText>Items</ListItemText>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText>${cart.itemsPrice}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem divider>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemText>Shipping</ListItemText>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText>${cart.shippingPrice}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem divider>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemText>Tax</ListItemText>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText>${cart.taxPrice}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem divider>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemText>Total</ListItemText>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText>${cart.totalPrice}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  {error && <Message severity="warning">{error}</Message>}
                </ListItem>

                <ListItem>
                  <Grid container>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={cart.cartItems === 0}
                        fullWidth
                        onClick={placeOrderHandler}
                      >
                        Place Order
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
