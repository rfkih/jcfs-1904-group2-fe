import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
import { Grid, Box, Container, Typography } from "@material-ui/core";
import Products from './components/Products/Products'
import ProductManager from './components/ProductManager'

function HomeUser() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [ page, setPage ] = useState(1)
    const [ productPerPage, setProductPerPage] = useState(12)
    const [category, setCategory] = useState([{categoryName: "Default"}]);
    const [selectedCategory, setSelectedCategory] = useState ({})
    const [totalPage, setTotalPage] = useState(1)
  

    const fetchCategories = async () => {
      try {
          const res = await axios.get("/categories");
          const  categories = res
          const category = categories.data
          setCategory(category)
      } catch (error) {
          console.log(alert(error.message));
      }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  
  
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

    console.log(totalPage);

    useEffect(() => {
        fetchProducts();
      }, [selectedCategory, page]);


      const filterProducts = (formData) => {
        const resultFilter = products.filter((product) => {
          const productName = product.productName.toLowerCase();
          const keyword = formData.keyword.toLowerCase();
          return (
            productName.includes(keyword) 
          );
        });
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

    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <ProductManager
              filterProducts={filterProducts}
              setPage={setPage}
              sortProducts={sortProducts}
              category={category}
              setCategory={setCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Grid>
          <Grid item xs={9}>
            <Products 
              products={sortedProducts}
              setPage={setPage}
              page={page}
              setProductPerPage={setProductPerPage}
              totalPage={totalPage}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
      
        
  )
}

export default HomeUser