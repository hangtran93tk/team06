import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
        <div id="wrap">
            <header role="banner">  
            <link rel="stylesheet" href="./assets/css/mymenuRegister.css">
              <h1>Myメニュー登録</h1><br>
              <div id="menu">
                <label for="menuName" class="menuName">食事名</label><br>
                <img src="./assets/img/goal.png" alt="image">
              </div>
            </header>
            <main role="main">
                <label for="foodStuff" class="foodStuff">食材</label><br> 
                <div id="block">
                  <input type="text"  id="foodStuffName"  placeholder="食材名"style="float:left;">
                  <input type="text"  id="gram" >g/ml
                </div>
                <div id="block">
                  <input type="text"  id="foodStuffName"  placeholder="食材名"style="float:left;">
                  <input type="text"  id="gram" >g/ml
                </div>
                <div id="block">
                  <input type="text"  id="foodStuffName"  placeholder="食材名"style="float:left;">
                  <input type="text"  id="gram" >g/ml
                </div>
                <div id="block">
                  <input type="text"  id="foodStuffName"  placeholder="食材名"style="float:left;">
                  <input type="text"  id="gram" >g/ml
                </div>
                <div id="block">
                  <input type="text"  id="foodStuffName"  placeholder="食材名"style="float:left;">
                  <input type="text"  id="gram" >g/ml
                </div>
                <div id="block">
                  <input type="text"  id="foodStuffName"  placeholder="食材名"style="float:left;">
                  <input type="text"  id="gram" >g/ml
                </div>
                <div id="update">
                  <button onclick="location.href='./menuTable.html'">登録</button>
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



