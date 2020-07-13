<template>
  <div>
    <van-search placeholder="请输入搜索关键词" v-model="keywords" 
    @keydown.enter="setHist"
    />
    <!-- <template #left>
      <!-- <van-icon  name="arrow-left" size="20" @click="goBack"/> -->
    <!-- </template> --> 
    <!-- 历史记录 -->
    <div class="history" v-show="hFlog">
      <div class="h-head">
        历史记录
        <van-icon name="delete"  @click=" removeh"/>
      </div>
      <div class="items">
        <div class="h-item" v-for="(item,index) in historyList" :key="index" >{{item}}</div>
      </div>
    </div>
    <Tui :goodList="getGoods" v-show="!hFlog" />
  </div>
</template>
<script>
import Tui from "@/components/home/tui";
import storage from '@/utils/storage'
export default {
  name: "",
  data() {
    return {
      keywords: "",
      seachGoods: [],
    //   判断历史记录
      hFlog:true,
      historyList:[],
    };
  },
  components: {
    Tui
  },
  computed: {
    //   搜索关键字
    getGoods() {
        if (this.keywords == "") {
             this.hFlog=true;
          return [];
        }
      this.hFlog=false;
      return this.seachGoods.filter(item => {
        return item.name.indexOf(this.keywords) > -1;
      });
    }
  },
  created() {},
  mounted() {
    this.getShop();
     this.getHistory();
  },
  methods: {
    getShop() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list"
      }).then(res => {
        this.seachGoods = res.data;
        console.log(this.seachGoods);
      });
    },
    getHistory(){
        let data=storage.get("yx_history",true);
        this.historyList=(data == null? [] :data);

    },
    setHist(){
        // 判断keywords
        if(this.keywords == ""){
            return false;
        }
        this.historyList.unshift(this.keywords);
        if(this.historyList.length>8){
            this.historyList.pop();
        }
        storage.set("yx_history",this.historyList,true);
        this.keywords="";
    },
    removeh(){
storage.remove("yx_history");
this.getHistory();
    },
    // goBack(){
    //     this.$router.go(-1)
    // }
// 不能结束
  }
};
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  .h-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.22rem;
    font-weight: bold;
    line-height: 0.7rem;
  }
  .items {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .h-item {
      width: 23%;
      margin: 1%;
      background-color: red;
      border-radius: 0.1rem;
      padding: 0.15rem;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
