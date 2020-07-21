 
 const storage = {
// 设置本地存贮.是否需要json
set:function(key,value,isJson=false){
if(key.length == 0|| value.length ==0){
    return false
}
let data =(isJson==true ? JSON.stringify(value) :value);
// 设置缓存值
localStorage.setItem(key,data);
},
// 获取
get:function(key,isJson=false){
// 判断
if(key.length ==0){
    return false;
}
// 从本地获取
let data=localStorage.getItem(key);
// 判断
return isJson==true ? JSON.parse(data) :data;
},
remove:function(key){
    if(key.length ==0){
        return false;
    }
    localStorage.removeItem(key)
}
}
// 将他跑出去
export default storage