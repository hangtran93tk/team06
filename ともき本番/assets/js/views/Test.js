import Ajax from '../lib/Ajax.js';


export default {
    // テンプレート //================//
    template: `
    <div id="input">
    <h1>ログイン成功</h1>
    <div class="bottom">
            <button type="button" class="loginBtn" @click="clickLogin" >ログイン</button> 
    </div>	
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
            Ajax(`http://192.168.1.10:8000/auth/user-weight/`,'GET', localStorage.getItem('access'), null )
                .then((res) => {
                    console.log(res);
                    
                })
                .catch((err) => {
                    console.log(err);
                });
            }   
        }
};