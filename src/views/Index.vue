<template>
	<div class="id-container">
		<div class="cd-df-start id-search">
			<div class="cd-col-2 id-content cd-df-center " style="margin-right: 70px;">
				<div class="left-area" style="background: rgb(45, 140, 240); width: 36%;height: 120px;">
					<img src="../assets/image/update.png" alt="" style="margin-top: 20px;">
				</div>
				<div class="right-area" style="width: 64%;background-color: white;">
					<span class="cd-df-center" style="font-size: 50px;">803</span>
					<p class="cd-df-center cd-mar-bottom" style="">新增用户</p>
				</div>
			</div>
			<div class="cd-col-2 id-content cd-df-center" style="margin-right: 70px;">
				<div class="left-area" style="background: rgb(26, 160, 52); width: 36%;height: 120px;">
					<img src="../assets/image/sousuo.png" alt="" style="margin-top: 20px;">
				</div>
				<div class="right-area" style="width: 64%;background-color: white;">
					<span class="cd-df-center" style="font-size: 50px;">405</span>
					<p class="cd-df-center cd-mar-bottom" style="">网站浏量</p>
				</div>
			</div>
			<div class="cd-col-2 id-content cd-df-center" style="margin-right: 70px;">
				<div class="left-area" style="background: rgb(254, 204, 66); width: 36%;height: 120px;">
					<img src="../assets/image/delete.png" alt="" style="margin-top: 20px;">
				</div>
				<div class="right-area" style="width: 64%;background-color: white;">
					<span class="cd-df-center" style="font-size: 50px;">503</span>
					<p class="cd-df-center cd-mar-bottom" style="">近期活动</p>
				</div>
			</div>
			<div class="cd-col-2 id-content cd-df-center" style="margin-right: 70px;">
				<div class="left-area" style="background: rgb(138, 43, 226); width: 36%;height: 120px;">
					<img src="../assets/image/delete.png" alt="" style="margin-top: 20px;">
				</div>
				<div class="right-area" style="width: 64%;background-color: white;">
					<span class="cd-df-center" style="font-size: 50px;">503</span>
					<p class="cd-df-center cd-mar-bottom" style="">最高人数</p>
				</div>
			</div>

		</div>
		<div class="cd-df">
			<div id="main" style="width: 600px;height:400px;margin-top: 50px;"></div>
			<div id="child" style="width: 600px;height:430px;margin-top: 50px;"></div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
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
			
			drawChart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById("main"));
				// 指定图表的配置项和数据
				let option = {
					legend: {},
					tooltip: {},
					dataset: {
						source:this.data /* [
							['product', '2015', '2016', '2017','2019'],
							['Matcha Latte', 43.3, 85.8, 93.7,30.0],
							['Milk Tea', 83.1, 73.4, 55.1,20.0],
							['Cheese Cocoa', 86.4, 65.2, 82.5,60.0],
							['Walnut Brownie', 72.4, 53.9, 39.1,40.0]
						] */
					},
					xAxis: {
						type: 'category'
					},
					yAxis: {},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					/* series: [
					     {type: 'bar'},
					     {type: 'bar'},
					     {type: 'bar'}
					 ] */
					series: [

						/* {
							type: 'bar',
							data: [5, 20, 36, 10, 10, 20],
							itemStyle: {
								normal: {
									color: function(params) {
										var colorList = ['#ff4844', '#9ac3e5', '#66ac52', '#ffc032', '#549bd3', '#f47e39'];
										return colorList[params.dataIndex];
									}
								},
							},
						}, */
						{
							type: 'bar',
							itemStyle: {
								normal: {
									color: '#1890FF'
								}
							}
						},
						{
							type: 'bar',
							itemStyle: {
								normal: {
									color: '#66ac52'
								}
							}
						},
						{
							type: 'bar',
							itemStyle: {
								normal: {
									color: '#ffc032'
								}
							}
						},
                        {
							type: 'bar',
							itemStyle: {
								normal: {
									color: 'blueviolet'
								}
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
					title: {
						text: '某站点用户访问来源',
						subtext: '纯属虚构',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					color:['red', 'green','yellow','#1890FF','blueviolet'],
					legend: {
						orient: 'vertical',
						left: 'left',
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [{
								value: 335,
								name: '直接访问'
							},
							{
								value: 310,
								name: '邮件营销'
							},
							{
								value: 234,
								name: '联盟广告'
							},
							{
								value: 135,
								name: '视频广告'
							},
							{
								value: 1548,
								name: '搜索引擎'
							}
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				}
				myChart1.setOption(option);
			}

		},
		mounted() {
			this.drawChart();
			this.drawCharts()
		},

        created() {
        	console.log(this.data)
        },
		
		data() {
			return {
				aa: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				data:	[
											['product', '2015', '2016', '2017','2019'],
											['Matcha Latte', 43.3, 85.8, 93.7,30.0],
											['Milk Tea', 83.1, 73.4, 55.1,20.0],
											['Cheese Cocoa', 86.4, 65.2, 82.5,60.0],
											['Walnut Brownie', 72.4, 53.9, 39.1,40.0]
										]
			}
		}
	};
</script>
<style scoped>
	.id-container {
		width: 100%;
		height: 100%;
	}

	.id-search {
		margin-top: 20px;
		padding: 0 20px;
		height: 120px;
		border-bottom: 1.5px solid rgb(231, 234, 239);
	}

	.id-content {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
