
import React, {useState, useEffect} from 'react'
import axios from '../../../../../utils/axios';
import { Typography,Container, Grid, Card, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'

function UsersTransaction() {
    const [transaction, setTransaction] = useState([])
    const [page, setPage] = useState(0)
    const [transactionPerPage, setTransactionPerPage] = useState(10)
    const [status, setStatus] = useState({})
    



    const fetchTransaction = async () => {
        try {
        
            const res = await axios.get("/transaction", {params: (status)});
            const { data } = res;
            setTransaction(data);
           
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect (() => {
        fetchTransaction();
    },[status]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

      const handleChangeTransactionPerPage = (event) => {
        ;
        setTransactionPerPage(+event.target.value);
        setPage(0);
      };

    const handleChangeStatus = (e) => {
        setStatus({[e.target.name]: e.target.value})
      };

    console.log(status);

    const columns = [
        { id:'id', label: 'Transaction Id', align: 'right', minWidth: 80},
        { id:'invoice', label: 'Invoice', align: 'right', minWidth: 110},
        { id:'user_id', label: 'User Id',align: 'right', minWidth: 90},
        { id:'transactionStatus', label: 'Transaction Status', align: 'right', minWidth: 110},
        { id:'totalPrice', label: 'Total Price' ,align: 'right', minWidth: 90},
    ]


  return (
    <Container>
        <Paper>
        <FormControl >
              <InputLabel id="range-select-label">Transaction Status</InputLabel>
                <Select
                  labelId="range-select-label"
                  id="range-select"
                  label="Transaction Status"
                  name="status"
                  defaultValue=""
                  onChange={handleChangeStatus}
                >
                    <MenuItem key={1} value={""} >Default</MenuItem>
                    <MenuItem key={2} value={"paid"} >Paid</MenuItem>
                    <MenuItem key={3} value={"failed"} >Failed</MenuItem>
                    <MenuItem key={4} value={"sent"} >Sent</MenuItem>
                    <MenuItem key={5} value={"complete"}>Complete</MenuItem>
                    </Select>
                </FormControl>

        </Paper>
        <Paper>
            <TableContainer sx={{ maxHeight: 440 }} >
                <Table stickyHeader aria-label="styicky table">
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
                        {transaction.slice(page * transactionPerPage, page * transactionPerPage + transactionPerPage)
                        .map((item) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
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
                count={transaction.length}
                rowsPerPage={transactionPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeTransactionPerPage}
            />
        </Paper>
    </Container>
  )
}

export default UsersTransaction