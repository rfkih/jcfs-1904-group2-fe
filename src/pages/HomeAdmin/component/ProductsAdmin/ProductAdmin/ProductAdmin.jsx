import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, Button, useTheme} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'


function ProductAdmin({product}) {
  
  
  return (
    <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img"  height="140" image={product.productIMG} alt="product Image"/>
        <CardContent>
                <Typography variant="body2">
                       Rp.{product.price}
                </Typography>
                <Typography component={Link} to={`/products/${product.id}`} variant="subtitle2" gutterBottom>
                    {product.productName}
                </Typography>
        </CardContent>
        <CardActions >
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
    </Card>
  )
}

export default ProductAdmin