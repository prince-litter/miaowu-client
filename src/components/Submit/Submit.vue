<template>
  <div>
     <div class="submit" ref="init">
       <div class="submit-chat">
         <div class="bt-img" @click="records">
           <img :src="toc" alt="">
         </div>
         <van-field
           v-model="msg"
           @input="inputs"
           @focus="focus"
           rows="1"
           :autosize="{ maxHeight: 100 }"
           type="textarea"
           class="chat-send btn"
           :border="false"
           :class="{displaynone:isrecord}"
         ></van-field>
         <van-field class="record btn"
                    @touchstart.prevent="handleStart"
                    @touchend.prevent = "handleEnd"
                    @touchmove.prevent = "handleMove"
                    :class="{displaynone:!isrecord}"
                    :center="true"
                    :border="false"
                    value="按住说话"
                    readonly
         ></van-field>
         <div class="bt-img" @click="emoji">
           <img src="./images/emotion.png" alt="">
         </div>
         <div class="bt-img last" @click="more">
           <img src="./images/add.png" alt="">
         </div>
       </div>
       <div class="emoji" :class="{displaynone:!isemoji}">
         <div class="emoji-send">
           <div class="emoji-send-det" @click="emojiBack">
             <img src="./images/det.png" alt="">
           </div>
           <div class="emoji-send-bt" @click="emojiSend">发送</div>
         </div>
         <Emoji @emotion="emotion" :height="230"/>
       </div>
       <div class="more" :class="{displaynone:!ismore}">
         <div class="more-list" @click="showAblum">
            <input ref="ablum" class="hide_file" type="file" accept="image/*;" @change="getAblum($event)"/>
            <img src="./images/photoes.png" alt="">
            <div class="more-list-title">图片</div>
          </div>
         <div class="more-list" @click="showCamera">
           <input ref="camera" class="hide_file" type="file" accept="image/*;" capture="camera" @change="getCamera($event)"/>
           <img src="./images/camera.png" alt="">
           <div class="more-list-title">拍照</div>
         </div>
         <div class="more-list" @click="getLocation">
           <img class="po" src="./images/position.png" alt="">
           <div class="more-list-title">定位</div>
         </div>
         <div class="more-list">
           <img class="sp" src="./images/camcorder.png" alt="">
           <div class="more-list-title">视频</div>
         </div>
         <div class="more-list">
           <img src="./images/photoes.png" alt="">
           <div class="more-list-title">文件</div>
         </div>
       </div>


     </div>
     <div class="voice-bg" v-show="voicebg">
       <div class="voice-bg-len">
         <div class="voice-bg-time" :style="{width:vlength/0.6+'%'}">{{vlength}}〞</div>
       </div>
       <div class="voice-del">上划取消录音</div>
     </div>
     <Map v-show="isGps" ref="gps" :isGps="isGps" @position="position" @addr="addr"/>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Field,Toast } from 'vant';
  import  Emoji from './emoji/emoji';
  import  Map from '../../components/Map/Map';
  import Recorder from 'js-audio-recorder';
  import axios from 'axios'


  let recorder = new Recorder();
  Vue.use(Field);
  export default {
    data(){
      return{
          msg:'',
          isrecord:false,
          toc:"../../../static/images/voice.png",
          isemoji:false,
          ismore:false,
          timer:'',//计时器
          vlength:0,//音频时长
          voicebg:false,
          pageY:'',
          isGps:false,
          address:'',
          id:'abcdfeg'

      }
    },
    components:{
      Emoji,
      Map
    },
    methods:{
      //触发input的上传事件
      showAblum(){
        console.log('ablum',this.$refs.ablum.click())
        this.$refs.ablum.click()
      },
      showCamera(){
        console.log('camera',this.$refs.camera.click())
        this.$refs.camera.click()
      },
      //获取相册图片
      getAblum (e) {
        let file = e.target.files[0];
        if (window.FileReader) {
          let reader = new FileReader();
          if(file){
            reader.readAsDataURL(file);
            //监听文件读取结束后事件
            reader.onloadend = (e) => {
              //e.target.result就是最后的路径地址
              // console.log(e.target.result)

              this.send(e.target.result,1)
            }
            let formData = new window.FormData();
            //加入文件对象,向接口传入两个参数file,id
            let name = new Date().getTime() + this.id
            formData.append("name", name);
            formData.append("url", 'user');
            formData.append("file", file);
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            axios.post('/files/upload',formData)
              .then(res =>{
              console.log(res)
            })
          }
        }
        console.log(file)

      },
      //获取拍照图片
      getCamera(e){
        this.getAblum(e)
      },
      //获取模块高度
      getElementHeight(){
        // let height= this.$refs.init.$el.offsetHeight;
        let height=window.getComputedStyle(this.$refs.init).height
        this.$emit('heights',height)
      },
      //切换音频
      records(){
        this.isemoji = false
        this.ismore = false
        setTimeout(()=>{
          this.getElementHeight()
        },0)
        if(this.isrecord){
          this.isrecord = false
          this.toc = "../../../static/images/voice.png"
        }else{
          this.isrecord = true
          this.toc = "../../../static/images/recording.png"

        }
      },
      //切换表情
      emoji(){
        this.isemoji = !this.isemoji
        //关闭其他项
        this.isrecord = false
        this.ismore = false
        this.toc = "../../../static/images/voice.png"
       setTimeout(()=>{
          this.getElementHeight()
        },0)

      },
      //更多功能
      more (){
        this.ismore = !this.ismore
        //关闭其他项
        this.isrecord = false
        this.isemoji = false
        this.toc = "../../../static/images/voice.png"
        setTimeout(()=>{
          this.getElementHeight()
        },0)
      },
      //文字发送
      inputs(value){
        let chatm = value
        let pos = chatm.indexOf('\n')
        if(pos !== -1 && chatm.length>1){
          this.send(this.msg,0)

        }
      },
      //表情内发送
      emojiSend(){
        if(this.msg.length>0){
          this.send(this.msg,0)
        }
      },
      //表情内退格
      emojiBack(){
        if(this.msg.length>0){
          this.msg = this.msg.substring(0,this.msg.length-2)
        }
      },
      //input聚焦
      focus(){
        this.isemoji = false
        this.ismore = false
        setTimeout(()=>{
          this.getElementHeight()
        },0)
      },
      //接收表情
      emotion(e){
        this.msg = this.msg + e
      },
      //发送
      send (msg,type){
        let data = {
          message:msg,
          types:type
        }
        this.$emit('inputs',data)
        setTimeout(()=>{
          this.msg = ''
        },0)
      },
      //音频处理
      //手指按下
      handleStart(e){
        console.log('开始')
        //点击时y轴位置
        this.pageY = e.changedTouches[0].pageY
        this.voicebg = true
        let i = 1
        this.timer = setInterval(() => {
          this.vlength = i
          i++

          if(i>60){
            clearInterval(this.timer)
            this.handleEnd()
          }
        },1000)
        this.getPermission()
        recorder.start()

      },
      //获取权限
      getPermission(){
        Recorder.getPermission()
      },
      //手指释放
      handleEnd(){
        // console.log('结束')
        clearInterval(this.timer)
        recorder.stop()
        let res = recorder.getWAVBlob()
        //获取文件的url地址
        let objectURL = URL.createObjectURL(res);
        // console.log('objectURL',objectURL)
        let data = {
          voice : objectURL,
          time : this.vlength
        }
        if(this.voicebg){
          this.send(data,2)
        }
        this.vlength = 0
        this.voicebg = false
      },
      //终止录音
      handleMove(e){
        if(this.pageY - e.changedTouches[0].pageY >100 ){
          this.voicebg = false
        }

      },
     // 获取地图定位
      getLocation() {
        this.isGps = true
        this.$refs.gps.initMap(container)
      },
      position(val){
        this.isGps = val
      },
      addr(val){
        this.position()
        this.send(val,3)
      }

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .submit
    background-color rgba(244,244,244,1)
    top-border-1px(#AAAAAA)
    width 100%
    position fixed
    bottom 0
    z-index 101
    /*padding-bottom 10px*/
    .displaynone
      display none
    .submit-chat
      width 100%
      display flex
      align-items flex-end
      box-sizing border-box
      padding 10px 10px
      .bt-img
        img
          width 30px
          flex auto
      .last
        margin-left 5px
      .btn
        flex auto
        background-color #fff
        border-radius 5px
        padding 6px
        margin 0 5px
      .record
        user-select none;

        .van-field__control
          text-align center !important
          color rgba(39,40,50,0.6)
    .emoji
      width 100%
      height 230px
      background-color rgba(236,237,238,1)
      box-shadow 0 -1px 0 0px rgba(0,0,0,0.1)
      .emoji-send
        margin-right 5px
        width 140px
        height 52px
        padding-top 12px
        background-color rgba(236,237,238,0.8)
        position fixed
        bottom 0
        right 0
        display flex
        .emoji-send-bt
          flex 1
          margin 0 16px 0 10px
          height 40px
          background #A5D2FF
          font-size 16px
          text-align center
          line-height 40px
          border-radius 6px
        .emoji-send-det
          flex 1
          margin-left 12px
          height 32px
          background #fff
          font-size 16px
          text-align center
          border-radius 6px
          padding-top 8px
          img
            width 23px




    .more
      width 100%
      height 180px
      background-color rgba(236,237,238,1)
      box-shadow 0 -1px 0 0px rgba(0,0,0,0.1)
      padding 6px 10px
      box-sizing border-box
      .more-list
        width 25%
        text-align center
        float left
        padding-top 16px
        .hide_file
          display none
        img
          width 22px
          padding 14px 12px
          border-radius 12px
          background-color rgba(255,255,255,1)
         .po
           padding 11.745px 12px
          .sp
            padding 15.03px 12px
        .more-list-title
          font-size 12px
          color rgba(39,40,50,0.5)
          line-height 17px
  .voice-bg
    height 100%
    width 100%
    background-color rgba(0,0,0,0.3)
    position fixed
    top 0
    bottom 0
    z-index 100
    .voice-bg-len
      height 42px
      width 300px
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      margin auto
      background-color rgba(255,255,255,0.2)
      border-radius 21px
      text-align center
      .voice-bg-time
        display inline-block
        min-width 60px
        line-height 42px
        background-color #A5D2FF
        border-radius 21px
    .voice-del
      position absolute
      bottom 70px
      width 100%
      text-align center
      color #fff
      font-size 14px
</style>
