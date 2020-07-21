<template>
  <div class="box">
    <div id="lyr">
      <!-- 轮播图开始 -->
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.picUrl" alt />
        </van-swipe-item>
      </van-swipe>
      <!-- 分类凯斯 -->
      <!-- 四个小按钮 -->
      <nav>
        <ul>
          <li>
            <van-icon name="like" color="red" size="50" />
            <p>签到</p>
          </li>
          <li>
            <van-icon name="cart" color="red" size="50" />
            <p>礼卷</p>
          </li>
          <li>
            <van-icon name="setting" color="red" size="50" />
            <p>砍价</p>
          </li>
          <li>
            <van-icon name="cart-circle" color="red" size="50" />
            <p>专栏</p>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 四个小按钮结束 -->
    <!-- 全民砍价 -->
    <div class="lyritem" v-for="(item,index) in cutList" :key="index">
      <div class="item-left">
        <img :src="item.pic" />
      </div>
      <div class="item-right">
        <p v-html="item.name"></p>
        <p v-html="item.characteristic"></p>
        <ol>
          <li>
            <p>￥{{item.minPrice}}</p>
            <p>低价</p>
          </li>
          <li>
            <p>￥{{item.originalPrice}}</p>
            <p>原价</p>
          </li>
          <li>
            <p>{{item.stores}}</p>
            <p>限量</p>
          </li>
        </ol>
      </div>
    </div>
    <!-- 砍价结束 -->
    <!-- 组件切换 -->
    <!-- 组件切换 -->
  <!-- <div class="page">
        <router-view></router-view>
      </div>
      <van-tabbar route active-color="red">
        <van-tabbar-item icon="home-o" to="/shou">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/Fen">分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/gou">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/w">个人</van-tabbar-item>
      </van-tabbar> -->
    <!-- 不能结束-->
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      bannerList: [],
      cutList: []
    };
  },
  created() {},
  mounted() {
    this.getBanner();
    this.getCut();
  },
  methods: {
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
    getCut() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        // 截取条数4条
        if (res.code == 0) {
          let a = Object.keys(res.data.goodsMap).splice(-4);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;

  #lyr {
    width: 100%;
    margin-bottom: 0.3rem;
    position: relative;
    img {
      width: 100%;
    }
    nav {
      width: 100%;
      height: 2rem;
      position: absolute;
      padding: 0.12rem;
      box-sizing: border-box;
      bottom: 0px;
      background-color: white;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          width: 100%;
          text-align: center;
          p {
            margin-top: 0.13rem;
            font-size: 0.35rem;
          }
        }
      }
    }
  }
  // 四个按钮结束
  // 砍价四条数据开始
  .lyritem {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.1rem;
    box-sizing: border-box;
    .item-left {
      width: 30%;
      padding: 0.1rem;
      box-sizing: border-box;
      img {
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    .item-right {
      width: 70%;
      padding-left: 0.2rem;
      box-sizing: border-box;
      p {
        line-height: 0.6rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(2) {
        color: #808080;
      }
      ol {
        width: 100%;
        display: flex;
        justify-content: space-between;
        li {
          width: 30%;
          text-align: center;
        }
      }
    }
  }
  // 不能结束
}
</style>
