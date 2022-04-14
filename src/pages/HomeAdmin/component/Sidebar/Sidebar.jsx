import React, { useState } from 'react';

import { Link, useLocation, useNavigate} from 'react-router-dom';
import {HomeRounded, ReportOutlined, MenuRounded, CloseRounded, ShoppingCart, People, EmailSharp, SubjectOutlined, AddCircleOutlineOutlined, AccountBalanceOutlined} from '@material-ui/icons'
import { AppBar, Drawer, ListItem, Toolbar, List, ListItemText, Typography,Avatar, ListItemIcon} from '@material-ui/core';
import {format} from 'date-fns'



import useStyles from './style'

function DrawerBar() {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems =[
        {
            text: 'Home User',
            icon: <People color="primary"/>,
            path: '/'
        },
        {
            text: 'Add / Edit Product',
            icon: <AddCircleOutlineOutlined color="primary"/>,
            path: '/homeadmin'
        },
        {
            text: 'Financial',
            icon: <AccountBalanceOutlined color="primary"/>,
            path: '/financial'
        },
        {
            text: 'Orders',
            icon: <EmailSharp color="primary"/>,
            path: '/orders'
        },
        {
            text: 'Products Stock',
            icon: <AddCircleOutlineOutlined color="primary"/>,
            path: '/stocks'

        }
    ]
  return (
    <div className={classes.root}>
        {/* App Bar */}
        <AppBar 
            className={classes.appbar}
            color="inherit"
        >
            <Toolbar>
                <Typography className={classes.date}>
                    Today is the {format(new Date(), 'do MMM Y')}
                </Typography>
                <Typography>
                   Hi. Admin
                </Typography>
                <Avatar className={classes.avatar}/>
            </Toolbar>

        </AppBar>
        {/* drawer */}
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
        >
            <div>
                <Typography variant="h5" className={classes.title}>
                    Admin Dashboard
                </Typography>
            </div>
            {/* list/link */}
            <List>
                {menuItems.map((item) => (
                   <ListItem
                    button
                    key={item.text}
                    onClick={() =>{ navigate(item.path)}}
                    className={location.pathname == item.path ? classes.active : null}
                   >
                    <ListItemIcon>{item.icon} </ListItemIcon>
                    <ListItemText primary={item.text}></ListItemText>
                   </ListItem> 
                ))}
            </List>      
        </Drawer>
    </div>
  )
}

export default DrawerBar