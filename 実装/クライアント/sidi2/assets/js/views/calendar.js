import Ajax from '../lib/Ajax.js';


export default {
    // テンプレート //================//
    template: `
    <div id="wrap">
    <header role="banner">
        <link rel="stylesheet" href="./assets/css/calendar.css">
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
  
      <div is="script" src="./assets/js/menuButton.js"></div> 
      <div is="script" src="./assets/js/calendar.js"></div> 
     
    </main>
    </div>
        `,
};