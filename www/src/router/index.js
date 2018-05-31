import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/login'
import BoardDetail from '@/components/boardDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
    path: '/boardDetail',
    name: 'BoardDetail',
    component: BoardDetail
    }
  ]
})
