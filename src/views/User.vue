<template>
	<div class="us-container">
		<div class="us-search cd-df-start">
			<input type="text" placeholder="输入角色名称搜索" class="us-search-input cd-mar-right">
			<input type="text" placeholder="输入用户名称或账号搜索" class="us-search-input cd-mar-right">
			<el-select v-model="value" placeholder="请选择" >
			   <el-option
			     v-for="item in options"
			     :key="item.value"
			     :label="item.label"
			     :value="item.value">
			   </el-option>
			 </el-select>
			 <button class="us-search-btn cd-font-white-color cd-bg-green-color cd-mar-sm-top">刷新</button>
			 <button class="us-search-btn cd-font-white-color cd-bg-orange-color cd-mar-sm-top">重置</button>
		</div>
		<div class="us-content">
			
			<div class="cd-df">
				<div class="cd-col-2" >
					<span class="us-change us-click" :class="{braketsChange:active}">
						<i class="iconfont" @click="roleActive">&#xe652;</i>角色
					</span>
					<div class="cd-col-start menu-position" v-if="role">
						<span>教师</span>
						<span>助教</span>
						<span>学生</span>
					</div>
				</div>
				<div class="cd-col-10">
					<!-- <el-button class="us-search-btn us-btn-add" @click="dialogFormVisible = true">
						<i class="iconfont cd-font-white-color cd-sms-font">&#xe75e;</i>新增
					</el-button> -->
					<div>
					<button class="us-search-btn cd-font-white-color cd-bg-blue-color cd-mar-sm-top us-add-position cd-mar-right" 
					@click="dialogFormVisible = true">
						<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe75e;</i>新增
					</button>
					<button class="us-search-btn cd-font-white-color cd-bg-orange-color cd-mar-sm-top us-add-position cd-mar-right"
					@click="dialogFormVisible = true">
						<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe75e;</i>修改
					</button>
					<button class="us-search-btn cd-font-white-color cd-bg-red-color cd-mar-sm-top us-add-position "
					@click="dialogFormVisible = true">
						<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe75e;</i>删除
					</button>
					</div>
					<div class="cd-col-start">
						<ul class="cd-df-center ">
							<li>用户名</li>
							<li>学号</li>
							<li>性别</li>
							<li>电话</li>
							<li>邮箱</li>
							<li>院系</li>
							<li>状态</li>
							<li>创建日期</li>
							<li>操作</li>
						</ul>
					</div>
					<div v-for="(item,index) in roles" :key="index">
						<ul class="cd-df-center us-record-position" >
							<el-checkbox v-model="checked" :label="item.id"></el-checkbox>
							<li>{{item.name}}</li>
							<li>{{item.code}}</li>
							<li>男</li>
							<li>110120</li>
							<li>123@qq.com</li>
							<li>计算机与软件</li>
							<li>启用</li>
							<li>2020-1-4</li>
							<li class="cd-font-white-color">
								<span class=" cd-bg-blue-color cd-boder-circle re-click" @click="dialogFormVisible = true"><i class="iconfont">&#xe76c;</i></span>
								<span class="cd-bg-red-color cd-boder-circle re-click"><i class="iconfont " @click="delete_role_single(item.id)">&#xe601;</i></span>
							</li>
						</ul>
					</div>
				</div>
				
				<el-dialog title="新增角色" :visible.sync="dialogFormVisible">
					<div class="us-add ">
						<p class="cd-df-au cd-mar-top">
							<span>用户名
							<input type="text" v-model="name" style="margin-right: 16px;">
							</span>
							<span>手机号
							<input type="text" v-model="mobile" style="margin-right: 20px;">
							</span>
						</p>
						
						<p class="cd-df-au cd-mar-top">
							<span>学号
							<input type="text" v-model="jobNumber">
							</span>
							<span>邮箱
							<input type="text" v-model="email">
							</span>
						</p>
						
						<p class="cd-df-au cd-mar-top">
							<span>学校
							<input type="text" v-model="college">
							</span>
							<span>院系
							<input type="text" v-model="department">
							</span>
						</p>
						
						<p class="cd-df-bt cd-mar-top" style="padding-left: 60px;">
							<span class="cd-col-6" style="margin-right: 35px;">性别
							<el-radio v-model="gender" label="1">男</el-radio>
							<el-radio v-model="gender" label="2">女</el-radio>
							</span>
							<span class="cd-col-6">状态
							<el-radio v-model="status" label="1">激活</el-radio>
							<el-radio v-model="status" label="2">禁用</el-radio>
							</span>
						</p>
						<p class="cd-mar-top">
							<span class="cd-col-6  " style="padding-left: 60px;">角色
							 <el-select v-model="value" placeholder="请选择" >
							    <el-option
							      v-for="item in addrole"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							  </span>
						</p>
						
					</div>
					
					
					
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
					</div>
				</el-dialog>
				
				<el-dialog title="修改用户信息" :visible.sync="changeInformation">
					<el-form :model="form">
						<el-form-item label="用户名称" :label-width="formLabelWidth">
							<el-input v-model="form.name" autocomplete="off" class="us-input-sm"></el-input>
						</el-form-item>
						<el-form-item label="用户账号" :label-width="formLabelWidth">
							<el-input v-model="form.sign" autocomplete="off" class="us-input-sm"></el-input>
						</el-form-item>
						<el-form-item label="用户角色" :label-width="formLabelWidth">
						<el-select v-model="value" placeholder="请选择" >
						   <el-option
						     v-for="item in users"
						     :key="item.value"
						     :label="item.label"
						     :value="item.value">
						   </el-option>
						 </el-select>
						 </el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="changeInformation = false">取 消</el-button>
						<el-button type="primary" @click="changeInformation = false">确 定</el-button>
					</div>
				</el-dialog>
			</div>
			
		</div>
		
		
		
	</div>
