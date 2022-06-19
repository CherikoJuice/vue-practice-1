import {reqGetSearchInfo} from '@/api'

//search模块的小仓库
const state = {
  //仓库初始状态
  searchList: {},
}

const actions = {
  //获取search模块数据
  async getSearchList({commit}, params={}) {
    //当前这个函数在调用获取服务器数据时，至少传递一个参数（空对象）
    //params形参：当用户派发action时，第二个参数传递来的，且至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if(result.code === 200) commit('SEARCHLIST', result.data)
  }
}

const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}

//计算属性
//在项目中，getters主要的作用是简化仓库中的数据
//把将来在组件中需要用的数据简化一下，获取数据的时候就方便了
const getters = {
  //形参：当前仓库中的state
  goodsList(state) {
    //返回的结果，要么是undefined（网络慢/无网络），要么是服务器成功访问的数组
    //计算新的属性值至少要返回一个数组
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },

}

export default {
  state,
  actions,
  mutations,
  getters,
}