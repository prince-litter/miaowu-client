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
            </div>
              <div class="msg-m msg-right" v-if="item.id == 'b'">
                <img class="user-img" :src="item.imgUrl" alt="">
                <div class="message" v-if="item.types === 0">
                  <div class="msg-text">{{item.message}}</div>
                </div>
                <div class="message" v-if="item.types === 1">
                  <img :src="item.message" class="msg-img" @click="imagePreview(item.message)" alt="">
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
      <Submit @inputs = "inputs" @heights="heights"/>

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
        inputh:'54px'
      }
    },
    components:{
      Scroll,
      Submit
    },
    mounted(){
      this.getMsg()

    },
    methods:{
      imagePreview(currentImg){
        let current = null
        this.imgMsg.forEach((item,index) => {
          if(item === currentImg){
            current = index
          }
        })
        ImagePreview({images:this.imgMsg,startPosition:current,closeable: true, });
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
        let data = {
          id:'b', //用户id
          imgUrl:'../../../static/images/head-2.jpg',
          message:e.message,
          types:e.types,                //内容类型（0文字，1图片连接，2音频连接）
          time: new Date(),  //发送时间
          tip:len
        }
        this.msgs.push(data)
        this.$nextTick(() => {
          this.$refs.scroll.ScrollToEndFlag();
        })
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
          .msg-left
            flex-direction row
            .msg-text
              margin-left 8px
              background-color #eee
              border-radius 0 10px 10px 10px
            .msg-img
              margin-left 8px
          .msg-right
            flex-direction row-reverse
            .msg-text
              margin-right 8px
              border-radius 10px 0 10px 10px
              background-color #A5D2FF
            .msg-img
              margin-right 8px


</style>
