
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
                        <li><router-link :to="'/main'">食事</router-link></li>
                        <li><router-link :to="'/weightGraph'">体重</router-link></li>
                        <li><a href="./advice.html">アドバイス</a></li>
                        <li><a href="./menuTable.html">メニュー</a></li>
                        <li><router-link :to="'/calendar'">カレンダー</router-link></li>
                        <li><router-link :to="'/setting'">設定</router-link></li>
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
      <div is="script" src="./assets/js/menuButton.js"></div> 
    </div>
    
    `,
};



