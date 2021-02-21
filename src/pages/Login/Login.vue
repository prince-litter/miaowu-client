<template>
  <section class="loginContainer">

    <div class="loginInner">
      <a href="javascript:" class="go_back" @touchstart="$router.back()">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="login_header">
        <img src="./images/logo.png" alt="">
      </div>
      <div class="login_content">
        <div class="content_top">
          <span>账号</span><br>
          <input type="text" placeholder="请输入手机号">
        </div>
        <div class="divide_line"></div>
        <div class="content_bottom">
          <span>密码</span>
          <i class="iconfont icon-yanjing_xianshi_o"></i><br>
          <input type="password" placeholder="请输入密码">

        </div>
      </div>
      <div class="login_type">
        <div class="type right">登录</div>
        <div class="type left">注册</div>
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
  export default {

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    overflow hidden
    .loginInner
      margin 70px auto
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
