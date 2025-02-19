<template>
    <div>
        <NavBar />
        <el-container class="layout">
            <!-- main主要内容 -->
            <el-container class="RmainBody" style="margin-top: 20px;z-index: 1;">
                <el-card class="box-card" style="width: 100%;">
                    <div slot="header" class="clearfix" v-if="comshow">
                        <el-avatar :size="30" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                            :fit="fit" style="float: left; margin-top: 5px;">
                        </el-avatar>
                        <el-input v-model="commentInfoInput" placeholder="请输入内容"
                            style="width:85%;margin-left: 10px;"></el-input>
                        <el-button type="success" style="float: right;">发表评论</el-button>
                    </div>
                    <div slot="header" class="clearfix" v-if="!comshow">
                        <div style="text-align: center; font-size: 2rem;font-weight: 400; letter-spacing: 5px;">
                            <span style="color: red;">❤</span><span>留言板</span><span style="color: red;">❤</span>
                            <el-divider></el-divider>
                        </div>
                        <div class="lyt">
                            <div style="display: flex;align-items: center;" v-if="isLogin">
                                <div style="display: flex; float: left; width: 88%;align-items: center;">
                                    <div style="">
                                        <el-avatar :src="userInfo.userAvatar == null ? avatarImg : userInfo.userAvatar"
                                            :fit="fit">
                                        </el-avatar>
                                    </div>
                                    <div style="margin-left: 5px;width: 100%;">
                                        <el-input class="pl_input_main" v-model="articleInfoCominput"
                                            placeholder="请输入内容"></el-input>
                                    </div>
                                </div>
                                <div style="float: right;width: 12%;text-align: center;">
                                    <el-button type="success"
                                        @click="sendCommentInfo(articleDetails.articleId)">发表评论</el-button>
                                </div>
                            </div>
                            <div v-else>
                                <span>您还未登录,请先 <el-button @click="toLogin">登录</el-button> 后即可查看和发表评论!</span>
                            </div>
                        </div>
                    </div>
                    <!-- 评论信息 -->
                    <div class="comment-info" v-if="isLogin">
                        <div class="comment-info-list">
                            <!-- 评论信息 -->
                            <ul class="comment-list" v-for="(comm, indexi) in CommentInfos" :key="indexi"
                                style="padding-left: 10px;">
                                <!-- 根级评论 -->

                                <div class="text item" style="background-color: antiquewhite; padding: 5px;">
                                    <div style="display: block;height: 50px;font-size: 15px;">
                                        <el-avatar :size="40"
                                            :src="comm.commentAuthorAvatar == '' ? picUrl : comm.commentAuthorAvatar"
                                            style="float: left;">
                                        </el-avatar>
                                        <span style="margin-left: 20px;margin-right: 20px;font-weight: 800;">
                                            {{ comm.commentAuthorName }}
                                            <el-tag size="mini" type="danger" v-if="comm.commentRole == 1"
                                                style="margin-left: 5px;">作者</el-tag>
                                        </span>

                                        <div style="float: right;cursor: pointer;">
                                            <i class="el-icon-delete"></i>
                                            <span style="margin-left: 3px;" @click="deleteComment(comm)">删除</span>
                                            <i class="el-icon-chat-round" style="margin-left: 10px;"></i>
                                            <span
                                                @click="replyThisComm(indexi, comm.commentId, comm.commentAuthorName, 0)">回复</span>
                                        </div>
                                        <span>ip: github</span><br>
                                        <span style="margin-left: 20px;">{{ comm.commentCreateTime }}</span>
                                    </div>
                                    <div style="margin-left: 50px;line-height: 1.5;">
                                        <span>{{ comm.commentContent }}</span>
                                    </div>
                                </div>

                                <!-- 评论回复输入框 -->
                                <div :class="'reply-comment-isShow-' + indexi" v-if="replyMap[indexi]"
                                    style="padding-top: 2px;padding-bottom: 2px;">
                                    <el-avatar :size="30" :src="avatarImg" :fit="fit" style="float: left; margin-top: 5px;">
                                    </el-avatar>
                                    <el-input v-model="articleReplyCominput" placeholder="请输入内容"
                                        style="width:70%;margin-left: 10px;"></el-input>
                                    <el-button type="success" @click="SendReplyComm(indexi)">发表评论</el-button>
                                    <el-button type="success" @click="cancelReply(indexi)">取消</el-button>
                                </div>

                                <!-- reply 评论子目录 -->
                                <li class="reply-list" style="list-style: none;">
                                    <ul class="reply-comment-list">
                                        <!-- 子组件递归实现 -->
                                        <reply :childComments="comm.reply" :parentComment="comm"
                                            :rootParentId="comm.commentId" :userInfo="userInfo" v-if="comm.reply != null">
                                        </reply>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-card>
            </el-container>
            <!-- footer -->
            <el-footer class="footer">
                <div style="" align="center">
                    <p class="text-center text-muted">Copyright © 2023 hjt All right reserved</p>
                </div>
            </el-footer>
        </el-container>

        <!-- 处理登录 -->
        <el-dialog title="登录" :visible.sync="dialogFormVisible" center>
            <el-form>
                <el-form-item prop="username">
                    <span style="font-weight: 600;">
                        UserName or Email Address
                    </span>
                    <el-input id="inputAccount" ref="username" v-model="username" autocomplete="off" clearable></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <span style="font-weight: 600;">
                        Password
                    </span>
                    <el-input type="password" ref="password" v-model="password" autocomplete="off"
                        @keyup.enter.native="handleLogin" clearable show-password>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleLogin">登 录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import NavBar from '@/components/navbar/navbar'
