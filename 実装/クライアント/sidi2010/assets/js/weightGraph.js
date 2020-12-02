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
            btnImg.setAttribute('src', 'C:/Users/81805/Desktop/sidi1/assets/img/hamburger_menu.png');

        // class="active" がなかったら
        } else {
            // 追加
            menu.classList.add('active');
            btnImg.setAttribute('src', 'C:/Users/81805/Desktop/sidi1/assets/img/close.png');
        }
    });

    // メニュークリックされたら消す処理
    menu.querySelector('ul').childNodes.forEach(function(item){
        item.addEventListener('click', function(){
            // 消す
            menu.classList.remove('active');
            btnImg.setAttribute('src', 'C:/Users/81805/Desktop/sidi1/assets/img/hamburger_menu.png');
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
})();
