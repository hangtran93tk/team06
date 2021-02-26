import Ajax from '../lib/Ajax.js';
export default {
  
    //テンプレート//
    template: `
      <div id="wrap">
        <header role="banner">
        <link rel="stylesheet" href="./assets/css/menuTable.css">
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

          <h1>メニュー</h1>
          <div id="register">
            <router-link to="/mymenuRegister" tag="button"  class="" >Myメニュー登録</router-link>
          </div>

        </header>

        <main role="main">
          <div id="block">
            <div class="block1" v-for="menu in menus" :key="menu.id">	
                <label :for="menu.id" class="label-name">{{menu.jp_name.substring(7,30)}}</label>
                <label :for="menu.id" class="label-kcal">{{menu.kcal}}kcal</label>
                <router-link to="/mymenuUpdate" tag="button"  class="" >編集</router-link>	
            </div>
          </div>	
        </main>
        <div is="script" src="./assets/js/menuButton.js"></div>
      </div>
    
    `,
    data() {
      return {
        menus:[]
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        Ajax('http://180.46.192.112:8000/menu/get-Mymenu/','GET', localStorage.getItem('access'), null )
          .then((res) => {
            // console.log(res);
              this.menus = res;
              console.log(this.menus[0].jp_name.substring(7,30));
              
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

};



