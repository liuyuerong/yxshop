<template>
    <div id="lu">
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
          <router-link tag="li"  to="/cutList">
             <van-icon name="setting" color="red" size="50" />
            <p>砍价</p>
            </router-link>
            <router-link tag="li"  to="/spical">
             <van-icon name="cart-circle" color="red" size="50" />
            <p>专栏</p>
            </router-link>
            
          <!-- <li>
            <van-icon name="cart-circle" color="red" size="50" />
            <p>专栏</p>
          </li> -->
        </ul>
      </nav>
    </div>
</template>

<script>
export default {
    name:"",
     props:["bannerList"],
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

<style  lang="scss" scoped>
#lu {
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
      background-color:white;
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
</style>
