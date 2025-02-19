// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios';
import './axios';
import uploader from 'vue-simple-uploader'
Vue.use(uploader)
import qs from 'qs'
Vue.prototype.$qs = qs

import jquery from 'jquery'
Vue.prototype.$ = jquery

import echarts from 'echarts'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);

import swal from 'sweetalert';
//时间日期格式化
import moment from 'moment'

//import '@/styles/yhbackground.js'
// import '@/styles/autoload/autoload.js'
import '@/styles/axbackground/axbackground.js'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

