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
                <p><label for="menuName" class="menuName">食事名</label></p><br>
                <img src="./assets/img/goal.png" alt="image">
              </div> -->
            </header>
              <main role="main">
                <label for="foodStuff" class="foodStuff">食材</label><br>
                <div id="block" v-for="find in foodStuff">
                <div id="addform">
                  <div id="kouhos">
                    <ul>
                      <li v-for="n in foodStuffList" :key="n"  @click="itemSelected">{{n}}</li>
                    </ul>
                  </div>
                </div>
                  <div id="form1">
                    <div id="kouhos">
                      <ul>
                        <li v-for="n in foodStuffList" :key="n"  @click="itemSelected">{{n}}</li>
                      </ul>
                    </div>
                    <input type="search" id="foodStuffName"  class="form-control" placeholder="食材-0" style="float:left;" v-model="find.name"  @input="getFoodStuffName" autocomplete="off">
                  </div>
                  <input type="search"  id="gram" @blur="isRegNum" v-model="find.gram"  placeholder="グラム-0"  autocomplete="off">g/ml
                  <button @click="delFoodstuff"　 id="del" class="del pluralBtn" >削除</button>
                </div>
                <br>
                <br>
                <div id="wButton">
                  <button type="button" id="add"@click="addBox">追加</button>
                </div>
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
// 変数
data()　{
  return{
    boxIndex: {current:0, max:0},  // 入力ボックスに関するインデックス

    foodStuff: [{index:0, name:'', gram: ''}],
    findName: '',       // 入力した食材
    foodStuffList: [],  // 入力した食材のリスト
    foodStuffItem: [],  // 検索候補
    no:1,  //入力ボックスの数
    i:1,
  }
},


//　初期化


methods: {
  init() {
  },



  isRegNum(){
    /* 入力値 */
    /* 数値以外の文字列が含まれていた場合 */
    if(document.getElementById('gram').value.match(/[^0-9]/g)){
        /* アラート表示 */
        alert (document.getElementById('gram').value.match(/[^0-9]/g)+'\n\nグラムは半角数値で入力して下さい');
        /* テキストボックスを空にする */
        document.getElementById('gram').value ="";
        return false;
    }
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
  

// ボタンを押すと最後の一つ残しで一つずつ削除する
  delFoodstuff() {
      if (this.no > 1) {
          this.foodStuff.pop({ name: '', gram: '' });
          this.no -= 1;
      }
  },

  // 食材の候補が選択されたときに、入力ボックスに値をセット
  itemSelected(e){
    // console.log(this.boxIndex.current);
    this.foodStuff[this.boxIndex.current].name = e.target.innerText;
  },
  
  // ボックスを追加する
  addBox() {
    if(document.getElementById('gram').value == '' || document.getElementById('foodStuffName').value == '' ){
      /* アラート表示 */
      alert ('食材とグラムを入力してください。');
      /* テキストボックスを空にする */
     document.getElementById('gram' + this.i).value = "";
     document.getElementById('foodStuffName' + this.i).value = "";
      return false;
    }else{
      var food = document.getElementById('foodStuffName' + this.i).value;
      var g = document.getElementById('gram' + this.i).value;
      this.no += 1;
      //this.boxIndex.max += 1;
      //this.foodStuff.push({index:this.boxIndex.max, name:food, gram: g});
      //this.foodStuffItem = [];

      var input_data = document.createElement('input');
      input_data.type = 'search';
      input_data.id = 'foodStuffName' + this.i;
      input_data.placeholder = '食材' + this.i;
      var parent = document.getElementById('addform');
      parent.appendChild(input_data);
      this.init();
      $('#foodStuffName' + this.i).focusin(function(){
        $('#kouhos').show();
      });
      $('#foodStuffName' + this.i).focusout(function(){
        setTimeout(function(){
          $('#kouhos').hide();
        },100);
      });
      $('#kouhos').on('touchstart click','li', function(){
        $('#foodStuffName' + this.i).val($(this).text());
        setTimeout(function(){
        $('#kouhos').hide();
        },100);
      });
      
      
      var input_data = document.createElement('input');
      input_data.type = 'search';
      input_data.id = 'gram' + this.i;
      input_data.placeholder = 'グラム' +this. i;
      var parent = document.getElementById('addform');
      parent.appendChild(input_data);

      this.i++;
      this.boxIndex.max += 1;
      this.foodStuff.push({index:this.boxIndex.max, name:food, gram: g});
    }
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