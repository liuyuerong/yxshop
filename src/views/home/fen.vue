<template>
  <div>
    <van-search placeholder="请输入搜索关键词" @focus="goodseach()" />
    <!-- 分类数据 -->
    <van-tree-select :items="topCate" :main-active-index.sync="activeIndex">
      <template #content>
        <div class="sub_cate">
          <div class="item" v-for="(item,index) in subCate" :key="index" @click="t(item)">
            <img :src="item.icon" />
            <p>{{item.name}}</p>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 顶级分类
      topCate: [{ text: "所有分类" }],
      // 顶级分类的id
      cateIds: [0],
      // 切换
      categoryList: [], //所有分类
      activeIndex: 0
    };
  },
  created() {},
  computed: {
    subCate() {
      let arr = this.categoryList;
      // 当前的所有分类
      if (this.activeIndex == 0) {
        return arr;
      }
      //
      return arr.filter(item => {
        return item.pid == this.cateIds[this.activeIndex];
      });
    }
  },
  mounted() {
    this.getCate();
  },
  methods: {
    // 获取商品分类的数据
    getCate() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/category/all"
      }).then(res => {
        console.log(res.data);
        this.categoryList = res.data;
        // 算选
        res.data.forEach(item => {
          if (item.pid == 0) {
            console.log(item);
            this.topCate.push({ text: item.name });
            this.cateIds.push(item.id);
          }
          // console.log(this.cateIds)
        });
      });
    },
    // 点击切换
    changeLeft(index) {
      console.log(this.cateIds[index]);
    },

    t(item) {
      this.$router.push({
        path: "/goodfen",
        query: {
          id: item.id
        }
      });
      console.log(item.id);
    },
    // 搜索开始
    goodseach() {
      this.$router.push("/seach");
    }
    // 不饿能结束
  }
};
</script>

<style lang="scss" scoped>
// .van-tree-select{
//     height: 100%;
// }
.sub_cate {
  max-height: 100%;
  position: fixed;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 20%;
    margin: 1%;
    img {
      width: 90%;
    }
    p {
      // line-height: .6rem;
      width: 90%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
