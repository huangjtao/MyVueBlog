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
                    <el-menu :default-active="activeIndexp" class="el-menu-demo" mode="horizontal" @select="handleSelectp">
                        <el-menu-item index="1" style="height: 50px;">文章发布</el-menu-item>
                        <el-menu-item index="2" style="height: 50px;">图集发布</el-menu-item>
                        <el-menu-item index="3" style="height: 50px; float: right;">今日发布</el-menu-item>
                    </el-menu>

                    <div class="ydc-warning-default"
                        style="margin-top: 10px;margin-bottom: 10px;background-color: #fceded; height: 40px;font-size: 13px;padding-top: 1px;padding-left: 20px;">
                        <p>标题字数需在1字到30字之间。</p>
                    </div>

                    <div>
                        <span>标题：</span><el-input type="text" placeholder="请输入标题,建议在30字以内" v-model="text" maxlength="30"
                            show-word-limit style="width: 80%;"></el-input>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章类别：</span>
                        <el-select v-model="artlbvalue" multiple placeholder="请选择" style="width: 55%;">
                            <el-option v-for="item in artlboptions" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="margin-top: 10px;">
                        <span>文章标签(分类)：</span>
                        <el-select v-model="bqvalue" multiple placeholder="请选择" style="width: 50%;">
                            <el-option v-for="item in bqoptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span>作者：</span><el-input type="text" placeholder="请输入作者名" v-model="authorText"
                            style="width: 20%; margin-top: 10px;margin-bottom: 10px;"></el-input>
                    </div>
                    <!-- <div>
                        <el-input type="textarea" placeholder="请输入内容" v-model="nrText"
                            style="margin-bottom: 10px;"></el-input>
                    </div> -->
                    <div id="editor" style="margin-bottom: 10px;">
                        <mavon-editor style="height: 500px;width: 100%;" ref=md @imgAdd="imgAdd" @imgDel="imgDel"
                            v-model="nrText"></mavon-editor>
                    </div>
                    <div>
                        <span style="float: left;">封面：</span>
                        <el-upload class="articlefm-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="articlefm">
                            <i v-else class="el-icon-plus articlefm-uploader-icon"></i>
                        </el-upload>
                        <span style="padding-left: 50px;font-size: 10px;">图片建议：不超过2M</span>

                    </div>

                    <div style="margin-top: 20px; padding-left: 50px;">
                        <el-button type="danger" style="width:200px">发布</el-button>
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
    name: 'articleRealse',
    components: {
        NavBar
    },
    data() {
        return {
            activeIndexp: '1',
            text: '',
            authorText: '',
            nrText: '',     //文章内容
            imageUrl: '',
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
            }]
        };
    },
    methods: {
        handleSelectp(key, keyPath) {
            console.log(key, keyPath);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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