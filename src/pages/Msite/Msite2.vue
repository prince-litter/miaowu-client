<template>
  <div class="miste">
<!--      首页头部-->
    <header class="header">
      <a class="header_list">
        <i class="iconfont icon-List-1 "></i>
      </a>
      <a class="header_search">
        <input type="text" v-model="search">
        <i class="iconfont icon-search "></i>
      </a>
      <a class="header_add">
        <i class="iconfont icon-add "></i>
      </a>
    </header>
<!--    首页导航-->
    <Scroll class="miste-wrapper">
      <div>
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="javascript:">
                  <div class="banner_container">
                    <img src="./images/banner1.jpg" alt="">
                  </div>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="javascript:">
                  <div class="banner_container">
                    <img src="./images/banner2.jpg" alt="">
                  </div>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="javascript:">
                  <div class="banner_container">
                    <img src="./images/banner3.jpg" alt="">
                  </div>
                </a>
              </div>
            </div>
            <!--        Add Pagination-->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <div class="pet_list">
          <div class="adoption_header">
            <span>Adopt animals</span>
            <p>做他们一生的家人</p>
          </div>

<!--          <div class="pet_header">-->
<!--            <ul class="nav-lists">-->
<!--              <li class="nav-list">-->
<!--                <a href="javascript:">-->
<!--                  <span>推荐</span>-->
<!--                </a>-->
<!--              </li>-->
<!--              <li class="nav-list on">-->
<!--                <a href="javascript:">-->
<!--                  <span class="active">同城</span>-->
<!--                </a>-->
<!--              </li>-->
<!--              <li class="nav-list">-->
<!--                <a href="javascript:">-->
<!--                  <span>话题</span>-->
<!--                </a>-->
<!--              </li>-->
<!--              <li class="nav-list">-->
<!--                <a href="javascript:">-->
<!--                  <span>猫小组</span>-->
<!--                </a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->



          <AdoptionList/>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
  import AdoptionList from '../../components/AdoptionList/AdoptionList'
  import Scroll from '../../components/Scroll/Scroll'
  import Swiper from 'swiper'
  // import BScroll from 'better-scroll'
  import 'swiper/swiper-bundle.min.css'
  export default {
   data(){
     return{
       search:''
     }
   },
    mounted() {
       this.getLocalStorage()
       new Swiper ('.swiper-container', {
         loop: true, // 循环模式选项
         autoplay:true
       })
    },
    components:{
      AdoptionList,
      Scroll
    },
    methods:{
     getLocalStorage(){
       let token = localStorage.getItem('token')
       if(!token){
         this.$router.replace('/login')
       }
     }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .miste
    width 100%
    height 100%
    overflow-x hidden
    overflow-y hidden
    .header
      bottom-border-1px(#e4e4e4)
      position fixed
      background-color #fff
      z-index 100
      left 0
      top 0
      padding-top 10px
      width 100%
      height 45px
      .header_list
        position absolute
        left 20px
        bottom  10px
        .icon-List-1
          font-size 30px
          color #7D7D7D
      .header_search
        position absolute
        left 50%
        bottom  10px
        transform translateX(-50%)
        >input
          background-color #F2F2F2
          width 227px
          height 30px
          border-radius 15px
          padding-left 15px
        .icon-search
          font-size 18px
          position absolute
          top 50%
          transform translateY(-50%)
          right 15px
      .header_add
        position absolute
        bottom  5px
        transform translateY(-50%)
        right 27px
        .icon-add
          font-size 20px
          color #7D7D7D
    .miste-wrapper
      margin-top 55px
      .msite_nav
        padding-top 20px
        height 159px
        .swiper-container
          width 100%
          height 100%
          z-index 1
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display flex
              justify-content center
              flex-wrap nowrap
              img
                border-radius 15px
      .pet_list
        width 100%
        margin-top 30px
        .adoption_header
          margin-left 21px
          margin-bottom 20px
          span
            font-size 22.5px
            font-family "Arial"
            font-weight bold
            color #A5D2FF
          p
            font-size 12.5px
            color #FF8AA2
            font-family "Arial"
            margin-top 10px
            font-weight bold

 /*

  .pet_header
    padding 0px 20px 0
    width 100%
    .nav-list
      display inline-block
      padding 0 10px
      margin-left -10px
      text-align center
      &.on
        background url("./images/rectangle-list.png") no-repeat center bottom
      span
        width 100%
        font-size 18px
        font-family  "Arial"
        font-weight bold
        color #AAAAAA
        &.active
          color #7F7F7F

 */
</style>
