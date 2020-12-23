import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <header role="banner">
        <link rel="stylesheet" href="./assets/css/calendar.css">
        <!-- nav追加 -->
        <button type="button" id="btn-menu"><img src="./assets/img/hamburger_menu.png" alt="メニューボタン"></button>
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
      <!-- <h1>
          <span><img src="./assets/img/left.png" alt="left"></span>
          <span><p class="date">2020年10月13日</p> </span>
          <span><img src="./assets/img/right.png" alt="right"></span>	
      </h1>        -->
  </header>
  <main>
      <div class="container-calendar">
        
          <div class="button-container-calendar">
              <button id="previous" onclick="previous()"></button>
              <h4 id="monthAndYear"></h4>
              <button id="next" onclick="next()"></button>
          </div>
          
          <table class="table-calendar" id="calendar" data-lang="ja">
              <thead id="thead-month"></thead>
              <tbody id="calendar-body"></tbody>
          </table>
          
          <div class="footer-container-calendar">
              <label for="month">日付指定：</label>
              <select id="month" onchange="jump()">
                  <option value=0>1月</option>
                  <option value=1>2月</option>
                  <option value=2>3月</option>
                  <option value=3>4月</option>
                  <option value=4>5月</option>
                  <option value=5>6月</option>
                  <option value=6>7月</option>
                  <option value=7>8月</option>
                  <option value=8>9月</option>
                  <option value=9>10月</option>
                  <option value=10>11月</option>
                  <option value=11>12月</option>
              </select>
              <select id="year" onchange="jump()"></select>
          </div>
      </div>

    <script src="./assets/js/calendar.js" type="text/javascript"></script>
  </main>
  <script src="./assets/js/menuButton.js"></script>
    
    `,
    // 変数
    data()　{
      return{

      }
    },
    //　初期化
    mounted(){
      this.init();
    },
    methods: {
      init() {

        // let lineCharts = this.$refs.lineCharts
        // lineCharts.delegateMethod('showLoading', 'Loading...');
        // this.loading = true;
        // Ajax(this.userWeightURL,'GET', localStorage.getItem('access'), null )
        //   .then((res) => {
        //     this.userWeight = res;
        //     for(let i = 0; i < this.userWeight.length; i++) {
        //       this.dataDate.push(this.userWeight[i].date);
        //       this.dataWeight.push(this.userWeight[i].weight);
        //     }
        //     lineCharts.addSeries({name:"体重", showInLegend: false,  data: this.dataWeight} );
        //     lineCharts.getChart().xAxis[0].setCategories(this.dataDate);
        //     lineCharts.hideLoading();
        //     this.loading = false;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        // Ajax("http://192.168.1.10:8000/auth/get-goal-weight/",'GET', localStorage.getItem('access'), null )
        //   .then((res) => {
        //     this.goal_weight = res.goal_weight;
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        //   Ajax('http://192.168.1.10:8000/auth/get-GoalKcal/','GET', localStorage.getItem('access'), null )
        //   .then((res) => {
        //      console.log(res);
        //      this.goal_kcal = res[0].kcal;
        //   })
        //   .catch((err) => {
        //      console.log(err);
        //    });

      },
      // ボタン押されたときの処理
      // weightChartChange(parameter){
      //   let lineCharts = this.$refs.lineCharts
      //   lineCharts.removeSeries();
      //   lineCharts.delegateMethod('showLoading', 'Loading...');
      //   this.loading = true;
      //   Ajax(this.userWeightURL + parameter,'GET', localStorage.getItem('access'), null )
      //     .then((res) => {
      //       this.userWeight = res;
      //       this.dataDate.splice(1);
      //       this.dataWeight.splice(0);
      //       console.log(this.userWeight);
      //       for(let i = 0; i < this.userWeight.length; i++) {
      //         this.dataDate.push(this.userWeight[i].date);
      //         this.dataWeight.push(this.userWeight[i].weight);
      //       }
      //       lineCharts.addSeries({name:"体重", showInLegend: false,  data: this.dataWeight} );
      //       lineCharts.getChart().xAxis[0].setCategories(this.dataDate);
      //       lineCharts.hideLoading();
      //       this.loading = false;
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // },
    }
    
};



