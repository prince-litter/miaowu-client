<template>
  <div>
     <div class="ly-top">
        <a class="header-back" @click="goBack">
          <i class="iconfont icon-back"></i>
        </a>
        <div>领养专区</div>
      </div>
     <Scroll class="ly-wrapper">
       <div>
         <div id="ly-txt">— 宠物分类 —</div>
         <div class="ly-nav">
           <div class="nav-item" :class="{ Active:isActive}" @click="changeCat">
             <div>
               <img src="./images/miao.png" alt="">
             </div>
             <div class="nav-text">喵喵专区</div>
           </div>
           <div class="nav-item" :class="{ Active:!isActive}" @click="changeDog">
             <div>
               <img src="./images/wang.png" alt="">
             </div>
             <div class="nav-text">旺旺专区</div>
           </div>
         </div>
         <hr class="ly-hr">
         <AdoptionList :Lists="Lists"/>
       </div>
     </Scroll>
  </div>
</template>
<script>
  import Scroll from '../../components/Scroll/Scroll'
  import AdoptionList from '../../components/AdoptionList/AdoptionList'
  import axios from 'axios'
  export default {
    data(){
      return {
          isActive:true,
          Lists:[]
      }
    },
    mounted(){
      this.getCats()
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      getCats(){
        let result;
        var promise = new Promise((resolve, reject) => {
          axios.get('articles/getLyCat')
            .then((res) => {
              if(res.data.status === '200'){
                // console.log(res)
                result = res.data.result
                resolve()
              }
            })
        })
        promise.then(() => {
          this.Lists = result
        })

      },
      changeCat(){
        this.isActive = true
        this.getCats()
      },
      getDogs(){
        let result;
        let promise = new Promise((resolve, reject) => {
          axios.get('articles/getLyDog')
            .then((res) => {
              if(res.data.status === '200'){
                // console.log(res)
                result = res.data.result
                resolve()
              }
            })
        })
        promise.then(() => {
          this.Lists = result
        })

      },
      changeDog(){
        // console.log('hhah')
        this.isActive = false
        this.getDogs()
      }
    },
    components:{
      Scroll,
      AdoptionList,

    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .ly-top
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
  .ly-wrapper
    margin-top 55px
    height calc(100vh - 55px) !important
    #ly-txt
      color #A5D2FF
      text-align center
      font-size 18px
      padding-top 20px
    .ly-nav
      display flex
      justify-content space-around
      padding-top 15px
      .nav-item
        background-color #A5D2FF
        height 40px
        width 120px
        display flex
        align-items center
        border-radius 10px
        img
          width 40px
          vertical-align middle
          margin-left 5px
        .nav-text
          color white
      .Active
        background-color #FF8AA2
    .ly-hr
      margin-top 20px
      border none
      background-color #A5D2FF
      height 1px
</style>
