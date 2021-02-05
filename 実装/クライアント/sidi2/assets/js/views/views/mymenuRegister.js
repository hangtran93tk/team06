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

            <h4>項目1</h4>
            <p><input type="text" name="text1" size="30" /></p>
            <div id="item2"></div>
            
            <p><input type="button" value="項目を追加する" onclick="ItemField.add();" /></p>
            <p><input type="button" value="項目を削除する" onclick="ItemField.remove();" /></p>
            <form>
            <script src="/.assets/views/addForm.js"></script>
            <script type="text/javascript">
            ItemField.currentNumber = 1;
            ItemField.itemTemplate
                = '<h4>追加項目__count__</h4>'
                + '<p><input type="text" name="text__count__" size="30" /></p>';
            </script>
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
    foodStuff: [{name: '', gram: ''}],
    findName: '',
    findGram: '',
    foodStuffList: [],
    foodStuffItem: [],
  }
},


//　初期化


methods: {
  init() {
  },

  add : function () {
    this.currentNumber++;

    var field = document.getElementById('item' + this.currentNumber);

    var newItem = this.itemTemplate.replace(/__count__/mg, this.currentNumber);
    field.innerHTML = newItem;

    var nextNumber = this.currentNumber + 1;
    var new_area = document.createElement("div");
    new_area.setAttribute("id", "item" + nextNumber);
    field.appendChild(new_area);
},
remove : function () {
    if ( this.currentNumber == 1 ) { return; }

    var field = document.getElementById('item' + this.currentNumber);
    field.removeChild(field.lastChild);
    field.innerHTML = '';

    this.currentNumber--;
},

  foodSelected : function(e){
    foodStuff[0].name = e.target.value;
    console.log("デバック");
  },

  addFoodstuff() {
        var food = document.getElementById('foodStuffName').value;
        var g = document.getElementById('gram').value;
        this.foodStuff.push({ name: food, gram: g});
        var TargetList = document.getElementById('foodList');
        TargetList.value = g + TargetList.value + "g/ml" + "\n";
        TargetList.value = food + TargetList.value;
        
        
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