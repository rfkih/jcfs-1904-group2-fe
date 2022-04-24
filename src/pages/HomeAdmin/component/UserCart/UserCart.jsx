import React, {useEffect, useSttate, useContext} from 'react'
import axios from '../../../../utils/axios'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Container, Paper, Card, TextField, FormControl, CardActions, Divider, CardContent, Box} from '@material-ui/core';
import useStyles from './styles'
import {Link} from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import {CartContext} from '../../../../helper/Context'
 
function UserCart() {
    const classes = useStyles();
    const {userId, orderId, cart, setCart, change, setChange} = useContext(CartContext)

    console.log(cart.length);

    const fetchCart = async () => {
        try {
            const res = await axios.get("/cart", {params: { userId, custom: 'and isCustom = 1'}});
            const { data } = res;
            console.log(data);
            setCart(data.result)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchCart();
    },[change])


    const EmptyCart = () => (
        <Typography variant="subtitle1"> You have no items in your shopping cart, 
            <Link to="/" className={classes.link}>start adding some!</Link>
        </Typography>
    );


    const FilledCart = () => (

   
        <>
        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
                <CartItem change={change} setChange={setChange} item={item} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">Subtotal: </Typography>
          <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" >Empty cart</Button>
            <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
          </div>
        </div>
      </>
    );


  return (
    <Container>
    <div className={classes.toolbar}/>
    <Typography className={classes.tittle} variant ="h3" gutterBottom>Your Shopping Cart</Typography>
    { !cart.length ? <EmptyCart/> : <FilledCart/>}
</Container>
  )
}

export default UserCart