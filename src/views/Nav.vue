<template>
	<div class="n-container">
		<div class="n-upside-bar cd-df-center">
			<div class="cd-col-2 cd-df-center">
				<span><i class="iconfont cd-title-font">&#xe617;</i>
				Cloud
				</span>
			</div>
			<div class="cd-df-bt n-upside-right">
				<ul class="n-upside-bar-left">
					<span><i class="iconfont">&#xe6a9;</i></span>
					<span><router-link to="nav/index"><i class="iconfont">&#xe611;</i>首页 </router-link></span>
					<!-- <span><i class="iconfont">&#xe641;</i>系统</span> -->
					<!-- <span><i class="iconfont">&#xe641;</i>系统</span> -->
					<span>
								<el-dropdown>
								  <span>
								   <i class="iconfont">&#xe641;</i>系统
								  </span>
								  <el-dropdown-menu slot="dropdown">
								    <el-dropdown-item  v-model="role" @click.native="al(0)">
										<router-link to="role"><i class="iconfont">&#xe69a;</i>角色管理
										</router-link>
									</el-dropdown-item>
								    <el-dropdown-item v-model="permission" @click.native="al(1)">
										<router-link to="permission"><i class="iconfont">&#xe85f;</i>权限管理
										</router-link>
									</el-dropdown-item>
									<el-dropdown-item v-model="user" @click.native="al(2)">
										<router-link to="user"><i class="iconfont">&#xe620;</i>用户管理
										</router-link>
									</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
					</span>
				</ul>
				<ul class="n-upside-bar-right">
					<span><i class="iconfont">&#xe628;</i></span>
					<span><i class="iconfont">&#xe6c2;</i></span>
					<span>admin</span>
				</ul>
			</div>
		</div>
		<div class="n-bottom cd-df-start">
			<div class="n-side-bar cd-col-2">
				<div class="cd-col-top-start" v-if="sideDisplay">
					<div class="n-width">
						<div class="cd-df-bt n-width n-side-system" @click="bb">
						<span>
							<i class="iconfont">&#xe641;</i>系统管理
						</span>
						<span class="n-change" :class="{braketsChange:active}">
							<i class="iconfont">&#xe600;</i>
						</span>
						</div>
						<div class="cd-col-center" v-if="systemSubmenuDisplay">
							<span class="cd-mar-top"><router-link to="role">角色管理</router-link></span>
							<span class="cd-mar-top"><router-link to="permission">权限管理</router-link></span>
							<span class="cd-mar-top"><router-link to="user">用户管理</router-link></span>
						</div>
					</div>
					
					
				</div>
			</div>
			<div class="n-width">
                <router-view />
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	  data () {
	    return {
			 user:'',
	         sideDisplay: false,
			 active:false,
			 systemSubmenuDisplay:false,
			 role: '',
			 permission: ''
	    }
	  },
	  created () {
	    
	  },
	  
	  methods: {
		 al() {
			 this.sideDisplay = true;
			 this.active = true;
			 this.systemSubmenuDisplay = true;
		 },
		 
		 bb() {
			 this.active = !this.active
			 this.systemSubmenuDisplay = !this.systemSubmenuDisplay
		 }
	  }
	  
	}
</script>

<style>
	
	ul {
		height: 100%;
	}
	
	.n-width {
		width: 100%;
	}
	
	 .tag {
	        cursor: pointer;
	    }
		
	.n-container {
		width: 100%;
		height: 92vh;
	}

	.n-upside-right {
		width: 100%;
	}

	.n-upside-bar {
		position: fixed;
		left: 0;
		top: 0;
		height: 8vh;
		background-color: #ebf1f6;
		width: 100%;
	}

	.n-logo {
		width: 200px;
		height: 100%;
		background-color: #000000;
	}

	.n-upside-bar-left span {
		margin-right: 40px;
	}
 
    span i {
		margin-right: 5px;
	}
	
	.n-upside-bar-right span {
		margin-right: 30px;
	}

	.n-side-bar {
		background-color: #ebf1f6;
		width: 200px;
		height: 100%;
		padding-top: 30px;
	}
	
	.n-side-system {
		padding: 0 30px;
	}

    .braketsChange {
	    transform: rotate(90deg);
	}
	
	.n-change {
		transition: all 0.2s;
	}
	
	.n-bottom {
		width: 100%;
		height: 100%;
		margin-top: 8vh;
	}
	
	.el-dropdown {
	    vertical-align: top;
	  }
	  
	  .el-dropdown-menu {
		 height: 130px;
	  }
</style>
