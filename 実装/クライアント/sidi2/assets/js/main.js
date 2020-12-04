import Vue from './vendor/vue.esm.browser.js';
import VueRouter from './vendor/vue-router.esm.browser.js';
// views
import Login from './views/Login.js';
import Register from './views/Register.js';


/*
------- 作るページ -------
/ Login.js

*/

(function() {
    "use strict";

    // VueRouter //=====//
    Vue.use(VueRouter);

    const routes = [
        {
            path: "/login",
            name: "Login",
            component: Login
        }
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
    ];

    const router = new VueRouter({
        routes
    });

    // vueの設定 //=====//
    new Vue({
        el: '#app',
        router
    });

})();