<template>
  <div class="adoptionBlogMessage">
      <div class="message_header">
        <a href="javascript:" class="go_back" @click.stop="goBack">
          <i class="iconfont icon-back"></i>
        </a>
        <p class="message_name">{{fname}}</p>
      </div>
      <Scroll class="adoptionBlogMessage-wrapper" :scrollToEndFlag="true" :data="msgs" ref="scroll">
        <div class="chat-main" :style="{paddingBottom:inputh}">
            <div class="chat-ls" v-for="(item,index) in msgs" :key="index">
              <div class="message_time" v-if="item.time !== ''">{{changeTime(item.time)}}</div>
              <div class="msg-m msg-left" v-if="fid == item.fromId">
              <img class="user-img" :src="fimgurl" alt="" @click="goZy(fimgurl,fname,fid)">
              <div class="message" v-if="item.types === 0">
                <div class="msg-text">{{item.message}}</div>
              </div>
              <div class="message" v-if="item.types === 1">
                <img :src="item.message" class="msg-img"  @click="imagePreview(item.message)"  alt="">
              </div>
              <div class="message" v-if="item.types === 2" >
                <div class="msg-text voice"
                     :style="{width:item.message.time * 4 + 'px'}"
                     @click="playVoice(item.message.voice)"
                >
                  <img src="./images/yy.png" class="voice-img" alt="">
                  {{item.message.time}}"
                </div>
              </div>
              <div class="message" v-if="item.types === 3">
                <div class="msg-map">
                  <div class="map-name">{{item.message.address}}</div>
                  <div class="map-address">{{item.message.address}}</div>
                  <div class="map" :id="item.id"></div>
                </div>

              </div>
            </div>
              <div class="msg-m msg-right" v-if="uid ===item.fromId">
                <img class="user-img" :src="uimgurl" alt="" @click="goZy(uimgurl,uname,uid)">
                <!-- 文字-->
                <div class="message" v-if="item.types === 0">
                  <div class="msg-text">{{item.message}}</div>
                </div>
                 <!-- 图片-->
                <div class="message" v-if="item.types === 1">
                  <img :src="item.message" class="msg-img" @click="imagePreview(item.message)" alt="">
                </div>
                <!-- 音频-->
                <div class="message" v-if="item.types === 2">
                  <div class="msg-text voice"
                       :style="{width:item.message.time * 4 + 'px'}"
                       @click="playVoice(item.message.voice)"
                  >
                    {{item.message.time}}"
                    <img src="./images/yy.png" class="voice-img" alt="">
                  </div>
                </div>
                <!-- 位置-->
                <div class="message" v-if="item.types === 3">
                  <div class="msg-map">
                    <div class="map-name">{{item.message.address}}</div>
                    <div class="map-address">{{item.message.address}}</div>
                    <div class="map" :id="item.id"></div>
                  </div>

                </div>
              </div>
            </div>
<!--            <div class="chat-ls">-->
<!--              <div class="message_time">昨天 下午5:20</div>-->
<!--              <div class="msg-m msg-right">-->
<!--                <img class="user-img" src="./images/head-me.jpg" alt="">-->
<!--                <div class="message">-->
<!--                  <div class="msg-text">你好呀在吗，在吗？你好呀在吗，多日不见，甚是想念，在吗</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

          </div>
      </Scroll>
      <Submit ref="submit" @inputs = "inputs" @heights="heights"/>

  </div>

