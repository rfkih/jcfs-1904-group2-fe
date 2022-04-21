import React, {useState, useEffect} from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, useTheme} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import useStyles from './styles'



function Product({product}) {
    const classes = useStyles();
    const [image ,setImage] = useState('https://pharmanewsintel.com/images/site/article_headers/_normal/Medicine.png')
    
  

    useEffect(() => {
        if (product.productIMG) {
            setImage(product.productIMG)
        }
    },[])


  return (
    <Card hover classes={classes.card} >
        <CardMedia component="img"  height="140" image={image} alt='product image'/>
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