import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import axios from '../../../../../../utils/axios'
import useStyles from './style'
import { useParams } from "react-router-dom";
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers'
import moment from 'moment'

function ItemSoldDetail() {
    const classes = useStyles();
    const params = useParams();
    const [productDetail, setProductDetail] = useState([])
    const [category, setCategory] = useState([])
    const [page, setPage] = useState(0);
    const [product, setProduct] = useState([])
    const [productPerPage, setProductPerPage] = useState(1);
    const [detail, setDetail] = useState({})
    const [sort, setSort] = useState(``)
    const [stocks, setStocks] = useState([])
    const [stock, setStock] = useState(0)
    const [selectedDateFrom, setSelectedDateFrom] = useState( (`2018-04-04`))
    const [selectedDateTo, setSelectedDateTo] = useState( new Date())
    const [productCount, setProductCount] = useState(1)

   

    const getTransactionByProduct = async () => { 
        const setDateFrom = moment(selectedDateFrom).utc().format('YYYY-MM-DD')
        const setDateTo = moment(selectedDateTo).utc().format('YYYY-MM-DD')
        const date = `and created_at between '${setDateFrom}' and '${setDateTo} 23:59:59'`
        try {
            const res = await axios.get(`transactiondetails/product/${params.productId}`, { params: { pages:(`limit ${productPerPage} offset ${(page) * productPerPage}`), date, sort , id: params.productId}});
            const  {data} = res
            setProductDetail(data.product[0]);
            setCategory(data.category[0]);
            setProduct(data.result)
            setDetail(data.total[0]);
            setProductCount(data.count[0].count);
        } catch (error) {
            console.log(alert(error.message));
        }
    };
    
    const fetchStocks = async () => {
        try {
            const res = await axios.get(`/stocks/${params.productId}`,{ params: { id: params.productId } } );
            const { data } = res;
            
            setStocks(data.calculatedStock);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    

    useEffect(() => {
        fetchStocks();
    }, [])

    const onClickSearch = () => {
        getTransactionByProduct();
    }

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date)
    }
    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date)
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

    const handleChangeItemPerPage = (event) => {
        setProductPerPage(+event.target.value);
        setPage(0);
      };
    
    useEffect(() => {
        getTransactionByProduct();
    },[sort, page, productPerPage])
    

    useEffect(()=> {

        if (productDetail.isLiquid) {
          setStock(stocks.stockLiquid)
        }else{
          setStock(stocks.stockNonLiquid)
        }
      }, [stocks])

    const selectSortHandler = (e) => {
        setSort(e.target.value);
      };

    
    const columns = [
        { id:'transaction_id', label: 'Transaction id',align: 'right', minWidth: 70},
        { id:'productName', label: 'Product Name',align: 'right', minWidth: 170},
        { id:'price', label: 'Price', align: 'right', minWidth: 100},
        { id:'quantity', label: 'Quantity', align: 'right', minWidth: 100},
        { id:'totalPrice', label: 'Total Price', align: 'right', minWidth: 100},
        { id:'created_at', label: 'Date', align: 'right', minWidth: 180},
    ]


  
    
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
                                <Typography>: {productDetail.productDetails}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            height = "200"
                            image={productDetail.productIMG}
                        />
                    </Grid>
                </Grid>
            </Card>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography>Total Bought : {detail.total_bought} pcs</Typography>
                        <Typography>Total Amountt : Rp.{detail.total_amount}</Typography>
                        <Typography>Outstanding Stocks: {stock} {productDetail.isLiquid === 1 ? <>Bottle</> : <>Strips</>} </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <FormControl sx={{ m: 3, minWidth: 200 }}>
                        <InputLabel id="sort-by" >Sort By</InputLabel>
                            <Select
                                labelId="sort-by"
                                id="1"
                                defaultValue=""
                                name="sortBy"
                                onChange={selectSortHandler}    
                            >
                                <MenuItem key={0} value="" > Default </MenuItem>
                                <MenuItem key={1} value="order by created_at desc" > Latest </MenuItem>
                                <MenuItem key={2} value="order by created_at asc" > Oldest </MenuItem>
                                <MenuItem key={2} value="order by created_at asc" > Stock In (Descending) </MenuItem>
                            </Select>   
                    </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid direction="row" container justifyContent="space-evenly" alignItems="flex-end" spacing={2}>
                            <Grid item xs={5}>
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
                            <Grid item xs={5}>
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
                                <Button onClick={onClickSearch}> Search </Button>
                            </Grid>
                        </Grid>                 
                    </MuiPickersUtilsProvider>                      
                    </Grid>
                </Grid>    
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
                                {product
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
                    <TablePagination
                        rowsPerPageOptions={[1, 10, 15]}
                        component="div"
                        count={productCount}
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