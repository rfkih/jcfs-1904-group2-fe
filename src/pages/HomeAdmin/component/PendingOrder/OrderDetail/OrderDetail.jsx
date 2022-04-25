import React,{useState, useEffect, useContext} from 'react'
import useStyles from './styles'
import { Link, useLocation, useNavigate, Navigate} from 'react-router-dom';
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";
import {CartContext} from '../../../../../helper/Context'
import { set } from 'date-fns/esm';


function OrderDetail() {
    const {userId, setUserId, orderId, setOrderId} = useContext(CartContext)
    const classes = useStyles();
    const [order, setOrder] = useState({})
    const params = useParams();
    const [isApproved, setIsApproved] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState ({})
    const [ page, setPage ] = useState(1)
    const [ productPerPage, setProductPerPage] = useState(20)
    const [totalPage, setTotalPage] = useState(1)
    const [ sort, setSort ] = useState('')
    const [ keyword, setKeyword] = useState('')
    const [products, setProducts] = useState([]);


 
    const isApprovedHandlerClick = () => {
        isApprovedMessage();
    }

  

    const fetchOrderById = async () => {
        try {
            const res = await axios.get(`/customorders/${params.orderId}`, {params: {id: params.orderId}});
            const  {data} = res
            setOrder(data[0])
           
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const isApprovedMessage = async () => {
        try {
            const res = await axios.put(`/customorders/${params.orderId}`, {params: { isApproved, id: params.orderId}} );
            const  {data} = res
            console.log(res);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    

    useEffect(() => {
        if (isApproved) {
            setUserId(order.user_id)
            setOrderId(order.id)
            isApprovedMessage();
        } else {;
            setUserId(0)
            setOrderId(0)
        }
    },[isApproved])


  


    useEffect(() => {
        fetchOrderById();
    },[])

    if (userId) {
        return <Navigate to="/orders" replace />;
    }

  return (
      <Container>
          <div className={classes.toolbar}/>
            <Paper className={classes.content}>
                <Grid container justifyContent="space-around" spacing={2}>
                    <Grid
                    container  
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center" 
                     item xs={5}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="Doctor Prescription"
                            height="400"
                            image={order.image}
                        >

                        </CardMedia>
                        <Typography variant="h6" component="div">Notes</Typography>
                            <Typography variant="body1">{order.notes}</Typography>
                        <CardActions>
                            {isApproved ? <>
                            <Typography> Select Drugs </Typography>
                            <Button onClick={() => {setIsApproved(false)}}> Back </Button>
                            </> : <>
                            <Button onClick={() => {setIsApproved(true)}}>Approve</Button>
                            <Button onClick={isApprovedHandlerClick}>Reject</Button>
                            </>}
                            <Button> Open Image</Button>
                        </CardActions>
                    </Card>

                    </Grid>
                    <Grid item xs={5}>
                        {isApproved ? 
                    <>
                    <Typography>This Order Has Been Approved And User </Typography>
                    </> 
                    : null}

                    </Grid>

                </Grid>
               
                


            </Paper>
      </Container>
    
  )
}

export default OrderDetail