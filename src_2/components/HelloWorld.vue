<template>
  <div class="hello">
    <!-- 头部图片 -->
    <img src="/static/1590453442(1).png" alt="" class="zt_img">
    <!-- 左边切换 -->
    <ul class="zt_left">
      <li v-for="(i,n) in arr" :key="n" :class="{active:n==k}" @click="tab(n)">
        {{i.name}}
      </li>
    </ul>
    <ul class="zt_cont">
      <!-- 热卖 -->
      <p class="zt_top" v-show="k==0"><span>热卖</span>老板推荐</p>
          <li v-for="(c,v) in art" :key="v" class="zt_swg">
            <img :src="c.img" alt="">
            <!-- 内容详情 -->
            <div class="zt_right">
              <p class="zt_one">{{c.name}}</p>
              <!-- 小标签 -->
              <ul class="zt_small">
                <li v-for="(d,f) in c.awg" :key="f">
                  {{d.name}}
                </li>
              </ul>
              <p class="zt_two"><span>月售{{c.sale}}</span>赞{{c.big}}</p>
              <p class="zt_price"><span>￥{{c.price}}</span>/1人份<van-icon name="add" @click="add(c)" :class="{select:f}"/></p>
            </div>
          </li>
        </ul>
        <!-- 底部 -->
        <div class="zt_bot" disabled="dis" @click="show=!show" >
          <van-icon name="shop" color="orange"  :badge="num"/>
          <p>总价：￥{{total+num | filed}}元</p>
          <button>去结算</button>
        </div>
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <p class="zt_top" @click="del"><van-icon name="delete" />清空购物袋</p>
          <!-- 商品清单 -->
          <ul>
            <li v-for="(i,n) in shop" :key="n">
              <p class="zt_one">
                <span>{{i.name}}</span>
                <span>￥{{i.price*i.num | filed}}</span>
                <span>
                  <button @click="jian(n)">-</button>
                  {{i.num}}
                  <button @click="jia(n)">+</button>
                </span>
              </p>
            </li>
              <p class="zt_two">包装费￥{{num}}</p>
          </ul>
        </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import Iscroll from 'iscroll'
import Vue from 'vue'
Vue.filter('filed',function(value){
  var value = parseFloat(value).toFixed(1)
  return value
})
export default {
  name: 'HelloWorld',
  data () {
    return {
      arr:[],
      k:0,
      show:false,
   f:false,
   dis:false,
   art:[]
    }
  },
  methods:{
    // 点击切换
    tab(m){
      this.k = m
      this.art = this.arr[m].food
    },
    // 添加商品
    add(n){
      this.$store.commit("add",n)
      this.f = !this.f
    },
    // 清空商品
    del(){
      this.$store.commit("del")
    },
    jian(m){
      this.$store.commit("jian",m)
    },
    jia(m){
      this.$store.commit("jia",m)
    }
  },
  computed:{
    // 商品
    shop(){
       return   this.$store.state.shop 
    },
    // 数量打包费
    num(){
        return   this.$store.getters.num
    },
    // 总价
    total(){
      return   this.$store.getters.total
    }
  },
  mounted(){
      // Vue.use(VueLazyLoad,{
      //     loading:''
      // })
      axios.get('/static/data.json').then((msg)=>{
        console.log(msg.data.list)
        this.arr = msg.data.list
      this.art = this.arr[0].food
      })
  },
  watch:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.select{
  animation: run 1s;
}
// 小球运动
 @keyframes run{
            0%{
                transform: translate(0,0);
            }
            25%{
                transform: translate(-200px,50px);
            }
            50%{
                transform: translate(-300px,80px);
            }
            75%{
                transform: translate(-310px,100px);
            }
            100%{
                transform: translate(-330px,100px)
            }
        }
// 底部
.zt_bot{
  width: 100%;
  position: fixed;
  bottom: 6px;
  background-color: black;
  height:44px;
  border-radius: 0 20px 20px 0;
  p{
    display: inline-block;
    float:left;
    color:white;
  }
  button{
    width: 100px;
    border: none;
    background-color: orange;
    color: white;
    height: 44px;
    border-radius: 0 20px 20px 0;
    float: right;
  }
  .van-icon{
    font-size: 44px;
    background-color: white;
    float:left;
  }
}
// 顶部图片
.zt_img{
  width: 100%;
  height: 190px;
}
// 左边切换布局
.zt_left{
  float:left;
  li{
    width: 80px;
    height: 40px;
    background-color: rgb(241, 241, 241);
    text-align: center;
    line-height: 40px;
  }
  .active{
    background-color: aliceblue;
    font-weight: bolder;
  }
}
// 右边内容布局
.zt_cont{
  width: 75%;
  float: left;
  height: 540px;
  .zt_top{
    width: 100px;
    font-size: 13px;
    margin-top: -6px;
    line-height: 30px;
    height:30px;
    background-color: rgb(250, 167, 12);
    border-radius: 15px 5px 15px 5px;
    span{
      display: inline-block;
      margin-left: 4px;
      height: 20px;
      line-height: 20px;
      width: 30px;
      font-size: 12px;
      border-radius: 2px 5px 15px 2px;
      background-color: black;
      color: rgb(197, 154, 75);
      margin-right: 6px;
    }
  }
  .zt_swg{
    width:100%;
    height:120px;
  }
  img{
    width: 80px;
    height:80px;
    margin-right: 10px;
    float: left;
  }
  .zt_right{
    .zt_one{
    float: left;
    margin-top: -6px;
  }
  .zt_two{
    font-size: 12px;
    color: rgb(206, 206, 204);
    float: left;
    margin-top: 0px;
    span{
      margin-right: 10px;
    }
  }
  .zt_price{
    font-size: 12px;
    float: left;
    margin-top: 18px;
    width: 60%;
    margin-left: -70px;
    span{
      color: red;
      font-size: 16px;
    }
    .van-icon{
      float: right;
      font-size: 20px;
      margin-top: 4px;
      color: orange;
    }
  }
    .zt_small{
      width: 60%;
      height: 20px;
      font-size: 12px;
      margin-top: -10px;
      li{
        float: left;
        margin-right: 10px;
        padding:3px;
        background-color: rgb(236, 236, 235);
      }
      float: left;
    }
  }
}
// 弹出层
.van-popup{
  bottom: 50px;
  .zt_top{
    float: right;
    font-size: 12px;
    color: rgb(191, 188, 194);
    margin-top: 0px;
  }
  ul{
    li{
      .zt_one{
        margin-top: 20px;
         span:nth-child(2){
           position: fixed;
           right:130px;
         }
        span:nth-child(3){
          position: fixed;
          right: 6px;
        }
      }
      .zt_two{
        width:100%
      }
    }
  }
}
</style>
