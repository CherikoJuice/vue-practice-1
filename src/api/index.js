//当前这个模块对API进行统一管理

//引入二次封装的axios，带有请求、响应的拦截器
import requests from "./request"
import mockRequests from './mockRequest'

//三级联动接口
///api/product/getBaseCategoryList    get   无参数

//对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求，获取三级菜单数据
//axios发请求返回Promise对象
//把服务器返回结果返回
export const reqCategoryList = ()=> requests.get(
  '/product/getBaseCategoryList'
  // 'http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList'
  )

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner')

//获取floor
export const reqFloorList = ()=> mockRequests.get('/floor')

//获取搜索模块数据  post  有参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=> requests({
  url: '/list',
  // url: 'https://mock.presstime.cn/mock/62a44b7f8bb737002976b34d/easy/list#!method=POST&queryParameters=%5B%7B%22enabled%22%3Atrue%2C%22key%22%3A%22http%3A%2F%2Fgmall-h5-api.atguigu.cn%2Fapi%2Flist%22%2C%22value%22%3A%22%22%7D%5D&body=&headers=%5B%5D',
  // url: 'http://gmall-h5-api.atguigu.cn/api/list',
  method: 'post',
  data: params
})

//获取商品详情信息的接口
export const reqGoodsInfo = (skuId)=> requests({
  url: `/item/${skuId}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/item/${skuId}`,
  method: 'get',
})

//将产品添加到购物车中（获取更新某一产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum)=> requests({
  url:`/cart/addToCart/${skuId}/${skuNum}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})

//获取购物车列表数据接口
export const reqCartList = ()=> requests({
  url: '/cart/cartList',
  // url: `http://gmall-h5-api.atguigu.cn/api/cart/cartList`,
  method: 'get'
})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId)=> requests({
  url: `/cart/deleteCart/${skuId}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${skuId}`,
  method: 'delete'
})

//修改商品勾选状态的接口
export const reqUpdateCheckedByid = (skuId, isChecked)=> requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

//获取验证码的接口
export const reqGetCode = (phone)=> requests({
  url: `/user/passport/sendCode/${phone}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/user/passport/sendCode/${phone}`,
  method: 'get'
})

//注册的接口
export const reqUserRegister = (data)=> requests({
  url: '/user/passport/register',
  // url: `http://gmall-h5-api.atguigu.cn/api/user/passport/register`,

  data,
  method: 'post'
})

//登录的接口
export const reqUserLogin = (data)=> requests({
  url: '/user/passport/login',
  // url: `http://gmall-h5-api.atguigu.cn/api/user/passport/login`,
  data,
  method: 'post'
})

//获取用户信息的接口（带着用户的token向服务器要用户信息）
export const reqUserInfo = ()=> requests({
  url: '/user/passport/auth/getUserInfo',
  // url: `http://gmall-h5-api.atguigu.cn/api/user/passport/auth/getUserInfo`,
  method: 'get'
})

//退出登录
export const reqLogout = ()=> requests({
  url: '/user/passport/logout',
  // url: `http://gmall-h5-api.atguigu.cn/api/user/passport/logout`,
  method: 'get'
})

//获取用户地址信息
export const reqAddressInfo = ()=> requests({
  url: '/user/userAddress/auth/findUserAddressList',
  // url: `http://gmall-h5-api.atguigu.cn/api/user/userAddress/auth/findUserAddressList`,
  method: 'get'
})

//获取商品清单
export const reqOrderInfo = ()=> requests({
  url: '/order/auth/trade',
  // url: `http://gmall-h5-api.atguigu.cn/api/order/auth/trade`,
  method: 'get'
})

//提交订单
export const reqSubmitOrder = (tradeNo, data)=> requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

//获取支付信息
export const reqPayInfo = (orderId)=> requests({
  url: `/payment/weixin/createNative/${orderId}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

//获取支付订单状态
export const reqPayStatus = (orderId)=> requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

//获取查看订单数据
export const reqMyOrderList = (page, limit)=> requests({
  url: `/order/auth/${page}/${limit}`,
  // url: `http://gmall-h5-api.atguigu.cn/api/order/auth/${page}/${limit}`,
  method: 'get'
})