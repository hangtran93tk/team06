export default {
  template: `
  <div class="wrap">
  <link rel="stylesheet" href="./assets/css/anaPhoto.css">
            <header role="banner">   
                <img :src="url" />            
            </header>
            <main role="main">
                <section class="select-meal">

                <div class="show-food-name" v-for="foodName in foodNames" :key="foodName.id">
                  <input type="radio" :id="foodName.id" :name="foodName.label" >
                  <label :for="foodName.id" class="food-name-label">{{foodName.label}}</label>
                </div>	

                <div class="show-food-name">                        
                    <input type="radio" id="food-name1" name="food-name" value="1" >
                    <label for="food-name1" class="food-name-label">白飯</label>
                </div>  

                <div class="show-food-name">  
                    <input type="radio" id="food-name2" name="food-name" value="2" >
                    <label for="food-name2" class="food-name-label">五目御飯</label>
                </div>

                <div class="show-food-name">
                    <input type="radio" id="food-name3" name="food-name" value="3" >
                    <label for="food-name3" class="food-name-label">わかめご飯</label>
                </div>

                <div class="show-food-name">
                    <input type="radio" id="food-name4" name="food-name" value="4" >
                    <label for="food-name4" class="food-name-label">エビピラフ</label>
                </div>

                <div class="show-food-name">
                    <input type="radio" id="food-name5" name="food-name" value="5" >
                    <label for="food-name5" class="food-name-label">ドライカレー</label>
                </div>
                    <router-link to="/searchFoodName" tag="button"  class="search-food-name" >メニュー検索</router-link>	
                </section>
            </main>
            <footer>
                <button class="register-meal" onclick="location.href='./main.html'">記録</button>
            </footer>           
        </div>
  `,
  data() {
    return {
      url: sessionStorage.getItem('imgUrl'),
      foodNames: sessionStorage.getItem('foodNames')
    }
  }
};

