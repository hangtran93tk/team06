export default {
  template: `
  <div class="wrap">
  <link rel="stylesheet" href="./assets/css/anaPhoto.css">
            <header role="banner">   
                <img :src="url" />            
            </header>
            <main role="main">
                <section class="select-meal">
                
                <div class="show-food-name" v-for="oneFood in foodNames" :key="oneFood.id">
                    <input type="radio" :id="oneFood.id" name="food-name" value="1" >
                    <label :for="oneFood.id" class="food-name-label">{{oneFood.label}}</label>
                </div>       

                <div class="show-food-name">
                    <input type="radio" id="food-id" name="food-name" value="5" >
                    <label for="foodId" class="food-name-label">ドライカレー</label>
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
    foodNames:[],
    foodId: null,
    foodName: null
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
    // this.foodNames = sessionStorage.getItem('foodNames');
    // console.log('food name object',this.foodNames);
    // for(let i = 1; i <= 5; i++) {
    //     if (typeof sessionStorage.getItem(i) !== 'undefined') {
    //         this.foodNames = JSON.parse(sessionStorage.getItem(i));
    //       } 
       
    //     console.log('ana food name one unit',this.foodNames);
    //   }
    //   if (typeof sessionStorage.getItem(5) !== 'undefined') {
    //     this.foodNames = JSON.parse(sessionStorage.getItem(5));
    //     console.log('ana food name array', this.foodNames);
        
    //   }
      for(let i = 1; i <= 5; i++) {
        if (typeof sessionStorage.getItem(i) !== 'undefined') {
            this.foodName = JSON.parse(sessionStorage.getItem(i));
            this.foodNames.push(this.foodName);
          } 
       
        console.log('ana food name one unit',this.foodName);
      }
      // if (typeof sessionStorage.getItem(5) !== 'undefined') {
      //   this.foodNames = JSON.parse(sessionStorage.getItem(5));
      //   console.log('ana food name array', this.foodNames);
        
      // }
  }
}
};

