export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <div id="wrap">
        <header role="banner">
        <link rel="stylesheet" href="./assets/css/setting.css">
          <!-- nav追加 -->
                  <button type="button" id="btn-menu" class="btn-menu-head">
            <img src="./assets/img/hamburger_menu.png" alt="メニューボタン">
          </button>
              <nav role="navigation" id="menu">
              <ul>
                <li><router-link :to="'/main'">食事</router-link></li>
                <li><router-link :to="'/weightGraph'">体重</router-link></li>
                <li><router-link :to="'/advice'">アドバイス</router-link></li>
                <li><a href="./menuTable.html">メニュー</a></li>
                <li><router-link :to="'/calendar'">カレンダー</router-link></li>
                <li><router-link :to="'/setting'">設定</router-link></li>
              </ul>
              </nav>                
          </header>
        <h1>設定</h1>
        <main role="main">
          <div id="btn">
            <router-link to="/myProfile" tag="button">プロフィール</router-link>	
            <router-link to="/goalWeight" tag="button">体重目標設定</router-link>	
            <button>4群点数法とは</button><br>
            <button onclick="location.href='./login.html'">ログアウト</button>
          </div>              
        </main>	
      </div>
      <div is="script" src="./assets/js/menuButton.js"></div>  
    </div>
    
    `,
};



