import router from '../router'
import axios from 'axios'
import Element from 'element-ui'
import store from '../store'
import defaultUser from '../store/userInfo.json'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'
//TODO:配置读取
axios.defaults.headers['Accept-Language'] = "zh-Hans"
// axios.defaults.baseURL = '';
// 后台地址
axios.defaults.baseURL = "http://localhost:425";
axios.defaults.timeout = 1000 * 10

// 前置拦截
// 设置请求拦截器  config 配置对象
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器成功 1-token');
    // 在发送请求之前做些什么，比如说设置 token
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // if (config.url !== "/home/user/register" && config.url !== "/admin/user/login" && sessionStorage.getItem("userInfo") != null) {
    //     config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    //     config.headers.token = localStorage.getItem("token");
    //     config.headers["Authorization"] = 'Bearer ' + localStorage.getItem("token");
    // }
    return config;
}, function (error) {
    console.log('请求拦截器失败 1-token');
    return Promise.reject(error);
});


// 设置响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么 ，返回新的响应数据
    let res = response.data;

    console.log("=================")
    console.log(res)
    console.log("=================")

    //对响应数据做些什么，比如说根据状态码做一些事情
    // if (res.code === 200) {
    if (response.status == 200) {
        return response
    } else {

        Element.Message.error('请求出错了哦，这是一条错误消息', { duration: 3 * 1000 })

        return Promise.reject(response.data.msg)
    }
},
    (error) => {
        console.log(error);
        // switch (error.response.code) {
        switch (error.code) {
            case "401":
                //弹窗失败 or 跳转error页面
                //swal(...)
                store.commit("REMOVE_INFO")
                router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
                })
                break;
            case "ERR_NETWORK":
                swal(error.message, "请检查网络是否有问题或者服务器端正常运行!", { icon: "error" });
        }

        Element.Message.error(error.message, { duration: 3 * 1000 })
        return Promise.reject(error)
    }
)
