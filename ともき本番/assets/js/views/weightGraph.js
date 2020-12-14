import Ajax from '../lib/Ajax.js';
// import User from '../lib/User';
const VueHighcharts = window['VueHighcharts'].default;
// const VueHighcharts2 = window['VueHighcharts'].default;



export default {
  
    //テンプレート//
    template: `
    <div id="input">

    <link rel="stylesheet" href="./assets/css/weightGraph.css">
        
        <div id="wrap">
           <header role="banner">
              <!-- nav追加 -->
              <!-- <button type="button" id="btn-menu"><img src="./assets/img/hamburger_menu.png" alt="メニューボタン"></button> -->
              
              <nav role="navigation" id="menu">
                  <ul>
                  <li><a href="#">食事</a></li>
                  <li><a href="#weight">体重</a></li>
                  <li><a href="#advise">アドバイス</a></li>
                  <li><a href="#menu">メニュー</a></li>
                  <li><a href="#calendar">カレンダー</a></li>
                  <li><a href="#settings">設定</a></li>
                  </ul>
              </nav>
              <h1>
                  <p>グラフ</p>
              </h1>       
          </header>
      <main role="main">
      <section class="weight-graph">
          <h2>体重</h2>
           <h3>60kg</h3>
           <p>目標　55kg</p>
           <figure class="highcharts-figure">
              <!-- <div id="container"></div> -->
              <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
          </figure>
          <button class="weight-btn">体重記録</button>
          <div>
              <button type="button" name="week"  @click="weightChartChange('?selectNumber=1')">1週間</button>
              <button type="button" name="month" @click="weightChartChange('?selectNumber=2')">1ヶ月</button>
              <button type="button" name="week"  @click="weightChartChange('?selectNumber=3')">1年</button>
           </div>
       </section>
       <section class="calories-graph">
           <h2>摂取カロリー</h2>
           <h3> 1200kcal</h3>
           <p> 摂取目安 1500kcal</p>
           <figure class="highcharts-figure">
               <div id="container2"></div>
               <vue-highcharts :options="options2" ref="lineCharts2"></vue-highcharts>
           </figure>
           <div>
               <button>1週間</button>
               <button>1ヶ月</button>
               <button>1年</button>
           </div>
      </section>
      </main>				
      </div>

      <div class="loading" v-if="loading">
      <img src="assets/img/Preloader.gif">
      </div>

    </div>
    `,
    // グラフ表示のためのコンポーネント
    components: {
      'vue-highcharts':VueHighcharts,
    },
    // 変数
    data()　{
      return{
        data: [],
        userWeight: [],
        dataDate: ["0"], // x軸更新するときに配列の0番目は参照されないっぽい直し方わからんから0番目にダミーデータ入れてる。いつか直したい。
        dataWeight: [],
        loading: false,
        userWeightURL: `http://192.168.1.10:8000/auth/user-weight/`,

        // Vue HighCharts
        options: {
          chart: {
            type: 'spline'
          },
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
            
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 1
            }
          },
          series: [],
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
        },
        // カロリーグラフ開始

        options2: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'Temperature'
            },
            labels: {
              formatter: function () {
                return this.value + '°';
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            data: []
          }]
        }
      }
    },
    //　初期化
    mounted(){
      this.init();
    },
    methods: {
      init() {
        let lineCharts = this.$refs.lineCharts
        lineCharts.delegateMethod('showLoading', 'Loading...');
        this.loading = true;
        Ajax(this.userWeightURL,'GET', localStorage.getItem('access'), null )
          .then((res) => {
            this.userWeight = res;
            for(let i = 0; i < this.userWeight.length; i++) {
              this.dataDate.push(this.userWeight[i].date);
              this.dataWeight.push(this.userWeight[i].weight);
            }
            lineCharts.addSeries({name:"体重", showInLegend: false,  data: this.dataWeight} );
            lineCharts.getChart().xAxis[0].setCategories(this.dataDate);
            lineCharts.hideLoading();
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });   
      },
      // ボタン押されたときの処理
      weightChartChange(parameter){
        let lineCharts = this.$refs.lineCharts
        lineCharts.removeSeries();
        lineCharts.delegateMethod('showLoading', 'Loading...');
        this.loading = true;
        Ajax(this.userWeightURL + parameter,'GET', localStorage.getItem('access'), null )
          .then((res) => {
            this.userWeight = res;
            this.dataDate.splice(1);
            this.dataWeight.splice(0);
            console.log(this.userWeight);
            for(let i = 0; i < this.userWeight.length; i++) {
              this.dataDate.push(this.userWeight[i].date);
              this.dataWeight.push(this.userWeight[i].weight);
            }
            lineCharts.addSeries({name:"体重", showInLegend: false,  data: this.dataWeight} );
            lineCharts.getChart().xAxis[0].setCategories(this.dataDate);
            lineCharts.hideLoading();
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
};
