<template>
    <div>
        <el-descriptions title="个人简介" :column="2" border>
            <template slot="extra">
                <el-button type="primary" size="small" @click="dialoguserInfoeditVisible()">编辑</el-button>
            </template>
            <el-descriptions-item label="用户名" label-class-name="my-label" content-class-name="my-content">{{
                userInfo.userName }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ userInfo.userPhone }}</el-descriptions-item>
            <el-descriptions-item label="性别"><el-tag size="small">{{ userInfo.userSex }}</el-tag></el-descriptions-item>
            <el-descriptions-item label="年龄">{{ userInfo.userBirthday }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userInfo.userEmail }}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{ userInfo.userNickname }}</el-descriptions-item>
            <el-descriptions-item label="个性签名" span="2" :contentStyle="{ 'text-align': 'center' }">{{ userInfo.userIntro
            }}</el-descriptions-item>
            <el-descriptions-item label="职业">{{ userInfo.userJob }}</el-descriptions-item>
            <el-descriptions-item label="注册日期">{{ userInfo.userRegisterTime }}</el-descriptions-item>
            <el-descriptions-item label="备注">
                <el-tag size="small">努力搬砖中...</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="兴趣爱好">{{ userInfo.userInterest }}</el-descriptions-item>
            <el-descriptions-item label="联系地址" :contentStyle="{ 'text-align': 'center' }">{{ userInfo.userAddress
            }}</el-descriptions-item>
        </el-descriptions>
        <right_userInfo_edit v-if="dialogFormVisible" ref="opendia" :userInfo="userInfo"></right_userInfo_edit>
    </div>
</template>
<script slot-scope>
import right_userInfo_edit from './right_userInfo_edit.vue';

export default {
    name: 'right_userIntro',
    components: {
        right_userInfo_edit
    },
    data() {
        return {
            dialogFormVisible: false,
        }
    },
    props: {
        userInfo: {},
    },
    mounted() {

    },
    methods: {
        dialoguserInfoeditVisible() {
            this.dialogFormVisible = true;
            // 延迟回调
            this.$nextTick(() => {
                this.$refs.opendia.open();
            });
        }
    }
}
</script>
<style scoped>
.el-descriptions /deep/ th.my-label {
    background: #E1F3D8;
}

.el-descriptions /deep/ td.my-content {
    background: #FDE2E2;
}
</style>