<template>
    <div class="yq-tabPanel yq-tabPanel-release">
        <div class="yq-release-tab-head">
            <ul>
                <li class="hit">文章查看</li>
            </ul>
            <div class="yq-release-amount">
                <span>
                    今日发布数量：<em>0</em>
                    /6 <a href="standard.html" target="_blank">发文规范</a>
                </span>
            </div>
        </div>
        <div class="yq-panes">
            <div class="yq-panel">
                <el-select v-model="value1" multiple placeholder="ALL">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <el-select v-model="value2" multiple collapse-tags style="margin-left: 20px;" placeholder="ALL">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="yq-panel-table">
                <el-table :data="tableData" style="width: 100%;margin-top: 15px;border:0;"
                    :row-class-name="tableRowClassName" :show-header="false">
                    <!-- width:788px -->
                    <el-table-column prop="address" label="文章" width="500px">
                        <template slot-scope="scope">
                            <span style="margin-left: 0">{{ scope.row.address }}
                                <el-tag type="danger" size="mini" style="font-style: italic;"
                                    v-if="get_localDateTime(scope.row.date) == true">new</el-tag>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="200px" align="right">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="" width="88px">
                    </el-table-column>
                </el-table>
            </div>
            <div class="yq-group-altogether">共<span style="color:#ff5f5f;margin-left: 5px;margin-right: 5px;">9</span>条内容
                <el-pagination background layout="total,prev, pager, next,jumper" :total="100">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script slot-scope>
import moment from 'moment'

export default {
    name: 'right_artilcelist',
    data() {
        return {
            options1: [
                {
                    value: '0',
                    label: '全部类型'
                }, {
                    value: '1',
                    label: '文章'
                }, {
                    value: '2',
                    label: '图集'
                }],
            options2: [
                {
                    value: '0',
                    label: '全部状态'
                }, {
                    value: '1',
                    label: '待审核'
                }, {
                    value: '2',
                    label: '已发布'
                }, {
                    value: '3',
                    label: '已下线'
                }, {
                    value: '4',
                    label: '未通过'
                }],
            value1: [],
            value2: [],

            tableData: [{
                date: '2023-08-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333,
                tag: '家'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333,
                tag: '公司'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333,
                tag: '家'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333,
                tag: '公司'
            }],
        }
    },
    mounted() {
    },
    methods: {
        get_localDateTime(strTime) {
            var tempDate = new Date() // 获取今天的日期  Tue Aug 01 2023 23:56:09 GMT+0800 (中国标准时间)
            var beforeDate = tempDate.setDate(tempDate.getDate() - 7) // 今天的前N天的日期，N自定义 一周  时间戳
            var endDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate()  //年月日

            let strTime1 = '2023-08-01 23:56:09'
            let ddd = new Date(strTime);
            let dateObj = moment(strTime, 'YYYY-MM-DD HH:mm:ss').toDate();
            if (dateObj.getTime() >= beforeDate) {
                return true;
            }
        }
    }
}
</script>

<style scoped>
.yq-tabPanel ul {
    height: 44px;
    border-bottom: 1px solid #d0d0d0;
    background: #eaeaea;
    line-height: 44px;
    padding-left: 0;
    list-style-type: none;
}

.yq-tabPanel ul li {
    float: left;
    margin: 0 2px 0 0;
    font-size: 14px;
    height: 44px;
    line-height: 45px;
    width: 111px;
    text-align: center;
    cursor: pointer;
    background: -moz-linear-gradient(top, #eee, #ddd);
}

.yq-tabPanel .hit {
    border-bottom: 2px solid #ff5f5f;
    cursor: pointer;
    color: #ffffff;
    background: #ff5f5f;
    background: -moz-linear-gradient(top, #e1e1e1, #fff);
    -webkit-transition: all .2s ease-out;
    transition: all .2s ease-out;
}

.yq-tabPanel-release ul {
    background: none;
    border-bottom: 2px solid #d0d0d0;
}

.yq-tabPanel-release .hit {
    border-bottom: 2px solid #ff5f5f;
    cursor: pointer;
    color: #ff5f5f;
    background: none;
    background: -moz-linear-gradient(top, #e1e1e1, #fff);
    font-size: 16px;
}

.yq-release-tab-head {
    position: relative;
}

.yq-release-amount {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 14px;
    color: #999;
}

.yq-release-amount a {
    color: #ff5f5f;
    padding-left: 10px;
}

.yq-release-amount span em {
    color: #ff5f5f;
}

.yq-panel .el-select {
    width: 150px;
    height: 40px;
    border-radius: 4px;
    line-height: 32px;
    box-shadow: none !important;
    background-color: #fff;
    border: 1px solid #ddd;
    font-size: 13px;
}

.input-with-select {
    width: 450px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.el-table /deep/ td.el-table__cell {
    border-bottom: 0;
}

/* // 去掉所有的横线 */
.el-table__row>td {
    border: none;
}

.el-table::before {
    height: 0px;
}

/* // 只去除表格的最最底部的横线 */
div /deep/ .el-table--border::after,
div /deep/ .el-table--group::after,
div /deep/ .el-table::before {
    background-color: transparent;
}

.el-table /deep/ .el-table__cell {
    padding: 5px 0;
}

.yq-group-altogether {
    color: #666;
    margin: 20px 0 20px 20px;
    font-size: 14px;
}

.yq-tabPanel /deep/ .el-table td.el-table__cell div.cell:hover {
    color: #ff5f5f;
    /* cursor: pointer; */
}
</style> 
<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ff5f5f;
    /* //修改默认的背景色 */
}
</style>