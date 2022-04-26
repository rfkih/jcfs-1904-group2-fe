import React, {useState, useEffect} from 'react'
import { InputLabel, Select, Box, MenuItem, FormControl, InputBase, IconButton,  Grid, Divider, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';
import useStyles from './styles.js'
import Pagination from "@material-ui/lab/Pagination";
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
    const [transactionPerPage, setTransactionPerPage] = useState(5)
    const [checked, setChecked] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)


    
  const renderTransaction = () => {
    

    return transactions.map((transaction) => (
      <Grid  item key={transaction.id} xs= {12} >
        <Paper elevation={0} className={classes.paper} key={transaction.id} >
          <Transaction key={transaction.id} transaction={transaction}/>
        </Paper> 
      </Grid>
    ));
  };
      

    const fetchTransaction = async () => {
        try {
            const res = await axios.get(`/transaction/user/${id}`, {params: { pages:(`limit ${transactionPerPage} offset ${(page - 1)*transactionPerPage}`), id }})
            .then((res=>{
              const { data } = res;
              setTransactions(data.result)
              setTotalPage(Math.ceil(data.count[0].count / transactionPerPage ))
              setChecked(true)
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
    };


    useEffect(() => {
        setChecked(false)
        fetchTransaction();
    },[page])




  return (
    <Container>
        <div className={classes.toolbar}/>

        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Filter</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={9}>                   
                <Paper className={classes.content} variant='outlined' elevation={0}>
                    <Typography variant="h5" >Transaction List</Typography>  
                    <Zoom in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
                        <Grid container justifyContent="center" spacing ={2}>
                            {renderTransaction()}
                        </Grid>
                    </Zoom>     
                </Paper>
                <Box py={3} display="flex" justifyContent="center">
                    <Pagination
                    count={totalPage}
                    color="primary"
                    page={page}
                    variant="outlined"
                    onChange={(e, value) => setPage(value)}
                    />   
                </Box>      
            </Grid>

        </Grid>
            
            
    </Container>
    
  )
}

export default Transactions