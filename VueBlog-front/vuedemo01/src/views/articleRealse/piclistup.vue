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

                    <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview"
                        :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" list-type="picture" multiple
                        :limit="limit" :on-exceed="handleExceed">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success"
                            @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
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
import "element-ui/lib/index"
import NavBar from '@/components/navbar/navbar'
export default {
    name: 'piclistup',
    components: {
        NavBar
    },
    data() {
        return {
            activeIndexp: '2',
            limit: 9,   //限制允许上传几张图片
            fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
        };
    },
    methods: {
        handleSelectp(key, keyPath) {
            console.log(key, keyPath);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
    }
}
</script>

<style scoped>
.upload-demo {
    margin-top: 10px;
}
</style>