<template>
	<div class="pm-container">
		<div class="pm-search">
			<input type="text" placeholder="权限名称" class="pm-search-input cd-mar-right" v-model="searchName">
			 <el-select v-model="value" placeholder="请选择" >
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			  <button class="pm-search-btn cd-font-white-color cd-bg-blue-color">刷新</button>
			  <button class="pm-search-btn cd-font-white-color cd-bg-blue-color" @click="search_permission()">查询</button>
			  <button class="pm-search-btn cd-font-white-color cd-bg-blue-color" @click="addpermission">新增</button>
		</div>
		<div class="pm-content">
			<div class="pm-form">
			<p class="cd-df-bt pm-title-padding">
				<span class="form-position">权限名称</span>
				<span>操作</span>
			</p>
			</div>
		<div class="block">
					    <el-tree
					      :data="data"
					       default-expand-all 
					       :filter-node-method=filterNode node-key="id" 
					       @check-change="getNodeData"
					      ref="tree" highlight-current 
					      :props="defaultProps
					      ">
					      <span  class="custom-tree-node pm-el-childMenu" slot-scope="{ node, data }">
					        <span>{{ node.label }}</span>
					        <span class="el-tree-span">
								<span @click="post_childMenu(data.id)">添加子菜单</span><!-- post_childMenu(data.id) -->
								<span @click="updata_permission(data)">编辑</span>
								<span @click="del_permission(data.id)">删除</span>
					        </span>
					      </span>
					    </el-tree>
					  </div>
			
		</div>
        
		
		<div class="zhezhao" v-if="zhezhaoVisible">
			<p class="pm-add-top cd-df-bt">
				<span></span>
				<span @click="zhezhaoVisible = false">
					<i class="iconfont">&#xe603;</i>
				</span>
			</p>
			<p class="pm-add-mar-top cd-df-bt">
				<span>类型
				 <el-select v-model="permissionType" placeholder="请选择">
				    <el-option
				      v-for="item in types"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</span>
				<span>父ID: <input v-model="parentId" type="text" class="pm-search-input" placeholder="顶级" id="pmAdd"></span>
			</p>
			<p  class="pm-add-mar-top">权限名</p>
			<p><input class="pm-add-input" v-model="permissionName" type="text" id="pmAdd"></p>
			<p  class="pm-add-mar-top" >权限路由</p>
			<p><input class="pm-add-input" v-model="permissionRouterUrl" type="text" id="pmAdd"></p>
			<p  class="pm-add-mar-top cd-df-bt" >
				<span>
				<span class="cd-mar-right">状态</span> 
				<el-radio v-model="permissionStatus" label="true">进行中</el-radio>
				  <el-radio v-model="permissionStatus" label="false">禁用</el-radio>
				  </span>
				  <span class="cd-df-left-start">
					  <span>权限标识码：</span>
				<input v-model="permissionCode" type="text" class="pm-search-input" placeholder="权限标码" id="pmAdd">
				  </span>
				</p>
				<p class="pm-add-mar-top">权限图标</p>
				<p>
					<input v-model="permissionIcon" type="text" class="pm-add-input" placeholder="权限图标" id="pmAdd">
					</p>
			<p><input class="pm-add-input"  v-model="permissionSort" type="text" id="pmAdd"></p>
			<p class="cd-df-bt pm-add-bottom">
				<span></span>
				<span>
					<button class="pm-add-btn cd-mar-right" @click="zhezhaoVisible = false">取消</button>
					<button class="pm-add-btn cd-font-white-color cd-bg-blue-color" @click="post_permission()()">提交</button>
				</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				  options: [{
						        value: '0',
						        label: '菜单权限'
						      }, {
						        value: '1',
						        label: '按钮权限'
						      }, {
						        value: '2',
						        label: '目录权限'
						      }],
						types: [{
						        value: '0',
						        label: '菜单权限'
						      }, {
						        value: '1',
						        label: '按钮权限'
						      }, {
						        value: '2',
						        label: '目录权限'
						      }],
				        value: '',
						searchName:'',
						zhezhaoVisible1: false,
						zhezhaoVisible: false,
						permissionName: '',
						permissionStatus: '',
						permissionTitle: '',
						permissionIcon: '',
						permissionCode: '',
						permissionRouterUrl: '',
						permissionType: '',
						parentId: '',
						radio: '1',
						menuPermission: [],
						active: false,
						permissionJudge: '',
						permissionMenu:false,
						filterText:'',
						data : [],
										 defaultProps: {
										          children: 'childList',
										          label: 'name'
										        }
						
			}
		},
		created() {
			this.get_permission()
		},
		
		watch:{
			searchName(val) {
				this.$refs.tree.filter(val);
			}
		},
		
		methods: {
			search_permission(){
				alert(this.searchName)
				this.axios({
					method:'post',
					url:this.GLOBAL.baseUrl + '/g/b/pm/',
					data:{
						    "fieldList": "this.searchName"
					}
				}).then(res=>{
					this.data = res.data.data
					console.log(this.data)
				})
			},
			
			getNodeData(){
				let arr = this.$refs.tree.getCheckedNodes()
				for(var i=0;i<this.$refs.tree.getCheckedNodes().length;i++){
					  this.data.splice(i,1,arr[i].id)
					}
				},
			
			filterNode(value, data) {
				if (!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			
			// 新增权限
			post_permission(){
				if(this.permissionJudge == 1){
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/u/pm', //后端api
						data: {
							"parentId": this.parentId,
							"name": this.permissionName,
							"icon": this.permissionIcon,
							"permissionCode": this.permissionCode,
							"routerUrl": this.permissionRouterUrl,
							"sort": this.permissionSort,
							"status": this.permissionStatus,
							"type": this.permissionType
						}
					}).then(res => {
						this.$message({
						          message: '修改成功',
						          type: 'success',
								  duration: '1000'
						        });
								this.zhezhaoVisible1 = false;
						document.getElementById('pmAdd').value='';
						this.get_permission()
					});
				} else if(this.permissionJudge == 0){
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/p/pm', //后端api
					data: {
						"parentId": this.parentId,
						"name": this.permissionName,
						"icon": this.permissionIcon,
						"permissionCode": this.permissionCode,
						"routerUrl": this.permissionRouterUrl,
						"status": this.permissionStatus,
						"type": this.permissionType
						
					}
				}).then(res => {
					this.$message({
					          message: '添加成功',
					          type: 'success',
							  duration: '1000'
					        });
							this.zhezhaoVisible = false;
					document.getElementById('pmAdd').value='';
					this.get_permission()
				});
				}
			},
			//删除指定权限
			del_permission(id){
				this.axios({
					method: 'delete',
					url: this.GLOBAL.baseUrl + '/d/pm/' + id
				}).then(res=>{
					this.get_permission()
				})
			},
			//树形底层展开
			pmMenu(index){
							this.flags.splice(index,1,!this.flags[index])
						},
			//查询全部菜单权限
		   get_permission(){
		   				this.axios({
		   					method: 'get',
		   					url: this.GLOBAL.baseUrl,
		   				}).then(res=>{
		   					this.data = res.data.data
							for(var i = 0; i < res.data.data.length; i++){
								this.data.splice(i,1,res.data.data[i])
							}
							console.log(this.data)
		   				})
		   			},
			addpermission(){
				   this.zhezhaoVisible = true;
				   this.permissionJudge = 0;
					},
		   	// 添加子类菜单
			post_childMenu(id){
				this.permissionJudge = 0;
				this.zhezhaoVisible = true;
				this.parentId = id;
			},
			//修改权限
			updata_permission(data){
				console.log(data)
				this.permissionJudge = 1;
				this.zhezhaoVisible = true;
				this.parentId=data.id;
				this.permissionName=data.name;
				this.permissionType=data.type;
				this.permissionCode = data.permission_code
				this.permissionRouterUrl=data.routerUrl;
				this.permissionStatus=data.status;
				this.permissionIcon = data.icon
			},
			
			load_child_menu(){
				this.active = true
			}
		}
	}
