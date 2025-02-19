<template>
    <div>
        <el-dialog title="信息修改" :visible.sync="dialogFormVisible" width="60%" :before-close="handleClose"
            :modal-append-to-body='false' :append-to-body="true">
            <el-form :model="form" :rules="rules">
                <div class="updateInfo">
                    <div class="updateInfo-left">
                        <el-form-item label="头像" :label-width="formLabelWidth">
                            <img :src="imageUrl == '' ? userInfo.userAvatar : imageUrl" class="avatar">
                            <div style="display: flex;align-items: center;align-content: center;">
                                <div style="float: left;">
                                    <el-upload class="avatar-uploader" action="" :show-file-list="false"
                                        :auto-upload="false" :on-change="handleSelectFile" ref="upload">
                                        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                                        <i class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                                <div style="margin-left: 20px;">
                                    <el-button size="small" type="danger" icon="el-icon-delete" circle
                                        @click="clearImg"></el-button>
                                </div>
                                <!-- <input type="file" id="name" name="file" required minlength="4" maxlength="8" size="10"
                                    @change="handleSelectFile" /><br> -->
                            </div>
                            <span style="font-size: 12px;">图片建议:不超过2M,并且只允许上传一张图片</span>

                        </el-form-item>
                        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                            <el-input v-model="userInfo.userNickname" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userEmail" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="userInfo.password" autocomplete="off"></el-input>
                        </el-form-item> -->
                        <el-form-item label="电话" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userPhone" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <!-- <el-switch v-model="userInfo.userSex" active-color="#13ce66" inactive-color="#ff4949"
                                active-text="男" inactive-text="女" :active-value="男" :inactive-value="女">
                            </el-switch> -->
                            <el-select v-model="userInfo.userSex" placeholder="请选择">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="1"></el-option>
                            </el-select>
                        </el-form-item>


                    </div>
                    <div class="updateInfo-right">
                        <el-form-item label="UID" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userUid" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userName" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="生日" :label-width="formLabelWidth">
                            <el-date-picker v-model="userInfo.userBirthday" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="地址" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userAddress" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="个性签名" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userIntro" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="职业" :label-width="formLabelWidth">
                            <el-input v-model="userInfo.userJob" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好" :label-width="formLabelWidth">
                            <el-select v-model="userInfo.userInterest" multiple filterable allow-create placeholder="请选择">
                                <!-- <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option> -->
                                <el-option label="篮球" value="篮球"></el-option>
                                <el-option label="唱跳" value="唱跳"></el-option>
                            </el-select>
                            <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUseInfo">更 新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'right_userInfo_edit',

    data() {
        return {
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '80px',

            rules: {
                // nickname: [
                //     { required: true, message: "昵称不能为空", trigger: "blur" },
                // ],
                // password: [
                //     { required: true, message: "密码不能为空", trigger: "blur" },
                // ],
            },

            // 头像显示
            imageUrl: '',
            imgInfo: '',

        };
    },
    props: {
        userInfo: {},
    },
    mounted() {
    },
    methods: {
        open() {
            this.dialogFormVisible = true;
        },
        handleClose(done) {
            //防止填写时误触关闭，给予关闭提示
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    this.dialogFormVisible = false;
                })
                .catch(_ => { });
        },
        // 头像图片显示，放大
        handleSelectFile(file) {
            this.imgInfo = file.raw;
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(file);
            console.log("file=", this.imageUrl);
        },
        clearImg() {
            this.imageUrl = '';
        },

        //更新个人信息
        updateUseInfo() {
            var param = {
                pUser: JSON.stringify(this.userInfo),
                img: this.imgInfo
            }
            this.$axios.post("/admin/user/update", param, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                if (res.data.code == "200") {
                    this.$message({
                        message: "更新成功",
                        type: "success"
                    });
                    this.userInfo = res.data.data;
                    this.$store.commit("SET_USERINFO", this.userInfo);
                }
                else {
                    this.$message({
                        message: "更新失败",
                        type: "error"
                    });
                }
            }).catch((err) => { console.log(err); })
        }
    },
};
</script>
<style scoped>
.updateInfo {
    height: 350px;
    overflow: auto;
}

.updateInfo-left {
    /* width: 330px; */
    float: left;
    width: 50%;
}

.updateInfo-right {
    /* overflow: hidden; */
    /* margin-left: 20px; */
    float: right;
    width: 50%;
}

.avatar-uploader {
    height: 30px;
}

.avatar-uploader /deep/ .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 30px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 30px;
}

.avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}

.avatar {
    width: 180px;
    height: 150px;
    display: block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}
</style>