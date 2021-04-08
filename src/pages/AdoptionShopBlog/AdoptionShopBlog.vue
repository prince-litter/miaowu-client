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
              <img :src="'http://localhost:3000\\' + $route.query.imgUrl" alt="">
              <p class="head_name">{{$route.query.name}}</p>
              <!--        <p class="head_address">北京一环路</p>-->
            </a>
          </div>
          <div class="blog-content_nav">
            <a class="nav_item">
              <span>获赞</span>
              <span class="blog-num">{{praiseNum}}</span>
            </a>
            <a class="nav_item">
              <span>发布</span>
              <span class="blog-num">{{pubNum}}</span>
            </a>
            <a class="nav_item">
              <span>粉丝</span>
              <span class="blog-num">{{focusedNum}}</span>
            </a>
          </div>
          <div class="blog-active">
            <div class="blog-active-nav">
              <ul>
                <li>
                  <span class="nav-title on">文章发布</span>
                  <span class="active on"></span>
                </li>
<!--                <li>-->
<!--                  <span class="nav-title">收养发布</span>-->
<!--                  <span class="active"></span>-->
<!--                </li>-->
              </ul>
            </div>
            <div class="blog-message" @click="goMessage">
              <i class="iconfont icon-message"></i>
            </div>
            <Article :list="list"/>
          </div>
        </div>
      </Scroll>

    </div>

</template>
<script>
  import Scroll from '../../components/Scroll/Scroll'
  import Article from '../../components/Article/Article'
  import axios from 'axios'
  import Vue from 'vue';
  import {
    ImagePreview,
    Image as VanImage
  } from 'vant';
  Vue.use(VanImage);
  Vue.use(ImagePreview);
  export default {
    data(){
      return{
        img:[
          {url:'../../../static/active-img1.jpg'},
          {url:'../../../static/active-img1.jpg'},
          {url:'../../../static/active-img1.jpg'},
          {url:'../../../static/active-img1.jpg'},
          {url:'../../../static/active-img1.jpg'},
          {url:'../../../static/active-img1.jpg'},


        ],
        list:[],
        pubNum:0,
        praiseNum:0,
        focusedNum:0,
      }
    },
    components:{
      Scroll,
      Article
    },
    mounted(){
      this.getArticle()
      this.getPubNub()
      this.getPraise()
      this.getFocusedNum()
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
      },
      getPubNub(){
        let id = this.$route.query.userId
        axios.get('articles/pubNum',{
          params:{
            id:id,
          }
        }).then((res) => {
          if(res.data.status === '200'){
            this.pubNum = res.data.result
           // console.log(res.data.result)
          }else {
            console.log('获取失败')
          }
        })
      },
      getFocusedNum(){
        let id = this.$route.query.userId
        axios.post('users/focusedNum',{
            id:id,
        }).then((res) => {
          if(res.data.status === '200'){
            this.focusedNum = res.data.result
            // console.log(res.data.result)
          }else {
            console.log('获取失败')
          }
        })
      },
      getArticle(){
        let id = this.$route.query.userId
        axios.post('/articles/getUser',{userId:id})
          .then((res)=>{
            if(res.data.status === '200'){
                let result = res.data.result
                // let time = new Date(result[0].time).getFullYear()
                this.list = JSON.parse(JSON.stringify(result))
                // console.log(result)
            }
          })
      },
      getPraise(){
        let id = this.$route.query.userId
        axios.post('/articles/praiseNum',{id:id})
          .then((res)=>{
            if(res.data.status === '200'){
              this.praiseNum = res.data.result
              // console.log(res.data.result)
            }else {
              console.log('获取失败')
            }
          })
      },

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

</style>
