<template>
	<div class="re-container">
		<div class="re-search cd-df-left-start">
			<span class="cd-mar-right ">名称</span>
			<input type="text" placeholder="名称" class="cd-mar-right re-search-input">
			<span class="cd-mar-sm-right">标识</span>
			<input type="text" placeholder="标识" class="cd-mar-right re-search-input">
			<button class="cd-mar-right re-search-btn cd-del-border cd-bg-blue-color cd-font-white-color">
				<i class="iconfont cd-mar-sm-right">&#xe628;</i>查询
			</button>
			<button class="re-search-btn cd-del-border">
				<i class="iconfont cd-mar-sm-right">&#xe851;</i>重置
			</button>
		</div>
		<div class="re-content">
			<div class="cd-df-bt">
				<div>
					<el-button class="re-search-btn-plus  " @click="dialogFormVisible = true">
						<i class="iconfont cd-font-white-color cd-sms-font re-position">&#xe75e;</i>新增
					</el-button>
					<el-button class="re-search-btn-minus  " @click="delete_role()">
						<i class="iconfont cd-font-white-color  re-position">&#xe601;</i>删除
					</el-button>
				</div>
				<el-dialog title="新增角色" :visible.sync="dialogFormVisible">
					<el-form :model="form">
						<el-form-item label="角色名称" :label-width="formLabelWidth">
							<el-input v-model="form.name" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="角色标识" :label-width="formLabelWidth">
							<el-input v-model="form.sign" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="permissionManage = false">取 消</el-button>
						<el-button type="primary" @click="post_role()">确 定</el-button>
					</div>
				</el-dialog>

			<el-dialog title="权限详情" :visible.sync="dialogTableVisible1">
			  <el-table :data="gridData">
			    <el-table-column property="role_id" label="角色" width="350"></el-table-column>
			    <el-table-column property="permission[0].name" label="权限"></el-table-column>
			  </el-table>
			</el-dialog>

			<el-tooltip placement="top">
				<div slot="content">【温馨提示】<br />（1）好评</div>
				<el-button class="re-op-tips-btn"><i class="iconfont cd-mar-right re-position">&#xe8f3;</i>操作提示</el-button>
			</el-tooltip>

		</div>
		
		<!-- 分配权限 -->
		<el-dialog title="权限管理" :visible.sync="permissionManage">
				<el-form :model="form">
					<el-input placeholder="请输入关键字搜索" v-model="filterText" class="search-length" clearable>
					</el-input>
					<el-button type="primary" class="checkbox-position" @click="get_dim_role()">搜 索</el-button>
				</el-form>
				<el-tree :data="data"
				show-checkbox
				 default-expand-all 
				 :filter-node-method=filterNode node-key="id" 
				 @check-change="getNodeData"
				ref="tree" highlight-current 
				:props="defaultProps
				">
			  </el-tree>
			  <div slot="footer" class="dialog-footer">
			     <el-button @click="dialogFormVisible = false">取 消</el-button>
			     <el-button type="primary" @click="post_rolePermission()">确 定</el-button>
			   </div>
		</el-dialog>
		
		<div class="cd-col-start">
			<ul class="cd-df-center checkbox-position">
				<li>名称</li>
				<li>标识</li>
				<li>描述</li>
				<li>操作</li>
			</ul>
		</div>
		
		<div v-for="(item,index) in roles" :key="index">
			<ul class="cd-df-center">
				<el-checkbox v-model="checked" :label="item.id" class="checkbox-position-lg"></el-checkbox>
				<li>{{item.name}}</li>
				<li>{{item.code}}</li>
				<li>description</li>
				<li class="cd-font-white-color">
					<span class=" cd-bg-blue-color cd-boder-circle re-click" @click="dialogFormVisible = true"><i class="iconfont">&#xe76c;</i></span>
					<span class="cd-bg-red-color cd-boder-circle re-click"><i class="iconfont " @click="delete_role_single(item.id)">&#xe601;</i></span>
					<span class=" cd-bg-orange-color cd-boder-circle re-click" @click="get_rolePermission(item.id)"><i class="iconfont">&#xe678;</i></span>
					<span class="cd-boder-circle re-click" @click="open_rolePermission_management(item.id)"><i class="iconfont">&#xe609;</i></span>
				</li>
			</ul>
		</div>
		
	</div>
	</div>
</template>

