<template>
  <section class="registerContainer">

    <div class="registerInner">
      <a href="javascript:" class="go_back" @touchstart="$router.back()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="register_header">
        <img src="./images/logo.png" alt="">
      </div>
      <div class="register_content">
        <div class="content_top">
          <span>账号</span><br>
          <input type="text" v-model="userName" placeholder="请输入账号">
        </div>
        <div class="divide_line"></div>
        <div class="content_bottom">
          <span>密码</span>
          <div class="wrap">
            <input type="password" v-model="userPwd" placeholder="请输入密码" v-show="isEye">
            <input type="text" v-model="userPwd" placeholder="请输入密码" v-show="!isEye">
            <i class="iconfont icon-yanjing_xianshi_o" @click="eye" ></i>
          </div>
          <div class="wrap">
            <input type="password" v-model="confirmUserPwd" placeholder="请确认密码" v-show="isEyes">
            <input type="text" v-model="confirmUserPwd" placeholder="请确认密码" v-show="!isEyes">
            <i class="iconfont icon-yanjing_xianshi_o" @click="eyes" ></i>
          </div>
        </div>

      </div>
      <div class="register_type">
        <div class="type left" @click="register">注册</div>
      </div>
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
        confirmUserPwd:'',
        errorTip:false,
        isEye:true,
        isEyes:true
      }
    },
    methods:{
      eye(){
        this.isEye = !this.isEye
      },
      eyes(){
        this.isEyes = !this.isEyes
      },
      showToast(msg){
        Toast(msg)
      },
      register(){
        if(!this.userName || !this.userPwd || !this.confirmUserPwd){
          this.showToast('用户名或密码不能为空')
          return
        }
        if(this.userPwd !== this.confirmUserPwd){
          this.showToast('密码不一致')
          return
        }
        axios.post('/users/register',{
          userName:this.userName,
          userPwd:this.userPwd
        }).then((response) =>{
          let res = response.data
          console.log(res)
          if(res.status == '200'){
            console.log('注册成功')
            this.showToast('注册成功,即将前往登录页面')
            setTimeout( () =>{
              this.$router.replace('/login')
            },2000)
          }else {
            console.log('注册失败')
            this.showToast('用户名已存在')
          }
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .registerContainer
    width 100%
    height 100%
    overflow hidden
    .registerInner
      margin 70px auto 0
      .go_back
        position absolute
        top 20px
        left 25px
        width 30px
        height 30px
        .iconfont
          font-size 20px
          color #797979
          font-weight bold
      .register_content
        height 280px
        width 335px
        background-color #A5D2FF
        margin 0 auto
        padding-bottom 20px
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
          top 175px
          left 20px
          span
            color #fff
            font-size 20px
            font-weight bold
            font-family "Arial"
          .wrap
            display flex
            align-items center
            .iconfont
              color white
              font-size 25px
              margin-top 15px
              margin-left 40px
            input
              margin-top 15px
              background-color transparent
              outline none
              font-size 16px
      .register_type
        width 100%
        height 70px
        .type
          width 225px
          height 57px
          background-color #EE849B
          text-align center
          line-height 57px
          font-size 20px
          color #fff
          margin 50px auto 0
          border-radius 40px




</style>
