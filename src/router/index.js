import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/users.vue'


Vue.use(VueRouter)

  const routes = [
    //路由导入  component的值不加引号
    //让用户访问‘/’跟路径的时候，自动重定向到login页面   页面重定向
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component: Login
    },
    {
      // 当我访问home页面的时候，重定向到welcome页面，并在main中进行组件展示占位
      path:'/home',
      component: Home,
      redirect:"/welcome",
      children:[
        {
          path:'/welcome',
          component:Welcome,
        },
        {
          path:'/users',
          component:Users
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

export default router
