<template>
    <div>
        <NavBar />

        <el-container class="layout">
            <!-- main主要内容 -->
            <el-container class="RmainBody" style="margin-top: 20px;z-index: 1;">

                <el-card class="box-card" style="width: 100%;">
                    <div slot="header" class="clearfix">
                        <span>文章修改</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <!-- <el-menu :default-active="activeIndexp" class="el-menu-demo" mode="horizontal" @select="handleSelectp">
                        <el-menu-item index="1" style="height: 50px;">文章发布</el-menu-item>
                        <el-menu-item index="2" style="height: 50px;">图集发布</el-menu-item>
                        <el-menu-item index="3" style="height: 50px; float: right;">今日发布</el-menu-item>
                    </el-menu> -->

                    <div class="ydc-warning-default"
                        style="margin-top: 10px;margin-bottom: 10px;background-color: #fceded; height: 40px;font-size: 13px;padding-top: 1px;padding-left: 20px;">
                        <p>标题字数需在1字到60字之间。</p>
                    </div>

                    <div>
                        <span>文章标题：</span><el-input type="text" placeholder="请输入标题,建议在60字以内" v-model="text" maxlength="60"
                            show-word-limit style="width: 80%;"></el-input>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章类别：</span>
                        <el-select v-model="artlbvalue" multiple placeholder="请选择" style="width: 55%;">
                            <el-option v-for="item in artlboptions" :key="item.categoryId" :label="item.categoryName"
                                :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章标签：</span>
                        <el-select v-model="bqvalue" multiple placeholder="请选择" style="width: 50%;">
                            <el-option v-for="item in bqoptions" :key="item.tagId" :label="item.tagName"
                                :value="item.tagId">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章类型：</span>
                        <el-radio-group v-model="radioType">
                            <el-radio :label="1">原创</el-radio>
                            <el-radio :label="2">转载</el-radio>
                            <!-- <el-radio :label="3">备选项</el-radio> -->
                        </el-radio-group>
                        <div style="margin-top: 10px;width: 55%;margin-left: 80px;" v-if="radioType==2">
                            <el-input type="text" placeholder="请输入原文链接" style="margin-bottom: 10px;" v-model="articleTypeReprinturl"></el-input>
                            <span style="font-size: small;color: red;">注意：转载请确认原文允许转载，或者您已经获得原文作者授权。</span>
                        </div>
                    </div>
                    <div>
                        <span>文章作者：</span><el-input type="text" placeholder="请输入作者名" v-model="authorText"
                            style="width: 20%; margin-top: 10px;margin-bottom: 10px;"></el-input>
                    </div>
                    <!-- <div>
                        <el-input type="textarea" placeholder="请输入内容" v-model="nrText"
                            style="margin-bottom: 10px;"></el-input>
                    </div> -->
                    <div id="editor" style="margin-bottom: 10px;">
                        <mavon-editor style="height: 500px;width: 100%;" ref=md @imgAdd="imgAdd" @imgDel="imgDel"
                            v-model="nrText" @change="handleNrChange"></mavon-editor>
                    </div>
                    <div>
                        <span style="float: left;">封面：</span>
                        <el-upload class="articlefm-uploader" action="#" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-change="uploadFmPic">
                            <img v-if="imageUrl" :src="imageUrl" class="articlefm">
                            <i v-else class="el-icon-plus articlefm-uploader-icon"></i>
                        </el-upload>
                        <span style="padding-left: 50px;font-size: 10px;">图片建议：不超过2M</span>
                        <span @click="clearImageUrl"><el-button size="mini" round>clear</el-button></span>

                    </div>

                    <div style="margin-top: 20px; padding-left: 50px;">
                        <el-button type="danger" style="width:200px" @click="updateArticle()">更新</el-button>
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

    </div>
</template>

