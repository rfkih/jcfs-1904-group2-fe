import { Typography,Container, Grid, Paper, Card, CardContent, CardActions, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Chart from './Chart/Chart'
import RevenueDetail from './RevenueDetail/RevenueDetail'
import axios from '../../../../utils/axios'
import { Link } from 'react-router-dom'
import useStyles from './style'
import 'date-fns'








function SalesReport() {
    const classes = useStyles();
    const [ revenueDetail, setRevenueDetail] = useState(false)
    const [ totalRevenue, setTotalRevenue] = useState(0)
    const [ revenueToday, setRevenueToday] = useState(0)
    const [ revenueSeven, setRevenueSeven] = useState(0)
    const [ revenueThirty, setRevenueThirty] = useState(0)
    const [ countUser, setCountUser ] = useState(0)
    const [ totalSold, setTotalSold] = useState(0)
    const [ graphData, setGraphData ] = useState([])
    const [ range, setRange] = useState(12)
    const [ year, setYear] = useState(null)
    const [ sortUser, setSortUser] = useState('')
    const [ keywordUser, setKeywordUser] = useState('')
  
 


 

    
    const revenueDetailHandler = () => {
        setRevenueDetail(!revenueDetail)
    }



    
    const getCompletedTransaction = async () => {
        
        const month = {month: range, yeardata: year}
        try {
            const res = await axios.get("/transaction/completed", {params: (month)});
            const data  = res.data;
            setTotalRevenue(data.sumResultAll[0].total_revenue);
            setRevenueThirty(data.sumResultThirty[0].total_revenue);
            setRevenueSeven(data.sumResultSeven[0].total_revenue);
            setGraphData(data.detailTransactionMonth);
           if(data.sumResultToday[0].total_revenue){
            setRevenueToday(data.sumResultToday[0].total_revenue)
           } 
        } catch (error) {
            console.log(alert(error.message));
        }
    }

    const getTransactionDetail = async () => {
        try {

            const res = await axios.get("/transactiondetails")
            const data  = res.data;
            setTotalSold(data.totalSold[0].total_sold);
        } catch (error) {
            console.log(alert(error.message));
        }
    }

    const fetchUser = async () => {
        try {
            const res = await axios.get("/users/admin", {params: { pages:(``), sortUser, keywordUser }});
            const data  = res.data;
            setCountUser(data.userCount[0].user_count);
        } catch (error) {
            console.log(alert(error.message));
        }
    }
    useEffect(() => {
        getCompletedTransaction();
    },[range, year])
    useEffect(() => {
        fetchUser();
    })

    useEffect(() => {
        getTransactionDetail();
    })
  return (
    <div className={classes.content} >
    <Container  >
        <div className={classes.toolbar}/>
        <Grid container spacing ={2} >
            <Grid item xs={4}>
                {revenueDetail === false ? 
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="div" color="primary" >All Time Revenue </Typography>
                        <br/>
                        <Typography variant="h6">Rp. {totalRevenue}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={revenueDetailHandler}>Show Details</Button>
                    </CardActions>
                   
                </Card> : 
                <Card>
                    <CardContent>
                        <Grid container spacing ={2}>
                            <Grid item xs={8}>
                                <Typography variant="h6" component="div" color="primary" >Last 30 Days Revenue </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1" >Rp. {revenueThirty}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h6" component="div" color="primary" >Last 7 Days Revenue </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="subtitle1"  >Rp. {revenueSeven}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h6" component="div" color="primary" >Todays Revenue </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: 14 }}  >Rp. {revenueToday}</Typography>
                            </Grid>
                        </Grid>    
                    </CardContent>
                    <CardActions>
                        <Button onClick={revenueDetailHandler}>Back</Button>
                        <Button>More...</Button>
                    </CardActions>
                </Card> 
            }      
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="div" color="primary" >Total User</Typography>
                            <br/>
                        <Typography variant="h6">{countUser}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/userstransaction`}>Show Details</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="div" color="primary" >Total Item Sold</Typography>
                            <br/>
                        <Typography variant="h6">{totalSold}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/itemsold`}>Show Details</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <Chart graphData={graphData} setRange={setRange} setYear={setYear} />
        <Paper className={classes.paper}>
            <RevenueDetail/>
        </Paper>
    </Container>
    </div>
  )
}

export default SalesReport