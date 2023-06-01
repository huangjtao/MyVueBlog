<template>
    <div>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item style="font-size: xx-large; font-weight: 800">Tao</el-menu-item>
            <el-menu-item index="/home" @click="LinkToIndex">首页</el-menu-item>
            <el-menu-item index="/community" @click="LinkToCommunity">社区</el-menu-item>
            <el-menu-item index="/piclistup" @click="LinkToPiclist">图片中心</el-menu-item>
            <el-menu-item index="/comment" @click="LinkToComment">留言板</el-menu-item>
            <el-menu-item index="/aboutme" @click="LinkToAboutme">关于我</el-menu-item>
            <el-menu-item>
                <el-input v-model="state" placeholder="请输入内容">
                    <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick">
                    </i>
                </el-input>
            </el-menu-item>
            <el-menu-item style="float: right;">
                <el-button type="danger" icon="el-icon-circle-plus-outline" round
                    @click="LinkToArticleRealse">发布</el-button>
            </el-menu-item>
            <el-menu-item style="float: right;" @click="LinkToRegister" v-if="!IsLogin">注册</el-menu-item>
            <!-- <el-menu-item style="float: right;" @click="LinkToLogin" v-if="true">登录</el-menu-item> -->
            <el-menu-item style="float: right;" v-if="IsLogin">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <el-avatar :src="userInfo.userAvatar"></el-avatar>
                        <span>{{ userInfo.userName }}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="showUserInfo">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="updateUserInfo">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="exitLogin">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
            <el-menu-item style="float: right;" @click="LinkToLogin" v-else>登录</el-menu-item>
            <!-- <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu> -->
            <!-- <el-menu-item index="4"><a href="" target="_blank">订单管理</a></el-menu-item>
            <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
import store from '../../store';

export default {
    name: "NavBar",
    data() {
        return {
            // activeIndex: '',
            state: "",
            IsLogin: false,
            userInfo: {},
        };
    },
    mounted() {
        this.judgeLoginStatus();
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log("当前页面:" + key, keyPath);
        },
        LinkToIndex() {
            this.$router.push({ path: '/home' })
        },
        LinkToCommunity() {
            this.$router.push("/community")
        },
        LinkToPiclist() { this.$router.push("/piclistup") },
        LinkToComment() { this.$router.push("/comment") },
        LinkToAboutme() { this.$router.push("/aboutme") },
        LinkToRegister() { this.$router.push("/register") },
        LinkToLogin() { this.$router.push("/login") },
        LinkToArticleRealse() { this.$router.push("/articleRealse") },

        handleIconClick() {

        },

        judgeLoginStatus() {
            /**
             * this.$store=undefined
             * 查看vue与vuex的版本
            vue2对应vuex3,vue3对应vuex4

            我这里就是因为版本不对应导致的，安装指定版本，重启就好了！
            npm rm vuex --save
            npm install vuex@3.6.2 --save
             */
            const user = this.$store.getters.getUser;
            console.log("userInfo=", user)
            if (user != '') {
                this.IsLogin = true;
                this.userInfo = user;
            }
        },
        showUserInfo() { },
        updateUserInfo() { },
        exitLogin() {
            this.$store.commit("REMOVE_INFO")
            this.$router.push({ path: '/login' })
        }
    }
}
</script>
<style slot-scope>
.el-input__inner {
    border-radius: 20px;
}

.el-button.is-round {
    border-radius: 30px;
    padding: 12px 5px;
}

.el-menu-item .el-button i {
    color: white;
    margin-right: 0px;
}

.el-menu-item .el-button span {
    margin-left: 0px;
}

.el-menu-demo .el-menu-item a {
    text-decoration: none;
}
</style>