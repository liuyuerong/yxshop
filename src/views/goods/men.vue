<template>
  <div class="box">
      <div class="arrow"  >
          <van-icon name="arrow-left" size="30"  @click="goHome"/>
      </div>
   <van-swipe :autoplay="3000">
       <van-swipe-item v-for="(item,index) in bo" :key="index">
           <img :src="item.pic" alt="">
       </van-swipe-item>
   </van-swipe>
   <div class="center"></div>
  <!-- // -->
  <!-- 选项卡/ -->
  <div class="tab-list">
      <van-tabs v-model="active">
  <van-tab title="商品介绍">
      <p v-html="content"></p>
  </van-tab>
  <van-tab title="商品评价">
      <p></p>
  </van-tab>
</van-tabs>
  </div>
  <!-- 购物车 -->
  <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服"  />
  <van-goods-action-icon icon="cart-o" text="购物车" />
  <van-goods-action-icon icon="shop-o" text="店铺" />
  <van-goods-action-button
    type="danger"
    text="立即购买"
  
  />

</van-goods-action>
   </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
     gId: 0,
    //   商品图
      bo:[],
      active:0,
      content:null,
    //  goodsId:0,
    };
  },
  created() {},
  mounted() {
    this.gId = this.$route.params.id;
    this.goodsId=this.$route.params.id;
    this.getGOOdinfo();
    // this.ping();
  },
  methods: {
    getGOOdinfo(){
      this.$axios({
        url:"https://api.it120.cc/small4/shop/goods/detail",
       
        params: {
          id:this.gId
        }
      }).then(res => {
        console.log(res);
        // this.lun.push(res.data.pic);/
        this.bo=res.data.pics;
    this.content=res.data.content;
        // console.log(this.bo)
      });
    },
    // 获取商品评价接口
    // ping(){
    //     this.$axios({
    //         url:"https://api.it120.cc/small4/shop/goods/reputation",
    //          params: {
    //       id:this.gId
    //     }

    //     }).then(res=>{
    //         console.log(res)
    //     })
    // },
    goHome() {
      this.$router.push("/home");
    },
  
  }
};
</script>

<style lang="scss">
.box{
    .arrow{
        // position: relative;
        padding: .3rem;
        background-color:white;
        position: fixed;
        top: .5rem;
        border-radius: .5rem;
        width: 30px;
        height: 30px;
        left: .3rem;
        color: red;
        z-index: 10;
    }
    width: 100%;
    .center{
        width: 100%;
        height: 2rem;
        background-color: yellow;
    }
    .tab-list{
        background-color:white;
        width: 100%;
        margin-top: .2rem;
        p{
            padding: .15rem;
            width: 100% !important;
            box-sizing: border-box;
            img{
                width: 100% !important;
            }
        }
    }
}
.van-icon-arrow-left{
    z-index: 111111;
}
</style>
