import React, { useState } from 'react'
import Chart from 'chart.js/auto'
import {Doughnut, Line} from 'react-chartjs-2'
import { Typography,Container, Grid, Card, CardContent, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'






function ChartRevenue({graphData, setRange}) {
  
  

  const months = graphData.map((graphData) => (
     graphData.month
  ))
  const total_revenue = graphData.map((graphData) => (
    graphData.total_revenue
  ))

    
 
  

  const handleChange = (e) => {
    setRange(e.target.value)
  };


  

  const data = {
    labels: months,
    datasets: [{
      label: 'Revenue',
      data: total_revenue,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
  
  


  return (
    <div>
    
     <Container>
       <Grid>
       <FormControl >
  <InputLabel id="range-select-label">Range</InputLabel>
  <Select
    labelId="range-select-label"
    id="range-select"
    label="Age"
    name="range"
    defaultValue=""
    onChange={handleChange}
  >
    <MenuItem key={1} value={6} >Last 6 month</MenuItem>
    <MenuItem key={2} value={12} >Last 1 Year</MenuItem>
    <MenuItem key={3} value={24} >Last 2 Year</MenuItem>
    <MenuItem key={4} value={30} >All Time</MenuItem>
  </Select>
</FormControl>
       </Grid>
      <Line data={data}/>
     </Container>
    
  </div>
  )
}

export default ChartRevenue