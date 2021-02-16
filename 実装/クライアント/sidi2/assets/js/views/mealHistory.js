import Ajax from '../lib/Ajax.js';
export default {
    // テンプレート //================//
    template: `
    <div id="wrap">
            <header role="banner">  
            <link rel="stylesheet" href="./assets/css/mealHistory.css">
				<h1>食事履歴</h1>
				<input type="search"  id="cookingName"placeholder="料理名を検索" @input="getMenuName" ref="query" autocomplete="off">
				<table >
					<tr>
                    <td>
                        <div class="tabbox">
							<input type="radio" name="tabset" id="tabcheck1" checked>
                            <label for="tabcheck1" class="tab1">Myメニュー</label>
                        </div>
                    </td>
						
                    <td>
                        <div class="tabbox2">
							<input type="radio" name="tabset" id="tabcheck2">
                            <label for="tabcheck2" class="tab2">食事履歴</label>                          
                        </div>
                    </td>
					</tr>
				</table>
                <table>
					<tr>
                    <td>
                        <button> Myメニュー </button>
                    </td>
						
                    <td>
                        <button> メニュー検索 </button>
                    </td>
					</tr>
				</table>
			</header>
			<main role="main">

                <div id="record">
                <button @click="postUserEat" >記録</button>
                </div>
                <div id="block">
                    <div class="block1" v-for="menu in menus" :key="menu.id">
                        <input type="checkbox" :id="menu.id" :value="menu.id" v-model="selectedUserEats">						
                        <label :for="menu.id" class="label-name">{{menu.jp_name}}</label>
                        <label :for="menu.id" class="label-kcal">{{menu.kcal}}kcal</label>
                    </div>
                </div>		
			</main>	
		</div>	
        `,
        data() {
            return {
                selectedUserEats: [],
                menus: [],
                findName: '',
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                Ajax('http://192.168.1.10:8000/menu/get-Mymenu/','GET', localStorage.getItem('access'), null )
                .then((res) => {
                    console.log(res);
                    this.menus = res;
                    console.log(this.menus);
                })
                .catch((err) => {
                   console.log(err);
                 });

            },
            getMenuName({ target }) {
                this.findName = target.value;
                // let value = "?jp_name=" + foodStuffName;
                let value = "?jp_name=" + this.findName;
                if(value.length >= 11) {
                  console.log(this.$refs.query.value);
                  Ajax('http://192.168.1.10:8000/menu/get-Menu/' + value,'GET', localStorage.getItem('access'), null)
                  .then((res) => {
                     console.log(res);
                     this.menus = res;
                  })
                  .catch((err) => {
                     console.log(err);
                   });
                }
            },
            postUserEat() {  
                console.log(this.selectedUserEats);
                const obj = {
                    "eatTime": sessionStorage.getItem('eatTime'),
                    "userEat": this.selectedUserEats
                };
                Ajax(`http://192.168.1.10:8000/menu/post-UserEat/`,'POST', localStorage.getItem('access'), obj)
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