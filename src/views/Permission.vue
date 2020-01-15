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
			<div class="pm-permission">
				<div class="cd-df-bt cd-mar-top"  v-if="">
					<p class="col-6"><i class="iconfont">&#xe652;</i>permission-name</p>
					<p class="pm-operation col-6">
						<span>添加子菜单</span>
						<span>编辑</span>
						<span>删除</span>
					</p>
				</div>
				<div class="cd-df-bt cd-mar-top pm-permission-child" v-if="">
					<p class="col-6"><i class="iconfont">&#xe652;</i> permission-name</p>
					<p class="pm-operation col-6">
						<span>添加子菜单</span>
						<span>编辑</span>
						<span>删除</span>
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
			<p class="pm-add-mar-top">父ID <input v-model="parentId" type="text" class="pm-search-input" placeholder="顶级"></p>
			<p  class="pm-add-mar-top" v-model="permissionName">权限名</p>
			<p><input class="pm-add-input" type="text"></p>
			<p  class="pm-add-mar-top" v-model="permissionTitle">权限标题</p>
			<p><input class="pm-add-input" type="text"></p>
			<p  class="pm-add-mar-top" v-model="permissionStatus">
				<span class="cd-mar-right">状态</span> 
				<el-radio v-model="radio" label="1">进行中</el-radio>
				  <el-radio v-model="radio" label="2">禁用</el-radio>
				</p>
			<p  class="pm-add-mar-top" v-model="permissionSort">排序</p>
			<p><input class="pm-add-input" type="text"></p>
			<p class="cd-df-bt pm-add-bottom">
				<span></span>
				<span>
					<button class="pm-add-btn cd-mar-right" @click="zhezhaoVisible = false">取消</button>
					<button class="pm-add-btn cd-font-white-color cd-bg-blue-color">提交</button>
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
				        value: '',
						zhezhaoVisible: false,
						permissionName: '',
						permissionSort: '',
						permissionStatus: '',
						permissionTitle: '',
						parentId: '',
						radio: '1'
			}
		},
		methods: {
			
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
		width: 200px;
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
