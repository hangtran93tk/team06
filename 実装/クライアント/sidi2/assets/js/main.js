import Vue from './vendor/vue.esm.browser.js';
import VueRouter from './vendor/vue-router.esm.browser.js';


// views
import Login from './views/Login.js';
// import Test from './views/Test.js';
import AccountRegister from './views/AccountRegister.js';
import weightGraph from './views/weightGraph.js';
import Main from './views/Main.js';
import GoalWeight from './views/GoalWeight.js';
import mymenuRegister from './views/mymenuRegister.js';
import Calendar from './views/Calendar.js';
import OnedayInfo from './views/OnedayInfo.js';
import MealHistory from './views/MealHistory.js';
import Setting from './views/Setting.js';
import Advice from './views/Advice.js';
import MyProfile from './views/MyProfile.js';


const VueHighcharts = window['VueHighcharts'].default;


/*
------- 作るページ -------
/ Login.js

*/

    (function() {
        "use strict";
    Vue.use(VueRouter);
    // const VueHighcharts = window['VueHighcharts'].default;
    // const Highcharts = window['Highcharts'].default;

    // VueRouter //=====//
    const router = new VueRouter({
        routes : [

            {
                path: "/",
                name: "Login",
                component: Login
            },
            // {
            //     path: "/test",
            //     name: "Test",
            //     component: Test
            // },
            { 
                path: '/register', 
                name: 'AccountRegister', 
                component: AccountRegister 
            },
            {
                path: '/weightGraph',
                name: "weightGraph",
                component: weightGraph
            },
            { 
                path: '/main', 
                name: 'Main', 
                query: { auth: '' }, 
                component: Main 
            },
            {
                path: '/calendar',
                name: "Calendar",
                component: Calendar
            },
            {
                path: '/onedayInfo',
                name: "OnedayInfo",
                component: OnedayInfo
            },
            {
                path: '/mealHistory',
                name: "MealHistory",
                component: MealHistory
            },
            {
                path: '/setting',
                name: "Setting",
                component: Setting
            },
            {
                path: '/advice',
                name: "Advice",
                component: Advice
            },
            {
                path: '/myProfile',
                name: "MyProfile",
                component: MyProfile
            },
            {
                path: '/goalWeight',
                name: "GoalWeight",
                component: GoalWeight
            },
            {
                path: '/mymenuRegister',
                name: "mymenuRegister",
                component: mymenuRegister
            },
            
        ]
    
    });

    // vueの設定 //=====//
    var app = new Vue({
        el: '#app',
        router,
        components: {
            'vue-highcharts':VueHighcharts
        },
    });

   })();