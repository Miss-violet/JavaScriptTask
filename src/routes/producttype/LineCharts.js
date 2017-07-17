import React from 'react'
import echarts from 'echarts'

const LineCharts = ({ lineCharts }) => {

    if (lineCharts.data && lineCharts.script) {

      const data = lineCharts.data
      const lineScript = lineCharts.script

      eval(lineScript)
      
      const lineChart = document.querySelector('#lineChart')
      
      const myLineChart = echarts.init(lineChart)

      myLineChart.setOption(window.option_line)
  }

    return (
        <div id="lineChart" className='lineCharts'></div>
    )
}

export default LineCharts