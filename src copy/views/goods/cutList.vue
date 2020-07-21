<template>
  <div>
    <!--  -->
    <van-nav-bar title="砍价列表" left-arrow @click-left="goHome" />
    <Kan :cutList="cutList" />
  </div>
</template>

<script>
import Kan from "@/components/home/kan";
export default {
  name: "",
  data() {
    return {
      cutList: []
    };
  },
  created() {},
  components: {
    Kan
  },
  mounted() {
    this.aa();
  },
  methods: {
    aa() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        this.cutList = res.data.goodsMap;
      });
    },
    goHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
</style>
