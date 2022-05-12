import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Paper,
  CardMedia,
  Button,
  Grid,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import axios from "../../../../../utils/axios";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../../../helper/Context";
import { useSelector } from "react-redux";

import useStyles from "./styles";

function ProductDetail() {
  const classes = useStyles();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [stocks, setStocks] = useState({});
  const [stock, setStock] = useState(5);
  const { userId, orderId, cart, setCart, change, setChange } =
    useContext(CartContext);
  const { stockLiquid, stockNonLiquid } = stocks;
  const [open, setOpen] = useState(false);
  const { role } = useSelector((state) => {
    return state.auth;
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`/products/${params.productId}`, {
        params: { id: params.productId },
      })
      .then((res) => {
        setProduct(res.data.result[0]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await axios.get(`/stocks/${params.productId}`, {
        params: { id: params.productId },
      });
      const { data } = res;
      console.log(data.result[0].qtyBoxAvailable);
      setStocks(data.calculatedStock);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    if (product.isLiquid) {
      setStock(stockLiquid);
    } else {
      setStock(stockNonLiquid);
    }
  }, [stocks]);

  const onAdd = async () => {
    const checkProductInCart = cart.find(
      (item) => item.product_id === product.id
    );

    if (checkProductInCart) {
      const totalQty = checkProductInCart.productQuantity + quantity;
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
          params: {
            productQuantity: quantity,
            product,
            userId,
            isCustom: true,
          },
        })
        .then((res) => {
          setChange(!change);
          console.log(res.data);
        })
        .catch((error) => console.log({ error }));
        
      } else {
        await axios
        .post(`/cart`, {
          params: {
            productQuantity: quantity,
            product,
            userId,
            isCustom: false,
          },
        })
        .then((res) => {
          setChange(!change);
          console.log(res.data);
        })
        .catch((error) => console.log({ error }));
        
      }
     
    }
  };

  const onAddToCartClick = () => {
    if (quantity) {
      onAdd();
      setQuantity(0);
    } else {
      alert("quantity still zero ");
    }
  };

  const { category_id, productName, productDetails, productIMG, price } =
    product;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={product.productIMG}
            tittle={product.productName}
          />
          <CardContent>
            <div className={classes.cardContent}>
              <Typography variant="h6" gutterBottom>
                {productName}
              </Typography>
              <Typography variant="body2">Rp.{price}</Typography>
            </div>
          </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
            <Typography>{productDetails}</Typography>
          </CardActions>
        </Card>
        <CardActions className={classes.cardActions}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={6}>
              {product.isLiquid ? (
                <Typography>Stock Available : {stock} Bottle</Typography>
              ) : (
                <Typography>Stock Available : {stock} Strips</Typography>
              )}
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              item
              xs={6}
            >
              {quantity === 0 ? (
                <Button size="small" variant="contained" color="success">
                  {" "}
                  -{" "}
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </Button>
              )}
              <Typography variant="h6">{quantity}</Typography>
              {quantity === stock ? (
                <Button size="small" variant="contained" color="success">
                  +
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              )}
              <IconButton
                onClick={userId ? onAddToCartClick : handleClickOpen}
                aria-label="Add to Cart"
              >
                <AddShoppingCart />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
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
      </Paper>
    </main>
  );
}

export default ProductDetail;
