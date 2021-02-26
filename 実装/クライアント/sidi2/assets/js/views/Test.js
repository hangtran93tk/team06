import Ajax from '../lib/Ajax.js';


export default {
    // テンプレート //================//
    template: `
    <div id="input">
    <link rel="stylesheet" href="./assets/css/test.css">
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
            Ajax(`http://180.46.192.112:8000/auth/user-weight/`,'GET', localStorage.getItem('access'), null )
                .then((res) => {
                    console.log(res);
                    
                })
                .catch((err) => {
                    console.log(err);
                });
            }   
        }
};