import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import axios from '../../../../../../utils/axios'
import useStyles from './style'
import { useParams } from "react-router-dom";


function ItemSoldDetail() {
    const classes = useStyles();
    const params = useParams();
    const [productDetail, setProductDetail] = useState([])
    const [category, setCategory] = useState([])
    const [page, setPage] = useState(0);
    const [product, setProduct] = useState([])
    const [productPerPage, setProductPerPage] = useState(10);
    const [detail, setDetail] = useState({})
    const getTransactionByProduct = async () => { 
        try {
            const res = await axios.get(`transactiondetails/product/${params.productId}`, {params: {id: params.productId}});
            const  {data} = res
            setProductDetail(data.result[0]);
            setCategory(data.category[0]);
            setProduct(data.result)
            setDetail(data.total[0]);
        } catch (error) {
            console.log(alert(error.message));
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

    const handleChangeItemPerPage = (event) => {
        setProductPerPage(+event.target.value);
        setPage(0);
      };
    
    useEffect(() => {
        getTransactionByProduct();
    },[])

    const columns = [
        { id:'transaction_id', label: 'Transaction id',align: 'right', minWidth: 70},
        { id:'productName', label: 'Product Name',align: 'right', minWidth: 170},
        { id:'price', label: 'Price', align: 'right', minWidth: 100},
        { id:'quantity', label: 'Quantity', align: 'right', minWidth: 100},
        { id:'totalPrice', label: 'Total Price', align: 'right', minWidth: 100},
        { id:'created_at', label: 'Date', align: 'right', minWidth: 180},
    ]


  
    console.log(detail);
  return (
    <Container> 
        <Paper className={classes.content} >
            <Card className={classes.card} >
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
                                <Typography>: {productDetail.id}</Typography>
                                <Typography>: {productDetail.productName}</Typography>
                                <Typography>: {category.categoryName}</Typography>
                                <Typography>: {productDetail.productDescription}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            height = "200"
                            image={productDetail.productImg}
                        />
                    </Grid>
                </Grid>
            </Card>
            <Paper>
                <Typography>Total Bought : {detail.total_bought} pcs</Typography>
                <Typography>Total Amountt : Rp.{detail.total_amount}</Typography>
            </Paper>
            <Paper>
                <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="sticky table">
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
                                {product.slice(page * productPerPage, page * productPerPage + productPerPage)
                                    .map((item) => {
                                        return (
                                            <TableRow hover role ="checkbox" key={item.id}>
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
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={product.length}
                        rowsPerPage={productPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeItemPerPage}
                    />
            </Paper>
        </Paper>
    </Container>

  )
}

export default ItemSoldDetail