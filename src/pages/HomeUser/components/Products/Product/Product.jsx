import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, useTheme} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'


import useStyles from './styles'

function Product({product}) {
    const alternateimage = "https://pharmanewsintel.com/images/site/article_headers/_normal/Medicine.png"
    
    const classes = useStyles();


  return (
    <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img"  height="140" image={product.productIMG} alt={alternateimage}/>
        <CardContent>
                <Typography variant="body2">
                       Rp.{product.price}
                </Typography>
                <Typography component={Link} to={`/products/${product.id}`} variant="subtitle2" gutterBottom>
                    {product.productName}
                </Typography>
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