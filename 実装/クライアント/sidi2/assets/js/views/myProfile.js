import Ajax from '../lib/Ajax.js';

export default {
    template: `
    <div id="wrap">
    <header role="banner">
    <link rel="stylesheet" href="./assets/css/myProfile.css">
        <h1>プロフィール変更</h1>
    </header>

    <main role="main">
        <div v-for="plofile in profiles">
            <section id="inputInfo">
                <h2>ニックネーム</h2>
                <!-- <input type="text" id="nickname" :value="plofile.username"><br>	-->
                <input type="text" id="nickname" v-model="name"><br>							
            </section>
            
            <section id="birthday">
                <h2>生年月日</h2>
                <input type="date" name="birthday" v-model="birthday">
            </section>

            
            <section id="gender">
                <h2>性別</h2>
                <input type="radio" id="male" name="gender" value="1" :checked="plofile.sex == 1" v-model="gender">
                <label for="male">男性</label>
                
                <input type="radio" id="female" name="gender" value="2" :checked="plofile.sex == 2" v-model="gender">
                <label for="female">女性</label>
            </section>	
            <div id="heightWeight">
                <div id="height">
                    <h2>身長</h2>
                    <input type="text" name="userHeight" v-model="height"><label for="height">cm</label>
                </div>
                <!--
                <div id="weight">
                    <h2 class="goalWeight">体重</h2>
                    <input type="text" name="userWeight" :value="65.5"><label for="weight">kg</label>
                    
                </div> 
                -->
            </div>
            <section id="active">
                <h2>運動レベル</h2>
                <input type="radio" name="active" value="1"  id="radio_1" :checked="plofile.active_level == 1" v-model="active"><label class="active"for="radio_1">レベル１</label>
                <input type="radio" name="active" value="2"  id="radio_2" :checked="plofile.active_level == 2" v-model="active"><label class="active" for="radio_2">レベル2</label>
                <input type="radio" name="active" value="3"  id="radio_3" :checked="plofile.active_level == 3" v-model="active"><label class="active" for="radio_3">レベル3</label>
            </section>
        
        
            <!-- 
            <section id="active">
            <h2>運動レベル</h2>
            <input type="radio" name="active" value="1" v-model="active" id="radio_1" :checked="plofile.active_level == 1"><label class="active"for="radio_1">レベル１</label>
            <input type="radio" name="active" value="2" v-model="active" id="radio_2" :checked="plofile.active_level == 2"><label class="active" for="radio_2">レベル2</label>
            <input type="radio" name="active" value="3" v-model="active" id="radio_3" :checked="plofile.active_level == 3"><label class="active" for="radio_3">レベル3</label>
            </section>
                <section id="active">
                <h2>運動レベル</h2>
                <input type="radio" id="active" name="active" value="1" v-model="picked" :checked="">
                <label class="active" for="0">レベル１</label>
        
                <input type="radio" id="active" name="active" value="2" v-model="picked" :checked="">
                <label class="active" for="1">レベル2</label>

                <input type="radio" id="active" name="active" value="3" v-model="picked">
                <label class="active" for="2">レベル3</label>
            </section> -->
        <!--
            <section id="inputInfo">
                <h2>パスワード変更</h2>
                <input type="text" id="password" value="パスワード"><br>
                <input type="text" id="passwordConfirm" value="パスワード再入力">			
            </section>
        -->
            <br><br><br><br><br><br><br>
        </div>	

        <div id="register">
            <button @click="clickUpdate"><label for="register">保存</label></button>
        </div>
    </main>	
</div>	

    `,
    data() {
        return{
            error: "",
            // email: "",
            // password: "",
            profiles: [],
            name: "",
            password: "",
            height: "",
            goal_weight: "",   
            birthday: "",
            active_level: "",
            confirm_pass: "",
            gender: "",
            // weight: "",
            active: "",
        };
    },
    mounted(){
        this.init();
    },
    methods: {
        init() {
            Ajax('http://180.46.192.112:8000/auth/get-UserInfo/','GET', localStorage.getItem('access'), null )
                .then((res) => {
                    
                    this.profiles = res;
                    console.log(res);
                    console.log(this.profiles[0]["birthday"]);
                    this.profiles[0]["birthday"] = this.formatDate(this.profiles[0]["birthday"]);
                    this.name = this.profiles[0]["username"];
                    this.birthday = this.profiles[0]["birthday"];
                    this.gender = this.profiles[0]["sex"];
                    this.height = this.profiles[0]["height"];
                    this.active = this.profiles[0]["active_level"];
                    console.log(this.profiles);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        formatDate:function(str) {
            var str2 = new String(str); 
            var arr = (str2.substr(0, 4) + '-' + str2.substr(4, 2) + '-' + str2.substr(6, 2)).split('-');
            var SampleDate1 = new Date(arr[0], arr[1] - 1, arr[2]);
            console.log(SampleDate1);
            let test = SampleDate1.getFullYear() + '-' +('0' + (SampleDate1.getMonth()+1)).slice(-2)+ '-' +  ('0' + SampleDate1.getDate()).slice(-2);
            console.log(test);
            return test;
        },
        clickUpdate(){
            const obj1 = {
                "username"    :this.name,
                "birthday"    :this.birthday,
                "sex"         :this.gender,  
                "height"      :this.height,
                "active_level":this.active
            };
            Ajax(`http://180.46.192.112:8000/auth/put-UserInfo/`,'PUT', localStorage.getItem('access'), obj1)
            .then((res) => {
                console.log(res);
                this.$router.push({path: '/main'});
            })
            .catch((err) => {
                console.log(err);
            });
        }  
    }
};