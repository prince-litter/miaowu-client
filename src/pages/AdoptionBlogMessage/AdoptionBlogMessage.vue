<template>
  <div class="adoptionBlogMessage">
      <div class="message_header">
        <a href="javascript:" class="go_back" @touchstart="$router.back(),{passive:false}">
          <i class="iconfont icon-back"></i>
        </a>
        <p class="message_name">哈狗来了</p>
      </div>
      <Scroll class="adoptionBlogMessage-wrapper" :scrollToEndFlag="true" ref="scroll">
        <div class="chat-main" :style="{paddingBottom:inputh}">
            <div class="chat-ls" v-for="(item,index) in msgs" :key="index">
              <div class="message_time" v-if="item.time !== ''">{{changeTime(item.time)}}</div>
              <div class="msg-m msg-left" v-if="item.id !== 'b'">
              <img class="user-img" :src="item.imgUrl" alt="">
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
                  <div class="map" :id="item.tip"></div>
                </div>

              </div>
            </div>
              <div class="msg-m msg-right" v-if="item.id == 'b'">
                <img class="user-img" :src="item.imgUrl" alt="">
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
                    <div class="map" :id="item.tip"></div>
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
  import Vue from 'vue';
  import { ImagePreview } from 'vant';

  // 全局注册
  Vue.use(ImagePreview);
  export default {
    data(){
      return{
        msgs:[],
        imgMsg:[],
        oldTime:new Date(),
        inputh:'54px',
        isPlay:false,
        nowpage:0 //页数
      }
    },
    components:{
      Scroll,
      Submit
    },
    mounted(){
      this.getMsg()
      setTimeout(() => {
        this.getmap()
      },50)


    },
    methods:{
      //创建地图
      getmap () {
        let info = this.msgs
        info.forEach(item =>{
          if(item.types === 3){
            let lat = item.message.latitude
            let lon = item.message.longitude
            // console.log(typeof lat)
            let map = new AMap.Map(`${item.tip}`, {
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
        console.log( this.isPlay)
        this.audio = new Audio()
        this.audio.src = e
        this.audio.play()
        // if(this.isPlay){
        //   this.audio.play()
        // }



      },
      //获取消息
      getMsg() {
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
      inputs(e){
        let len = this.msgs.length
        //处理时间间隔
        let nowTime = new Date();
        let t = myfun.spaceTime(this.oldTime,nowTime)
        if(t){
          this.oldTime = t
        }
        nowTime = t
        let data = {
          id:'b', //用户id
          imgUrl:'../../../static/images/head-2.jpg',
          message:e.message,
          types:e.types,                //内容类型（0文字，1图片连接，2音频连接）
          time: nowTime,  //发送时间
          tip:len
        }
        this.msgs.push(data)
        setTimeout(() => {
          this.$nextTick(() => {
            this.getmap()
            this.$refs.scroll.ScrollToEndFlag()
            this.$refs.submit.getElementHeight()
          })
        },50)
        if(e.types === 1 ){
          this.imgMsg.push(e.message)
        }

        console.log(e)
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
