<!-- 文章详情 -->
<template>
    <div>
        <NavBar />

        <el-container class="layout">
            <!-- main主要内容 -->
            <el-container class="detail-mainBody" style="margin-top: 20px;">
                <el-card class="box-card" style="width: 100%;">
                    <!-- title -->
                    <div style="font-size: x-large; font-weight: 800">{{ articleDetails.articleTitle }}</div>
                    <!-- author info -->
                    <div class="article-info-author"
                        style="background-color: #f8f8f8;margin-top: 10px;margin-bottom: 10px;height: 70px;padding: 10px 30px;font-size: 13px;">
                        <span>{{ articleDetails.user.userName }}</span>
                        <span style="margin-left: 20px;margin-right: 20px;">于 {{ articleDetails.articleCreateTime }}
                            发布</span>
                        <span>阅读 {{ articleDetails.articleViewCount }}</span>
                        <span style="float: right; color: red;" v-if="isOwnArt">编辑</span><br /><br />
                        <span style="margin-right: 20px;">
                            文章分类：
                            <el-tag v-for="(artFl, index) in articleCategorys" :key="artFl.categoryId"
                                style="margin-right: 5px;">
                                {{ artFl.category.categoryName }}</el-tag>
                        </span>
                        <span>文章标签：
                            <el-tag v-for="(artTag, index) in articleTags" :key="artTag.tagId" style="margin-right: 5px;">
                                {{ artTag.tag.tagName }}</el-tag>
                            <!-- <el-tag>java</el-tag>
                            <el-tag>人工智能</el-tag> -->
                        </span>
                    </div>
                    <!-- 文章内容 -->
                    <div class="article-info-content" style="padding: 10px;">
                        <!-- <p style="line-height: 2;"></p> -->
                        <div class="markdown-body" v-html="articleDetails.articleContent"></div>
                    </div>
                </el-card>
            </el-container>
            <!-- artilce comment -->
            <el-card class="box-card" style="width: 100%;margin-top: 10px;">
                <div slot="header" class="clearfix">
                    <el-avatar :size="30" :src="avatarImg" :fit="fit" style="float: left; margin-top: 5px;">
                    </el-avatar>
                    <el-input v-model="articleInfoCominput" placeholder="请输入内容"
                        style="width:80%;margin-left: 10px;"></el-input>
                    <el-button type="success" @click="sendCommentInfo">发表评论</el-button>
                </div>
                <div class="comment-info" v-for="(artcomm, indexi) in articleComments" :key="indexi">
                    <!-- 评论信息 -->
                    <div class="text item" style="margin-bottom: 20px;" v-if="artcomm.commentPid == 0">
                        <div style="display: block;height: 50px;font-size: 10px;">
                            <el-avatar :size="40" :src="artcomm.commentAuthorAvatar" :fit="fit" style="float: left;">
                            </el-avatar>
                            <span style="margin-left: 20px;margin-right: 20px;"> {{ artcomm.commentAuthorName }} </span>
                            <span style="float: right;cursor: pointer;"
                                @click="replyThisComm(indexi, artcomm.commentId, artcomm.commentAuthorName, 0)">回复</span>
                            <span>ip: </span><br>
                            <span style="margin-left: 20px;">{{ artcomm.commentCreateTime }}</span>
                        </div>
                        <div>
                            <span style="margin-left: 50px;">{{ artcomm.commentContent }}</span>
                        </div>
                    </div>

                    <!-- reply -->
                    <div class="text item reply-box" style="margin-left: 30px; background:;padding: 12px;"
                        v-for="(reply, indexj) in articleComments" :key="indexj"
                        v-if="artcomm.commentId == reply.commentPid">
                        <div style="display: block;height: 50px;font-size: 13px;">
                            <el-avatar :size="40" :src="reply.commentAuthorAvatar" :fit="fit" style="float: left;">
                            </el-avatar>
                            <span style="margin-left: 20px;margin-right: 20px;">{{ reply.commentAuthorName }}</span>
                            <span style="float: right;cursor: pointer;"
                                @click="replyThisComm(indexi, artcomm.commentId, artcomm.commentAuthorName, 1)">回复</span>
                            <span>ip:kunming</span><br>
                            <span style="margin-left: 20px;">{{ reply.commentCreateTime }}</span>
                        </div>
                        <div>
                            <span style="margin-left: 50px;">回复
                                {{ reply.commentPname }}:{{ reply.commentContent }}</span>
                        </div>
                    </div>
                    <!-- 评论回复输入框 -->
                    <div :class="'reply-comment-isShow-' + indexi" v-if="replyMap[indexi]">
                        <el-avatar :size="30" :src="avatarImg" :fit="fit" style="float: left; margin-top: 5px;">
                        </el-avatar>
                        <el-input v-model="articleReplyCominput" placeholder="请输入内容"
                            style="width:60%;margin-left: 10px;"></el-input>
                        <el-button type="success" @click="SendReplyComm(indexi)">发表评论</el-button>
                        <el-button type="success" @click="cancelReply(indexi)">取消</el-button>
                    </div>
                    <!-- <div :class="'reply-comment-isShow-' + indexj" v-if="replyMap[indexj]">
                        <el-avatar :size="30" :src="avatarImg" :fit="fit" style="float: left; margin-top: 5px;">
                        </el-avatar>
                        <el-input v-model="articleReplyCominput" placeholder="请输入内容"
                            style="width:60%;margin-left: 10px;"></el-input>
                        <el-button type="success" @click="SendChildReplyComm(indexi, indexj)">发表评论</el-button>
                    </div> -->
                </div>
            </el-card>
            <!-- footer -->
            <el-footer class=" footer">
                <div style="" align="center">
                    <p class="text-center text-muted">Copyright © 2023 hjt All right reserved</p>
                </div>
            </el-footer>
        </el-container>

    </div>
