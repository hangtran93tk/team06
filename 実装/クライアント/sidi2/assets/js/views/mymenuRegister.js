import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
    <header role="banner">  
    <script src="https://cdn.jsdelivr.net/npm/vue-autosuggest@2.1.1/dist/vue-autosuggest.min.js"></script>
            <link rel="stylesheet" href="./assets/css/mymenuRegister.css">
            <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
              <h1>Myメニュー登録</h1><br>
              <!-- <div id="menu">
                <label for="menuName" class="menuName">食事名</label><br>
                <img src="./assets/img/goal.png" alt="image">
              </div> -->
            </header>
              <main role="main">
                <label for="foodStuff" class="foodStuff">食材</label><br>
                <div id="block" v-for="find in foodStuff">
                  <div id="input_pluralBox">
                    <div id="input_plural">
                      <div id="form1">
                      <div id="app">
　　　　　　　　　  <vue-autosuggest
　　　　　　　　　      v-model="selected"
　　　　　　　　　      :suggestions="filteredOptions">
　　　　　　　　　  </vue-autosuggest>
　　　　　　　　　</div>
                        <input type="search" @click="foodStuffName()" id="foodStuffName" class="form-control" placeholder="食材" style="float:left;" v-model="find.name"  @input="getFoodStuffName" autocomplete="off">
                      </div>
                      <input type="text"  id="gram" v-model="find.gram" >g/ml
                      <button @click="delFoodstuff"　class="del pluralBtn">削除</button>
                      <div id="kouhos">
                        <ul>
                          <li v-for="n in foodStuffList" :key="n">{{n}}</li>
                      </div>
                      </ul>
                    </div>
                  <br>
                </div>
              </div>
              <button @click="addFoodstuff"　class="add pluralBtn">追加</button>
                <div id="update">
                  <button onclick="location.href='./menuTable.html'">登録</button>
                  <br><br><br><br><br>
                  <pre>{{ $data | json }}</pre>
                </div>
              </main>	
        </div>
    </div>

`,

//method(){
//  this.init();
//  $('#foodStuffName.form-control').focusin(function(){
//    $('#kouhos').show();
//  });
//  $('#foodStuffName.form-control').focusout(function(){
//    setTimeout(function(){
//      $('#kouhos').hide();
//    },100);
//  });
//  $('#kouhos').on('touchstart click','li', function(){
//    $('#foodStuffName.form-control').val($(this).text());
//    setTimeout(function(){
//    $('#kouhos').hide();
//    },100);
//  });
//},

// 変数
data()　{
  return{
    foodStuff: [{name: '', gram: ''}],
    findName: '',
    foodStuffList: [],
    foodStuffItem: [],
    selected: '',
    options: [{
      data: ['Canada', 'China', 'Cameroon', "Italy", "Iraq", "Iceland" ]
    }]
  }
},
computed: {
  filteredOptions() {
    return [
      {
        data: this.options[0].data.filter(option => {
          return option.toLowerCase().indexOf(this.selected.toLowerCase()) > -1;
        })
      }
    ];
  }
},

//　初期化


methods: {
  init() {
  },
      // テキストボックスへ値を設定します


  addFoodstuff: function() {
    var food = document.getElementById('foodStuffName').value;
    var g = document.getElementById('gram').value;
    this.foodStuff.push({ name: food, gram: g});


    food.value = '';
  },
  


  delFoodstuff: function() {
    this.foodStuff.pop({ name: '', gram: '' });
  },


  getFoodStuffName({ target }) {
    this.findName = target.value;
    // let value = "?jp_name=" + foodStuffName;
    let value = "?jp_name=" + this.findName;
    if(value.length >= 11) {
      // console.log(this.$refs.query.value);
      Ajax('http://192.168.1.10:8000/menu/get-FoodStuffName/' + value,'GET', localStorage.getItem('access'), null)
      .then((res) => {
         this.foodStuffItem = res;
         this.foodStuffList.splice(0);
         console.log(res);
         for(let i = 0; i < this.foodStuffItem.length; i++) {
          this.foodStuffList.push(this.foodStuffItem[i].jp_name);
         }
        //  this.foodStuff.push({ name: '', gram: '' });1
      })
      .catch((err) => {
         console.log(err);
       });
    }
           
  },
}   


};