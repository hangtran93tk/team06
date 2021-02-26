import Ajax from '../lib/Ajax.js';

// import User from '../lib/User';
export default {
  
    //テンプレート//
    template: `
    <div id="input">
    <header role="banner">
            <link rel="stylesheet" href="./assets/css/mymenuRegister.css">
              <h1>Myメニュー登録</h1><br>
              <!-- <div id="menu">
                <p><label for="menuName" class="menuName">食事名</label></p><br>
                <img src="./assets/img/goal.png" alt="image">
              </div> -->
            </header>
            <main role="main">
              <label>Myメニュー名</label><br>
              <input type="text" v-model="myMenuName" class="form-control" id="cookName"  autocomplete="off" placeholder="料理名入力">
              <br><br>
              <label>食材の追加</label>
              <br>
              <form v-on:submit.prevent>
              <input type="search" v-model="newItem" class="form-control" id="foodStuffName" @input="getFoodStuffName" autocomplete="off" placeholder="食材を入力">
              <div id="kouhos">
                <ul>
                  <li v-for="n in foodStuffItem"  ><a :key="n.id" :value="n.id" @click="itemSelected">{{n.jp_name}}</a></li>
                </ul>
              </div>
              <input type="search"  id="gram" @blur="isRegNum" v-model="gram"  placeholder="グラムを入力"  autocomplete="off">g/ml
              <button v-on:click="addItem" id="addList">追加</button>
            </form>
            <div style="overflow:auto;" id="scrol">
              <ul>
                <li v-for="(todo,index) in todos" > <!--indexを引数に追加-->
                <!-- <input type="checkbox" v-model="todo.isDone"> -->
                <span>{{todo.item}}:{{todo.gram}}g/ml</span>
                <button v-on:click="deleteItem(index)"id="delButton">削除</button>　<!--indexを引数に指定-->
                </li>
              </ul>
            </div>
            <div id="update">
            <router-link to="/main" tag="button" @click.native="postMymenu"  >Myメニュー登録</router-link>
            <br><br><br><br><br>
                <br><br><br><br><br>
            </div>
            
            <!-- <pre>{{ $data }}</pre> -->

            </main>	
        </div>
    </div>

`,

mounted(){
  this.init();
  $('#foodStuffName').focusin(function(){
    $('#kouhos').show();
  });
  $('#foodStuffName').focusout(function(){
    setTimeout(function(){
      $('#kouhos').hide();
    },450);
  });
  $('#kouhos').on('touchstart click','li', function(){
    $('#foodStuffName').val($(this).text());
    setTimeout(function(){
    $('#kouhos').hide();
    },450);
  });
  // 450以外の数字を入れると何故か動かない
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

    // 土屋がテスト中のもの
    // foodStuffs:[], 
    // gram: '',
    // foodStuffName:'',
    newItem:"",
    gram:"",
    id:"",
    todos:[],
    myMenuName:"",
  }
},


//　初期化


methods: {
  init() {
  },

  addItem:function(event){
    if(document.getElementById('gram').value == '' || document.getElementById('foodStuffName').value == '' ){
      /* アラート表示 */
      alert ('食材とグラムを入力してください。');
      /* テキストボックスを空にする */
     document.getElementById('gram').value = "";
     document.getElementById('foodStuffName').value = "";
     return false;
    }else{
      if(this.newItem == '')return;
      var todo = {
        item: this.newItem,
        gram: this.gram,
        id: this.id,
        // isDone:false
      };
      this.todos.push(todo);
      this.newItem = ''
      this.findName = '';
      this.foodStuffItem = '';
      this.gram = '';
    }
  },
  deleteItem:function(index){ //indexを引数に指定
    this.todos.splice(index,1) //indexで指定された要素を1つ削除
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

    // this.$set(this.newItem, e.target.innerText);
    console.log("なんでーーーーーー")
    console.log(e);
    this.newItem = e.target.innerText;
    console.log(e.target.innerText);
      const msg = document.getElementById('foodStuffName');
      this.$nextTick(() => {
	      console.log(msg.textContent); // log is 'updated.'
      })
    // this.newItem = e.target.innerText;
    // console.log("newItem更新したい");
    // console.log(this.newItem);
    // this.$nextTick(function () {
    //   console.log(this.$fs.textContent) // => 'updated'
    // })
  },
  
  
  // ボックスを追加する
  addBox() {
    if(document.getElementById('gram').value == '' || document.getElementById('foodStuffName').value == '' ){
      /* アラート表示 */
      alert ('食材とグラムを入力してください。');
      /* テキストボックスを空にする */
     document.getElementById('gram').value = "";
     document.getElementById('foodStuffName').value = "";
     return false;
    }else{ //追加処理
      var food = document.getElementById('foodStuffName').value;
      var g = document.getElementById('gram').value;
      this.no += 1;
      this.boxIndex.max += 1;
      this.foodStuff.push({index:this.boxIndex.max, name:food, gram: g});
      this.foodStuffItem = [];
      //document.getElementById('foodStuffName').textContent = '';
      //document.getElementById('gram').textContent = '';
      this.foodStuff.name.resset();
      this.foodStuff.gram.resset();
    }
  },


  getFoodStuffName({ target }) {
    this.findName = target.value;
    // let value = "?jp_name=" + foodStuffName;
    let value = "?jp_name=" + this.findName;
    if(value.length >= 11) {
      // console.log(this.$refs.query.value);
      Ajax('http://180.46.192.112:8000/menu/get-FoodStuffName/' + value,'GET', localStorage.getItem('access'), null)
      .then((res) => {
         this.foodStuffItem = res;
         this.foodStuffList.splice(0);
         console.log(this.foodStuffItem[0]);
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

  postMymenu(){
    const obj = {
      "myMenu_name": this.myMenuName,
      "foodStuff": this.todos
  };
  Ajax(`http://180.46.192.112:8000/menu/post-FoodStuffName/`,'POST', localStorage.getItem('access'), obj)
      .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      });
  }
  
}


};