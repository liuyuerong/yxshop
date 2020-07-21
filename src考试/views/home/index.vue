<template>
 <div>
      <div class="page">
        <router-view></router-view>
      </div>
      <van-tabbar route active-color="red">
        <van-tabbar-item icon="home-o" to="/shou">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/Fen">分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/gou">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/w">个人</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
export default {
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

<style scoped>

</style>
