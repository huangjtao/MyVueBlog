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
                        <el-input v-model="articleInfoCominput" placeholder="请输入内容"
                            style="width:85%;margin-left: 10px;"></el-input>
                        <el-button type="success" style="float: right;">发表评论</el-button>
                    </div>
                    <div slot="header" class="clearfix" v-if="!comshow">
                        <div style="text-align: center; font-size: 2rem;font-weight: 400; letter-spacing: 5px;">
                            <span>❤留言板❤</span>
                            <el-divider></el-divider>
                        </div>
                        <span>login or reg</span>
                        <el-button type="success" style="float: right;">提问？</el-button>
                    </div>
                    <!-- 评论信息 -->
                    <div class="commentinfos">
                        <div class="text item" style="padding: 5px;">
                            <div style="display: block;height: 50px;font-size: 13px;">
                                <el-avatar :size="40"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :fit="fit"
                                    style="float: left;">
                                </el-avatar>
                                <span style="margin-left: 20px;margin-right: 20px;">taoHH</span>
                                <span style="float: right;cursor: pointer;">回复</span>
                                <span>ip:kunming</span><br>
                                <span style="margin-left: 20px;">2023-01-01 23:59:59</span>
                            </div>
                            <div>
                                <span style="margin-left: 50px;">这里是评论内容</span>
                            </div>
                        </div>
                        <!-- reply -->
                        <div class="text item" style="margin-left: 30px; background:;padding: 12px;">
                            <div style="display: block;height: 50px;font-size: 13px;">
                                <el-avatar :size="40"
                                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :fit="fit"
                                    style="float: left;">
                                </el-avatar>
                                <span style="margin-left: 20px;margin-right: 20px;">taoHH</span>
                                <span style="float: right;cursor: pointer;">√</span>
                                <span>ip:kunming</span><br>
                                <span style="margin-left: 20px;">2023-01-01 23:59:59</span>
                            </div>
                            <div>
                                <span style="margin-left: 50px;">回复taoHH:这里是评论内容</span>
                            </div>
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
</style>