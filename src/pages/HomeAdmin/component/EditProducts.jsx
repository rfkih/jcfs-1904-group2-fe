import React from 'react'
import { Paper, Typography, Button} from '@material-ui/core'
import useStyles from './styles'
import AddProduct from './AddProduct/AddProduct'
import ProductsAdmin from './ProductsAdmin/ProductsAdmin'
import ProductManager from './ProductManager'


function EditProducts(props) {
    const { products, deletedProducts, setDeletedProducts, setSelectedCategory, setPage, totalPage, page, setSort, setKeyword  } = props;
    const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar}/>
      <AddProduct/>
      
      <ProductManager
        deletedProducts={deletedProducts}
        setDeletedProducts={setDeletedProducts}
        setSelectedCategory={setSelectedCategory}
        setPage={setPage}
        setSort={setSort}
        setKeyword={setKeyword}
        
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