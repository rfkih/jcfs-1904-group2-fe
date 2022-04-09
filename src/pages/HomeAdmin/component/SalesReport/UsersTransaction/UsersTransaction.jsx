
import React, {useState, useEffect} from 'react'
import axios from '../../../../../utils/axios';
import { Typography,Container, Grid, Card, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {SearchOutlined} from '@material-ui/icons'

function UsersTransaction() {
    const [transaction, setTransaction] = useState([])
    const [page, setPage] = useState(0)
    const [pageUser, setPageUser] = useState(0)
    const [userPerPage, setUserPerPage] = useState(10)
    const [transactionPerPage, setTransactionPerPage] = useState(10)
    const [status, setStatus] = useState({})
    const [sortTransaction, setSortTransaction] = useState([])
    const [formState, setFormState] = useState({
        keyword: "",
      });
    const [ users, setUsers] = useState([])
    const [ sortUser, setSortUser] = useState([])
    const [formStateUser, setFormStateUser] = useState({
      keyword: "",
    }); 
    



    const fetchTransaction = async () => {
        try {
        
            const res = await axios.get("/transaction", {params: (status)});
            const { data } = res;
            setTransaction(data);
            setSortTransaction(data);
           
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect (() => {
        fetchTransaction();
    },[status]);


    const fetchUser = async () => {
        try {
            const res = await axios.get("/users");
            const {data} = res;
            setUsers(data.result)
            setSortUser(data.result)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchUser();
    },[])

    console.log(users);

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
        setStatus({[e.target.name]: e.target.value})
      };

    const handleChangeKeyword = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      };

      const handleChangeKeywordUser = (e) => {
        setFormStateUser({ ...formStateUser, [e.target.name]: e.target.value });
      };

    const btnSearchHandler = () => {
        filterInvoice(formState);
      };

      const btnSearchUserHandler = () => {
        filterUser(formStateUser);
      };



    const filterInvoice = (formData) => {
        const resultFilter = transaction.filter((item) => {
            
          const invoice = item.invoice.toLowerCase();
          const keyword = formData.keyword.toLowerCase();
          return (
                invoice.includes(keyword)
          );
        });
        
        setSortTransaction(resultFilter);
      };

      const filterUser = (formData) => {
        const resultFilter = users.filter((item) => {
            
          const username = item.username.toLowerCase();
          const keyword = formData.keyword.toLowerCase();
          return (
                username.includes(keyword)
          );
        });
        
        setSortUser(resultFilter);
      };
     

    const columns = [
        { id:'id', label: 'Transaction Id', align: 'right', minWidth: 80},
        { id:'invoice', label: 'Invoice', align: 'right', minWidth: 110},
        { id:'user_id', label: 'User Id',align: 'right', minWidth: 90},
        { id:'transactionStatus', label: 'Transaction Status', align: 'right', minWidth: 110},
        { id:'totalPrice', label: 'Total Price' ,align: 'right', minWidth: 90},
    ]

    const columnsUser = [
        { id:'id', label: 'User Id', align: 'right', minWidht: 80},
        { id:'username', label: 'Username', align: 'right', minWidth: 100},
        { id:'name', label: 'Name', align: 'right', minWidth: 100},
        { id:'email', label: 'E-Mail', align: 'right', minWidth: 100},
    ]

    const sortingTransaction = (sortValue) => {
        const rawData = [...transaction];
    
        switch (sortValue) {
          case "transactionascending":
            rawData.sort((a, b) => a.id - b.id);
            break;
          case "transactiondescending":
            rawData.sort((a, b) => b.id - a.id);
            break;
          case "useridascending":
            rawData.sort((a, b) => a.user_id - b.user_id);
            break;
          case "useriddescending":
            rawData.sort((a, b) => b.user_id - a.user_id);
            break;
            case "priceascending":
            rawData.sort((a, b) => a.totalPrice - b.totalPrice);
            break;
          case "pricedescending":
            rawData.sort((a, b) => b.totalPrice - a.totalPrice);
            break;
        }
        setSortTransaction(rawData)
      };
    console.log(users);
      const sortingUser = (sortValue) => {
        const rawData = [...users];
    
        switch (sortValue) {
          case "idascending":
            rawData.sort((a, b) => a.id - b.id);
            break;
          case "iddescending":
            rawData.sort((a, b) => b.id - a.id);
            break;
          case "usernameascending":
            rawData.sort((a, b) => {
                if (a.username < b.username) {
                  return -1;
                } else if (a.username > b.username) {
                  return 1;
                } else {
                  return 0;
                }
              });
              break;
          case "usernamedescending":
            rawData.sort((a, b) => {
                if (a.username > b.username) {
                  return -1;
                } else if (a.username < b.username) {
                  return 1;
                } else {
                  return 0;
                }
              });
              break;
          case "nameascending":
                rawData.sort((a, b) => {
                    if (a.name < b.name) {
                      return -1;
                    } else if (a.name > b.name) {
                      return 1;
                    } else {
                      return 0;
                    }
                  });
                  break;
          case "namedescending":
            rawData.sort((a, b) => {
                if (a.name < b.name) {
                  return 1;
                } else if (a.name > b.name) {
                  return -1;
                } else {
                  return 0;
                }
              });
              break;
        }
        setSortUser(rawData)
      };

    

    const selectSortHandler = (e) => {
          
        sortingTransaction(e.target.value);
      };

    const selectSortUserHandler = (e) => {
          
        sortingUser(e.target.value);
      };

     


  return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl >
                                <InputLabel id="range-select-label">Transaction Status</InputLabel>
                                    <Select
                                        labelId="range-select-label"
                                        id="range-select"
                                        label="Transaction Status"
                                        name="status"
                                        defaultValue=""
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem key={1} value={""} >Default</MenuItem>
                                        <MenuItem key={2} value={"paid"} >Paid</MenuItem>
                                        <MenuItem key={3} value={"failed"} >Failed</MenuItem>
                                        <MenuItem key={4} value={"sent"} >Sent</MenuItem>
                                        <MenuItem key={5} value={"complete"}>Complete</MenuItem>
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 3, minWidth: 200 }}>
                                <InputLabel id="sort-by" >Sort By</InputLabel>
                                    <Select
                                        labelId="sort-by"
                                        id="1"
                                        defaultValue=""
                                        name="sortBy"
                                        onChange={selectSortHandler}
                                    >
                                        <MenuItem key={1} value={""} >Default</MenuItem>
                                        <MenuItem key={2} value={"transactionascending"} >Transaction Id (ascending)</MenuItem>
                                        <MenuItem key={3} value={"transactiondescending"} >Transaction Id (descending)</MenuItem>
                                        <MenuItem key={4} value={"useridascending"} >User Id (ascending)</MenuItem>
                                        <MenuItem key={5} value={"useriddescending"}>User Id (descending)</MenuItem>
                                        <MenuItem key={6} value={"priceascending"} >Price (ascending)</MenuItem>
                                        <MenuItem key={7} value={"pricedescending"}>Price (descending)</MenuItem>
                                    </Select>   
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <Input 
                                placeholder="Search Invoice"
                                name="keyword"
                                align="center"
                                onChange={handleChangeKeyword}
                            />
                            <IconButton  onClick={btnSearchHandler} >
                                <SearchOutlined />
                            </IconButton>
                        </Grid>
                    </Grid> 
                </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl sx={{ m: 3, minWidth: 200 }}>
                                <InputLabel id="sort-by" >Sort By</InputLabel>
                                    <Select
                                        labelId="sort-by"
                                        id="1"
                                        defaultValue=""
                                        name="sortBy"
                                        onChange={selectSortUserHandler}
                                    >
                                        <MenuItem key={1} value={""} >Default</MenuItem>
                                        <MenuItem key={2} value={"idascending"} >User Id (ascending)</MenuItem>
                                        <MenuItem key={3} value={"iddescending"} >User Id (descending)</MenuItem>
                                        <MenuItem key={4} value={"usernameascending"} >Username(ascending)</MenuItem>
                                        <MenuItem key={5} value={"usernamedescending"}>Username (descending)</MenuItem>
                                        <MenuItem key={6} value={"nameascending"} >Name (ascending)</MenuItem>
                                        <MenuItem key={7} value={"namedescending"}>Name (descending)</MenuItem>
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
                    <IconButton onClick={btnSearchUserHandler} >
                         <SearchOutlined />
                    </IconButton>
                  </Grid>
                </Grid>         
              </Paper>
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
                                {sortTransaction.slice(page * transactionPerPage, page * transactionPerPage + transactionPerPage)
                                .map((item) => {
                                    return (
                                        <TableRow component={Link} to={`/transactiondetails/${item.id}`} hover role="checkbox" tabIndex={-1} key={item.id}>
                                            {columns.map((column) => {
                                                const value = item[column.id];
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
                        count={transaction.length}
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
                                { sortUser.slice(pageUser * userPerPage, pageUser * userPerPage + userPerPage)
                                    .map((user) => {
                                        return (
                                            <TableRow component={Link} to={`/usertransaction/${user.id}`} hover role="checkbox" key={user.id}>
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
                        count={users.length}
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