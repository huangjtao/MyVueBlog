<template>
    <div>
        <NavBar />
        <el-container class="Indexlayout">
            <!-- header -->
            <!-- <el-header class="header"> -->
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户管理" name="first"></el-tab-pane>
                    <el-tab-pane label="配置管理" name="second"></el-tab-pane>
                    <el-tab-pane label="角色管理" name="third"></el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
                </el-tabs> -->
            <!-- </el-header> -->
            <!-- main主要内容 -->
            <el-container class="mainBody" style="margin-top: 20px;z-index: 1;">
                <el-container class="txt-main">
                    <el-main style="padding-top: 0px;">
                        <div class="list-container">
                            <!-- art列表信息 -->
                            <el-card class="box-card" v-for="(artinfo, index) in artList.list" :key="artinfo.articleId"
                                style="margin-bottom: 10px;">
                                <div class="art-title" style="margin-bottom: 5px;">
                                    <el-link type="warning" @click="toArticleDetails(artinfo.articleId)"
                                        style="font-size: larger; font-weight: 600;">{{
                                            artinfo.articleTitle }}</el-link>
                                </div>
                                <a class="art-content">
                                    <div class="markdown-body" v-html="artinfo.articleContent"></div>
                                </a>
                                <div class="art-other">
                                    <el-link :underline="false"> {{ artinfo.user.userName }} </el-link>
                                    <el-link :underline="false" style="margin-left: 20px;">{{ artinfo.articleCreateTime
                                    }}</el-link>
                                    <el-link :underline="false" style="margin-left: 20px;font-size: 10px;"><i
                                            class="el-icon-view"></i>
                                        {{ artinfo.articleViewCount }}</el-link>
                                    <el-link :underline="false" style="margin-left: 20px;font-size: 10px;"><i
                                            class="el-icon-chat-dot-square"></i>{{ artinfo.articleCommentCount }}</el-link>
                                    <el-link :underline="false" style="margin-left: 20px;font-size: 10px;"
                                        @click="StariconOn"><i :class="iconOff"></i>
                                        {{ artinfo.articleLikeCount }}</el-link>
                                </div>
                            </el-card>
                            <!-- 分页信息 -->
                            <div class="block">
                                <!-- <span class="demonstration">大于 7 页时的效果</span> -->
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                    :current-page.sync="artList.pageNum" :page-sizes="[5, 10, 20, 30]"
                                    :page-size="artList.pageSize" layout="total, sizes, prev, pager, next"
                                    :total="artList.total">
                                </el-pagination>
                            </div>
                        </div>
                    </el-main>
                </el-container>
                <!-- 右侧 -->
                <aside class="rightSide">
                    <el-card class="box-card" align="center" style="line-height: 1.5;">
                        <div class="author-avat">
                            <el-image style="width: 100px; height: 100px" :src="currUser.userAvatar" :fit="fit">
                            </el-image>
                        </div>

                        <a class="">{{ currUser.userName }}</a>
                        <div><span>入驻时间: {{ rzTime }} </span></div>
                        <div><span>原创 7 </span></div>
                        <div><span>个人简介：{{ currUser.userIntro }}</span></div>
                    </el-card>
                    <el-card style="margin-top: 20px;">
                        <el-calendar v-model="rlvalue" class="rlSelect">
                        </el-calendar>
                    </el-card>
                    <el-card class="box-card" style="margin-top: 20px;">
                        <div slot="header">
                            <a class="">内容推荐</a>
                        </div>
                        <div style="margin-bottom: 5px;"><span>1.Java Api</span></div>
                        <div style="margin-bottom: 5px;line-height: 30px;"><span>2.python机器学习</span></div>
                        <div><span>3.java spring详解</span></div>
                    </el-card>
                </aside>
            </el-container>
            <!-- footer -->
            <el-footer class="footer">
                <div style="" align="center">
                    <p class="text-center text-muted">Copyright © 2023 hjt All right reserved</p>
                </div>
                <div>
                    <div></div>
                    <a></a>
                    <a></a>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import 'github-markdown-css'
