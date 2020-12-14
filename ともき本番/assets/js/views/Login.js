import Ajax from '../lib/Ajax.js';


export default {
    // テンプレート //================//
    template: `
    <div id="input">
        <header role="banner">
            <img src="./assets/img/user_login.png" alt="login user">
            <link rel="stylesheet" href="./assets/css/login.css">
        </header>
        <main role="main"> 
            <div>
                <input type="text" class="mail" v-model="email"  placeholder="メール">
            </div>
            <div>
                <input type="password" class="password" v-model="password" placeholder="パスワード">
                <p> {{ error }} </p>
            </div>
            <div class="bottom">
                <button type="button" class="loginBtn" @click="clickLogin" >ログイン</button>
                <router-link :to="'/register'" class="registerBtn">新規登録</router-link>
            </div>	
        </main>
    </div>
        `,

    data() {
        return{
            error: "",
            email: "",
            password: "",
        };
    },
    
    methods: {
        clickLogin() {   
            const obj = {
                "email": this.email,
                "password": this.password
            };
            Ajax(`http://192.168.1.10:8000/auth/login/`,'POST', null, obj)
                .then((res) => {
                    console.log(res);
                    if(res.data){
                        console.log(res.data.tokens.access);
                        localStorage.setItem('access', res.data.tokens.access);
                        localStorage.setItem('refresh', res.data.tokens.refresh);
                        this.$router.push({path: '/test'});
                    }
                    else{
                        if(res.errors.email && res.errors.password) {
                            this.error = res.errors.email + " " + res.errors.password;
                        }
                        else if(res.errors.password) {
                            this.error = res.errors.password;
                        }
                        else if (res.errors.email) {
                            this.error = res.errors.email;
                        }
                        else if(res.errors.detail) {
                            this.error = res.errors.detail;
                        }
                        else{
    
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }   
        }
};