import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div id="input">
    <div>
        <input type="text" class="email" v-model="user.email" value="メール">
        <p v-if="user.email === ''">メールを入力してください</p>
    </div>
    <div>
        <input type="text" class="password" v-model="user.password" value="パスワード>
        <p v-if="user.password === ''">パスワードを入力してください</p>
    </div>
</div>
<div class="bottom">
    <button type="button" class="loginBtn" @click="clickLogin">ログイン</button>
    <router-link :to="'/register'" class="registerBtn">新規登録</router-link>   
</div>	`,
    // 関数いろいろ //================//
    methods: {
    clickLogin() {
        const obj = {
            "email": this.user.email,
            "password": this.user.password
        };
        Ajax(`/auth/login/`,'POST', obj)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }   
    }
    
};