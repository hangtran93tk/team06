import Ajax from '../lib/Ajax.js';
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
                    <input type="radio" :id="oneFood.id" name="food-name" :value="oneFood.id" v-model="selectedUserEats">
                    <label :for="oneFood.id" class="food-name-label">{{oneFood.label}}</label>
                </div>       
<!--
                <div class="show-food-name">
                    <input type="radio" id="food-id" name="food-name" value="5" >
                    <label for="foodId" class="food-name-label">ドライカレー</label>
                </div>
                -->
                    <router-link to="/searchFoodName" tag="button"  class="search-food-name" >メニュー検索</router-link>	
                </section>

            </main>
            <footer>
                <button class="register-meal" @click="postUserEat" >記録</button>
                <!-- <button  class="register-meal" onclick="location.href='./main.html'">記録</button> -->
               
            </footer>           
        </div>
  `,
  data() {
    return {
    url: sessionStorage.getItem('imgUrl'),
    foodNames:[],
    foodId: null,
    foodName: null,
    selectedUserEats: []
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


      if(typeof sessionStorage.getItem(1) !== 'undefined'){
          this.foodNames = JSON.parse(sessionStorage.getItem(1));
          console.log(this.foodNames);
          sessionStorage.removeItem(1);
      }

      // for(let i = 1; i <= 5; i++) {
      //   if (typeof sessionStorage.getItem(1) !== 'undefined') {
      //       this.foodName = JSON.parse(sessionStorage.getItem(i));
      //       this.foodNames.push(this.foodName);
      //     } 
       
      //   console.log('ana food name one unit',this.foodName);
      // }


      // if (typeof sessionStorage.getItem(5) !== 'undefined') {
      //   this.foodNames = JSON.parse(sessionStorage.getItem(5));
      //   console.log('ana food name array', this.foodNames);
        
      // }
  },
  postUserEat() {  
    console.log(this.selectedUserEats);
    const obj = {
        "eatTime": sessionStorage.getItem('eatTime'),
        "userEat": this.selectedUserEats
    };
    Ajax(`http://180.46.192.112:8000/menu/post-UserEat/`,'POST', localStorage.getItem('access'), obj)
        .then((res) => {
            console.log(res);
            this.$router.push({path: '/main'});
        })
        .catch((err) => {
            console.log(err);
        });
    }  
}
};

