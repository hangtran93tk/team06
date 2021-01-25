import Ajax from '../lib/Ajax.js';



export default {
    // テンプレート //================//
    template: `
    <div id="wrap">
    <header role="banner">
        <link rel="stylesheet" href="./assets/css/calendar.css">      
        <button type="button" id="btn-menu" class="btn-menu-head">
            <img src="./assets/img/hamburger_menu.png" alt="メニューボタン">
        </button>
                
        <nav role="navigation" id="menu">
            <ul>
                <li><router-link :to="'/main'">食事</router-link></li>
                <li><router-link :to="'/weightGraph'">体重</router-link></li>
                <li><a href="./advice.html">アドバイス</a></li>
                <li><a href="./menuTable.html">メニュー</a></li>
                <li><router-link :to="'/calendar'">カレンダー</router-link></li>
                <li><a href="./setting.html">設定</a></li>
            </ul>
        </nav>                 
    </header>
    <main>
        <div class="container-calendar">
           
            <div class="button-container-calendar">
                <button id="previous" @click="previous()"></button>
                <h4 id="monthAndYear"></h4>
                <button id="next" @click="next()"></button>
            </div>
            
            <table class="table-calendar" id="calendar" data-lang="ja">
                <thead id="thead-month"></thead>
                <tbody id="calendar-body"></tbody>
            </table>
            
            <div class="footer-container-calendar">
                <label for="month">日付指定：</label>
                <select id="month" @change="jump()">
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
                <select id="year" @change="jump()"></select>
            </div>
      </div>
  
      <div is="script" src="./assets/js/menuButton.js"></div> 
      
    </main>
    </div>
        `,

        data () {
            
          },
          methods: {
            
          }
};