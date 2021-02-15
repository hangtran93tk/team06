
export default {
  
    //テンプレート//
    template: `
    <div id="input">
      <div id="wrap">
        <header role="banner">
          <link rel="stylesheet" href="./assets/css/searchMenu.css">
          <h1>メニュー検索</h1>
          
        </header>
        <main role="main">
            <input type="text"  id="cookingName" placeholder="料理名">
            <div id="block" v-for="find in foodStuff">
                <div id="form1">
                    <div id="kouhos">
                        <ul>
                            <li v-for="n in foodStuffList" :key="n"  @click="itemSelected">{{n}}</li>
                        </ul>
                    </div>
                    <input type="search" id="cookingName" class="form-control" placeholder="料理名" style="float:left;" v-model="find.name"  @input="getFoodStuffName" autocomplete="off">
                </div>

                <div v-if="find.name !== ''">                  
                    <input type="checkbox" :id="find.id" :value="find.id" >						
                    <label :for="find.id" class="label-name">{{find.name}}</label>
                    <label :for="find.id" class="label-kcal">{{find.kcal}}kcal</label>
                </div> 
            </div>     
            <div id="record">
                <button onclick="location.href='./main.html'">記録</button>
            </div>
        </main>
      </div>
    </div>
    
    `,
    data() {
        return {
            foodStuff:[],
            findName: null,
            foodStuffList: [],
            foodStuffItem: [],
            n: null
        }
    },
    methods: {
        itemSelected(e){
            console.log(this.boxIndex.current);
            this.foodStuff[this.boxIndex.current].name = e.target.innerText;
           
          },
          getFoodStuffName({ target }) {
            this.findName = target.value;
            console.log(this.n);
            // let value = "?jp_name=" + foodStuffName;
            let value = "?jp_name=" + this.findName;
            if(value.length >= 11) {
              // console.log(this.$refs.query.value);
              Ajax('http://192.168.1.10:8000/menu/get-Menu/' + value,'GET', localStorage.getItem('access'), null)
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
          }
    }
   
};



