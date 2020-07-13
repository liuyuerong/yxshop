<template>
    <div>
  <div class="good-item">
    <router-link tag="div" class="g-item" v-for="(item,index) in goodList" :key="index" :to="'/men/'+item.id">
<img :src="item.pic" alt="">
            <p v-html="item.name"></p>
            <p v-html="'￥'+item.originalPrice"></p>
    </router-link>
          <!-- <div class="g-item" v-for="(item,index) in goodList" :key="index">
            
          </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    props:["goodList"],
    data() {
        return {
        };
    },
    created() {

    },
    mounted() {
       
    },
    methods: {
 
    }
};
</script>

<style  lang ="scss" scoped>
.good-item{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .g-item{
    width: 48%;
    margin: 1%;
    img{
      width: 100%;
     height: 4rem;
    }
    p{
      line-height: .45rem;
    }
  }
}
</style>
