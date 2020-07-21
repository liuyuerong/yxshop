import Index from '@/views/home/shou';
import S from '@/views/home/s';
import Fen from '@/views/home/fen';
import Gou from '@/views/home/gou';
import W from '@/views/home/w';
import T  from '@/views//home/index'
// Vue.use(Router)
const shop =[
    {
        path:'/t',
        name:'T',
        component:T,
       children:[
        {
            path:'/shou',
            name:'Index',
            component:Index,
            meta:{
                title:"首页"
            }
        },
        {
            path:'/fen',
            name:'Fen',
            component:Fen,
            meta:{
                title:"分类"
            }
        },
        {
            path:'/gou',
            name:'Gou',
            component:Gou,
            meta:{
                title:"购物车"
            }
        },
        {
            path:'/w',
            name:'W',
            component:W,
            meta:{
                title:"我的"
            }
        },
    
       ]
    },
   
]
// / 记得一定要抛出
export default shop ;
 