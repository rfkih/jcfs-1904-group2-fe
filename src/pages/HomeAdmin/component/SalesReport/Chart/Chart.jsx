import React from 'react'
import Chart from 'chart.js/auto'
import {Doughnut, Line} from 'react-chartjs-2'






function ChartRevenue({graphData}) {

  

  const months = graphData.map((graphData) => (
     graphData.month
  ))
  const total_revenue = graphData.map((graphData) => (
    graphData.total_revenue
  ))


  const displayedmonths = months.slice(-12)
  const displayedrevenue = total_revenue.slice(-12)

  

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
     <div style={{width:"500px", margin:"0 auto"}}>
      <Line data={data}/>
     </div>
    
  </div>
  )
}

export default ChartRevenue