import React, {useState, useEffect} from 'react'
import { InputLabel, Select, Box, MenuItem, FormControl, InputBase, IconButton,  Grid, Divider, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';
import useStyles from './styles.js'
import Pagination from "@material-ui/lab/Pagination";
import axios from '../../../../utils/axios'
import Transaction from './Transaction/Transaction'
import {useSelector} from 'react-redux'
import Zoom from '@mui/material/Zoom';
import {SearchOutlined} from '@material-ui/icons'

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
    const [status, setStatus] = useState('')
    const [sort, setSort] = useState('')
    const [keyword, setKeyword] = useState('')
    const [change, setChange] = useState(false)



    const selectStatusHandler = (e) => {
        setStatus(e.target.value)
    }

    const selectSortHandler = (e) => {
        setSort(e.target.value)
    }
    const handleChange = (e) => {
        setKeyword(`and invoice like '%${e.target.value}%'`);
        setPage(1)
      };


    
  const renderTransaction = () => {
    

    return transactions.map((transaction) => (
      <Grid  item key={transaction.id} xs= {12} >
        <Paper elevation={0} className={classes.paper} key={transaction.id} >
          <Transaction change={change} setChange={setChange} key={transaction.id} transaction={transaction}/>
        </Paper> 
      </Grid>
    ));
  };
      

    const fetchTransaction = async () => {
        try {
            const res = await axios.get(`/transaction/user/${id}`, {params: { keyword, sort, status, pages:(`limit ${transactionPerPage} offset ${(page - 1)*transactionPerPage}`), id }})
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

console.log(change);
    useEffect(() => {
        setChecked(false)
        fetchTransaction();
    },[page, status, sort, keyword, change])




  return (
    <Container>
        <div className={classes.toolbar}/>

        <Grid container spacing={2}>
            <Grid item xs={3}>
            <Paper variant="outlined" >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" >
                Filter Transaction
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                <InputBase     
                  placeholder="Search Invoice"
                  name="keyword"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChange}
                />
                </Grid>
                <Grid item xs={3}>
                  <IconButton sx={{ p: '10px' }}>
                    <SearchOutlined />
                  </IconButton>
                </Grid>
              </Grid>
            <br />
            <FormControl sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="status-select">Status</InputLabel>
                  <Select
                    displayEmpty
                    labelId="status-select"
                    id="1"
                    defaultValue=""
                    name="status"
                    label="status"
                    onChange={selectStatusHandler}
                  >
                    <MenuItem key={1} value="">Status</MenuItem>
                    <MenuItem key={2}  value="and transactionStatus = 'waiting'" > Waiting </MenuItem>
                    <MenuItem key={3}  value="and transactionStatus = 'paid'" > Paid </MenuItem>
                    <MenuItem key={4}  value="and transactionStatus = 'sent'" > Sent </MenuItem>
                    <MenuItem key={5}  value="and transactionStatus = 'failed'" > Failed </MenuItem>
                    <MenuItem key={6}  value="and transactionStatus = 'complete'" > Complete </MenuItem>
                  </Select>
              </FormControl>
          </CardContent>
          
        </Card>
        <Divider light />
        {/* Sort */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" >
              Sort Transactions
            </Typography>
            <FormControl sx={{ m: 3, minWidth: 200 }}>
              <InputLabel id="sort-by" >Sort By</InputLabel>
                  <Select
                    displayEmpty
                    labelId="sort-by"
                    id="1"
                    defaultValue=""
                    name="sortBy" 
                    onChange={selectSortHandler} 
                  >
                    <MenuItem key={1} value="" > Sort By </MenuItem>
                    <MenuItem key={2} value="order by created_at DESC" > Latest </MenuItem>
                    <MenuItem key={3} value="order by created_at ASC" > Oldest </MenuItem>
              </Select>   
            </FormControl>
          </CardContent>
        </Card>
      </Paper>
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