<template>
  <div>
    <!--  -->
    <van-nav-bar title="人气推荐" left-arrow @click-left="goHome" />
    <Tui :goodList="goodList" />
  </div>
</template>

<script>
import Tui from "@/components/home/tui";
export default {
  //   name: "",
  //   props: ["goodList"],
  data() {
    return {
      goodList: []
    };
  },
  created() {},
  components: {
    Tui
  },
  mounted() {
    this.bb();
  },
  methods: {
    bb() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        let arr = res.data.filter(item => {
          return item.name.indexOf("测试") == -1;
        });
        arr.sort(() => {
          return Math.random() - 0.5;
        });
        this.goodList = arr.splice(-6);
        console.log(this.goodList);
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
