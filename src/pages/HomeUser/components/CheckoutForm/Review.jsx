import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import { Grid, Box, Container, Typography, Paper, Dialog, List, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar, ListItemAvatar, ListItemText, ListItem, Card, DialogTitle, CardActions, Divider, Button, Input, TextField, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'


function Review() {
  const params = useParams();
  const [transactionDetail, setTransactionDetail] = useState({})
  const [userDetail, setUserDetail] = useState({})
  const [address, setAddress] = useState({})
  const [detail, setDetail] = useState([])


  const fetchTransactionDetail = async () => {
    try {
        const res = await axios.get(`/transaction/${params.transactionId}`, {params: {id: params.transactionId}});
        const  {data} = res
        setTransactionDetail(data.result[0]);
        setUserDetail(data.user[0]);
        setDetail(data.transactiondetail)
        console.log(data);
        if (data.address) {
          setAddress(data.address[0])
        }

        
    } catch (error) {
        console.log(alert(error.message));
    }
};


useEffect(() => {
    fetchTransactionDetail();
}, []);

  const columns = [
    { id:'productName', label: 'Product Name', align: 'center', minWidth: 100},
    { id:'quantity', label: 'Quantity', align: 'center', minWidth: 50},
    { id:'totalPrice', label: 'Total Price',align: 'center', minWidth: 60},
   
  ]

  return (
    <Container>
      <Paper variant='outlined'>
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
                    {detail
                      .map((item) => {
                      return(
                        <TableRow  key={item.id}>
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
          <Typography style={{display: 'flex', justifyContent: 'flex-end', paddingRight:'20px'}} variant="h6"  >SubTotal : Rp.{transactionDetail.totalPrice}</Typography>
      </Paper>
    </Container>
  )
}

export default Review