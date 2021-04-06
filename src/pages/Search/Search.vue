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
        <div class="search-item" v-for="(item,index) in userArr" :key="index" @click="goChat(item)">
          <div class="head-img">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="search-right">
            <div class="search-nickname" v-html="item.userName"></div>
            <div class="search-send">发消息</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import datas from '../../common/js/datas'
  import myfun from '../../common/js/myfun'
  import axios from 'axios'
  import {Toast} from 'vant'
  export default {
    data(){
      return{
        value:'',
        userArr:[],
        userName:''
      }
    },
    mounted(){
      this.userName = localStorage.getItem('userName')
    },
    methods: {
      //跳转到聊天界面
      goChat(data){
        let strName = data.userName
        let arr = strName.split('>')
        let arr1 = arr[1].split('<')
        let name = arr1[0] + arr[arr.length-1]
        let uid = localStorage.getItem('userId')
        this.$router.push({path:'/adoption_blog_message',query:{id:data.id,name:name,img:data.imgUrl}})
        axios.post('users/relative',{
          id:uid,
          friendId:data.id
        }).then((res) => {
            if(res.data.status === '200'){
              console.log('关系建立成功')
            }else {
              console.log('关系建立失败')
            }
        })
      },
      //获取关键字
      onSearch:myfun.debounce(function (val) {
        this.userArr = []
        let searchVal = val
        if(searchVal.length>0){
          this.searchUser(searchVal)
        }
      },500),
      // onSearch1(val) {
      //   this.userArr = []
      //   let searchVal = val
      //   if(searchVal.length>0){
      //     this.searchUser(searchVal)
      //   }
      // },
      //寻找关键词匹配的用户
      searchUser(val) {
        let token = localStorage.getItem('token')
        axios.post('users/search',{
          userName:val,
          token:token
        }).then( (res) => {
           console.log(res.data)
           if(res.data.status === '200'){
             let arr = res.data.result
             let exp = eval("/"+ val + "/g")
             arr.forEach(item =>{
               if(item.userName === this.userName){
                 return
               }
               if(item.userName.search(val) !== -1){
                  item.imgUrl = 'http://localhost:3000\\' + item.imgUrl
                  item.userName = item.userName.replace(exp,"<span style='color:#A5D2FF;font-weight:bold;'>" + val + "</span>")
                  item.id = item._id
                 this.userArr.push(item)
               }
             })
             //console.log(this.userArr)
           }else if(res.data.status === '300'){
             Toast('登录过期请重新登录')
             setTimeout(()=>{
               this.$router.replace({path:'login',query:{userName:this.userName}})
             },1000)
           }else {
              console.log('系统出现错误')
           }
        })

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
