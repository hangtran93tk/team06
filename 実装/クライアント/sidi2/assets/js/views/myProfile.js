import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <div id="wrap">
        <header role="banner">
        <link rel="stylesheet" href="./assets/css/myProfile.css">
          <h1>プロフィール</h1>
        </header>

      <main role="main">
        <section id="inputInfo">
          <h2>ニックネーム</h2>
          <input type="text" id="nickname" value="Mun 1102"><br>								
        </section>
                
        <section id="birthday">
          <h2>生年月日</h2>
            <input type="date" name="birthday">
      　</section>
          <div>
            <section id="gender">
              <h2>性別</h2>
              <input type="radio" id="male" name="gender" value="male">
              <label for="male">男性</label>
              <input type="radio" id="female" name="gender" value="female">
              <label for="female">女性</label>
          　</section>	
            <div id="heightWeight">
              <div id="height">
                  <h2>身長</h2>
                  <input type="text" name="userHeight" value="153"><label for="height">cm</label>
              </div>
              <div id="weight">
                  <h2 class="goalWeight">体重</h2>
                  <input type="text" name="userWeight" value="65.5"><label for="weight">kg</label>
              </div>        
            </div>
          </div>
          <section id="active">
            <h2>運動レベル</h2>
            <input type="radio" id="active" name="active" value="1" v-model="picked">
            <label class="active" for="0">レベル１</label>
    
            <input type="radio" id="active" name="active" value="2" v-model="picked">
            <label class="active" for="1">レベル2</label>

            <input type="radio" id="active" name="active" value="3" v-model="picked">
            <label class="active" for="2">レベル3</label>
        　</section>
          <section id="inputInfo">
            <h2>パスワード変更</h2>
            <input type="text" id="password" value="パスワード"><br>
            <input type="text" id="passwordConfirm" value="パスワード再入力">			
          </section>	
            <div id="register">
                <button onclick="location.href='./main.html'"><label for="register">保存</label></button>
            </div>
      </main>
    
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



