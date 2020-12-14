import Vue from './vendor/vue.esm.browser.js';
import VueRouter from './vendor/vue-router.esm.browser.js';


// views
import Login from './views/Login.js';
import Test from './views/Test.js';
import AccountRegister from './views/AccountRegister.js';
import weightGraph from './views/weightGraph.js';




/*
------- 作るページ -------
/ Login.js

*/

    (function() {
        "use strict";
    Vue.use(VueRouter);
    const VueHighcharts = window['VueHighcharts'].default;

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
                path: '/test',
                name: "weightGraph",
                component: weightGraph
            },
            // { 
            //     path: '/main', 
            //     name: 'Main', 
            //     query: { auth: '' }, 
            //     component: Main 
            // },
            
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