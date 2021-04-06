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
          <van-swipe :autoplay="3000" :loop="true" :width="375" indicator-color="#FF8AA2">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" />
            </van-swipe-item>
          </van-swipe>
        </nav>
        <div class="pet_list">
          <div class="msite-icon">
            <div class="item-wrap" @click="goPub">
              <div class="icon-item one">
                <img src="./images/out.png" alt="">
              </div>
              <div>宠物发布</div>
            </div>
            <div class="item-wrap" @click="goYh">
              <div class="icon-item two">
                <img src="./images/yh.png" alt="">
              </div>
              <div>宠物医护</div>
            </div>

            <div class="item-wrap" @click="$router.push('/newArticle')">
              <div class="icon-item three">
                <img src="./images/msg.png" alt="">
              </div>
              <div>最新发布</div>
            </div>

          </div>
          <div class="adoption_header">
            <span>Adopt animals</span>
            <p>做他们一生的家人</p>
          </div>
          <div class="msite-guide">
            <div class="guide-item" @click="goly">
              <img src="./images/adoption.png" alt="">
            </div>
            <div class="guide-item" @click="gojy">
              <img src="./images/jy4.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
  import AdoptionList from '../../components/AdoptionList/AdoptionList'
  import Scroll from '../../components/Scroll/Scroll'
  import { Swipe, SwipeItem,Lazyload  } from 'vant';
  import Vue from 'vue';
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Lazyload);
  // import BScroll from 'better-scroll'

  export default {
   data(){
     return{
       images: [
         '../../../static/jy.png',
         '../../../static/ly.png',
       ],
       search:''
     }
   },
    mounted() {
       this.getLocalStorage()

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
     },
      goly(){
       this.$router.push('/lyArticle')
      },
      goPub(){
        this.$router.push('/profile_publish')
      },
      gojy(){
       this.$router.push('/jyArticle')
      },
      goYh(){
        this.$router.push('/medic')      }
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
        .van-swipe
         .van-swipe-item
          /*width 100% !important*/
      .pet_list
        width 100%
        margin-top 30px
        .msite-icon
          display flex
          justify-content space-around
          .item-wrap
            font-size 14px
            display flex
            flex-direction column
            justify-content center
            .icon-item
              width 45px
              height 45px
              text-align center
              border-radius 15px
              margin 0 auto 10px
              img
                margin-top 9px
                width 60%
            .one
              background-color #A5D2FF
            .two
              background-color rgba(255, 154, 83, 0.87)
            .three
              background-color #FF8AA2
              img
                margin-top 4px
                width 37px

        .adoption_header
          margin-left 21px
          /*margin-bottom 20px*/
          margin-top 20px
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
        .msite-guide
          margin-top 10px
          padding 10px
          .guide-item
            /*background-color green*/
            margin-bottom 5px
            width 100%
            img
              width 100%
              border-radius 10px
</style>
