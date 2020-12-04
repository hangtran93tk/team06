import Ajax from '../lib/Ajax.js';
import User from '../lib/User';

export default {
    //テンプレート//
    template: `<header role="banner">
    <h1>アカウント登録</h1>
    <link rel="stylesheet" href="./assets/css/accountRegister.css">
</header>

<main role="main">
    <section id="inputInfo">
            <input type="text" id="nickname" value="ニックネーム" v-model="user.name"><br>								
            <input type="text" id="mail" value="メールアドレス" v-model="user.email"><br>
            <input type="text" id="password" value="パスワード" v-model="user.password"><br>
            <input type="text" id="passwordConfirm" value="パスワード再入力" v-model="confirm_pass">
            <p v-if="user.password !== confirm_pass">パスワードが再入力してください</p>			
    </section>
    
    <section id="birthday">
        <h2>生年月日</h2>
        <input type="date" name="birthday" v-model="user.birthday">
    </section>

    <div >
        <section id="gender">
            <h2>性別</h2>
            <input type="radio" id="male" name="gender" value="male" v-model="picked.gender">
            <label for="0">男性</label>
            
            <input type="radio" id="female" name="gender" value="female" v-model="picked.gender">
            <label for="1">女性</label>
           
        </section>	
        <div id="heightWeight">
            <div id="height">
                <h2>身長</h2>
                <input type="text" name="userHeight"><label for="height" v-model="user.height">cm</label>
            </div>
            <div id="weight">
                <h2>体重</h2>
                <input type="text" name="userWeight" v-model="user.weight"><label for="weight">kg</label>
                <h2 class="goalWeight">目標体重</h2>
                <input type="text" name="userWeight" v-model="user.goal_weight"><label for="weight">kg</label>
                
            </div> 
            
        </div>
    </div>
    
    
    <section id="active">
        <h2>運動レベル</h2>
            
            <input type="radio" id="active" name="active" value="1" v-model="picked.active">
            <label class="active" for="0">レベル１</label>
            
            <input type="radio" id="active" name="active" value="2" v-model="picked.active">
            <label class="active" for="1">レベル2</label>

            <input type="radio" id="active" name="active" value="3" v-model="picked.active">
            <label class="active" for="2">レベル3</label>
    </section>

    <a href="#"><h4>運動レベルとは ?</h4></a>	

    <div id="register">
        <button type="button" @click="clickRegister"><label for="register">登録</label></button>
    </div>
</main>`,
    methods: {
        clickActiveLevel(level) {
            let v = level;
        },
        clickRegister() {
            const obj1 = {
                "name": this.user.name,
                "email": this.user.email,
                "password": this.user.password,
                "birthday":this.user.birthday,
                "sex": this.picked.gender,
                "height": this.user.height,
                "goal_weight":this.user.goal_weight,       
                "active_level":this.picked.active
            };
            
            

            const obj2 = {
                "weight": this.user.weight
            };

            Ajax(`http://192.168.1.10:8000/auth/user-weight/`,'POST', obj2)
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            });

        }

    }
};