</script>

<style scoped>
	.pm-container {
		width: 100%;
		height: 80px;
	}
	
	.pm-search {
		margin-top: 20px;
		padding: 0 20px;
		height: 60px;
		border-bottom:1.5px solid rgb(231, 234, 239) ;
	}
	.pm-form{
		padding: 20px;
		border-bottom:1.5px solid rgb(231, 234, 239) ;
	}
	.pm-search-input {
		min-width: 200px;
		height: 40px;
		border: 1px solid rgb(205, 208, 214);
		outline: none;
		padding: 0 10px;
		border-radius: 5px;
	}
	.pm-title-padding{
		padding: 0 70px;
	}
	
	.pm-el-childMenu {
		display: inline-block;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.el-tree-span {
			padding-right: 40px;
		}
		
		.el-tree-span span {
			margin-right: 10px;
		}
	
	    .el-tree {
			font-size: 16px;
			width: 100%;
			margin: 20px 10px;
		}
	
	.pm-content {
		margin-top: 20px;
		padding: 0 20px;
	}
	.form-position{
		margin-left: -65px;
	}
	.pm-change {
		transition: all 0.2s;
	}
	.braketsChange {
	    transform: rotate(90deg);
	}
	.zhezhao1 {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0, 0.5);
		z-index: 100;
	}
	
	.zhezhao {
		position: absolute;
		top: 5%;
		left: 10%;
		width: 80%;
		height: 90%;
		z-index: 1000;
		background-color: white;
		box-shadow: 2px 1px 3px #B5B5B5;
		padding: 0 10px;
	}
	
	.pm-search-btn {
		width: 60px;
		height: 40px;
		border: none;
		margin-left: 5px;
	}
	
	.pm-permission {
		margin-top: 20px;
		padding: 0 20px;
	}
	
	.pm-operation span {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		
	}
	
	.pm-permission-child {
		margin-left: 20px;
	}
	
	.pm-add-top {
		margin-top: 10px;
		padding: 0 10px;
	}
	
	.pm-add-input {
		width: 100%;
		height: 40px;
		border-radius: 5px;
		border: 1px solid #d3d6db;
		margin-top: 10px;
		outline: none;
	}
	
	.pm-add-mar-top {
		margin-top: 30px;
	}
	
	.pm-add-bottom {
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
	
	.pm-add-btn {
		width: 80px;
		height: 40px;
		border-radius: 5px;
		border: 1px solid #d3d6db;
	}
	
	.el-tree-node{
		font-size: 26px;
	}
 
 
</style>
