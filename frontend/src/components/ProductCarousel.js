import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Loader from "./Loader";
import Message from "./Message";
import { listTopRatedProducts } from "../actions/productActions";

SwiperCore.use([Pagination, Autoplay]);

const useStyles = makeStyles({
  media: {
    height: 250,
    objectFit: "contain",
  },
  container: {
    padding: "1rem",
  },
});

const ProductCarousel = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message severity="error">{error}</Message>
  ) : (
    <Swiper
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{ delay: 5000 }}
      centeredSlides={true}
      loop={true}
      observer={true}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <Card className={classes.container}>
            <Link to={`/product/${product._id}`}>
              <CardMedia
                component="img"
                className={classes.media}
                image={product.image}
                title={product.title}
              />
            </Link>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
