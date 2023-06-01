<template>
    <div>
        <NavBar />
        <el-container class="layout">
            <!-- main主要内容 -->
            <el-container class="RmainBody" style="margin-top: 20px;z-index: 1;">
                <el-card class="box-card" style="width: 100%; padding: 8px;">
                    <span>一花</span>
                    <el-divider direction="vertical"></el-divider>
                    <span>一世界</span>
                    <el-divider direction="vertical"></el-divider>
                    <el-divider>清空</el-divider>
                    <el-row :gutter="20" style="text-align:center">
                        <el-col :span="6" v-for="(o, index) in 8" :key="o" style="margin-top: 10px;">
                            <el-card :body-style="{ padding: '0px' }">
                                <img src="https://cdn.stocksnap.io/img-thumbs/960w/spring-flowers_4H4GTKWTED.jpg"
                                    style="height: 260;width: 251px;">
                                <!-- <el-avatar shape="square" :size="260" :fit="fit" -->
                                <!-- src="https://cdn.stocksnap.io/img-thumbs/960w/spring-flowers_4H4GTKWTED.jpg"></el-avatar> -->
                                <div style="padding: 14px;">
                                    <span>flowers</span>
                                    <div class="bottom clearfix">
                                        <time class="time">{{ currentDate }}</time>
                                        <el-button type="text" class="button">操作按钮</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-container>
            <el-footer class="footer">
                <div style="" align="center">
                    <p class="text-center text-muted">Copyright © 2023 hjt All right reserved</p>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import NavBar from "@/components/navbar/navbar.vue"
export default {
    name: "community",
    components: { NavBar, },
    data() {
        return {
            currentDate: new Date("yyyy-month-dd hh:mm:ss"),
            fit: "fill",
        }
    }
}
</script>

<style scoped lang="scss">
.layout {
    height: 100%;
    margin-left: 100px;
    margin-right: 100px;
}

@media screen and (max-width:960px) {
    .layout {
        height: 100%;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
    }
}
</style>