import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton,
  useTheme,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import {} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { CartContext } from "../../../../../helper/Context";
import axios from "../../../../../utils/axios";

function Product({ product }) {
  const classes = useStyles();
  const [image, setImage] = useState(
    "https://pharmanewsintel.com/images/site/article_headers/_normal/Medicine.png"
  );
  const [priceTotal, setPriceTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const { userId, setUserId, orderId, cart, setCart, change, setChange } =
    useContext(CartContext);
  const { role, id } = useSelector((state) => {
    return state.auth;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAdd = async () => {
    const checkProductInCart = cart.find(
      (item) => item.product_id === product.id
    );

    if (checkProductInCart) {
      const totalQty = checkProductInCart.productQuantity + 1;
      await axios
        .put(`/cart/quantity/:${checkProductInCart.id}`, {
          params: {
            productQuantity: totalQty,
            id: checkProductInCart.id,
            price: product.price,
          },
        })
        .then((res) => {
          setChange(!change);
          console.log(res.data);
        })
        .catch((error) => console.log({ error }));
    } else {
      if (role == "admin") {
        await axios
          .post(`/cart`, {
            params: { productQuantity: 1, product, userId, isCustom: true },
          })
          .then((res) => {
            setChange(!change);
            console.log(res.data);
          })
          .catch((error) => console.log({ error }));
      } else {
        await axios
          .post(`/cart`, {
            params: { productQuantity: 1, product, userId, isCustom: false },
          })
          .then((res) => {
            setChange(!change);
            console.log(res.data);
          })
          .catch((error) => console.log({ error }));
      }
    }
  };

  useEffect(() => {
    if (product.productIMG) {
      setImage(product.productIMG);
    }
  }, []);

  console.log(userId);

  return (
    <>
      <Card classes={classes.card}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="product image"
        />
        <CardContent>
          <Typography variant="body2">Rp.{product.price}</Typography>
          <Typography
            className={classes.link}
            component={Link}
            to={`/products/${product.id}`}
            variant="subtitle2"
            gutterBottom
          >
            {product.productName}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton
            onClick={userId ? onAdd : handleClickOpen}
            aria-label="Add to Cart"
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {role === "admin" ? (
            <DialogTitle>There is no active Orders..</DialogTitle>
          ) : (
            <DialogTitle>Please Login First...</DialogTitle>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Product;
