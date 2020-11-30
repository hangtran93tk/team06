import Ajax from '../lib/Ajax.js';


export default {
    // テンプレート //================//
    template: `
    <div id="input">
        <div>
            <input type="text" class="email" v-model="email"  placeholder="メール">
        </div>
        <div>
            <input type="password" class="password" v-model="password" placeholder="パスワード">
        </div>
        <div class="bottom">
            <button type="button" class="loginBtn" @click="clickLogin" >ログイン</button> 
        </div>	
    </div>
        `,
    methods: {
        clickLogin() {   
            const obj = {
                "email": this.email,
                "password": this.password
            };
            Ajax(`http://192.168.1.10:8000/auth/login/`,'POST', obj)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            }   
        }
};