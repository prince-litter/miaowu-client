<template>
  <div>
    <van-search input-align="center" readonly placeholder="搜索" @click="toSearch"></van-search>
    <Scroll :data="friends">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="message-wrapper">
          <div class="message-list">
            <div class="message-item" v-for="(item,index) in friends" :key="index" @click="goChat">
              <div class="item-left">
                <van-badge :content="item.tip" max="99">
                  <img class="head-img" :src="item.imgUrl" alt="">
                </van-badge>
              </div>
              <div class="item-right">
                <div class="top">
                  <div class="nickname">{{item.name}}</div>
                  <div class="time">{{timeChange(item.time)}}</div>
                </div>
                <div class="content">{{item.news}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </Scroll>

  </div>
</template>
<script>
import datas from '../../common/js/datas'
import myfun from '../../common/js/myfun'
import Scroll from '../../components/Scroll/Scroll'

import Vue from 'vue';
import { PullRefresh,Toast } from 'vant';
Vue.use(PullRefresh);

  export default {
    data() {
      return {
        friends:[],
        pulldown: true,
        isLoading: false,
      };
    },
    components:{
      Scroll
    },
    mounted(){
      this.getFriends()
      console.log(this.friends)
    },
    methods:{
      toSearch (){
        this.$router.push('/search')
      },
      onRefresh() {
        setTimeout(() => {
          Toast('刷新成功');
          this.isLoading = false;
        }, 1000);
      },
      goChat(){
        this.$router.push('/adoption_blog_message')
      },
      timeChange(date){
         return myfun.dataTime(date)
      },
      getFriends(){
        this.friends = datas.friends()
        this.friends.forEach((item)=>{
          item.imgUrl = '../../../static/images/' + item.imgUrl
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
.message-wrapper
  padding-top 10px
  top-border-1px(#e4e4e4)
  .message-list
    /*margin-bottom 72px*/
    /*padding 5px 0*/
    .message-item
      padding 8px 10px
      display flex
      &:active
        background-color #eeeeee
      .item-left
        margin-right 15px
        .head-img
          width 48px
          height 48px
          border-radius 50%
      .item-right
        display flex
        flex 1
        flex-direction column
        justify-content space-around
        .top
          display flex
          justify-content space-between
          .nickname
            font-weight bold
            font-size 16px
            font-family Arial
            color #A5D2FF
           .time
             color #CCCCCC
             font-size 12px
             font-weight bold
        .content
          width 200px
          font-size 13px
          color #999999
          font-weight bold
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          text-align left



</style>
