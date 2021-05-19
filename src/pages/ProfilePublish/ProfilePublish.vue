<template>
  <div>

    <div class="profilePublish_header">
      <a href="javascript:;" @touchstart="$router.back()">
        <span class="cancel">取消</span>
      </a>

    </div>
    <div class="inputtxt">
      <textarea v-model="txt" class="txt" placeholder="分享你的新鲜事吧"></textarea>
    </div>
    <div class="inputimg">
      <van-uploader v-model="fileList" :after-read="afterRead" refs="uploadImg" max-count=9 multiple/>
    </div>
    <div class="botttom">
      <ul>
        <li>
          <div class="li">
            <div class="li-left">需求类型</div>
            <div class="li-right">
              <van-dropdown-menu active-color="#FF8AA2">
                <van-dropdown-item v-model="value1" :options="option1" class="item" />

              </van-dropdown-menu>
            </div>
          </div>
        </li>
        <li>
          <div class="li">
            <div class="li-left">分类</div>
            <div class="li-right">
              <van-dropdown-menu active-color="#FF8AA2">
                <van-dropdown-item v-model="value2" :options="option2" class="item" />
              </van-dropdown-menu>
            </div>
          </div>
        </li>
        <li>
          <div class="li-button">
            <button @click="send()">发表</button>
          </div>
        </li>
      </ul>
    </div>
  </div>


</template>

<script>
  // import list from "../components/list.vue"
  import axios from 'axios'

  import myfun from '../../common/js/myfun'
  import {
    Search,
    NavBar,
    Icon,
    DropdownMenu,
    DropdownItem,
    Toast
  } from 'vant';
  import {
    Uploader
  } from 'vant';
  export default {
    name: "add",
    components: {
      // list: list,
      [Uploader.name]: Uploader,
      [Search.name]: Search,
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
      [DropdownMenu.name]: DropdownMenu,
      [DropdownItem.name]: DropdownItem,
    },
    data() {
      return {
        uid:"",
        fileList: [],
        imgUrl:[],
        txt: "",
        value1: 0,
        value2:0,
        option1: [{
          text: '领养',
          value: 0
        },
          {
            text: '寄养',
            value: 1
          }
        ],
        option2: [{
          text: '喵喵',
          value: 0
        },
          {
            text: '汪汪',
            value: 1
          }
        ],

      }
    },
    created() {
      // console.log(this.lists.length)
      // this.shijian = new Date()
      // this.tim=this.shijian.getMonth()+1+"/"+this.shijian.getDate()+" "+this.shijian.getHours()+":"+this.shijian.getMinutes()
    },
    mounted(){
      this.uid = localStorage.getItem('userId')
    },
    methods: {
      afterRead(file) {

      },
      send() {
        // console.log(this.fileList)
        let list = []
            if(this.txt.length>0 && this.fileList.length > 0){
              let file = this.fileList
              if(file.length >0){
                var promise = new Promise((resolve, reject) => {
                  file.forEach((item,index) => {
                    let url =myfun.fileName(new Date())
                    let formData = new window.FormData();
                    let name = new Date().getTime() + this.uid+Math.ceil(Math.random()*10)+myfun.createUniqueId()
                    formData.append("name", name);
                    formData.append("url", url);
                    formData.append("file", item.file)
                    axios.post('/files/upload',formData)
                      .then(res =>{
                        if(res.data.status === '200'){
                          let url = res.data.result.path
                          list.push(url)
                          if(index === file.length -1 ){
                            resolve()
                          }
                        }
                      })
                  })
                })
                promise.then(()=>{
                  // console.log(list)
                  axios.post('/articles/add',{
                    id:this.uid,
                    txt:this.txt,
                    imgUrl:list,
                    type:this.value1,
                    classify:this.value2,
                    state:0
                  })
                    .then((res) =>{

                      if(res.data.status === '200'){
                        Toast('发布成功')
                        setTimeout(()=>{
                          this.$router.replace('/msite')
                        },2000)
                        console.log('添加成功')
                      }
                    })
                })


              }else {
                axios.post('/articles/add',{
                  id:this.uid,
                  txt:this.txt,
                  imgUrl:this.imgUrl,
                  type:this.value1,
                  classify:this.value2,
                  state:0
                })
                  .then((res) =>{
                    if(res.data.status === '200'){
                      Toast('发布成功')
                      setTimeout(()=>{
                        this.$router.replace('/msite')
                      },2000)
                      console.log('添加文案成功')
                    }
                  })
              }
            }else {
              Toast('文字或图片不能为空')
            }

      },

      onSearch() {

      },

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .profilePublish_header
    bottom-border-1px(#AAAAAA)
    width 100%
    height 60px
    background-color #A5D2FF
    .cancel
      position absolute
      color #fff
      font-family "Arial"
      font-weight bold
      font-size 17px
      left 26px
      top 25px

  .inputtxt
    width 90%
    margin 10px auto
    .txt
      height 100px
      width 100%
      word-break break-all
      border 0

  .inputimg
    margin: 5px 20px;
    .van-uploader__upload
      input
        width 100%
        margin 0
        height 100%
  .botttom
    .li
      width 95%
      height 50px
      margin 5px 10px
      .li-left
        width 30%
        float left
        line-height 30px
        color #A5D2FF
        font-size 16px
      .li-right
        width 30%
        float right
       .van-dropdown-menu
         .van-dropdown-menu__bar
           height 30px
           /*.van-ellipsis*/
           /* color #FF8AA2*/

    .li-button
      margin 50px auto
      width 70%

      button
        width 100%
        border 0
        background-color  #A5D2FF
        border-radius 20px
        height 40px
        color #fff


</style>
