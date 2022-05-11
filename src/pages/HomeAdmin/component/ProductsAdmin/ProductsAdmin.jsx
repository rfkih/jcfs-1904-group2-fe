import React, {useState} from 'react'
import { Grid, Box, Paper} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import ProductAdmin from './ProductAdmin/ProductAdmin'
import Zoom from '@mui/material/Zoom';
import useStyles from './styles'

function ProductsAdmin(props) {
  const classes = useStyles();
  const { products, deletedProducts, page, Button, totalPage, setPage, checked, deleteState, setDeleteState} = props;
  

  
  

  const renderProducts = () => {
    
    return products.map((product) => (
      <Grid item key={product.id} xs= {3} >
        <Paper elevation={0} className={classes.paper}>
          <ProductAdmin deletedProducts={deletedProducts} product={product} deleteState={deleteState} setDeleteState={setDeleteState}/>
        </Paper>  
      </Grid>
    ));
  };

  return (
    <main className={classes.content}>
      
      <div className={classes.toolbar}/>
          <Zoom in={checked} style={{ transitionDelay: checked ? '150ms' : '0ms' }}>
            <Grid container justifyContent="center" spacing ={4}>
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

export default ProductsAdmin