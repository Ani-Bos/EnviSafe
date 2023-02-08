import React from 'react'
import {Bar,Pie,Line} from 'react-chartjs-2'
import {Chart as ChartJS } from 'chart.js/auto'
function PieCha({chartData}) {
  return (
    <div>
        <Pie data={chartData} />
    </div>
  )
}

export default PieCha