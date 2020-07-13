<template>
    <div>
        <!-- 组件切换 -->
        <div class="page">
            <router-view></router-view>
        </div>
<van-tabbar route active-color="red">
  <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/fen">分类</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/my">个人</van-tabbar-item>
</van-tabbar>
    </div>
</template>

<script>
export default {
    name:"",
   
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

