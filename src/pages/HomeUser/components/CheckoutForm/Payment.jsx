import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import {useSelector} from 'react-redux'
import { Grid, Box, Container, Typography, Paper, Dialog, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, List, Avatar, ListItemAvatar, ListItemText, ListItem, Card, DialogTitle, CardActions, Divider, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import useStyles from './styles.js'


import Review from './Review'
import { lightFormat } from 'date-fns';


function Payment({nextStep, backStep, setSelected}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [payments, setPayments] = useState([])
  const [payment, setPayment] = useState('')
  
   
  


  const nextClick = () => {
    setSelected(payment)
    nextStep();
  }
  const backClick = () => {
    backStep();
  }

  const handleChange = (event) => {
    setPayment(event.target.value);
   
  };


  const fetchPayment = async () => {
    try {
        const res = await axios.get(`/payment`);
        const  {data} = res
        setPayments(data)
        
    } catch (error) {
        console.log(alert(error.message));
    }
  };
  


  useEffect(() => {
    fetchPayment();
  }, []);





  return (
    <div>
        <Review />
        <Container style={{ direction:"column",justifyContent:"space-around", alignItems:"center", paddingRight:'20px'}} >
         <Typography variant="h6"> Select Payment Method </Typography> 
          <Paper style={{ direction:"column",justifyContent:"space-around", alignItems:"center", padding:'10px'}} elevation={0} variant='outlined'>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={payment}
              onChange={handleChange}
            >
            {payments.map((item) => {
                      return(
                        <FormControlLabel key={item.id} value={item.bank} control={<Radio />} label={item.bank} />
                      )
                    })}
            </RadioGroup>
          </FormControl>

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