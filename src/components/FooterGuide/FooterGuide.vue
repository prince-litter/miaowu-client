<template>
  <div class="footer">
    <div class="footer_guide">
      <a href="javascript:;" class="guide_item" :class="{on:'/msite'===$route.path}" @touchstart="goTo('/msite')">
      <span class="item_icon">
        <img src="./images/msite.png" alt="" v-show="'/msite'!== $route.path">
        <img src="./images/active-msite.png" alt="" v-show="'/msite'===$route.path">
      </span>
        <span v-show="'/msite'=== $route.path">首页</span>

      </a>
      <a href="javascript:;" class="guide_item" :class="{on:'/message'===$route.path}" @touchstart="goTo('/message')">
      <span class="item_icon">
        <img src="./images/adoption.png" alt="" v-show="'/message'!==$route.path">
        <img src="./images/active-adoption.png" alt="" v-show="'/message'===$route.path">
      </span>
        <span v-show="'/message'===$route.path">消息</span>
      </a>
      <a href="javascript:;" class="guide_item" :class="{on:'/medic'===$route.path}" @touchstart="goTo('/medic')">
      <span class="item_icon">
        <img src="./images/medic.png" alt="" v-show="'/medic'!==$route.path">
        <img src="./images/active-medic.png" alt="" v-show="'/medic'===$route.path">
      </span>
        <span v-show="'/medic'===$route.path">医护</span>
      </a>
      <a href="javascript:;" class="guide_item" :class="{on:'/profile'===$route.path}" @touchstart="goTo('/profile')">
      <span class="item_icon">
        <img src="./images/profile.png" alt="" v-show="'/profile'!==$route.path">
        <img src="./images/active-profile.png" alt="" v-show="'/profile'===$route.path">
      </span>
        <span v-show="'/profile'===$route.path">我的</span>
      </a>
    </div>
  </div>

</template>
<script>
  export default {
      methods:{
        goTo (path){
          this.$router.replace(path);
          // console.log("111")

        }
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#AAAAAA)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 82px
    display flex
    .guide_item
      display flex
      flex 1
      //flex-direction column
      text-align center
      align-items center
      justify-content center
      margin 10px
      color #323439
      &.on
        color #fff
        background url("./images/footer-rectangle.png") no-repeat center center
        background-size contain
        flex-grow 2

      span
        font-size 15px
        font-family  'Arial'
        font-weight bold
        margin-left 7px
        letter-spacing 1px




</style>
