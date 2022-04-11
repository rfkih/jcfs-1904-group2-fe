import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, Box, MenuItem, FormControl, InputBase, IconButton,  Grid, Divider, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons'

import useStyles from './styles';


function ProductManager(props) {
    const classes = useStyles();
    const { category, setSelectedCategory, setPage  } = props;
    
    const [formState, setFormState] = useState({
        keyword: "", 
      });
    
      
   
      const handleSelectedCategory = (e) => {
        setSelectedCategory({[e.target.name]: e.target.value});
        setPage(1)
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
              <Grid container spacing={1}>
                <Grid item xs={9}>
                <InputBase     
                  placeholder="Search Pharmacy"
                  name="keyword"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChange}
                />
                </Grid>
                <Grid item xs={3}>
                  <IconButton sx={{ p: '10px' }} onClick={btnSearchHandler}>
                    <SearchOutlined />
                  </IconButton>
                </Grid>

              </Grid>
            
            <br />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="category-select">Category</InputLabel>
                  <Select
                    labelId="category-select"
                    id="1"
                    defaultValue=""
                    name="category_id"
                    label="Age"
                    onChange={handleSelectedCategory}
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
      </Paper>
    </Container>
    );
}

export default ProductManager