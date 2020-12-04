(function() {
    "use strict";

    const btnMenu = document.querySelector('#btn-menu');
    const btnImg = btnMenu.querySelector('img');
    const menu = document.querySelector('#menu');

    btnMenu.addEventListener('click', function() {
        // class="active" があったら
        if ( menu.classList.contains('active') ) {
            // 消す
            menu.classList.remove('active');
            btnImg.setAttribute('src', './assets/img/hamburger_menu.png');

        // class="active" がなかったら
        } else {
            // 追加
            menu.classList.add('active');
            btnImg.setAttribute('src', './assets/img/close.png');
        }
    });

    // メニュークリックされたら消す処理
    menu.querySelector('ul').childNodes.forEach(function(item){
        item.addEventListener('click', function(){
            // 消す
            menu.classList.remove('active');
            btnImg.setAttribute('src', './assets/img/hamburger_menu.png');
        });
    });

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
            pointStart: 1
          }
        },
        series: [ {
          name: '体重',
          data: [54, 55, null, 56, 56, 55, 53]
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

      Highcharts.chart('container2', {
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
          name: 'カロリー',
          data: [1480, 1600, 1500, 1550, 1410, 1400, 1200, 1670]
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
})();
