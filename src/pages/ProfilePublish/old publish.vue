<template>
  <div class="profilePublish">
    <div class="profilePublish_header">
      <a href="javascript:;" @touchstart="$router.back()">
        <span class="cancel">取消</span>
      </a>
      <a href="javascript:;">
        <i class="iconfont icon-zhankai"></i>
      </a>
    </div>
    <div class="profilePublish_content">
      <div class="title">
        <input type="text" placeholder="请填写你的标题，喵~">
      </div>
      <div class="content">
        <textarea name="" id="" cols="40" rows="20" placeholder="请输入你的正文..."></textarea>
      </div>
    </div>
    <div class="profilePublish_footer">
      <div class="publish_foot">
        <a href="javascript:;">
          <i class="iconfont icon-book"></i>
          <span>添加标签</span>
        </a>
        <a href="javascript:;">
          <i class="iconfont icon-pengyouquan"></i>
          <span>添加圈子</span>
        </a>
      </div>
      <div class="last_step">
        <i class="iconfont icon-photo"></i>
        <div>确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .profilePublish
    width 100%
    height 100%
    overflow-x hidden
    overflow-y hidden
    .profilePublish_header
      bottom-border-1px(#AAAAAA)
      position fixed
      width 100%
      height 60px
      background-color #A5D2FF
      .cancel
        position absolute
        color #fff
        font-family "Arial"
        font-weight bold
        font-size 17px
        left 26px
        top 25px

      .iconfont
        font-size 20px
        position absolute
        right 36px
        top 25px
        font-weight bold
    .profilePublish_content
      width 100%
      margin-top 60px
      .title
        bottom-border-1px(#AAAAAA)
        height 56px
        line-height 56px
        padding-left 25px
        input
          outline none
      .content
        margin 10px
        text-align center
        textarea
          display inline-block
          margin 0 auto
          border none
          font-size 16px
          font-family "Arial"
          outline none
    .profilePublish_footer
      position fixed
      bottom 0
      left 0
      width 100%
      height 133px
      .publish_foot
        top-border-1px(#AAAAAA)
        height 50px
        padding-left 35px
        a
          margin-right 20px
          .iconfont
            line-height 50px
            font-size 20px
          span
            font-size 13px
            font-family "Arial"
            font-weight bold



      .last_step
        width 100%
        height 83px
        background-color #A5D2FF
        display flex
        color #fff
        align-items center
        position relative
        .icon-photo
          margin-left 25px
          font-size 20px
        div
          position absolute
          right 25px
          width 63px
          height 30px
          background-color #FF8AA2
          border-radius 50px
          text-align center
          line-height 30px

</style>
