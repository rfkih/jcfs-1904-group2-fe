import React,{useState} from 'react'
import { Paper, Typography, Button} from '@material-ui/core'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import useStyles from './styles'
import AddProduct from './AddProduct/AddProduct'
import ProductsAdmin from './ProductsAdmin/ProductsAdmin'
import ProductManager from './ProductManager'


function EditProducts(props) {
    const { products, deletedProducts, checked, setDeletedProducts, setSelectedCategory, setPage, totalPage, page, setSort, setKeyword, deleteState, setDeleteState } = props;
    const classes = useStyles();
   

   
  return (
    <>
      <div className={classes.toolbar}/>
      <AddProduct />
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
        checked={checked}
        deleteState={deleteState}
        setDeleteState={setDeleteState}
      />  
    </>
  )
}

export default EditProducts