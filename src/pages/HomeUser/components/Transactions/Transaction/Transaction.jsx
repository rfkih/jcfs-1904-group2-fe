import React from 'react'
import { Grid, Box, Container, Typography, Paper, Card, CardActions, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import { height } from '@mui/material/node_modules/@mui/system';
import { Link, Navigate } from "react-router-dom";
import moment from 'moment'

function Transaction({transaction}) {

    const date =  moment(transaction.created_at).utc().format('LLL')

    console.log(transaction);
  return (
    <Container>
        <Card sx={{ display: 'flex', flexDirection: 'row' }} >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <CardContent sx={{ flex: '1 0 auto' }} >
                    <Typography variant="subtitle1" color="textSecondary" component="div">
                        {date}
                    </Typography>
                    <Typography component="div" variant="h6">
                        Status : {transaction.transactionStatus}
                    </Typography>
                    <Typography component="div" variant="h6">
                        Total Amount : {transaction.totalPrice}
                    </Typography>                
                </CardContent>
                </Box>
                </Grid>
                <Grid item xs={4}>
                    <CardContent>
                        <Typography variant="subtitle1" color="textSecondary" component="div">
                            {transaction.invoice}
                        </Typography>
                        {transaction.isByPresciption ? <Typography>Custom Order</Typography> : <Typography> Normal Order</Typography>}
                        
                    </CardContent>  
                    <CardActions>
                        {transaction.transactionStatus === 'waiting' ? <Typography component={Link} to={`/usertransactions/${transaction.id}`} >Complete this Transaction</Typography> : null}
                    </CardActions> 
                </Grid>
            </Grid>                 
        </Card>
    </Container>
  )
}

export default Transaction