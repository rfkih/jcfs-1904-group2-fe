import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, Box, MenuItem, FormControl, Grid, Divider, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';

import useStyles from './styles';


function ProductManager(props) {
    const classes = useStyles();
    const { paginationState, setPaginationState, category, setSelectedCategory,  } = props;
    const { page, lastPage } = paginationState;
    

    const [formState, setFormState] = useState({
        keyword: "",
        category_id: ""
      });
    
      

   
      const handleSelectedCategory = (e) => {
        setSelectedCategory({[e.target.name]: e.target.value});
      }

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
        <Divider light />
        {/* Sort */}
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
        </Card>
        {/* Pagination */}
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
      </Paper>
    </Container>
    );
}

export default ProductManager