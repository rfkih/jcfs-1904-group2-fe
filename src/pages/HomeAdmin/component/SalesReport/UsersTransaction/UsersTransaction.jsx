
import React, {useState, useEffect} from 'react'
import axios from '../../../../../utils/axios';
import { Typography,Container, Grid, Card, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {SearchOutlined} from '@material-ui/icons'
import useStyles from './style'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers'
import moment from 'moment'


function UsersTransaction() {
  const classes = useStyles();
    const [transaction, setTransaction] = useState([])
    const [page, setPage] = useState(0)
    const [pageUser, setPageUser] = useState(0)
    const [userPerPage, setUserPerPage] = useState(10)
    const [transactionPerPage, setTransactionPerPage] = useState(10)
    const [status, setStatus] = useState('')
    const [ users, setUsers] = useState([])
    const [ sortUser, setSortUser] = useState('')
    const [sortTransactions, setSortTransactions] = useState('order by created_at desc')
    const [keywordTransaction, setKeywordTransaction] = useState('')
    const [keywordUser, setKeywordUser] = useState('')
    const [selectedDateFrom, setSelectedDateFrom] = useState( (`2018-04-04`))
    const [selectedDateTo, setSelectedDateTo] = useState( new Date())
    const [ totalTransaction, setTotalTransaction] = useState(1)
    const [ totalUser, setTotalUser ] = useState(1)
    const [ isCustom, setIsCustom ] = useState('')
    
    const searchBtnHandler = () => {
        fetchTransaction();
    }
    
    const fetchTransaction = async () => {
        const setDateFrom = moment(selectedDateFrom).utc().format('YYYY-MM-DD')
        const setDateTo = moment(selectedDateTo).utc().format('YYYY-MM-DD')
        const date = `where created_at between '${setDateFrom}' and '${setDateTo} 23:59:59'`
        try {
            const res = await axios.get("/transaction", {params: { pages:(`limit ${transactionPerPage} offset ${(page) * transactionPerPage}`), date, isCustom, sortTransactions, keywordTransaction, status}});
            const { data } = res;
            setTransaction(data.result);  
            setTotalTransaction(data.count[0].count)
           
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect (() => {
        fetchTransaction();
    },[status, sortTransactions, keywordTransaction, page, transactionPerPage, isCustom]);


    const fetchUser = async () => {
        try {
            const res = await axios.get("/users/admin", {params: { pages:(`limit ${userPerPage} offset ${(pageUser) * userPerPage}`), sortUser, keywordUser }});
            const {data} = res;
            setUsers(data.result)
            
            setTotalUser(data.userCount[0].user_count)
           
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchUser();
    },[sortUser, keywordUser, pageUser, userPerPage])


    const keywordTransactionHandleChange = (e) => {
      setKeywordTransaction(`and invoice like '%${e.target.value}%'`);
      setPage(0)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

    const handleChangePageUser = (event, newPage) => {
        setPageUser(newPage)
    }

    const handleChangeTransactionPerPage = (event) => {
        setTransactionPerPage(+event.target.value);
        setPage(0);
      };


    const handleChangeUserPerPage = (event) => {
        setUserPerPage(+event.target.value);
        setPageUser(0)
    }

    const handleChangeStatus = (e) => {
        setStatus(e.target.value)
      };

      const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date)
    }

    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date)
    }

    

      const handleChangeKeywordUser = (e) => {
        setKeywordUser(`and username like '%${e.target.value}%'`);
      };


    
    const columns = [
        { id:'id', label: 'Id', align: 'center', minWidth: 10},
        { id:'invoice', label: 'Invoice', align: 'center', minWidth: 50},
        { id:'transactionStatus', label: 'Status', align: 'center', minWidth: 50},
        { id:'totalPrice', label: 'Total Price' ,align: 'center', minWidth: 50},
        { id:'created_at', label: 'Date' ,align: 'center', minWidth: 50},
    ]

    const columnsUser = [
        { id:'rownumber', label: 'No', align: 'right', minWidht: 10},
        { id:'username', label: 'Username', align: 'right', minWidth: 50},
        { id:'name', label: 'Name', align: 'right', minWidth: 100},
        { id:'email', label: 'E-Mail', align: 'right', minWidth: 70},
    ]


    const selectSortHandler = (e) => {    
      setSortTransactions(e.target.value);
      };

    const selectCustomHandler = (e) => {
        setIsCustom(e.target.value)
    }

    const selectSortUserHandler = (e) => {
        setSortUser(e.target.value);
      };

     


  return (
    <Container>
      <div className={classes.toolbar}/>
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <Paper className={classes.paper} >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl >
                                <InputLabel id="range-select-label">Transaction Status</InputLabel>
                                    <Select
                                        displayEmpty
                                        labelId="range-select-label"
                                        id="range-select"
                                        label="Transaction Status"
                                        name="status"
                                        defaultValue=""
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem key={1} value={""} >Transaction Status</MenuItem>
                                        <MenuItem key={2} value={"and transactionStatus = 'paid'"} >Paid</MenuItem>
                                        <MenuItem key={3} value={"and transactionStatus = 'failed'"} >Failed</MenuItem>
                                        <MenuItem key={4} value={"and transactionStatus = 'sent'"} >Sent</MenuItem>
                                        <MenuItem key={5} value={"and transactionStatus = 'complete'"}>Complete</MenuItem>
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                                        <MenuItem key={1} value={``} >Sort By</MenuItem>
                                        <MenuItem key={2} value={`order by id asc`} >Transaction Id (ascending)</MenuItem>
                                        <MenuItem key={3} value={`order by id desc`} >Transaction Id (descending)</MenuItem>
                                        <MenuItem key={4} value={`order by created_at desc`} >Latest</MenuItem>
                                        <MenuItem key={5} value={`order by created_at asc`}>Oldest</MenuItem>
                                        <MenuItem key={6} value={`order by totalPrice desc`} >Price (descending)</MenuItem>
                                        <MenuItem key={7} value={`order by totalPrice asc`}>Price (ascending)</MenuItem>
                                    </Select>   
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <Input 
                                placeholder="Search Invoice"
                                name="keyword"
                                align="center"
                                onChange={keywordTransactionHandleChange}
                            />
                            <IconButton  >
                                <SearchOutlined />
                            </IconButton>
                        </Grid>
                    </Grid> 
                </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper className={classes.paper} >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl sx={{ m: 3, minWidth: 200 }}>
                                <InputLabel id="sort-by" >Sort By</InputLabel>
                                    <Select
                                        displayEmpty
                                        labelId="sort-by"
                                        id="1"
                                        defaultValue=""
                                        name="sortBy"
                                        onChange={selectSortUserHandler}
                                    >
                                        <MenuItem key={1} value={""} >Sort By</MenuItem>
                                        <MenuItem key={2} value={"order by rownumber asc"} >Ascending</MenuItem>
                                        <MenuItem key={3} value={"order by rownumber desc"} >Descending</MenuItem>
                                        <MenuItem key={4} value={"order by username asc"} >Username(ascending)</MenuItem>
                                        <MenuItem key={5} value={"order by username desc"}>Username (descending)</MenuItem>
                                        <MenuItem key={6} value={" order by name asc"} >Name (ascending)</MenuItem>
                                        <MenuItem key={7} value={" order by name desc"}>Name (descending)</MenuItem>
                                    </Select>   
                      </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Input 
                        placeholder="Search Users"
                        name="keyword"
                        align="center"
                        onChange={handleChangeKeywordUser}
                    />
                    <IconButton >
                         <SearchOutlined />
                    </IconButton>
                  </Grid>
                </Grid>         
              </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid direction="row" container justifyContent="space-evenly" alignItems="flex-end" spacing={2} >
                            <Grid item xs={3}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy/MM/dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='Select From'
                                    value={selectedDateFrom}
                                    onChange={handleDateChangeFrom}
                                />   
                            </Grid>                      
                            <Grid item xs={3}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy/MM/dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='To'
                                    value={selectedDateTo}
                                    onChange={handleDateChangeTo}
                                /> 
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={searchBtnHandler} > Search </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl >
                                    <InputLabel id="custom-select-label">Transaction Type</InputLabel>
                                        <Select
                                            displayEmpty
                                            labelId="custom-select-label"
                                            id="custom-select"
                                            label="Transaction Status"
                                            name="status"
                                            defaultValue=""
                                            onChange={selectCustomHandler}
                                        >
                                        <MenuItem key={1} value={""} >Transaction Type</MenuItem>
                                        <MenuItem key={2} value={"and isByPresciption = 1 "} >Custom Order</MenuItem>
                                        <MenuItem key={3} value={"and isByPresciption = 0 "} >Normal Order</MenuItem>
                                        </Select>
                                </FormControl>
                            </Grid>
                        </Grid>                     
                    </MuiPickersUtilsProvider>
                        
                </Paper>
            </Grid>
            <Grid item xs={5}>
                
            </Grid>
            <Grid item xs={7}>
                <Paper>
                    <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="styicky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell 
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth}}
                                     >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>   
                                {transaction
                                .map((item) => {
                                    return (
                                        <TableRow className={classes.link}  component={Link} to={`/transactiondetails/${item.id}`} hover role="checkbox" tabIndex={-1} key={item.id}>
                                            {columns.map((column) => {
                                                const value = item[column.id];               
                                                if (column.id === "created_at" ) {
                                                    const date =  moment(value).utc().format('DD/MM/YYYY')
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {date}
                                                        </TableCell>     
                                                    )  
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                    
                                                        
                                                    )

                                                }
                                                
                                             
                                            })}
                                        </TableRow>
                                    )
                                })}
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <Grid></Grid> */}
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 30]}
                      component="div"
                      count={totalTransaction}
                      rowsPerPage={transactionPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeTransactionPerPage}
                    />
                </Paper>
            </Grid>
            <Grid item xs={5}>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columnsUser.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { users
                                    .map((user) => {
                                        return (
                                            <TableRow className={classes.link} component={Link} to={`/usertransaction/${user.id}`} hover role="checkbox" key={user.id}>
                                                {columnsUser.map((column) => {
                                                    const value = user[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={totalUser}
                        rowsPerPage={userPerPage}
                        page={pageUser}
                        onPageChange={handleChangePageUser}
                        onRowsPerPageChange={handleChangeUserPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    </Container>
  )
}

export default UsersTransaction