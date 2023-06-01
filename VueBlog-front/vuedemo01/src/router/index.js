import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: () => import('@/views/login/login'),
      hidden: true
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/register.vue'),
      hidden: true
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index'),
      hidden: true
    },
    {
      path: '/articleRealse',
      name: 'articleRealse',
      component: () => import('@/views/articleRealse/articleRealse'),
      hidden: true
    },
    {
      path: '/articledetails',
      name: 'articledetails',
      component: () => import('@/views/articledetails/articledetails'),
      hidden: true
    },
    {
      path: '/todayup',
      name: 'todayup',
      component: () => import('@/views/articleRealse/todayup'),
      hidden: true
    },
    {
      path: '/piclistup',
      name: 'piclistup',
      component: () => import('@/views/articleRealse/piclistup'),
      hidden: true
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('@/views/commentinfo/commentinfo'),
      hidden: true
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/views/community/community'),
      hidden: true
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: () => import('@/views/aboutMe/aboutme'),
      hidden: true
    },
  ]
})
