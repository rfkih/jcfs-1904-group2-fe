import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import useStyles from './style'
import axios from '../../../../utils/axios'
import {SearchOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom";
import moment from 'moment'

function Stocks() {
const params = useParams();
const classes = useStyles();
const [ sort, setSort ] = useState('')
const [ keyword, setKeyword] = useState('')
const [ products, setProducts] = useState([])
const [selectedCategory, setSelectedCategory] = useState ({ category_id: ''})
const [categoryName, setCategoryName] = useState([])
const [page, setPage] = useState(0)
const [productsPerPage, setProductsPerPage] = useState(10)
const [productsCount, setProductsCount] = useState(1)
const [ dataLog, setDataLog] = useState([])
const [ dataLogCount, setDataLogCount] = useState([])
const [ sortData, setSortData] = useState('')
const [ filterData, setFilterData] = useState('')
const [ pageData, setPageData] = useState(0)
const [ dataPerPage, setDataPerPage] = useState(10)
console.log(products);

const handleChangePage = (event, newPage) => {
  setPage(newPage)
};

const handleChangeDataPage = (event, newPage) => {
  setPageData(newPage)
};

const handleChange = (e) => {
  setKeyword( `and productName like '%${e.target.value}%'`);
  setPage(0)
};



const selectSortHandler = (e) => {
  setSort(e.target.value);
};

const selectSortData = (e) => {
  setSortData(e.target.value)
}

const selectFilterData = (e) => {
  setFilterData(e.target.value)
}

const handleSelectedCategory = (e) => {
  setSelectedCategory({[e.target.name]: e.target.value});
  setPage(0)
};



const handleChangeItemPerPage = (event) => {   
  setProductsPerPage(+event.target.value);
  setPage(0);
};

const handleChangeDataPerPage = (event) => {   
  setDataPerPage(+event.target.value);
  setPageData(0);
};

products.forEach((item)=>{
  categoryName.map((name) => {
      if (item.category_id == name.id) {
          item.category = name.categoryName   
      }
  })
});


const fetchProducts = async () => {     
  try {
      const res = await axios.get("/products", {params: { pages:(`limit ${productsPerPage} offset ${(page)*productsPerPage}`), keyword, sort, category: selectedCategory.category_id}})
      .then((res=>{
        const { data } = res;
        setProducts(data.result);
        setProductsCount(data.count[0].count);
      }));
      
  } catch (error) {
      console.log(alert(error.message));
  }
};


console.log(selectedCategory);


const fetchDataLog = async () => {
  try {
      const res = await axios.get(`/datalog`, { params: { pages:(`limit ${dataPerPage} offset ${(pageData)*dataPerPage}`), filterData, sortData, } } )
      const {data} = res
      setDataLog(data.result);
      setDataLogCount(data.count[0].count);
  
  } catch (err) {
  console.log({ err });       
  }
}

useEffect(() => {
  fetchDataLog();
},[sortData, filterData, pageData, dataPerPage])

const fetchCategories = async () => {
  try {
      const res = await axios.get("/categories");
      const  categories = res
      const category = categories.data
      setCategoryName(category)
  } catch (error) {
      console.log(alert(error.message));
  }
};
console.log(dataLog);

useEffect(() => {
  fetchProducts();
  fetchCategories();
},[page, productsPerPage, sort, keyword, selectedCategory])

const columns = [
  { id:'id', label: 'Product Id', align: 'right', minWidth: 20},
  { id:'category', label: 'Category', align: 'right', minWidth: 30},
  { id:'productName', label: 'Product Name',align: 'right', minWidth: 100},
  { id:'price', label: 'Price', align: 'right', minWidth: 70},
]

const datalogs = [
  { id:'productName', label: 'Product', align: 'right', minWidth: 30},
  { id:'status', label: 'Status', align: 'right', minWidth: 30},
  { id:'stock_in', label: 'In', align: 'right', minWidth: 40},
  { id:'stock_out', label: 'Out', align: 'right', minWidth: 40},
  { id:'username', label: 'Username',align: 'right', minWidth: 50},
  { id:'created_at', label: 'Date', align: 'right', minWidth: 70},
]


  
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>          
                  <Grid item xs={6}>                       
                            <Card sx={{ minWidth: 275 }}>      
                                <CardContent>
                                  <Grid container spacing={2}>
                                    <Grid Grid xs={7}>
                                      <FormControl sx={{ m: 3, minWidth: 200 }}>
                                        <InputLabel id="sort-by" >Sort By</InputLabel>
                                            <Select
                                                displayEmpty
                                                labelId="sort-by"
                                                id="1"
                                                defaultValue=""
                                                name="sortBy"
                                                onChange={selectSortHandler}
                                            >
                                                <MenuItem key={0} value="" >Sort By</MenuItem>
                                                <MenuItem key={3} value="order by id asc" > Product id (Ascending) </MenuItem>
                                                <MenuItem key={4} value="order by id desc" > Product id (Descending) </MenuItem>
                                                <MenuItem key={1} value="order by productName asc" > Product Name (Ascending) </MenuItem>
                                                <MenuItem key={2} value="order by productName desc" > Product Name (Descending) </MenuItem>
                                                <MenuItem key={5} value="order by price asc" > Price (Acending) </MenuItem>
                                                <MenuItem key={6} value="order by price desc" > Price (Descending) </MenuItem>
                                            </Select>   
                                      </FormControl>
                                    </Grid>
                                    <Grid xs={3}>
                                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="category-select">Category</InputLabel>
                                          <Select
                                            displayEmpty
                                            labelId="category-select"
                                            id="1"
                                            defaultValue=""
                                            name="category_id"
                                            label="Category"
                                            onChange={handleSelectedCategory}
                                        >
                                          <MenuItem key={1} value="">
                                            Category
                                          </MenuItem>
                                          {categoryName.map((category) => (
                                          <MenuItem key={category.id}  value={category.id}>
                                          {category.categoryName}
                                        </MenuItem>
                                        ))}
                                      </Select>
                                  </FormControl>
                                    </Grid>
                                  </Grid>                                             
                                </CardContent>
                            </Card>
                            
                    </Grid> 
                  <Grid item xs={5}>       
                       
                          <Input
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Products"
                                name="keyword"
                                align="center"
                                onChange={handleChange}
                            />
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                                                            
                  </Grid>               
                </Grid>
              </Paper>
            </Grid> 
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ minWidth: 275 }} >
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={7}>
                            <FormControl sx={{ m: 3, minWidth: 200 }}>
                              <InputLabel id="sort-by" >Sort By</InputLabel>
                                <Select
                                  displayEmpty
                                  labelId="sort-by"
                                  id="1"
                                  defaultValue=""
                                  name="sortBy"
                                  onChange={selectSortData}
                                >
                                  <MenuItem key={0} value="" >Sort By</MenuItem>
                                  <MenuItem key={3} value="order by created_at desc" > Latest </MenuItem>
                                  <MenuItem key={4} value="order by created_at asc" > Oldest </MenuItem>
                                  <MenuItem key={1} value="order by stock_out asc" > Stock In </MenuItem>
                                  <MenuItem key={2} value="order by stock_in asc" > Stock Out </MenuItem>
                                </Select>   
                            </FormControl>
                          </Grid>
                          <Grid item xs={3}>
                            <FormControl sx={{ m: 3, minWidth: 200 }}>
                              <InputLabel id="filter" >Filter By</InputLabel>
                                <Select
                                  displayEmpty
                                  labelId="filter"
                                  id="1"
                                  defaultValue=""
                                  name="filter"
                                  onChange={selectFilterData}
                                >
                                  <MenuItem key={0} value="" >Filter By</MenuItem>
                                  <MenuItem key={3} value="where status = 'edit'" > Edit </MenuItem>
                                  <MenuItem key={4} value="where status = 'add'" > Add </MenuItem>
                                  <MenuItem key={1} value="where status = 'bought'" > Bought </MenuItem>
                                  <MenuItem key={2} value="where status = 'custom'" > Custom </MenuItem>
                                </Select>   
                            </FormControl>
                          </Grid>
                        </Grid>   
                      </CardContent>
                    </Card>
                    </Grid> 
                  </Grid>
                </Paper>
            </Grid>
            <Grid item xs ={6}>
              <Paper>
                <TableContainer>
                  <Table stickyHeader >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth}}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => {
                        return (
                          <TableRow hover role="checkbox">
                            {columns.map((column) => {
                              const value = product[column.id];
                              return (
                                <TableCell className={classes.link} component={Link} to={`/stocks/${product.id}`} key={column.id} align={column.align}>
                                    {value}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={productsCount}
                        rowsPerPage={productsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeItemPerPage}
                    />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <TableContainer>
                  <Table stickyHeader >
                  <TableHead>
                      <TableRow>
                        {datalogs.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth}}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataLog.map((product) => {
                        return (
                          <TableRow hover role="checkbox">
                            {datalogs.map((column) => {
                                                    const value = product[column.id];
                                                    if (column.id === "created_at" ) {
                                                        const date =  moment(value).utc().format('DD/MM/YYYY')
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {date}
                                                            </TableCell>     
                                                        )  
                                                    } else {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>                                                                                                             
                                                        )    
                                                    }
                                                    
                                                })}
                          </TableRow>
                        )
                      })}
                    </TableBody>

                  </Table>
                </TableContainer>
                <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={dataLogCount}
                        rowsPerPage={dataPerPage}
                        page={pageData}
                        onPageChange={handleChangeDataPage}
                        onRowsPerPageChange={handleChangeDataPerPage}
                    />
              </Paper>

            </Grid>

        </Grid>
    </Container>
  )
}

export default Stocks