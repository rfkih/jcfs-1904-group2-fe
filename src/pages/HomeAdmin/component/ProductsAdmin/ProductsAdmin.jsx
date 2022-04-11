import React from 'react'
import { Grid, Box} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import ProductAdmin from './ProductAdmin/ProductAdmin'

import useStyles from './styles'

function ProductsAdmin(props) {
  const classes = useStyles();
  const { 
    // paginationState, 
    products, deletedProducts, page, totalPage, setPage} = props;
  // const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    
    return products.map((product) => (
      <Grid item key={product.id} xs= {3} >
        <ProductAdmin product={product}/>
      </Grid>
    ));
  };

  return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justifyContent="center" spacing ={4}>
          {renderProducts()}
        </Grid>
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