import React, {useState, useEffect, useContext} from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, useTheme} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { CartContext } from '../../../../../helper/Context';
import axios from '../../../../../utils/axios';


function Product({product}) {
    const classes = useStyles();
    const [image ,setImage] = useState('https://pharmanewsintel.com/images/site/article_headers/_normal/Medicine.png')
    const [priceTotal, setPriceTotal] = useState(0)
   
    const {userId, orderId, cart, setCart, change, setChange} = useContext(CartContext)

    console.log(cart[0].productQuantity);
    
    const onAdd = async () => {
        const checkProductInCart = cart.find((item) => item.product_id === product.id)
        
        if (checkProductInCart) {
            const totalQty = checkProductInCart.productQuantity + 1;

            await axios
            .put(`/cart/quantity/:${checkProductInCart.id}`, { params: { productQuantity: totalQty, id: checkProductInCart.id,  price: product.price } } )
            .then((res) => {
              setChange(!change)
              console.log(res.data);
            })
            .catch((error) => console.log({ error }));
        }
    }
    
    
  
   
    useEffect(() => {
        if (product.productIMG) {
            setImage(product.productIMG)
        }
    },[])

    const handleAddToCart = async (product) => {
        await axios
            .post(`/cart`, product )
            .then((res) => {
              setChange(!change)
              console.log(res.data);
            })
            .catch((error) => console.log({ error }));
      }


  return (
    <Card classes={classes.card} >
        <CardMedia component="img"  height="140" image={image} alt='product image'/>
        <CardContent>
                <Typography variant="body2">
                       Rp.{product.price}
                </Typography>
                <Typography className={classes.link} component={Link} to={`/products/${product.id}`} variant="subtitle2" gutterBottom>
                    {product.productName}
                </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton onClick={onAdd} aria-label='Add to Cart' >
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product