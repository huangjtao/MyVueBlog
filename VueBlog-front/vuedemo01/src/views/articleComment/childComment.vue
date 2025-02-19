<template>
	<div style="background-color: aliceblue;padding-top: 5px;">
		<div class="comment-line-box" v-for="(childComment, indexj) in childComments" :key="indexj">
			<div class="comment-list-item" style="display: flex;">
				<el-avatar icon="el-icon-user-solid" :size="50" style=""
					:src="childComment.commentAuthorAvatar == null ? avatarImg : childComment.commentAuthorAvatar"></el-avatar>
				<div class="right-box" style="flex: 9;position: relative;padding-left: 10px;">
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
									<span style="margin-left: 3px;"
										@click="showReplayComm(indexj, childComment.commentId, childComment.commentAuthorName, 1)">回复</span>
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
			<!-- 评论回复输入框 -->
			<div :class="'reply-comment-isShow' + indexj" v-if="replyMap[indexj]"
				style="padding-top: 2px;padding-bottom: 2px;display: flex;align-items: center;">
				<div style="display: flex;align-items: center;width: 70%;">
					<el-avatar :size="30"
						:src="childComment.commentAuthorAvatar == null ? avatarImg : childComment.commentAuthorAvatar"
						:fit="fit">
					</el-avatar>
					<el-input v-model="articleReplyCominput" placeholder="请输入内容"
						style="margin-left: 10px;margin-right: 10px;"></el-input>
				</div>
				<div style="width: 30%;display: flex;align-items: center;flex-wrap: wrap;">
					<el-button type="success" @click="SendReplyComm(childComment, indexj)">发表评论</el-button>
					<el-button type="success" @click="cancelReply(indexj)">取消</el-button>
				</div>
			</div>
			<!-- <replay :rootParentId="rootParentId" :comment="childComment" :showReplay="showReplay" :blogId="blogId"
				:getCommentList="getCommentList" style="margin-top: 5px;"></replay> -->
			<!-- 嵌套递归 -->
			<!-- <child :childComments="childComment.child" :parentComment="childComment" :blog="blog"
				:rootParentId="rootParentId" :getCommentList="getCommentList"></child> -->
			<reply :childComments="childComment.reply" :parentComment="childComment" :rootParentId="rootParentId"
				:userInfo="userInfo">
			</reply>
		</div>
	</div>
</template>

<script>
import reply from '../../views/articleComment/childComment.vue'
export default {
	name: "reply",
	components: {
		reply
	},
	data() {
		return {
			showReplay: false,
			avatarImg: require("../../styles/pic/avatar.jpg"),
			fit: 'cover',
			articleReplyCominput: '',  //评论回复输入框内容
			replyMap: [],  //控制第几个回复输入框 显示
			ReplyComment: {},
		}
	},
	props: {
		childComments: [],  //子列表
		parentComment: {}, //父数组
		rootParentId: '',  //父id
		userInfo: {},
	},
	inject: ["parentMethod"],
	methods: {
		deleteComment(comment) {
			const _this = this;
			console.log(JSON.stringify(comment))
			_this.$axios.post('/comment/remove', JSON.stringify(comment), {
				headers: {
					'Content-Type': 'application/json' // 1
				},
			}).then((res) => {
				if (res.data.code == 200) {
					_this.$message({
						message: '删除评论成功',
						type: 'success'
					});
					this.parentMethod();//刷新
				}
			}).catch((err) => {
				console.log(err);
			})
		},

		/**
		 *  回复子级评论  回复按钮点击
		 * @param {*} indexj 第j条评论
		 * @param {*} commentId id   ==》》pid
		 * @param {*} commentAuthorName 回复的那条评论的作者  ==>>pname
		 * @param {*} num 0: 回复文章主评论;  1:文章主评论的回复，再去回复
		 */
		showReplayComm(indexj, commentId, commentAuthorName, num) {
			console.log("回复子评论", indexj, commentId, commentAuthorName, num);
			this.$set(this.replyMap, indexj, true)
			console.log("显示回复输入框:", this.replyMap[indexj]);

			this.ReplyComment.commentPid = commentId;
			this.ReplyComment.commentPname = commentAuthorName;

		},

		/**
			*  发表回复评论  评论回复  执行回复操作
			* @param {*} indexi  
			* @param {*} indexj 
			*/
		SendReplyComm(childComment, indexj) {
			// 在这里执行评论回复插入数据库，然后返回成功，则隐藏输入框
			// 如果返回失败，则弹窗提示评论失败，不隐藏评论框
			console.log("发表评论:", indexj)

			let commentRole = 0;
			if (this.userInfo.userUid == childComment.commentAuthorId) {
				commentRole = 1;
			}
			let articleId = childComment.commentArticleId;
			this.ReplyComment.commentArticleId = articleId;
			this.ReplyComment.commentContent = this.articleReplyCominput;//评论内容
			this.ReplyComment.commentAuthorId = this.userInfo.userUid;
			this.ReplyComment.commentAuthorName = this.userInfo.userName;
			this.ReplyComment.commentAuthorEmail = this.userInfo.userEmail;
			this.ReplyComment.commentAuthorUrl = this.userInfo.userIntro;
			this.ReplyComment.commentAuthorAvatar = this.userInfo.userAvatar;
			this.ReplyComment.commentRole = commentRole//0：其它用户； 1：楼主（文章作者）
			this.$axios.post('/comment/artMainComment', this.ReplyComment).then((res) => {
				if (res.data.code == 200) {
					this.$message({
						message: '评论成功',
						type: 'success'
					});
					this.parentMethod();//刷新
					this.$set(this.replyMap, indexj, false);//隐藏评论框
				}
			}).catch((err) => { console.log(err) })

		},

		//取消回复
		cancelReply(indexj) {
			// if (index !== 0) {
			this.$set(this.replyMap, indexj, false)
			// }
			console.log("取消回复:", indexj);
			//this.showFlag = false;
		},


	}
}
</script>
