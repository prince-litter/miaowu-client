<template>
  <div>
    <van-search input-align="center" readonly placeholder="搜索" @click="toSearch"></van-search>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <Scroll :data="friends">
        <div class="refresh" v-if="!this.friends.length>0">
          <img src="./images/nomsg.png" alt="">
          <div class="ref-title">暂无消息</div>
        </div>
        <div class="message-wrapper" v-else>
          <div class="message-list">
            <div class="message-item" v-for="(item,index) in friends" :key="index" @click="goChat(item)">
              <div class="item-left">
                <img class="head-img" :src="item.imgUrl" alt="">
                <van-badge class="head-badge"  v-if="item.tip !== 0" :content="item.tip" max="99"/>
              </div>
              <div class="item-right">
                <div class="top">
                  <div class="nickname">{{item.name}}</div>
                  <div class="time">{{timeChange(item.lastTime)}}</div>
                </div>
                <div class="content">{{item.msg}}</div>
              </div>
            </div>
          </div>
          </div>
      </Scroll>
    </van-pull-refresh>
  </div>
</template>
<script>
import datas from '../../common/js/datas'
import myfun from '../../common/js/myfun'
import Scroll from '../../components/Scroll/Scroll'
import axios from 'axios'

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
      let token = localStorage.getItem('token')
      let uid = localStorage.getItem('userId')
      if(token){
        this.getFriends()
        this.join(uid)
        this.receiveSocketMsg()
      }
     // console.log(this.friends)
    },
    methods:{
      toSearch (){
        this.$router.push('/search')
      },
      onRefresh() {
        this.friends = []
        this.getFriends()
        if(this.friends){
          Toast('刷新成功');
          this.isLoading = false;
        }
      },
      goChat(data){
        let uid = localStorage.getItem('userId')
        this.$router.push({path:'/adoption_blog_message',query:{id:data.id,name:data.name,img:data.imgUrl}})
        // axios.post('users/updateMsg',{
        //   id:data.id,
        //   friendId:uid
        // }).then((res) => {
        //   if(res.data.status == 200){
        //     console.log('成功')
        //   }else {
        //     console.log('失败')
        //   }
        // })
      },
      timeChange(date){
         return myfun.dataTime(date)
      },
      getFriends(){
        let id = localStorage.getItem('userId')
        let token = localStorage.getItem('token')
        axios.get('users/list',{
          params:{
            id:id,
            token:token
          }}).then((res) =>{
            // console.log(res)
          let arr = res.data.result
          if(res.data.status === '200'){
            if(arr.length>0){
              arr.forEach((item)=>{
                item.imgUrl = 'http://localhost:3000/public/images/user/' + item.imgUrl
                this.friends.push(item)
              })
              this.friends = myfun.paixu(this.friends,'lastTime',0)
              this.friends.forEach((item2,index) => {
                //获取最后的消息
                this.getLastMsg(this.friends,index)
                //获取未读的下标
                this.getUnread(this.friends,index)
              })
            }
          }else if(res.data.status === '300'){
            Toast('登录过期请重新登录')
            setTimeout(()=>{
              this.$router.replace({path:'login',query:{userName:this.userName}})
            },1000)
          }else {
            console.log('系统出现错误')
          }
        })

      },
      //获取最后消息
      getLastMsg(arr,index){
        let id = localStorage.getItem('userId')
        let token = localStorage.getItem('token')
        axios.get('users/oneMsg',{
          params:{
            id,
            friendId:arr[index].id,
            token:token
          }}).then(res => {
          // console.log(res)
          let data = res.data.result
          if(res.data.status == '200'){
            let e = arr[index]
            if(data.types === 0){
               e.msg = data.message
              }else if(data.types === 1){
              e.msg = '[图片]'
              }else if(data.types === 2){
              e.msg = '[音频]'
              }else if(data.types === 3){
              e.msg = '[位置]'
              }
              arr.splice(index,1,e)
          }
        })
      },
      // //获取tip角标
      getUnread(arr,index){
        let id = localStorage.getItem('userId')
        let token = localStorage.getItem('token')
        axios.get('users/unreadMsg',{
          params:{
            id,
            friendId:arr[index].id,
            state:1,
            token
          }})
          .then(res => {
            // console.log('res',res)
            let data = res.data.result
            if(res.data.status === "200"){
              let e = arr[index]
              e.tip = data
              arr.splice(index,1,e)
            }

          })
      },
      //socket模块
      //用户登录socket注册
      join (uid) {
        this.$socket.emit('login',uid)
      },

      //socket聊天数据接收
      receiveSocketMsg (){
        this.sockets.subscribe('msg',(msg) =>{
          // console.log('后端发送来的消息:'+ msg )
          let nmsg = ''
          if(msg.types === 0){
            nmsg = msg.message
          }else if(msg.types === 1){
            nmsg = '[图片]'
          }else if(msg.types === 2){
            nmsg = '[音频]'
          }else if(msg.types === 3){
            nmsg = '[位置]'
          }
          // arr.splice(index,1,e)
          //对比到对应项，修改
          this.friends.forEach((item,index) => {
            if(item.id == msg.fromid){
              let e = item
              e.lastTime = new Date()
              e.msg = nmsg
              e.tip++
              //删除原来的数据
              // console.log(nmsg)
              this.friends.splice(index,1)
              //新消息插入到最顶部
              this.friends.unshift(e)
              // console.log('this.friends',this.friends)
            }
          })

        })

      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
.refresh
  text-align center
  padding-top 150px
  .ref-title
    padding-top 5px
    font-size 14px
    color rgba(39,40,50,0.4)
    line-height 20px
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
        position relative
        margin-right 15px
        .head-img
          width 48px
          height 48px
          border-radius 50%
        .head-badge
          position absolute
          top -4px
          right -4px
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
