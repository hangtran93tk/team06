import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
        <div id="wrap">
            <header role="banner">
            <link rel="stylesheet" href="./assets/css/advice.css">
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
                <h1>アドバイス</h1>       
            </header>
        <main role="main">
            <div class="advice">                   
                <p class="bubble speech">Let’s start with a quick tour of Vue’s data binding features. If you are more interested in a high-level overview first, check out this blog post.</p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">Let’s start with a quick tour of Vue’s data binding features. If you are more interested in a high-level overview first, check out this blog post.</p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">Let’s start with a quick tour of Vue’s data binding features. If you are more interested in a high-level overview first, check out this blog post.</p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">Let’s start with a quick tour of Vue’s data binding features. If you are more interested in a high-level overview first, check out this blog post.</p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
        </main>			
      </div>
    </div>
    
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



