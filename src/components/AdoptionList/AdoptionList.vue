<template>
  <div class="adoption_shop_container">
    <ul class="adoption_shop_list">
      <li class="adoption_shop_li">
        <a href="javascript:;">
          <div class="adoption_shop_box">
            <section class="adoption_shop_user_header">
              <ul>
                <li><img src="./images/head1.png" alt=""></li>
                <li class="adoption_user_name">哈狗来吃肉</li>
                <li class="adoption_vip_icon"><img src="./images/vip.png" alt=""></li>
                <li class="adoption_focus"><img src="./images/focus.png" alt=""></li>
              </ul>
            </section>
            <section class="adoption_shop_pet_content" @touchstart="$router.push('/adoption_shop')">
              <p class="adoption_pet_msg">小猫咪，母猫乳白色，具体品种未知，但是挺好看。一窝生了十只崽崽，养不起...</p>
              <img class="adoption_pet_img" src="./images/active-img1.jpg" alt="">
              <ul>
                <li>
                  <i class="iconfont icon-message"></i>
                  <span>10k</span>
                </li>
                <li>
                  <i class="iconfont icon-collecthover"></i>
                  <span>1534</span>
                </li>
                <li>
                  <!--                      <i class="iconfont icon-praise"></i>-->
                  <img src="./images/praise.png" alt="">
                  <span>973</span>
                </li>
              </ul>
            </section>
          </div>
        </a>
      </li>
      <li class="adoption_shop_li">
        <a href="javascript:;">
          <div class="adoption_shop_box">
            <section class="adoption_shop_user_header">
              <ul>
                <li><img src="./images/head2.png" alt=""></li>
                <li class="adoption_user_name">金角大王</li>
                <!--                    <li class="vip_icon"><img src="./images/vip.png" alt=""></li>-->
                <li class="adoption_focus"><img src="./images/focus.png" alt=""></li>
              </ul>
            </section>
            <section class="adoption_shop_pet_content" @touchstart="$router.push('/adoption_shop')">
              <p class="adoption_pet_msg">小猫咪，母猫乳白色，具体品种未知，但是挺好看。一窝生了十只崽崽，养不起...</p>
              <img class="adoption_pet_img" src="./images/active-img1.jpg" alt="">
              <ul>
                <li>
                  <i class="iconfont icon-message"></i>
                  <span>10k</span>
                </li>
                <li>
                  <i class="iconfont icon-collecthover"></i>
                  <span>1534</span>
                </li>
                <li>
                  <!--                      <i class="iconfont icon-praise"></i>-->
                  <img src="./images/praise.png" alt="">
                  <span>973</span>
                </li>
              </ul>
            </section>
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
  .adoption_shop_container
    margin-top 10px
    .adoption_shop_list
      .adoption_shop_li
        width 100%
        .adoption_shop_box
          width 100%
          background-color #fbfbfb
          padding 10px 0 20px 0
          margin-bottom 5px
          .adoption_shop_user_header
            ul
              margin-left 20px
              position relative
              li
                display inline-block
                text-align center
                vertical-align middle
                &.adoption_user_name
                  font-size 20px
                  font-weight bold
                  color #7F7F7F
                  margin-left 10px
                &.adoption_vip_icon
                  margin-left 5px
                  margin-top 5px
                &.adoption_focus
                  position absolute
                  right 20px
                  bottom 0px
          .adoption_shop_pet_content
            margin-left 80px
            .adoption_pet_msg
              font-size 13px
              font-family "Arial"
              font-weight bold
              margin 15px 0
              color #7F7F7F
              line-height 15px
            .adoption_pet_img
              margin-bottom 15px
            ul li
              display inline-block
              margin-right 20px
              vertical-align middle
              .iconfont
                font-size 20px
                color #7D7D7D



</style>
