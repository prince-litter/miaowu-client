<template>
  <div class="adoption">
    <header class="header">
      <div class="adoption_header">
        <ul class="nav-lists">
          <li class="nav-list on">
            <a href="javascript:">
              <span class="active">推荐</span>
            </a>
          </li>
          <li class="nav-list">
            <a href="javascript:">
              <span>同城</span>
            </a>
          </li>
        </ul>
      </div>
      <a class="header_search">
        <i class="iconfont icon-search "></i>
      </a>
      <a class="header_add">
        <i class="iconfont icon-add "></i>
      </a>
    </header>
    <nav class="adoption_nav">

      <div id="wrap">
        <div class="carousel-wrap">

        </div>
      </div>
    </nav>
    <div class="adoption_shop_list">
      <div class="adoption_header">
        <span>Adopt animals</span>
       <p>做他们一生的家人</p>
      </div>
      <AdoptionList/>
    </div>
  </div>
</template>
<script>

  import AdoptionList from '../../components/AdoptionList/AdoptionList'
  export default {

    mounted() {

        document.addEventListener("touchstart", function (ev) {
          ev = ev || event;
          ev.preventDefault();
        }, {passive: false});
        let arr = ["../../../static/banner3.jpg", "../../../static/banner1.jpg", "../../../static/banner2.jpg", "../../../static/banner3.jpg", "../../../static/banner1.jpg"];

        carousel(arr);

        function carousel(arr) {
          //布局
          let carouselWrap = document.querySelector(".carousel-wrap");
          if (carouselWrap) {
            let ulNode = document.createElement("ul");
            let styleNode = document.createElement("style");
            ulNode.classList.add("list");
            for (let i = 0; i < arr.length; i++) {
              ulNode.innerHTML += '<li><a href="javascript:;"><img src="' + arr[i] + '" alt=""></a></li>'
            }
            //styleNode.innerHTML=".carousel-wrap > .list > li{width: "+(1/arr.length*100)+"%;}.carousel-wrap > .list{width: "+arr.length+"00%;}"
            carouselWrap.appendChild(ulNode);
            document.head.appendChild(styleNode);

            let imgNodes = document.querySelector(".carousel-wrap > .list > li > a > img");
            setTimeout(function () {
              carouselWrap.style.height = imgNodes.offsetHeight + "px";
              //console.log(imgNodes.offsetHeight)
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
              let index = translateX / 301;
              index = Math.round(index); //滑动1/2跳转
              // console.log(index)
              //超出控制
              if (index > 0) {
                index = 0;
              } else if (index < 1 - arr.length + 2) {
                index = 1 - arr.length + 2;
              }
              ulNode.style.transition = "1s left";
              //ulNode.style.left=index*(document.documentElement.clientWidth)+"px";
              translateX = index * (301);
              ulNode.style.transform = 'translateX(' + translateX + 'px)';
            }, {passive: false})
          }
        }



    },
    components:{
      AdoptionList
    }
  }


</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .adoption
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
      .adoption_header
        padding 0px 20px 0
        width 100%
        position absolute
        top 50%
        transform translateY(-50%)
        .nav-list
          display inline-block
          padding 0 20px
          text-align center
          &.on
            background url("./images/rectangle.png") no-repeat center bottom
          span
            width 100%
            font-size 21px
            font-family  "Arial"
            font-weight bold
            color #AAAAAA
            &.active
              color #7F7F7F
      .header_search
        position absolute
        top 50%
        transform translateY(-50%)
        right 67px
        .icon-search
          font-size 20px
      .header_add
        position absolute
        top 50%
        transform translateY(-50%)
        right 27px
        .icon-add
          font-size 20px
          color #7D7D7D
    .adoption_nav
      margin-top 65px
      height 159px
      #wrap
        width 100%
        height 100%
        overflow hidden
        margin 0 auto
        .carousel-wrap
          width 100%
          margin 10px auto
          .list
            margin 0 auto
            list-style none
            overflow hidden
            position absolute
            width 1505px
            left -265px
            li
              float left
              width 281px
              margin 0 10px
              a
                display block
                margin 0 auto
                width 281px
                img
                  width 281px
                  border-radius 15px


    .adoption_shop_list
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



</style>