</template>
<script>
import 'github-markdown-css'
import NavBar from '@/components/navbar/navbar.vue'
import swal from 'sweetalert';
export default {
    name: 'articledetails',
    components: {
        NavBar
    },
    data() {
        return {
            avatarImg: require("../../styles/pic/avatar.jpg"),
            fit: 'cover',
            articleInfoCominput: '',  //文章评论 输入框内容
            articleReplyCominput: '',  //评论回复输入框内容
            // 是否是登陆者的文章
            isOwnArt: false,
            articleDetails: {
                articleTitle: 'spring',
                user: {
                    userName: '999',
                }
            },
            articleTags: [], //文章标签
            articleCategorys: [],  //文章类别
            articleComments: [],   //文章评论

            // replyInfo: false,  //控制评论回复 显示与隐藏
            replyMap: [],  //控制第几个回复输入框 显示
            // replyInputShow: false,  //回复 输入框

            userInfo: {},
        };
    },
    mounted() {
        const articleId = this.$route.query.articleId;
        this.getArticleDetails(articleId);
        this.getLoginUserInfo();
    },
    methods: {
        getLoginUserInfo() {
            const user = this.$store.getters.getUser;
            if (user != '') {
                // this.IsLogined = true;
                this.userInfo = user;
                this.avatarImg = user.userAvatar;
            }
        },
        getArticleDetails(articleId) {
            console.log("artId=", articleId)
            const _this = this;
            var param = { articleId: articleId }
            // 获取具体某一篇文章信息，作者信息   标签信息、分类、评论
            this.$axios.post('/article/getArtOneDet', param).then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                    //文章信息
                    _this.articleDetails = res.data.data.article;
                    _this.isOwnArt = (res.data.data.article.user.userUid === _this.$store.getters.getUser.userUid)
                    //文章标签信息
                    _this.articleTags = res.data.data.articleTagRefs;
                    //文章分类信息
                    _this.articleCategorys = res.data.data.articleCategoryRefs;
                    //文章评论信息
                    _this.articleComments = res.data.data.comments;
                } else { swal(res.data.msg, { icon: "error" }) }
            }).catch((err) => {
                console.log(err)
            })
        },
        //文章评论
        sendCommentInfo() {

        },
        //回复文章评论
        replyThisComm(indexi, commentId, commentAuthorName, num) {
            console.log("回复文章评论", indexi, commentId, commentAuthorName, num);
            // if (num == 0) {
            this.$set(this.replyMap, indexi, true)
            console.log("显示回复输入框:", this.replyMap[indexi]);
            // }
        },
        // 发表回复评论 
        SendReplyComm(indexi, indexj) {
            // 在这里执行评论回复插入数据库，然后返回成功，则隐藏输入框
            // 如果返回失败，则弹窗提示评论失败，不隐藏评论框
            console.log("发表评论:", indexi, indexj)
        },

        //子评论 回复
        // replyThisChildComm() { },
        // SendChildReplyComm() {

        // },

        //取消回复
        cancelReply(indexi, indexj) {
            // if (index !== 0) {
            this.$set(this.replyMap, indexi, false)
            // }
            console.log("取消回复:", indexi, indexj);
            //this.showFlag = false;
        },

        //时间转换
        dateStr(date) {
            //获取js 时间戳
            var time = new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time = parseInt((time - date) / 1000);
            //存储转换值 
            var s;
            if (time < 60 * 10) {//十分钟内
                return '刚刚';
            } else if ((time < 60 * 60) && (time >= 60 * 10)) {
                //超过十分钟少于1小时
                s = Math.floor(time / 60);
                return s + "分钟前";
            } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
                //超过1小时少于24小时
                s = Math.floor(time / 60 / 60);
                return s + "小时前";
            } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
                //超过1天少于30天内
                s = Math.floor(time / 60 / 60 / 24);
                return s + "天前";
            } else {
                //超过30天ddd
                var date = new Date(parseInt(date));
                return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
            }
        }
    }
}
</script>
<style scoped>
.layout {
    height: 100%;
    /* width: 100%; */
}

@media (min-width: 960px) {
    .layout {
        height: 100%;
        margin-left: 100px;
        margin-right: 100px;
    }
}

.el-container .el-card {
    z-index: 1;
}
</style>