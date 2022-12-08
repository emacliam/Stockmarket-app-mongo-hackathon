<template>
 <main class=" bg-white flex flex-col items-center">
  <div class="w-full bg-white h-16 border-b flex justify-between items-center px-4">
    <span class="font-bold">
      DTrader
    </span>
<div class="flex space-x-4">
  <Btn class=" bg-red-500 border-none py-2 px-4 text-xs" label="Logout" />
  <Btn class=" bg-white text-gray-500 border border-gray-600 py-2 px-4 text-xs" label="Refresh Page" @click="refresh()" />
</div>
  </div>
  <section class="w-full h-screen py-2 px-4 flex flex-row items-center ">
    <div class="flex-1 h-full">
      <div class="flex mb-2 mt-2">
     <span class="font-bold text-lg text-[#1b2149]">Overview</span>
    </div>
    <div class="w-full h-1/2 flex items-center justify-center" v-if="FETCHING_DATA">
      <span>Fetching Data ...</span>
    </div>
    <div v-else id="chart">
    
        <client-only>
          <div class="flex justify-between flex-row space-x-4">
      <Card class="w-1/4 border h-32 shadow-none"> 
    <template #subtitle>
    <span class="text-sm!">
      Current Open
    </span>
    </template>
    <template #content>
      <div class="flex justify-between items-center">
      <span>  {{currentData.open}}</span>
      <div>
      <Up v-show="Open == 'up'"></Up>
      <Down v-show="Open == 'down'"></Down>
      </div>
    </div>
    </template>
      </Card>
      <Card class="w-1/4 border h-32 shadow-none"> 
    <template #subtitle>
       Current Close
    </template>
    <template #content>
    <div class="flex justify-between items-center">
      <span>  {{currentData.close}}</span>
      <div>
      <Up v-show="Close == 'up'"></Up>
      <Down v-show="Close == 'down'"></Down>
      </div>
    </div>
    </template>
      </Card>
      <Card class="w-1/4 border h-32 shadow-none"> 
    <template #subtitle>
       Current High
    </template>
    <template #content>
      <div class="flex justify-between items-center">
      <span>  {{currentData.high}}</span>
      <div>
      <Up v-show="High == 'up'"></Up>
      <Down v-show="High == 'down'"></Down>
      </div>
    </div>
    </template>
      </Card>
      <Card class="w-1/4 border h-32 shadow-none"> 
    <template #subtitle>
       Current Low
    </template>
    <template #content>
      <div class="flex justify-between items-center">
      <span>  {{currentData.low}}</span>
      <div>
      <Up v-show="Low == 'up'"></Up>
      <Down v-show="Low == 'down'"></Down>
      </div>
    </div>
    </template>
      </Card>
      
      </div>
      
           <Chart v-show="val == 1" :data=currentData></Chart>
           <Chart2 v-show="val== 2" :data=currentData></Chart2>
        </client-only>
      </div>
    </div>
    <div class="h-full w-1/4 flex flex-col items-center mt-20 px-4 space-y-3">
     <div class="p-2 bg-gray-300 rounded flex flex-col space-y-3 w-full" >
 <span>
  Symbol Details
 </span>
 <div class="bg-white flex flex-col space-y-4 p-2 rounded" >
<div class="flex justify-between">
  <span class="font-bold">Name</span>
  <span class="font-light">R_100</span>
</div>
<div class="flex justify-between">
  <span class="font-bold">Market</span>
  <span class="font-light">synthetic</span>
</div>

 </div>
     </div>
     <div class="p-2 bg-gray-300 rounded flex flex-col space-y-3 w-full">
      <Btn class=" border-none py-3 px-4 text-xs" :class="(val==1) ? 'bg-blue-500':'bg-gray-500' " label="Candle Stick Chart" @click="Switch(1)"/>
      <Btn class="  border-none py-3 px-4 text-xs" :class="(val==2) ? 'bg-blue-500':'bg-gray-500'" label="Area Chart" @click="Switch(2)" />
     </div>
    </div>
  </section>
 </main>
</template>

<script>
import Card from 'primevue/card';
import  { realmLogin,realmApp } from '../utils/realm.js'
import symbols from '../utils/symbols.json'

export default {
components:{
  Card,
},
watch:{
    currentData:function(newval,oldval){
     if(newval.open > oldval.open){
      this.Open = "up"
     
     }else if(newval.open == oldval.open){
      this.Open = 'same'
     }else{
      this.Open = 'down'
     }

     if(newval.close > oldval.close){
      this.Close = "up"
     
     }else if(newval.close == oldval.close){
      this.Close = 'same'
     }else{
      this.Close = 'down'
     }

     if(newval.high > oldval.high){
      this.High = "up"
     
     }else if(newval.high == oldval.high){
      this.High = 'same'
     }else{
      this.High = 'down'
     }

     if(newval.low > oldval.low){
      this.Low = "up"
     
     }else if(newval.low == oldval.low){
      this.Low = 'same'
     }else{
      this.Low = 'down'
     }

    }
  },
data(){
  return{
    currentData:{
      high:0,
      low:0,
      close:0,
      open:0
    },
    Open:'',
    Close:'',
    High:'',
    Low:'',
    selectedSymbol: null,
    selectedChart:1,
    Symbols: symbols["active_symbols"],
    FETCHING_DATA:false
  }
},
  mounted(){
    this.getDataInit()
  },
  computed:{
   val:function(){
    return this.selectedChart
   }
  },
 
  methods:{
   async watchCollection(){

      const collection = realmApp.currentUser
      .mongoClient("mongodb-atlas")
      .db("test")
      .collection("candles")
  
    for await (const change of collection.watch()) {
      const { documentKey, fullDocument } = change;
          console.log(`new document with _id: ${documentKey}`, fullDocument);
          const data = {
            epoch:fullDocument.raw.epoch,
            open:fullDocument.open,
            close:fullDocument.close,
            high:fullDocument.high,
            low:fullDocument.low,
          }
          this.currentData = data;
          this.FETCHING_DATA = false
    }
  },
  Switch(value){
    this.selectedChart = value
  },
  refresh(){
    window.location.reload()
  },
  async getData(){
    this.FETCHING_DATA = true
    this.watchCollection()
    const response = await $fetch(`http://localhost:9000/candles/R_100`)
    console.log('response',response)

  },

  async getDataInit(){
    this.FETCHING_DATA = true
    this.watchCollection()
    const response = await $fetch(`http://localhost:9000/candles/R_100`)
  },


  async Unsubscribe(){
    const response = await $fetch(`http://localhost:9000/cancel`)
    console.log(response)
  }

  },
setup(){
  const value = ref('60')
return{
  value
}
}
}


</script>

<style>

</style>