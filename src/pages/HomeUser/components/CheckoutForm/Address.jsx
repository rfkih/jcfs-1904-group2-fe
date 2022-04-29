import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import {useSelector} from 'react-redux'
import { Grid, Box, Container, Typography, Paper, Dialog, List, Avatar, ListItemAvatar, ListItemText, ListItem, Card, DialogTitle, CardActions, Divider, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import useStyles from './styles.js'




function Address({nextStep}) {
    const classes = useStyles();
    const {id, role} = useSelector((state) => {
        return state.auth;
      });
    const [firstAddress, setFirstAddress] = useState([])
    const [addresses, setAddresses] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")

    console.log(selectedValue);


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


    const fetchSelectedAddress = async (value) => {
        try {
            const res = await axios.get(`/address/selected`, {params: { selectedValue, id, value }})
            .then((res=>{
              const { data } = res;
              setFirstAddress(data[0])
                console.log(data);
            }));
        } catch (error) {
            console.log(alert(error.message));
        }

    }
    
    useEffect(() => {
        fetchAddress();
    },[]);

  


    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        fetchSelectedAddress(value);
      };
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    function SelectAddress (props) {
        const {onClose, selectedValue, open, addresses} = props

        const handleClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value) => {
            if (value) {
                onClose(value)
            }
          };


        return (
            <Dialog onClose={handleClose} open={open}>
                 <DialogTitle>Select other Address</DialogTitle>
                    <List className={classes.paper} >
                     {addresses.map((address) => {
                        return <ListItem button onClick={() => handleListItemClick(address.id)} key={address.id} >
                           <ListItemText primary={address.addressDetail}/>
                         </ListItem>
                     })}
                    </List>
                
              

            </Dialog>
        )
        

    }

  return (
    <Paper className={classes.paper} elevation={0}>
        <Typography className={classes.paper} variant="h6" >Address</Typography>
        <Divider/>
        <Typography className={classes.paper} >{firstAddress.addressDetail}</Typography>
        <Divider/>
            
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button  className={classes.paper} variant="outlined" onClick={handleClickOpen} >Other Address</Button> 
                   
                    <Button className={classes.paper} type="submit" variant="contained" color="primary" onClick={nextStep}> Next </Button>
            </div> 
        <SelectAddress addresses={addresses} selectedValue={selectedValue} open={open} onClose={handleClose}/>
    </Paper>
  )
}

export default Address