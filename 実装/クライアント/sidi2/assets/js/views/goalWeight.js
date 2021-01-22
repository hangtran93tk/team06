import Ajax from '../lib/Ajax.js';
// import User from '../lib/User';

export default {
    //テンプレート//
    template: `
    <div id="input">
        <div id="wrap">
            <header role="banner">
            <link rel="stylesheet" href="./assets/css/goalWeight.css">
                <h1>目標設定</h1>
            </header>
            <img src="./assets/img/goal.png" alt="target">
            <main role="main">
                <div id="weight">
                    <h2>目標体重</h2><br>
                    <div id="block">
                        <input type="text" class="goalWeght" v-model="goal_weight"><label for="kg">kg</label>
                    </div>
                    <div id="update">
                        <button type="button" class="updateBtn" @click="clickupdate('?goal-weight=')">更新</button>
                    </div>
                </div>
            </main>
        </div>
    </div>	
    `,
    data() {
        return{
            goal_weight: "",
        };
    },
    methods: {
        clickupdate() {
            const obj1 = {
                "goal_weight": this.goal_weight,
            };
            
            

            // const obj2 = {
            //     "weight": this.weight
            // };

            Ajax(`http://192.168.1.10:8000/auth/update-goal-weight/`,'PATCH',localStorage.getItem('access'), obj1)
            .then((res) => {
                console.log(res);
                this.regis_comp = true;
                if (res.errors) {
                    this.message = res.errors;
                } else {
                    this.message = 'テスト'
                }
            })
            .catch((err) => {
                console.log(err);
            });
            // Ajax(`http://192.168.1.10:8000/auth/user-weight/`,'POST',null, obj1)
            // .then((res) => {
            //     console.log(res);

            // })
            // .catch((err) => {
            //     console.log(err);
            // });

        }

    }
};