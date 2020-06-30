<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow />
    <!-- 页面主体 -->

    <div id="login">
      <van-form>
        <p class="login-tou">新用户注册</p>
        <!-- 手机号 -->
        <van-field placeholder="请输入手机号" class="inp" v-model="mobile" right-icon="phone" />
        <!-- 密码 -->
        <van-field
          placeholder="请输入密码"
          class="inp"
          v-model="pwd"
          :type="hidePwd ? 'password':'text'"
          @click-right-icon="hidePwd = !hidePwd"
          :right-icon="hidePwd ?'closed-eye':'eye-o'"
          :rules="[{ required: true, message: '不能为空' }]"
        />
        <!-- 确定密码 -->
        <van-field
          placeholder="确定密码"
          class="inp"
          v-model="confirm_pwd"
          :type="hidePwd1 ? 'password':'text'"
          @click-right-icon="hidePwd1 = !hidePwd1"
          :right-icon="hidePwd1 ?'closed-eye':'eye-o'"
        />
        <!-- 用户名 -->
        <van-field placeholder="用户名" v-model="nick" class="inp" right-icon="map-marked" />
        <!-- 验证码 -->
        <van-field placeholder="图形验证码" class="inp" v-model="picCode">
          <template #right-icon>
            <img :src="imgUrl" @click="createImgCode" />
          </template>
        </van-field>
        <!-- 城市 -->
        <van-field
          placeholder="城市"
          v-model="area"
          class="inp"
          right-icon="wap-home"
          @click="areaShow=true"
        />
        <!-- 城市李彪 -->
        <van-popup v-model="areaShow" position="bottom">
          <van-area
            title="选择城市"
            :area-list="areaList"
            @cancel="areaShow=false"
            @confirm="selectedArea"
          />
        </van-popup>
        <van-field placeholder="手机验证码" v-model="code" class="inp">
          <template #button>
            <van-button
              type="danger"
              placeholder="请输入"
              plain
              size="small"
              :disabled="btnIsDisabled"
              @click="sendCode"
            >{{msg}}</van-button>
          </template>
        </van-field>
        <van-button type="info" block class="btn" @click="checkForm">立即注册</van-button>
       <p class="link-login">
<router-link to="/shop/login">已有账号，立即注册</router-link>
       </p>
      </van-form>
    </div>
  </div>
</template>
<script>
// 引入老师发的那个css,重置样式
import "@/assets/style/login.css"
import AreaList from "@/utils/area";
export default {
  name: "",
  mounted(){
    // document.title="严选商城"
    this.createImgCode();
  },
  data() {
    return {
      // 基本表达数据
      mobile: "", //手机号
      pwd: "", //密码
      confirm_pwd: "", //
      nick: "", //用户名
      picCode: "", //手机验证
      code: "", //手机验证码
      // 控制密码
      hidePwd: true,
      hidePwd1: true,
      // / 生成图形验证码
      imgUrl: "",
      // 生成得配置
      picKey: "",
      // 城市
      areaShow: false,
      areaList: AreaList,
      area: "",
      province: "",
      city: "",
      // 倒计时得数组
      msg: "发送",
      btnIsDisabled: false
    };
  },
  created() {},
  methods: {
    //   基本表单校验
    checkForm() {
      // 验证不能为空
      if (
        this.mobile == "" ||
        this.pwd == "" ||
        this.nick == "" ||
        this.picCode == "" ||
        this.code == ""
      ) {
        // 轻提示
        this.$toast.fail("手机号，密码，表单信息不能为空");
        return false;
      }
      var reg = /^[345678]\d{9}$/;
      if (!reg.test(this.mobile)) {
        this.$toast.fail("请输入正确得手机号");
        // return false
      }
      //   确认密码
      if (this.confirm_pwd != this.pwd) {
        this.$toast.fail("密码不能为空,请重新输入");
        return false;
      }
      this.submitRegister()//提交注册
    
    },
    // 生成图形验证码
    createImgCode() {
      this.picKey = new Date().getTime();
      console.log(this.picKey);
      let apiUrl = "https://api.it120.cc/small4/verification/pic/get";
      this.imgUrl = `${apiUrl}?key=${this.picKey}`;
      console.log(this.imgUrl);
    },
    // 悬着cegs
    selectedArea(arr) {
      // console.log(arr)
      this.areaShow = false;
      let tmp = arr.map(item => {
        return item.name;
      });
      console.log(tmp);
      this.province = tmp[0];
      this.city = tmp[1];

      this.area = tmp.join("");
    },
    // 倒计时
    djs() {
      this.btnIsDisabled = true;
      // 倒计时时间
      let timeout = 10;
      // 倒计时时间歌
      let timer = setInterval(() => {
        if (timeout < 1) {
          this.btnIsDisabled = false;
          clearInterval(timer);
          this.msg= `重新发送`;
        
        }
        // 正在倒计时
        this.msg = `${timeout}s再试一次`;
        timeout--;
      }, 1000);
    },
    sendCode() {
      this.$axios({
        url:"https://api.it120.cc/small4/verification/sms/get",
        params: {
          mobile:this.mobile,
          key:this.picKey,
          picCode:this.picCode
        }
      }).then(res => {
        console.log(res);
        // 失败
        if (res.code != 0) {
          this.$toast.fail(res.msg);
          return false;
        }
        this.djs();
      });
    },
    // 注册
    submitRegister(){
      this.$axios({
        url: "https://api.it120.cc/small4/user/m/register",
        params:{
          mobile: this.mobile,
          pwd: this.pwd,
          code: this.code,
          nick: this.nick,
          province: this.province,
          city: this.city
        }
      }).then(res=>{
        console.log(res);
        if(res.code != 0){
          this.$toast.fail(res.msg);
          return false;
        }
        this.$toast.success("小伙你已经成功拉");
        this.$router.push("/");
      })
    }

  }
};
</script>

<style lang="scss" scoped>

</style>
