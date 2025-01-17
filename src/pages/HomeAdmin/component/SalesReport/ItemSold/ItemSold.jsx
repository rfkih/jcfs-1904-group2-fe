import React, {useEffect,useState} from 'react'
import axios from '../../../../../utils/axios'
import { Typography,Container, Grid, Card, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import {SearchOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import moment from 'moment'
import useStyles from './style'
 



function ItemSold() {
    const classes = useStyles();
    const [ page, setPage] = useState(0)
    const [ soldItem, setSoldItem] = useState([])
    const [ sortedItem, setSortedItem] = useState('')
    const [ soldCategory, setSoldCategory] = useState([])
    const [ pageCategory, setPageCategory] = useState(0)
    const [ categoryPerpage, setCategoryPerPage] = useState(10)
    const [ sortedCategory, setSortedCategory] = useState('')
    const [ categoryName, setCategoryName] = useState([]);
    const [ keyword, setKeyword] = useState('')
    const [ soldItemTotalPage, setSoldItemTotalPage] = useState(1)
    const [ soldItemPerPage, setSoldItemPerPage] = useState(10)
    const [ categoryCount, setCategoryCount ] = useState(1)
   


    
    const handleChange = (e) => {
        setKeyword( `and productName like '%${e.target.value}%'`);
        setPage(0)
      };

      
      soldItem.forEach((item)=>{
            categoryName.map((name) => {
                if (item.productCategory == name.id) {
                    item.category = name.categoryName   
                }
            })
    });

    soldCategory.forEach((item)=>{
        categoryName.map((name) => {
            if (item.productCategory == name.id){
                item.category = name.categoryName
            }
        })
    });



    const fetchSoldProducts = async () => {
        try {
            const res = await axios.get("/products/sold", {params: { pages:(`limit ${soldItemPerPage} offset ${(page)*soldItemPerPage}`), sortedItem, keyword }});
            const { data } = res;
            
            setSoldItem(data.result);
            
            setSoldItemTotalPage(data.count.length)

        } catch (error) {
            console.log(alert(error.message));
        }
    };



   

    const fetchSoldCategory = async () => {
        try {
            const res = await axios.get("/transactiondetails/category", {params: { pages:(`limit ${categoryPerpage} offset ${(pageCategory) * categoryPerpage}`), sortedCategory  }})
            const { data } = res;
         
            setSoldCategory(data.categoryDetail)
            setCategoryCount(data.count.length);
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
     fetchSoldProducts();
     fetchSoldCategory();
     fetchCategories();
    }, [sortedItem, keyword, sortedCategory, page, soldItemPerPage, categoryPerpage, pageCategory])


    const handleChangePageCategory = (event, newPageCategory) => {
        setPageCategory(newPageCategory)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

    const handleChangeItemPerPage = (event) => {
        
        setSoldItemPerPage(+event.target.value);
        setPage(0);
      };
    
    const handleChangeCategoryPerPage = (event) => {
        setCategoryPerPage(+event.target.value)
        setPageCategory(0)
    }

      const selectSortHandler = (e) => {
        setSortedItem(e.target.value);
      };

      const selectSortCategoryHandler = (e) => {
        setSortedCategory(e.target.value);
      };

      


    const columns = [
        { id:'rownumber', label: 'No', align: 'right', minWidth: 100},
        { id:'category', label: 'Product Category', align: 'right', minWidth: 100},
        { id:'productName', label: 'Product Name',align: 'left', minWidth: 170},
        { id:'total_bought', label: 'Total Bought', align: 'right', minWidth: 100},
    ]

    const columnsCategory = [
        { id:'productCategory', label: 'Category Id', align: 'right', minWidth: 90},
        { id:'category', label: 'Category', align: 'right', minWidth: 90},
        { id: 'total_bought', label: 'Total Bought', align: 'right', minWidth: 90},
    ]

    

     
    
    


  return (
    <Container>
        <div className={classes.toolbar}/>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={8}>        
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" >
                                        Sort Item
                                    </Typography>
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
                                                <MenuItem key={1} value="order by total_bought asc" > Least Bought </MenuItem>
                                                <MenuItem key={2} value="order by total_bought desc" > Most Bought </MenuItem>
                                                <MenuItem key={3} value="order by rownumber asc" > Ascending </MenuItem>
                                                <MenuItem key={4} value="order by rownumber desc" > Descending </MenuItem>
                                            </Select>   
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid 
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center" 
                            item xs={6}>
                                <Paper className={classes.paper}>
                                    <Input
                                    className={classes.input}
                                    placeholder="Search Products"
                                    name="keyword"
                                    align="center"
                                    onChange={handleChange}
                                    />
                                    <IconButton>
                                        <SearchOutlined />
                                    </IconButton>
                                </Paper>
                            
                        </Grid>
                    </Grid>  
                </Paper>
            </Grid>                                  
            <Grid item xs={4}>
                <Paper>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" >
                                Sort Category
                            </Typography>
                            <FormControl sx={{ m: 3, minWidth: 200 }}>
                                <InputLabel id="sort-by-category" >Sort By</InputLabel>
                                    <Select
                                        displayEmpty
                                        labelId="sort-by-category"
                                        id="1"
                                        defaultValue=""
                                        name="categorySortBy"
                                        onChange={selectSortCategoryHandler}
                                    >
                                        <MenuItem value="" >Sort By</MenuItem>
                                        <MenuItem value="order by total_bought asc" > Least Bought </MenuItem>
                                        <MenuItem value="order by total_bought desc" > Most Bought </MenuItem>
                                        <MenuItem value="order by productCategory asc" > Category Id(Ascending) </MenuItem>
                                        <MenuItem value="order by productCategory desc" > Category Id(Descending) </MenuItem>
                                    </Select>   
                            </FormControl>
                        </CardContent>
                    </Card>
                </Paper>

            </Grid>
            <Grid item xs={8}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {soldItem
                                    .map((item) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={soldItem.product_id}>
                                        {columns.map((column) => {
                                            const value = item[column.id];
                                            return (
                                            <TableCell className={classes.link} component={Link} to={`/itemsold/product/${item.product_id}`}  key={column.id} align={column.align}>
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
                        count={soldItemTotalPage}
                        rowsPerPage={soldItemPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeItemPerPage}
                    />
                </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columnsCategory.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {soldCategory
                                    .map((category) => {
                                        return(
                                            <TableRow hover role="checkbox" tabIndex={-1} key={sortedCategory.productCategory}>
                                                {columnsCategory.map((column) => {
                                                    const value = category[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    )
                                                })}

                                            </TableRow>
                                        )
                                    })

                                        }
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={categoryCount}
                        rowsPerPage={categoryPerpage}
                        page={pageCategory}
                        onPageChange={handleChangePageCategory}
                        onRowsPerPageChange={handleChangeCategoryPerPage}
                    />
                </Paper>

            </Grid>
        </Grid>
        
    </Container>
  )
}

export default ItemSold









