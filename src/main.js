import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

import store from './store.js'
import App from './components/App.vue'
import Students from './components/Students.vue' 
import Studentsinfo from './components/Studentsinfo.vue'
import login from './components/login.vue'


Vue.use(Vuex)

const routes = [
    { path: '/', component: Students, meta: {requiresAuth:true}},
    { path: '/student-info/:id', component: Studentsinfo, props:true, meta: {requiresAuth:true}},
    { path: '/login', component: login},
]

const router = new VueRouter({

    routes
})

router.beforeEach ((to, from, next)=>{
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.getUser === null) {
            next({
                path:'/login',
                query: {redirect: to.fullPath}
            })
        } else {
          next()
        }
    } else{
        next()
    }
})

    Vue.use(VueAxios, axios)
    Vue.use(VueRouter)
    


new Vue({
    render: h => h(App),
    el: '#app',
    store,
    router
    
 })
 


