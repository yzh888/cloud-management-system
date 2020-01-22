<template>
  <div>
    <div id="main" style="width: 600px;height:400px;"></div>
	<div id="child" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
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
            data: this.aa,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }],
	}
	myChart1.setOption(option);
}

  },
  mounted() {
    this.drawChart();
	this.drawCharts()
  },
  
  data(){
	return {
		aa: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	}  
  }
};
</script>
