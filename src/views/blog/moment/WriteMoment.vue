<template>
	<div>
		<el-form :model="form" label-position="top">
			<el-form-item label="动态内容" prop="content">
				<mavon-editor
            v-model="form.content"
            class="md"
            ref="md"
            @imgAdd="imgAdd"
        />
			</el-form-item>

			<el-form-item label="点赞数" prop="likes" style="width: 50%">
				<el-input v-model="form.likes" type="number" placeholder="可选，默认为 0"></el-input>
			</el-form-item>

			<el-form-item label="创建时间" prop="createTime">
				<el-date-picker v-model="form.createTime" type="datetime" placeholder="可选，默认此刻" :editable="false"></el-date-picker>
			</el-form-item>

			<el-form-item style="text-align: right;">
				<el-button type="info" @click="submit(false)">仅自己可见</el-button>
				<el-button type="primary" @click="submit(true)">发布动态</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import Breadcrumb from "@/components/Breadcrumb";
  import {getMomentById, saveMoment, updateMoment, upload} from "@/api/moment";
  import axios from "axios";
	export default {
		name: "WriteMoment",
		components: {Breadcrumb},
		data() {
			return {
				form: {
					content: '',
					createTime: null,
					likes: 0,
					published: false
				},
			}
		},
		created() {
			if (this.$route.params.id) {
				this.getMoment(this.$route.params.id)
			}
		},
		methods: {
      imgAdd(pos, $file) {
        let formdata = new FormData()
        formdata.append('pic', $file)
        axios({
          headers: {'Content-Type': 'multipart/form-data',},// 设置传输内容的类型和编码
          withCredentials: true,// 指定某个请求应该发送凭据
          url: '/apis/moment/upload',
          method: 'POST',
          data: formdata
        }).then(res => {
          this.$refs.md.$img2Url(pos, res.data.data);
        });
      },
			getMoment(id) {
				getMomentById(id).then(res => {
					this.form = res.data
				})
			},
			submit(published) {
				this.form.published = published
				if (this.$route.params.id) {
					updateMoment(this.form).then(res => {
						this.msgSuccess(res.msg)
						this.$router.push('/blog/moment/list')
					})
				} else {
					saveMoment(this.form).then(res => {
						this.msgSuccess(res.msg)
						this.$router.push('/blog/moment/list')
					})
				}
			}
		}
	}
</script>

<style scoped>

</style>