<script>
	let id = 1000;
	export default {
		data() {
			return {
				gridData: '',
			    dialogTableVisible1: false,
				checked: [],
				dialogFormVisible: false,
				permissionManage: false,
				permission: [],
				roles: [],
				form: {
					name: '',
					region: '',
					sign: '',
					remark: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				filterText: '',
				data: [],
				defaultProps: {
					children: 'childList',
					label: 'name'
				},

				formLabelWidth: '100px',
				roleId: ''
			};
		},
		created() {
			this.get_role()
			this.get_permission()
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		methods: {
            getNodeData(){
				let arr = this.$refs.tree.getCheckedNodes()
				for(var i=0;i<this.$refs.tree.getCheckedNodes().length;i++){
					  this.permission.splice(i,1,arr[i].id)
					}
				},
				     
			get_permission() {
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl,
				}).then(res => {
					this.data = res.data.data
				})
			},

			get_role() {
				this.axios({
						method: 'get',
						url: this.GLOBAL.baseUrl + '/g/',
						data: {
							name: this.name,
							code: this.code
						}
					})
					.then(res => {
						for(var i = 0; i < res.data.data.length; i++){
							this.roles.splice(i,1,res.data.data[i])
						}
						
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			
			get_rolePermission(id){
				this.dialogTableVisible1 = true
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl + '/g/rp/' + 2,
				}).then(res =>{
					console.log(res.data.data)
					this.gridData = res.data.data
					console.log(this.gridData)
				})
			},
			
			// 打开角色分配权限界面
			open_rolePermission_management(id){
				this.roleId = id;
				this.permissionManage = true;
			},
			
			// 分配角色权限
			post_rolePermission(){
				for(var i = 0; i < this.permission.length; i++){
				this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/p/rp/',
						data: {
							permissionId: this.permission[i],
							roleId: this.roleId
						}
					})
					.then(res => {
						this.permissionManage = false
						this.$message({
							message: '分配成功',
							type: 'success',
							duration: '1000'
						});
					})
					}
			},
			
			post_role() {
				console.log(this.form.sign)
				console.log(this.form.name)
				this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/p/re',
						data: {
							"code": this.form.sign,
							"name": this.form.name
						}
					})
					.then(res => {
						this.$message({
							message: '添加成功',
							type: 'success',
							duration: '1000'
						});
						// this.get_role()
						this.dialogFormVisible = false
					})
					.catch(function(error) {
					});
			},

			// 树形控件的节点过滤
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},

			/* 删除角色 */
			delete_role() {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除角色
					var len = this.checked.length;
					for (var i = 0; i < len; i++) {
						this.axios({
								method: 'delete',
								url: this.GLOBAL.baseUrl + '/d/re/' + this.checked[i],
							})
							.then(res => {
								this.$message({
									message: '删除成功',
									type: 'success',
									duration: '1000'
								});
							})
					}

					this.get_role()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			
			delete_role_single(id) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除角色
						this.axios({
								method: 'delete',
								url: this.GLOBAL.baseUrl + '/d/re/' + id,
							})
							.then(res => {
								this.$message({
									message: '删除成功',
									type: 'success',
									duration: '1000'
								});
							})
					
			
					this.get_role();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	};
</script>

<style scoped>
	.search-length {
		width: 600px;
	}

	.checkbox-position {
		margin-left: 40px;
	}

	.checkbox-position-lg {
		margin-left: 50px;
	}

	.re-click {
		cursor: pointer;
	}

	.re-search {
		height: 60px;
		padding: 0 20px;
		border-bottom: 1.5px solid rgb(231, 234, 239);
	}

	.re-search-input {
		width: 120px;
		height: 30px;
		border: 1px solid rgb(220, 223, 230);
		border-radius: 5px;
		padding: 0 10px;
		outline: none;
	}

	.re-search-btn {
		width: 80px;
		height: 30px;
		border-radius: 5px;
	}

	.re-search-btn-plus {
		width: 80px;
		height: 40px;
		border-radius: 5px;
		background: rgb(0, 177, 255);
	}

	.re-search-btn-minus {
		width: 80px;
		height: 40px;
		border-radius: 5px;
		background: rgb(245, 108, 108);
	}

	.re-position {
		margin-top: -10px;
		margin-left: -5px;
	}

	.re-op-tips-btn {
		width: 120px;
		height: 40px;
		border-radius: 5px;
		border: 1px solid rgb(220, 223, 230);
		background-color: white;
	}

	.re-content {
		margin-top: 20px;
		padding: 0 20px;
	}

	ul {
		margin-top: 20px;
		width: 100%;
		border-bottom: 1px solid rgb(239, 241, 247);
		height: 40px;
	}

	ul li {
		height: 100%;
		list-style: none;
		flex: 0 0 25%;
		text-align: center;
	}

	li span {
		display: inline-block;
		width: 30px;
		height: 30px;
		margin-right: 10px;
		text-align: center;
		line-height: 30px;
		padding-left: 5px;
	}
</style>
