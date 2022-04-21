import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
import { makeStyles } from '@material-ui/core/styles';
import EditProducts from './component/EditProducts'
import OrderDetail from "./component/PendingOrder/OrderDetail/OrderDetail";
const useStyles = makeStyles( (theme) => {

  return {
      
      toolbar: theme.mixins.toolbar

  }

  
})

function HomeAdmin() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [deletedProducts, setDeletedProducts] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState ({})
    const [ page, setPage ] = useState(1)
    const [ productPerPage, setProductPerPage] = useState(4)
    const [totalPage, setTotalPage] = useState(1)
    const [ sort, setSort ] = useState('')
    const [ keyword, setKeyword] = useState('')
    const [ deleteState, setDeleteState] = useState(false)
    const [checked, setChecked] = useState(false)

  console.log(keyword);

    const fetchProducts = async () => {     
      try {
          const res = await axios.get("/products", {params: { pages:(`limit ${productPerPage} offset ${(page - 1)*productPerPage}`), keyword, sort, category: selectedCategory.category_id}})
          .then((res=>{
            const { data } = res;
            setProducts(data.result);
            setTotalPage(Math.ceil(data.count[0].count / productPerPage ))
            setChecked(true)
          }));
          
      } catch (error) {
          console.log(alert(error.message));
      }
  };


    const fetchDeletedProducts = async () => {
      try {
          const res = await axios.get("/products/deleted", {params: { pages:(`limit ${productPerPage} offset ${(page - 1)*productPerPage}`), keyword, sort, category: selectedCategory.category_id}});
          const { data } = res;
          setProducts(data.result);
          setTotalPage(Math.ceil(data.count[0].count / productPerPage ));
          setChecked(true)
      } catch (error) {
          console.log(alert(error.message));
      }
  };


  useEffect(() => {
    setChecked(false)
    if (!deletedProducts) {
      fetchProducts();
  }else{
    setChecked(false)
      fetchDeletedProducts();
  }
  }, [deletedProducts, deleteState, selectedCategory, page, keyword, sort])

  
  
  
  return (
    <>
    <div className={classes.toolbar}/>
      <EditProducts
        setDeletedProducts={setDeletedProducts}
        deletedProducts={deletedProducts}
        products={products} 
        setSelectedCategory={setSelectedCategory}
        page={page}
        setProductPerPage={setProductPerPage}
        totalPage={totalPage}
        setPage={setPage}
        setSort={setSort}
        setKeyword={setKeyword}
        checked={checked}
        setDeleteState={setDeleteState}
        deleteState={deleteState}
      />
    </>
    
  )
}

export default HomeAdmin