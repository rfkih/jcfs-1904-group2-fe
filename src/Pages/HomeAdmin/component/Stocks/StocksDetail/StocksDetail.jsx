import React, {useState, useEffect} from 'react'
import useStyles from './style'
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { useParams } from "react-router-dom";
import axios from '../../../../../utils/axios'

function StocksDetail() {
    const classes = useStyles();
    const params = useParams();
    const [product, setProduct] = useState({})

  

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/products/${params.productId}`,{ params: { id: params.productId } } )
            const {data} = res
            console.log(data.result);
            setProduct(data.result[0]);
            
        } catch (err) {
        console.log({ err });       
        }
    }

    useEffect(() => {
        fetchProducts();
    },[])
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
                                <Typography>: </Typography>
                                <Typography>: {product.productDetails}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            height = "200"
                          
                        />
                    </Grid>
                </Grid>

            </Card>

        </Paper>
    </Container>
  )
}

export default StocksDetail