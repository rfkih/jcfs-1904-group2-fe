import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, useTheme} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles'

function Product({product}) {
    const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.productIMG} tittle={product.productName}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                    {product.productName}
                </Typography>
                <Typography variant="body2">
                       Rp.{product.price}
                </Typography>
            </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='Add to Cart' >
                <AddShoppingCart/>
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product