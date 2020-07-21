import Vue from "vue";
import Vuex from "vuex";
// 导入持久化工具
import VuexPersist from 'vuex-persist';
Vue.use(Vuex);
// 实例化插件
const vuexLocal = new VuexPersist({
    storage: window.localStorage
})
const store = new Vuex.Store({
    // 数据库
    state: {
        // 这是那个lodding值
        loding: false,
        cutList: [],
        nums: 0,//总数
        orderList: [],//订单信息
        orderInfo: [],
    },
    // 设置state的值
    mutations: {
        setLoding(state, payload) {
            state.loding = payload;
        },
        // 添加
        //添加购物车的操作
        addCart(state, payload) {
            state.cutList = payload;
        },
        countCarts(state) {
            console.log("test");
            let tmp = 0;
            //遍历购物车的数量
            console.log(state.cutList);
            state.cutList.forEach(item => {
                tmp += item.nums;
            })
            //计算总数量
            state.nums = tmp;
        },
        setOrderList(state) {
            state.orderList = state.cutList.filter(item => {
                return item.checked == true;
            });
        },
        setOrderInfo(state,payload){
            state.orderInfo = payload;
        },
        clear(state){
            state.cutList=[];
            state.nums=0;
            state.orderInfo=[];
        }
    },
    getters: {
        totalj(state) {
            let jg = 0;
            state.orderList.forEach(item => {
                jg += item.price * item.nums;
            })
            return jg
        }
    },
    actions: {

    },
    modules: {


    },
    plugins: [vuexLocal.plugin]
})

export default store