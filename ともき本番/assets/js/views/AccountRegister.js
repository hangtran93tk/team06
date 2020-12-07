import Ajax from '../lib/Ajax.js';
// import User from '../lib/User';

export default {
    //テンプレート//
    template: `
    <div id="input">
        <header role="banner">
            <h1>アカウント登録</h1>
            <link rel="stylesheet" href="./assets/css/accountRegister.css">
        </header>

        <main role="main">
            <section id="inputInfo">
                <input type="text" id="nickname" placeholder="ニックネーム" v-model="name"><br>								
                <input type="text" class="mail" v-model="email"  placeholder="メールアドレス"><br>
                <input type="password" id="password" placeholder="パスワード" v-model="password"><br>
                <input type="password" id="passwordConfirm" placeholder="パスワード再入力" v-model="confirm_pass">
                <p v-if="password !== confirm_pass">パスワードが再入力してください</p>			
            </section>
            <section id="birthday">
                <h2>生年月日</h2>
                <input type="date" id="birthday" name="birthday" v-model="birthday">
            </section>
            <div >
                <section id="gender">
                    <h2>性別</h2>
                    <label><input type="radio"  name="gender" value="1" v-model="gender">男性</label>
                    <label><input type="radio"  name="gender" value="2" v-model="gender">女性</label>
                </section>
            	
                <div id="heightWeight">
                    <div id="height">
                        <h2>身長</h2>
                        <input type="text" name="userHeight" v-model="height" ><label for="height">cm</label>
                    </div>
                    <div id="weight">
                        <h2>体重</h2>
                        <input type="text" name="userWeight" v-model="weight"><label for="weight">kg</label>
                        <h2 class="goalWeight">目標体重</h2>
                        <input type="text" name="userWeight" v-model="goal_weight"><label for="weight">kg</label>
                    </div> 
                </div>
            </div>    
            <section id="active">
                <h2>運動レベル</h2>
                <input type="radio" id="active" name="active" value="1" v-model="active" checked>
                <label class="active" for="0">レベル１</label>
            
                <input type="radio" id="active" name="active" value="2" v-model="active">
                <label class="active" for="1">レベル2</label>

                <input type="radio" id="active" name="active" value="3" v-model="active">
                <label class="active" for="2">レベル3</label>
            </section>
            <br>
            <details>
            <summary>運動レベルとは？</summary>
                <img src="./assets/img/Activelevel.png" />
            </details>
            <br>

            <div id="register">
                <button type="button" @click="clickRegister"><label for="register">登録</label></button>
            </div>
        </main>
    </div>
    `,
    data() {
        return{
            error: "",
            email: "",
            name: "",
            password: "",
            height: "",
            goal_weight: "",   
            birthday: "",
            active_level: "",
            confirm_pass: "",
            gender: "",
            weight: "",
            active: "",
        };
    },
    methods: {
        clickActiveLevel(level) {
            let v = level;
        },
        clickRegister() {
            const obj1 = {
                "email": this.email,
                "username": this.name,
                "password": this.password,
                "height": this.height,
                "goal_weight":this.goal_weight,
                "sex": this.gender,       
                "birthday":this.birthday,
                "active_level":this.active
            };
            
            

            const obj2 = {
                "weight": this.weight
            };

            Ajax(`http://192.168.1.10:8000/auth/register/`,'POST',null, obj1)
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            });

        }

    }
};