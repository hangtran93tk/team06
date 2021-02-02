import Ajax from '../lib/Ajax.js';
export default {
    // テンプレート //================//
    template: `
    <div id="wrap">
            <header role="banner">  
            <link rel="stylesheet" href="./assets/css/mealHistory.css">
				<h1>食事履歴</h1>
				<input type="text"  id="cookingName"placeholder="料理名を検索">
				<table>
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
			</header>
			<main role="main">
				<div class="tab">
					<input type="radio" name="s1" id="i1" checked>
					<label for="i1" class="tab3"><img src="./assets/img/sun.png"   alt="朝" ></label>
					<input type="radio" name="s1" id="i2">
					<label for="i2" class="tab3"><img src="./assets/img/weather.png"  alt="昼" ></label>
					<input type="radio" name="s1" id="i3">
					<label for="i3" class="tab3"><img src="./assets/img/moon.png"   alt="夜" ></label>
					<input type="radio" name="s1" id="i4">
					<label for="i4" class="tab3"><img src="./assets/img/coffee-breaks.png"   alt="間食"></label>
                </div>
                <div id="record">
                <button onclick="location.href='./main.html'">記録</button>
                </div>
                <div id="block">
                    <div class="block1" v-for="menu in menus" :key="menu.id">
                        <input type="checkbox" :id="menu.id" :value="menu.jp_name">						
                        <label :for="menu.id" class="label-name">{{menu.jp_name}}</label>
                        <label :for="menu.id" class="label-kcal">{{menu.kcal}}kcal</label>
                    </div>
                </div>
               
								
			</main>	
		</div>	
        `,
        data() {
            return {
                menus: [],
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                Ajax('http://192.168.1.10:8000/menu/get-Mymenu/','GET', localStorage.getItem('access'), null )
                .then((res) => {
                    // console.log(res);
                    this.menus = res;
                    console.log(this.menus);
                })
                .catch((err) => {
                   console.log(err);
                 });

            }
        }
};