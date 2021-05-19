<template>
  <div class="medic">
    <header class="header">
      <a class="header_title">
        <h2>Healthy life</h2>

      </a>
      <a class="header_position">
        <i class="iconfont icon-position "></i>
        <span>北京一环线内—故宫</span>
      </a>
      <a class="header_search">
        <i class="iconfont icon-search "></i>
      </a>

    </header>
    <Scroll class="medic-wrapper" ref="scroll" :data="storeList">
      <div class="content-container">
        <div class="medic_content">
          <div class="medic_nav">
            <ul class="nav_lists">
              <div class="medic_active on"></div>
              <li class="nav_list">
                <a href="javascript:">
                  <span class="active">最近</span>
                </a>
              </li>
              <div class="medic_active"></div>
              <li class="nav_list">

                <a href="javascript:">
                  <span>好评</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="medic_banner">
            <div id="medic_wrap">
              <div class="medic_carousel-wrap">

              </div>

            </div>
          </div>
        </div>
        <div class="medic_shop_list">
          <div class="shop_header">
            <span>宠物医院</span>
          </div>
          <MedicList @reScroll="reScroll"/>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
import MedicList from '../../components/MedicList/MedicList'
import Scroll from '../../components/Scroll/Scroll'

  export default {
    data(){
      return{
        storeList:[]
      }
    },
    mounted() {

      document.addEventListener("touchstart", function (ev) {
        ev = ev || event;
        ev.preventDefault();
      }, {passive: false});
      let arr = ["../../../static/medic_banner1.jpg", "../../../static//medic_banner2.jpg", "../../../static/medic_banner1.jpg"];

      carousel(arr);

      function carousel(arr) {
        //布局
        let carouselWrap = document.querySelector(".medic_carousel-wrap");
        if (carouselWrap) {
          let ulNode = document.createElement("ul");
          let styleNode = document.createElement("style");
          ulNode.classList.add("medic_list");
          for (let i = 0; i < arr.length; i++) {
            ulNode.innerHTML += '<li><a href="javascript:;"><img src="' + arr[i] + '" alt=""></a></li>'
          }
          //styleNode.innerHTML=".carousel-wrap > .list > li{width: "+(1/arr.length*100)+"%;}.carousel-wrap > .list{width: "+arr.length+"00%;}"
          carouselWrap.appendChild(ulNode);
          document.head.appendChild(styleNode);

          let imgNodes = document.querySelector(".medic_carousel-wrap > .medic_list > li > a > img");
          setTimeout(function () {
            carouselWrap.style.height = imgNodes.offsetHeight + "px";
           // console.log(imgNodes.offsetHeight)
          },100);

          //手指一开始的位置
          let startX = 0;
          //元素一开始的位置
          let elementX = 0;

          let disX = 0;
          let translateX = 0;

          carouselWrap.addEventListener("touchstart", function (ev) {
            ev = ev || event;
            ulNode.style.transition = "none";
            let TouchC = ev.changedTouches[0];
            startX = TouchC.clientX;
            //elementX=ulNode.offsetLeft;
            elementX = translateX;
          }, {passive: false});
          carouselWrap.addEventListener("touchmove", function (ev) {
            ev = ev || event;
            let TouchC = ev.changedTouches[0];
            let nowX = TouchC.clientX;
            disX = nowX - startX;
            //var left = elementX+disX;
            translateX = elementX + disX;
            //ulNode.style.left=elementX+disX+"px";
            ulNode.style.transform = 'translateX(' + translateX + 'px)';
          }, {passive: false});
          carouselWrap.addEventListener("touchend", function (ev) {
            ev = ev || event;
            //index抽象了ul的实时位置
            //var index = ulNode.offsetLeft/document.documentElement.clientWidth;
            let index = translateX / 203;
            index = Math.round(index); //滑动1/2跳转
            // console.log(index)
            //超出控制
            if (index > 0) {
              index = 0;
            } else if (index < 1 - arr.length + 1) {
              index = 1 - arr.length + 1;
            }
            ulNode.style.transition = "1s left";
            //ulNode.style.left=index*(document.documentElement.clientWidth)+"px";
            translateX = index * (201);
            ulNode.style.transform = 'translateX(' + translateX + 'px)';
          }, {passive: false})
        }
      }

    },
    components:{
        MedicList,
        Scroll
    },
    methods:{
      reScroll(storeList){
        this.storeList = storeList
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .medic
    width 100%
    overflow-x hidden
    overflow-y hidden
    .header
      bottom-border-1px(#e4e4e4)
      position fixed
      background-color #fff
      z-index 100
      left 0
      top 0px
      padding-top 10px
      width 100%
      height 45px
      .header_title
        position absolute
        left 20px
        top 10px
        h2
          color #555555
          font-weight bold
          font-size 20px
      .header_position
        position absolute
        left 20px
        bottom 5px
        span
          color #7F7F7F
          font-family 'Arial'
          font-weight bold
          font-size 13px
      .header_search
        position absolute
        bottom  5px
        transform translateY(-50%)
        right 27px
        .icon-search
          font-size 20px
          color #7D7D7D
    .medic-wrapper
      margin-top 55px!important
      .content-container
        padding-top 20px
        padding-bottom 10px
        .medic_content
          width 100%
          display flex
          .medic_nav
            margin-left 20px
            .nav_lists
              width 37px
              .nav_list
                width 15px
                margin-left 5px
                display inline-block
                vertical-align top
                padding-top 4px
                margin-bottom 20px
                span
                  font-size 15px
                  font-family "Arial"
                  font-weight bold
                  &.active
                    color #555555
              .medic_active
                width 7px
                height 38px
                display inline-block
                &.on
                  background-color #FEB8C0
          .medic_banner
            margin-left 20px
            width 100%

            #medic_wrap
              height 350px
              overflow hidden
              .medic_carousel-wrap
                margin-top 10px
                position relative
                .medic_list
                  list-style none
                  overflow hidden
                  position absolute
                  width 609px
                  left 0px
                  li
                    float left
                    width 183px
                    margin 0 10px
                    a
                      display block
                      margin 0 auto
                      width 183px
                      img
                        width 183px
                        border-radius 15px



        .medic_shop_list
          width 100%
          height 100%
          margin-top 20px
          .shop_header
            margin-left 20px
            margin-bottom 20px
            span
              font-size 20px
              font-family "Arial"
              font-weight bold
              color #AAAAAA

</style>
