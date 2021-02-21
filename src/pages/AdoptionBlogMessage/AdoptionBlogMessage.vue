<template>
  <div class="adoptionBlogMessage">
      <div class="message_header">
        <a href="javascript:" class="go_back" @touchstart="$router.back(),{passive:false}">
          <i class="iconfont icon-back"></i>
        </a>
        <p class="message_name">正在输入...</p>
      </div>
      <div class="message_content">
        <div class="bubble_left">
          <p>hhhh,有什么事吗？</p>
        </div>
        <div class="message_time">
          <span>昨天 下午5:20</span>
        </div>
        <div class="message_right">
          <div class="bubble_right">
            <p>狗狗好可爱</p>
          </div>
          <div class="bubble_right">
            <p>我好想养同款啊~</p>
          </div>
        </div>
      </div>
      <div class="message-footer">
        <div class="footer-box">
          <img src="./images/icon-input.png" alt="">
          <input type="text">
          <div class="send-bg">
            <div class="send">发送</div>
          </div>
        </div>

    </div>
  </div>

</template>
<script>
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .adoptionBlogMessage
    width 100%
    height 100%
    overflow-x hidden
    overflow-y hidden
    .message_header
      bottom-border-1px(#AAAAAA)
      position fixed
      left 0
      top 0
      z-index 100
      margin 0 auto
      background-color #A5D2FF
      width 100%
      height 54px
      text-align center
      .go_back
        position absolute
        top 20px
        left 25px
        width 30px
        height 30px
        .iconfont
          font-size 25px
          color #797979
          font-weight bold

      .message_name
        transform translateY(25px)
        font-family "Arial"
        font-size 15px
        font-weight bold
        color #fff
    .message_content
      margin-top 57px
      height 1000px
      padding 30px 20px 0
      position relative
      .bubble_left
        width 258px
        height 60px
        background-color #D2D2D2
        border-bottom-right-radius 50px
        border-top-right-radius 50px
        border-top-left-radius 50px
        text-align center
        p
          line-height 60px
          color #fff
          font-family "Arial"
          font-size 20px
      .message_time
        margin 30px auto
        text-align center
        span
          color #D7D7D7
          font-size 15px
          font-weight bold
          font-family "Arial"
      .message_right
        position absolute
        right 20px

        .bubble_right
          width 258px
          height 60px
          background-color #EE849B
          border-bottom-left-radius 50px
          border-top-left-radius 50px
          border-top-right-radius 50px
          text-align center
          margin-bottom 30px

          p
            line-height 60px
            color #fff
            font-family "Arial"
            font-size 20px

    .message-footer
      top-border-1px(#AAAAAA)
      height 66px
      width 100%
      position fixed
      bottom 0
      left 0
      right 0
      .footer-box
        display flex
        align-items center
        position relative
        height 66px
        img
          margin-left 20px
        input
          /*border 1px solid black*/
          height 30px
          margin 0 15px
        .send-bg
          position absolute
          right 0
          width 95px
          height 66px
          background-color #A5D2FF
          border-top-left-radius 50px
          .send
            margin 20px auto
            width 48px
            height 30px
            background-color #EE849B
            border-radius 15px
            color #fff
            line-height 30px
            text-align center
            font-size 15px
            font-family "Arial"
            font-weight bold

</style>
