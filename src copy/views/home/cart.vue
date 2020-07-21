<template>
  <div>
    <van-nav-bar title="我的购物车" left-arrow @click-left="goBack()" />
    <!-- 购物车-->
    <div class="item" v-for="(item,index) in cutList" :key="index">
      <van-checkbox v-model="item.checked" />
      <van-card class="card" num="2" :price="item.price" :title="item.name" :thumb="item.pic">
        <template #num>
          <van-stepper v-model="item.nums" />
        </template>
      </van-card>
    </div>
    <!-- 提交地址 -->
    <van-submit-bar :price="totalAmount" button-text="提交订单" @submit="submitOrder">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cutList: [],
      checked: true
    };
  },
  computed: {
    totalAmount() {
      let amounts = 0;
      this.cutList.forEach(item => {
        if (item.checked == true) {
          amounts += item.nums * item.price;
        }
      });
      return amounts * 100;
    }
  },
  created() {},
  watch: {
    cutList: {
      handler(value) {
        // this.$store.commit("addCart", value);
        // this.$store.commit("countCarts");
        //    this.$store.commit(" setOrderList");
        let arr = value.filter(item => {
          return item.checked == true;
        });
        if (value.length == arr.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.cutList = this.$store.state.cutList;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitOrder() {
      this.$toast.loading({
        message: "商品准备中",
        overlay: true,
        duration: 1000 //一直站是
      });
      // 获取定单信
      this.$store.commit("setOrderList");
      setTimeout(() => {
        this.$router.push("/order/d");
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  // width: 100%;
  display: flex;
  padding: 0.2rem;
  box-sizing: border-box;
  .card {
    flex: 1;
  }
}
</style>
