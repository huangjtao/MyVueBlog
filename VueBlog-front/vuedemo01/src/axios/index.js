import router from '../router'
import axios from 'axios'
import Element from 'element-ui'
import store from '../store'

//axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'
//TODO:配置读取
axios.defaults.headers['Accept-Language'] = "zh-Hans"
// axios.defaults.baseURL = '';
// 后台地址
axios.defaults.baseURL = "http://localhost:425";

// 前置拦截
// 设置请求拦截器  config 配置对象
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器成功 1');
    if (config.url !== "/home/user/register" && config.url !== "/admin/user/login" && sessionStorage.getItem("userInfo") != null) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    }
    if (sessionStorage.getItem("userInfo") == null) {
        store.commit("REMOVE_INFO")
        router.replace({
            path: '/login'
        })
    }
    return config;
}, function (error) {
    console.log('请求拦截器失败 1');
    return Promise.reject(error);
});


// 设置响应拦截器
axios.interceptors.response.use(response => {
    let res = response.data;

    console.log("=================")
    console.log(res)
    console.log("=================")

    // if (res.code === 200) {
    if (response.status == 200) {
        return response
    } else {

        Element.Message.error('错了哦，这是一条错误消息', { duration: 3 * 1000 })

        return Promise.reject(response.data.msg)
    }
},
    (error) => {
        console.log(error)
        switch (error.response.code) {
            case 401:
                //弹窗失败 or 跳转error页面
                //swal(...)
                store.commit("REMOVE_INFO")
                router.replace({
                    path: '/login'
                })
                break
        }

        Element.Message.error(error.message, { duration: 3 * 1000 })
        return Promise.reject(error)
    }
)
