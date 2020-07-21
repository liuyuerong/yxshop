<template>
    <div>
  <van-nav-bar title="确认付款" left-arrow  @click-left="goBack"/>
    <!-- 页面内容 -->
    <div class="ding">
      <div>
        <van-icon name="location-o" />
      </div>
      <div>
        <p>{{addressInfo.linkMan}}-{{addressInfo.mobile}}</p>
        <p>{{addressInfo.address}}</p>
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
    </div>
 <div class="ding">
      <div>
        <van-icon name="gold-coin-o" />
      </div>
      <div>
        <p>订单编号:{{this.$store.state.orderInfo.orderNumber}}</p>
      <p>订单总额:￥{{this.$store.state.orderInfo.amount}}</p>
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 立即支付 -->
 <div class="bottom">
        <van-button type="danger" block @click="doPay">立即支付</van-button>
    </div>
<!-- 不能结束 -->
    </div>

</template>

<script>
import storage from "@/utils/storage";
export default {
    name:"",
    data() {
        return {
addressInfo:[],
        };
    },
    created() {

    },
    mounted() {
        this.getAddress()
    },
    methods: {
        goBack() {
      this.$router.go(-1);
    },
getAddress() {
      //获取用户的基本信息
      let data = storage.get("yx_user", true);
     
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token:data.token
        }
      }).then(res => {
        this.addressInfo = res.data;
      });
    },
    // 支付
          doPay(){
        this.$toast.success("支付成功");
        this.$store.commit("clear");//清空所有的数据
        this.$router.push("/home");
    }
 
    }
};
</script>

<style lang="scss" scoped>
.ding {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: #dddddd 2px solid;

    p {
      line-height: 0.6rem;
    }
   
  }
    .bottom{
      width: 100%;
      position:fixed;
      bottom: 0px;
  }
</style>
