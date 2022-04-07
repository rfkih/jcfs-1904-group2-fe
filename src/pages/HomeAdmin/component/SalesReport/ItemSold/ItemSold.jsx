import React, {useEffect,useState} from 'react'
import axios from '../../../../../utils/axios'
import { Typography,Container, Grid, Card, CardContent, FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'






function ItemSold() {
    const [page, setPage] = useState(0)
    const [soldItemPerPage, setSoldItemPerPage] = useState(10)
    const [ soldItem, setSoldItem] = useState([])
    const [ sortedItem, setSortedItem] = useState([])
    const [ soldCategory, setSoldCategory] = useState([])
    const [ pageCategory, setPageCategory] = useState(0)
    const[ categoryPerpage, setCategoryPerPage] = useState(10)
    const [sortedCategory, setSortedCategory] = useState([])
    const [categoryName, setCategoryName] = useState([]);

    sortedItem.forEach((item)=>{
            categoryName.map((name) => {
                if (item.productCategory == name.id) {
                    item.category = name.categoryName   
                }
            })
    });

    sortedCategory.forEach((item)=>{
        categoryName.map((name) => {
            if (item.productCategory == name.id){
                item.category = name.categoryName
            }
        })
    })


   
   

    const fetchSoldProducts = async () => {
        try {
            const res = await axios.get("/products/sold");
            const { data } = res;
            setSoldItem(data);
            setSortedItem(data)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const fetchSoldCategory = async () => {
        try {
            const res = await axios.get("/transactiondetails/category")
            const { data } = res;
            setSoldCategory(data)
            setSortedCategory(data)
        } catch (error) {
            console.log(alert(error.message));
        }
    }

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
    }, [])

    


    

    const handleChangePageCategory = ( newPageCategory) => {
        setPageCategory(newPageCategory)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

    const handleChangeItemPerPage = (event) => {
        console.log(event);
        setSoldItemPerPage(+event.target.value);
        setPage(0);
      };
    
    const handleChangeCategoryPerPage = (event) => {
        setCategoryPerPage(+event.target.value)
        setPageCategory(0)
    }

      const selectSortHandler = (e) => {
        sortItem(e.target.value);
      };

      const selectSortCategoryHandler = (e) => {
        sortCategory(e.target.value);
      };




    const columns = [
        { id:'product_id', label: 'Product Id', align: 'right', minWidth: 100},
        { id:'category', label: 'Product Category', align: 'right', minWidth: 100},
        { id:'productName', label: 'Product Name',align: 'left', minWidth: 170},
        { id:'total_bought', label: 'Total Bought', align: 'right', minWidth: 100},
    ]

    const columnsCategory = [
        { id:'productCategory', label: 'Category Id', align: 'right', minWidth: 90},
        { id:'category', label: 'Category', align: 'right', minWidth: 90},
        { id: 'total_bought', label: 'Total Bought', align: 'right', minWidth: 90},
    ]

    

    const sortItem = (sortValue) => {
        const rawData = [...soldItem];
    
        switch (sortValue) {
          case "leastbought":
            rawData.sort((a, b) => a.total_bought - b.total_bought);
            break;
          case "mostbought":
            rawData.sort((a, b) => b.total_bought - a.total_bought);
            break;
          case "ascending":
            rawData.sort((a, b) => a.product_id - b.product_id);
            break;
          case "descending":
            rawData.sort((a, b) => b.product_id - a.product_id);
            break;
        }
        setSortedItem(rawData);
      };

      const sortCategory = (sortValue) => {
        const rawData = [...soldCategory];
    
        switch (sortValue) {
          case "leastbought":
            rawData.sort((a, b) => a.total_bought - b.total_bought);
            break;
          case "mostbought":
            rawData.sort((a, b) => b.total_bought - a.total_bought);
            break;
          case "ascending":
            rawData.sort((a, b) => a.productCategory - b.productCategory);
            break;
          case "descending":
            rawData.sort((a, b) => b.productCategory - a.productCategory);
            break;
        }
        setSortedCategory(rawData);
      };

     
    
    


  return (
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Paper>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" >
                                Sort Item
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
                                        <MenuItem value="leastbought" > Least Bought </MenuItem>
                                        <MenuItem value="mostbought" > Most Bought </MenuItem>
                                        <MenuItem value="ascending" > Product id (Ascending) </MenuItem>
                                        <MenuItem value="descending" > Product id (Descending) </MenuItem>
                                    </Select>   
                            </FormControl>
                        </CardContent>
                    </Card>
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
                                        labelId="sort-by-category"
                                        id="1"
                                        defaultValue=""
                                        name="categorySortBy"
                                        onChange={selectSortCategoryHandler}
                                    >
                                        <MenuItem value="" > Default </MenuItem>
                                        <MenuItem value="leastbought" > Least Bought </MenuItem>
                                        <MenuItem value="mostbought" > Most Bought </MenuItem>
                                        <MenuItem value="ascending" > Category Id(Ascending) </MenuItem>
                                        <MenuItem value="descending" > Category Id(Descending) </MenuItem>
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
                                {sortedItem.slice(page * soldItemPerPage, page * soldItemPerPage + soldItemPerPage)
                                    .map((item) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={sortedItem.product_id}>
                                        {columns.map((column) => {
                                            const value = item[column.id];
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
                        count={soldItem.length}
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
                                {sortedCategory.slice(pageCategory * categoryPerpage, pageCategory * categoryPerpage + categoryPerpage)
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
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={soldCategory.length}
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









