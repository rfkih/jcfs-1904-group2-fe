import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import {useSelector} from 'react-redux'
import { Grid, Box, Container, Typography, Paper, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, List, Avatar, ListItemAvatar, ListItemText, ListItem, Card, DialogTitle, CardActions, Divider, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import useStyles from './styles.js'


import Review from './Review'


function Payment({nextStep, backStep, setPayment, payment}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)



  const nextClick = () => {
    nextStep();
  }
  const backClick = () => {
    backStep();
  }






  return (
    <div>
        <Review setPayment={setPayment}/>
        <Container style={{ direction:"column",justifyContent:"space-around", alignItems:"center", paddingRight:'20px'}} >
         <Typography variant="h6"> Select Payment Method </Typography> 
          <Paper style={{ direction:"column",justifyContent:"space-around", alignItems:"center", padding:'10px'}} elevation={0} variant='outlined'>
         
   

          </Paper>
      

        </Container>
       
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button className={classes.paper} type="submit" variant="contained" color="primary" onClick={backClick}> Back </Button>
          <Button className={classes.paper} type="submit" variant="contained" color="primary" onClick={nextClick}> Next </Button>
        </div>
     
        
    </div>
  )
}

export default Payment