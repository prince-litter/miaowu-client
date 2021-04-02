<template>
  <div>
    <div class="blog_dynamic">
      <div class="blog-year">
        2021年
      </div>
      <div class="art-container"  v-for="(item1,index1) in data">
        <slot name="state"></slot>
        <section class="left">
          <div class="day">{{formatDay(item1.time)}}</div>
          <div class="month">{{new Date(item1.time).getMonth() + 1}}月</div>
        </section>
        <section class="middle">
          <div class="list-img" style="overflow: hidden;height: 80px;width: 82px">
            <div v-if="item1.imgArr.length == 1">
              <div v-for="(item2,index2) in item1.imgArr" class="blog-img1">
                <van-image fit="cover" width="80" height="80" :src="'http://localhost:3000\\'+ item2" @click.stop="look(item1.imgArr,index2)" />
              </div>
            </div>
            <div  v-if="item1.imgArr.length == 2">
              <div v-for="(item2,index2) in item1.imgArr" class="blog-img3">
                <van-image  fit="cover"  width="40" height="80" :src="'http://localhost:3000\\' + item2" @click.stop="look(item1.imgArr,index2)" />
              </div>
            </div>
            <div  v-if="item1.imgArr.length == 3">
              <div class="blog-img4">
                <van-image  fit="cover"  width="40" height="80" :src="'http://localhost:3000\\' + item1.imgArr[0]" @click.stop="look(item1.imgArr,0)" />

                <van-image  fit="cover"  width="40" height="40" :src="'http://localhost:3000\\' + item1.imgArr[1]" @click.stop="look(item1.imgArr,1)" />
                <van-image  fit="cover"  width="40" height="40" :src="'http://localhost:3000\\' + item1.imgArr[2]" @click.stop="look(item1.imgArr,2)" />

              </div>
            </div>
            <div  v-else>
              <div v-for="(item2,index2) in item1.imgArr" class="blog-img2">
                <van-image  fit="cover"  width="40" height="40" :src="'http://localhost:3000\\' + item2" @click.stop="look(item1.imgArr,index2)" />
              </div>
            </div>
          </div>
        </section>
        <section class="right">
          <div class="right-text">{{item1.tex}}</div>
          <div class="right-bottom">共{{item1.imgArr.length}}张</div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  import myfun from '../../common/js/myfun'
  import axios from 'axios'
  import Vue from 'vue';
  import {
    ImagePreview,
    Image as VanImage
  } from 'vant';
  Vue.use(VanImage);
  Vue.use(ImagePreview);
  export default {
    props:{
      list:Array
    },
    data(){
      return{
        data:[]
      }
    },
    watch:{
      list:{
        handler(n){
          // console.log(n)
          this.data = JSON.parse(JSON.stringify(n))
        },
        deep:true
      }

    },
    mounted(){
      this.getlist()
    },
    methods:{
      look(url,index2) {
        let arr = []
        url.forEach(item => {
          item = 'http://localhost:3000\\' + item
          arr.push(item)
        })
        ImagePreview({
          images:arr,
          closeable: true,
          startPosition: index2,
        })
      },
      //处理日期
      formatDay(date){
        return myfun.detailday(date)
      },
      getlist(){
        this.data = JSON.parse(JSON.stringify(this.list))
        // console.log(this.data)
      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .blog_dynamic
    height 400px
    padding 0 20px
    .blog-year
      font-size 25px
      color white
      margin-bottom 30px
    .art-container
      display flex
      height 80px
      overflow hidden
      margin-bottom 30px
      .left
        display flex
        /*color #fff*/
        .day
          font-size 22px
        .month
          font-size 14px
          margin 0 2px
          padding-top 5px
          width 25px
      .middle
        margin-left 20px
        .blog-img1
          float left
          height 80px
        .blog-img3
          float left
          width 50%
          overflow hidden
          .van-image
            margin-left 1px
        .blog-img4
          width 82
          overflow hidden
          .van-image
            float left
            margin-left 1px
            margin-bottom 1px
            outline-width 0
            vertical-align top
        .blog-img2
          float left
          width 50%
          height 50%
          overflow hidden
          .van-image
            margin-left 1px
            margin-bottom 1px
            outline-width 0
            vertical-align top
      .right
        margin-left 15px
        display flex
        flex-direction column
        justify-content space-between
        .right-text
          font-size 14px
          line-height 15px
          text-overflow -o-ellipsis-lastline
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 4
          -webkit-box-orient vertical
        .right-bottom
          font-size 12px
          color #7e8c8d

</style>
