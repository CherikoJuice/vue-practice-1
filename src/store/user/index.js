import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'

//登录与注册模块的小仓库
const state = {
  code: '',
  token: localStorage.getItem("TOKEN"),
  userInfo: {}
}

const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的接口：把验证码返回，但正常情况应该是后台把验证码发到用户手机上
    let result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('failed'))
  },
  //用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    //服务器下发的token，是用户唯一的标识符（类似uuid）
    //将来常需通过带token找服务器要用户信息进行展示
    if (result.code === 200) {
      //用户已经登陆成功且已获取到token
      commit('USERLOGIN', result.data.token)
      //持久化存储token
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code === 200) {
      //提交用户信息
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //退出登录
  async userLogout({ commit }) {
    //只是向服务器发了请求，通知服务器清除token
    let result = await reqLogout()
    //action里不能操作state，应该提交mutation修改
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}

const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    //把仓库中相关用户信息全部清空
    state.token = '',
      state.userInfo = {},
      //本地存储清空
      localStorage.removeItem('TOKEN')
  }
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters,
}