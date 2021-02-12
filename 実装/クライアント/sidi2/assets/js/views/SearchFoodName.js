
export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <div id="wrap">
        <header role="banner">
          <link rel="stylesheet" href="./assets/css/searchMenu.css">
          <h1>メニュー検索</h1>
          <input type="text"  id="cookingName" placeholder="料理名">
        </header>
        <main role="main">
        <div v-if="">          
          <div class="block1" v-for="menu in menus" :key="menu.id">
              <input type="checkbox" :id="menu.id" :value="menu.id" v-model="selectedUserEats">						
              <label :for="menu.id" class="label-name">{{menu.jp_name}}</label>
              <label :for="menu.id" class="label-kcal">{{menu.kcal}}kcal</label>
          </div> 
        </div>      
          <div id="record">
            <button onclick="location.href='./main.html'">記録</button>
          </div>
        </main>
      </div>
    </div>
    
    `
};



