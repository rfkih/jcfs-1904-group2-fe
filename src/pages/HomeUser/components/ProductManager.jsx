import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, MenuItem, FormControl, Grid, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';

import useStyles from './styles';


function ProductManager(props) {
    const classes = useStyles();
    const { paginationState, setPaginationState } = props;
    const { page, lastPage } = paginationState;
    const [category, setCategory] = useState([{categoryName: "Default"}]);

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

     console.log(category);

  return (
    
    <Container>
      <div className={classes.toolbar}/>
        {/* Filter */}
      <Paper variant="outlined" >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" >
                Filter Products
            </Typography>
            <TextField  name="keyword" id="outlined-basic" label="Product Name" variant="standard" onChange={handleChange} />
            <br />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="category-select">Category</InputLabel>
                  <Select
                    labelId="category-select"
                    id="1"
                    defaultValue=""
                    name="category_id"
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem key={1} value="">
                      <em>Default</em>
                    </MenuItem>
                    {category.map((category) => (
                    <MenuItem key={category.id}  value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                    ))}
                  </Select>
              </FormControl>
          </CardContent>
          <CardActions>
            <Button onClick={btnSearchHandler} variant="contained">Search</Button>
          </CardActions>
          

        </Card>
        
        
      </Paper>
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
        <div className="text-center col-6 ">
         Page {page} of {lastPage}
        </div>
        <button
            onClick={btnNextPageHandler}
            className={`btn col-3 btn-dark ${page === lastPage && "disabled"} `}
        >
            {">"}
        </button>
        </div>
    </Container>
    );
}

export default ProductManager