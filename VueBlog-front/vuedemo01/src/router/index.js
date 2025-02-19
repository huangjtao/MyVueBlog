import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
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
      path: '/articleedit',
      name: 'articleedit',
      component: () => import('@/views/articleedit/articleedit'),
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
    {
      path: '/testPage',
      name: 'testPage',
      component: () => import('@/views/testPage/index.vue'),
      hidden: true
    },
    {
      path: '/userInfoView',
      name: 'userInfoView',
      component: () => import('@/views/userInfo/userInfoView.vue'),
      hidden: true
    },
    {
      path: '/userInfoUpdate',
      name: 'userInfoUpdate',
      component: () => import('@/views/userInfo/userInfoUpdate.vue'),
      hidden: true
    },
  ],
})

//路由跳转
router.beforeEach(async (to, from, next) => {
  console.log("打印路由情况");
  console.log(to);//到哪里去
  console.log(from);//从哪里来
  const token = localStorage.getItem('token')
  let toPath = to.path;
  // if (token && to.path != '/login' || to.path != '/register') {
  if (toPath.indexOf('/login') == -1 || toPath.indexOf('/register') == -1) {
    if (toPath == '/login' && router.currentRoute.fullPath != '/register' && router.currentRoute.fullPath != '/') {
      sessionStorage.setItem("redirect", router.currentRoute.fullPath);
    }
    else if (toPath == '/register' && router.currentRoute.fullPath != '/login') {
      sessionStorage.setItem("redirect", router.currentRoute.fullPath);
    }
    else {
    }
    next();
  } else {
    next();
  }
  // }
})

export default router;