import React, { useState , useEffect} from 'react'
import axios from '../../../../../../utils/axios'
import { useParams } from "react-router-dom";

function TransactionDetail() {
    const params = useParams();
    const [ listProduct, setlistProduct] = useState({})



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

      console.log(listProduct);


  return (
    <div>TransactionDetail</div>
  )
}

export default TransactionDetail