import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { ShopingCart, ShoppingCart } from '@material-ui/icons';


import logo from '../../assets/logo.png'


import useStyles from './styles';

function Navbar() {
    const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.AppBar} color="inherit">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <img src={logo} alt="pharmacy" height="25px" className={classes.image}/>
                Pharmacy
            </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar