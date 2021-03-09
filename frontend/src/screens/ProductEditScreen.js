import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormGroup,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails } from "../actions/productActions";

const useStyles = makeStyles({
  container: {
    "& > *": {
      margin: "1rem",
    },
  },
});

const ProductEditScreen = ({ match, history }) => {
  const classes = useStyles();
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, productId, product, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // UPDATE PRODUCT
  };

  return (
    <>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <Paper className={classes.container}>
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    type="name"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="price">Price</InputLabel>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="image">Image</InputLabel>
                  <Input
                    type="text"
                    id="image"
                    name="image"
                    value={image}
                    placeholder="Enter image"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="brand">Brand</InputLabel>
                  <Input
                    type="text"
                    id="brand"
                    name="brand"
                    value={brand}
                    placeholder="Enter brand"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="countInStock">Count In Stock</InputLabel>
                  <Input
                    type="number"
                    id="countInStock"
                    name="countInStock"
                    value={countInStock}
                    placeholder="Enter count in stock"
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Input
                    type="text"
                    id="category"
                    name="category"
                    value={category}
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </FormGroup>

              <Button type="submit">Update</Button>
            </Paper>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
