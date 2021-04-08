<template>
  <div>
    <div class="task-top">
      <a class="header-back" @click="goBack">
        <i class="iconfont icon-back"></i>
      </a>
      <div>我的发布</div>
    </div>
    <Scroll class="task-wrapper">
      <div>
        <div class="task-content" v-for="(item,index) in list" :key="index">
          <section class="task-left">
            <div class="task-over" v-show="item.state === 1 ? true : false">
              <img src="./images/over1.png" alt="">
            </div>
            <van-image fit="cover" width="140" height="100" :src="'http://localhost:3000\\'+ item.imgArr[0]"  />
          </section>
          <section class="task-right">
            <div class="task-txt">{{item.tex}}</div>
            <div class="task-zt">
              <div class="state">状态</div>
              <div class="handler">处理中</div>
            </div>
            <van-button v-show="item.state === 0 ? true : false" color="#A5D2FF" class="btn" plain round size="mini" @click="update(item.id)">修改状态</van-button>
            <van-button v-show="item.state === 1 ? true : false" color="#A5D2FF" class="btn" plain round size="mini">已修改</van-button>
          </section>
        </div>
      </div>

    </Scroll>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Scroll from '../../components/Scroll/Scroll'
  import {
    ImagePreview,
    Image as VanImage,
    Button,
    Toast
  } from 'vant';
  Vue.use(VanImage);
  Vue.use(ImagePreview);
  Vue.use(Button);
  import axios from 'axios'
  export default {
    data(){
      return {
        isActive:true,
        list:[]
      }
    },
    mounted(){
      this.getArticle()
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      getArticle(){
        let id = localStorage.getItem('userId')
        axios.post('/articles/getUser',{userId:id})
          .then((res)=>{
            if(res.data.status === '200'){
              let result = res.data.result
              if(result.length === 0){
                Toast('暂无数据')
                return
              }
              this.list = JSON.parse(JSON.stringify(result))
              console.log(result)
            }
          })
      },
      update(id){
        axios.post('/articles/updateArticle',{id:id})
          .then((res)=>{
            if(res.data.status === '200'){
                this.getArticle()
                Toast('修改成功')
            }
          })
      }
    },
    components:{
      Scroll,


    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .task-top
    bottom-border-1px(#e4e4e4)
    position fixed
    background-color #fff
    z-index 100
    left 0
    top 0
    padding-top 10px
    width 100%
    height 45px
    display flex
    justify-content center
    align-items center
    .header-back
      position absolute
      left 20px
      bottom  10px
      .icon-back
        font-size 25px
        color #7D7D7D
  .task-wrapper
    margin-top 55px
    padding-top 15px
    height calc(100vh - 55px) !important
    .task-content
      padding 0 15px 20px
      display flex
      .task-left
        position relative
        .task-over
          position absolute
          z-index 99
          top 50%
          left 50%
          transform translate(-50%,-50%)
          img
            width 80px
        .van-image
          img
            border-radius 10px
      .task-right
        padding-top 5px
        margin-left 15px
        font-size 14px
        position relative
        .task-txt
          text-overflow -o-ellipsis-lastline
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          text-align left
          line-height 15px
        .task-zt
          display flex
          margin-top 10px
          .state
            background-color #FF8AA2
            color #fff
            padding 2px
            font-size 12px
            border-radius 3px
            line-height 16px
          .handler
            border 1px solid #FF8AA2
            font-size 12px
            color #FF8AA2
            padding 2px
            margin-left 7px
        .btn
          position absolute
          right 0
          bottom 6px

</style>
