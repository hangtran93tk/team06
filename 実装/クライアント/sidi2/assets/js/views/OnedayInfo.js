import Ajax from '../lib/Ajax.js';

const VueHighcharts = window['VueHighcharts'].default;
const Highcharts = window["Highcharts"]


export default {
    // テンプレート //================//
    template: `
    <div id="input">
        <link rel="stylesheet" href="./assets/css/main.css">
        <div id="wrap">
            <header role="banner" class="head-menu">
                <!-- nav追加 -->
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
                <h1 class="box-title">                    
                   
                    <p class="txt-tile date">{{ year }}年{{ month }}月{{ date }}日</p>
                    
                </h1>   
            </header>

            <main role="main">
                <div class="grid">
                    <section class="calories">
                        <h2>摂取目安カロリー</h2>
                        <div class="progress">
                            <div class="progress-done">{{ percent }} %</div>
                        </div>
                        <div class="index-calories">
                            <p class="item-name">現在　{{ nowKcal }}kcal</p>
                            <p class="item-name">目安  {{ goalKcal }}kcal</p>											
                        </div>
                        
                    </section>	
                        <div class="oneday_info">
                            <button class="info" @click="eatTimeChartChange('')">
                                <p>全体</p>
                                <!-- <p class="input-calories">1000kcal</p> -->
                            </button>
                            <button class="info" @click="eatTimeChartChange('&eatTime=1') ">
                                <div class="icon icon-breakfast"></div>							
                                <p class="input-calories">朝食</p>
                            </button>
                            <button class="info" @click="eatTimeChartChange('&eatTime=2')">
                                <div class="icon icon-lunch"></div>								
                                <p class="input-calories">昼食</p>
                            </button>
                            <button class="info" @click="eatTimeChartChange('&eatTime=3')">
                                <div class="icon icon-dinner"></div>
                                <p class="input-calories">夕食</p>
                            </button>
                            <button class="info" @click="eatTimeChartChange('&eatTime=4')">
                                <div class="icon icon-snack"></div>
                                <p class="input-calories">間食</p>
                            </button>													
                        </div>


                        <div class="highcharts-figure">
                            <!-- <div id="container"></div> -->
                            <vue-highcharts :options="options" :highcharts="Highcharts" ref="lineCharts"></vue-highcharts>
                        </div>
                        
                    <div class="meal_register">
                      <div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-breakfast"></span>
                                    <span class="name">朝食</span>
                                </div>
                            </div>

                           
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 1">
                          <h3 class="meal-detail-name">{{ userEatInfo.jp_name }}</h3>
                            <ul> 
                              <li>カロリー     : {{ userEatInfo.kcal }}kcal</li>
                              <li>第一群点数 : {{ userEatInfo.one_point }}</li>
                              <li>第二群点数 : {{ userEatInfo.two_point }}</li>
                              <li>第三群点数 : {{ userEatInfo.three_point }}</li>
                              <li>第四群点数 : {{ userEatInfo.four_point }}</li>
                            </ul>
                        </div>
                      </div>
                      <div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-lunch"></span>
                                    <span class="name">昼食</span>
                                </div>
                            </div>
                           
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 2">
                          <h3 class="meal-detail-name">{{ userEatInfo.jp_name }}</h3>
                            <ul> 
                              <li>カロリー     : {{ userEatInfo.kcal }}kcal</li>
                              <li>第一群点数 : {{ userEatInfo.one_point }}</li>
                              <li>第二群点数 : {{ userEatInfo.two_point }}</li>
                              <li>第三群点数 : {{ userEatInfo.three_point }}</li>
                              <li>第四群点数 : {{ userEatInfo.four_point }}</li>
                            </ul>
                        </div>
                      </div>
                      <div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-dinner"></span>
                                    <span class="name">晩食</span>
                                </div>
                            </div>
                           
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 3">
                          <h3 class="meal-detail-name">{{ userEatInfo.jp_name }}</h3>
                            <ul> 
                              <li>カロリー     : {{ userEatInfo.kcal }}kcal</li>
                              <li>第一群点数 : {{ userEatInfo.one_point }}</li>
                              <li>第二群点数 : {{ userEatInfo.two_point }}</li>
                              <li>第三群点数 : {{ userEatInfo.three_point }}</li>
                              <li>第四群点数 : {{ userEatInfo.four_point }}</li>
                            </ul>
                        </div>
                      </div>
                      <div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-teabreak"></span>
                                    <span class="name">間食</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 4">
                          <h3 class="meal-detail-name">{{ userEatInfo.jp_name }}</h3>
                            <ul> 
                              <li>カロリー     : {{ userEatInfo.kcal }}kcal</li>
                              <li>第一群点数 : {{ userEatInfo.one_point }}</li>
                              <li>第二群点数 : {{ userEatInfo.two_point }}</li>
                              <li>第三群点数 : {{ userEatInfo.three_point }}</li>
                              <li>第四群点数 : {{ userEatInfo.four_point }}</li>
                            </ul>
                        </div>
                    </div>
                    
                  </div>
                </div>							
            </main>	
        </div>
        <div is="script" src="./assets/js/menuButton.js"></div>  
        
        <div class="loading" v-if="loading">
            <img src="assets/img/Preloader.gif">
        </div>

    </div>
        `,

        components: {
            'vue-highcharts':VueHighcharts,
          },
          // 変数
          data()　{
            return{
              Highcharts: Highcharts,
              data: [],
              userEat: [],
              dataDate: ["0"], // x軸更新するときに配列の0番目は参照されないっぽい直し方わからんから0番目にダミーデータ入れてる。いつか直したい。
              dataEat: [0,0,0,0],
              loading: false,
              nowKcal:null,
              goalKcal: null,
              showDialog: false,
              ActiveBtn: false,
              percent: null,
              year : sessionStorage.getItem('checkdate').substring(6,10),
              month: sessionStorage.getItem('checkdate').substring(11,13),
              date: sessionStorage.getItem('checkdate').substring(14,16),
              userEatInfos: [], //　menu/get-MenuInfo　の値を格納する
              testdate: sessionStorage.getItem('checkdate'),
              
      
              // Vue HighCharts
              options: {
                pane:{
                  startAngle: -45,
                },
                chart: {
                  polar: true,
                  type: 'line',
                  height: 255,
                  width: 345,
                },
                title: {
                  text: ''
                },
                subtitle: {
                  text: ''
                },
                yAxis: {
                  gridLineColor: '#999999',
                  gridLineInterpolation: 'polygon',
                  title: {
                    text: ''
                  },
                },
                xAxis: {
                  gridLineColor: '#dddddd',
                  lineWidth: 0,
                  categories: ['','第1群', '第2群', '第3群','第4群'],
                  
                },
                plotOptions: {
                  series: {
                    label: {
                      connectorAllowed: false
                    },
                    pointStart: 1
                  }
                },
                series: [],//{ data: [ 6, 6, 6, 10],showInLegend: false,}
                responsive: {
                  rules: [{
                    condition: {
                      maxWidth: 500,
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
            }
          },
          //　初期化
          mounted(){
            this.init();
          },
          methods: {
            init() {                
                Ajax('http://180.46.192.112:8000/auth/update-KcalID/','GET', localStorage.getItem('access'), null )
               
                Ajax('http://180.46.192.112:8000/auth/get-GoalKcal/','GET', localStorage.getItem('access'), null )
                 .then((res) => {
                  console.log(res);
                  this.goalKcal = res[0].kcal;
                  let lineCharts = this.$refs.lineCharts
                  lineCharts.delegateMethod('showLoading', 'Loading...');
                //   Ajax('http://180.46.192.112:8000/menu/get-MenuInfo/','GET', localStorage.getItem('access'), null)
                  Ajax('http://180.46.192.112:8000/menu/get-MenuInfo/' + this.testdate ,'GET', localStorage.getItem('access'), null) // 過去のきろく取りたいとき
                  .then((res) => {
                    console.log(res);
                    this.userEatInfos = res;
                    //四群点数グラフ表示
                    for(let i = 0; i < this.userEatInfos.length; i++) {
                      this.nowKcal += res[i].kcal;
                      this.dataEat[0] += res[i].one_point;
                      this.dataEat[1] += res[i].two_point;
                      this.dataEat[2] += res[i].three_point;
                      this.dataEat[3] += res[i].four_point;
                    }
                    console.log("データ" + this.dataEat);
                    lineCharts.addSeries({name: "点数",showInLegend: false,  data: this.dataEat} );
                    lineCharts.hideLoading();                                    
                    //カロリーグラフ表示
                    const progress = document.querySelector('.progress-done');       
                    this.percent = parseInt((this.nowKcal / this.goalKcal) * 100, 10);
                    progress.style.width = Math.min(this.percent, 100) + '%';
                      if (this.nowKcal > this.goalKcal) {
                      progress.style.background = "linear-gradient(to left, #fc8621, #f9e0ae)";
                    } else {
                      progress.style.background = "linear-gradient(to left, #58A054, #9EE097)";
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                    
                 })
                 .catch((err) => {
                    console.log(err);
                  });
                //目標カロリー取得
              Ajax("http://180.46.192.112:8000/auth/get-goal-weight/",'GET', localStorage.getItem('access'), null )
                .then((res) => {
                  this.goal_weight = res.goal_weight;
                })
                .catch((err) => {
                  console.log(err);
                });
      
            },
            // ボタン押されたときの処理
            eatTimeChartChange(parameter){
              let lineCharts = this.$refs.lineCharts
              lineCharts.removeSeries();
              lineCharts.delegateMethod('showLoading', 'Loading...');
              this.loading = true;
              Ajax('http://180.46.192.112:8000/menu/get-MenuInfo' + this.testdate + parameter,'GET', localStorage.getItem('access'), null )
                .then((res) => {
                  this.userEatInfos = res;
                  for(let i = 0; i < this.dataEat.length; i++) {
                    this.dataEat[i] = 0;
                  }
                  for(let i = 0; i < this.userEatInfos.length; i++) {
                    this.dataEat[0] += res[i].one_point;
                    this.dataEat[1] += res[i].two_point;
                    this.dataEat[2] += res[i].three_point;
                    this.dataEat[3] += res[i].four_point;
                  }
                  console.log("切り替わったデータ" + this.dataEat);
                  lineCharts.addSeries({name: "点数",showInLegend: false,  data: this.dataEat} );
                  lineCharts.hideLoading();
                  this.loading = false;
                })
                .catch((err) => {
                  console.log(err);
                });
            }

          }
};