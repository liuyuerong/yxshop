<template>
  <div id="app">
   <Loding  v-show="this.$store.state.loding" > 
  </Loding>
    <router-view/>
  </div>
</template>

<script>
import Loding from "@/components/common/loding"
export default {
  name: 'App',
  components:{
 Loding 
  },
}
</script>

<style>
</style>
