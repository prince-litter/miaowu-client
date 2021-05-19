<template>
  <div class="shop_container">

    <ul class="shop_lists">
      <li class="shop_list" v-for="item in storeList"
          @click="$router.push({path:'/medic_shop',query:{storeInfo:item.storeInfo,storeName:item.storeName,storeAddress:item.storeAddress}})">
        <div class="shop_left">
          <van-image  width="80"  lazy-load :src="'http://localhost:3000\\'+ item.storeImage"/>
        </div>
        <a href="javascript:;">
          <div class="shop_right">
            <a class="shop_title">
              <h2>{{item.storeName}}</h2>
            </a>
            <a class="shop_position">
              <i class="iconfont icon-position "></i>
              <span>{{item.storeAddress}}</span>
            </a>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Image as VanImage } from 'vant';
  import { Lazyload } from 'vant';

  Vue.use(Lazyload);
  Vue.use(VanImage);
  import axios from 'axios'
  export default {
    data (){
      return{
        storeList:[]
      }
    },
    mounted() {
      axios.get("/medic").then((response) => {
        let res = response.data;
        if(res.status === "200"){
          this.storeList = res.result.list
        }else {
          console.log('获取数据失败')

        }
      })
    },
    watch:{
      storeList:{
        handler () {
         this.$emit("reScroll",this.storeList)
        },
        immediate:true,
        deep:true
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shop_container
    margin-left 20px
    width 100%
    height 100%
    .shop_lists
      margin 0 auto
      width 375px
      height 100%
      .shop_list
        position relative
        top 23px
        left 23px
        height 83px
        width 300px
        background url("./images/big-rectangle.jpg") no-repeat center center
        text-align center
        margin-bottom 55px
        .shop_left
          position absolute
          top -23px
          left -23px
          z-index 1
        .shop_right
          width 100%
          position absolute
          top 50%
          left 50%
          transform translate(-50%,-50%)
          .shop_title h2
            font-size 20px
            color #fff
            font-family "Arial"
            font-weight bold
          .shop_position span
            color #fff
            font-size 10px
            font-family "Arial"
          .shop_position .icon-position
            color #fff



</style>
