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
                        <li><a href="./main.html">食事</a></li>
                        <li><a href="./weightGraph.html">体重</a></li>
                        <li><a href="./advice.html">アドバイス</a></li>
                        <li><a href="./menuTable.html">メニュー</a></li>
                        <li><a href="./calendar.html">カレンダー</a></li>
                        <li><a href="./setting.html">設定</a></li>
                    </ul>
                </nav>                
                <h1 class="box-title">
                    <!-- <span><img src="./assets/img/left.png" alt="left"></span>
                    <span><p class="date">2020年10月13日</p> </span>
                    <span><img src="./assets/img/right.png" alt="right"></span>	 -->
                    
                    <p class="date-pre icon-date"></p>
                    <p class="txt-tile date">2020年10月13日</p>
                    <p class="date-next icon-date"></p>
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
                            <button class="info" @click="eatTimeChartChange('?eatTime=1') ">
                                <div class="icon icon-breakfast"></div>							
                                <p class="input-calories">朝食</p>
                            </button>
                            <button class="info" @click="eatTimeChartChange('?eatTime=2')">
                                <div class="icon icon-lunch"></div>								
                                <p class="input-calories">昼食</p>
                            </button>
                            <button class="info" @click="eatTimeChartChange('?eatTime=3')">
                                <div class="icon icon-dinner"></div>
                                <p class="input-calories">夕食</p>
                            </button>
                            <button class="info" @click="eatTimeChartChange('?eatTime=4')">
                                <div class="icon icon-snack"></div>
                                <p class="input-calories">間食</p>
                            </button>													
                        </div>




                        <div class="highcharts-figure">
                            <!-- <div id="container"></div> -->
                            <vue-highcharts :options="options" :highcharts="Highcharts" ref="lineCharts"></vue-highcharts>
                        </div>
                        




                    <div class="meal_register">
            
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-breakfast"></span>
                                    <span class="name">朝食</span>
                                </div>
                            </div>

                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" onclick="img_register()">写真</button>
                                    <button class="btn-register btn-right" onclick="location.href='./mealHistory.html'">記録</button>													
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-lunch"></span>
                                    <span class="name">昼食</span>
                                </div>
                            </div>
                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" onclick="img_register()">写真</button>
                                    <button class="btn-register btn-right" onclick="location.href='./mealHistory.html'">記録</button>													
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-dinner"></span>
                                    <span class="name">晩食</span>
                                </div>
                            </div>
                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" onclick="img_register()">写真</button>
                                    <button class="btn-register btn-right" onclick="location.href='./mealHistory.html'">記録</button>													
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="box-left">
                                <div class="content">
                                    <span class="icon icon-teabreak"></span>
                                    <span class="name">間食</span>
                                </div>
                            </div>
                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" onclick="img_register()">写真</button>
                                    <button class="btn-register btn-right" onclick="location.href='./mealHistory.html'">記録</button>													
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <dialog id="select-photo">
                    <ul>						
                        <li>
                            <label for="file" id="library">ライブラリから選択</label>
                            <input type="file" name="file" id="file" class="inputfile" />
                        </li>
                        <li>
                            <label id="take-photo"><a class="label-select-photo" href="./selectPhoto.html">写真を撮る</a> </label>
                        </li>						
                    </ul>					
                </dialog>									
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

              userEatInfo: [], //　menu/get-MenuInfo　の値を格納する
              
      
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
                  categories: ['', '第1群', '第2群', '第3群','第4群'],
                  
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
                // this.loading = true;                
                Ajax('http://192.168.1.10:8000/auth/update-KcalID/','GET', localStorage.getItem('access'), null )
               
                Ajax('http://192.168.1.10:8000/auth/get-GoalKcal/','GET', localStorage.getItem('access'), null )
                 .then((res) => {
                  console.log(res);
                  this.goalKcal = res[0].kcal;
                  let lineCharts = this.$refs.lineCharts
                  lineCharts.delegateMethod('showLoading', 'Loading...');
                  Ajax('http://192.168.1.10:8000/menu/get-MenuInfo','GET', localStorage.getItem('access'), null )
                  .then((res) => {
                    console.log(res);
                    this.userEatInfo = res;
                    for(let i = 0; i < this.userEatInfo.length; i++) {
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

                    // this.percent = parseInt((progress.getAttribute('data-done') / this.goalKcal) * 100, 10);
                    // this.percent = parseInt(this.nowKcal / this.goalKcal * 100, 10);
                    this.percent = parseInt((this.nowKcal / this.goalKcal) * 100, 10);
                    progress.style.width = Math.min(this.percent, 100) + '%';

                    // if (progress.getAttribute('data-done') > this.goalKcal) {
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


                // let lineCharts = this.$refs.lineCharts
                // lineCharts.delegateMethod('showLoading', 'Loading...');

                // //４群点数フラフ表示
                // Ajax(this.userWeightURL,'GET', localStorage.getItem('access'), null )
                // .then((res) => {
                //     this.userEat = res;
                //     for(let i = 0; i < this.userWeight.length; i++) {
                //         this.dataDate.push(this.userWeight[i].date);
                //         this.dataWeight.push(this.userWeight[i].weight);
                //     }
                //     lineCharts.addSeries({name:"体重", showInLegend: false,  data: this.dataWeight} );
                //     lineCharts.getChart().xAxis[0].setCategories(this.dataDate);
                //     lineCharts.hideLoading();
                //     this.loading = false;
                // })
                // .catch((err) => {
                //   console.log(err);
                // });
                //目標カロリー取得
              Ajax("http://192.168.1.10:8000/auth/get-goal-weight/",'GET', localStorage.getItem('access'), null )
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
              Ajax('http://192.168.1.10:8000/menu/get-MenuInfo' + parameter,'GET', localStorage.getItem('access'), null )
                .then((res) => {
                  this.userEatInfo = res;
                  for(let i = 0; i < this.dataEat.length; i++) {
                    this.dataEat[i] = 0;
                  }
                  for(let i = 0; i < this.userEatInfo.length; i++) {
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
            },
          }
};