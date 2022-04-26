import React,{useState, useEffect, useContext} from 'react'
import useStyles from './styles'
import axios from '../../../../utils/axios'
import { Typography,Container, Grid, Card, CardContent,InputBase, CardMedia, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {CartContext} from '../../../../helper/Context'
import { useParams } from "react-router-dom";
import moment from 'moment'


function PendingOrder() {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [ordersPerPage, setOrdersPerPage] = useState(10);
    const {userId, orderId, setUserId, setOrderId} = useContext(CartContext)
    const params = useParams();
    const [activeOrder, setActiveOrder] = useState({})
    const [status, setStatus] = useState(`where status = 'waiting'`)
    const [sort, setSort] = useState(`order by created_at desc`)
    const [orderCount, setOrderCount] = useState(2)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeOrdersPerPage = (event) => {
        setOrdersPerPage(+event.target.value);
        setPage(0);
      };


      const handleChangeStatus = (e) => {
        setStatus(e.target.value)
      };
      const selectSortHandler = (e) => {    
        setSort(e.target.value);
        };

      const fetchOrderByUserId = async () => {
        try {
            const res = await axios.get(`/customorders/${orderId}`, {params: {id: params.orderId}});
            const  {data} = res
            setActiveOrder(data[0])
           
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    
    const cancelOrder = async () => {
        try {
            const res = await axios.put(`/customorders/${orderId}`, {params: { cancel: true , orderId}} );
            const  {data} = res
            console.log(res);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const onCancelClick = () => {
        cancelOrder();
        setUserId(0)
        setOrderId(0)
    }

    useEffect(() =>{
        if(userId) {
            fetchOrderByUserId();
        }
    },[orderId])

    

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/customorders", {params: { sort, status, pages:(`limit ${ordersPerPage} offset ${(page) * ordersPerPage}`)}})
            const { data } = res;
           setOrders(data.result)
           setOrderCount(data.count[0].count);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchOrders();
    },[sort, status, page, ordersPerPage]);

    const columns = [
        { id:'id', label: 'Id', align: 'right', minWidth: 100},
        { id:'user_id', label: 'User Id', align: 'right', minWidth: 100},
        { id:'status', label: 'Status',align: 'right', minWidth: 100},
        { id:'notes', label: 'Notes',align: 'right', minWidth: 280},
        { id:'created_at', label: 'Order Date', align: 'right', minWidth: 100},
    ]


  return (
    <Container>
        <div className={classes.toolbar}/>
        <Paper elevation={0} className={classes.paper}>
            
            {userId ?
                <Card>
                    <Typography>Current Active Order : </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <CardContent>
                                <Typography variant="subtitle1">Order Id : {orderId}</Typography>
                                <Typography variant="subtitle1">User Id : {userId}</Typography>
                                <Typography variant="subtitle1">Status : {activeOrder.status}</Typography>
                                <Typography variant="subtitle1">Order Date : {activeOrder.created_at}</Typography>
                                <Typography variant="subtitle1">Notes : {activeOrder.notes}</Typography>
                            </CardContent>
                        </Box>
                            <Button onClick={onCancelClick}>Cancel this order</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={activeOrder.image}
                                alt="Picture"
                            />

                        </Grid>
                    </Grid>
                </Card> : 
                <Card>
                    <CardContent>
                        <Typography variant='h6'>There is no Active order yet!</Typography>
                    </CardContent>
                </Card>    
            }          
        </Paper>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper} >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl >
                                <InputLabel id="range-select-label">Order Status</InputLabel>
                                    <Select
                                        displayEmpty
                                        labelId="range-select-label"
                                        id="range-select"
                                        label="Transaction Status"
                                        name="status"
                                        defaultValue=""
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem key={1} value={""} >Order Status</MenuItem>
                                        <MenuItem key={2} value={"where status = 'waiting'"} >Waiting</MenuItem>
                                        <MenuItem key={3} value={"where status = 'rejected'"} >Rejected</MenuItem>
                                        <MenuItem key={4} value={"where status = 'approved'"} >Approved</MenuItem>                                
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
                                        <MenuItem key={4} value={`order by created_at desc`} >Latest</MenuItem>
                                        <MenuItem key={5} value={`order by created_at asc`}>Oldest</MenuItem>
                                    </Select>   
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                    </Grid> 
                </Paper>
            </Grid>
       </Grid>
        <Paper className={classes.paper}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.link}>
                        {orders
                            .map((order) => {
                                return (
                                    <TableRow  component={userId ? 'text' : Link} to={`/orders/${order.id}`} hover role="checkbox" key={order.id}>
                                        {columns.map((column) => {
                                                    const value = order[column.id];
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={orderCount}
                rowsPerPage={ordersPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeOrdersPerPage}
            />
        </Paper>
    </Container>
  )
}

export default PendingOrder 