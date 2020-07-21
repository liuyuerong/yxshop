<template>
  <div>
    <!-- 跟注册得一样 -->
    <van-nav-bar title="用户登录" left-arrow />
    <!-- 表单信息 -->
    <div id="login">
      <p class="login-tou">用户登录</p>
      <van-form>
        <van-field placeholder="请输入手机号" class="inp" right-icon="phone" v-model="mobile" />
        <!-- 密码 -->
        <van-field placeholder="请输入密码" 
        class="inp" v-model="pwd"
         :type="hidePwd ? 'password':'text'"
        :right-icon="hidePwd ?'closed-eye':'eye-o'"
        @click-right-icon="hidePwd = !hidePwd"
         />
        <!-- button· -->
        <van-button type="info" block class="btn" @click="checkLogin">立即注册</van-button>
        <p class="link-login">
          <router-link to="/shop/register">还没有注册? 立即注册</router-link>
        </p>
      </van-form>
    </div>
  </div>
</template>

<script>
import "@/assets/style/login.css";
// 引入本地
// import storage from "@utils/storage"
import storage from "@/utils/storage";
export default {
  name: "",
  data() {
    return {
      mobile: "",
      pwd: "",
      hidePwd:"true",//密码框

    };
  },
 //组件内路由守卫，判断用户是否登陆
  beforeRouteEnter (to, from, next) {
      //获取用户本地存储的token值，判断是否为空
      let data = storage.get("yx_user",true);
      ///已经登陆过，直接跳转到首页
      if(data != null){
          next("/");
      }else{//没有登陆，继续在当前页面停留
          next();
      }
  },
  created() {},
  mounted() {},
  methods: {
      checkLogin(){
     if (this.mobile == "" || this.pwd == "") {
        this.$toast.fail("手机号或密码不能为空");
        return false;
      }
      //校验手机号的格式是否合法
      var reg = /^1[345678]\d{9}$/;
      if (!reg.test(this.mobile)) {
        this.$toast.fail("请输入正确的手机号");
        return false;
      }
      this.dologin();//调用执行登陆的方法
    },
    //   执行
    dologin(){
        this.$axios({
            url:"https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
            params:{
                mobile: this.mobile,
                pwd: this.pwd
            }
        }).then(res=>{
console.log(res)
if(res.code != 0){
    this.$toast.fail(res.msg)
    return false
}
// 使用户登录成功得信息
    let user = new Object();
            user.uid = res.data.uid;
            user.token = res.data.token;
            user.account = this.mobile;
            storage.set("yx_user",user,true);

    this.$toast.success("用户登录成功");
    this.$router.go(-1);//返回上个页面
        })
    }
  }
}
</script>

<style scoped>
</style>
