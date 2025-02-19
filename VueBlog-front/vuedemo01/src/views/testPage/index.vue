<!-- 测试页面，用于做各种页面测试 -->
<template>
    <!-- <el-card class="box-card" style="height:100%;width: 100%;">

        <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="upload" :limit="1"
            :on-change="uploadFliePic">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <img style="height: 100px;width: 100px;" :src="picUrl" />
    </el-card> -->
    <div style="background-color: antiquewhite; padding: 5px;">
        <div class="comment-line-box" v-for="(childComment, indexj) in childComments" :key="indexj">
            <div class="comment-list-item" style="display: flex;">
                <el-avatar icon="el-icon-user-solid" :size="50" style=""
                    :src="childComment.commentAuthorAvatar"></el-avatar>
                <div class="right-box" style="flex: 9;position: relative;padding: 8px;">
                    <div class="new-info-box clearfix">
                        <div class="comment-top">
                            <div class="user-box" style="padding: 2px;">
                                <span class="comment-name" style="font-weight: 800;">{{ childComment.commentAuthorName
                                }}</span>
                                <el-tag size="mini" type="danger" v-if="childComment.commentRole == 1"
                                    style="margin-left: 5px;">作者</el-tag>
                                <div class="opt-comment" style="float: right;cursor: pointer;top:10px;">
                                    <i class="el-icon-delete"></i>
                                    <span style="margin-left: 3px;" @click="deleteComment(childComment)">删除</span>
                                    <i class="el-icon-chat-round" style="margin-left: 10px;"></i>
                                    <span style="margin-left: 3px;" @click="showReplay = !showReplay">回复</span>
                                </div>
                                <br>
                                <span class="date">{{ childComment.commentCreateTime }}</span>

                            </div>

                        </div>
                        <div class="comment-center" style="padding-top: 5px;line-height: 1.5;">
                            <div class="new-comment"><span class="comment-name" style="font-weight: 800;">
                                    {{ childComment.commentAuthorName }}</span>
                                回复
                                <span class="nick-name" style="font-weight: 800;">{{
                                    childComment.commentPname }}</span>：
                                {{ childComment.commentContent }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 回复框 -->
            <!-- <replay :rootParentId="rootParentId" :comment="childComment" :showReplay="showReplay" :blogId="blogId"
			:getCommentList="getCommentList" style="margin-top: 5px;"></replay> -->
            <!-- 嵌套递归 -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,

            picUrl: '/static/img/avatar.jpg',

            imagesFiles: [],
            childComments: [{
                commentPname: 'admin',
                commentAuthorAvatar: '',
                commentAuthorName: 'hhhh',
                commentCreateTime: '2023-07-05 21:23:05',
                commentContent: '我是来打酱油的dvakjkjagkdjvibavodI哦HI海力风电不够温柔我好是哦我背后 帮我模范和购物   IOWHBRO黄狗然后后凑我'
            }],
        };
    },
    methods: {
        handleRemove(file) {
            console.log(file);
            let fileList = this.$refs.upload.uploadFiles;
            let index = fileList.findIndex(fileItem => { return fileItem.uid === file.uid });
            fileList.splice(index, 1);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        uploadFliePic(file) {
            console.log(file);
            this.picUrl = file.url;
        }
    }
}
</script>