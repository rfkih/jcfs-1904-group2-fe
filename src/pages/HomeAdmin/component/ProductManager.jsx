import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Container, Paper, Card, TextField, FormControl, CardActions, Divider, CardContent, Box} from '@material-ui/core';
import useStyles from './styles'

function ProductManager(props) {
    const classes = useStyles();
    const {deletedProducts, setDeletedProducts, setSelectedCategory, setPage, setSort, setKeyword } = props;
    const [category, setCategory] = useState([]);
    


    const deletedProductHandle = () => {
      setDeletedProducts(!deletedProducts);
      setPage(1)
    };

    const handleSelectedCategory = (e) => {
      setSelectedCategory({[e.target.name]: e.target.value});
      setPage(1)
    };

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
      setKeyword(`and productName like '%${e.target.value}%'`);
      setPage(1)
    };


    const selectSortHandler = (e) => {
        setSort(e.target.value);
      };


     

  return (
    <Container>
      <Paper className={classes.paper}> 
        <Grid container spacing={2}>
          <Grid item xs={12}>         
                <Typography align="center"  variant="h4" > Edit Product</Typography>         
          </Grid>
          <Grid item xs={6}>
            {/* Filter */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div" >
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
                          onChange={handleSelectedCategory}
                        >
                          <MenuItem key={1} value="">
                            <Typography>Default</Typography>
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
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                  <Typography variant="h6" component="div" >
                      Sort Products
                  </Typography>
                <Grid container spacing={2}>           
                  <Grid item xs={6}>
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
                          <MenuItem value="order by price ASC" > Lowest Price </MenuItem>
                          <MenuItem value="order by price DESC" > Highest Price </MenuItem>
                          <MenuItem value="order by productName ASC" > A - Z </MenuItem>
                          <MenuItem value="order by productName DESC" > Z - A</MenuItem>
                        </Select>   
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    { deletedProducts === false ? 
                      <Button onClick={deletedProductHandle} variant="contained">Show Deleted Product</Button> :
                      <Button onClick={deletedProductHandle} variant="contained">Show Listed Product</Button>
                    }

                  </Grid>

                </Grid>
                
                
               
              </CardContent>
              <CardActions>
              
              </CardActions>
            </Card> 
          </Grid>
        </Grid>  
      </Paper>
    </Container>
    
    );
}

export default ProductManager