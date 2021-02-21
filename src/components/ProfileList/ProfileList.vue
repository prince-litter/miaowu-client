<template>
  <div class="content_active">
    <ul class="profile_list">
      <li class="profile_li">
        <a href="javascript:;">
          <div class="profile_box">
            <section class="profile_user_header">
              <img class="head_img" src="./images/head1.jpg" alt="">
              <div class="head_right">
                <span class="user_name">柴可夫斯基</span>
                <img src="./images/vip.png" alt="">
                <p class="user_description">三只猫咪求收养，人生赢家两猫一狗。</p>
              </div>
            </section>
            <section  class="profile_content">
              <ul class="dynamic_imgs">
                <li class="dynamic_img"><img src="./images/active-img1.jpg" alt=""></li>
                <li class="dynamic_img"><img src="./images/active-img2.jpg" alt=""></li>
                <li class="dynamic_img"><img src="./images/active-img3.jpg" alt=""></li>
                <li class="dynamic_img"><img src="./images/active-img4.jpg" alt=""></li>
              </ul>

            </section>
          </div>
        </a>
      </li>
      <li class="profile_li">
        <a href="javascript:;">
          <div class="profile_box">
            <section class="profile_user_header">
              <img class="head_img" src="./images/head2.png" alt="">
              <div class="head_right">
                <span class="user_name">金角大王</span>
                <!--                    <img src="./images/vip.png" alt="">-->
                <p class="user_description">人生赢家，猫狗双全。</p>
              </div>
            </section>
            <section  class="profile_content">
              <ul class="dynamic_imgs">
                <li class="dynamic_img"><img src="./images/active-img5.jpg" alt=""></li>
                <li class="dynamic_img"><img src="./images/active-img4.jpg" alt=""></li>

              </ul>

            </section>
          </div>
        </a>
      </li>
      <li class="profile_li">
        <a href="javascript:;">
          <div class="profile_box">
            <section class="profile_user_header">
              <img class="head_img" src="./images/head3.jpg" alt="">
              <div class="head_right">
                <span class="user_name">咸鱼有只猫</span>
                <img src="./images/vip.png" alt="">
                <p class="user_description">你我约定，买猫买狗</p>
              </div>
            </section>
            <section  class="profile_content">
              <ul class="dynamic_imgs">
                <li class="dynamic_img"><img src="./images/active-img5.jpg" alt=""></li>
                <li class="dynamic_img"><img src="./images/active-img4.jpg" alt=""></li>

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
  .content_active
    margin-top 30px
    margin-left 30px
    width 100%
    .profile_list
      .profile_li
        width 100%
        height 150px
        position relative
        .profile_box
          width 100%
          .profile_user_header
            display flex
            .head_img
              margin-right 16px
            .head_right
              .user_name
                font-size 14px
                font-weight bold
                font-family "Arial"
              img
                width 15px
              .user_description
                font-weight bold
                font-family "Arial"
                font-size 10px
                margin-top 5px
          .profile_content
            width 100%
            position absolute
            top 50px
            .dynamic_imgs
              display flex
              .dynamic_img
                margin-right 10px

</style>
