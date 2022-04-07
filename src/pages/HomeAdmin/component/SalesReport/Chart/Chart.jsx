import React, { useState } from 'react'
import Chart from 'chart.js/auto'
import {Doughnut, Line} from 'react-chartjs-2'
import { Typography,Container, Grid, Card, CardContent, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'






function ChartRevenue({graphData, setRange}) {
  const [name, setName] = useState([])

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
  
  

  const months = graphData.map((graphData) => (
     graphData.month
  ))

  const total_revenue = graphData.map((graphData) => (
    graphData.total_revenue
  ))

  

//  months.map((month) => {
   
//     monthName.map((names) => {
//       if (month === names.id) {
 
//       }
//     })
   
    
//   })

  

    
 
  

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