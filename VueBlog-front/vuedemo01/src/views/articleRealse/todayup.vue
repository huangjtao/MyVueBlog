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
                        <el-menu-item index="1" style="height: 50px;" @click="toArticleRealsePage()">文章发布</el-menu-item>
                        <el-menu-item index="2" style="height: 50px;">图集发布</el-menu-item>
                        <el-menu-item index="3" style="height: 50px; float: right;">今日发布</el-menu-item>
                    </el-menu>
                    <div class="todayupinfo">
                        <el-table class="table-wrapper" ref="singleTable" :data="todayUpList" highlight-current-row
                            @current-change="handleCurrentChange" style="width: 100%" :show-header="false">
                            <el-table-column type="index" width="50">
                            </el-table-column>
                            <el-table-column property="articleTitle" label="文章标题">
                            </el-table-column>
                            <el-table-column property="user.user_name" label="文章作者" width="120">
                            </el-table-column>
                            <el-table-column property="articleCreateTime" label="发布时间">
                            </el-table-column>
                        </el-table>
                        <!-- <div v-for="o in 4" :key="o" class="todayItem">
                            <el-link :underline="false">{{ '列表内容 ' + o }}</el-link>
                            <span style="">
                                <span style="font-style:italic;">{{ '888' + o }}</span>
                                <span style="font-style:italic;">{{ '2023-03-25 23:59:59' + o }}</span>
                            </span>
                        </div> -->
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
    name: 'todayup',
    components: {
        NavBar
    },
    data() {
        return {
            activeIndexp: '3',
            content: '',
            todayUpList: [],
        };
    },
    mounted() {
        this.getTodayUpArticle();
    },
    methods: {
        handleSelectp(key, keyPath) {
            console.log(key, keyPath);
        },

        toArticleRealsePage() {
            this.$router.push({ path: '/articleRealse' })
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },

        getTodayUpArticle() {
            this.$axios.get('/article/todayUp').then(res => {
                if (res.data.code == 200) {
                    this.todayUpList = res.data.data;
                }
            })
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

.todayupinfo {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
}

.todayItem:hover {
    background: #f78989;
}

/* el-table表格去掉横线 */
/* //透明化行、单元格,删除表头下横线 */
.table-wrapper /deep/ tr,
.table-wrapper /deep/ th,
.table-wrapper /deep/ td {
    border-bottom: 0px;
    /* //删除表头下横线 */
}

.el-table__row>td {
    border: none;
}

.el-table::before {
    height: 0px;
}

.table-wrapper /deep/ tr:hover {
    color: #f78989 !important;
}

.table-wrapper /deep/ tr:hover>td {
    color: #f78989 !important;
}

.table-wrapper /deep/ .el-table__body tr.current-row>td.el-table__cell {
    color: #f78989 !important;
}
</style>