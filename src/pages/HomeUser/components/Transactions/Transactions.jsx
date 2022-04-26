import React, {useState, useEffect} from 'react'
import { InputLabel, Select, Box, MenuItem, FormControl, InputBase, IconButton,  Grid, Divider, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';
import useStyles from './styles.js'
import axios from '../../../../utils/axios'
import Transaction from './Transaction/Transaction'
import {useSelector} from 'react-redux'
import Zoom from '@mui/material/Zoom';

function Transactions() {
    const classes = useStyles();
    const {role, id} = useSelector((state) => {
        return state.auth;
      });
    const [transactions, setTransactions] = useState([])
    const [checked, setChecked] = useState(false)


    
  const renderTransaction = () => {
    

    return transactions.map((transaction) => (
      <Grid  item key={transaction.id} xs= {12} >
        <Paper elevation={1} className={classes.paper} key={transaction.id} >
          <Transaction key={transaction.id} transaction={transaction}/>
        </Paper> 
      </Grid>
    ));
  };
      

    const fetchTransaction = async () => {
        try {
            const res = await axios.get(`/transaction/user/${id}`, {params: { pages:(``), id }})
            .then((res=>{
              const { data } = res;
              setTransactions(data)
              setChecked(true)
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
    };


    useEffect(() => {
        setChecked(false)
        fetchTransaction();
    },[])




  return (
    <Container>
        <div className={classes.toolbar}/>
          <Zoom in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
          <Grid item xs={9}>
                <Paper>
                    <Zoom in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
                        <Grid container justifyContent="center" spacing ={2}>
                            {renderTransaction()}
                        </Grid>
                    </Zoom>     
                </Paper>
            </Grid>
          </Zoom>     
        <Box py={3} display="flex" justifyContent="center">
       
        </Box>
    </Container>
    
  )
}

export default Transactions