</template>
<script>
  import Scroll from '../../components/Scroll/Scroll'
  import Submit from '../../components/Submit/Submit'
  import datas from '../../common/js/datas'
  import myfun from '../../common/js/myfun'
  import axios from 'axios'
  import Vue from 'vue';
  import { ImagePreview,Toast } from 'vant';

  // 全局注册
  Vue.use(ImagePreview);
  export default {
    data(){
      return{
        msgs:[],
        imgMsg:[],
        oldTime:0,
        inputh:'54px',
        isPlay:false,
        nowpage:0 ,//页数,
        uname:'',
        uid:'',
        uimgurl:'',
        token:'',
        fid:'',
        fimgurl:'',
        fname:'',
        pagesize:10,
      }
    },
    components:{
      Scroll,
      Submit
    },
    mounted(){
      this.receiveSocketMsg()
      this.getStorages()
      this.fid = this.$route.query.id
      this.fname = this.$route.query.name
      this.fimgurl = this.$route.query.img
      let token =localStorage.getItem('token')
      if(token){
        this.getMsg(this.nowpage)
        if(this.msgs){
            setTimeout(() => {
              this.getmap()
            },50)
        }

      }
    },

    watch:{
      msgs:{
        handler(){
          setTimeout(()=>{
            this.$nextTick(() => {
              this.$refs.scroll.ScrollToEndFlag();
              this.$refs.scroll.refresh()
            })
          },100)

        },
        immediate:true,
        deep:true
  }
    },
    methods:{
      goZy(imgUrl,name,id){

        let arr =imgUrl.split('/')
        let img = arr[arr.length-1]
        this.$router.push({path:'/adoption_shop_blog',query:{name:name,imgUrl:img,userId:id}})
      },
      //返回
      goBack(){
        this.$router.back()
        axios.post('users/updateMsg',{
          id:this.fid,
          friendId:this.uid
        }).then((res) => {
          if(res.data.status == 200){
            console.log('成功')
          }else {
            console.log('失败')
          }
        })
      },
      //获取缓存数据
      getStorages(){
        try {
          let token = localStorage.getItem('token')
          if(token){
            this.uid = localStorage.getItem('userId')
            this.uname = localStorage.getItem('userName')
            this.uimgurl = 'http://localhost:3000\\' + localStorage.getItem('imgUrl')
            this.token = token
          }else {
            this.$router.replace('/login')
          }
        }catch (e) {

        }
      },
      //创建地图
      getmap () {
        let info = this.msgs
        // console.log(info,'info')
        info.forEach(item =>{
          if(item.types === 3){
          // console.log('item',item)
         item.message = JSON.parse(item.message)
          let lat = item.message.latitude
          let lon = item.message.longitude
          let map = new AMap.Map(`${item.id}`, {
            center:[lon, lat],
            zoom:14
          });
          // 创建一个 Marker 实例：
          let marker = new AMap.Marker({
            position: new AMap.LngLat(lon, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          });

          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
        }
        })

      },
      //创建最新地图
      getmapLast () {
        let info = this.msgs[this.msgs.length-1]
        // console.log('infoinfo',info)
          if(info.types === 3){
            // console.log('info',info)
            info.message = JSON.parse(info.message)
            let lat = info.message.latitude
            let lon = info.message.longitude
            let map = new AMap.Map(`${info.id}`, {
              center:[lon, lat],
              zoom:14
            });
            // 创建一个 Marker 实例：
            let marker = new AMap.Marker({
              position: new AMap.LngLat(lon, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            });
            // 将创建的点标记添加到已有的地图实例：
            map.add(marker);
          }

      },
      getmapLast2 () {
        let info = this.msgs[this.msgs.length-1]
        // console.log('infoinfo',info)
        if(info.types === 3){
          // console.log('info',info)
          info.message = JSON.parse(info.message)
          let lat = info.message.latitude
          let lon = info.message.longitude
          let map = new AMap.Map(`${info.id}`, {
            center:[lon, lat],
            zoom:14
          });
          // 创建一个 Marker 实例：
          let marker = new AMap.Marker({
            position: new AMap.LngLat(lon, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
        }

      },
      //预览图片
      imagePreview(currentImg){
        let current = null
        this.imgMsg.forEach((item,index) => {
          if(item === currentImg){
            current = index
          }
        })
        ImagePreview({images:this.imgMsg,startPosition:current,closeable: true, });
      },
      //音频播放
      playVoice(e){
        // this.isPlay = !this.isPlay
        // console.log( this.isPlay)
        this.audio = new Audio()
        this.audio.src = e
        this.audio.play()
        // if(this.isPlay){
        //   this.audio.play()
        // }

      },
      //获取消息
      getMsg(page) {
        axios.post('chat/msg',{
            id:this.uid,
            friendId:this.fid,
            nowPage:page,
            pageSize:this.pageSize,
            token:this.token
          }).then((res) =>{
          // console.log(res)
          if(res.data.status === '200'){
            let msg = res.data.result
            //将获取的数据倒序
            msg.reverse();
            if(msg.length>0){
              let oldtime = msg[0].time
              let imgarr = []
              msg.forEach((item,index)=>{
                if(index === 0){
                  return
                }
                // item.imgUrl = 'http://localhost:3000/public/images/user/' + item.imgUrl
                // item.imgUrl = 'http://localhost:3000\\' + item.imgUrl
                //时间间隔
                if(index < msg.length - 1){
                  let t = myfun.spaceTime(oldtime,item.time)
                  if(t){
                    oldtime = t
                  }
                  item.time = t
                }
                //匹配最大时间
                if(this.nowpage == 0){
                  if(item.time > this.oldTime){
                    this.oldTime = item.time
                  }
                }
                //处理发送的图片地址
                if(item.types === 1){
                  item.message = 'http://localhost:3000\\' + item.message
                  // item.message = 'http://localhost:3000/public/images/user/' + item.message
                  imgarr.push(item.message)
                  // this.imgMsg.unshift(item.message)
                }
                // this.msgs.unshift(item)
                //json字符串还原
                if(item.types === 2){
                  item.message = JSON.parse(item.message)
                }
              })

              this.msgs = msg.concat(this.msgs)
              this.imgMsg = imgarr.concat(this.imgMsg)
            }
            //判断nowPage
            if(msg.length == 10){
              this.nowpage++;
            }else {
              //数据获取完毕
              this.nowpage = -1
            }
            //页数加一
            // this.$nextTick(()=>{
            //   this.$refs.scroll.ScrollToEndFlag();
            // })
          }
          else if(res.data.status === '300'){
            Toast('登录过期请重新登录')
            setTimeout(()=>{
              this.$router.replace({path:'login',query:{userName:this.userName}})
            },1000)
          }else {
            console.log('系统出现错误')
          }
        })

      },
      //获取消息
      getMsg1() {
        let msg = datas.message()
        msg.forEach((item,index)=>{
          item.imgUrl = '../../../static/images/' + item.imgUrl
          //时间间隔
          if(index < msg.length - 1){
            let t = myfun.spaceTime(this.oldTime,item.time)
            if(t){
              this.oldTime = t
            }
            item.time = t
          }

          //处理发送的图片地址
          if(item.types === 1){
            item.message = '../../../static/images/' + item.message
            this.imgMsg.unshift(item.message)
          }
          this.msgs.unshift(item)
        })
      },
      //处理时间
      changeTime(date){
        return myfun.dataTime1(date)
      },
      //接收输入内容
      inputs(e,file){
         this.receiveMsg(e,this.uid,this.uimgurl,file,0,)
      },
      //接收消息
      receiveMsg(e,id,img,file,tip){
        //tip==0表示自己发的，tip==1

        if(e.types === 0 || e.types === 3 || e.types === 2){
          //发送消息给后端
          this.sendSocket(e)
        }
        if(e.types === 1 ){
          this.imgMsg.push(e.message)
          //提交图片
          //当前日期文件夹
          let url =myfun.fileName(new Date())
          let formData = new window.FormData();
          let name = new Date().getTime() + this.uid+Math.ceil(Math.random()*10)
          formData.append("name", name);
          formData.append("url", url);
          formData.append("file", file);
          axios.post('/files/upload',formData)
            .then(res =>{
              // console.log('path',res.data.result.path)
              let data = {
                message:res.data.result.path,
                types:1
              }
              this.sendSocket(data)
            })
        }
        // if(e.types === 2 ){
        //   //提交音频
        //   //当前日期文件夹
        //   let url =myfun.fileName(new Date())
        //   let formData = new window.FormData();
        //   let name = new Date().getTime() + this.uid+Math.ceil(Math.random()*10)
        //   formData.append("name", name);
        //   formData.append("url", url);
        //   formData.append("file",file);
        //   axios.post('/files/upload',formData)
        //     .then(res =>{
        //       console.log('path',res.data.result.path)
        //       let data = {
        //         message:res.data.result.path,
        //         types:2
        //       }
        //       this.sendSocket(data)
        //     })
        // }
        //处理时间间隔
        let len = this.msgs.length
        let nowTime = new Date();
        let t = myfun.spaceTime(this.oldTime,nowTime)
        if(t){
          this.oldTime = t
        }
        nowTime = t
        //json字符串还原
        if(e.types === 2 ){
          e.message = JSON.parse(e.message)
        }
        let data = {
          fromId:id, //发送者id
          imgUrl:img,
          message:e.message,
          types:e.types,                //内容类型（0文字，1图片连接，2音频连接）
          time: nowTime,  //发送时间
          id:len
        }
        this.msgs.push(data)

        if(e.types === 3){
          setTimeout(() => {
            this.$nextTick(() => {
              this.getmapLast()
              // this.$refs.scroll.ScrollToEndFlag()

              // this.$refs.submit.getElementHeight()
            })
          },50)
        }

      },
      //聊天数据发送给后端
      sendSocket (e){
        //1对1聊天
        this.$socket.emit('msg',e,this.uid,this.fid)
      },
      //socket聊天数据接收
      receiveSocketMsg (){
        this.sockets.subscribe('msg',(msg) =>{
          // console.log('后端发送来的消息:'+ msg )
          if(msg.fromid === this.fid && msg.flag === 0){
            let len = this.msgs.length
            //处理时间间隔
            let nowTime = new Date();
            let t = myfun.spaceTime(this.oldTime,nowTime)
            if(t){
              this.oldTime = t
            }
            //判断是否需要添加ip
            if(msg.types === 1){
                msg.message = 'http://localhost:3000\\' + msg.message
            }

            nowTime = t
            if( msg.types === 2 ){
              msg.message = JSON.parse(msg.message)
            }
            let data = {
              fromId:msg.fromid, //发送者id
              imgUrl:this.fimgurl,
              message:msg.message,
              types:msg.types,                //内容类型（0文字，1图片连接，2音频连接）
              time: nowTime,  //发送时间
              id:len
            }

            // console.log('data',data)
            this.msgs.push(data)
            // console.log('this.msgs',this.msgs)
            if(msg.types === 1){
              this.imgMsg.push(msg.message)
            }
            if(msg.types === 3){
              setTimeout(() => {
                this.$nextTick(() => {
                  this.getmapLast2()
                  // this.$refs.scroll.ScrollToEndFlag()

                  // this.$refs.submit.getElementHeight()
                })
              },50)
            }

          }
        })

      },
      //输入框的高度
      heights(val){
        this.inputh=val
        this.$nextTick(() => {
          this.$refs.scroll.ScrollToEndFlag();
        })

      },


    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .adoptionBlogMessage
    width 100%
    height 100%
    overflow-x hidden
    overflow-y hidden
    .message_header
      bottom-border-1px(#AAAAAA)
      position fixed
      left 0
      top 0
      z-index 100
      margin 0 auto
      background-color #A5D2FF
      width 100%
      height 54px
      text-align center
      .go_back
        position absolute
        top 20px
        left 15px
        width 30px
        height 30px
        .iconfont
          font-size 25px
          color #797979
      .message_name
        margin 0 auto
        width 200px
        transform translateY(25px)
        font-family "Arial"
        font-size 15px
        font-weight bold
        color #fff
    .adoptionBlogMessage-wrapper
      margin-top 54px
      height calc(100vh - 54px) !important
      .chat-main
        padding-left 17px
        padding-right 17px
        padding-top 30px
        display flex
        flex-direction column
        .chat-ls
          .message_time
            font-size 12px
            padding 10px 0
            color rgba(39,40,50,0.3)
            line-height 17px
            text-align center
            font-weight bold
          .msg-m
            display flex
            padding 10px 0
            .user-img
              width 40px
              height 40px
              border-radius 50%
            .message
              max-width 240px
              .msg-text
                font-size 16px
                line-height 22px
                padding 8px 12px
              .msg-img
                max-width 200px
                border-radius 10px
              .voice
                min-width 45px
                max-width 200px
                .voice-img
                   width 18px
              .msg-map
                background-color #fff
                width 230px
                height 142px
                overflow hidden
                .map-name
                  font-size 16px
                  line-height 22px
                  padding 9px 12px 0 12px
                  display -webkit-box
                  -webkit-box-orient vertical
                  -webkit-line-clamp 1
                  overflow hidden
                .map-address
                  display -webkit-box
                  -webkit-box-orient vertical
                  -webkit-line-clamp 1
                  overflow hidden
                  color rgba(39,40,50,0.4)
                  font-size 12px
                  padding 0 12px
                .map
                  margin-top 4px
                  width 230px
                  height 95px

          .msg-left
            flex-direction row
            .msg-text
              margin-left 8px
              background-color #eee
              border-radius 0 10px 10px 10px
            .msg-img
              margin-left 8px
            .msg-map
              margin-left 8px
              border-radius 0 10px 10px 10px
            .voice
              text-align right
              .voice-img
                float left
                padding-top 2px
          .msg-right
            flex-direction row-reverse
            .msg-text
              margin-right 8px
              border-radius 10px 0 10px 10px
              background-color #A5D2FF
            .msg-img
              margin-right 8px
            .msg-map
              margin-right 8px
              border-radius 10px 0 10px 10px
            .voice
              text-align left
              .voice-img
                float right
                transform rotate(180deg)
                padding-bottom 2px

</style>
