import React from 'react'
import { Grid } from '@material-ui/core';

import ProductAdmin from './ProductAdmin/ProductAdmin'

import useStyles from './styles'

function ProductsAdmin(props) {
  const classes = useStyles();
  const { paginationState, products } = props;
  const { page, itemsPerPage } = paginationState;

  const renderProducts = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedProducts = products.slice(startIndex, endIndex);

    return slicedProducts.map((product) => (
      <Grid item key={product.id} xs= {12} sm={6} md={4} lg={3}>
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
    </main>
  )
}

export default ProductsAdmin