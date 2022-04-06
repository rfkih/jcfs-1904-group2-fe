import React, { useState } from 'react'
import Chart from 'chart.js/auto'
import {Doughnut, Line} from 'react-chartjs-2'
import { Typography,Container, Grid, Card, CardContent, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'






function ChartRevenue({graphData}) {
  const [range, setRange] = useState(6)
  

  const months = graphData.map((graphData) => (
     graphData.month
  ))
  const total_revenue = graphData.map((graphData) => (
    graphData.total_revenue
  ))

    
  const displayedmonths = months.slice(-range)
  const displayedrevenue = total_revenue.slice(-range)
  console.log();

  const handleChange = (e) => {
    setRange(e.target.value)
  };

console.log(displayedmonths);
  

  const data = {
    labels: displayedmonths,
    datasets: [{
      label: 'Revenue',
      data: displayedrevenue,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
  
  


  return (
    <div>
     Chart.j ss
     <Container>
       <Grid>
       <FormControl fullWidth>
  <InputLabel id="range-select-label">Age</InputLabel>
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
    <MenuItem key={3} value={30} >All Time</MenuItem>
  </Select>
</FormControl>
       </Grid>
      <Line data={data}/>
     </Container>
    
  </div>
  )
}

export default ChartRevenue