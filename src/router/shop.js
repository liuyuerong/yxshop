// 定义一个变量
import Register from "@/views/login/register"
import Login from "@/views/login/login"
import Index from "@/views/home/index"
import Cart from '@/views/home/cart'
import Fen from '@/views/home/fen'
import Home from '@/views/home/home'
import My from '@/views/home/my'
import CutList from '@/views/goods/cutlist'
import Re from '@/views/goods/re'
import Goodfen from '@/views/goods/goodfen'
import Seach from '@/views/goods/seach'
// 男士详情页
import Men from '@/views/goods/men'
// 严选专栏
import Spical from '@/views/xq/spical'
import Deil from '@/views/xq/deil'
// 订单详情
import Order from '@/views/order/d'
import Pay from '@/views/order/Pay'
const shop =[
    // 注册路由
    {
path:"/shop/register",
name:"shop_register",
component:Register,
// 如果修改在路由里边修改
meta:{
    title:"严选商城-用户注册大神"
}
    },
    // 登录
    {
        path:'/shop/login',
        name:'shop_login',
        component:Login,
        meta:{
            title:"严选商城-登录大神"
        }
    },
    {
        path:'/goodfen',
        name:"Goodfen",
        component:Goodfen,
        meta:{
            title:'分类2页'
        }
    },
    {
        path:'/seach',
        name:"Seach",
        component:Seach,
        meta:{
            title:'搜索页面'
        }
    },
    {
        path:'/spical',
        name:"Spical",
        component:Spical,
        meta:{
            title:'严选商城严选专栏'
        }
    },
    {
        path:'/deil/:id',
        name:"Deil",
        component:Deil,
        meta:{
            title:'严选商城文章详情'
        }
    },
    {
        path:'/men/:id',
        name:"Men",
        component:Men,
        meta:{
            title:'男士详情页'
        }
    },
    {
        path:'/order/d',
        name:"Order",
        component: Order,
        meta:{
            title:'订单详情页'
        }
    },
    {
        path:"/pay",
        component:Pay
    },
    
    // 二级路由
    // 首页轮播开始
    {
        path:'/home',
        name:'home',
      redirect:"/",
        component:Home,
        children:[
            {
                path:'/',
                name:'index',
                component:Index,
                meta:{
                    title:'首页'
                }
            },
            {
                path:'/fen',
                name:'fen',
                component:Fen,
                meta:{
                    title:'分类'
                }
            },
            {
                path:'/cart',
                name:'cart',
                component:Cart,
                meta:{
                    title:'购物车'
                }
            },
            {
                path:'/my',
                name:'my',
                component:My,
                meta:{
                    title:'我的'
                }
            },
            {
                path:'/cutlist',
                name:'cutlist',
                component:CutList,
                meta:{
                    title:'砍价'
                }
            },
            {
                path:'/goodList',
                name:"Re",
                component:Re,
                meta:{
                    title:'人气推荐'
                }
            },
          
        ]
    },
  
]
// 记得一定要抛出
export default shop ;