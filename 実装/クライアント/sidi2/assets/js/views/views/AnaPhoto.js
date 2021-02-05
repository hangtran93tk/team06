import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <div class="wrap">
        <header role="banner">   
          <link rel="stylesheet" href="./assets/css/anaPhoto.css">
          <img src="./assets/img/meal_photo2.png" alt="meal photo2">              
        </header>
      <main role="main">
        <section class="select_meal">                    
          <ul>
              <li>全体</li>
              <li>味噌汁</li>
              <li>トマトスープ</li>
              <li>オニオンスープ</li>
              <li class="search" onclick="location.href='./searchMenu.html'">メニューを検索</li>
          </ul>
        </section>
        <section class="select_meal">                    
          <ul>
              <li>①</li>
              <li>味噌汁</li>
              <li>トマトスープ</li>
              <li>オニオンスープ</li>
              <li class="search" onclick="location.href='./searchMenu.html'">メニューを検索</li>
          </ul>
        </section>
        <section class="select_meal">                    
            <ul>
                <li>②</li>
                <li>味噌汁</li>
                <li>トマトスープ</li>
                <li>オニオンスープ</li>
                <li class="search" onclick="location.href='./searchMenu.html'">メニューを検索</li>
            </ul>
        </section>
        <section class="select_meal">
          <ul>
              <li>③</li>
              <li>味噌汁</li>
              <li>トマトスープ</li>
              <li>オニオンスープ</li>
              <li class="search" onclick="location.href='./searchMenu.html'">メニューを検索</li>
          </ul>
        </section>
        <section class="select_meal">
          <ul>
              <li>④</li>
              <li>味噌汁</li>
              <li>トマトスープ</li>
              <li>オニオンスープ</li>
              <li class="search" onclick="location.href='./searchMenu.html'">メニューを検索</li>
          </ul>
        </section>
      </main>
      <footer>
          <button onclick="location.href='./main.html'">記録</button>
      </footer>           
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



