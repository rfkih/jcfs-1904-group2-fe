import React, { useState, useEffect } from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, useTheme} from '@material-ui/core';
import {Grid} from '@material-ui/core'
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";

import useStyles from './styles';

function ProductDetail() {
  const classes= useStyles();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("/products", { params: { id: params.productId } })
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  console.log(product);

  const { category_id, productName, productDetails, productIMG, price } = product
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={productIMG} tittle={productName}>
        
      </CardMedia>
      <Typography>
        {productDetails}
      </Typography>

    </Card>
  )
}

export default ProductDetail