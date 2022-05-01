import React, { useState , useEffect} from 'react'
import axios from '../../../../../../utils/axios'
import { useParams } from "react-router-dom";
import { Typography,Container, Grid, Card, CardContent,InputBase, Dialog, CardMedia, DialogContent, DialogActions, DialogTitle, DialogContentText, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import useStyles from './style'
import moment from 'moment';

function TransactionDetail() {
    const classes = useStyles();
    const params = useParams();
    const [ listProduct, setlistProduct] = useState([])
    const [ transactionDetail, setTransactionDetail] = useState({})
    const [ userDetail, setUserDetail] = useState ({})
    const [ address, setAddress] = useState({})
    const [ paymentProof, setPaymentProof ] = useState(0)
    const [ open, setOpen ] = useState(false)
    const date =  moment(transactionDetail.created_at).utc().format('LLL')

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

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        
      };


    const fetchTransactionDetail = async () => {
        try {
            const res = await axios.get(`/transaction/${params.transactionId}`, {params: {id: params.transactionId}});
            const  {data} = res
            setTransactionDetail(data.result[0]);
            setUserDetail(data.user[0]);
            console.log(data);
            if (data.address) {
              setAddress(data.address[0])
            }
  
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const fetchPaymentProof = async () => {
      try {
          const res = await axios.get(`/payment/paymentproof/${params.transactionId}`, {params: { transactionId: params.transactionId}});
          const  {data} = res 
          console.log(data) 
          if (data[0]) {
            setPaymentProof(data[0]);
          }         
                
      } catch (error) {
          console.log(error.message);
      }
  };

   
    useEffect(() => {
        fetchTransactionDetail();
        fetchPaymentProof();
    }, []);

    const onSendClick = () => {
      putTransactionStatusSend();
      handleClose();
      window.location.reload() 
       
    }

    const onRejectClick = () => {
      putTransactionStatusReject();
      handleClose(); 
      window.location.reload() 
    }

    const putTransactionStatusSend = async () => {
      try {
          const res = await axios.put(`/transaction/send/${params.transactionId}`,{ params: { status: 'sent', id: params.transactionId } } );
          const  {data} = res
          console.log(data)
           
      } catch (error) {
          console.log(alert(error.message));
      }
    };

    
    const putTransactionStatusReject = async () => {
      try {
          const res = await axios.put(`/transaction/reject/${params.transactionId}`,{ params: { status: 'failed', id: params.transactionId } } );
          const  {data} = res
          console.log(data)
                 
      } catch (error) {
          console.log(alert(error.message));
      }
    };




    const columns = [
      { id:'product_id', label: 'Product Id', align: 'right', minWidth: 100},
      { id:'productName', label: 'Product Name', align: 'right', minWidth: 100},
      { id:'price', label: 'Price',align: 'right', minWidth: 100},
      { id:'quantity', label: 'Quantity', align: 'right', minWidth: 100},
      { id:'totalPrice', label: 'Total Price', align: 'right', minWidth: 100}
  ]

   


  return (
    <Container>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            Payment Proof
          </DialogTitle>
          <DialogContent>
            <Card>
              <CardMedia
                component="img"
                height="270"
                image={paymentProof.paymentPhoto}
                alt="..."
              />
            </Card>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={onRejectClick}>Reject</Button>
            <Button onClick={onSendClick}>Approve and Send</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

      </div>
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
                  <Typography>{date}</Typography>
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
              <Typography variant='h6'> Address Detail </Typography>
              <Grid container spacing={2}>
                <Grid container item xs={5}>
                  <Grid item xs={3}>
                    <Typography> Province </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>: {address.province}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography> City </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>: {address.city}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography> District </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>: {address.district}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography> zipCode </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography>: {address.zipCode}</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={7}>
                  <Grid item xs={6}>
                    { transactionDetail.isByPresciption ? <Typography variant='h6'>Custom Order</Typography> : null }
                  </Grid>
                  <Grid item xs={6}>
                    {paymentProof ? <Button variant="outlined" onClick={handleClickOpen}>Show Payment Proof</Button> : <Button disabled variant="outlined" >Payment Proof not Available</Button> } 
                  </Grid>                 
                </Grid>
              </Grid>
            </CardContent>
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