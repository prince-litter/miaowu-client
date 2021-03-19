<template>
  <div class="adoptionShop">
    <header class="header">
      <a class="header_back" @touchstart="$router.back()">
        <i class="iconfont icon-back"></i>
      </a>
      <a class="header_listmore">
        <i class="iconfont icon-listmore "></i>
      </a>
    </header>
    <Scroll class="adoption-wrapper">
      <div class="adoption-content">
        <section class="adoptionShop_profile_user_header">
          <a href="javascript:;" @click="goBlog">
            <img class="head_img" src="./images/headme.png" alt="">
            <div class="head_right">
              <span class="user_name">哈狗来吃肉</span>
              <img src="./images/vip.png" alt="">
              <p class="user_description">4月16日</p>
            </div>
          </a>
        </section>
        <div class="adoptionShop_banner">
          <div id="adoptionShop_wrap">
            <div class="carousel-wrap"></div>
          </div>
        </div>
        <div class="adoptionShop_content">
          <p>小猫咪，母猫乳白色，具体品种未知，但是挺好看。一窝生了十只崽崽，养不起这么多的猫。所有想找一下本地人领养，不接受快递，最好当面交付猫咪。并且每周要发猫咪的视频...</p>
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
              <i class="iconfont icon-praise"></i>
              <span>973</span>
            </li>
          </ul>
        </div>
        <div class="adoptionShop_comment">
          <ul>
            <li>
              <a href="javascript:;">
                <img class="head_img" src="./images/head1.png" alt="">
                <span class="user_name">爱猫专业户</span>
                <div class="head_right">
                  <img class="praise" src="./images/praise.png" alt="">
                  <p class="user_description">这只猫咪好可爱，猫妈妈怎么样了啊。想要领养一只小猫咪，可以了解一下嘛？</p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img class="head_img" src="./images/head2.png" alt="">
                <span class="user_name">爱猫专业户</span>
                <div class="head_right">
                  <img class="praise" src="./images/praise.png" alt="">
                  <p class="user_description">这只猫咪好可爱，康康我。</p>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img class="head_img" src="./images/head1.png" alt="">
                <span class="user_name">爱猫专业户</span>
                <div class="head_right">
                  <img class="praise" src="./images/praise.png" alt="">
                  <p class="user_description">这只猫咪好可爱，猫妈妈怎么样了啊。想要领养一只小猫咪，可以了解一下嘛？</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </Scroll>

  </div>
</template>
<script>
  import Scroll from '../../components/Scroll/Scroll'
  export default {
    mounted() {

      document.addEventListener("touchstart", function (ev) {
        ev = ev || event;
        ev.preventDefault();
      }, {passive: false});
      let arr = ["../../../static/adoptionShop-banner3.png", "../../../static/adoptionShop-banner1.png", "../../../static/adoptionShop-banner3.png", "../../../static/adoptionShop-banner1.png", "../../../static/adoptionShop-banner3.png"];

      carousel(arr);

      function carousel(arr) {
        //布局
        let carouselWrap = document.querySelector(".carousel-wrap");
        if (carouselWrap) {
          let ulNode = document.createElement("ul");
          let styleNode = document.createElement("style");
          ulNode.classList.add("list");
          for (let i = 0; i < arr.length; i++) {
            ulNode.innerHTML += '<li><a href="javascript:;"><img class="banner_img" src="' + arr[i] + '" alt=""></a></li>'
          }
          //styleNode.innerHTML=".carousel-wrap > .list > li{width: "+(1/arr.length*100)+"%;}.carousel-wrap > .list{width: "+arr.length+"00%;}"
          carouselWrap.appendChild(ulNode);
          document.head.appendChild(styleNode);

          let imgNodes = document.querySelector(".carousel-wrap > .list > li > a > img");
          let imgs=document.getElementsByClassName("banner_img");
          //console.log(imgs)
          setTimeout(function () {
            carouselWrap.style.height = imgNodes.offsetHeight + "px";
          },100);

          //手指一开始的位置
          let startX = 0;
          //元素一开始的位置
          let elementX = 0;

          let disX = 0;
          let translateX = 0;
          imgs[1].style.transform="scale(1.0)"
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
            let index = translateX / 236;
            index = Math.round(index); //滑动1/2跳转
            // console.log(index)
            //超出控制
            //console.log(-index)
            if (index > 0) {
              index = 0;
            } else if (index < 1 - arr.length + 2) {
              index = 1 - arr.length + 2;
            }
            ulNode.style.transition = "1s left";
            //ulNode.style.left=index*(document.documentElement.clientWidth)+"px";
            translateX = index * (236);
            ulNode.style.transform = 'translateX(' + translateX + 'px)';
            if(disX<0){
              imgs[-index+1].style.transform="scale(1.0)";
              imgs[-index].style.transform="scale(0.8)";
            }else if(disX>=0){
              imgs[-index+1].style.transform="scale(1.0)";
              imgs[-index+2].style.transform="scale(0.8)";
            }


          }, {passive: false})
        }
      }



    },
    components:{
      Scroll
    },
    methods:{
      goBlog(){
        this.$router.push('/adoption_shop_blog')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .adoptionShop
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

  .adoption-wrapper
    margin-top 55px
    height calc(100vh - 55px) !important
    .adoption-content
      padding-top 20px
      .adoptionShop_profile_user_header
        margin-left 20px
        a
          display flex
          .head_img
            margin-right 16px
          .head_right
            margin-top 5px
            .user_name
              font-size 20px
              font-weight bold
              font-family "Arial"
              color #7F7F7F
            img
              width 20px
              vertical-align bottom
            .user_description
              font-weight bold
              font-family "Arial"
              font-size 11px
              margin-top 5px
              color #AAAAAA
      .adoptionShop_banner
        margin 10px auto
        #adoptionShop_wrap
          height 340px
          overflow hidden
          .carousel-wrap
            margin-top 10px
            .list
              list-style none
              overflow hidden
              position absolute
              width 1180px
              left -164px
              li
                float left
                width 216px
                margin 0 10px
                a
                  display block
                  margin 0 auto
                  width 216px
                  img
                    width 216px
                    border-radius 15px
                    transform scale(0.8)


      .adoptionShop_content
        margin 10px auto
        padding 0 20px
        p
          font-size 11px
          color #AAAAAA
          font-family "Arial"
          font-weight bold
          line-height 18px
        ul
          margin 15px auto
          text-align center
          display flex
          li
            flex 1
            vertical-align middle
            .iconfont
              font-size 20px
              color #797979
            span
              color #7D7D7D
              font-size 8px
      .adoptionShop_comment
        background-color #A5D2FF
        width 100%
        height 100%
        border-top-left-radius 30px
        border-top-right-radius 30px
        margin-top 30px
        ul
          padding 10px 20px
          margin 0 auto
          li a
            margin-top 25px
            display block
            .head_img
              border-radius 50%
              vertical-align middle
              margin-right 5px
            span
              font-size 14px
              color #fff
              font-family "Arial"
            .head_right
              margin-left 40px
              position relative
              .praise
                width 16px
                position absolute
                right 30px
                top -25px
              p
                font-size 10px
                color #fff
                font-family "Arial"
                line-height 18px

</style>
