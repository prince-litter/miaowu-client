<template>
  <div class="adoption_shop_container">
    <ul class="adoption_shop_list">
      <li class="adoption_shop_li" v-for="(item1,index) in data" :key="item1.id">
        <a href="javascript:;">
          <div class="adoption_shop_box">
            <div class="ad-over" v-show="item1.state === 1 ? true : false">
              <img src="./images/over1.png" alt="">
            </div>
            <section class="adoption_shop_user_header">
              <ul>
                <div @click="$router.push({path:'/adoption_shop_blog',query:{name:item1.name,imgUrl:item1.imgUrl,userId:item1.userId}})">
                  <li class="ad-img">
                    <img :src="'http://localhost:3000\\' + item1.imgUrl" alt="">
                  </li>
                  <li class="adoption_user_name">{{item1.name}}</li>
                  <li class="adoption_vip_icon"><img src="./images/vip.png" alt=""></li>
                </div>
                <li v-if="attentionList.includes(item1.userId)" class="adoption_focus" @click="focus(item1.userId)">
                  <div>取消关注</div>
                </li>
                <li v-else class="adoption_focus" @click="focus(item1.userId)">
                  <div>关注</div>
                </li>
              </ul>
            </section>
            <section class="adoption_shop_pet_content">
              <p class="adoption_pet_msg">{{item1.tex}}</p>
