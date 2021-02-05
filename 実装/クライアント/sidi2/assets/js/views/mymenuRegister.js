import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
    <header role="banner">  
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
                   <div id="form1">
                    <div id="kouhos">
                      <ul>
                        <li v-for="n in foodStuffList" :key="n"  @click="itemSelected">{{n}}</li>
                      </ul>
                    </div>
                    <input type="search" id="foodStuffName" class="form-control" placeholder="食材" style="float:left;" v-model="find.name"  @input="getFoodStuffName" autocomplete="off">
                  </div>
                   <input type="text"  id="gram" v-model="find.gram" >g/ml
                   <button @click="delFoodstuff"　class="del pluralBtn">削除</button>
                </div>
                <br>
                <br>
                <button type="button" @click="addBox">追加</button>
                <div id="update">
                  <button onclick="location.href='./menuTable.html'">登録</button>
                  <br><br><br><br><br>
                  <pre>{{ $data | json }}</pre>
                </div>
              </main>	
        </div>
    </div>

`,

mounted(){
},

// 変数
data()　{
  return{
    boxIndex: {current:0, max:0},

    foodStuff: [{index:0, name:'', gram: ''}],
    findName: '',
    foodStuffList: [],
    foodStuffItem: [],
  }
},


//　初期化


methods: {
  init() {
  },

  //foodSelected : function(e){
  //  foodStuff[0].name = e.target.value;
  //  console.log("デバック");
  //},

  //addFoodstuff: function() {
  //      var food = document.getElementById('foodStuffName').value;
  //      var g = document.getElementById('gram').value;
  //      this.foodStuff.push({ name: food, gram: g});
  //},
  


  delFoodstuff: function() {
    this.foodStuff.pop({ name: '', gram: '' });
  },

  // 食材の候補が選択されたときに、入力ボックスに値をセット
  itemSelected(e){
    // console.log(this.boxIndex.current);
    this.foodStuff[this.boxIndex.current].name = e.target.innerText;
  },

  // ボックスを追加する
  addBox() {
    this.boxIndex.max += 1;
    this.foodStuff.push({index:this.boxIndex.max, name:'', gram: ''});
    this.foodStuffItem = [];
    // console.log(this.foods);
    this.init();
  
    $('#foodStuffName.form-control').focusin(function(){
      $('#kouhos').show();
    });
    $('#foodStuffName.form-control').focusout(function(){
      setTimeout(function(){
        $('#kouhos').hide();
      },100);
    });
    $('#kouhos').on('touchstart click','li', function(){
      $('#foodStuffName.form-control').val($(this).text());
      setTimeout(function(){
      $('#kouhos').hide();
      },100);
    });
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