<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 50
      },
      // 控制开关滚动到底部
      scrollToEndFlag: {
        type: Boolean,
        default: false
      }
    },
    mounted() {

      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this.$nextTick(() => {
          if(!this.scroll){
            this._initScroll()
          }else {
            this.scroll.refresh()
          }

        })
      }, 100)
      setTimeout(() =>{
        if(this.scrollToEndFlag){
          this.$nextTick(() => {
            this.ScrollToEndFlag()
          })
        }
      },200)

      // this.ScrollToEndFlag()

    },
    methods: {
      //滚动到底部
      ScrollToEndFlag () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        })
        if ( this.scrollToEndFlag ) {
          /* this.scroll: 为 better-scroll 的实例 */
          this.scroll.scrollTo(0, this.scroll.maxScrollY)
          this.$emit('scrollToEnd')
        }

      },
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: this.click,
            scrollX: this.scrollX
          })
        }
        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        if ( this.scrollToEndFlag ) {
          /* this.scroll: 为 better-scroll 的实例 */
          this.scroll.scrollTo(0, this.scroll.maxScrollY)
          this.$emit('scrollToEnd')
        }


        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },

      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data:{
        handler () {
            setTimeout(() => {
              this.refresh()
            }, this.refreshDelay)
          },
        immediate:true,
        deep:true
      }

    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
.wrapper
  height calc(100vh - 135px)
  overflow hidden
  touch-action none
</style>
