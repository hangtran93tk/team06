import Ajax from '../lib/Ajax.js';
// import { HighchartsVue } from '../vendor/highcharts-vue.min.js';


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
              <div is="script" src="./assets/js/menuButton.js"></div>  
              <button type="button" id="btn-menu" class="btn-menu-head">
                    <img src="./assets/img/hamburger_menu.png" alt="メニューボタン">
                </button>
              
              <nav role="navigation" id="menu">
                    <ul>
                    <li><router-link :to="'/main'">食事</router-link></li>
                    <li><router-link :to="'/weightGraph'">体重</router-link></li>
                    <li><router-link :to="'/advice'">アドバイス</router-link></li>
                    <li><router-link :to="'/menuTable'">メニュー</router-link></li>
                    <li><router-link :to="'/calendar'">カレンダー</router-link></li>
                    <li><router-link :to="'/setting'">設定</router-link></li>
                    </ul>
                </nav>
              <h1>
                  <p>グラフ</p>
              </h1>       
          </header>
      <main role="main">
      <section class="weight-graph">
          <h2>体重</h2>
           <h3>目標　{{ goal_weight }} kg</h3>
           <figure class="highcharts-figure">
              <!-- <div id="container"></div> -->
              <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
          </figure>
          <button id="postWeight" class="weight-btn" @click="showDialog = true">体重記録</button>
          <!-- <button class="weight-btn" @click="showDialog = true">体重記録</button>
           <div v-if="showDialog" class="weight-dialog">
            <button @click="showDialog = false" class="closeDialog">戻る</button>
          </div > -->
          <!--  ここにでテスト中 -->         
          <div class="modal-mask" v-if="showDialog">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-body">
                  <div class="container">
                    <div class="range-slider">
                      <span id="rs-bullet" class="rs-label">{{ postWeight }}</span>
                      <input id="rs-range-line" class="rs-range" type="range" value="20" min="20" max="120" step="0.1" v-model="postWeight">
                    </div> 
                  </div>
                </div>
                <div class="modal-footer">
                  <button @click="showDialog = false" class="closeDialog">閉じる</button>
                  <button @click="showDialog = false; postUserWeight()" class="closeDialog">登録</button>
                </div>
              </div>
            </div>
            <div is="script" src="assets/js/lib/script.js"></div>
          </div>
          <div>
              <button type="button" name="week"  @click="weightChartChange('?selectNumber=1')">1週間</button>
              <button type="button" name="month" @click="weightChartChange('?selectNumber=2')">1ヶ月</button>
              <button type="button" name="week"  @click="weightChartChange('?selectNumber=3')">1年</button>
           </div>
       </section>
       <section class="calories-graph">
           <h2>摂取カロリー</h2>
           <h3>摂取目安 {{ goal_kcal }}Kcal</h3>

           <figure class="highcharts-figure">
               <div id="container2"></div>
               <vue-highcharts :options="options2" ref="lineCharts2"></vue-highcharts>
           </figure>
           <div>
            <button type="button" name="week"  @click="kcalChartChange('?selectNumber=1')">1週間</button>
            <button type="button" name="month" @click="kcalChartChange('?selectNumber=2')">1ヶ月</button>
            <button type="button" name="week"  @click="kcalChartChange('?selectNumber=3')">1年</button>
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
        userKcal: [],
        dataDate: ["0"], // x軸更新するときに配列の0番目は参照されないっぽい直し方わからんから0番目にダミーデータ入れてる。いつか直したい。
        dataWeight: [],
        dataKcalDate: ["0"],
        dataKcal: [],
        loading: false,
        userWeightURL: `http://180.46.192.112:8000/auth/user-weight/`,
        userKcalURL: 'http://180.46.192.112:8000/menu/get-Kcal/',
        goal_weight: null,
        goal_kcal: null,
        showDialog: false,
        postWeight: 55,
        

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
            gridLineInterpolation: 'polygon',
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
        let lineCharts2 = this.$refs.lineCharts2
        lineCharts.delegateMethod('showLoading', 'Loading...');
        lineCharts2.delegateMethod('showLoading', 'Loading...');
        this.loading = true;
        Ajax(this.userWeightURL,'GET', localStorage.getItem('access'), null )
          .then((res) => {
            this.userWeight = res;
            console.log(res);
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
        Ajax(this.userKcalURL,'GET', localStorage.getItem('access'), null )
          .then((res) => {
            this.userKcal = res;
            console.log(res);
            for(let i = 0; i < this.userKcal.length; i++) {
              this.dataKcalDate.push(this.userKcal[i].date);
              this.dataKcal.push(this.userKcal[i].kcal);
            }
            lineCharts2.addSeries({name:"カロリー", showInLegend: false,  data: this.dataKcal} );
            console.log(this.dataKcalDate)
            lineCharts2.getChart().xAxis[0].setCategories(this.dataKcalDate);
            lineCharts2.hideLoading();
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
        Ajax("http://180.46.192.112:8000/auth/get-goal-weight/",'GET', localStorage.getItem('access'), null )
          .then((res) => {
            this.goal_weight = res.goal_weight;
          })
          .catch((err) => {
            console.log(err);
          });
          Ajax('http://180.46.192.112:8000/auth/get-GoalKcal/','GET', localStorage.getItem('access'), null )
          .then((res) => {
             console.log(res);
             this.goal_kcal = res[0].kcal;
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
      // 体重登録
      postUserWeight(){
        const obj = {
          "weight": this.postWeight
        };
        Ajax(`http://180.46.192.112:8000/auth/user-weight/`,'POST', localStorage.getItem('access'), obj)
        .then((res) => {
          this.weightChartChange('?selectNumber=1');
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      },
      //カロリーグラフ　ボタン押されたときの処理
      kcalChartChange(parameter){
        let lineCharts2 = this.$refs.lineCharts2
        lineCharts2.removeSeries();
        lineCharts2.delegateMethod('showLoading', 'Loading...');
        this.loading = true;
        Ajax(this.userKcalURL + parameter,'GET', localStorage.getItem('access'), null )
          .then((res) => {
            this.userKcal = res;
            this.dataKcalDate.splice(1);
            this.dataKcal.splice(0);
            console.log(this.userKcal);
            for(let i = 0; i < this.userKcal.length; i++) {
              this.dataKcalDate.push(this.userKcal[i].date);
              this.dataKcal.push(this.userKcal[i].kcal);
            }
            lineCharts2.addSeries({name:"カロリー", showInLegend: false,  data: this.dataKcal} );
            console.log(this.dataKcalDate)
            lineCharts2.getChart().xAxis[0].setCategories(this.dataKcalDate);
            lineCharts2.hideLoading();
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    }
    
};



