<template>
    <div class="login-container">
        <div class="left-container">
            <div class="left-container-content">
                <header>
                    <a href="" class="logo"></a>
                    <h1>If strength reaches its limit, the next test is the human heart.</h1>
                    <h1>Fireworks are fleeting, but human love endures.</h1>
                </header>
            </div>
        </div>
        <div class="right-container">
            <template>
                <nav class="right-nav">
                    <p>Sign in To My Earth !!<br />
                        Already a member? <a style="font-weight: 600;cursor: pointer;text-decoration: underline;"
                            @click="ToLogin">Sign in
                            Now</a>!</p>
                </nav>
                <!-- <div v-loading="loading" element-loading-text="登录中..." element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.6)" class="login-container-right"> -->
                <div class="login-container-right">

                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                        label-position="left">

                        <div class="title-container">
                            <h3 class="title">后台管理系统</h3>
                        </div>

                        <el-form-item prop="username">
                            <span style="font-weight: 600;">
                                UserName or Email Address
                            </span>
                            <el-input ref="username" v-model="loginForm.username" autocomplete="off"
                                placeholder="请输入用户名或者邮箱"></el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <span style="font-weight: 600;">
                                Password
                            </span>
                            <!-- <a style="float: right;font-weight: 600;cursor: pointer;" @click="ToRegister">Forget
                                Password?</a> -->
                            <!-- <el-input type="password" :key="passwordType" ref="password" v-model="loginForm.password"
                  autocomplete="off"> -->
                            <el-input :type="passwordType" ref="password" v-model="loginForm.password" autocomplete="off"
                                placeholder="请输入密码">
                                <i class="el-icon-close el-input__icon" slot="suffix" @click="clearInput"></i>
                                <i class="el-icon-view el-input__icon" slot="suffix" @click="showPwd">
                                </i>
                            </el-input>
                        </el-form-item>
                        <div>
                            <el-button type="primary" @click.native.prevent="handleRegister">
                                <span v-if="loading"><i class="el-icon-loading"
                                        style="margin-right: 10px;"></i>正在注册中...</span>
                                <span v-else>注册</span>
                            </el-button>
                        </div>
                        <!-- <div class="tips">
                <span style="margin-right:20px;">如果您还没有账号请先 <span style="color:#409EFF;cursor:pointer"
                    @click="register">注册</span></span>
              </div> -->
                        <p class="auth-link-mobile">Already a member?
                            <a href="">Sign in now</a>
                        </p>
                    </el-form>
                </div>
            </template>

        </div>
    </div>
</template>
  
<script>
// 引入去除空格工具
// import { validUsername } from '@/utils/validate'

export default {
    name: 'register',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('用户名不能为空！'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码最少为6位字符！'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                password: ''
            },
            // 登录规则
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
        }
    },
    methods: {
        // ToRegister() { this.$router.push("/register") },
        ToLogin() { this.$router.push("/login") },
        clearInput() { this.loginForm.password = "" },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = 'text'
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        // 注册业务
        handleRegister() {
            this.$refs.loginForm.validate((valid) => {
                // 如果符合验证规则
                if (valid) {
                    this.loading = true
                    // const param = new URLSearchParams();
                    // param.append("userName", this.loginForm.username);
                    // param.append("userPass", this.loginForm.password);
                    const param = {
                        "userName": this.loginForm.username,
                        "userPass": this.loginForm.password
                    }
                    setTimeout(() => {
                        // this.$store.dispatch('user/login', this.loginForm).then(() => {
                        this.$axios.post('/home/user/register', param).then((response) => {
                            if (response.data.code == "200") {
                                this.$router.push({ path: '/login' })
                                this.loading = false
                            }
                        }).catch(() => {
                            this.loading = false
                        })
                    }, 3000)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
    }
}
</script>
  
<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: transparent;
}

@media (min-width: 960px) {
    .left-container header {
        padding: 64px 64px 30px;
    }
}

@media (min-width: 960px) {
    .left-container {
        width: 40%;
        height: 100%;
        background-color: #c3e3e9;
        // display: none;
    }
}

@media (min-width: 960px) {
    .logo {
        display: block;
        margin-bottom: 30px;
    }
}

// 注意：css顺序执行
.left-container header h1 {
    display: none;
    color: inherit;
    font: bold 32px/38px "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

@media (min-width: 960px) {
    .left-container header h1 {
        display: block;
        padding-right: 30px;
    }
}

@media (max-height:850px) {
    .left-container header h1 {
        font-size: 25px;
        line-height: 30px;
    }
}

.right-container {
    width: 60%;
    height: 100%;
    background-color: #fff;
    z-index: 1;
}

.right-nav {
    display: none;
    position: relative
}

@media (min-width: 960px) {
    .right-nav {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-positive: 0;
        flex-grow: 0;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding: 30px 30px 0
    }

    .right-nav p {
        -ms-flex-positive: 1;
        flex-grow: 1;
        margin: 0;
        text-align: right;
    }
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container-right {
    display: flex;
    align-items: center;
    min-height: 80%;
    width: 100%;
    overflow: hidden;
    // background: url(~@/assets/bg0.jpg);
    background-size: 100% 100%;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 0 35px 0;
        margin: 0 auto;
        overflow: hidden;

    }

    .tips {
        font-size: 18px;
        text-align: center;
        color: #000;
        margin-bottom: 10px;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 30px;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: 500;
        }
    }
}

.auth-link-mobile {
    text-align: center
}

@media (min-width: 960px) {
    .auth-link-mobile {
        display: none
    }
}

.el-button {
    border-radius: 8px;
    display: block;
    width: 100%;
    margin-top: 22px;
}

@media (min-width: 960px) {
    .el-button {
        max-width: 200px;
    }
}

.el-input__inner {
    border-radius: 8px;
}
</style>
  