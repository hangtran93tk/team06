import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <div id="wrap">
        <header role="banner">  
          <h1>食事履歴</h1>
          <input type="text"  id="cookingName"placeholder="料理名を検索">
          <table>
            <tr>
            <td><div class="tabbox">
                <input type="radio" name="tabset" id="tabcheck1" checked>
                <label for="tabcheck1" class="tab1">Myメニュー</label></td>
              </div>
            <td><div class="tabbox2">
                <input type="radio" name="tabset" id="tabcheck2">
                <label for="tabcheck2" class="tab2">食事履歴</label></td>
              </div>
            </tr>
          </table>
        </header>
        <main role="main">
          <div class="tab">
            <input type="radio" name="s1" id="i1" checked>
            <label for="i1" class="tab3"><img src="./assets/img/sun.png"   alt="朝" ></label>
            <input type="radio" name="s1" id="i2">
            <label for="i2" class="tab3"><img src="./assets/img/weather.png"  alt="昼" ></label>
            <input type="radio" name="s1" id="i3">
            <label for="i3" class="tab3"><img src="./assets/img/moon.png"   alt="夜" ></label>
            <input type="radio" name="s1" id="i4">
            <label for="i4" class="tab3"><img src="./assets/img/coffee-breaks.png"   alt="間食"></label>
          </div>
          <div id="block">
            <img src="./assets/img/goal.png" alt="image"  style="float:left;">
            <label for="menuName">5品目ミックスサラダ</label>
            <label for="kcal">3kcal</label>
          </div>
          <div id="noRecord">
            <button onclick="location.href='./main.html'">食べなかった</button>
          </div>
          <div id="record">
            <button onclick="location.href='./main.html'">記録</button>
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



