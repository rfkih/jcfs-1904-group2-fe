import React, { useState , useEffect} from 'react'
import axios from '../../../../../../utils/axios'
import { useParams } from "react-router-dom";
import { Typography,Container, Grid, Card, Avatar, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CardHeader } from '@material-ui/core'
import {Link} from 'react-router-dom'
import useStyles from './style'


function UserDetail() {
    const classes = useStyles();
    const params = useParams();
    const [ userDetail, setUserDetail] = useState ({});
    const [ transaction, setTransaction ] = useState([]);
    const [page, setPage] = useState(0);
    const [transactionPerPage, setTransactionPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
      };

    const handleChangeTransactionPerPage = (event) => {
        setTransactionPerPage(+event.target.value);
        setPage(0);
      };



    const fetchUserDetail = async () => {
        try {
            const res = await axios.get(`/users/admin/${params.userId}`, {params: {id: params.userId}});
            const  {data} = res
            setUserDetail(data.result[0]);
            setTransaction(data.transaction);
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    console.log(transaction);

    const columns = [
        { id:'id', label: 'Transaction Id', align: 'right', minWidth: 80},
        { id:'invoice', label: 'Invoice', align: 'right', minWidth: 110},
        { id:'user_id', label: 'User Id',align: 'right', minWidth: 90},
        { id:'transactionStatus', label: 'Transaction Status', align: 'right', minWidth: 110},
        { id:'totalPrice', label: 'Total Price' ,align: 'right', minWidth: 90},
    ]

    
    useEffect(() => {
        fetchUserDetail();
    }, [])

  return (
   <Container>
       <div className={classes.toolbar}/>
       <Paper>
           <Card>
               <CardHeader
                avatar={<Avatar alt="User Photo" src={userDetail.photo}/>}
                title={userDetail.name}
                subheader={userDetail.email}
                action={
                    <Typography>
                        User Id : {userDetail.id}
                    </Typography>
                }
               />
               <CardContent>
                   

               </CardContent> 
           </Card>
           <Paper>
               <TableContainer>
                   <Table stickyHeader>
                       <TableHead>
                           <TableRow>
                               {columns.map((column) => (
                                   <TableCell
                                    key={column.id}
                                    align={column.align}
                                   >
                                       {column.label}
                                   </TableCell>
                               ))}
                           </TableRow>
                       </TableHead>
                       <TableBody>
                            {transaction.slice(page * transactionPerPage, page * transactionPerPage + transactionPerPage)
                                .map((item) => {
                                    return(
                                        <TableRow component={Link} to={`/transactiondetails/${item.id}`} hover role="checkbox" key={item.id}>
                                            {columns.map((column) => {
                                                const value = item[column.id];
                                                return(
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
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={transaction.length}
                    rowsPerPage={transactionPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeTransactionPerPage}
                />
           </Paper>
                
          
       </Paper>
   </Container>
  )
}

export default UserDetail