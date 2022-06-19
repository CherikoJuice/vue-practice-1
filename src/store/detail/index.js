import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
//封装临时游客身份模块，生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'

//detail模块的小仓库
const state = {
  goodsInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
}

const actions = {
  //获取产品信息
  async getGoodsInfo({commit}, skuId) {
    let result = await reqGoodsInfo(skuId)
    if(result.code === 200) commit('GOODSINFO', result.data)
  },
  //将产品添加到购物车
  async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表操作成功
    //因为服务器没有返回其余数据，因此不需要存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //加入购物车成功
    if(result.code === 200) return 'ok'
    else return Promise.reject(new Error('fail'))
    
  },
}

const mutations = {
  GOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
}

const getters = {
  //路径导航
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  //产品信息
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  //产品售卖属性
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }

}

export default {
  state,
  actions,
  mutations,
  getters,
}