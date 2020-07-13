<template>
    <div>
<van-overlay :show="true" >
  <!-- <slot></slot> -->
  <div class="wrapper">
<!-- <van-loading size="44px" color="white"  >加载中...</van-loading> -->
<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3028672281,4280382655&fm=26&gp=0.jpg" alt="">

</div>
</van-overlay>
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

<style  lang="scss" scoped>
.wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
  }
</style>
