  Highcharts.chart('container', {
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        xAxis: {
          accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
          }
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [ {
          name: '体重',
          data: [54, 55, 56, 53, 55, 57, 52, 51]
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      });

