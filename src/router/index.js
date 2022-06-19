//配置路由的地方
import Vue from 'vue'
//引入Vue路由插件
import VueRouter from 'vue-router'

//引入路由数组
import routes from './routes'

//引入store
import store from '@/store'

//使用插件
Vue.use(VueRouter)


//先保存一份VueRouter原型对象的push|replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一个参数：告诉原push方法往哪里跳转（传递什么参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) originPush.call(this, location, resolve, reject)
  else originPush.call(this, location, () => { }, () => { })
}
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) originPush.call(this, location, resolve, reject)
  else originReplace.call(this, location, () => { }, () => { })
}
//call|apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传参用逗号隔开，apply方法传递数组


//配置路由
let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    //代表滚动条再最上方
    return { y: 0 }
  }
})

//全局守卫：全局守卫
router.beforeEach(async (to, from, next) => {
  //to：到哪里去
  //from：从哪里来
  //next：放行函数
  //next()：放行
  //next(path)：放行到指定路由 
  //next(false)

  //为了测试先全部放行
  // next()

  //用户登陆了才会有token
  let token = store.state.user.token

  //用户信息
  let name = store.state.user.userInfo.name

  //用户已登录
  if (token) {
    //路径非法，停留在首页
    if (to.path === '/login') next('/')
    else if (to.path === '/register') next('/')
    //登陆了，而且去的路径合法
    else {
      //如果有用户信息，放行
      if (name) next()
      //没有用户信息，让仓库存储用户信息再跳转
      else {
        try {
          //获取用户信息
          await store.dispatch("getUserInfo");
          //获取成功，放行
          next()
        } catch (error) {
          //token失效了（登录过期），获取不到用户信息，要重新登陆
          //清除本地token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }
  //用户未登录
  else {
    //未登录用户去交易、支付、个人中心等路由时，应该跳转至登录页
    let toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      alert('请先登录')
      //把未登录时想去但没有去到的信息，存储在地址栏中
      next('/login?redirect='+toPath)
    }
    next()
  }
})

//13700000000  111111

export default router