<template>
    <div>
        <NavBar />

        <el-container class="layout">
            <!-- main主要内容 -->
            <el-container class="RmainBody" style="margin-top: 20px;z-index: 1;">

                <el-card class="box-card" style="width: 100%;">
                    <!-- <div slot="header" class="clearfix">
                        <span>文章发布</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div> -->
                    <el-menu :default-active="activeIndexp" class="el-menu-demo" mode="horizontal"
                        @select="handleSelectp">
                        <el-menu-item index="1" style="height: 50px;">文章发布</el-menu-item>
                        <el-menu-item index="2" style="height: 50px;">图集发布</el-menu-item>
                        <el-menu-item index="3" style="height: 50px; float: right;"
                            @click="toTodayUp()">今日发布</el-menu-item>
                    </el-menu>

                    <div class="ydc-warning-default"
                        style="margin-top: 10px;margin-bottom: 10px;background-color: #fceded; height: 40px;font-size: 13px;padding-top: 1px;padding-left: 20px;">
                        <p>标题字数需在1字到30字之间。</p>
                    </div>

                    <div>
                        <span>文章标题：</span>
                        <el-input type="text" placeholder="请输入标题,建议在60字以内" v-model="article.articleTitle" maxlength="60"
                            show-word-limit style="width: 80%;"></el-input>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章类别：</span>
                        <el-select v-model="artlbvalue" multiple placeholder="请选择文章类别" style="width: 55%;">
                            <el-option v-for="item in artlboptions" :key="item.categoryId" :label="item.categoryName"
                                :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章标签：</span>
                        <el-select v-model="bqvalue" multiple placeholder="请选择文章标签" style="width: 55%;">
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
                        <div style="margin-top: 10px;width: 55%;margin-left: 80px;" v-if="radioType == 2">
                            <el-input type="text" placeholder="请输入原文链接" style="margin-bottom: 10px;"
                                v-model="article.articleTypeReprinturl"></el-input>
                            <span style="font-size: small;color: red;">注意：转载请确认原文允许转载，或者您已经获得原文作者授权。</span>
                        </div>
                        <!-- <el-select v-model="bqvalue" multiple placeholder="请选择" style="width: 50%;">
                            <el-option v-for="item in bqoptions" :key="item.tagId" :label="item.tagName"
                                :value="item.tagId">
                            </el-option>
                        </el-select> -->
                    </div>
                    <div>
                        <span>文章作者：</span><el-input type="text" placeholder="请输入作者名" v-model="userInfo.userName"
                            style="width: 20%; margin-top: 10px;margin-bottom: 10px;"></el-input>
                    </div>
                    <!-- <div>
                        <el-input type="textarea" placeholder="请输入内容" v-model="nrText"
                            style="margin-bottom: 10px;"></el-input>
                    </div> -->
                    <div id="editor" style="margin-bottom: 10px;">
                        <mavon-editor style="height: 500px;width: 100%;" ref="md" @imgAdd="imgAdd" @imgDel="imgDel"
                            v-model="article.articleContentTxt" @change="changeData"></mavon-editor>
                    </div>
                    <div>
                        <span style="float: left;">封面：</span>
                        <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="upload" :limit="1"
                            :before-upload="beforeAvatarUpload" :on-change="uploadFmPic">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleDownload(file)">
                                        <i class="el-icon-download"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleRemove(file)">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <span style="padding-left: 50px;font-size: 10px;">图片建议:不超过2M,并且只允许上传一张图片</span>
                        <!-- <input type="file" name="file" @change="fileUpload()" class="form-control-file" id="File1"
                            placeholder="请选择图片"> -->
                    </div>

                    <div style="margin-top: 20px; padding-left: 50px;">
                        <el-button type="danger" style="width:200px" @click="postArticleRealse()">发布</el-button>
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
import swal from 'sweetalert';
export default {
    name: 'articleRealse',
    components: {
        NavBar
    },
    data() {
        return {
            activeIndexp: '1',
            text: '',
            userInfo: '',
            nrText: '',
            nrHtmlText: '',     //文章内容
            imageUrl: '',   //文章封面图片 file
            artlbvalue: [], //文章类别
            artlboptions: [], //类别下拉选项
            bqvalue: [],  //文章标签
            //标签下拉选项
            bqoptions: [{
                tagId: '1',
                tagName: 'java'
            }, {
                tagId: '2',
                tagName: 'python'
            }, {
                tagId: '3',
                tagName: 'spring'
            }],
            article: {},
            //图片预览
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            radioType: 1, //文章类型
        };
    },
    mounted() {
        this.getLoginUserInfo();
        this.getCategoryInfo();
        this.getTagInfo();
    },
    methods: {
        handleSelectp(key, keyPath) {
            console.log(key, keyPath);
        },
        //图片上传
        // handleAvatarSuccess(res, file) {
        //     this.imageUrl = URL.createObjectURL(file.raw);
        // },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 10240 < 10;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 10MB!');
            }
            return isJPG && isLt2M;
        },
        //移除
        handleRemove(file) {
            console.log(file);
            let fileList = this.$refs.upload.uploadFiles;
            let index = fileList.findIndex(fileItem => { return fileItem.uid === file.uid });
            fileList.splice(index, 1);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },

        uploadFmPic(file) {
            console.log("file=", file);
            this.imageUrl = file;
            // const fmPic = file.file;
            // let _this = this;
            // let img = new FileReader();
            // img.readAsDataURL(fmPic);
            // img.addEventListener('load', function () {
            //  reader.result返回文件的内容。
            //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
            //给数组添加这个文件也就是图片的内容
            // _this.imagesFiles.push(img.result);   //base64内容
            // console.log("result", img.result);
            // })
            // img.onload = ({ target }) => {
            //     this.imageUrl = target.result;
            //     console.log("result", target.result);
            // }
            //blob:http://localhost:8080/f7e09cad-b901-478c-91dc-0599a80e4e47
            // _this.imageUrl = window.URL.createObjectURL(new Blob([fmPic], { type: 'image/jpeg' }))
            // console.log("imgUrl", _this.imageUrl);
        },


        //获取登录用户信息
        getLoginUserInfo() {
            const user = this.$store.getters.getUser;
            if (user != null) {
                // this.IsLogined = true;
                this.userInfo = user;
            }
        },
        //获取类别信息
        getCategoryInfo() {
            this.$axios.get('/category/findAll').then((res) => {
                if (res.data != null) {
                    // this.artlbvalue = res.data;
                    this.artlboptions = res.data;
                    // console.log("artbo", this.artlboptions);
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

        //文章发布
        changeData(value, render) {
            // value中是文本值,render是渲染出的html文本
            this.nrText = value;
            this.nrHtmlText = render;
            // console.log("r=", render);
        },
        /**
         * 文章发布
         */
        postArticleRealse() {
            this.article.articleUserId = this.userInfo.userUid;
            this.article.articleContent = this.nrHtmlText;
            this.article.articleContentTxt = this.nrText;
            this.article.articleType = this.radioType;
            var artFmpic = (this.imageUrl != "" ? this.imageUrl : "");
            var article = this.article; //文章信息

            var categoryId = this.artlbvalue; //分类id
            var tagId = this.bqvalue; //标签id
            console.log("tagId=" + tagId);
            console.log("jsonTagid", JSON.stringify(tagId));
            console.log("file=", JSON.stringify(artFmpic))

            this.$axios.post('/article/insert', {
                article: JSON.stringify(article),
                categoryId: JSON.stringify(categoryId),
                tagId: JSON.stringify(tagId),
                file: artFmpic.raw
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                if (res.data.code == "200") {
                    swal("操作成功！", "", { icon: "success" })
                    this.article = {};
                    this.imageUrl = "";
                } else {
                    swal("操作失败！", "", { icon: "warning", });
                }
            }).catch((err) => { console.log(err); })
        },

        uploadImgInfo(article, file) {
            let _this = this;
            var param = new FormData();
            param.append("article", JSON.stringify(article));
            param.append("file", file);
            console.log(param.values)
            this.$axios.post("article/uploadFile", param, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            ).then((res) => {
                console.log(res)
            })
        },

        //文章图片信息处理 pos: 写在md中的文件名，$file为图片文件
        imgAdd(pos, $file) {
            // console.log(pos, $file);
            let imgData = new FormData();
            imgData.append("img", $file);
            this.$axios.post('/comm-article-picinfo/insertWzPicture', imgData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                // res.data.data为照片链接
                // 请求后端接口后，将pos位置的图片路径替换为后端返回的图片链接
                // this.$refs.md.$img2Url(pos, )
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

        toTodayUp() {
            this.$router.push({ path: '/todayup' })
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
</style>