<!--              <img class="adoption_pet_img" src="./images/active-img1.jpg" alt="">-->
              <div class="list-img" style="overflow: hidden">
                <div v-if="item1.imgArr.length == 1">
                  <div v-for="(item2,index2) in item1.imgArr" class="img1">
                    <van-image fit="cover" width="200" height="200" :src="'http://localhost:3000\\' + item2" @click.stop="look(item1.imgArr,index2)" />
                  </div>
                </div>
                <div v-else-if="item1.imgArr.length ==2 || item1.imgArr.length ==4">
                  <div v-for="(item2,index2) in item1.imgArr" class="img2">
                    <van-image  fit="cover"  width="120" height="120" :src="'http://localhost:3000\\' + item2" @click.stop="look(item1.imgArr,index2)" />
                  </div>
                </div>
                <div v-else>
                  <div v-for="(item2,index2) in item1.imgArr" class="img">
                    <van-image  fit="cover"  width="100%" height="100" :src="'http://localhost:3000\\' + item2" @click.stop="look(item1.imgArr,index2)" />
                  </div>
                </div>
              </div>
              <ul class="ad-bottom">
                <li>
                  <van-icon size="20"  name="comment-o" @click="pinglun(item.id)" />
                  <span>10</span>
                </li>
                <li>
                  <van-icon size="20" v-if="praiseList.includes(item1.id)" name="good-job" color="#FF8AA2" @click="dianzhan(item1.id,item1.userId)"/>
                  <van-icon size="20" v-else name="good-job-o"  @click="dianzhan(item1.id,item1.userId)"/>
                  <span>{{item1.num ? item1.num : 0}}</span>
                </li>
                <li>
                  <!--                      <i class="iconfont icon-praise"></i>-->
                  <van-icon size="20" v-if="collectionList.includes(item1.id)" name="like" color="#FF8AA2" @click="shouchang(item1.id)"/>
                  <van-icon size="20" v-else name="like-o" color="#000000" @click="shouchang(item1.id)"/>
                  <span>{{item1.cnum ? item1.cnum : 0 }}</span>
                </li>
              </ul>
            </section>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue';
  import {
    Swipe,
    SwipeItem,
    Lazyload,
    PullRefresh,
    List,
    Cell,
    ImagePreview,
    Icon,
    Image as VanImage,
    Grid,
    GridItem
  } from 'vant';
  Vue.use(VanImage);
  Vue.use(ImagePreview);
  export default {
    props:{
      Lists:Array
    },
    created(){
      this.getlist()
    },
    mounted(){
     this.getlist()
      this.getPraise()
      this.getCollection()
      this.getAttention()

    },
    data(){
      return{
        count:1,
        is:false,
        isover:false,
        data:[],
        praiseList:[],
        collectionList:[],
        attentionList:[],
        img:[
          {url:'../../../static/active-img1.jpg'},
          // {url:'../../../static/active-img1.jpg'},
          // {url:'../../../static/active-img1.jpg'},
          // {url:'../../../static/active-img1.jpg'},
          // {url:'../../../static/active-img1.jpg'},
          // {url:'../../../static/active-img1.jpg'},


          ]
      }
    },
    watch:{
      Lists:{
        handler(n){
          // console.log(n)
          //
          // this.data = JSON.parse(JSON.stringify(n))
          this.getlist()
        },
        deep:true
      }

    },
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload,
      [PullRefresh.name]: PullRefresh,
      [List.name]: List,
      [Cell.name]: Cell,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [ImagePreview.name]: ImagePreview,
      [Icon.name]: Icon,
      [VanImage.name]: VanImage,
    },
    methods:{
      //关注
      focus(focusedId){
        let id = localStorage.getItem('userId')
        axios.post('users/isAttention',{
          id:id,
          focusedId:focusedId,
        })
          .then((res) => {
            if(res.data.status === '200'){
              this.getAttention()
            }
          })
      },
      //收藏
      shouchang(articleId){
        let id = localStorage.getItem('userId')
        axios.post('articles/isCollect',{
          id:id,
          articleId:articleId,
        })
          .then((res) => {
            if(res.data.status === '200'){
              // console.log(res)
              this.getCollectionNum()
              this.getCollection()
            }
          })
      },
      //点赞
      dianzhan(articleId,authorId){
        let id = localStorage.getItem('userId')
        axios.post('articles/isPraise',{
          id:id,
          articleId:articleId,
          authorId:authorId
        })
          .then((res) => {
            if(res.data.status === '200'){
              // console.log(res)
              this.getPraiseNum()
              this.getPraise()
            }
          })
      },
      //获取点赞列表
      getPraise(){
        let id = localStorage.getItem('userId')
        axios.post('articles/getPraise',{
          id:id,
        })
          .then((res) => {
            if(res.data.status === '200'){
              // console.log(res.data.result)
              let praiseList = []
            res.data.result.forEach(item => {
              praiseList.push(item.articleId)
            })
              this.praiseList = praiseList
              //console.log()
            }
          })
      },
      //获取收藏列表
      getCollection(){
        let id = localStorage.getItem('userId')
        axios.post('articles/getCollection',{
          id:id,
        })
          .then((res) => {
            if(res.data.status === '200'){
              // console.log(res.data.result)
              let collectionList = []
              res.data.result.forEach(item => {
                collectionList.push(item.articleId)
              })
              this.collectionList = collectionList
              //console.log()
            }
          })
      },
      //获取关注列表
      getAttention(){
        let id = localStorage.getItem('userId')
        axios.post('users/getAttention',{
          id:id,
        })
          .then((res) => {
            if(res.data.status === '200'){
              // console.log(res.data.result)
              let attentionList = []
              res.data.result.forEach(item => {
                attentionList.push(item.focusedId)
              })
              this.attentionList = attentionList
              // console.log(this.attentionList)
            }
          })
      },
      //获取文章点赞数量
      getPraiseNum(){
        this.data.forEach(item => {
          let id = item.id
          axios.post('articles/num',{
            id:id,
          })
            .then((res) => {
              if(res.data.status === '200'){
                // console.log(res.data.result)
               this.$set(item,'num',res.data.result)
                // item.num = res.data.result
              }
            })
        })

      },
      //获取文章收藏数量
      getCollectionNum(){
        this.data.forEach(item => {
          let id = item.id
          axios.post('articles/cNum',{
            id:id,
          })
            .then((res) => {
              if(res.data.status === '200'){
                // console.log(res.data.result)
                this.$set(item,'cnum',res.data.result)
                // item.num = res.data.result
              }
            })
        })

      },
      goDetail(){
        this.$router.push('/adoption_shop')
      },
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
      getlist(){
        this.data = JSON.parse(JSON.stringify(this.Lists))
        this.getPraiseNum()
        this.getCollectionNum()
        // console.log(this.data)
      },

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .adoption_shop_container
    margin-top 10px
    .adoption_shop_list
      margin-bottom 20px
      background-color rgba(230,230,230,0.5)
      .adoption_shop_li
        width 100%
        background-color #fff
        .adoption_shop_box
          width 100%
          padding 10px 0 10px 0
          margin-bottom 5px
          position relative
          .ad-over
            position absolute
            z-index 99
            top 50%
            left 50%
            transform translate(-50%,-50%)
          .adoption_shop_user_header
            ul
              margin-left 20px
              position relative
              li
                display inline-block
                text-align center
                vertical-align middle
                &.ad-img
                  img
                    width 50px
                    height 50px
                    border-radius 50%
                &.adoption_user_name
                  font-size 20px
                  font-weight bold
                  color #7F7F7F
                  margin-left 10px
                &.adoption_vip_icon
                  margin-left 5px
                  margin-top 5px
                &.adoption_focus
                  position absolute
                  right 20px
                  bottom 0
                  div
                    background-color #FF8AA2
                    font-size 14px
                    color #fff
                    height 23px
                    width 80px
                    border-radius 15px
                    line-height 23px
          .adoption_shop_pet_content
            padding 0 15px
            .adoption_pet_msg
              font-size 14px
              font-family "Arial"
              font-weight bold
              margin 10px 0 5px 0
              color #7F7F7F
              line-height 17px
            ul
              background-color #fff
              margin-top 10px
              display flex
              justify-content space-around
              vertical-align center
              li
                display flex
                margin-right 20px
                vertical-align center
                line-height 20px
                span
                 margin-left 10px


  .img {
    float: left;
    width: 31%;
    height: 100px;
    margin: 3px;
  }

  .img1 {
    float: left;
    width: 200px;
    height: 200px;
    margin: 2px;
  }

  .img2 {
    float: left;
    width: 120px;
    height: 120px;
    margin: 2px;
  }
</style>
