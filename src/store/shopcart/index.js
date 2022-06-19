import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'

//shopcart模块的小仓库
const state = {
  cartList: []
}

const actions = {
  //获取购物车列表数据
  async getCartList({ commit }, params = {}) {
    let result = await reqCartList(params)
    if (result.code === 200) commit('GETCARTLIST', result.data)
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('failed'))
  },
  //修改购物车某一产品的选中状态
  async updateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('failed'))
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context：小仓库
    //commit：提交给mutations修改state
    //getters：计算属性
    //dispatch：派发action
    //state：当前仓库数据
    //获取购物车中全部商品（一个数组）
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 
        ? dispatch('deleteCartListBySkuId', item.skuId) 
        : ''
      //将每次返回的promise添加到数组中
      promiseAll.push(promise)
    })
    //只要全部的promise都成功，返回结果即成功
    //若有一个失败，即返回失败
    return Promise.all(promiseAll)
  },
  //修改全部产品的状态
  updateAllCartIsChecked({dispatch, getters}, isChecked) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item=> {
      let promise = dispatch('updateCheckedByid', {
        skuId: item.skuId, 
        isChecked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}