<script>
import NavBar from '@/components/navbar/navbar'
export default {
    name: 'articleedit',
    components: {
        NavBar
    },
    data() {
        return {
            activeIndexp: '1',
            text: '',     //标题
            authorText: '',  //作者
            nrText: '',     //文章内容 md格式
            nrTextHtml: '',  //文章内容 html格式
            imageUrl: '',   //封面图片显示路径
            artlbvalue: [], //文章类别
            artlboptions: [],
            bqvalue: [],  //文章标签
            bqoptions: [{
                value: '1',
                label: 'java'
            }, {
                value: '2',
                label: 'python'
            }, {
                value: '3',
                label: 'spring'
            }],
            userInfo: {}, //用户信息
            fmpicinfo: "",  //修改后的图片信息
            imgPath: "",  //修改之前的文章封面图片路径
            articleDetails: {},
            radioType:1, //文章类型
            articleTypeReprinturl:"",
        };
    },

    mounted() {
        this.getTagInfo();
        this.getCategoryInfo();

        const articleId = this.$route.query.articleId;
        this.getArticleInfo(articleId);
        this.getLoginUserInfo();
    },

    methods: {
        //获取登录用户信息
        getLoginUserInfo() {
            const user = this.$store.getters.getUser;
            if (user != null) {
                // this.IsLogined = true;
                this.userInfo = user;
            }
        },
        getArticleInfo(articleId) {
            const _this = this;
            var param = { articleId: articleId }
            // 获取具体某一篇文章信息，作者信息   标签信息、分类、评论
            this.$axios.post('/article/getArtOneDet', param).then((res) => {
                if (res.data.code == 200) {
                    //文章信息
                    _this.articleDetails = res.data.data.article;
                    _this.text = res.data.data.article.articleTitle;
                    _this.authorText = res.data.data.article.user.userName;
                    _this.radioType=res.data.data.article.articleType;
                    _this.articleTypeReprinturl=res.data.data.article.articleTypeReprinturl;
                    // 如果你看了上面网站复制粘贴无果，用下面这句
                    // https://blog.csdn.net/x_s_yangg/article/details/106663847
                    const TurndownService = require('turndown').default
                    var turndownService = new TurndownService()
                    // 这里的this.post.content为数据库保存的html格式，转换成了markdown格式
                    var markdown = turndownService.turndown(res.data.data.article.articleContent)
                    // 显示在页面
                    _this.nrText = markdown;
                    _this.imageUrl = res.data.data.article.articleFmpic;
                    _this.imgPath = res.data.data.article.articleFmpic;
                    //文章标签信息 
                    const bqArray = res.data.data.articleTagRefs;
                    bqArray.forEach(element => {
                        _this.bqvalue.push(element.tagId);
                    });
                    // _this.bqvalue = res.data.data.articleTagRefs;
                    //文章分类信息
                    const flArray = res.data.data.articleCategoryRefs;
                    flArray.forEach(element => {
                        _this.artlbvalue.push(element.categoryId);
                    });
                    //文章评论信息
                    // _this.articleComments = res.data.data.comments;
                } else { swal(res.data.msg, { icon: "error" }) }
            }).catch((err) => {
                console.log(err)
            })

        },
        //获取类别信息
        getCategoryInfo() {
            this.$axios.get('/category/findAll').then((res) => {
                if (res.data != null) {
                    this.artlboptions = res.data;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        //获取标签信息
        getTagInfo() {
            this.$axios.get('/tag/findAll').then((res) => {
                if (res.data != null) {
                    this.bqoptions = res.data;
                }
            }).catch((err) => {
                console.log(err);
            })
        },

        handleSelectp(key, keyPath) {
            console.log(key, keyPath);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type.startsWith('image/');
            const isLt2M = file.size / 10240 / 10240 < 10;

            if (!isJPG) {
                this.$message.error('只能上传图片文件!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 10MB!');
            }
            return isJPG && isLt2M;
        },

        //文章图片信息处理 pos: 写在md中的文件名，$file为图片文件
        imgAdd(pos, $file) {
            let imgData = new FormData();
            imgData.append("img", $file);
            this.$axios.post('/comm-article-picinfo/insertWzPicture', imgData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                // res.data.data为照片链接
                // 请求后端接口后，将pos位置的图片路径替换为后端返回的图片链接
                this.$refs.md.$img2Url(pos, res.data.data)
            })
        },
        imgDel(pos, $file) {
            // console.log(pos[0], $file);
            //上面讲过图片是一个数组，那么这里直接通过pos[0]取出文件路径。
            let pImgUrl = pos[0];
            let pImgFlag = "a";
            var param = {
                pImgUrl: pImgUrl,
                pImgFlag: pImgFlag
            }
            this.$axios.post('/comm-article-picinfo/deleImg', param).then((res) => {
                console.log(res)
            }).catch((err) => { console.log(err); })
        },

        uploadFmPic(file) {
            console.log("file=", file);
            this.fmpicinfo = file.raw;
            //blob：fkdmkbkdfmk
            this.imageUrl = URL.createObjectURL(file.raw);
            // console.log(this.imageUrl)
        },

        updateArticle() {
            let _this = this;
            _this.articleDetails.articleUserId = _this.userInfo.userUid;
            _this.articleDetails.articleContent = _this.nrTextHtml;
            _this.articleDetails.articleTitle = _this.text;
            _this.articleDetails.articleFmpic = _this.imgPath;
            var artFmpic = _this.fmpicinfo;
            var article = _this.articleDetails; //文章信息

            var categoryId = this.artlbvalue; //分类id
            var tagId = this.bqvalue; //标签id

            this.$axios.post('/article/update', {
                article: JSON.stringify(article),
                categoryId: JSON.stringify(categoryId),
                tagId: JSON.stringify(tagId),
                imgOld: _this.imgPath,
                file: artFmpic
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                if (res.data.code == "200") {
                    this.$message({
                        message: '更新成功!',
                        type: 'success'
                    });
                    //成功之后清空界面内容
                    this.articleDetails = {};
                    this.imageUrl = "";
                    this.nrText = "";
                    this.text = "";
                    this.artlbvalue = "";
                    this.bqvalue = "";
                } else {
                    swal("操作失败！", "", { icon: "warning", });
                }
            }).catch((err) => { console.log(err); })
        },
        //清空封面图片信息
        clearImageUrl() {
            this.imageUrl = "";
            this.imgPath = "";
        },
        //编辑器内容变动
        handleNrChange(value, render) {
            // console.log(value, render);
            // value中是文本值,render是渲染出的html文本
            this.nrTextHtml = render;
        }
    }
}
</script>

<style scoped>
.layout {
    height: 100%;
    margin-left: 100px;
    margin-right: 100px;
}

.el-card div .el-input input {
    border-radius: 0;
}

.el-card div .el-textarea textarea {
    height: 300px;
    max-height: 500px;
}

.articlefm-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.articlefm-uploader .el-upload:hover {
    border-color: #409EFF;
}

.articlefm-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.articlefm {
    width: 178px;
    height: 178px;
    display: block;
}
</style>