Highcharts.chart('container', {

    chart: {
      polar: true,
      type: 'line'
    },
    title: {
      text: 'Budget vs spending',
      x: -80
    },
  
    pane: {
      size: '80%'
    },
  
    xAxis: {
      categories: ['カロリー','第一群点数','第二群点数','第三群点数','第四群点数'],
      tickmarkPlacement: 'on',
      lineWidth: 0
    },
  
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
    },
  
  
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
  
    series: [{
      name: 'Allocated Budget',
      data: [43000, 19000, 60000, 35000, 17000],
      pointPlacement: 'on'
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          pane: {
            size: '70%'
          }
        }
      }]
    }
  
  });