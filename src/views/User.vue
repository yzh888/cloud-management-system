<template>
	<div class="us-container">
		<div class="us-search cd-df-start">
			<input type="text" placeholder="输入角色名称搜索" class="us-search-input cd-mar-right">
			<input type="text" placeholder="输入用户名称或账号搜索" class="us-search-input cd-mar-right">
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<button class="us-search-btn cd-font-white-color cd-bg-green-color cd-mar-sm-top">刷新</button>
			<button class="us-search-btn cd-font-white-color cd-bg-orange-color cd-mar-sm-top">重置</button>
		</div>
		<div class="us-content">

			<div class="cd-df">
				<div class="" style="width: 10%;">
					<span class="us-change us-click" :class="{braketsChange:active}">
						<i class="iconfont" @click="roleActive">&#xe652;</i>角色
					</span>
					<div class="cd-col-start menu-position" v-if="role">
						<span>教师</span>
						<span>助教</span>
						<span>学生</span>
					</div>
				</div>
				<div class="" style="width: 90%;">
					<div class="cd-df-left-start">
						<button class="us-search-btn cd-font-white-color cd-bg-blue-color cd-mar-sm-top  cd-mar-right cd-cursor" @click="addUser()">
							<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe75e;</i>新增
						</button>
						<button class="us-search-btn cd-font-white-color cd-bg-green-color cd-mar-sm-top  cd-mar-right cd-cursor" @click="dialogFormVisible = true">
							<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe76c;</i>修改
						</button>
						<button class="us-search-btn cd-font-white-color cd-bg-red-color cd-mar-sm-top  cd-mar-right cd-cursor" @click="delete_user()">
							<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe601;</i>删除
						</button>
						<input type="file" name="fileBox" id="fileBox" @change="inputFile($event)" multiple class="us-file cd-cursor">
						<button class="us-search-btn cd-font-white-color cd-bg-orange-color cd-mar-sm-top cd-cursor" style="margin-left: -40px;">
							<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe889;</i>
							<span>导入</span>

						</button>
					</div>
					<div class="cd-col-left-start us-title cd-mar-top">
						<ul class="cd-df-left-start" style="text-align: left;">
							<li class="cd-mar-left us-content-jobNumber2">用户名</li>
							<li class="us-content-name1">学号</li>
							<li class="us-content-jobNumber2">性别</li>
							<li class="us-content-jobNumber2">角色</li>
							<li class="us-content-name2">电话</li>
							<li class="us-content-faculty2 ">邮箱</li>
							<li class="us-content-faculty2">院系</li>
							<li class="us-content-jobNumber2">状态</li>
							<li class="us-content-jobNumber2">操作</li>
						</ul>
					</div>
					<div v-for="(item,index) in users" :key="index" class="cd-mar-top">
						<ul class="us-record-position">
							<el-checkbox v-model="checked" :label="item.id" :value="item.mobile" @change="get_users(item.mobile)" class="us-mar-right"></el-checkbox>
							<li class="cd-mar-left us-content-name">{{item.name}}</li>
							<li class="us-content-jobNumber">{{item.job_number}}</li>
							<li class="us-content-name">{{item.gender}}</li>
							<li class="us-content-name">{{item.roleName}}</li>
							<li class="us-content-jobNumber">{{item.mobile}}</li>
							<li class="us-content-faculty">{{item.email}}</li>
							<li class="us-content-faculty">{{item.faculty}}</li>
							<li class="us-content-name">{{item.status}}</li>
							<p class="cd-font-white-color us-content-name ">
								<button class="cd-bg-blue-color us-btn cd-boder-circle cd-cursor" @click="updateUser(item)">
									<i class="iconfont">&#xe76c;</i>
								</button>
								<button class="cd-bg-red-color us-btn cd-boder-circle cd-cursor">
									<i class="iconfont" @click="delete_user_single(item.mobile)">&#xe601;</i>
								</button>

							</p>
						</ul>
					</div>
				</div>

				<el-dialog title="新增角色" :visible.sync="dialogFormVisible">
					<div class="us-add ">
						<p class="cd-df-au cd-mar-top">
							<span>用户名
								<input type="text" v-model="name" style="margin-right: 16px;" id="userAdd">
							</span>
							<span>手机号
								<input type="text" v-model="mobile" style="margin-right: 20px;" id="userAdd">
							</span>
						</p>

						<p class="cd-df-au cd-mar-top">
							<span>学号
								<input type="text" v-model="jobNumber" id="userAdd">
							</span>
							<span>邮箱
								<input type="text" v-model="email" id="userAdd">
							</span>
						</p>

						<p class="cd-df-au cd-mar-top">
							<span>学校
								<input type="text" v-model="college" id="userAdd">
							</span>
							<span>院系
								<input type="text" v-model="faculty" id="userAdd">
							</span>
						</p>

						<p class="cd-df-bt cd-mar-top" style="padding-left: 60px;">
							<span class="cd-col-6" style="margin-right: 35px;">性别
								<el-radio v-model="gender" label="男">男</el-radio>
								<el-radio v-model="gender" label="女">女</el-radio>
							</span>
							<span class="cd-col-6">状态
								<el-radio v-model="status" label="false">禁用</el-radio>
								<el-radio v-model="status" label="true">激活</el-radio>
							</span>
						</p>
						<p class="cd-mar-top">
							<span class="cd-col-6  " style="padding-left: 60px;">角色
								<el-select v-model="userRole" placeholder="请选择">
									<el-option v-for="item in addrole" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</span>
						</p>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible=false">取 消</el-button>
						<el-button type="primary" @click="post_user()">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
		<div class="cd-df" >
			<div>
			<p class="us-pic-title">各学院注册人数</p>
			<div id="main" style="width: 600px;height:400px;margin-left: 90px;"></div></div>
			<div>
			<p class="us-pic-title1">每月份注册人数</p>
			<div id="child" style="width: 600px;height:430px;"></div></div>
		</div>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				mobile: '',
				jobNumber: '',
				email: '',
				college: '',
				faculty: '',
				roleName: '',
				status: '',
				gender: '',
				role: false,
				active: true,
				checked: [],
				userJudge: '',
				dialogFormVisible: false,
				formLabelWidth: '70px',
				roleMeun: [],
				currentPage: 1,
				pageSize: 6,
				userId: '',
				registerDate:[],
				registerData:[],
				schoolDate:[],
				schoolData:[],
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

				addrole: [{
					value: '1',
					label: '教师'
				}, {
					value: '2',
					label: '助教'
				}, {
					value: '3',
					label: '学生'
				}],
				roles: [],
				data: [],
				users: [],
				excel: [],
				excels: [],
				value: '',
				userRole: '',
				getApi: {},
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


				},
				statusCode: '',
				year: '2020',
				schoolApi: [],
				registerApi: []
			}
		},
		created() {
			this.get_user()
		},

		methods: {
			//增加用户
			addUser() {
				this.dialogFormVisible = true;
				this.userJudge = 0;
			},
			roleActive() {
				this.role = !this.role;
			},

			get_user() {
				this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/s/user',
						data: {
							"currentPage": this.currentPage,
							"pageSize": this.pageSize,
							"year": this.year
						}
					})
					.then(res => {
						this.getApi = res.data.data
						this.users = this.getApi.selectUserApi
						this.schoolApi = this.getApi.schoolApi
						this.registerApi = this.getApi.registerApi
						for(var i = 0; i < this.schoolApi.length; i++){
							this.schoolDate.splice(i,1,this.schoolApi[i].schoolName)
							this.schoolData.splice(i,1,this.schoolApi[i].peoperNumber)
						}
						for(var i = 0; i < this.registerApi.length; i++){
							this.registerDate.splice(i,1,this.registerApi[i].month)
							this.registerData.splice(i,1,this.registerApi[i].month)
						}
						 this.drawChart();
						 this.drawCharts()
					})
					.catch(function(error) {
						console.log(error)
					});
			},
			//删除单个用户
			delete_user_single(mobile) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除用户
					this.axios({
							method: 'delete',
							url: this.GLOBAL.baseUrl + '/d/user/',
							data: {
								"mobileList": mobile
							},
						})
						.then(res => {
							this.$message({
								message: '删除成功',
								type: 'success',
								duration: '1000'
							});
							this.get_user();
						})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//批量删除用户
			delete_user() {
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
								url: this.GLOBAL.baseUrl + '/d/user/',
								data: {
									"mobileList": mobile
								},
							})
							.then(res => {
								this.$message({
									message: '删除成功',
									type: 'success',
									duration: '1000'
								});
							})
					}
					this.get_user()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			get_users(item) {
			},
			//修改用户
			updateUser(item) {
				this.userId = item.id;
				this.userJudge = 1;
				this.dialogFormVisible = true;
				this.name = item.name,
					this.mobile = item.mobile,
					this.jobNumber = item.job_number,
					this.email = item.email,
					this.faculty = item.faculty,
					this.gender = item.gender
				if (item.roleId == 1) {
					this.userRole = "1"
				} else if (item.roleId == 2) {
					this.userRole = "2"
				} else {
					this.userRole = "3"
				}
				if (item.status == 1) {
					this.status = "true"
				} else {
					this.status = "false"
				}
			},
			//修改and增加用户
			post_user() {
				if (this.userJudge == 1) {
					console.log(this.userRole)
					console.log(this.name)
					console.log(this.faculty)
					this.axios({
						method: 'put',
						url: this.GLOBAL.baseUrl + '/u/user', //后端api
						data: {
							"id": this.userId,
							"name": this.name,
							"mobile": this.mobile,
							"jobNumber": this.jobNumber,
							"email": this.email,
							"school": this.college,
							"faculty": this.faculty,
							"status": this.status,
							"gender": this.gender,
							"roleId": this.userRole
						}
					}).then(res => {
						this.$message({
							message: '修改成功',
							type: 'success',
							duration: '1000'
						});
						this.dialogFormVisible = false;
						document.getElementById('userAdd').value = '';
						this.get_user()
					});
				} else if (this.userJudge == 0) {
					if (this.status == 1) {
						this.statusCode = true;
					} else {
						this.statusCode = false;
					}
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/p/user/single', //后端api
						data: {
							"name": this.name,
							"mobile": this.mobile,
							"jobNumber": this.jobNumber,
							"email": this.email,
							"school": this.college,
							"faculty": this.faculty,
							"roleName": this.roleName,
							"status": this.statusCode,
							"gender": this.gender,
							"roleId": this.userRole
						}
					}).then(res => {
						this.$message({
							message: '添加成功',
							type: 'success',
							duration: '1000'
						});
						this.dialogFormVisible = false;
						document.getElementById('userAdd').value = '';
						this.get_user()
					});
				}
			},

			inputFile: function() {
				var _this = this;
				let formData = new FormData();
				for (let j = 0; j < event.target.files.length; j++) {
					formData.append('file', event.target.files[j]);
					this.axios({
						method: 'post',
						url: this.GLOBAL.baseUrl + '/p/user',
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						data: formData,
						processData: false,
						contentType: false
					}).then(res => {
						this.get_user()
					});
				}
			},
			drawChart() {
			      // 基于准备好的dom，初始化echarts实例
			      let myChart = this.$echarts.init(document.getElementById("main"));
			      // 指定图表的配置项和数据
			      let option = {
			    color: ['#3398DB'],
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: this.schoolData,
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value',
						data: [2,4,6,8]
			        }
			    ],
			    series: [
			        {
			            name: '直接访问',
			            type: 'bar',
			            barWidth: '60%',
			            data: this.schoolData,
						 label: {
						                    show: true, //开启显示
						                    position: 'top', //在上方显示
											}
			        }
			    ]
			};
			
			      // 使用刚指定的配置项和数据显示图表。
			      myChart.setOption(option);
			    },
				drawCharts() {
					  // 基于准备好的dom，初始化echarts实例
					  let myChart1 = this.$echarts.init(document.getElementById("child"));
					  // 指定图表的配置项和数据
					  let option = {
				    xAxis: {
				        type: 'category',
				        data: this.registerData
				    },
				    yAxis: {
				        type: 'value',
				    },
				    series: [{
				        data: this.registerData,
				        type: 'line'
				    }],
					}
					myChart1.setOption(option);
				}



		}

	}
