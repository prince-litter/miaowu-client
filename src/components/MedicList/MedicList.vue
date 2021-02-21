<template>
  <div class="shop_container">

    <ul class="shop_lists">
      <li class="shop_list" @touchstart="$router.push('/medic_shop')">
        <div class="shop_left">
          <img src="./images/head1.jpg" class="shop_img" alt="">
        </div>
        <a href="javascript:">
          <div class="shop_right">
            <a class="shop_title">
              <h2>Healthy life</h2>
            </a>
            <a class="shop_position">
              <i class="iconfont icon-position "></i>
              <span>北京市苏庄东街南口拐角处</span>
            </a>
          </div>
        </a>
      </li>
      <li class="shop_list" @touchstart="$router.push('./medic_shop')">
        <div class="shop_left">
          <img src="./images/head3.jpg" class="shop_img" alt="">
        </div>
        <a href="javascript:">
          <div class="shop_right">
            <a class="shop_title">
              <h2>Healthy life</h2>
            </a>
            <a class="shop_position">
              <i class="iconfont icon-position "></i>
              <span>北京市苏庄东街南口拐角处</span>
            </a>
          </div>
        </a>
      </li>
      <li class="shop_list" @touchstart="$router.push('./medic_shop')">
        <div class="shop_left">
          <img src="./images/head1.jpg" class="shop_img" alt="">
        </div>
        <a href="javascript:">
          <div class="shop_right">
            <a class="shop_title">
              <h2>Healthy life</h2>
            </a>
            <a class="shop_position">
              <i class="iconfont icon-position "></i>
              <span>北京市苏庄东街南口拐角处</span>
            </a>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shop_container
    margin-left 20px
    width 100%
    height 100%
    .shop_lists
      margin 0 auto
      width 375px
      height 100%
      .shop_list
        position relative
        top 23px
        left 23px
        height 83px
        width 300px
        background url("./images/big-rectangle.jpg") no-repeat center center
        text-align center
        margin-bottom 55px
        .shop_left
          position absolute
          top -23px
          left -23px
          z-index 1
        .shop_right
          width 100%
          position absolute
          top 50%
          left 50%
          transform translate(-50%,-50%)
          .shop_title h2
            font-size 20px
            color #fff
            font-family "Arial"
            font-weight bold
          .shop_position span
            color #fff
            font-size 10px
            font-family "Arial"
          .shop_position .icon-position
            color #fff



</style>
