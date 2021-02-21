<template>
  <div class="profile">
    <div class="profile_head">
      <div class="head_bg"></div>
      <div class="head_bg1"></div>
      <router-link to="/login" class="head_box">
        <img src="./images/head-me.jpg" alt="">
        <p class="head_name">登录/注册</p>
        <p class="head_address">北京一环路</p>
      </router-link>
    </div>
    <div class="profile_content">
      <div class="content_nav">
        <a class="nav_item">
          <span>讨论</span>
          <span>60</span>
        </a>
        <a class="nav_item" @touchstart="$router.push('/profile_publish')">
          <span>发布</span>
          <span>2</span>
        </a>
        <a class="nav_item">
          <span>粉丝</span>
          <span>5460</span>
        </a>
        <a class="nav_item">
          <span>评论</span>
          <span>48</span>
        </a>
      </div>
      <div class="content_head">
        <div class="on"><span>关注</span></div>
        <div><span>信箱</span></div>
        <div><span>收藏</span></div>
      </div>
      <ProfileList/>
    </div>

  </div>
</template>
<script>
  import ProfileList from '../../components/ProfileList/ProfileList'
  export default {
  components:{
    ProfileList
  }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .profile
    width 100%
    overflow-x hidden
    overflow-y hidden
    .profile_head
      width 100%
      .head_bg
        width 100%
        height 270px
        background-color #555555
      .head_bg1
        width 100%
        height 270px
        background url("./images/bg1.jpg") no-repeat
        background-size cover
        position absolute
        top 0
        opacity 0.9
      .head_box
        position absolute
        left 50%
        top 80px
        transform translateX(-50%)
        text-align center
        img
          border-radius 50%
        .head_name,.head_address
          color white
          font-weight bold
          font-family "Arial"
        .head_name
          font-size 23px
          margin 10px 0
        .head_address
          font-size 15px



    .profile_content
      width 100%
      background url("./images/bg2.jpg") no-repeat
      background-size cover
      position absolute
      top 220px
      border-radius 40px 40px
      .content_nav
        margin-top 30px
        display flex
        justify-content center
        .nav_item
          display flex
          flex-direction column
          align-items center
          width 25%
          span
            margin-bottom 10px
            color #7F7F7F
            font-size 15px
            font-family "Arial"
            font-weight bold



      .content_head
        width 100%
        display flex
        margin-left 30px
        >div
          background-color #D7D7D7
          border-radius 15px
          width 70px
          height 27px
          text-align center
          line-height 27px
          margin-right 20px
          margin-top 30px
          &.on
            background-color #EE849B
          span
            color white
            font-weight bold
            font-family "Arial"
            font-size 13px

</style>
