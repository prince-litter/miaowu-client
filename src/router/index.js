import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../pages/Msite/Msite'
import Medic from '../pages/Medic/Medic'
import Adoption from '../pages/Adoption/Adoption'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import AdoptionShop from '../pages/AdoptionShop/AdoptionShop'
import MedicShop from '../pages/MedicShop/MedicShop'
import AdoptionShopBlog from "../pages/AdoptionShopBlog/AdoptionShopBlog"
import AdoptionBlogMessage from "../pages/AdoptionBlogMessage/AdoptionBlogMessage"
import ProfilePublish from "../pages/ProfilePublish/ProfilePublish"
Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/',
      redirect:'/msite'
    },
    {
      path:'/msite',
      component:Msite,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/medic',
      component:Medic,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/adoption',
      component:Adoption,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile_publish',
      component:ProfilePublish
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/adoption_shop',
      component:AdoptionShop
    },
    {
      path:'/adoption_shop_blog',
      component:AdoptionShopBlog
    },
    {
      path:'/adoption_blog_message',
      component:AdoptionBlogMessage
    },
    {
      path:'/medic_shop',
      component:MedicShop
    }
  ]
})
