import React from 'react'
import echarts from 'echarts'

const PieCharts = ({ pieCharts }) => {

    if (pieCharts.data && pieCharts.script) {

      const data = pieCharts.data
      const pieScript = pieCharts.script

      eval(pieScript)
      
      const pieChart = document.querySelector('#pieChart')
      
      const myPieChart = echarts.init(pieChart)

      myPieChart.setOption(window.option_pie)
  }

    return (
        <div id="pieChart" className='pieCharts'></div>
    )
}

export default PieCharts