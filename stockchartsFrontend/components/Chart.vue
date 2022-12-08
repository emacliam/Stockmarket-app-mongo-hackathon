


<script>
import VueApexCharts from 'vue3-apexcharts'
import moment from 'moment'
export default{
  props:['data'],
  computed:{
    currentValue:function(){
      return this.data
    }
  },
  watch: { 
      	data: function(newVal, oldVal) { // watch it
         this.series[0].data.push([
          [new Date(newVal.epoch).getMilliseconds()],
          [newVal.open, newVal.high, newVal.low, newVal.close]
        ])
        }
      }
,
  components:{
VueApexCharts
  },
  data(){
    return{
      chartOptions:{
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left'
            },
           
            xaxis: {
              type: 'datetime',
    labels: {
      format:'fff'
    }
  },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          },
      series: [{
            data: []
          }]
    }
  }
}</script>

<template>
  <VueApexCharts class="bg-white border mt-4 rounded" :options="chartOptions" type="candlestick" height="400" :series="series"/>
</template>