import React, {useEffect,useState} from 'react'
import axios from '../../../../../utils/axios'
import { Typography,Container, Grid, Card, CardContent, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'






function ItemSold() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    

    

    const fetchSoldProducts = async () => {
        try {
            const res = await axios.get("/products/sold");
            const { data } = res;
            console.log(data);
        } catch (error) {
            console.log(alert(error.message));
        }
    };
    useEffect(() => {
     fetchSoldProducts();
    }, [])


    const columns = [
        { id:'name', label: 'Name', minWidth: 170},
        { id:'product_id', label: 'Product Id', minWidth: 100},
        { id:'productDescription', label: 'product Description', minWidth: 250},
        { id:'total_bought', label: 'total bought', minWidth: 100}
    ]

    
    
    

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }} >
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                //   align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow hover role="checkbox" tabIndex={-1} key={columns.id}>
                        {columns.map((column) => {
                            const value = column.id;
                            return (
                                <TableCell key={column.id}>

                                </TableCell>
                            )
                        })}
                    </TableRow>

                </TableBody>

            </Table>

        </TableContainer>

    </Paper>
  )
}

export default ItemSold