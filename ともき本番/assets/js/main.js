import Vue from './vendor/vue.esm.browser.js';
import VueRouter from './vendor/vue-router.esm.browser.js';


// views
import Login from './views/Login.js';
// import Register from './views/Register.js';



/*
------- 作るページ -------
/ Login.js

*/

    // (function() {
    //     "use strict";
    Vue.use(VueRouter);

    // VueRouter //=====//
    const router = new VueRouter({
        routes : [

            {
                path: "/",
                name: "Login",
                component: Login
            },
            // { 
            //     path: '/main', 
            //     name: 'Main', 
            //     query: { auth: '' }, 
            //     component: Main 
            // },
            // { 
            //     path: '/register', 
            //     name: 'Register', 
            //     component: Register 
            // }
        ]
    
    });

    // vueの設定 //=====//
    var app = new Vue({
        el: '#app',
        router,
    });

//    });