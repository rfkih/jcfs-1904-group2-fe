import { Typography,Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../../../../utils/axios'




function SalesReport() {
    const [ totalRevenue, setTotalRevenue] = useState(0)


    const getCompletedTransaction = async () => {
        try {
            const res = await axios.get("/transaction/completed");
            const { data } = res;
            const TotalRevenue = data.sumResult[0].total_revenue;
            setTotalRevenue(TotalRevenue);
        } catch (error) {
            console.log(alert(error.message));
        }
    }
    
    useEffect(() => {
        getCompletedTransaction();
    },[])
  return (
    <Container>
        <Grid container spacing ={2}>
            <Grid item xs={4}>
                <Typography>Total Revenue: {totalRevenue}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Total User</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Sold Item</Typography>
            </Grid>
        </Grid>
    </Container>
  )
}

export default SalesReport