<template>
	<div class="re-container">
		<div class="re-search cd-df-left-start">
			<span class="cd-mar-right">名称</span>
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
				<button class="re-search-btn cd-bg-blue-color cd-del-border cd-font-white-color">
					<i class="iconfont cd-font-white-color cd-sms-font cd-mar-right">&#xe75e;</i>新增
					</button>
				<button class="re-op-tips-btn"><i class="iconfont cd-mar-right">&#xe8f3;</i>操作提示</button>
			</div>
			<div class="cd-col-start">
				<ul class="cd-df-center">
					<li>名称</li>
					<li>标识</li>
					<li>描述</li>
					<li>操作</li>
				</ul>
			</div>
			<div>
				<ul class="cd-df-center">
					<li>name</li>
					<li>identification</li>
					<li>description</li>
					<li class="cd-font-white-color">
						<span class=" cd-bg-blue-color cd-boder-circle"><i class="iconfont">&#xe76c;</i></span>
						<span class="cd-bg-red-color cd-boder-circle"><i class="iconfont ">&#xe601;</i></span>
						<span class=" cd-bg-orange-color cd-boder-circle"><i class="iconfont">&#xe678;</i></span>
						<span class="cd-boder-circle"><i class="iconfont">&#xe609;</i></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.re-search {
		height: 60px;
		padding: 0 20px;
		border-bottom:1.5px solid rgb(231, 234, 239) ;
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
	
	.re-op-tips-btn {
		width: 120px;
		height: 30px;
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
