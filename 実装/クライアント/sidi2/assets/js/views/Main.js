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
                    <p class="date-pre icon-date" @click="previousDate()"></p>
                    <p class="txt-tile date">{{ year }}年{{ month + 1 }}月{{ date }}日</p>
                    <p class="date-next icon-date" @click="nextDate()"></p>
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

                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" @click="showDialog = true, setEatTime(1)">写真</button>                                  
                                    <router-link to="/mealHistory" tag="button"  class="btn-register btn-right" @click.native="setEatTime(1)">記録</router-link>							
                                </div>
                            </div>
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 1">
                          <h3 class="meal-detail-name">
                            {{ userEatInfo.jp_name }}
                            <button class="meal-detail-info-btn" @click="deleteMeal(userEatInfo.id)">✖</button>
                          </h3>
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
                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" @click="showDialog = true, setEatTime(2)">写真</button>
                                    <router-link to="/mealHistory" tag="button"  class="btn-register btn-right" @click.native="setEatTime(2)">記録</router-link>												
                                </div>
                            </div>
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 2">
                          <h3 class="meal-detail-name">
                            {{ userEatInfo.jp_name }}
                            <button class="meal-detail-info-btn" @click="deleteMeal(userEatInfo.id)">✖</button>
                          </h3>
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
                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" @click="showDialog = true, setEatTime(3)">写真</button>
                                    <router-link to="/mealHistory" tag="button"  class="btn-register btn-right" @click.native="setEatTime(3)">記録</router-link>												
                                </div>
                            </div>
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 3">
                        <h3 class="meal-detail-name">
                          {{ userEatInfo.jp_name }}
                          <button class="meal-detail-info-btn" @click="deleteMeal(userEatInfo.id)">✖</button>
                        </h3>
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
                            <div class="box-right">
                                <div class="content">
                                    <button class="btn-register btn-left" @click="showDialog = true, setEatTime(4)">写真</button>
                                    <router-link to="/mealHistory" tag="button"  class="btn-register btn-right" @click.native="setEatTime(4)">記録</router-link>												
                                </div>
                            </div>
                        </div>
                        <div class="meal-detail" v-for="userEatInfo in userEatInfos"  v-if="userEatInfo.eatTime == 4">
                          <h3 class="meal-detail-name">
                            {{ userEatInfo.jp_name }}
                            <button class="meal-detail-info-btn" @click="deleteMeal(userEatInfo.id)">✖</button>
                          </h3>
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
                <div v-if="showDialog" id="select-photo-dialog">
                    <ul>						
                        <li>
                            <label for="file" id="library">ライブラリから選択</label>
                            <input type="file" name="file" id="file" class="inputfile" @change="onFileChange" />
                        </li>
                        <li>
                            <!-- <label id="take-photo"><a class="label-select-photo" href="./selectPhoto.html">写真を撮る</a> </label> -->
                            <label id="take-photo">写真を撮る </label>
                            <input id="file2" type="file" name="image" accept="image/*" capture="environment" @change="onFileChange">
                        </li>	
                        <li class="last-li">
                          <button class="off-select-photo-dialog" @click="showDialog = false">閉じる</button>	
                        </li>					
                    </ul>	
                    			
                </div>	
                <div class="select-photo" v-if="showPreviewImage">
                  <img :src="url" style="width: 100%;max-height: 80%;"/>
                  <button class="select-photo-btn cancel" @click="showPreviewImage = false" >キャンセル</button>
                  <!-- <router-link to="/anaPhoto" tag="button"  class="select-photo-btn ok" @click.native="uploadFile">決定</router-link> -->
                  <button  class="select-photo-btn ok" @click="uploadFile">決定</button>												
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
              year : new Date().getFullYear(),
              month: new Date().getMonth(),
              date: new Date().getDate(),
              prevDay: null,
              nextDay: null,
              checkDate: null,
              userEatInfos: [], //　menu/get-MenuInfo　の値を格納する
              // testdate: "?date=2020-12-28",
              showDialog: false,
              showPreviewImage: false,
              file: null,
              file_name: null,
              url: null,
              foodNames:[],
              userGraphURL: 'http://192.168.1.10:8000/menu/get-Kcal/',
             
      
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
              this.checkDate = '?date=' + this.year + '-' + (this.month + 1) + '-' + this.date;
              sessionStorage.setItem('checkDate', this.checkDate);  
              this.showOneDayInfo(this.checkDate);          
            },
            // ボタン押されたときの処理
            eatTimeChartChange(parameter){
              this.checkDate = sessionStorage.getItem('checkDate');
              let lineCharts = this.$refs.lineCharts
              lineCharts.removeSeries();
              lineCharts.delegateMethod('showLoading', 'Loading...');
              this.loading = true;
              Ajax('http://192.168.1.10:8000/menu/get-MenuInfo/' + this.checkDate + parameter,'GET', localStorage.getItem('access'), null )
                .then((res) => {
                  console.log('checkDate khac ngay hom nay', this.checkDate);
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
            },
            setEatTime(eatTime) {
              sessionStorage.setItem('eatTime', eatTime);
             console.log(eatTime);
            },
            //選択した画像を表示する
            onFileChange(e) {
              this.showDialog = false;
              this.showPreviewImage = true;
              this.file = e.target.files[0];
              this.file_name = this.file.name;
              this.url = URL.createObjectURL(this.file);
              sessionStorage.setItem('imgUrl', this.url);
            },
            //サーバーへ画像を送信する
            uploadFile() {
              
              const formData = new FormData();
              formData.append('image', this.file, this.file_name);
              // console.log('>>>>>>',formData);
              Ajax('http://192.168.1.10:8000/menu/Image/','POST', localStorage.getItem('access'), formData, {
                contentType: 'multipart/form-data'
              } )
                .then((res) =>{
                  console.log(res);
                  this.foodNames = res;
                  sessionStorage.setItem( this.foodNames[0].rank ,JSON.stringify(this.foodNames));
                  console.log(this.foodNames[0]);
                  this.$router.push({path: '/anaPhoto'});                 
                })
                .catch((err) => {
                  console.log(err);
                });

            },
            /**登録した食事を削除する */
            deleteMeal(id) {
              console.log(id);
              var index = this.userEatInfos.findIndex(v => {
                return v.id = id;
              });

              /*Dialog */
              if(confirm("食事を削除しますか？")) {
                Ajax("http://192.168.1.10:8000/menu/delete-UserEat/" + id + "/",'DELETE', localStorage.getItem('access'), null )
                .then((res) => {
                  
                  console.log('delete res',res);
                })
                .then(() => {
                  console.log(id + 'の食事を削除した')
                })
                .catch((err) => {
                  console.log(err);
                });
                this.init();
      
              }
            },
            /**前の日 */
            previousDate() {
              this.prevDay = new Date(this.year, this.month,this.date - 1);
              this.date = this.prevDay.getDate();
              this.month = this.prevDay.getMonth();
              this.year = this.prevDay.getFullYear();
              console.log('prevDay',this.prevDay);
              this.checkDate =　'?date=' + this.year + '-' + (this.month + 1) + '-' + this.date;
              sessionStorage.setItem('checkDate',this.checkDate);
              this.showOneDayInfo(this.checkDate);

            },
            /**次の日 */
            nextDate() {
              this.nextDay = new Date(this.year, this.month, this.date + 1);
              this.date = this.nextDay.getDate();
              this.month = this.nextDay.getMonth();
              this.year = this.nextDay.getFullYear();
              console.log('nextDay', this.nextDay);
              this.checkDate =　'?date=' + this.year + '-' + (this.month + 1) + '-' + this.date;
              sessionStorage.setItem('checkDate',this.checkDate);
              this.showOneDayInfo(this.checkDate);
            },
            /**一日の情報 */
            showOneDayInfo(checkDate) {
              this.nowKcal = 0;
              this.dataEat = [0,0,0,0];
              Ajax('http://192.168.1.10:8000/auth/update-KcalID/','GET', localStorage.getItem('access'), null )
               
              Ajax('http://192.168.1.10:8000/auth/get-GoalKcal/','GET', localStorage.getItem('access'), null )
               .then((res) => {
                console.log(res);
                this.goalKcal = res[0].kcal;
                let lineCharts = this.$refs.lineCharts
                lineCharts.removeSeries();
                lineCharts.delegateMethod('showLoading', 'Loading...');
                // Ajax('http://192.168.1.10:8000/menu/get-MenuInfo/','GET', localStorage.getItem('access'), null)
                  Ajax('http://192.168.1.10:8000/menu/get-MenuInfo/' + checkDate ,'GET', localStorage.getItem('access'), null) // 過去のきろく取りたいとき
                  .then((res) => {
                    console.log(res);
                    this.userEatInfos = res;
                    //四群点数グラフ表示
                    for(let i = 0; i < this.userEatInfos.length; i++) {
                      this.nowKcal += res[i].kcal;
                      // console.log('nowKcal', this.nowKcal);
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
            Ajax("http://192.168.1.10:8000/auth/get-goal-weight/",'GET', localStorage.getItem('access'), null )
              .then((res) => {
                this.goal_weight = res.goal_weight;
              })
              .catch((err) => {
                console.log(err);
              });   
            }
          }
};