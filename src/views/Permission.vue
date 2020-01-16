<template>
	<div class="pm-container">
		<div class="pm-search">
			<input type="text" placeholder="权限名称" class="pm-search-input cd-mar-right">
			 <el-select v-model="value" placeholder="请选择" >
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			  <button class="pm-search-btn cd-font-white-color cd-bg-blue-color">刷新</button>
			  <button class="pm-search-btn cd-font-white-color cd-bg-blue-color">查询</button>
			  <button class="pm-search-btn cd-font-white-color cd-bg-blue-color" @click="zhezhaoVisible = true">新增</button>
		</div>
		<div class="pm-content">
			<div class="pm-permission" v-for="(item, index) in menuPermission" :key="index">
				<div class="cd-df-bt cd-mar-top" v-if="">
					<p class="col-6">
							<i class="iconfont" v-if="item.childList.length!=0">&#xe652;</i>
					{{item.name}}</p>
					<p class="pm-operation col-6">
						<span>添加子菜单</span>
						<span>编辑</span>
						<span @click="del_permission(item.id)">删除</span>
					</p>
				</div>
				<div class="cd-df-bt cd-mar-top pm-permission-child" v-for="(item1, index) in item.childList" :key="index"  v-if="">
					<p class="col-6"><i class="iconfont" v-if="false">&#xe652;</i> {{item1.name}}</p>
					<p class="pm-operation col-6">
						<span>添加子菜单</span>
						<span>编辑</span>
						<span @click="del_permission(item1.id)">删除</span>
					</p>
				</div>
			</div>
		</div>
        <div class="zhezhao1" v-if="zhezhaoVisible">
			
		</div>
		<div class="zhezhao" v-if="zhezhaoVisible">
			<p class="pm-add-top cd-df-bt">
				<span></span>
				<span @click="zhezhaoVisible = false">
					<i class="iconfont">&#xe603;</i>
				</span>
			</p>
			<p class="pm-add-mar-top cd-df-bt">
				<span>父ID: <input v-model="parentId" type="text" class="pm-search-input" placeholder="顶级" id="pmAdd"></span>
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
			<p  class="pm-add-mar-top">排序</p>
			<p><input class="pm-add-input"  v-model="permissionSort" type="text" id="pmAdd"></p>
			<p class="cd-df-bt pm-add-bottom">
				<span></span>
				<span>
					<button class="pm-add-btn cd-mar-right" @click="zhezhaoVisible = false">取消</button>
					<button class="pm-add-btn cd-font-white-color cd-bg-blue-color" @click="post_permission">提交</button>
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
				          value: '选项1',
				          label: '全部'
				        }, {
				          value: '选项2',
				          label: '禁用'
				        }, {
				          value: '选项3',
				          label: '正常'
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
						zhezhaoVisible: false,
						permissionName: '',
						permissionSort: '',
						permissionStatus: '',
						permissionTitle: '',
						permissionIcon: '',
						permissionCode: '',
						permissionRouterUrl: '',
						permissionType: '',
						parentId: '',
						radio: '1',
						menuPermission: [],
						active: false
			}
		},
		
		created() {
			this.get_permission()
		},
		
		methods: {
			post_permission(){
				this.axios({
					method: 'post',
					url: this.GLOBAL.baseUrl + '/pm/post', //后端api
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
					          message: '添加成功',
					          type: 'success',
							  duration: '1000'
					        });
					document.getElementById('pmAdd').value='';
					this.get_permission()
				});
			},
			
			del_permission(id){
				this.axios({
					method: 'delete',
					url: this.GLOBAL.baseUrl + '/pm/d/' + id
				}).then(res=>{
					this.get_permission()
				})
			},
			
		    get_permission(){
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl + '/pm',
				}).then(res=>{
					console.log(res.data.data)
					this.menuPermission = res.data.data;
				})
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
	}
	
	.pm-search-input {
		min-width: 200px;
		height: 40px;
		border: 1px solid rgb(205, 208, 214);
		outline: none;
		padding: 0 10px;
		border-radius: 5px;
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
</style>
