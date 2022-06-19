import Vue from 'vue'
import App from './App.vue'

//三级联动组件————全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

//轮播图————全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

//分页器————全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

//element-ui的按钮
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)

//element-ui注册组件时，还有一种写法：挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


Vue.config.productionTip = false

//引入路由
import router from '@/router'

//引入仓库
import store from '@/store'

//引入MockServer.js：mock数据
import '@/mock/mockServer'

//引入swiper样式
import 'swiper/css/swiper.css'

//统一引入api文件夹里所有请求函数
import * as API from '@/api'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
//引入图片
import BA from '@/assets/Keyboard Killer.gif'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: BA
})

//引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  //注册路由（ES6,kv一致省略v）
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route和$router属性
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store,
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
