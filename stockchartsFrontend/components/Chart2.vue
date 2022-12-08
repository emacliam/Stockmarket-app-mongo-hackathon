


<script>
import VueApexCharts from 'vue3-apexcharts'
export default{
  props:['data'],
  computed:{
    currentValue:function(){
      return this.data
    }
  },
  watch: { 
      	data: function(newVal, oldVal) { // watch it
         this.chartOptions.series[0].data.push(
          newVal.open.substr(2, 4)
        )

        this.chartOptions.series[1].data.push(
          newVal.close.substr(2, 4)
        )
        }
      }
,
  components:{
VueApexCharts
  },
  data(){
    return{
      chartOptions:{
        title: {
              text: 'Area Chart',
              align: 'left'
            },
  chart: {
    height: 350,
    type: "line",
    stacked: false
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#FF1654", "#247BA0"],
  series: [
    {
      name: "High",
      data: []
    },
    {
      name: "Low",
      data: []
    }
  ],
  stroke: {
    width: [4, 4]
  },
  plotOptions: {
    bar: {
      columnWidth: "20%"
    }
  },
  xaxis: {
    
  },
  yaxis: [
    {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FF1654"
      },
      labels: {
        style: {
          colors: "#FF1654"
        }
      },
      title: {
        text: "High",
        style: {
          color: "#FF1654"
        }
      }
    },
    {
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#247BA0"
      },
      labels: {
        style: {
          colors: "#247BA0"
        }
      },
      title: {
        text: "Low",
        style: {
          color: "#247BA0"
        }
      }
    }
  ],
  tooltip: {
    shared: false,
    intersect: true,
    x: {
      show: false
    }
  },
  legend: {
    horizontalAlign: "left",
    offsetX: 40
  }
},
    }
  }
}</script>

<template>

  <VueApexCharts class="bg-white border mt-4 rounded" :options="chartOptions" type="line" height="400" :series="chartOptions.series"/>
</template>