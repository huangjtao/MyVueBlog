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
                                <div style="display: flex;">
                                    <div v-if="artinfo.articleFmpic" style="float: left;margin-right: 20px;">
                                        <el-avatar shape="square" :size="100" :src="artinfo.articleFmpic"></el-avatar>
                                    </div>
                                    <div>
                                        <div class="art-title" style="margin-bottom: 5px;">
                                            <el-link type="warning" @click="toArticleDetails(artinfo.articleId)"
                                                style="font-size: larger; font-weight: 600;">{{
                                                    artinfo.articleTitle }}</el-link>
                                        </div>
                                        <a class="art-content">
                                            <!-- <div class="markdown-body" v-html="(artinfo.articleContent).substring(0, 100)"> -->
                                            <div style="font:14px/normal Arial,Helvetica,Sans-Serif;color: #71777d;line-height: 22px;">
                                                {{ artinfo.articleContentTxt |  ellipsis }}
                                            </div>
                                        </a>
                                        <div class="art-other">
                                            <div style="display: flex;">
                                                <ul style="list-style-type: none;padding: 0;margin-bottom: 0;">
                                                    <li style="float: left;margin-right: 20px;">
                                                        <a style="display: flex; align-items: center;">
                                                            <img src="../../assets/iconUser.png"
                                                                style="height: 24px;width: 24px;margin-right: 4px;" />
                                                            <span>{{ artinfo.user.userName }}</span>
                                                        </a>
                                                    </li>
                                                    <li style="float: left;margin-right: 20px;">
                                                        <a style="display: flex; align-items: center;">
                                                            <img src="../../assets/iconClock.png"
                                                                style="height: 24px;width: 24px;margin-right: 4px;" />
                                                            <span>
                                                                {{ artinfo.articleCreateTime }}</span>
                                                        </a>
                                                    </li>
                                                    <li style="float: left;margin-right: 20px;">
                                                        <a style="display: flex; align-items: center;">
                                                            <img src="../../assets/iconViewBlack.png"
                                                                style="height: 24px;width: 24px;margin-right: 4px;" />
                                                            <span>{{ artinfo.articleViewCount }}</span>
                                                        </a>
                                                    </li>
                                                    <li style="float: left;margin-right: 20px;">
                                                        <a style="display: flex; align-items: center;">
                                                            <img src="../../assets/iconCommentBlack.png"
                                                                style="height: 24px;width: 24px;margin-right: 4px;" />
                                                            <span>{{ artinfo.articleCommentCount }}</span>
                                                        </a>
                                                    </li>
                                                    <li style="float: left;margin-right: 20px;">
                                                        <a style="display: flex; align-items: center;">
                                                            <img src="../../assets/iconStarBlack.png"
                                                                style="height: 24px;width: 24px;margin-right: 4px;" />
                                                            <span>{{ artinfo.articleStarCount }}</span>
                                                        </a>
                                                    </li>
                                                    <li style="float: left;margin-right: 20px;">
                                                        <a style="display: flex; align-items: center;">
                                                            <img src="../../assets/iconLikeBlack.png"
                                                                style="height: 24px;width: 24px;margin-right: 4px;" />
                                                            <span>{{ artinfo.articleLikeCount }}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
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
                            <el-image style="width: 100px; height: 100px" :src="currUser.userAvatar== null ? require('@/styles/pic/avatar.jpg') : currUser.userAvatar" :fit="fit">
                            </el-image>
                        </div>

                        <a class="" v-if="currUser.userName == null"> Tao </a>
                        <a class="" v-else>{{ currUser.userName }}</a>
                        <div><span v-if="rzTime == ''">入驻时间: 2021-08-08 </span>
                            <span v-else>入驻时间: {{ rzTime }} </span>
                        </div>
                        <div><span>原创: 待统计... </span></div>
                        <div>
                            <span v-if="currUser.userIntro == null">个人简介: 莫待无花空折枝。</span>
                            <span v-else>个人简介: {{ currUser.userIntro }}</span>
                        </div>
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
                total: 0, //总数
                list: [],
                pageNum: 1,  //默认页
                pageSize: 10,  //默认条数
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
    created() {
        this.getSessionPageNum();
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
                    // console.log("res=", response)
                    // this.artList = [];
                    // console.log("qk=", this.artList)
                    this.artList = response.data;
                    // console.log("artList=", this.artList)
                } else {
                    console.log(err)
                }
                //返回列表页，查询成功之后清除
                window.sessionStorage.removeItem("pageNum");
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
            if (user != null) {
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
            this.$router.push({ name: 'articledetails', query: { articleId: articleId } });
            window.sessionStorage.setItem("skipFlag", 1);
            window.sessionStorage.setItem("pageNum", this.artList.pageNum);
        },

        getSessionPageNum() {
            let pageNum = Number(window.sessionStorage.getItem("pageNum"));
            if (pageNum != "") {
                this.artList.pageNum = pageNum;
            }
        },
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

        likeCount(articleId) {
            this.artList.articleLikeCount += 1;
        }
    },
    //vue 过滤器
    filters: {
        //限制显示210字符
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 210) {
                return value.slice(0, 210) + '...'
            }
            return value;
        }
    },
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
    text-align: center;
}

.rlSelect /deep/ .el-calendar__header {
    padding: 12px 10px;
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
    /* 限制内容显示3行 */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.el-card__header {
    padding: 10px 20px;
}
</style>