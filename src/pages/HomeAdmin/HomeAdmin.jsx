import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
import { makeStyles } from '@material-ui/core/styles';
import EditProducts from './component/EditProducts'
import AddProduct from "./component/AddProduct/AddProduct";
import SalesReport from "./component/SalesReport/SalesReport";
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

    console.log(keyword);

    const fetchProducts = async () => {
     
      try {
          const res = await axios.get("/products", {params: { keyword, sort, productPerPage, OFFSET: (page - 1)*productPerPage, category: selectedCategory.category_id}})
          .then((res=>{
            const { data } = res;
            setProducts(data.result);
            setTotalPage(Math.ceil(data.count[0].count / productPerPage ))
            
          }));
          
      } catch (error) {
          console.log(alert(error.message));
      }
  };


    const fetchDeletedProducts = async () => {
      try {
          const res = await axios.get("/products/deleted", {params: { keyword, sort, productPerPage, OFFSET: (page - 1)*productPerPage, category: selectedCategory.category_id}});
          const { data } = res;
          setProducts(data.result);
          setTotalPage(Math.ceil(data.count[0].count / productPerPage ));
          console.log(Math.ceil(data.count[0].count / productPerPage ));
      } catch (error) {
          console.log(alert(error.message));
      }
  };


  useEffect(() => {
    if (!deletedProducts) {
      fetchProducts();
  }else{
      fetchDeletedProducts();
  }
  }, [deletedProducts, selectedCategory, page, keyword, sort])

  




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
      />
    </>
    
  )
}

export default HomeAdmin