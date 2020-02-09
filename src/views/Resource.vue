<template>
	<div>
		<div class="cd-df-left-start rs-bottom">
		<span class="cd-mar-right">
			    <el-date-picker
				style="width: 250px;"
			      v-model="value1"
			      type="daterange"
			      align="right"
				  value-format="yyyy-MM-dd"
			      unlink-panels
			      range-separator=":"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :picker-options="pickerOptions">
			    </el-date-picker>
		</span>
		<span class="cd-mar-right">
			 <el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item"
			      :label="item"
			      :value="item">
			    </el-option>
			  </el-select>
		</span>
		<button class="us-search-btn cd-df-center cd-font-white-color cd-bg-orange-color cd-mar-sm-top cd-cursor" @click="search_resource()">
			<img src="../assets/image/sousuo.png" alt="" class="cl-btn cd-mar-sm-right">
			<span class="cd-font-white-color">搜索</span>
		</button>
		</div>
		<hr>
		<div class="rs-bottom cd-df-left-start">
			<button class="us-search-btn cd-font-white-color cd-bg-blue-color cd-mar-sm-right cd-cursor">
				<i class="iconfont cd-font-white-color cd-sms-font ">&#xe76c;</i>修改
			</button>
			<button class="us-search-btn cd-font-white-color cd-bg-red-color  cd-mar-right cd-cursor" @click="delete_resource()">
				<i class="iconfont cd-font-white-color cd-sms-font cd-mar-sm-right">&#xe601;</i>删除
			</button>
			<button class="us-search-btn cd-font-white-color cd-df-center cd-bg-orange-color  cd-cursor" @click="export_resource()">
				<img src="../assets/image/daochu.png" class="us-function-icon cd-mar-sm-right">导出
			</button>
		</div>
		<div class="rs-bottom cd-mar-top">
			<el-table ref="multipleTable" :data="resources"  tooltip-effect="dark" 
			 @selection-change="get_tabel_information">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="创建者昵称" width="200">
					<template slot-scope="scope">{{ scope.row.creatorName }}</template>
				</el-table-column>
				<el-table-column prop="name" label="资源名称" width="200">
				</el-table-column>
				<el-table-column prop="url" label="资源地址" width="250">
				</el-table-column>
				<el-table-column prop="type" label="类型" width="200">
				</el-table-column>
				<el-table-column label="创建时间" width="230">
					<template slot-scope="scope">{{ scope.row.create_time}}</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip>
					<template slot-scope="scope">
						<div class="cd-df">
							<el-button type="primary" icon="el-icon-edit" disabled ></el-button>
							<button type="primary" class="cd-df-center cd-bg-red-color cd-del-border ca-btn cd-mar-left cd-cursor">
								<img class="cl-btn" src="../assets/image/delete.png" alt="" @click="delete_single_resource(scope.row.id)">
							</button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				typeNameApi:[],
				selectAllApi:[],
				getApi:{},
				creatorName:'',
				name:'',
				type:'',
				url:'',
				value:'',
				dialogFormVisible:'false',
				resources: [],
				data: [],
				idList: '',
				multipleSelection: [],
				options: [],
				 pickerOptions: {
				          shortcuts: [{
				            text: '最近一周',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
				              picker.$emit('pick', [start, end]);
				            }
				          }, {
				            text: '最近一个月',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				              picker.$emit('pick', [start, end]);
				            }
				          }, {
				            text: '最近三个月',
				            onClick(picker) {
				              const end = new Date();
				              const start = new Date();
				              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				              picker.$emit('pick', [start, end]);
				            }
				          }]
				        },
				        value1: '',
						dateList: ''
			}
		},
		created(){
			this.get_resource()
		},
		methods:{
			//导出
			export_resource(){
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl + '/download/resource',
					responseType: 'blob'
				}).then(res =>{
					const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
					const download = document.createElement('a')
					const href = window.URL.createObjectURL(blob)
					download.href = href
					download.download = '资源数据表.xls'
					document.body.appendChild(download)
					download.click()
				    document.body.removeChild(download)
					window.URL.revokeObjectURL(href)
				})
			},
			//查询
			search_resource(){
				let date = []
				date = this.value1
				for(var i = 0; i < date.length; i++){
					console.log(date[i])
					this.dateList = this.dateList + date[i] + ","
				}
				console.log(this.dateList)
				this.axios({
					method:'post',
					url:this.GLOBAL.baseUrl + '/g/resource/c/',
					data:{
						"fieldList":this.dateList
					}
				}).then(res=>{
					console.log(res.data.data)
					this.resources = res.data.data
				})
			},
			
			format1(date) {  
			    var y = date.getFullYear();  
			    var m = date.getMonth() + 1;  
			    m = m < 10 ? ('0' + m) : m;  
			    var d = date.getDate();  
			    d = d < 10 ? ('0' + d) : d;  
			    var h = date.getHours();  
			    var minute = date.getMinutes();  
			    minute = minute < 10 ? ('0' + minute) : minute; 
			    var second= date.getSeconds();  
			    second = minute < 10 ? ('0' + second) : second;  
			    return y + '-' + m + '-' + d;  
			},  
			
			get_resource(){
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl + "/g/resource",
				}).then(res=>{
					this.getApi = res.data.data;
					this.selectAllApi = this.getApi.selectAllApi;
					this.typeNameApi = this.getApi.typeNameApi;
					this.options = this.typeNameApi
					this.data = this.selectAllApi;
					for(var i = 0, len=this.data.length; i < len; i++){
						var da = this.dateFormat(this.data[i].create_time)
						this.data[i].create_time = da
						this.resources.splice(i,1,this.data[i])
					}
					for(var i = 0, len = this.typeNameApi.length; i < len; i++){
						this.typeNameApi.splice(i,1,this.typeNameApi[i].typeName)
					}
				})
			},
			//删除单个资源
			delete_single_resource(id) {
				this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除资源
					this.axios({
							method: 'delete',
							url: this.GLOBAL.baseUrl + '/d/resource/',
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
							this.get_resource();
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//批量删除
			delete_resource() {
				this.$confirm('此操作将永久删除选中班课, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					for (var i = 0, len = this.multipleSelection.length; i < len; i++) {
						this.idList = this.idList + this.multipleSelection[i].id + ","
					}
					this.axios({
							method: 'delete',
							url: this.GLOBAL.baseUrl + '/d/resource/',
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
			/* 字符串转日期,再格式化日期 */
			dateFormat(time){
			    var date=new Date(time);
			    var year=date.getFullYear();
			    /* 在日期格式中，月份是从0开始的，因此要加0
			     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			     * */
			    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
			    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
			    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
			    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
			    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
			    // 拼接
			    return year+"-"+month+"-"+day;
			},
			
			get_tabel_information(val) {
				this.multipleSelection = val;
			}
			
		}
	}
</script>

<style scoped>
	.rs-bottom {
		padding: 0 20px;
	}
	
	.ca-btn {
		height: 40px;
		width: 55px;
		border-radius: 5px;
	}
	
	.cl-btn {
		width: 18px;
		height: 18px;
	}
</style>
