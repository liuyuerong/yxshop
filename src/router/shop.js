// 定义一个变量
import Register from "@/views/login/register"
import Login from "@/views/login/login"
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
    }
]
// 记得一定要抛出
export default shop ;