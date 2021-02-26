
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
                    <li><router-link :to="'/advice'">アドバイス</router-link></li>
                    <li><router-link :to="'/menuTable'">メニュー</router-link></li>
                    <li><router-link :to="'/calendar'">カレンダー</router-link></li>
                    <li><router-link :to="'/setting'">設定</router-link></li>
                    </ul>
                </nav>
                <h1>アドバイス</h1>       
            </header>
        <main role="main">
            <div class="advice">                   
                <p class="bubble speech">はじめまして、Munさん。<br>
                まずは食材の記録からチャレンジしてみましょう！
                </p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">Munさん朝食は食べましたか？</p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">昼食のカロリーが多いようです。<br>
                昼食に注意して食材を選びましょう！
                </p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">目標体重までもう少しです。頑張りましょう！</p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
            <div class="advice">                   
                <p class="bubble speech">第二群の食材が少ないようです。<br>
                魚介類や肉類・豆類を食べましょう！
                </p>
                <img src="./assets/img/user_icon.png" alt="" align="left">
            </div>
        </main>			
      </div>
      <div is="script" src="./assets/js/menuButton.js"></div> 
    </div>
    
    `,
};



