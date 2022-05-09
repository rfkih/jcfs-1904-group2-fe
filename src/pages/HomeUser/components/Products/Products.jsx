import React,{useState} from 'react'
import { Grid, Box, Paper } from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import Product from './Product/Product'
import useStyles from './styles'
import Grow from '@mui/material/Grow';
import Zoom from '@mui/material/Zoom';
function Products(props) {
  const classes = useStyles();
  const { products, page, setPage, totalPage, checked } = props;
  
 


  const renderProducts = () => {
    

    return products.map((product) => (
      <Grid  item key={product.id} xs= {4} >
        <Paper elevation={0} className={classes.paper} key={product.id} >
          <Product key={product.id} product={product}/>
        </Paper> 
      </Grid>
    ));
  };


  return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
          <Zoom in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
            <Grid container justifyContent="center" spacing ={2}>
              {renderProducts()}
            </Grid>
          </Zoom>     
        <Box py={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPage}
            color="primary"
            page={page}
            variant="outlined"
            onChange={(e, value) => setPage(value)}
          />
        </Box>
    </main>
  )
}

export default Products