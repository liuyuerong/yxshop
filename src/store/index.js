import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store =new Vuex.Store({
// 数据库
    state:{
        // 这是那个lodding值
        loding:false,
},
// 设置state的值
mutations:{
setLoding(state,payload){
    state.loding =payload;

}
},
getters:{

},
actions:{

},
modules:{


}
})

export default store