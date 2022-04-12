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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [deletedProducts, setDeletedProducts] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState ({})
    const [ page, setPage ] = useState(1)
    const [ productPerPage, setProductPerPage] = useState(4)
    const [totalPage, setTotalPage] = useState(1)
    const [ sort, setSort ] = useState('')
    const [ keyword, setKeyword] = useState('')

    

    const fetchProducts = async () => {
     
      try {
          const res = await axios.get("/products", {params: { page, productPerPage, OFFSET: (page - 1)*productPerPage, category: selectedCategory.category_id}})
          .then((res=>{
            const { data } = res;
            setProducts(data.result);
            setSortedProducts(data.result);
            setFilteredProducts(data.result);
            setTotalPage(Math.ceil(data.count[0].count / productPerPage ))
            
          }));
          
      } catch (error) {
          console.log(alert(error.message));
      }
  };


    const fetchDeletedProducts = async () => {
      try {
          const res = await axios.get("/products/deleted", {params: { page, productPerPage, OFFSET: (page - 1)*productPerPage, category: selectedCategory.category_id}});
          const { data } = res;
          setProducts(data.result);
          setSortedProducts(data.result);
          setFilteredProducts(data.result);
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
  }, [deletedProducts, selectedCategory, page])

      const filterProducts = (formData) => {
        const resultFilter = products.filter((product) => {
          const productName = product.productName.toLowerCase();
          const keyword = formData.keyword.toLowerCase();
          return (
            productName.includes(keyword) 
          );
        });
    
        // setPaginationState({
        //   ...paginationState,
        //   page: 1,
        //   lastPage: Math.ceil(resultFilter.length / paginationState.itemsPerPage),
        // });
        setFilteredProducts(resultFilter);
        setSortedProducts(resultFilter);
      };

  



      const sortProducts = (sortValue) => {
        const rawData = [...products];
    
        switch (sortValue) {
          case "lowPrice":
            rawData.sort((a, b) => a.price - b.price);
            break;
          case "highPrice":
            rawData.sort((a, b) => b.price - a.price);
            break;
          case "az":
            rawData.sort((a, b) => {
    
              if (a.productName < b.productName) {
                return -1;
              } else if (a.productName > b.productName) {
                return 1;
              } else {
                return 0;
              }
            });
            break;
          case "za":
            rawData.sort((a, b) => {
              if (a.productName < b.productName) {
                return 1;
              } else if (a.productName > b.productName) {
                return -1;
              } else {
                return 0;
              }
            });
            break;
        }
    
        setSortedProducts(rawData);
      };

  return (
    <>
    <div className={classes.toolbar}/>
      <EditProducts
        setDeletedProducts={setDeletedProducts}
        deletedProducts={deletedProducts}
        products={sortedProducts}
        filterProducts={filterProducts}  
        sortProducts={sortProducts}
        setSelectedCategory={setSelectedCategory}
        page={page}
        setProductPerPage={setProductPerPage}
        totalPage={totalPage}
        setPage={setPage}
      />
    </>
    
  )
}

export default HomeAdmin