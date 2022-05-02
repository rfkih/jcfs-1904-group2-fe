import React,{useState, useEffect} from 'react'
import useStyles from './styles.js'
import { Grid, Box, Container, Typography, Paper, Card, Select, InputBase, IconButton, FormControl, InputLabel, Divider, MenuItem, CardActions, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import axios from '../../../../utils/axios'
import {SearchOutlined} from '@material-ui/icons'
import {useSelector} from 'react-redux'
import CustomOrder from './CustomOrder/CustomOrder.jsx';
import { useParams } from "react-router-dom";
import Zoom from '@mui/material/Zoom';
import Pagination from "@material-ui/lab/Pagination";

import { Link, Navigate } from "react-router-dom";

function CustomOrders() {
    const params = useParams();
    const classes = useStyles();
    const {role, id} = useSelector((state) => {
        return state.auth;
      });
    const [order, setOrder] = useState([])
    const [checked, setChecked] = useState(true)
    const [ page, setPage ] = useState(1)
    const [ totalPage, setTotalPage] = useState(2)
    const [ orderPerPage, setOrderPerPage] = useState(5)

   


    const renderCustomOrder = () => {
    

        return order.map((order) => (
          <Grid  item key={order.id} xs= {12} >
            <Paper elevation={0} className={classes.paper} key={order.id} >
              <CustomOrder key={order.id} order={order}/>
            </Paper> 
          </Grid>
        ));
      };

    // const onButtonClick = () => {
    //     <Navigate/>
    // }
    
    const fetchCustomOrders = async () => {
        try {
            await axios.get(`/customorders/user/${id}`, {params: { pages:(`limit ${orderPerPage} offset ${(page - 1)*orderPerPage}`), id}})
            .then((res=>{
              const { data } = res;
              setOrder(data.result);
              setTotalPage(Math.ceil(data.count[0].count / orderPerPage ))
              setChecked(true)
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
      setChecked(false)
        fetchCustomOrders();
    }, [page])


  return (
    <Container className={classes.content} >
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
            <Grid item xs={3}> 
               <Paper variant="outlined" >
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Button className={classes.button} fullWidth variant='contained' color='secondary' component={Link} to='/customorder/upload' >Create New Order</Button>
                      <Typography variant="h5" component="div" >
                        Filter Custom Order
                      </Typography>             
                      <br />
                      <FormControl sx={{ m: 1, minWidth: 420 }}>
                        <InputLabel id="category-select">Status</InputLabel>
                          <Select
                            displayEmpty
                            labelId="category-select"
                            id="1"
                            defaultValue=""
                            name="category_id"
                            label="Age"
                            // onChange={handleSelectedCategory}
                          >
                            <MenuItem key={1} value="">
                              Status
                            </MenuItem>                
                          </Select>
                      </FormControl>
                    </CardContent>      
                  </Card>
                  <Divider light />
                  {/* Sort */}
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" >
                        Sort Custom Order
                      </Typography>
                      <FormControl sx={{ m: 3, minWidth: 200 }}>
                        <InputLabel id="sort-by" >Sort By</InputLabel>
                            <Select
                              displayEmpty
                              labelId="sort-by"
                              id="1"
                              defaultValue=""
                              name="sortBy"
                              // onChange={selectSortHandler}
                            >
                              <MenuItem value="" > Sort By </MenuItem>
                              <MenuItem value="order by price ASC" > Lowest Price </MenuItem>
                              <MenuItem value="order by price DESC" > Highest Price </MenuItem>
                              <MenuItem value="order by productName ASC" > A - Z </MenuItem>
                              <MenuItem value="order by productName DESC" > Z - A</MenuItem>
                            </Select>   
                      </FormControl>
                    </CardContent>
                  </Card>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Paper>
                    <Zoom in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
                        <Grid container justifyContent="center" spacing ={2}>
                            {renderCustomOrder()}
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

export default CustomOrders