</script>

<style>
	.us-pic-title{
		margin-top: 50px;
		margin-left: 340px;
		font-size: 16px;
		font-weight: 600;
		color: rgb(0, 138, 205);
	}
	.us-pic-title1{
		margin-top: 50px;
		margin-left: 250px;
		font-size: 16px;
		font-weight: 600;
		color: rgb(0, 138, 205);
	}
	.us-container {
		width: 100%;
		height: 80px;
	}

	.us-search {
		margin-top: 20px;
		padding: 0 20px;
		height: 60px;
		border-bottom: 1.5px solid rgb(231, 234, 239);
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
		outline: none;
	}

	.us-content {
		margin-top: 20px;
		padding: 0 20px;
	}

	.us-input-width {
		width: 95%;
	}


	.us-record-position {
		width: 100%;
		margin-left: -40px;
	}

	.us-click {
		cursor: pointer;
	}

	.braketsChange {
		transform: rotate(90deg);
	}

	.us-change {
		transition: all 0.2s;
	}

	.menu-position {
		margin-left: 30px;
	}

	.us-input-sm {
		width: 10%;
	}

	.us-add input {
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

	.us-file {
		opacity: 0;
		width: 40px;
	}

	ul {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.us-content-name {
		width: 100px;
	}

	.us-content-jobNumber {
		width: 160px;
	}

	.us-content-faculty {
		width: 200px;
	}

	.us-content-name1 {
		width: 140px;
	}

	.us-content-jobNumber1 {
		width: 90px;
	}

	.us-content-name2 {
		width: 150px;
	}

	.us-content-jobNumber2 {
		width: 90px;
	}

	.us-content-faculty2 {
		width: 180px;
	}

	.us-mar-right {
		margin-right: 10px;
	}

	.us-btn {
		width: 30px;
		height: 30px;
		margin-right: 5px;
		font-size: 18px;
		color: #FFFFFF;
		border: none;
	}
</style>
