<template>
    <div>
<van-nav-bar title=" 专题详情" left-arrow @click-left="goHome"/>
<div class="info">
<p v-html="aInfo.title"></p>
<p><img :src="aInfo.pic" alt=""></p>
<p v-html="aInfo.content"></p>
</div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
aid:0,
aInfo:{},
        };
    },
    created() {

    },
    mounted() {
console.log(this.$route.params.id);
this.aid=this.$route.params.id;
this.getInfo()
    },
    methods: {
getInfo(){
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/detail",
     methods:"post",
     params:{
         id:this.aid
     }
      }).then(res=>{
          console.log(res)
          this.aInfo=res.data;
      })
   
},
  goHome() {
      this.$router.push("/spical");
    }
    }
};
</script>

<style lang="scss" scoped>
.info{
    width: 100%;
    padding: .2rem;
    box-sizing: border-box;
    p{
        width: 100%;
        line-height: .87rem;
        margin-bottom: .2rem;
        img{
            width: 100%;
            height: 3rem;
        }
    }
}
</style>
