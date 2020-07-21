<template>
  <div class="box">
    <van-nav-bar title="确认订单" left-arrow @click-left="goBack" />
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
   
    <!-- 商品列表 -->
    <div class="goods">
      <p class="header">商品列表</p>
      <van-card
        v-for="(item,index) in this.$store.state.orderList"
        :key="index"
        :thumb="item.pic"
        :num="item.nums"
        :title="item.name"
        :price="item.price"
      ></van-card>
    </div>
    <!-- 备注 -->
    <div class="remark">
      <van-field placeholder="如需备注请输入" label="备注" />
    </div>

    <!-- 底部确认订单 -->
    <van-submit-bar
      :price="this.$store.getters.totalj*100"
      button-text="确认订单"
      @submit="createorder"
    />
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  name: "",
  data() {
    return {
      addressInfo: []
    };
  },
  created() {},
  mounted() {
    this.getAddress();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取默认地址
    getAddress() {
      // 获取用户信息
      let data = storage.get("yx_user", true);
      if (data == null) {
        this.$toast.fail("请先登录");
        this.$router.push("/shop/login");
        return false;
      }
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/default",
        params: {
          token: data.token
        }
      }).then(res => {
        console.log(res);
        if (res.code != 0) {
          this.$toast.fail("请先登录");
          this.$router.push("/shop/login");
        }
        this.addressInfo = res.data;
      });
    },
    // 创建订单信息
    createorder() {
      let user = storage.get("yx_user", true);
      let arr = [];
      this.$store.state.orderList.forEach(item => {
        let object = new Object();
        object.goodsId = item.goods_id;
        object.number = item.nums;
        object.propertyChildIds = item.properties;
        object.logisticsType = 0;
        arr.push(object);
      });
      // console.log(arr)
      // 实例话
      let formdata = new FormData();
      formdata.append("token", user.token);
      formdata.append("goodsJsonStr", JSON.stringify(arr));
      console.log(formdata);
    //   创建订单得接口数据
      this.$axios.post("https://api.it120.cc/small4/order/create",
        formdata
      ).then(res => {
          this.$toast.loading({
              message:"大叔订单生成中，别着急"
          })
          this.$store.commit("setOrderInfo",res.data)

          setTimeout(()=>{
              this.$router.push("/pay")
          },1000)
      });
    }
  }
};
</script>

<style  lang="scss"  scoped>
.box {
  width: 100%;

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
}
</style>
