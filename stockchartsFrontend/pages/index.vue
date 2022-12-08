<template>
  <main class="w-screen relative h-screen flex justify-center items-center ">
   <div class="auto w-5/12 space-y-4 flex flex-col items-center">
    <span>Login into the system</span>
    <Btn class="w-full text-white" label="Login" @click="login()"/>
   </div>
  </main>
</template>

<script>
import  { realmLogin } from '../utils/realm.js'
export default {
methods:{
    async login(){
       realmLogin().then((res)=>{
         console.log(res)
         if(!res){
            alert('failed to login')
         }
         this.$router.push('/main')
        
       }).catch((error)=>{
        console.log(error)
       })
    }
}
}
</script>

<style>

</style>