<template>
    <div class="article">
    <p class="a-head">精选专题</p>
    <van-swipe :loop="false" :width="300" class="ar-items" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in lunList" :key="index">
        <img :src="item.pic" />
        <p v-html="item.title"></p>
        <p v-html="item.descript"></p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    name:"",
   props:["lunList"],
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

<style lang="scss" scoped>
.article {
  width: 100%;
  margin-top: 0.15rem;
  background-color: #fff;
  .a-head {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.35rem;
  }
  .a-head::after {
    content: ">";
    margin-left: 0.2rem;
  }
  .ar-items {
    margin-left: 0.2rem;
    img {
      width: 90%;
      height: 3rem;
      border-radius: 0.2rem;
    }
    p {
      line-height: 0.5rem;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
