<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @input="onSearch"
      @cancel="onCancel"
      :autofocus="true"
    ></van-search>
    <div class="search-wrapper">
      <div class="search-list">
        <div class="user" v-if="userArr.length>0">用户</div>
        <div class="search-item" v-for="(item,index) in userArr" :key="index">
          <div class="head-img">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="search-right">
            <div class="search-nickname" v-html="item.name"></div>
            <div class="search-send">发消息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import datas from '../../common/js/datas'
  export default {
    data(){
      return{
        value:'',
        userArr:[]
      }
    },
    mounted(){

    },
    methods: {
      onSearch(val) {
        this.userArr = []
        let searchVal = val
        if(searchVal.length>0){
          this.searchUser(searchVal)
        }
      },
      searchUser(val) {
        let arr = datas.friends()
        let exp = eval("/"+ val + "/g")
        arr.forEach(item =>{
          if(item.name.search(val) !== -1){
             item.imgUrl = '../../../static/images/' + item.imgUrl
             item.name = item.name.replace(exp,"<span style='color:#A5D2FF;font-weight:bold;'>" + val + "</span>")
             this.userArr.push(item)
          }
        })
        //console.log(this.userArr)
      },
      onCancel() {
        this.$router.back()
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .search-list
    top-border-1px(#e4e4e4)
    .user
      font-weight bold
      padding 15px 0 5px 10px
      font-size 18px
    .search-item
      padding 8px 10px
      display flex
      align-items center
      &:active
        background-color #eeeeee
      .head-img
        margin-right 20px
        img
          width 40px
          height 40px
          border-radius 50%
      .search-right
        flex 1
        display flex
        justify-content space-between
        .search-nickname
          font-weight bold
          font-size 15px
          font-family Arial
          /*color #A5D2FF*/
        .search-send
          padding 4px 8px
          background-color #FF8AA2
          color #fff
          font-size 12px
          border-radius 15px
          /*font-weight bold*/
</style>
