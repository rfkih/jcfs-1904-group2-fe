import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import useStyles from './styles'
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";

function CartItem({item, change, setChange}) {
    const params = useParams();
    const {productId, id, productIMG, productQuantity} = item
    const classes= useStyles();

    


   

    const handleUpdateCartQty = async (id, productQuantity) => {
        

        if (productQuantity) {
            await axios
            .put(`/cart/quantity/:${id}`, { params: { productQuantity, id,  price: item.price } } )
            .then((res) => {
              setChange(!change)
              
            })
            .catch((error) => console.log({ error }));
        
        }else {
            await axios
            .put(`/cart/delete/:${id}`, { params: { productQuantity, id } } )
            .then((res) => {
              setChange(!change)
              
            })
            .catch((error) => console.log({ error }));

        }
       
    } 

    const handleRemoveFromCart = async (id) => {
        await axios
            .put(`/cart/delete/:${id}`, { params: { id } } )
            .then((res) => {
              setChange(!change)
             
            })
            .catch((error) => console.log({ error }));
      }



   
  return (
    <Card>
        <CardMedia image={item.productIMG} alt={item.productName} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant="h6">{item.productName}</Typography>
            <Typography variant="h6">Rp.{item.price}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <div className={classes.buttons}> 
                <Button type="button" size="small" onClick={() => handleUpdateCartQty(id, productQuantity - 1)} >-</Button>
                <Typography>{productQuantity}</Typography> 
                <Button type="button" size="small" onClick={() => handleUpdateCartQty(id, productQuantity + 1)} >+</Button>
            </div>
            <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(id)} >Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem