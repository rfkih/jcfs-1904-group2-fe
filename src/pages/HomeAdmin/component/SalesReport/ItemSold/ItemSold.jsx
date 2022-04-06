import React, {useEffect,useState} from 'react'
import axios from '../../../../../utils/axios'
import { Typography,Container, Grid, Card, CardContent, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'






function ItemSold() {
    const [page, setPage] = useState(0)
    const [soldItemPerPage, setSoldItemPerPage] = useState(10)
    const [ soldItem, setSoldItem] = useState([])
    

    

    const fetchSoldProducts = async () => {
        try {
            const res = await axios.get("/products/sold");
            const { data } = res;
            console.log(data);
            setSoldItem(data);
        } catch (error) {
            console.log(alert(error.message));
        }
    };
    useEffect(() => {
     fetchSoldProducts();
    }, [])
console.log(soldItem);



    const columns = [
        { id:'product_id', label: 'Product Id', align: 'right', minWidth: 100},
        { id:'productCategory', label: 'Product Category', align: 'right', minWidth: 100},
        { id:'productName', label: 'Product Name',align: 'left', minWidth: 170},
        { id:'total_bought', label: 'Total Bought', align: 'right', minWidth: 100},
    ]

    
    
    

  return (
    <Container>
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
                        {soldItem.slice(page * soldItemPerPage, page * soldItemPerPage + soldItemPerPage)
                        .map((item) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={soldItem.product_id}>
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
        </Paper>
    </Container>
  )
}

export default ItemSold









