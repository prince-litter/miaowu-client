<template>
  <section class="loginContainer">

    <div class="loginInner">
<!--      <a href="javascript:" class="go_back" @touchstart="$router.back()">-->
<!--        <i class="iconfont icon-back"></i>-->
<!--      </a>-->
      <div class="login_header">
        <img src="./images/logo.png" alt="">
      </div>
      <div class="login_content">
        <div class="content_top">
          <span>账号</span><br>
          <input type="text" v-model="userName" placeholder="请输入账号">
        </div>
        <div class="divide_line"></div>
        <div class="content_bottom">
          <span>密码</span>
          <i class="iconfont icon-yanjing_xianshi_o" @click="eye" ></i><br>
          <input type="password" v-model="userPwd" placeholder="请输入密码" v-show="isEye">
          <input type="text" v-model="userPwd" placeholder="请输入密码" v-show="!isEye">

        </div>
      </div>
      <div class="login_type">
        <div class="type right" @click="login">登录</div>
        <div class="type left" @click="register">注册</div>
      </div>
<!--      <div class="login_footer">-->
<!--        <div class="footer_divide">-->
<!--          <span class="line"></span>-->
<!--          <span class="msg">第三方登录</span>-->
<!--          <span class="line"></span>-->
<!--        </div>-->
<!--        <div class="footer_chooses">-->
<!--          <a href="javascript:"><img src="./images/QQ.png" alt=""></a>-->
<!--          <a href="javascript:" class="chose_center"><img src="./images/WeChat.png" alt=""></a>-->
<!--          <a href="javascript:"><img src="./images/blog.png" alt=""></a>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </section>
</template>
<script>
  import axios from  'axios'

  import Toast from 'vant/lib/toast';
  import 'vant/lib/toast/style';
  export default {
    data(){
      return{
        userName:'',
        userPwd:'',
        errorTip:false,
        isEye:true
      }
    },
    mounted(){
      if( this.$route.query.userName){
        this.userName =  this.$route.query.userName
      }
    },
    methods:{
      register(){
        this.$router.push('/register')
      },
      eye(){
        this.isEye = !this.isEye
      },
      showToast(msg){
        Toast(msg)
      },
      login(){
        if(!this.userName || !this.userPwd){
          this.showToast('用户名或密码不能为空')
          return
        }
        axios.post('/users/login',{
          userName:this.userName,
          userPwd:this.userPwd
        }).then((response) =>{
          let res = response.data
          console.log(res)
          if(res.status == '200'){
            console.log('成功')
            this.$router.replace('/msite')
            //保存token到本地
            localStorage.setItem('token',res.result.token)
            localStorage.setItem('userId',res.result.id)
            localStorage.setItem('userName',res.result.userName)
            localStorage.setItem('imgUrl',res.result.imgUrl)
          }else {
            console.log('失败')
            this.showToast('用户名或密码错误')
            this.userPwd = ''
          }
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    overflow hidden
    .loginInner
      margin 70px auto
      .login_content
        height 250px
        width 335px
        background-color #A5D2FF
        margin 0 auto
        border-radius 20px
        position relative
        .divide_line
          width 100%
          height 3px
          background-color white
          position absolute
          top 50%
          transform translateY(-50%)
        .content_top
          width 100%
          position absolute
          top 20px
          left 20px
          input
            position relative
            z-index 999
            margin-top 22px
            background-color transparent
            outline none
            font-size 16px
          span
            color #fff
            font-size 20px
            font-weight bold
            font-family "Arial"
        .content_bottom
          width 100%
          position absolute
          top 145px
          left 20px
          .iconfont
            color white
            font-size 25px
            margin-left 200px
          span
            color #fff
            font-size 20px
            font-weight bold
            font-family "Arial"
          input
            margin-top 22px
            background-color transparent
            outline none
            font-size 16px
      .login_type
        width 100%
        height 140px
        position relative
        .type
          width 225px
          height 57px
          background-color #EE849B
          text-align center
          line-height 57px
          font-size 20px
          color #fff
          position absolute
          &.right
            border-top-left-radius 40px
            border-bottom-left-radius 40px
            right 0
            top -28px
          &.left
            border-top-right-radius 40px
            border-bottom-right-radius 40px
            bottom 0
            left 0


      /*.login_footer*/
      /*  width 100%*/
      /*  margin-top 80px*/
      /*  .footer_divide*/
      /*    width 100%*/
      /*    text-align center*/
      /*    .line*/
      /*      display inline-block*/
      /*      height 3px*/
      /*      width 60px*/
      /*      background-color #D7D7D7*/
      /*      vertical-align middle*/
      /*    .msg*/
      /*      display inline-block*/
      /*      font-size 15px*/
      /*      font-family "Arial"*/
      /*      margin 0px 10px*/
      /*      color #AAAAAA*/
      /*  .footer_chooses*/
      /*    width 100%*/
      /*    text-align center*/
      /*    margin-top 20px*/
      /*    .chose_center*/
      /*      margin 0 60px*/




</style>
