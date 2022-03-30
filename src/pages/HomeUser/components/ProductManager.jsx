import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';

function ProductManager(props) {
    const { paginationState, setPaginationState } = props;
    const { page, lastPage } = paginationState;
    const [category, setCategory] = useState([]);

    const [formState, setFormState] = useState({
        keyword: "",
        category_id: ""
      });
    
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

    console.log(category);
   

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      };

    const btnSearchHandler = () => {
        props.filterProducts(formState);
      };

    const selectSortHandler = (e) => {
        props.sortProducts(e.target.value);
      };

    const btnPrevPageHandler = () => {
        setPaginationState({ ...paginationState, page: page - 1 });
      };
    const btnNextPageHandler = () => {
        setPaginationState({ ...paginationState, page: page + 1 });
      };

      console.log(category.id);

  return (
    
    <div className="container mt-5 ">
      
        {/* Filter */}
      <div className="card">
        <div className="card-header  mt-4">
          <strong>Filter products</strong>
        </div>
        <div className="card-body">
          <label>Product Name</label>
          <input
            name="keyword"
            type="text"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <Grid item xs={12} sm={6}>
            <InputLabel>Category</InputLabel>
            <Select  defaultValue="" name="category_id" onChange={handleChange}>
            <MenuItem value="">Default</MenuItem>
            {category.map((category) => (
                <MenuItem key={category.id}  value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
              </Select>
            
          </Grid>
      
          <button
            onClick={btnSearchHandler}
            className="btn btn-outline-primary mt-3 d-block w-100"
          >
            Search
          </button>
        </div>
      </div>
        {/* Sort */}
      <div className="card mt-4">
        <div className="card-header">
          <strong>Sort Products</strong>
        </div>
        <div className="card-body">
          <label className="mb-2">Sort by</label>
          <select
            name="sortBy"
            className="form-control"
            onChange={selectSortHandler}
          >
            <option value="">Default</option>
            <option value="lowPrice">Lowest Price</option>
            <option value="highPrice">Highest Price</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
    </div>
     {/* Pagination */}
    <div className="d-flex flex-row justify-content-between align-items-center ">
        <button
            
            onClick={btnPrevPageHandler}
            className={`btn col-3 btn-dark ${page === 1 && "disabled"}`}
           >
            {"<"}
        </button>
        <div className="text-center col-3 ">
         Page {page} of {lastPage}
        </div>

        <button
            onClick={btnNextPageHandler}
            className={`btn col-3 btn-dark ${page === lastPage && "disabled"} `}
        >
            {">"}
        </button>

        </div>
        
    </div>
    );
}

export default ProductManager