<template>

    <div class="adoptionShopBlog">
      <header class="adoptionShopBlog-header">
        <a class="header_back" @touchstart.stop="$router.back()">
          <i class="iconfont icon-back"></i>
        </a>
        <a class="header_listmore">
          <i class="iconfont icon-listmore "></i>
        </a>
      </header>
      <Scroll class="adoptionShopBlog-wrapper">
        <div class="adoptionShopBlog-content">
          <div class="blog_head">
            <a href="javascript:;" class="head_box">
              <img :src="'http://localhost:3000/public/images/user\\' + $route.query.imgUrl" alt="">
              <p class="head_name">{{$route.query.name}}</p>
              <!--        <p class="head_address">北京一环路</p>-->
            </a>
          </div>
          <div class="blog-content_nav">
            <a class="nav_item">
              <span>讨论</span>
              <span class="blog-num">60</span>
            </a>
            <a class="nav_item">
              <span>发布</span>
              <span class="blog-num">2</span>
            </a>
            <a class="nav_item">
              <span>粉丝</span>
              <span class="blog-num">5460</span>
            </a>

          </div>
          <div class="blog-active">
            <div class="blog-active-nav">
              <ul>
                <li>
                  <span class="nav-title on">文章发布</span>
                  <span class="active on"></span>
                </li>
                <li>
                  <span class="nav-title">收养发布</span>
                  <span class="active"></span>
                </li>
              </ul>
            </div>
            <div class="blog-message" @click="goMessage">
              <i class="iconfont icon-message"></i>
            </div>
            <div class="blog_dynamic">
              <section class="left">
                <div class="time_line">
                  <div><span class="time_point on"></span></div>
                  <div><span class="time_point"></span></div>
                  <div><span class="time_point"></span></div>

                </div>
              </section>
              <section class="middle">
                <ul>
                  <li>
                    <p class="day">20</p>
                    <p class="month-year">Mar</p>
                    <p class="month-year">2020</p>
                  </li>
                  <li>
                    <p class="day">20</p>
                    <p class="month-year">Mar</p>
                    <p class="month-year">2020</p>
                  </li>
                  <li>
                    <p class="day">20</p>
                    <p class="month-year">Mar</p>
                    <p class="month-year">2020</p>
                  </li>
                </ul>
              </section>
              <section class="right">
                <ul>
                  <li><a href="javascript:;"><img src="./images/active-img1.png" alt=""></a></li>
                  <li><a href="javascript:;"><img src="./images/active-img2.png" alt=""></a></li>
                  <li><a href="javascript:;"><img src="./images/active-img3.png" alt=""></a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </Scroll>

    </div>

</template>
<script>
  import Scroll from '../../components/Scroll/Scroll'
  import axios from 'axios'
  export default {
    data(){
      return{

      }
    },
    components:{
      Scroll
    },
    methods:{
      goMessage(){
        let id = this.$route.query.userId
        let name =this.$route.query.name
        let imgUrl = this.$route.query.imgUrl
        let uid = localStorage.getItem('userId')
        this.$router.push({path:'/adoption_blog_message',query:{id:id,name:name,img:imgUrl}})
        axios.post('users/relative',{
          id:uid,
          friendId:id
        }).then((res) => {
          if(res.data.status === '200'){
            console.log('关系建立成功')
          }else {
            console.log('关系建立失败')
          }
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .adoptionShopBlog
    width 100%
    height 100%
    overflow-x hidden
    overflow-y hidden
    .adoptionShopBlog-header
      bottom-border-1px(#e4e4e4)
      position fixed
      background-color #fff
      z-index 100
      left 0
      top 0
      padding-top 10px
      width 100%
      height 45px
      .header_back
        position absolute
        left 20px
        bottom  10px
        .icon-back
          font-size 25px
          color #7D7D7D
      .header_listmore
        position absolute
        bottom  0
        transform translateY(-50%)
        right 27px
        .icon-listmore
          font-size 25px
          color #7D7D7D
          font-weight bold
    .adoptionShopBlog-wrapper
      margin-top 55px !important
      height calc(100vh - 55px) !important
      position relative
      .adoptionShopBlog-content
        .blog_head
          height 225px
          .head_box
            position absolute
            left 50%
            top 65px
            transform translateX(-50%)
            text-align center
            img
              border-radius 50%
              width 65px
              height 65px
            .head_name,.head_address
              color #7F7F7F
              font-weight bold
              font-family "Arial"
            .head_name
              font-size 23px
              margin 20px 0
            .head_address
              font-size 15px

        .blog-content_nav
          display flex
          text-align center
          .nav_item
            flex 1
            span
              margin-right 10px
              margin-bottom 10px
              color #7F7F7F
              font-size 15px
              font-family "Arial"
              font-weight bold
            .blog-num
              color #AAAAAA



        .blog-active
          margin-top 60px
          background-color #A5D2FF
          position relative
          .blog-active-nav
            ul
              padding 30px 20px 20px
              li
                display inline-block
                margin-right 10px
                .nav-title
                  font-family "Arial"
                  font-size 20px
                  font-weight bold
                  color #fff
                  z-index 10
                  position relative
                  &.on
                    color #7F7F7F
                .active
                  z-index 1
                  &.on
                    display block
                    width 90px
                    height 10px
                    background-color #FEB8C0
                    position relative
                    left -5px
                    top -5px




          .blog-message
            width 83px
            height 83px
            background-color #EE849B
            border-radius 50%
            position absolute
            top -41.5px
            right 20px
            text-align center
            .icon-message
              font-size 33px
              color #fff
              line-height 83px
          .blog_dynamic
            margin 25px auto 0
            display flex
            .left
              margin-left 30px
              .time_line
                position relative
                display flex
                flex-direction column
                width 3px
                height 400px
                background linear-gradient(top,rgba(255,255,255,1),rgba(255,255,255,0))
                div
                  flex 1
                  .time_point
                    position absolute
                    left -11.5px
                    display block
                    width 26px
                    height 26px
                    background-color rgba(255,255,255,0.3)
                    border-radius 50%
                    &.on
                      background-color rgba(255,255,255,1)
            .middle
              margin-left 30px
              ul
                li
                  margin-bottom 55px
                  p
                    color #F2F2F2
                    font-family "Arial"
                    font-weight bold
                  .day
                    font-size 30px
                    margin-bottom 10px
                  .month-year
                    font-size 13px
                    line-height 18px
            .right
              margin-left 50px
              ul
                li
                  margin-bottom 10px
                  a
                    display block
                    img
                      border-radius 20px
</style>
