<template>
  <main class="">
    {{props}}
    <InputText :placeholder="placeholder" type="text" class="w-full"/>
  </main>
</template>

<script>
export default {
    props:['place'],
    setup(props){
        const placeholder = props.place
     return{
        placeholder
     }
    }

}
</script>

<style>

</style>