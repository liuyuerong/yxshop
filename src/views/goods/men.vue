<template>
  <div class="box">
    <div class="arrow">
      <van-icon name="arrow-left" size="30" @click="goHome" />
    </div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in bo" :key="index">
        <img :src="item.pic" alt />
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
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="gocart()" :badge="this.$store.state.nums" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button type="warning" text="加入购物车" @click="skuShow = true" />
    </van-goods-action>
    <!-- 商品 -->
    <van-sku v-model="skuShow" :sku="sku" :goods="goods" @add-cart="addCart"
    @sku-selected="selectedSku"
     />
    <!-- 不能结束 -->
  </div>
  <!--  -->
</template>

<script>
export default {
  name: "",
  data() {
    return {
      gId: 0,
      //   商品图
      bo: [],
      active: 0,
      content: null,
      goodsInfo: [],
      // sku商品数据
      skuShow: false,
      // sku商品
      sku: {
        tree: [
          {
            k: "颜色",
            k_s: "c1",
            v: [
              { id: 1, name: "白色" },
              { id: 2, name: "红色" },
              { id: 3, name: "蓝色" }
            ]
          }
        ],
        list: [
          { id: 1000, c1: 1, price: 3000, stock_num: 123 },
          { id: 1000, c1: 2, price: 10000, stock_num: 123 },
          { id: 1000, c1: 3, price: 4000, stock_num: 123 }
        ],
        price: 1000,
        stock_num: 100
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: ""
      },
      customStepperConfig: {
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          console.log(currentValue);
          //把点击步进器的值，给nums，记录数量
          this.nums = currentValue;
        }
      },
      nums:1,
      // 选中商品得
      propertyIds:"",
    };
  },
  created() {},
  mounted() {
    this.gId = this.$route.params.id;
    // this.goodsId = this.$route.params.id;
       this.getGOOdinfo();
      //  计算购物车总数量
    this.$store.commit("countCarts");
  },
  methods: {
    getGOOdinfo() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/detail",
        params: {
          id: this.gId
        }
      }).then(res => {
        console.log(res);
        // this.lun.push(res.data.pic);/
        this.bo = res.data.pics;
        this.content = res.data.content;
        // 设置商品的基本信息
        this.goodsInfo = res.data.basicInfo;
        this.setSku(res.data.properties);
        // 小图片
        this.goods.picture = this.bo[0].pic;
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
    // 设置sku的信息
    setSku(property) {
      //定义sku属性不存在
      if (property == undefined) {
        return false;
      }
      let tree = []; //商品sku的规格信息
      let list = []; //商品sku的组装信息
      //遍历属性
      property.forEach(element => {
        //格式化sku的规格信息
        let object = new Object();
        object.k = element.name;
        object.k_s = `c_${element.id}`;
        object.v = element.childsCurGoods;
        tree.push(object); //处理对象的方式
      });
      console.log(tree);
      tree.forEach(item => {
        item.v.forEach(element => {
          console.log(element);
          let obj = new Object();
          obj.id = item.k_s.split("_")[1]; //截取数据，提取sku的ID信息
          obj[item.k_s] = element.id;
          obj.price = 1000;
          obj.stock_num = 120;
          list.push(obj);
        });
      });
      this.sku.tree = tree;
      console.log(list);
      this.sku.list = list;
    },
    // 切换规格得时候
      selectedSku(data){
console.log(data)
this.propertyIds=`${data.skuValue.propertyId}:${data.skuValue.id}`
    },
    goHome() {
      this.$router.push("/home");
    },
    // 加入购物车
    addCart() {
      // console.log("test");
      let data = localStorage.getItem("yx_user");
      // 用户为登录跳转到登录
      if (data == null) {
        this.$toast.fail("请先登录");
        this.$router.push("/shop/login");
        return false;
      }
       //用户已经登录的信息,添加购物车信息，
      let cutList = this.$store.state.cutList; //购物车的列表数据
      //找出
      let index = cutList.findIndex(item => {
        //判断当前商品的ID是否重复
        return item.goods_id == this.gId;
      });
      console.log(index);
      // return false;
      if (index == -1) {
        //添加购物车对象信息
        let object = new Object();
        object.goods_id = this.gId; //
        object.name = this.goodsInfo.name;
        object.price = this.goodsInfo.originalPrice;
        object.nums = this.nums;
        object.properties = this.propertyIds;//商品规格信息
        object.checked = true;
        object.pic = this.goods.picture;
        cutList.push(object);
      }else{
        cutList[index].nums += this.nums;//数量的自增的操作
      }
      this.skuShow = false; //控制底部弹框的隐藏
      this.$toast.success("添加购物车成功");
      this.$store.commit("addCart", cutList);
      this.$store.commit("countCarts");
    },
    gocart(){
      this.$router.push("/cart")
    }
    // 不饿能
  }
};
</script>

<style lang="scss">
.box {
  .arrow {
    // position: relative;
    padding: 0.3rem;
    background-color: white;
    position: fixed;
    top: 0.5rem;
    border-radius: 0.5rem;
    width: 30px;
    height: 30px;
    left: 0.3rem;
    color: red;
    z-index: 10;
  }
  width: 100%;
  .center {
    width: 100%;
    height: 2rem;
    background-color: yellow;
  }
  .tab-list {
    background-color: white;
    width: 100%;
    margin-top: 0.2rem;
    p {
      padding: 0.15rem;
      width: 100% !important;
      box-sizing: border-box;
      img {
        width: 100% !important;
      }
    }
  }
}
.van-icon-arrow-left {
  z-index: 111111;
}
</style>
