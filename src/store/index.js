import Vue from 'vue'

import Vuex from 'vuex'

//需要使用插件一次
Vue.use(Vuex)

//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

//state：仓库存储数据的地方
// const state = {}

//actions：处理action，可以书写自己的业务逻辑
// const actions = {}

//mutations：修改state的唯一手段
// const mutations = {}

//getter：类似计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
// const getters ={}

//对外暴露Store类的一个实例
//实现Vuex仓库模块式开发存储数据
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  }
})