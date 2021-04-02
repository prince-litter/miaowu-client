<template>
  <div class="profile">
    <Scroll class="profile-wrapper">
      <div class="profile-container">
        <div class="profile_head">
          <div class="head_bg"></div>
          <div class="head_bg1"></div>
          <a href="javascript:;" class="head_box">
            <img :src="this.imgUrl" alt="">
            <p class="head_name" v-show="!userName" @click="toLogin">登录/注册</p>
            <p class="head_name" v-show="userName">{{userName}}</p>
            <p class="head_address" v-show="userName" @click="logout">退出登录</p>
          </a>
        </div>
        <div class="profile_content">
          <div class="content_nav">
            <a class="nav_item">
              <span>收藏</span>
              <span>60</span>
            </a>
            <a class="nav_item" @touchstart="$router.push('/profile_publish')">
              <span>发布</span>
              <span>{{pubNum}}</span>
            </a>
            <a class="nav_item">
              <span>粉丝</span>
              <span>5460</span>
            </a>
            <a class="nav_item">
              <span>评论</span>
              <span>48</span>
            </a>
          </div>
          <div class="content_head">
            <div class="head-item" @click="$router.push('/myTask')">
              <img src="./images/fb.png" alt="">
              <div>我的发布</div>
            </div>
            <div class="head-item">
              <img src="./images/sc.png" alt="">
              <div>我的收藏</div>
            </div>
            <div class="head-item last">
              <img src="./images/sz.png" alt="">
              <div>基本设置</div>
            </div>
          </div>


        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
  import ProfileList from '../../components/ProfileList/ProfileList'
  import Scroll from '../../components/Scroll/Scroll'
  import Article from '../../components/Article/Article'
  import Dialog  from 'vant/lib/dialog';
  import 'vant/lib/dialog/style';
  import axios from  'axios'
  export default {
    data(){
      return{
        userName:'',
        imgUrl:'http://localhost:3000/public/images/user/head-me.jpg',
        list:[],
        pubNum:null
      }
    },
    mounted(){
      // this.userName = this.$route.query.userName
      // console.log(localStorage.getItem('token'))
      this.loginCheck()
      this.getArticle()
      this.getPubNub()
    },
    methods:{
      getPubNub(){
        let id =localStorage.getItem('userId')
        axios.get('articles/pubNum',{
          params:{
            id:id,
          }
        }).then((res) => {
          if(res.data.status === '200'){
            this.pubNum = res.data.result
            console.log(res.data.result)
          }else {
            console.log('获取失败')
          }
        })
      },
      loginCheck(){
        let imgUrl = localStorage.getItem('imgUrl')
        let token = localStorage.getItem('token')
        let userName = localStorage.getItem('userName')
        if(token){
          this.imgUrl = "http://localhost:3000/public/images/user/" + imgUrl
          this.userName = userName
        }

        // axios.get('/users/checkLogin').then((response) => {
        //   var res = response.data
        //   if(res.status == '200'){
        //     this.userName = res.result
        //
        //     // console.log(this.imgUrl)
        //   }
        // })
      },
      toLogin(){
        this.$router.push('/login')
      },
      logout(){
        Dialog.confirm({
          title: '提示',
          message: '您确定要退出登录吗？',
        })
          .then(() => {
            axios.post('/users/logout').then((response) => {
              var res = response.data
              if(res.status == '200'){
                this.userName=''
                this.imgUrl = 'http://localhost:3000/public/images/user/head-me.jpg'
              }
            })
          })
          .catch(() => {
          // on cancel
        });
      },
      getArticle(){
        let id = localStorage.getItem('userId')
        axios.post('/articles/getUser',{userId:id})
          .then((res)=>{
            if(res.data.status === '200'){
              let result = res.data.result
              let time = new Date(result[0].time).getFullYear()
              this.list = JSON.parse(JSON.stringify(result))
              // console.log(result)
            }
          })
      },
    },
  components:{
    ProfileList,
    Scroll,
    Article
  }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .profile
    width 100%
    overflow-x hidden
    overflow-y hidden
    .profile-wrapper
      height calc(100vh - 83px) !important
      .profile-container
        height 800px
        .profile_head
          width 100%
          .head_bg
            width 100%
            height 270px
            background-color #555555
          .head_bg1
            width 100%
            height 270px
            background url("./images/bg1.jpg") no-repeat
            background-size cover
            position absolute
            top 0
            opacity 0.9
          .head_box
            position absolute
            left 50%
            top 80px
            transform translateX(-50%)
            text-align center
            img
              border-radius 50%
              width 67px
              height 67px
            .head_name,.head_address
              color white
              font-family "Arial"
            .head_name
              font-weight bold
              font-size 23px
              margin 10px 0
            .head_address
              font-size 14px
              border-bottom 1px solid #fff
              padding 0 3px 1px 3px
        .profile_content
          width 100%
          background url("./images/bg2.jpg") no-repeat
          background-size cover
          position absolute
          top 220px
          border-radius 40px 40px
          .content_nav
            margin-top 30px
            display flex
            justify-content center
            .nav_item
              display flex
              flex-direction column
              align-items center
              width 25%
              span
                margin-bottom 10px
                color #7F7F7F
                font-size 15px
                font-family "Arial"
                font-weight bold
          .content_head
            margin-top 30px
            display flex
            justify-content space-around
            padding 0 10px
            .head-item
              height 80px
              width 112px
              display flex
              flex-direction column
              justify-content center
              align-items center
              border-right 1px solid rgba(230,230,230,.7)
              border-bottom 1px solid rgba(230,230,230,.7)
              font-size 14px
              img
                width 35%
                margin-bottom 15px
            .last
              border-right none



</style>
