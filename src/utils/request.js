// 先引入axios
// axios.create方法
// 实力对象
// 创建请求拦截器
// 使用实例响应拦截器
// export抛出实力
// main.js引入实例对象
import axios from 'axios'
// create方法创建一个axios得实例
const Server = axios.create({
    baseURL:"",
    timeout:3000,
});
// 使用serve请求
Server.interceptors.request.use(function(config){
return config;
},function(error){
return Promise.reject(error)
})
// 使用srever方法拦截器
Server.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error)
})
export default Server