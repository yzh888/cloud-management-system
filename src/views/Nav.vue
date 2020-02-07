<template>
	<div class="cd-df-start">
		<div class="side-bar cd-col-start">
			<div class="n-logo cd-df-left-start">
				<span class="cd-mar-right">
					<img src="../assets/image/shuye.png" alt="">
				</span>
				<span>云班课管理系统</span>
			</div>
			<!-- DIY树型控件 -->
			<div class="cd-cursor">
				<div class="pm-permission cd-col-left-start" v-for="(item, index) in sideMenuImg" :key="index">
						<div class="cd-df-bt pm-width n-parent-menu" v-if="sideMenuImg.length!=0">
							<p class="cd-df-left-start " @click="pmMenu(index)">
								<img :src="item.src" alt="">
								{{item.name}}</p>
								<p class="n-brakets" :class="{braketsChange:aa[index]}">
									<span v-if="item.childList != null "><i class="iconfont">&#xe600;</i></span>
								</p>
						</div>
						<div class="n-childMenu">
						<div class="cd-df-bt pm-width n-child-menu" v-for="(item1, index1) in item.childList" 
						:key="index1" v-if="aa[index]">
							<p @click="choiceMenu(item.name,item1.name)" class="col-6" :class="{childMenu: active1}">
								<img :src="item1.src" alt="">{{item1.name}}
								</p>
						</div>
						</div>
				</div>
			</div>

		</div>
	    <div class="n-right">
			<div class="n-up-bar cd-df-bt">
				<p class="n-up-bar-top cd-df-left-start">
					<span class="n-up-bar-icon">
						<img src="../assets/image/xuanxiang.png" alt="">
					</span>
					<span v-if="tipVisialbe">
					<span class="cd-mar-right">/</span>
					<span class="cd-mar-right cd-lg-font">{{parentMenu}}</span>
					<span class="cd-mar-right">/</span>
					<span>{{childMenu}}</span>
					</span>
				</p>
				<p class="cd-col-2">
					<router-link to="role"><span>admin</span></router-link>
				</p>
			</div>
			<div class="n-content">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				menuPermission: [],
				aa: [],
				router: "permission",
				active: false,
				active1:false,
				jiantouAcitve:false,
				tipVisialbe:false,
				parentMenu:'',
				childMenu:'',
				sideMenuImg:[{
					name: "主页",
					src:require('../assets/image/zhuye.png')
				},{
					name: "系统管理",
					src:require('../assets/image/xitongguanli.png'),
					childList:[{
					name: "账户管理",
					src:require('../assets/image/zhanghuguanli.png'),
				},{
					name: "角色管理",
					src:require('../assets/image/juese.png'),
				},{
					name: "权限管理",
					src:require('../assets/image/permission.png'),
				},{
					name: "班课管理",
					src:require('../assets/image/bankeguanli.png'),
				},{
					name: "资源管理",
					src:require('../assets/image/ziyuanguanli.png'),
				},{
					name: "活动管理",
					src:require('../assets/image/huodongguanli.png'),
				},{
					name: "消息管理",
					src:require('../assets/image/xiaoxiguanli.png'),
				}
				]
				},{
					name: "设置管理",
					src:require('../assets/image/shezhi.png'),
					childList:[{
							name: "初始化",
							src:require('../assets/image/xiaoxiguanli.png'),
					}]
				},
				]
			}
		},
		methods: {
			pmMenu(index) {
				this.aa.splice(index, 1, !this.aa[index])
				this.active1=true;
				this.jiantouAcitve= !this.jiantouAcitve
			},

            choiceMenu(parentName, childName){
				this.parentMenu = parentName
				this.childMenu = childName
				this.tipVisialbe = true
				switch(childName){
					case "主页"  :
					         this.$router.push('index')
							 break
					case "账户管理" : 
					         this.$router.push('user')
					         break
					case "角色管理" :
							this.$router.push('role')
							break
					case "权限管理" :
					        this.$router.push('permission')
							break
					case "班课管理" :
					        this.$router.push('class')
							break
					case "资源管理" :
					        this.$router.push('resource')
							break
					case "活动管理" :
					        this.$router.push('activity')
							break
					case "消息管理" :
					        this.$router.push('news')
							break
				}
			},
			
			get_permission() {
				this.axios({
					method: 'get',
					url: this.GLOBAL.baseUrl,
				}).then(res => {
					this.menuPermission = res.data.data;
					//给aa数组初始化
					for (var i = 0, len = res.data.data.length; i < len; i++) {
						this.aa.splice(i, 0, false);
					}
					console.log(JSON.stringify(this.aa));
				})
			},
		},
		created() {
			this.get_permission()
		}
	}
</script>

<style scoped>
	
     .n-up-bar {
		 position: fixed;
		 left: 200px;
		 top: 0;
		 width: 100%;
		 height: 60px;
		 padding: 0 10px;
		 background-color: #B5B5B5;;
		 z-index: 999;
	 }	
	 
	 .n-content {
		 margin-left: 200px;
		 margin-top: 80px;
	 }
	 
	 .n-right {
		 width: 100%;
	 }
	 
	 .n-up-bar-icon {
		 width: 18px;
		 height: 18px;
		 margin-right: 30px;
	 }
	 
	.n-logo {
		height: 60px;
		font-size: 14px;
		color: #EEEEEE;
		padding: 0 10px;
		background-color:  rgba(48, 65, 86);
	}
	
	.pm-width {
		width: 100%;
	}
	
	.pm-permission {
		width: 200px;
		color: #EEEEEE;
		font-size: 16px;
	}
	
	.side-bar {
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(48, 65, 86);
        width: 200px;
		height: 100vh;
		z-index: 1000;
	}
	
	.n-childMenu {
		background-color: rgb(31, 45, 61);
		width: 100%;
	}
	
	.childMenu {
		margin-left: 20px;
	}
	
	.n-parent-menu {
		height: 50px;
		padding: 0 10px;
	}
	
	.n-parent-menu:hover {
		background-color: #263445;
	}
	
	.n-parent-menu img {
		width: 18px;
		height: 18px;
		margin-right: 10px;
	}
	
	.n-child-menu {
		height: 45px;
		font-size: 14px;
		padding: 0 10px;
	}
	
	.n-brakets {
		transition: all 0.3s;
	}
	
	.n-child-menu:hover {
		background-color: #001528;
	}
	
	.n-child-menu img {
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
	
	.braketsChange {
	    transform: rotate(90deg);
	}
</style>
