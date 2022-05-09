import React, {useEffect, useState, useContext} from 'react'
import axios from '../../../../utils/axios'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Container, Paper, Card, TextField, FormControl, CardActions, Divider, CardContent, Box} from '@material-ui/core';
import useStyles from './styles'
import {Link, Navigate} from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import {CartContext} from '../../../../helper/Context'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
import {useSelector} from 'react-redux'
 
function UserCart() {
  const {username, role} = useSelector((state) => {
    return state.auth;
  });
    const classes = useStyles();
    const {userId, orderId, setUserId, setOrderId, cart, setCart, change, setChange, subTotal} = useContext(CartContext)
    const [open, setOpen] = useState(false)


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  


    const handleEmptyCart = async (userId) => {
        await axios
            .put(`/cart/delete`, { params: { userId } } )
            .then((res) => {
              setChange(!change)
              setUserId(0)
            })
            .catch((error) => console.log({ error }));
      }
    
    const checkoutHandle = async () => {
      await axios
      .post("/transaction", { username, userId, subTotal, cart } )
      .then((res) => {
        setUserId(0);
        setChange(!change)
        handleClose();
       alert(res.data); 
      })
      .catch((error) => console.log({ error }));
    }

  


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
          <Typography variant="h4">Subtotal: Rp.{subTotal} </Typography>
          <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={() => handleEmptyCart(userId)} >Empty cart</Button>
            <Button  className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary"  onClick={handleClickOpen}>Checkout</Button>
          </div>
        </div>
      </>
    );


   

    if (orderId) {
      
      if(!userId) {
        setOrderId(0)
        return <Navigate to="/orders" replace />;
      }
    }



  return (
    <Container>
    <div className={classes.toolbar}/>
      <Typography className={classes.tittle} variant ="h3" gutterBottom>Your Shopping Cart</Typography>
      {!cart.length ? <EmptyCart/> : <FilledCart/>}
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-checkout"
        aria-describedby="alert-dialog-checkout"
      >
        <DialogTitle id="alert-dialog-checkout"> Checkout Details..</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-checkout" >
          <Grid container spacing={3}>
            {cart.map((item) => (             
              <Grid item xs={12}  key={item.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                      <Typography >{item.productName}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                      <Typography >{item.productQuantity} pcs</Typography>
                      </Grid>
                      <Grid item xs={4}>
                      <Typography >Rp.{item.price}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Typography>total: Rp.{item.totalPrice} </Typography>
                  </CardActions>
                </Card>
              </Grid>
          ))}
            </Grid>
              <Typography variant="h6">SubTotal: {subTotal}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={checkoutHandle} autoFocus>Confirm</Button>

        </DialogActions>
      </Dialog>

      </div>
    </Container>
  )
}

export default UserCart