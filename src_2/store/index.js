import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        shop:[]
    },
    mutations:{
        add(state,t){
            var s = state.shop.find(n => n.name==t.name)
            if(s){
                t.num++
                return false
            }else{
             state.shop.push(t)
            }
        },
        jia(state,t){
            state.shop[t].num++
        },
        jian(state,t){
            state.shop[t].num--
      if(state.shop[t].num<1){
        state.shop.splice(t,1)
        return false
      }
        },
        del(state){
            state.shop = []
        }
    },
    getters:{
        num(state){
            var numm = 0
            state.shop.forEach((m)=>{
                numm+=m.num
            })
            return numm
        },
        total(state){
            var total = 0
            state.shop.forEach((m)=>{
                total+=m.num*m.price
            })
            return total
        }
    }
})
export default store