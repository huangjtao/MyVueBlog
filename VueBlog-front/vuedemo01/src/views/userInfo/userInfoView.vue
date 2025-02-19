<template>
    <div style="position: relative; z-index: 1;">
        <navbar />
        <div class="body-page">
            <el-card class="box-card">
                <div class="demo-fit">
                    <div class="demo-fit-tx">
                        <el-avatar shape="square" :size="100"
                            :src="userInfo.userAvatar == null ? userAvatar : userInfo.userAvatar"></el-avatar>
                    </div>
                    <div class="demo-fit-xm">
                        <span style="font-weight: 800;font-size: larger;">{{ userInfo.userName }}</span><br>
                        <span>{{ userInfo.userNickname }}</span><br>
                        <span>{{ userInfo.userIntro }}</span>
                    </div>
                </div>
                <div class="demo-fit-right">
                    <div class="dfr-txt">
                        <span> <span>99+</span><br>
                            文章</span>
                        <el-divider direction="vertical"></el-divider>
                        <span> <span>99+</span><br>
                            粉丝</span>
                        <el-divider direction="vertical"></el-divider>
                        <span> <span>99+</span><br>
                            点赞</span>
                        <el-divider direction="vertical"></el-divider>
                        <span> <span>99+</span><br>
                            关注</span>

                        <div class="dfr-badge">
                            <el-badge :value="'99+'" class="item">
                                <el-button size="small">评论</el-button>
                            </el-badge>
                            <el-badge :value="'99+'" class="item" style="margin-left: 15px;">
                                <el-button size="small">回复</el-button>
                            </el-badge>
                        </div>
                    </div>

                </div>
            </el-card>
            <el-container>
                <el-aside style="width: 25%;">
                    <el-card class="box-card" style="height: 600px;">
                        <div slot="header" class="clearfix"
                            style="text-align: center;font-size: 20px;font-weight: 800;color: #fa7a7a;">
                            <span>个人中心</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        <div class="text item">
                            <el-menu default-active="1" class="el-menu-vertical-demo">
                                <el-menu-item index="1" @click="right_page_select(1, '个人简介')">
                                    <i class="el-icon-location"></i>
                                    <span slot="title">个人简介</span>
                                </el-menu-item>
                                <el-menu-item index="2" @click="right_page_select(2, '发帖')">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">发帖</span>
                                </el-menu-item>
                                <el-menu-item index="3" @click="right_page_select(3, '收藏')">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">收藏</span>
                                </el-menu-item>
                                <el-menu-item index="4" @click="right_page_select(4, '粉丝')">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title">粉丝</span>
                                </el-menu-item>
                                <el-menu-item index="5" @click="right_page_select(5, '关注')">
                                    <i class="el-icon-collection"></i>
                                    <span slot="title">关注</span>
                                </el-menu-item>
                                <el-menu-item index="6" @click="right_page_select(6, '点赞')">
                                    <i class="el-icon-star-on"></i>
                                    <span slot="title">点赞</span>
                                </el-menu-item>
                                <el-menu-item index="7" disabled @click="right_page_select(7, '回复')">
                                    <i class="el-icon-s-management"></i>
                                    <span slot="title">回复</span>
                                </el-menu-item>
                            </el-menu>
                        </div>
                    </el-card>
                </el-aside>
                <el-main>
                    <el-card class="box-card" style="height: 600px;">
                        <div v-if="right_page_index == 1">
                            <right_userIntro :userInfo="userInfo"></right_userIntro>
                        </div>
                        <div v-if="right_page_index == 2">
                            <right_articlelist></right_articlelist>
                        </div>
                    </el-card>
                </el-main>

            </el-container>
            <el-footer>Footer</el-footer>
        </div>
    </div>
</template>

<script scoped>
import navbar from '@/components/navbar/navbar'
import right_userIntro from './right_userIntro.vue'
import right_articlelist from './right_articlelist.vue'

export default {
    name: 'userInfoView',
    components: {
        navbar,
        right_userIntro,
        right_articlelist
    },
    data() {
        return {
            userAvatar: require('@/styles/pic/avatar.jpg'),
            right_page_index: 1,

            userInfo: {},
        }
    },
    created() {
        this.currentLoginUser();
    },
    methods: {
        currentLoginUser() {
            const user = this.$store.getters.getUser;
            if (user != null) {
                this.userInfo = user;
                console.log(this.userInfo)
            }
        },


        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        right_page_select(page_index, page_name) {
            if (page_index < 3) { //后面几个没有页面，暂时不跳转页面
                this.right_page_index = page_index;
            }
            else {
                this.$message({
                    showClose: true,
                    message: '暂未开放...',
                    type: 'error'
                });
            }
            console.log(page_index, page_name);
        }
    }
}


</script>

<style scoped>
@media (min-width: 960px) {
    .body-page {
        height: 100%;
        margin-left: 100px;
        margin-right: 100px;
    }
}

.el-card /deep/ .el-card__body {
    height: 100px;
}

.demo-fit {
    float: left;
    width: 50%;
}

.demo-fit-tx {
    width: 100px;
    float: left;
}

.demo-fit-xm {
    padding: 5px;
    font-size: 14px;
    line-height: 1.5;
    width: 60%;
    margin-left: 110px;
}

.demo-fit-right {
    float: right;
    width: 50%;
    height: 100px;
}

.dfr-txt {
    width: 100%;
    text-align: center;
    height: 80px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    /* float: left; */
}

.dfr-badge {
    /* width: 30%; */
    /* height: 80px; */
    float: right;
    margin-left: 20px;
    /* margin-right: 20px; */
    /* display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px; */
}

.el-divider--vertical {
    height: 3em;
    margin: 0 10px;
}

.el-aside {
    width: 30%;
    padding-top: 20px;
    padding-bottom: 20px;
}

.el-main {
    width: 70%;
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    padding-right: 0;
}

.el-menu-item.is-active {
    background-color: #ff5f5f !important;
    color: #fff;

    span {
        color: #fff !important;
    }
}
</style>
