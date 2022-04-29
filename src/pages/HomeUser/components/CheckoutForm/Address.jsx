import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import {useSelector} from 'react-redux'
import { Grid, Box, Container, Typography, Paper, Card, CardActions, Divider, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import useStyles from './styles.js'




function Address() {
    const classes = useStyles();
    const {id, role} = useSelector((state) => {
        return state.auth;
      });
    const [firstAddress, setFirstAddress] = useState({})
    const [addresses, setAddresses] = useState([])
  
      console.log(firstAddress);
      


    const fetchAddress = async () => {
        try {
            const res = await axios.get(`/address/${id}`, {params: { id }})
            .then((res=>{
              const { data } = res;
              setFirstAddress(data[0])
              setAddresses(data)
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
    };
    
    useEffect(() => {
        fetchAddress();
    },[])

  return (
    <Paper className={classes.paper} elevation={0}>
        <Typography variant="h6" >Address</Typography>
        <Divider/>
        <Typography>{firstAddress.addressDetail}</Typography>
        <Divider/>
        <div  style={{display: 'flex', justifyContent: 'flex-start'}} >
            <Button variant="outlined" >HEi</Button>
            <Button variant="outlined" >WOi</Button>

        </div>
    </Paper>
  )
}

export default Address