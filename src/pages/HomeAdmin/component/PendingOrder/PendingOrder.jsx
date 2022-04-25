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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeOrdersPerPage = (event) => {
        setOrdersPerPage(+event.target.value);
        setPage(0);
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

    console.log(activeOrder);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/customorders")
            const { data } = res;
           setOrders(data)
           console.log(data);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchOrders();
    },[]);

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
        <Paper>
            
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
                        <Typography>Ther is no Active order yet!</Typography>
                    </CardContent>
                </Card>    
            }          
        </Paper>
        <Typography>Pending orders </Typography>
        <Paper>
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
                        {orders.slice(page * ordersPerPage, page * ordersPerPage + ordersPerPage)
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={orders.length}
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