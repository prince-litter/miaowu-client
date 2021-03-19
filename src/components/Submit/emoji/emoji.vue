<template>
  <div class="emojicom" :style="{height:height + 'px'}">
    <div class="emoji-line" v-for="(line,i) in emoji" :key="i">
      <div class="emoji-line-item" v-for="(item,index) in line" :key="index" @click="handleEmoji(item)">{{item}}</div>
    </div>

  </div>
</template>
<script>
  export default {
    props:{
      height:{
        type:Number,
        default:260
      }
    },
    data(){
      return{
        emoji:[
          ['😉','😁','😂','🤣','😃','😄','😅'],
          ['😉','😊','😋','😎','😍','😘','😗'],
          ['😚','🤢','🙂','🤗','🤔','😐','😑'],
          ['🙄','😏','😣','😥','😮','🤐','😯'],
          ['😫','😴','😌','😛','😜','😝','🤤'],
          ['😓','😔','😕','🙃','🤑','😲','😇'],
          ['😖','😞','😤','😢','😭','😦','😧'],
          ['😱','😳','😵','😡','😠','😷','🤒'],
          ['😆','😙','😶','😪','🙁','😨','🤕'],
          ['🤠','🤡','🤥','🤓','😈','👹','👺'],
          ['💀','👻','👽','💩','😺','👫','👂'],
          ['🕶','👣','👀','👁','👅','💋','👓'],
          ['👔','👕','👖','👗','👚','👙','👜'],
        ]
      }
    },
    methods:{
      //获取表情发送

      handleEmoji(e){
        this.$emit('emotion',e)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .emojicom
    width 100%
    padding 8px 5px 60px 0
    box-sizing border-box
    overflow hidden
    overflow-y auto
    .emoji-line
      display flex
      .emoji-line-item
        text-align center
        font-size 26px
        line-height 40px
        flex 1
</style>
