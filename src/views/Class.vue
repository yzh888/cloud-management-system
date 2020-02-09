<template>
	<div>
		<div class="us-search cd-df-start">

			<el-input placeholder="请输入内容" v-model="class_search" class="input-with-select">
				<el-select v-model="search_select" slot="prepend" placeholder="请选择">
					<el-option label="班课名" value="1"></el-option>
					<el-option label="班课邀请码" value="2"></el-option>
				</el-select>
			</el-input>

			<button class="us-search-btn cd-font-white-color cd-bg-green-color cd-mar-sm-top cd-cursor" @click="search_class()">搜索</button>
			<button class="us-search-btn cd-font-white-color cd-bg-orange-color cd-mar-sm-top">重置</button>
		</div>
		<div>
			<div class="cd-df-left-start cl-bottom cl-padding">

				<button class="us-search-btn cd-font-white-color cd-bg-blue-color cd-mar-sm-top  cd-mar-right cd-cursor">
					<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe76c;</i>修改
				</button>
				<button class="us-search-btn cd-font-white-color cd-bg-red-color cd-mar-sm-top  cd-mar-right cd-cursor" @click="delete_class()">
					<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe601;</i>删除
				</button>

			</div>
			<div class="cl-bottom">
				<el-table ref="multipleTable" :data="classData.slice(minSize,maxSize)" tooltip-effect="dark" @selection-change="get_tabel_information">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="用户昵称" width="190">
						<template slot-scope="scope">{{ scope.row.nickname }}</template>
					</el-table-column>
					<el-table-column prop="name" label="班课名称" width="170">
					</el-table-column>
					<el-table-column prop="" label="状态" width="170">
						<template slot-scope="scope">
							<div class="cd-df">
								<el-switch @change="updataStatus(scope.row)" v-model="scope.row.status" :active-value="1" :inactive-value="0"
								 active-color="#13ce66" inactive-color="#ff4949">
								</el-switch>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="invitation_code" label="邀请码" width="170">
					</el-table-column>
					<el-table-column prop="faculty" label="院系" width="170">
					</el-table-column>
					<el-table-column prop="school" label="学校" width="170">
					</el-table-column>
					<el-table-column label="操作" show-overflow-tooltip>
						<template slot-scope="scope">
							<div class="cd-df">
								<button type="primary" class="cd-df-center cd-bg-blue-color cd-del-border cd-mar-right ca-btn cd-cursor">
									<img class="cl-btn" src="../assets/image/bianji.png" alt="" @click="updateClass(scope.row)">
								</button>
								<button type="primary" class="cd-df-center cd-bg-red-color cd-del-border ca-btn cd-cursor">
									<img class="cl-btn" src="../assets/image/delete.png" alt="" @click="delete_single_class(scope.row.id)">
								</button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog title="修改班课" :visible.sync="dialogFormVisible">
				<div class="us-add ">
					<p class="cd-df-au cd-mar-top cd-mar-bottom">
						<span>用户昵称
							<input type="text" v-model="nickname" class="cl-mar-right" :disabled="true" id="classAdd">
						</span>
						<span>班课名称
							<input type="text" v-model="name" class="cl-mar-lg-right" id="classAdd">
						</span>
					</p>

					<p class="cd-df-au cd-mar-top cd-mar-bottom">
						<span>学校
							<input type="text" v-model="school" class="cl-mar-left" id="classAdd">
						</span>
						<span>院系
							<input type="text" v-model="faculty" class="cd-mar-left" id="classAdd">
						</span>
					</p>

					<p class="cd-df-bt cd-mar-top cd-mar-bottom cl-padding">
						<span>邀请码
							<input type="text" v-model="invitation_code" id="classAdd">
						</span>
						<span class="cd-col-6 cl-padding">状态
							<el-radio v-model="status" label="false">禁用</el-radio>
							<el-radio v-model="status" label="true">激活</el-radio>
						</span>
					</p>

				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible=false">取 消</el-button>
					<el-button type="primary" @click="post_class()">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<div>
			<div class="cd-df-left-start cd-mar-top cd-width cl-padding" >
				<span class="cd-mar-right">共{{this.classData.length}}条</span>
				<button :disabled="page==1" @click="up()" class="cd-df-center cl-jiantou-btn">
				<img src="../assets/image/jiankuohao.png" class=" cd-direction"  >
				</button>
				<span class="cd-mar-left cd-mar-right">{{page}}</span>
				<button :disabled="page==2" @click="next()()" class="cd-df-center cl-jiantou-btn">
				<img src="../assets/image/jiankuohao.png">
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				minSize:'0',
				maxSize:'10',
				search_select: '',
				classId: '',
				nickname: '',
				name: '',
				school: '',
				faculty: '',
				invitation_code: '',
				status: '1',
				creator_id: '',
				class_type: '',
				classes: [],
				search: '',
				class_search: '',
				classData: '',
				dialogFormVisible: false,
				multipleSelection: [],
				idList: '',
				data: '',
				search_field: '',
				search_id: '',
				class_status: 0,
				page: 1
			}
		},
		created() {
			this.get_class()
		},
		methods: {
			up(){
				this.page = this.page - 1;
				this.minSize = this.minSize - 10;
				this.maxSize = this.maxSize - 10
			},
			next(){
				this.page = this.page + 1;
				this.minSize = this.minSize + 10
				this.maxSize = this.maxSize + 10
			},
			updateClass(classData) {
				console.log(classData)
				this.classId = classData.id
				this.dialogFormVisible = true
				this.nickname = classData.nickname
				this.name = classData.name
				this.school = classData.school
				this.invitation_code = classData.invitation_code
				this.faculty = classData.faculty
				if (classData.status == 1) {
					this.status = "true"
				} else {
					this.status = "false"
				}
			},
			//状态修改快捷按钮
			updataStatus(row) {
				if (row.status == 1) {
					this.$confirm('此操作将"启用"' + row.name, ' 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.axios({
							method: 'put',
							url: this.GLOBAL.baseUrl + '/p/class',
							data: {
								"id": row.id,
								"name": row.name,
								"school": row.school,
								"faculty": row.faculty,
								"status": row.status,
								"invitationCode": row.invitation_code,
								"creatorId": row.creator_id,
								"classType": row.class_type
							},
						}).then(res => {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.get_class();

						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作',
						});
						row.status = 0;
					});
				} else {
					this.$confirm('此操作将"停用"' + row.name, ' 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.axios({
							method: 'put',
							url: this.GLOBAL.baseUrl + '/p/class',
							data: {
								"id": row.id,
								"name": row.name,
								"school": row.school,
								"faculty": row.faculty,
								"status": row.status,
								"invitationCode": row.invitation_code,
								"creatorId": row.creator_id,
								"classType": row.class_type
							},
						}).then(res => {
							this.$message({
								type: 'success',
								message: '操作成功!'
							});
							this.get_class();
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消操作'
						});
						row.status = 1;
					});
				}
				console.log(row.status)
			},
			//模糊查询班课
			search_class() {
				if (this.search_select == 1) {
					this.search_field = this.class_search
				} else {
					this.search_id = this.class_search
				}
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/g/class/blur',
					data: {
						"field": this.search_field,
						"id": this.search_id
					}
				}).then(res => {
					this.classData = res.data.data
				})
			},
			//修改班课
			post_class() {
				this.axios({
					method: 'put',
					url: this.GLOBAL.baseUrl + '/p/class', //后端api
					data: {
						"id": this.classId,
						"name": this.name,
						"school": this.school,
						"faculty": this.faculty,
						"status": this.status,
						"invitationCode": this.invitation_code,
						"creatorId": this.creator_id,
						"classType": this.class_type
					}
				}).then(res => {
					this.$message({
						message: '修改成功',
						type: 'success',
						duration: '1000'
					});
					this.dialogFormVisible = false;
					document.getElementById('classAdd').value = '';
					this.get_class()
				});
			},
			//删除单个班课
			delete_single_class(id) {
				this.$confirm('此操作将永久删除该班课, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除班课
					this.axios({
							method: 'delete',
							url: this.GLOBAL.baseUrl + '/d/class/',
							data: {
								"fieldList": id
							},
						})
						.then(res => {
							this.$message({
								message: '删除成功',
								type: 'success',
								duration: '1000'
							});
							this.get_class();
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			get_tabel_information(val) {
				this.multipleSelection = val;
			},
			//批量删除
			delete_class() {
				this.$confirm('此操作将永久删除选中班课, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					for (var i = 0, len = this.multipleSelection.length; i < len; i++) {
						this.idList = this.idList + this.multipleSelection[i].id + ","
					}
					console.log(this.idList)
					this.axios({
							method: 'delete',
							url: this.GLOBAL.baseUrl + '/d/class/',
							data: {
								"fieldList": this.idList
							},
						})
						.then(res => {
							this.$message({
								message: '删除成功',
								type: 'success',
								duration: '1000'
							});
							this.get_class();
							this.idList = ''
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			get_class() {
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl + '/g/class',
				}).then(res => {
					this.classData = res.data.data
					console.log(res.data.data)
				})
			}
		}
	}
</script>

<style scoped>
	.cl-mar-left {
		margin-left: 14px;
	}

	.cl-mar-right {
		margin-right: 16px;
	}

	.cl-mar-lg-right {
		margin-right: 23px;
	}

	.cl-btn {
		width: 16px;
		height: 14px;
	}

	.cl-padding {
		padding-left: 20px;
	}

	.el-select {
		width: 130px;
	}

	.input-with-select {
		background-color: #fff;
		width: 40%;
	}

	.cl-bottom {
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 20px;
	}

	.cl-bottom ul {
		padding-left: 60px;
		padding-right: 20px;
	}

	.cl-bottom ul li {
		list-style: none;
		flex: 0 0 14%;
	}

	.custom-tree-node {
		width: 100%;
	}

	.custom-tree-node ul li {
		list-style: none;
		flex: 0 0 14%;
	}

	.ca-btn {
		height: 30px;
		width: 50px;
		border-radius: 5px;
	}
	
	.cl-jiantou-btn {
		width: 20px;
		height: 20px;
		border: none;
		background-color: rgba(0,0,0,0);
		outline: none;
	}
</style>
