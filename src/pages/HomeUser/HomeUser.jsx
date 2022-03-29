import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'

import Products from './components/Products/Products'
import ProductManager from './components/ProductManager'

function HomeUser() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [paginationState, setPaginationState] = useState({
        page: 1,
        lastPage: 0,
        itemsPerPage: 2,
      });

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products");
            const { data } = res;
            setProducts(data);
            setSortedProducts(data);
            setFilteredProducts(data);
            setPaginationState({
                ...paginationState,
                lastPage: Math.ceil(data.length / paginationState.itemsPerPage),
              });
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchProducts();
      }, []);


      const filterProducts = (formData) => {
        const resultFilter = products.filter((product) => {
          const productName = product.productName.toLowerCase();
          const keyword = formData.keyword.toLowerCase();
          return (
            productName.includes(keyword) &&
            product.category_id.toString().includes(formData.category_id)
          );
        });
    
        setPaginationState({
          ...paginationState,
          page: 1,
          lastPage: Math.ceil(resultFilter.length / paginationState.itemsPerPage),
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
    <div>
        <div>
          <ProductManager
            filterProducts={filterProducts}
            paginationState={paginationState}
            setPaginationState={setPaginationState}
            sortProducts={sortProducts}
            />
            <Products 
            products={sortedProducts}
            paginationState={paginationState}
            />
           
        </div>
    </div>
  )
}

export default HomeUser