import NavBar from '@/components/navbar/navbar'
import moment from 'moment'

export default {
    name: 'Home',
    components: {
        NavBar
    },
    data() {
        return {
            activeName: 'second',
            rlvalue: new Date(),
            iconOff: 'el-icon-star-off',
            fit: "cover",

            artList: {
                total: 0,
                list: [],
                pageNum: 1,
                pageSize: 10,
                size: 10,
                startRow: 1,
                endRow: 10,
                pages: 3,
                prePage: 0,
                nextPage: 2,
                isFirstPage: true,
                isLastPage: false,
                hasPreviousPage: false,
                hasNextPage: true,
                navigatePages: 8,
                navigatepageNums: [
                    1,
                    2,
                    3
                ],
                navigateFirstPage: 1,
                navigateLastPage: 3
            },

            currUser: {},//当前登录用户
            rzTime: '',
        };
    },
    mounted() {
        // this.HandleTextZs();
        this.getAllArtInfo();
        this.currentLoginUser();
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        StariconOn() {
            this.iconOff = 'el-icon-star-on';
        },
        getAllArtInfo() {
            var param = {
                pageNum: this.artList.pageNum,
                pageSize: this.artList.pageSize,
            }
            this.$axios.post('/article/findAllByPage', param).then((response) => {
                if (response.data.total > 0) {
                    console.log("res=", response)
                    // this.artList = [];
                    // console.log("qk=", this.artList)
                    this.artList = response.data;
                    console.log("artList=", this.artList)
                } else {
                    console.log(err)
                }
            })
        },
        //当点击下一页，上一页，去到第几页时触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.artList.pageNum = val;
            this.getAllArtInfo();
        },
        //当改变每页显示的条数时触发,例如从每页显示十条变为每页显示20条
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.artList.pageNum = 1;
            this.artList.pageSize = val;
            this.getAllArtInfo();
        },
        currentLoginUser() {
            const user = this.$store.getters.getUser;
            if (user != '') {
                this.currUser = user;
                //计算时间差，返回天数
                // let currentDateTime = new Date();
                let RegisterTime = new Date(user.userRegisterTime);
                let timeDiff = moment(RegisterTime).format('YYYY年MM月DD日')
                // let dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));  //返回 x  天
                this.rzTime = timeDiff;
            }
        },
        toArticleDetails(articleId) {
            this.$router.push({ name: 'articledetails', query: { articleId: articleId } })
        }
        // HandleTextZs() {
        //     //限制字符个数
        //     $(".art-content").each(function () {
        //         var maxwidth = 210;
        //         if ($(this).text().length > maxwidth) {
        //             $(this).text($(this).text().substring(0, maxwidth));
        //             $(this).html($(this).html() + '...');
        //         }
        //     });
        // }

    }
};

</script>

<style scoped lang="scss">
.Indexlayout {
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
}

.header .footer {
    margin: 20px;
}

.txt-main {
    width: 70%;
}

.rightSide {
    /* margin-right: 20px;  */
    display: none;
    width: 30%;
}

.rightSide .el-image,
span,
a {
    cursor: pointer;
}

@media (min-width: 960px) {
    .rightSide {
        /* margin-right: 20px;  */
        display: block;
    }
}

.el-image {
    border-radius: 50%;
}

// 查看： 自定义css不生效.txt  日历控件样式
.rlSelect /deep/ .el-calendar-day {
    padding: 5px;
    height: 30px;
}

// 不生效   解决办法 ↑
// .el-calendar-table .el-calendar-day {
//     padding: 5px;
//     height: 30px;
// }

.el-calendar__body {
    padding: 5px;
}

.el-link.el-link--warning:hover {
    color: hotpink;
}

.el-link.el-link--warning {
    color: black;
}

.el-link.el-link--default:hover {
    color: black;
}

.art-content {
    font-size: 12px;
    line-height: 20px;
    /* 限制内容显示两行 */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.el-card__header {
    padding: 10px 20px;
}
</style>