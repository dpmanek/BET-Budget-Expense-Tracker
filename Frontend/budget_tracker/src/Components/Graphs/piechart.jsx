import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Expense Structure'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Expense',
      colorByPoint: true,
      data: [{
        name: 'Party',
        y: 61.41,
        sliced: true,
        selected: true
      }, {
        name: 'Food & Drinks',
        y: 11.84
      }, {
        name: 'Transportation',
        y: 10.85
      }, {
        name: 'Shopping',
        y: 4.67
      }, {
        name: 'Communication,PC',
        y: 4.18
      }, {
        name: 'Vehicle',
        y: 1.64
      }, {
        name: 'Others',
        y: 1.6
      }]
    }]
  
}

const Pie = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>

export default Pie;