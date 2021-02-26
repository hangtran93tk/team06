import Ajax from '../lib/Ajax.js';
export default {
    // テンプレート //================//
    template: `
    <div id="wrap">
            <header role="banner">  
            <link rel="stylesheet" href="./assets/css/mealHistory.css">
				<h1>メニュー検索</h1>
				<input type="search"  id="cookingName"placeholder="料理名を検索" @input="getMenuName" ref="query" autocomplete="off">
                <table class="table1">
					<tr>
                    <td>
                        <button  @click="showMyMenu"> Myメニュー </button>
                    </td>
						
                    <td>
                        <button  @click="showAllMenu"> メニュー検索 </button>
                    </td>
					</tr>
				</table>
			</header>
			<main role="main">

                <div id="record">
                    <button @click="postUserEat" >記録</button>
                </div>
                <div id="block" >
                    <div class="block1" v-for="menu in menus" :key="menu.id">
                        <input type="checkbox" :id="menu.id" :value="menu.id" v-model="selectedUserEats">						
                        <label v-if=" type === '1'" :for="menu.id" class="label-name">{{menu.jp_name.substring(7,30)}}</label>
                        <label v-if=" type === '2'" :for="menu.id" class="label-name">{{menu.jp_name}}</label>
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
                type: ''
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                
            },
            getMenuName({ target }) {
                this.findName = target.value;
                // let value = "?jp_name=" + foodStuffName;
                let value = "?jp_name=" + this.findName;
                if(value.length >= 11) {
                  console.log(this.$refs.query.value);
                  Ajax('http://180.46.192.112:8000/menu/get-Menu/' + value,'GET', localStorage.getItem('access'), null)
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
                Ajax(`http://180.46.192.112:8000/menu/post-UserEat/`,'POST', localStorage.getItem('access'), obj)
                    .then((res) => {
                        console.log(res);
                        this.$router.push({path: '/main'});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            showMyMenu() {
                this.type = '1';
                Ajax('http://180.46.192.112:8000/menu/get-Mymenu/','GET', localStorage.getItem('access'), null )
                .then((res) => {
                    console.log(res);
                    this.menus = res;
                    console.log(this.menus);
                    // for (let i = 0 ; i < this.menus.length ; i++) {
                    //     this.menus[i].jp_name = this.menu[i].jp_name.substring(7,30);
                    // }
                })
                .catch((err) => {
                   console.log(err);
                 });

            },
            showAllMenu() {
                this.type = '2';
                Ajax('http://180.46.192.112:8000/menu/get-Menu/','GET', localStorage.getItem('access'), null )
                .then((res) => {
                    console.log(res);
                    this.menus = res;
                    console.log(this.menus);
                })
                .catch((err) => {
                   console.log(err);
                 });
            }

        }
};