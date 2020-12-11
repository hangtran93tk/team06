Highcharts.chart('container', {

  chart: {
    polar: true,
    type: 'line'
  },
  title: {
    text: '',
    x: -80
  },
  pane: {
    size: '80%'
  },

  xAxis: {
    categories: ['カロリー', '第一群点数', '第二群点数', '第三群点数',
      '第四群点数'],
    tickmarkPlacement: 'on',
    lineWidth: 0
  },
  yAxis: {
    gridLineInterpolation: 'polygon',
    lineWidth: 0,
    min: 0
  },

  tooltip: {
    shared: true,
    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
  },

  legend: {
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical'
  },

  series: [{
    name: '',
    data: [43, 19, 60, 35, 17],
    pointPlacement: 'off'
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 300
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
/**progress chart */
const progress = document.querySelector('.progress-done');

progress.style.width = progress.getAttribute('data-done') + '%';
progress.style.opacity = 1;
