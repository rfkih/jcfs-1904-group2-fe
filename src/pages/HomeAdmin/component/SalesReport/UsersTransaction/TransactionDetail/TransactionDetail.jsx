import React, { useState , useEffect} from 'react'
import axios from '../../../../../../utils/axios'
import { useParams } from "react-router-dom";
import { Typography,Container, Grid, Card, CardContent,InputBase, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'

function TransactionDetail() {
    const params = useParams();
    const [ listProduct, setlistProduct] = useState({})
    const [ transactionDetail, setTransactionDetail] = useState({})
    const [ userDetail, setUserDetail] = useState ({})



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
            setTransactionDetail(data);

            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchTransactionDetail();
    }, [])

   


  return (
    <Container>
            <Typography>Test </Typography>
    </Container>
  )
}

export default TransactionDetail