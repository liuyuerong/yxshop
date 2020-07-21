<template>
  <div>
         <van-nav-bar title="分类2" left-arrow @click-left="goHome" />
         
    <Tui :goodList="goodList" v-if="goodList.length>0" />
<van-empty description="李学艳大神" v-else/>
  </div>
</template>

<script>
import Tui from "@/components/home/tui";
export default {
  data() {
    return {
      goodList: []
    };
  },
  created() {},
  mounted() {
    this.all();
  },
  methods: {
    all() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        if (res.code == 0) {
          let cc = res.data;
          console.log(res.data);
          this.goodList = cc.filter(item => {
            // console.log(item)
            return item.categoryId==this.$route.query.id;
          });
        }
      });
      //   console.log(this.goodList);
    },
     goHome() {
      this.$router.push("/fen");
    }
  },
  components: {
    Tui
  }
};
</script>

<style  lang="scss"  scoped>
</style>
