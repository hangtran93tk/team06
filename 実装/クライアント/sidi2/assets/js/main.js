import Vue from './vendor/vue.esm.browser.js';
import VueRouter from './vendor/vue-router.esm.browser.js';


// views
import Login from './views/Login.js';
// import Test from './views/Test.js';
import AccountRegister from './views/AccountRegister.js';
import weightGraph from './views/weightGraph.js';
import Main from './views/Main.js';
import goalWeight from './views/goalWeight.js';
import mymenuRegister from './views/mymenuRegister.js';



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
                path: '/goalWeight',
                name: "goalWeight",
                component: goalWeight
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