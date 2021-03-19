<template>
  <div class="medicShop">
    <Scroll class="medicShop-wrappper">
      <div class="medicShop-container">
        <div class="medicShop_header">
          <a href="javascript:" class="go_back" @touchstart="$router.back()">
            <i class="iconfont icon-back"></i>
          </a>
        </div>
        <div class="medicShop_content">
          <div class="hospital_header">
            <div class="right">
              <h3>{{storeName}}</h3>
              <i class="iconfont icon-position"></i>
              <span>{{storeAddress}}</span>
            </div>
            <div class="left">
              <img src="./images/star.png" alt=""><br>
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
            </div>
            <div class="bottom">
              <div>{{storeInfo[0].tel}}</div>
              <div>{{storeInfo[0].startTime}} AM-{{storeInfo[0].endTime}} PM</div>
            </div>
          </div>
          <div class="hospital_menu">
            <div class="hospital-active-nav">
              <ul>
                <li>
                  <span class="nav-title on">文章发布</span>
                  <span class="active on"></span>
                </li>
                <li>
                  <span class="nav-title">医疗资源</span>
                  <span class="active"></span>
                </li>
                <li>
                  <span class="nav-title">评价</span>
                  <span class="active"></span>
                </li>
                <li>
                  <span class="nav-title">咨询</span>
                  <span class="active"></span>
                </li>
              </ul>
            </div>
            <div class="hospital_list">
              <div class="hospital_order">
                <ul>
                  <li v-for="item in storeInfo[0].goodsInfo">
                    <section class="types_left">
                      <VanImage lazy-load :src="'http://localhost:3000\\' + item.goodImage" alt="" />
                      <div class="type_name">
                        <p>{{item.goodName}}</p>
                        <span>￥{{item.goodPrice}}</span>
                      </div>
                    </section>
                    <section class="type_right">
                      <div class="one" @click="editCard('minu',item)">
                        <i class="iconfont icon-minus"></i>
                      </div>
                      <div class="two">{{item.goodNum}}</div>
                      <div class="three" @click="editCard('add',item)">
                        <i class="iconfont icon-add"></i>
                      </div>
                    </section>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="medicShop_footer">
      <div class="foot_box">
        <span class="total">共计</span>
        <span class="money">￥{{money}}.00</span>
        <div class="end">结算</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Scroll from '../../components/Scroll/Scroll'
  import Vue from 'vue';
  import { Image as VanImage } from 'vant';
  import { Lazyload } from 'vant';

  Vue.use(Lazyload);
  Vue.use(VanImage);
  export default {
    data(){
      return{
        storeInfo:[],
        storeName:'',
        storeAddress:''
      }
    },
    components:{
      Scroll
    },
    mounted() {

    },
    computed:{
      money(){
        let money = 0
        this.storeInfo[0].goodsInfo.forEach((item) => {
          money += item.goodNum * item.goodPrice
        })
        return money
      }
    },
    beforeMount(){
      this.storeInfo = this.$route.query.storeInfo
      this.storeName = this.$route.query.storeName
      this.storeAddress = this.$route.query.storeAddress
    },
    methods:{
      editCard(flag,item){
        if(flag === 'minu'){
          if(item.goodNum>0){
            item.goodNum--
          }
        }else {
          item.goodNum++
        }
      }
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .medicShop
    width 100%
    height 100%
    overflow-x hidden
    overflow-y hidden
    .medicShop-wrappper
      height calc(100vh - 83px) !important
      .medicShop-container
        .medicShop_header
          height 384px
          background url("./images/bg1.png") no-repeat
          background-size cover
          .go_back
            position absolute
            top 20px
            left 20px
            .iconfont
              font-size 25px

        .medicShop_content
          height 500px
          background-color #A5D2FF
          margin-top -55px
          border-top-left-radius 50px
          .hospital_header
            color #fff
            margin-left 30px
            padding-top 30px
            position relative
            .right
              h3
                font-size 23px
                font-weight bold
                font-family "Arial"
                margin-bottom 15px
              .iconfont
                font-size 25px
              span
                font-size 13px
                font-family "Arial"
                font-weight bold
            .left
              width 53px
              height 43px
              background-color #fff
              border-radius 10px
              position absolute
              top 42px
              right 34px
              text-align center
              padding-top 10px
            .bottom
              margin-top 22px
              display flex
              div
                color #797979
                width 147px
                height 33px
                background-color #fff
                border-radius 10px
                font-size 13px
                font-weight bold
                font-family "Arial"
                text-align center
                line-height 33px
                margin-right 13px
          .hospital_menu
            margin-top 25px
            .hospital-active-nav
              ul
                margin 0 auto
                li
                  display inline-block
                  margin-left 30px
                  .nav-title
                    font-family "Arial"
                    font-size 16px
                    font-weight bold
                    color #797979
                    z-index 10
                    position relative
                    &.on
                      color #555555
                  .active
                    z-index 1
                    &.on
                      display block
                      width 75px
                      height 8px
                      background-color #FEB8C0
                      position relative
                      left -5px
                      top -5px

            .hospital_list
              width 100%
              margin 0 auto
              .hospital_order
                margin 0 auto
                margin-top 30px
                ul
                  margin 0 auto
                  li
                    margin 15px auto
                    width 307px
                    height 80px
                    background-color #fff
                    border-radius 10px
                    display flex
                    position relative

                    .types_left
                      padding-top 8px
                      margin-left 10px
                      display inline-block
                      .type_name
                        margin-left 15px
                        display inline-block
                        margin-top 10px
                        vertical-align top
                        p
                          font-size 18px
                          font-family "Arial"
                          font-weight bold
                          color #7F7F7F
                          margin-bottom 10px
                        span
                          font-family "Arial"
                          font-weight bold
                          color #AAAAAA
                          font-size 13px



                    .type_right
                      display flex
                      position absolute
                      right 15px
                      top 30px
                      div
                        width 20px
                        height 12.5px
                        text-align center
                        padding-top 2.5px
                        .iconfont
                          color #fff
                          font-size 11px
                          font-weight bold
                          vertical-align top
                      .one
                        border-top-left-radius 10px
                        border-bottom-left-radius 10px
                        background-color #F9FD4B
                      .two
                        background-color #df9933
                        color #fff
                        font-size 12px
                        line-height 11px
                        font-weight bold
                        font-family "Arial"
                      .three
                        background-color #F9FD4B
                        border-top-right-radius 10px
                        border-bottom-right-radius 10px



    .medicShop_footer
      top-border-1px(#e4e4e4)
      width 100%
      height 83px
      position fixed
      left 0
      bottom 0
      background-color #fff
      .foot_box
        margin-left 30px
        position relative
        span
          line-height 83px
          font-family "Arial"
          font-weight bold
          margin-right 15px
        .total
          color #797979
          font-size 14px
        .money
          color #FF6649
          font-size 18px
        .end
          position absolute
          display inline-block
          width 100px
          height 32px
          background-color #88D904
          border-radius 20px
          color white
          line-height 32px
          font-family "Arial"
          font-weight bold
          text-align center
          font-size 18px
          right 30px
          top 50%
          transform translateY(-50%)
</style>