</template>

<script>
	export default {
		  data () {
		    return {
				status:'1',
				gender:'1',
				role:false,
				active:true,
				checked:[],
				changeInformation:false,
				dialogFormVisible: false,
				formLabelWidth: '70px',
				roleMeun: [],
				aa:[],
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
				users: [{
				         value: '1',
				         label: '教师'
				       }, {
				         value: '2',
				         label: '助教'
				       }, {
				         value: '3',
				         label: '学生'
				       }],	   
			    roles:[],
				data: [],
				value:'',
				defaultProps: {
					label: 'name'
				},
				form: {
					   	name: '',
					   	region: '',
					   	sign: '',
					   	remark: '',
					   	delivery: false,
					   	type: [],
					   	resource: '',
					   	desc: ''
					   }
				
		    }
		  },
		  created () {
		    this.get_role()
		  },
		  
		  methods: {
			  roleActive(){
				  this.role=!this.role;
			  },
			get_role() {
				this.axios({
						method: 'get',
						url: this.GLOBAL.baseUrl + '/g/',
					})
					.then(res => {
					   this.roles = res.data.data
					   this.data.children = res.data.data
					})
					.catch(function(error) {
						console.log(error)
					});
			}
		
			 
			
		  }
		  
		}
</script>

<style>
	.us-container {
		width: 100%;
		height: 80px;
	}
	
	.us-search {
		margin-top: 20px;
		padding: 0 20px;
		height: 60px;
		border-bottom:1.5px solid rgb(231, 234, 239) ;
	}
	.us-search-input {
		min-width: 200px;
		height: 40px;
		border: 1px solid rgb(205, 208, 214);
		outline: none;
		padding: 0 10px;
		border-radius: 5px;
	}
	.us-search-btn {
		width: 60px;
		height: 30px;
		border: none;
		margin-left: 5px;
		border-radius: 5px;
	}
	.us-add-position{
		margin-left: 0px;
	}
	.us-content {
		margin-top: 20px;
		padding: 0 20px;
	}
	.us-input-width{
		width: 95%;
	}
	ul {
		margin-top: 40px;
		width: 100%;
		border-bottom: 1px solid rgb(239, 241, 247);
		height: 40px;
	}
	
	ul li {
		margin-top: 15px;
		height: 100%;
		list-style: none;
		flex: 0 0 12%;
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
	.us-record-position{
		margin-left: -18px;
	}
	.us-click{
		cursor: pointer;
	}
	.braketsChange {
	    transform: rotate(90deg);
	}
	.us-change {
		transition: all 0.2s;
	}
	.menu-position{
		margin-left: 30px;
	}
	.us-input-sm{
		width: 10%;
	}
	.us-add input{
		width: 200px;
		height: 35px;
		border: 1px solid #D3D6DB;
		border-radius: 5px;
		outline: none;
		margin-left: 5px;
	}
	
	.us-add span {
		font-size: 16px;
		font-weight: 600;
	}
	  
</style>
