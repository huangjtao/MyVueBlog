<template>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" center :close-on-click-modal="false" append-to-body>
        <el-form>
            <el-form-item prop="password">
                <span style="font-weight: 600;">
                    Previous Password
                </span>
                <el-input type="password" ref="password" v-model="form.password_old" autocomplete="off" clearable
                    show-password>
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <span style="font-weight: 600;">
                    New Password
                </span>
                <el-input type="password" ref="password" v-model="form.password_new" autocomplete="off"
                    @keyup.enter.native="handleChangePass" clearable show-password>
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleChangePass">修 改</el-button>
        </div>
    </el-dialog>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue'

export default {
    name: 'userInfoUpdate',
    components: {
        navbar
    },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                userName: '',
                password_old: '',
                password_new: '',
            }
        }
    },

    methods: {
        init(userName) {
            this.dialogFormVisible = true;
            this.form.userName = userName;
        },

        //处理修改密码业务
        handleChangePass() {
            var param = {
                userName: this.form.userName,
                password_old: this.form.password_old,
                password_new: this.form.password_new

            }
            //首先先验证修改前的密码是不是正确的，正确才能修改，否则不可以
            this.$axios.post("/admin/user/updateUserPass", param).then((res) => {
                if (res.data.code == "200") {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                    this.dialogFormVisible = false;
                }
                else if (res.data.code == "1013") {
                    this.$message({
                        message: "修改前的密码不正确",
                        type: "error"
                    });
                }
                else {
                    this.$message({
                        message: "修改失败",
                        type: "error"
                    });
                }
            }).catch((err) => { console.log(err) })
        }

    }

}

</script>