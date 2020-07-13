<template>
  <div class="box">
    <Banner :bannerList="bannerList" />
    <div class="cut">
      <router-link to="/cutList" color="black">
      <p class="cut-head">砍价列表➡</p>
      </router-link>
      <!--砍价列表信息-->
      <Kan :cutList="cutList" />
    </div>
    <!-- 下一个自定义轮播 -->
    <Jing :lunList="lunList" />
    <!-- 人气推荐部门 -->
    <div class="goods">
       <router-link to="/goodList" color="black">
      <p class="good-header">推荐列表➡</p>
      </router-link>
      <Tui :goodList="goodList" />
      <div />

      <!-- 不能结束 -->
    </div>
  </div>
</template>

<script>
import Banner from "@/components/home/banner";
import Kan from "@/components/home/kan";
import Jing from "@/components/home/jing";
import Tui from "@/components/home/tui";
export default {
  name: "",
  data() {
    return {
      bannerList: [],
      cutList: [],
      lunList: [],
      goodList: []
    };
  },
  components: {
    Banner,
    Kan,
    Tui,
    Jing,
  },
  mounted() {
    this.getBanner();
    this.getCut();
    this.getlun();
    this.getShop();
  },
  methods: {
    //   获取轮播图代码
    getBanner() {
      this.$axios({
        url: "https://api.it120.cc/small4/banner/list"
      }).then(res => {
        if (res.code == 0) {
          this.bannerList = res.data;
        }
        // console.log(res);
      });
    },
    //    砍价开始
    getCut() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        if (res.code == 0) {
          let a = Object.keys(res.data.goodsMap).splice(-3);
          let b = [];
          a.forEach(i => {
            b.push(res.data.goodsMap[i]);
          });
          this.cutList = b;
          //   this.cutList = res.data.goodsMap;
          console.log(res.data.goodsMap);
        }
        // console.log(res);
      });
    },
    //   下一个砍价
    getlun() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list"
      }).then(res => {
        if (res.code == 0) {
          this.lunList = res.data;
        }
        // console.log(res)
      });
    },
    getShop() {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;

  .cut {
    width: 100%;
    background-color: #fff;
    .cut-head {
      line-height: 0.88rem;
      width: 100%;
      font-size: 0.4rem;
      text-align: center;
    }
    //砍价列表信息
  }
  //   又一个轮播
  // .lun {
  //   width: 100%;

  //   .header {
  //     line-height: 0.88rem;
  //     width: 100%;
  //     font-size: 0.4rem;
  //     text-align: center;
  //   }
  //   img {
  //     width: 95%;
  //     height: 3rem;
  //     border-radius: 0.3rem;
  //   }
  //   p {
  //     width: 100%;
  //     overflow: hidden;
  //     font-size: 0.25rem;
  //     margin-top: 0.12rem;
  //   }
  // }

  // 人气推荐
  .goods {
    width: 100%;
    margin-top: 0.15rem;
    .good-header {
      line-height: 0.88rem;
      width: 100%;
      font-size: 0.4rem;
      text-align: center;
    }
  }
  // 不能结束
}
.box {
  padding-bottom: 1rem;
}
</style>
