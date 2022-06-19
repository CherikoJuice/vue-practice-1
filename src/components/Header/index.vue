<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>某电商平台欢迎您！</p>
          <!-- 没有登录时显示： -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航：务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 有登录时显示： -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/center/myorder">我的某电商平台</router-link>
          <router-link to="/center/myorder">某电商平台会员</router-link>
          <router-link to="/center/myorder">企业采购</router-link>
          <router-link to="/center/myorder">关注某电商平台</router-link>
          <router-link to="/center/myorder">合作招商</router-link>
          <router-link to="/center/myorder">商家后台</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img 
            src="./images/logo.png" 
            alt=""
            style="width: 100px"
            />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    //搜索按钮的回调函数，需要向search路由进行跳转
    goSearch() {
      let location = { 
        name: 'search', 
        params: {keyword: this.keyword || undefined} 
      }
      if(this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
      //路由传参
      //第一种：字符串形式
      // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
      //第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //第三种：对象
      // this.$router.push({
      //   name: 'search',
      //   params: {keyword: this.keyword},
      //   query: {k: this.keyword.toUpperCase()}
      // })

      // **************************************************************

      //1. 路由传递参数（对象写法）path能否结合params参数一起使用？
      //答：路由跳转传参的时候，对象的写法可以是name、path形式，但path这种写法不能与params参数一起使用
      // this.$router.push({
      //   path: '/search',
      //   params: {keyword: this.keyword},
      //   query: {k: this.keyword.toUpperCase()}
      // })
      //
      //2. 如何指定params参数可传可不传？
      //如果路由要求传递params参数，但是不传递，路径会出现问题
      //答：在配置路由时在占位符后添加一个问号，代表params参数可传可不传
      // this.$router.push({
      //   name: 'search',
      //   query: {k: this.keyword.toUpperCase()}
      // })
      //
      //3. params参数可以传递也可以不传递，但如果传递是空串如何解决
      //答：使用undefined解决：params参数可以传递、不传递空的字符串
      // this.$router.push({
      //   name: 'search',
      //   params: {keyword: '' || undefined},
      //   query: {k: this.keyword.toUpperCase()}
      // })
      //4. 路由组件能否传递props数据
      //答：可以，三种写法，见router/index.js
      // this.$router.push({
      //   name: 'search',
      //   params: {keyword: this.keyword},
      //   query: {k: this.keyword.toUpperCase()},
      // },
        // ()=>{},
        // ()=>{}
      
    },
    //退出登录
    async logout() {
      //退出登录需要做的事：
      //1.发请求通知服务器推出登录（清除一些数据：token）
      //2.清除项目当中的数据（userInfo、token）
      try {
        await this.$store.dispatch('userLogout')
      } catch (error) {
        alert(error.message)
      }
      
    }
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on('clear', ()=> {
      this.keyword = ''
    })
    //获取用户信息，在首页展示
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    //用户名
    userName() {
      return this.$store.state.user.userInfo.name
    }
  }
};

</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>