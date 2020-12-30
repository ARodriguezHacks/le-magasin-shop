import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 310,
  },
  container: {
    padding: "1rem",
  },
  content: {
    "& *": {
      margin: "0.25rem 0",
    },
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          className={classes.media}
          image={product.image}
          title={product.title}
        />
      </Link>
      <CardContent className={classes.content}>
        <Link to={`/product/${product._id}`}>
          <Typography variant="h6" color="textSecondary">
            {product.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="textSecondary" component="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Typography>
        <Typography variant="h6" color="secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
