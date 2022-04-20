import React, { useState , useEffect} from 'react'
import axios from '../../../../../../utils/axios'
import { useParams } from "react-router-dom";
import { Typography,Container, Grid, Card, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import useStyles from './style'


function TransactionDetail() {
    const classes = useStyles();
    const params = useParams();
    const [ listProduct, setlistProduct] = useState([])
    const [ transactionDetail, setTransactionDetail] = useState({})
    const [ userDetail, setUserDetail] = useState ({})
  console.log(listProduct);
    useEffect(() => {
        axios
          .get(`/transactiondetails/${params.transactionId}`,{ params: { id: params.transactionId } } )
          .then((res) => {
            setlistProduct(res.data);
          })
          .catch((err) => {
            console.log({ err });
          });
      }, []);


    const fetchTransactionDetail = async () => {
        try {
            const res = await axios.get(`/transaction/${params.transactionId}`, {params: {id: params.transactionId}});
            const  {data} = res
            setTransactionDetail(data.result[0]);
            setUserDetail(data.user[0]);
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

   
    useEffect(() => {
        fetchTransactionDetail();
    }, []);

    const columns = [
      { id:'product_id', label: 'Product Id', align: 'right', minWidth: 100},
      { id:'productName', label: 'Product Name', align: 'right', minWidth: 100},
      { id:'price', label: 'Price',align: 'right', minWidth: 100},
      { id:'quantity', label: 'Quantity', align: 'right', minWidth: 100},
      { id:'totalPrice', label: 'Total Price', align: 'right', minWidth: 100}
  ]

   
console.log(transactionDetail);

  return (
    <Container>
      <div className={classes.toolbar}/>
        <Paper>
          <Card variant="outlined">
            <CardActions>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography>Status: {transactionDetail.transactionStatus}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>No. Invoice {transactionDetail.invoice}</Typography>
                </Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={3}>
                  <Typography>{transactionDetail.created_at}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>id: {userDetail.id}</Typography>
                    <br/>
                    <Typography>Name: {userDetail.name}</Typography>
                    <br/>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{userDetail.username}</Typography>
                    <br/>
                    <Typography>Email: {userDetail.email}</Typography>
                </Grid>
              </Grid>
            </CardActions>
            <CardContent>
            <Paper>
              <TableContainer >
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listProduct
                      .map((item) => {
                      return(
                        <TableRow hover role="checkbox" key={item.id}>
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
              <Grid container spacing={2}>
                <Grid item xs={10}> 

                </Grid>
                <Grid item xs={2}>
                    <Typography>Grand Total: Rp.{transactionDetail.totalPrice} </Typography>
                </Grid>

              </Grid>
            </Paper>
            </CardContent>

          </Card>
          
        </Paper>
    </Container>
  )
}

export default TransactionDetail