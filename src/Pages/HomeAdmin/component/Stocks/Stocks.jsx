import React,{useState, useEffect} from 'react'
import { Typography,Container, Grid, Card, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import useStyles from './style'
import axios from '../../../../utils/axios'

function Stocks() {
const classes = useStyles();
const [ sort, setSort ] = useState('')
const [ keyword, setKeyword] = useState('')
const [ products, setProducts] = useState([])
const [selectedCategory, setSelectedCategory] = useState ({ category_id: ''})
const [categoryName, setCategoryName] = useState([])
const [page, setPage] = useState(0)
const [productsPerPage, setProductsPerPage] = useState(10)
const [productsCount, setProductsCount] = useState(1)

const handleChangePage = (event, newPage) => {
  setPage(newPage)
};


const handleChangeItemPerPage = (event) => {   
  setProductsPerPage(+event.target.value);
  setPage(0);
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


useEffect(() => {
  fetchProducts();
  fetchCategories();
},[page, productsPerPage])

const columns = [
  { id:'id', label: 'Product Id', align: 'right', minWidth: 20},
  { id:'category', label: 'Category', align: 'right', minWidth: 30},
  { id:'productName', label: 'Product Name',align: 'right', minWidth: 100},
  { id:'price', label: 'Price', align: 'right', minWidth: 70},
]

  console.log(products);
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Grid container spacing={2}>
            <Grid item xs={8}>
              Select Products
            </Grid>
            <Grid item xs ={8}>
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
                                <TableCell key={column.id} align={column.align}>
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

        </Grid>
    </Container>
  )
}

export default Stocks