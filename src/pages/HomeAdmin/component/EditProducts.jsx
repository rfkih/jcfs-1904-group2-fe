import React from 'react'
import { Paper, Typography, Button} from '@material-ui/core'
import useStyles from './styles'
import AddProduct from './AddProduct/AddProduct'
import ProductsAdmin from './ProductsAdmin/ProductsAdmin'
import ProductManager from './ProductManager'


function EditProducts(props) {
    const { products, sortProducts,filterProducts,deletedProducts, setDeletedProducts, setSelectedCategory, setPage, totalPage, page  } = props;
    const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar}/>
      <AddProduct/>
      <Typography variant="h4" align="center"> Edit Product </Typography>
      <ProductManager
        filterProducts={filterProducts}
        sortProducts={sortProducts}
        deletedProducts={deletedProducts}
        setDeletedProducts={setDeletedProducts}
        setSelectedCategory={setSelectedCategory}
        setPage={setPage}
      />
      <ProductsAdmin
        products={products}
        deletedProducts={deletedProducts}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
      />  
    </>
  )
}

export default EditProducts