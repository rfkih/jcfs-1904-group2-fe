import { Typography,Container, Grid, Card, CardContent,Table, CardActions,Paper, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from '../../../../../utils/axios'
import { Link } from 'react-router-dom'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers'
import moment from 'moment'

function RevenueDetail() {
    const [selectedDateFrom, setSelectedDateFrom] = useState( ("2021-09-12"))
    const [selectedDateTo, setSelectedDateTo] = useState( ("2021-10-12"))
    const [selectedYearFrom, setSelectedYearFrom] = useState( ("2021"))
    const [selectedYearTo, setSelectedYearTo] = useState( ("2021-10-12"))
    const [ revenue, setRevenue] = useState(0)
    const [ month, setMonth] = useState([])
    const [ revenueYear, setRevenueYear] = useState(0)
    const [ year, setYear] = useState([])
    const monthName = [
        { id: 1, Name:"January"},
        { id: 2, Name:"February"},
        { id: 3, Name:"March"},
        { id: 4, Name:"April"},
        { id: 5, Name:"May"},
        { id: 6, Name:"June"},
        { id: 7, Name:"July"},
        { id: 8, Name:"August"},
        { id: 9, Name:"September"},
        { id: 10, Name:"October"},
        { id: 11, Name:"November"},
        { id: 12, Name:"December"},
    ]


    month.forEach((item)=>{
       
        monthName.map((name) => {
            if (item.month == name.id) {
               item.monthName = name.Name   
            }
        })
    });

    const handleYearChangeFrom = (date) => {
        setSelectedYearFrom(date)
    }

    const handleYearChangeTo = (date) => {
        setSelectedYearTo(date)
    }

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date)
    }
    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date)
    }


    const getTransactionHandler = () => {
        getTransactionByDate();
    }

    const getTransactionYearHandler = () => {
        getTransactionByYear();
    }

    

   

    const getTransactionByDate = async () => {
        const setDateFrom = moment(selectedDateFrom).utc().format('YYYY-MM-DD')
        const setDateTo = moment(selectedDateTo).utc().format('YYYY-MM-DD')
        const date = `where created_at between '${setDateFrom}' and '${setDateTo} 23:59:59'`
        try {
            const res = await axios.get("transaction/date", {params: { date }});
            const { data } = res;
            setMonth(data.month);
            setRevenue(data.result[0].total_revenue);
        } catch (error) {
            console.log(alert(error.message));
        }
    }

    


    const getTransactionByYear = async () => {
        const setYearFrom = moment(selectedYearFrom).utc().format('YYYY')
        const setYearTo = moment(selectedYearTo).utc().format('YYYY')
        const year = `where year(created_at) between '${setYearFrom}' and '${setYearTo}'`
        try {
            const res = await axios.get("transaction/year", {params: { year }});
            const { data } = res;
            setRevenueYear(data.total[0].total_revenue)
            setYear(data.result)
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const columns = [
        { id:'year', label: 'Year', align: 'right', minWidth: 100},
        { id:'monthName', label: 'Month', align: 'right', minWidth: 100},
        { id:'total_revenue', label: 'Revenue', align: 'right', minWidth: 100},
    ]
    const columnsYear = [
        { id:'year', label: 'Year', align: 'right', minWidth: 100},
        { id:'total_revenue', label: 'Revenue', align: 'right', minWidth: 100},
    ]


  return (
    <Container >
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography>Detailed Revenue By Month</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Detailed Revenue By Year</Typography>
            </Grid>
                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid direction="row" container justifyContent="space-evenly" alignItems="flex-end" spacing={2}>
                            <Grid item xs={5}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy/MM/dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='Select From'
                                    value={selectedDateFrom}
                                    onChange={handleDateChangeFrom}
                                />   
                            </Grid>                      
                            <Grid item xs={5}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy/MM/dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='To'
                                    value={selectedDateTo}
                                    onChange={handleDateChangeTo}
                                /> 
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={getTransactionHandler}> Search </Button>
                            </Grid>
                        </Grid>
                        
                    </MuiPickersUtilsProvider>

                </Grid>
                <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid direction="row" container justifyContent="space-evenly" alignItems="flex-end" spacing={2}>
                            <Grid item xs={5}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy'
                                    margin='normal'
                                    id='date-picker'
                                    label='Select From'
                                    views={['year']}
                                    value={selectedYearFrom}
                                    onChange={handleYearChangeFrom}
                                />   
                            </Grid>                      
                            <Grid item xs={5}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy'
                                    margin='normal'
                                    id='date-picker'
                                    label='To'
                                    views={['year']}
                                    value={selectedYearTo}
                                    onChange={handleYearChangeTo}
                                /> 
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={getTransactionYearHandler}> Search </Button>
                            </Grid>
                        </Grid>
                        
                    </MuiPickersUtilsProvider>

                    
                </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" color="primary" >Revenue by Month :</Typography>
                        <Typography variant="body1">Rp.{revenue}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" color="primary" >Revenue by Year :</Typography>
                        <Typography variant="body1">Rp. {revenueYear}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                        key={column.month}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                   {month.map((item) => {
                                       return (
                                           <TableRow hover role="checkbox" key={item.id} >
                                               {columns.map((column) => {
                                                   const value = item[column.id]
                                                   return(
                                                       <TableCell key = {column.id} align={column.align}>
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
                </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {columnsYear.map((column) => (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                   {year.map((item) => {
                                       return (
                                           <TableRow hover role="checkbox" key={item.id} >
                                               {columnsYear.map((column) => {
                                                   const value = item[column.id]
                                                   return(
                                                       <TableCell key = {column.id} align={column.align}>
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
                </Paper>

            </Grid>
        </Grid>
    </Container>
  )
}

export default RevenueDetail