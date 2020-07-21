<template>
  <div>
    <van-nav-bar title=" 严选专栏" left-arrow @click-left="goHome"/>
    <!-- 文章列巴 -->
    <div class="spical">
      <router-link tag="div" :to="'/deil/'+item.id" class="s-item" v-for="(item,index) in lunList " :key="index">
            <img :src="item.pic" alt />
        <p v-html="item.title"></p>
        <p v-html="item.descript"></p>
        <p> <van-button round style="background-color:none">查看详情</van-button></p>
      </router-link>
    
  
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      lunList: []
    };
  },
  created() {},
  mounted() {
    this.getlun();
  },
  methods: {
    getlun() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        this.lunList = res.data;
        console.log(res.data);
      });
    },
    goHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.spical {
  width: 100%;
//   background-color: yellow;
  padding: 0.2rem;
  box-sizing: border-box;
  .s-item {
    width: 100%;
    position: relative;
    margin-bottom: 0.3rem;
    img {
      width: 100%;
    }
    p {
      width: 80%;
      line-height: 0.5rem;
      text-align: center;
      position: absolute;
      left: 5%;
      color: white;
    }
    p:nth-of-type(1) {
      top: 0.4rem;
    }
    p:nth-of-type(2) {
      top: 0.8rem;
    }
    p:nth-of-type(3) {
      top: 2.2rem;
    }
  }
}
</style>
