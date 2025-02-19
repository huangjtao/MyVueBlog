<!-- 文章详情 -->

<template>
    <div @scroll="handleScroll">
        <NavBar />

        <el-container class="layout">
            <!-- main主要内容 -->
            <el-container class="detail-mainBody" style="margin-top: 20px;">
                <el-card class="box-card" style="width: 100%;">
                    <!-- title -->
                    <div style="font-size: x-large; font-weight: 800">{{ articleDetails.articleTitle }}</div>
                    <!-- author info -->
                    <div class="article-info-author"
                        style="background-color: #f8f8f8;margin-top: 10px;margin-bottom: 10px;height: 70px;padding: 10px 30px 10px 50px;font-size: 13px;">
                        <div style="display: flex;">
                            <div>
                                <el-tag type="danger" v-if="articleDetails.articleType == 1"
                                    style="margin-left: -50px;">原创</el-tag>
                                <el-tag type="danger" v-if="articleDetails.articleType == 2"
                                    style="margin-left: -50px;">转载</el-tag>
                            </div>
                            <div style="width: 100%;">
                                <div style="display: flex;align-items: center;">
                                    <div style="width: 60%;">
                                        <span>{{ articleDetails.user.userName }}</span>
                                        <span style="margin-left: 20px;margin-right: 20px;">文章于
                                            {{ articleDetails.articleCreateTime }}
                                            发布</span>
                                        <span>阅读 {{ articleDetails.articleViewCount }}</span>
                                    </div>
                                    <div style="width:40%;">
                                        <span style="float: right; color: red; cursor: pointer;" v-if="isOwnArt"
                                            @click="toEditArticle(articleDetails.articleId)">编辑</span>
                                    </div>
                                </div>
                                <div style="margin-top: 15px;">
                                    <span style="margin-right: 20px;">
                                        文章分类：
                                        <el-tag v-for="(artFl, index) in articleCategorys" :key="artFl.categoryId"
                                            style="margin-right: 5px;">
                                            {{ artFl.category.categoryName }}</el-tag>
                                    </span>
                                    <span>文章标签：
                                        <el-tag v-for="(artTag, index) in articleTags" :key="artTag.tagId"
                                            style="margin-right: 5px;">
                                            {{ artTag.tag.tagName }}</el-tag>
                                        <!-- <el-tag>java</el-tag>
                            <el-tag>人工智能</el-tag> -->
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 文章内容 -->
                    <div class="article-info-content" style="padding: 10px;">
                        <!-- <p style="line-height: 2;"></p> -->
                        <div class="markdown-body" v-html="articleDetails.articleContent"></div>
                    </div>
                </el-card>
            </el-container>
            <el-card class="box-card">
                <div style="display: flex;align-items: center;">
                    <div style="display: flex;align-items: center; float: left; width: 40%;">
                        <div style="float: left;margin-right: 10px;font-weight: 600;">
                            <a style="display: flex;align-items: center;">
                                <img :src="avatarImg"
                                    style="width: 32px;width: 32px;border-radius: 32px;border: 1px solid #f5f6f7;margin-right:8px;" />
                                <span style="overflow: hidden;">{{ articleDetails.user.userName }}</span>
                            </a>
                        </div>
                        <!-- <a target="_blank" href="https://icons8.com/icon/CBqLLZiVTJoG/%E5%8F%8D%E6%84%9F">反感</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> -->
                        <div style="float:left; position: relative;">
                            <el-button size="small" round>关注</el-button>
                        </div>
                    </div>
                    <div style="float: right;width: 60%;display: flex;justify-content: right;">
                        <ul style="list-style-type: none;">
                            <li style="float: left;margin-right: 20px;">
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;"
                                    @click="updateUserLikeStatus(0)" v-if="currArticleLikeStatus == 1">
                                    <img src="../../assets/iconLike.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <span>{{ articleDetails.articleLikeCount }}</span>
                                </a>
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;"
                                    @click="updateUserLikeStatus(1)" v-else>
                                    <img src="../../assets/iconLikeBlack.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <span>{{ articleDetails.articleLikeCount }}</span>
                                </a>
                            </li>
                            <li style="float: left;margin-right: 20px;">
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;"
                                    @click="updateUnLikeStatus(0)" v-if="articleUnLike">
                                    <img src="../../assets/iconUnLike.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <span>1</span>
                                </a>
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;"
                                    @click="updateUnLikeStatus(1)" v-else>
                                    <img src="../../assets/iconUnLikeBlack.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <!-- <span></span> -->
                                </a>
                            </li>
                            <li style="float: left;margin-right: 20px;">
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;"
                                    @click="updateUserStarStatus(0)" v-if="currArticleStarStatus == 1">
                                    <img src="../../assets/iconStar.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <span>{{ articleDetails.articleStarCount }}</span>
                                </a>
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;"
                                    @click="updateUserStarStatus(1)" v-else>
                                    <img src="../../assets/iconStarBlack.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <span>{{ articleDetails.articleStarCount }}</span>
                                </a>
                            </li>
                            <li style="float: left;margin-right: 20px;">
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;"
                                    v-if="articleDetails.articleCommentCount > 0">
                                    <img src="../../assets/iconComment.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                    <span>{{ articleDetails.articleCommentCount }}</span>
                                </a>
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;" v-else>
                                    <img src="../../assets/iconCommentBlack.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                </a>
                            </li>
                            <li style="float: left;margin-right: 20px;">
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;">
                                    <img src="../../assets/iconShareBlack.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                </a>
                            </li>
                            <li style="float: left;margin-right: 20px;">
                                <a style="display: flex;align-items: center;flex-wrap: nowrap;cursor: pointer;">
                                    <img src="../../assets/iconMoney.png"
                                        style="height: 24px;width: 24px;margin-right: 4px;" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-card>
            <!-- artilce comment -->
            <el-card class="box-card" style="width: 100%;margin-top: 10px;">
                <div slot="header" class="clearfix">
                    <div style="display: flex;" v-if="isLogin">
                        <div style="float: left; width: 88%;">
                            <el-avatar :size="30" :src="avatarImg" :fit="fit" style="float: left; margin-top: 5px;">
                            </el-avatar>
                            <el-input class="pl_input_main" v-model="articleInfoCominput"
                                placeholder="请输入内容"></el-input>
                        </div>
                        <div style="float: right;width: 12%;text-align: center;">
                            <el-button type="success"
                                @click="sendCommentInfo(articleDetails.articleId)">发表评论</el-button>
                        </div>
                    </div>
                    <div v-else>
                        <span>您还未登录,请先 <el-button size="mini" @click="toLogin">登录</el-button> 后即可查看和发表评论!</span>
                    </div>
                </div>
                <div class="comment-info" v-if="isLogin">
                    <div class="comment-info-list">
                        <!-- 评论信息 -->
                        <ul class="comment-list" v-for="(artcomm, indexi) in articleComments" :key="indexi"
                            style="padding-left: 10px;">
                            <!-- 根级评论 -->

                            <div class="text item" style="background-color: antiquewhite; padding: 5px;">
                                <div style="display: block;height: 50px;font-size: 15px;">
                                    <el-avatar :size="40"
                                        :src="artcomm.commentAuthorAvatar == '' ? picUrl : artcomm.commentAuthorAvatar"
                                        style="float: left;">
                                    </el-avatar>
                                    <span style="margin-left: 20px;margin-right: 20px;font-weight: 800;">
                                        {{ artcomm.commentAuthorName }}
                                        <el-tag size="mini" type="danger" v-if="artcomm.commentRole == 1"
                                            style="margin-left: 5px;">作者</el-tag>
                                    </span>

                                    <div style="float: right;cursor: pointer;">
                                        <i class="el-icon-delete"></i>
                                        <span style="margin-left: 3px;" @click="deleteComment(artcomm)">删除</span>
                                        <i class="el-icon-chat-round" style="margin-left: 10px;"></i>
                                        <span
                                            @click="replyThisComm(indexi, artcomm.commentId, artcomm.commentAuthorName, 0)">回复</span>
                                    </div>
                                    <span>ip: github</span><br>
                                    <span style="margin-left: 20px;">{{ artcomm.commentCreateTime }}</span>
                                </div>
                                <div style="margin-left: 50px;line-height: 1.5;">
                                    <span>{{ artcomm.commentContent }}</span>
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
                                    <reply :childComments="artcomm.reply" :parentComment="artcomm"
                                        :rootParentId="artcomm.commentId" :userInfo="userInfo"
                                        v-if="artcomm.reply != null">
                                    </reply>
                                </ul>
                            </li>
                            <!-- <div class="text item reply-box" style="margin-left: 30px; background:;padding: 12px;"
                                v-for="(reply, indexj) in articleComments" :key="indexj"
                                v-if="artcomm.commentId == reply.commentPid">
                                <div style="display: block;height: 50px;font-size: 13px;">
                                    <el-avatar :size="40" :src="reply.commentAuthorAvatar" :fit="fit" style="float: left;">
                                    </el-avatar>
                                    <span style="margin-left: 20px;margin-right: 20px;">{{ reply.commentAuthorName }}</span>
                                    <span style="float: right;cursor: pointer;"
                                        @click="replyThisComm(indexi, reply.commentId, reply.commentAuthorName, 1)">回复</span>
                                    <span>ip:kunming</span><br>
                                    <span style="margin-left: 20px;">{{ reply.commentCreateTime }}</span>
                                </div>
                                <div>
                                    <span style="margin-left: 50px;">回复
                                        {{ reply.commentPname }}:{{ reply.commentContent }}</span>
                                </div>
                            </div> -->

                            <!-- <div :class="'reply-comment-isShow-' + indexj" v-if="replyMap[indexj]">
                        <el-avatar :size="30" :src="avatarImg" :fit="fit" style="float: left; margin-top: 5px;">
                        </el-avatar>
                        <el-input v-model="articleReplyCominput" placeholder="请输入内容"
                            style="width:60%;margin-left: 10px;"></el-input>
                        <el-button type="success" @click="SendChildReplyComm(indexi, indexj)">发表评论</el-button>
                        </div> -->
                        </ul>
                    </div>
                </div>
            </el-card>
            <!-- footer -->
            <el-footer class=" footer">
                <div style="" align="center">
                    <p class="text-center text-muted">Copyright © 2023 hjt All right reserved</p>
                </div>
            </el-footer>
        </el-container>

        <el-dialog title="登录" :visible.sync="dialogFormVisible" center>
            <el-form>
                <el-form-item prop="username">
                    <span style="font-weight: 600;">
                        UserName or Email Address
                    </span>
                    <el-input id="inputAccount" ref="username" v-model="username" autocomplete="off"
                        clearable></el-input>
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
import 'github-markdown-css'
import 'mavon-editor/dist/css/index.css'
import NavBar from '@/components/navbar/navbar.vue'
import reply from '@/views/articleComment/childComment.vue'
import swal from 'sweetalert';
export default {
    name: 'articledetails',
    components: {
        NavBar,
        reply
    },
    data() {
        return {
            articleId: '', //文章ID
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

            artMainComment: {}, //主评论
            artMainReplyComment: {}, //主评论回复

            userInfo: {}, //登录用户信息
            isLogin: false, //用户是否已经登录
            currArticleViewCount: '',
            ArticleLikesStarInfo: {},//点赞收藏信息
            currArticleLikeStatus: 0, //是否点赞
            currArticleStarStatus: 0,//是否收藏

            likeCount: '',//点赞数
            starCount: '',//收藏数
            commentCount: '',//评论数

            articleUnLike: false,

            dialogFormVisible: false, //登录弹出框
            username: '',
            password: '',
            login_status: '',
        };
    },

    mounted() {
        const articleId = this.$route.query.articleId;
        this.articleId = articleId;
        this.getArticleDetails(articleId);
        this.getLoginUserInfo();

        //监听页面滚动条事件
        window.addEventListener('scroll', this.handleScroll);
    },

    provide() {//父组件，设置provide,可将变量，函数传递给其子孙组件中调用/使用
        return {
            parentMethod: this.getArticleDetails
        };
    },

    methods: {
        getLoginUserInfo() {
            const user = this.$store.getters.getUser;
            if (user != null) {
                this.userInfo = user;
                this.avatarImg = user.userAvatar;
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
        getArticleDetails(articleId) {
            console.log("artId=", articleId)
            //防止子孙调用刷新数据时article值为空
            if (articleId == '' || articleId == undefined) { articleId = this.articleId; }
            if (articleId != '' && articleId != undefined) {
                const _this = this;
                var param = { articleId: articleId }
                // 获取具体某一篇文章信息，作者信息   标签信息、分类、评论
                this.$axios.post('/article/getArtOneDet', param).then((res) => {
                    console.log(res);
                    if (res.data.code == 200) {
                        //文章信息
                        _this.articleDetails = res.data.data.article;
                        _this.isOwnArt = (res.data.data.article.user.userUid == _this.userInfo.userUid)
                        //文章标签信息
                        _this.articleTags = res.data.data.articleTagRefs;
                        //文章分类信息
                        _this.articleCategorys = res.data.data.articleCategoryRefs;
                        //文章评论信息
                        _this.articleComments = res.data.data.comments;
                        _this.currArticleViewCount = res.data.data.article.articleViewCount;

                        //查询是否收藏，点赞
                        this.getArticleLikeStarInfo(articleId);
                        //更新浏览次数
                        const skipFlag = window.sessionStorage.getItem("skipFlag");
                        //页面跳转到详情页，skipFlag==1 浏览更新一次，防止刷新（重载）页面多次更新
                        if (skipFlag == 1) {
                            this.updateArticleViewCount(articleId);
                            //更新完成之后skipFlag置空
                            window.sessionStorage.setItem("skipFlag", "");
                        }
                    }
                    else { swal(res.data.msg, { icon: "error" }) }
                }).catch((err) => {
                    console.log(err)
                })
            }

        },
        //查询文章收藏，点赞信息
        getArticleLikeStarInfo(articleId) {
            const _this = this;
            if (Object.values(this.userInfo).length > 0) {
                const param = {
                    articleId: articleId,
                    userUid: this.userInfo.userUid
                }
                _this.$axios.post('/article-likes-star-info/getArtLSByUA', param).then((res) => {
                    console.log(res)
                    if (res.status == 200 && res.data.length > 0) {
                        _this.ArticleLikesStarInfo = res.data[0];
                        _this.currArticleLikeStatus = res.data[0].articleIslike;
                        _this.currArticleStarStatus = res.data[0].articleIsstar;
                    }
                    else {
                        if (res.data.length == 0) {
                            console.log("这篇文章没有点赞信息!")
                        } else {
                            console.log("获取点赞信息出错！")
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        //更新文章浏览次数
        updateArticleViewCount(articleId) {
            const _this = this;
            const artViewCount = _this.articleDetails.articleViewCount;
            _this.currArticleViewCount = artViewCount;
            const param = {
                articleId: articleId,
                articleViewCount: _this.currArticleViewCount + 1
            }
            _this.$axios.post('/article/updateViewCount', param).then((res) => {
                if (res.data.code == 200) {
                    console.log('浏览+1');
                    this.getArticleDetails(this.articleId);
                }
                else { console.log("浏览量更新出错！"); };
            }).catch((err) => { console.log(err); })
        },

        //更新用户对这篇文章的点赞状态
        //likeStatus:1  点赞    0 取消点赞
        updateUserLikeStatus(likeStatus) {
            const _this = this;
            if (Object.values(this.userInfo).length > 0) {
                const param = {
                    articleId: _this.articleDetails.articleId,
                    userUid: _this.userInfo.userUid,
                    articleIslike: likeStatus
                }
                _this.$axios.post('/article-likes-star-info/aOruArtLInfo', param).then((res) => {
                    if (res.data.code == 200) {
                        if (likeStatus == 1) {
                            this.$message({
                                message: '点赞成功!你的喜欢就是我们前进的动力!',
                                type: 'success'
                            });

                            //点赞+1
                            this.updateArticleLikeCount(_this.articleDetails.articleId, 1);
                        }
                        else {
                            //点赞-1
                            this.updateArticleLikeCount(_this.articleDetails.articleId, 0);
                        }
                    } else { console.log("点赞失败!"); }
                }).catch((err) => { console.log(err); })
            }
            else {
                _this.$message({
                    message: '未登录,不能进行点赞!',
                    type: 'warning'
                });
            }
        },

        //更新用户对这篇文章的收藏状态
        //starStatus:1  点赞    0 取消点赞
        updateUserStarStatus(starStatus) {
            const _this = this;
            if (Object.values(this.userInfo).length > 0) {
                const param = {
                    articleId: _this.articleDetails.articleId,
                    userUid: _this.userInfo.userUid,
                    articleIsstar: starStatus
                }
                _this.$axios.post('/article-likes-star-info/aOruArtSInfo', param).then((res) => {
                    if (res.data.code == 200) {
                        if (starStatus == 1) {
                            this.$message({
                                message: '收藏成功!希望这篇文章可以帮到你!',
                                type: 'success'
                            });
                            //收藏 +1
                            this.updateArticleStarCount(_this.articleDetails.articleId, 1)
                        }
                        else {//收藏 -1
                            this.updateArticleStarCount(_this.articleDetails.articleId, 0)
                        }
                    } else { console.log("收藏失败!"); }
                }).catch((err) => { console.log(err); })
            }
            else {
                _this.$message({
                    message: '未登录,不可以收藏文章!',
                    type: 'warning'
                })
            }
        },

        //likeflag 1:add like  0:canel like
        updateArticleLikeCount(articleId, likeflag) {
            const _this = this;
            const artLikeCount = _this.articleDetails.articleLikeCount;
            _this.likeCount = artLikeCount;
            if (likeflag == 1) {
                _this.likeCount += 1;
            } else { _this.likeCount -= 1; }
            const param = {
                articleId: articleId,
                articleLikeCount: _this.likeCount
            }
            _this.$axios.post('/article/updateLikeCount', param).then((res) => {
                if (res.data.code == 200) {
                    console.log("likecount uppdate!")
                    this.getArticleDetails(this.articleId);
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        //likeflag 1:add star  0:canel star
        updateArticleStarCount(articleId, starflag) {
            const _this = this;
            const ArtStarCount = _this.articleDetails.articleStarCount;
            _this.starCount = ArtStarCount;
            if (starflag == 1) {
                _this.starCount += 1;
            } else { _this.starCount -= 1; }
            const param = {
                articleId: articleId,
                articleStarCount: _this.starCount
            }
            _this.$axios.post('/article/updateStarCount', param).then((res) => {
                if (res.data.code == 200) {
                    console.log("starcount uppdate!")
                    this.getArticleDetails(this.articleId);
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        //commentflag 1:add comment  0:canel comment
        updateArticleCommentCount(articleId, commentflag) {
            const _this = this;
            const artCommentCount = _this.articleDetails.articleCommentCount;
            _this.commentCount = artCommentCount;
            if (commentflag == 1) {
                _this.commentCount += 1;
            } else { _this.commentCount -= 1; }
            const param = {
                articleId: articleId,
                articleCommentCount: _this.commentCount
            }
            _this.$axios.post('/article/updateCommentCount', param).then((res) => {
                if (res.data.code == 200) {
                    console.log("commentcount uppdate!");
                    this.getArticleDetails(this.articleId);
                }
            }).catch((err) => {
                console.log(err)
            })
        },

        //静态更新不喜欢，不更新到数据库
        updateUnLikeStatus(unLikeStatus) {
            if (unLikeStatus == 1) { this.articleUnLike = true; }
            else { this.articleUnLike = false; }
        },

        //文章主评论
        sendCommentInfo(articleId) {
            // if (JSON.stringify(this.userInfo) != '{}' ) {
            if (Object.values(this.userInfo).length > 0) {
                let commentRole = 0;
                if (this.userInfo.userUid == this.articleDetails.user.userUid) {
                    commentRole = 1;
                }
                this.artMainComment.commentArticleId = articleId;
                this.artMainComment.commentContent = this.articleInfoCominput;//评论内容
                this.artMainComment.commentPid = 0;//主评论 pid=0
                this.artMainComment.commentAuthorId = this.userInfo.userUid;
                this.artMainComment.commentAuthorName = this.userInfo.userName;
                this.artMainComment.commentAuthorEmail = this.userInfo.userEmail;
                this.artMainComment.commentAuthorUrl = this.userInfo.userIntro;
                this.artMainComment.commentAuthorAvatar = this.userInfo.userAvatar;
                this.artMainComment.commentRole = commentRole//0：其它用户； 1：楼主（文章作者）
                this.$axios.post('/comment/artMainComment', this.artMainComment).then((res) => {
                    if (res.data.code == 200) {
                        // swal("评论成功", { icon: "success" });
                        this.$message({
                            message: '评论成功',
                            type: 'success'
                        });

                        //更新评论数
                        this.updateArticleCommentCount(articleId, 1);
                        this.getArticleDetails(articleId);
                    }
                }).catch((err) => { console.log(err) })
            }
            else {
                swal("请先登录再进行评论", { icon: "warning" })
            }
        },

        /**
         *  回复文章评论  回复按钮点击
         * @param {*} indexi 第i条评论
         * @param {*} commentId id   ==》》pid
         * @param {*} commentAuthorName 回复的那条评论的作者  ==>>pname
         * @param {*} num 0: 回复文章主评论;  1:文章主评论的回复，再去回复
         */
        replyThisComm(indexi, commentId, commentAuthorName, num) {
            console.log("回复文章评论", indexi, commentId, commentAuthorName, num);
            this.$set(this.replyMap, indexi, true)
            console.log("显示回复输入框:", this.replyMap[indexi]);

            this.artMainReplyComment.commentPid = commentId;
            this.artMainReplyComment.commentPname = commentAuthorName;

        },
        /**
         *  发表回复评论  评论回复  执行回复操作
         * @param {*} indexi  
         * @param {*} indexj 
         */
        SendReplyComm(indexi, indexj) {
            // 在这里执行评论回复插入数据库，然后返回成功，则隐藏输入框
            // 如果返回失败，则弹窗提示评论失败，不隐藏评论框
            console.log("发表评论:", indexi, indexj)

            let commentRole = 0;
            if (this.userInfo.userUid == this.articleDetails.user.userUid) {
                commentRole = 1;
            }
            let articleId = this.articleDetails.articleId;
            this.artMainReplyComment.commentArticleId = articleId;
            this.artMainReplyComment.commentContent = this.articleReplyCominput;//评论内容
            this.artMainReplyComment.commentAuthorId = this.userInfo.userUid;
            this.artMainReplyComment.commentAuthorName = this.userInfo.userName;
            this.artMainReplyComment.commentAuthorEmail = this.userInfo.userEmail;
            this.artMainReplyComment.commentAuthorUrl = this.userInfo.userIntro;
            this.artMainReplyComment.commentAuthorAvatar = this.userInfo.userAvatar;
            this.artMainReplyComment.commentRole = commentRole//0：其它用户； 1：楼主（文章作者）
            this.$axios.post('/comment/artMainComment', this.artMainReplyComment).then((res) => {
                if (res.data.code == 200) {
                    swal("评论成功", { icon: "success" });
                    this.getArticleDetails(articleId);//刷新
                    this.$set(this.replyMap, indexi, false);//隐藏评论框
                }
            }).catch((err) => { console.log(err) })

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

        //删除评论
        deleteComment(comment) {
            const _this = this;
            console.log(JSON.stringify(comment))
            _this.$axios.post('/comment/remove', JSON.stringify(comment), {
                headers: {
                    'Content-Type': 'application/json' // 1
                },
            }).then((res) => {
                if (res.data.code == 200) {
                    _this.$message({
                        message: '删除评论成功',
                        type: 'success'
                    });
                    this.getArticleDetails(this.articleId);//刷新
                }
            }).catch((err) => {
                console.log(err);
            })
        },

        toEditArticle(articleId) {
            this.$router.push({ name: 'articleedit', query: { articleId: articleId } })
        },

        handleScroll() {
            /**使用window.scrollTo()方法在页面加载后滚动到指定位置。
                     * 首先，在你的页面组件中，你可以使用window.pageYOffset获取当前的滚动位置，
                     * 然后在页面加载后使用window.scrollTo()将页面滚动到该位置 */
            const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
            // console.log(window.scrollY);
            window.addEventListener('load', () => {
                this.$nextTick(() => {
                    window.scrollTo(0, scrollTop);
                });
            });
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

.pl_input_main {
    width: 80%;
    margin-left: 10px;
}

@media (min-width: 960px) {
    .layout {
        height: 100%;
        margin-left: 100px;
        margin-right: 100px;
    }

    .pl_input_main {
        width: 92%;
        margin-left: 10px;
    }
}

.el-container .el-card {
    z-index: 1;
}
</style>