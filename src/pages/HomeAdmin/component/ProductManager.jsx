import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Container, Paper, Card, TextField, FormControl, CardActions, Divider, CardContent, Box} from '@material-ui/core';

function ProductManager(props) {
    const { paginationState, setPaginationState,deletedProducts, setDeletedProducts } = props;
    const { page, lastPage } = paginationState;
    const [category, setCategory] = useState([]);
    

    const [formState, setFormState] = useState({
        keyword: "",
        category_id: ""
      });

    const deletedProductHandle = () => {
      setDeletedProducts(!deletedProducts);
      setPaginationState({...paginationState, page:1})
    }
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

     

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* Filter */}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" >
                Filter Products
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField  name="keyword" id="outlined-basic" label="Product Name" variant="standard" onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="category-select">Category</InputLabel>
                      <Select
                        labelId="category-select"
                        id="1"
                        defaultValue=""
                        name="category_id"
                        label="Category"
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
                </Grid>
              </Grid>             
            </CardContent>
            <CardActions>
              <Button onClick={btnSearchHandler} variant="contained">Search</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div" >
                Sort Products
              </Typography>
              <FormControl sx={{ m: 3, minWidth: 200 }}>
                  <InputLabel id="sort-by" >Sort By</InputLabel>
                    <Select
                      labelId="sort-by"
                      id="1"
                      defaultValue=""
                      name="sortBy"
                      onChange={selectSortHandler}
                    >
                      <MenuItem value="" > Default </MenuItem>
                      <MenuItem value="lowPrice" > Lowest Price </MenuItem>
                      <MenuItem value="highPrice" > Highest Price </MenuItem>
                      <MenuItem value="az" > A - Z </MenuItem>
                      <MenuItem value="za" > Z - A</MenuItem>
                    </Select>   
              </FormControl>
            </CardContent>
            <CardActions>
            { deletedProducts === false ? 
              <Button onClick={deletedProductHandle} variant="contained">Show Deleted Product</Button> :
              <Button onClick={deletedProductHandle} variant="contained">Show Listed Product</Button>
            }
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    {page === 1 ? 
                      <Button disabled >
                       {"<"}
                      </Button> :
                      <Button onClick={btnPrevPageHandler} >
                        {"<"}
                      </Button>
                    }
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Page {page} of {lastPage}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {page === lastPage ? 
                      <Button disabled >
                      {">"}
                      </Button> : 
                      <Button  onClick={btnNextPageHandler} >
                        {">"}
                      </Button>
                    } 
                  </Grid>
                </Grid>
              </Box>
            </CardActions>
          </Card> 
        </Grid>
      </Grid>  
    </Container>
    
    );
}

export default ProductManager