// //引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// //引入二级路由组件
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'

//路由懒加载
// const foo = ()=> {
//   // console.log('1145141919810')
//   return import('@/pages/Home')
// }

//路由配置信息
export default [
  {
    path: "/home",
    name: 'home',
    // component: Home,
    //测试路由懒加载
    // component: foo,
    //也可以这么写
    component: ()=> import('@/pages/Home'),
    meta: { show: true },
  },
  {
    path: "/login",
    // component: Login,
    component: ()=> import('@/pages/Login'),
    meta: { show: false },
  },
  {
    path: "/register",
    // component: Register,
    component: ()=> import('@/pages/Register'),
    meta: { show: false },
  },
  {
    path: "/search/:keyword?",
    // component: Search,
    component: ()=> import('@/pages/Search'),
    meta: { show: true },
    name: 'search',
    //路由组件可以传递props数据
    //布尔值写法：只传递params
    // props: true,
    //对象写法：额外地给路由组件传递一些props
    // props: {a: 1, b: 2},
    //函数写法，可以params参数、query参数，通过props传递给路由组件
    // props: ($route)=> ({
    //   keyword: $route.params.keyword,
    //   k: $route.query.k
    // })
  },
  {
    path: "/detail/:skuId",
    // component: Detail,
    component: ()=> import('@/pages/Detail'),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    // component: AddCartSuccess,
    component: ()=> import('@/pages/AddCartSuccess'),
    name: 'addcartsuccess',
    meta: { show: true },
  },
  {
    path: "/shopcart",
    // component: ShopCart,
    component: ()=> import('@/pages/ShopCart'),
    name: 'shopcart',
    meta: { show: true },
  },
  {
    path: "/trade",
    // component: Trade,
    component: ()=> import('@/pages/Trade'),
    name: 'trade',
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //只有从shopcart来，才能进入trade
      if(from.path === '/shopcart') next()
      else next(false)
    }
  },
  {
    path: "/pay",
    // component: Pay,
    component: ()=> import('@/pages/Pay'),
    name: 'pay',
    meta: { show: true },
  },
  {
    path: "/paysuccess",
    // component: PaySuccess,
    component: ()=> import('@/pages/PaySuccess'),
    name: 'paysuccess',
    meta: { show: true },
  },
  {
    path: "/center",
    // component: Center,
    component: ()=> import('@/pages/Center'),
    name: 'center',
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        // component: MyOrder,
        component: ()=> import('@/pages/Center/MyOrder'),
        name: 'myorder'
      },
      {
        path: 'grouporder',
        // component: GroupOrder,
        component: ()=> import('@/pages/Center/GroupOrder'),
        name: 'grouporder'
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  //重定向，在项目跑起来的时候，访问/，立马让它定向到首页
  {
    path: '*',
    redirect: '/home'
  }
]