export default {
    name: 'commentinfo',
    components: {
        NavBar
    },
    data() {
        return {
            comshow: false,
            fit: "cover",
            commentInfoInput: '', //评论框内容

            userInfo: {}, //登录用户信息
            isLogin: false, //用户是否已经登录
            avatarImg: require('../../../static/img/avatar.jpg'),

            dialogFormVisible: false, //登录弹出框
            username: '',
            password: '',
            login_status: '',

            CommentInfos: [], //评论信息
        }
    },
    mounted() {
        this.getLoginUserInfo();
    },
    methods: {
        getLoginUserInfo() {
            const user = this.$store.getters.getUser;
            if (user != null) {
                this.userInfo = user;
                this.isLogin = true;
            }
        },

        toLogin() {
            this.dialogFormVisible = true;
        },
        handleLogin() {
            const text = document.getElementById("inputAccount");
            if (text.valueOf("@") == -1) {
                this.login_status = "1";
            } else { this.login_status = "0" }
            let _this = this;
            let status = _this.login_status;
            let verCode = "1";
            const param = new URLSearchParams();
            param.append("userName", _this.username);
            param.append("userPass", _this.password);
            param.append("status", status);
            param.append("verCode", verCode);
            setTimeout(() => {
                this.$axios.post('/admin/user/login', param).then(function (response) {
                    if (response.data.code != "200") {
                        swal(response.data.msg.toString(), { icon: "warning", });
                    }
                    if (response.data.code == "200") {
                        const token = response.data.data.token;
                        const userInfo = response.data.data.userInfo;
                        _this.$store.commit("SET_TOKEN", token);
                        _this.$store.commit("SET_USERINFO", userInfo);

                        _this.$message({
                            message: '登录成功!',
                            type: 'success'
                        });
                        _this.dialogFormVisible = false;
                        _this.$router.go(0);//刷新页面
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }, 3000)
        },
    }
}
</script>

<style scoped>
.layout {
    height: 100%;
    /* margin-left: 100px;
    margin-right: 100px; */
}

@media(min-width: 960px) {
    .layout {
        height: 100%;
        margin-left: 100px;
        margin-right: 100px;
    }
}
</style>