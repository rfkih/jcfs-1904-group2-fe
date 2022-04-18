import React, {useState, useEffect} from 'react'
import useStyles from './style'
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { useParams } from "react-router-dom";
import axios from '../../../../../utils/axios'
import moment from 'moment'

function StocksDetail() {
    const classes = useStyles();
    const params = useParams();
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState('')
    const [stocks, setStocks] = useState([])
    const [detailedStocks, setDetailedStocks] = useState([])
    const [log, setLog] = useState([])

   
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/products/${params.productId}`,{ params: { id: params.productId } } )
            const {data} = res
            setCategory(data.category[0].categoryName);
            setProduct(data.result[0]);
            
        } catch (err) {
        console.log({ err });       
        }
    }

    const fetchStocks = async () => {
        try {
            const res = await axios.get(`/stocks/detail/${params.productId}`,{ params: { id: params.productId } } );
            const { data } = res;
            setLog(data.data);
            setDetailedStocks(data.result[0]);
            setStocks(data.calculatedStock);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchStocks();
    },[])


    const columns = [
        { id:'id', label: 'Data Id',align: 'right', minWidth: 70},
        { id:'status', label: 'Status',align: 'right', minWidth: 70},
        { id:'stock_in', label: 'Stock In', align: 'right', minWidth: 70},
        { id:'stock_out', label: 'Stock Out', align: 'right', minWidth: 70},
        { id:'user_id', label: 'User Id', align: 'right', minWidth: 70},
        { id:'created_at', label: 'Date', align: 'right', minWidth: 100},
    ]

  return (
    <Container>
        <Paper className={classes.content}>
            <Card className={classes.card}>
            <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography>Product Id</Typography>
                                <Typography>Product Name </Typography>
                                <Typography>Product Category </Typography>
                                <Typography>Product Description</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>: {product.id} </Typography>
                                <Typography>: {product.productName}</Typography>
                                <Typography>: {category} </Typography>
                                <Typography>: {product.productDetails}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            height = "200"
                            src={product.productIMG}
                        />
                    </Grid>
                </Grid>
            </Card>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Card>
                            { product.isLiquid === 0 ? 
                                 <CardContent>
                                     <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     isLiquid? : {product.isLiquid}
                                    </Typography>
                                 <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     Box Available : {detailedStocks.qtyBoxAvailable}
                                 </Typography>
                                 <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     Strips Available : {detailedStocks.qtyStripsavailable}
                                 </Typography>
                                 <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     Total Strips Available : {stocks.stockNonLiquid}
                                 </Typography>
                                </CardContent>   
                                :
                                 <CardContent>
                                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     isLiquid? : {product.isLiquid}
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     Box Available : {detailedStocks.qtyBoxAvailable}
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     Bottle Available : {detailedStocks.qtyBottleAvailable}
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                     Total Bottle Available : {stocks.stockLiquid}
                                    </Typography>
                                </CardContent> 
                        }
                           
                        </Card>  
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {log
                                    .map((item) => {
                                        return (
                                            <TableRow hover role ="checkbox" key={item.id}>
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

                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    </Container>
  )
}

export default StocksDetail