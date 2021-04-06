<template>
  <div>
    <div class="na-top">
      <a class="header-back" @click="goBack">
        <i class="iconfont icon-back"></i>
      </a>
      <div>最新发布</div>
    </div>
    <Scroll class="na-wrapper">
      <div>
        <AdoptionList :Lists="Lists" ref="list"/>
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
        Lists:[]
      }
    },
    mounted(){
      this.getAll()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      getAll() {
        let result;
        var promise = new Promise((resolve, reject) => {
          axios.get('articles/getAll')
            .then((res) => {
              if (res.data.status === '200') {
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
    },
    components:{
      Scroll,
      AdoptionList,

    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .na-top
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
  .na-wrapper
    margin-top 55px
    height calc(100vh - 55px) !important

</style>
