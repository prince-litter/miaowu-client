<template>
	<div class="bg">
    <div class="na-top">
      <a class="header-back" @click="goBack">
        <i class="iconfont icon-back"></i>
      </a>
      <div>资料设置</div>
    </div>
		<div class="avator">
			<div class="upload">
				<van-uploader :after-read="afterRead">
					<img class="icon" :src="'http://localhost:3000\\' + head" />
					<div class="genghuan">点击更换头像</div>
				</van-uploader>

			</div>

		</div>
		<van-cell-group>
			<van-cell title="用户名" value="" is-link :label="covername" @click='showname = true' />
			<van-popup v-model="showname" :style="{ width:'90%' }" closeable round>
				<div class="buttom">
					<p>请输入新用户名</p>
					<br />
					<input type="text" class="insert" name="text" v-model="covername" />

					<button class="send" @click="changename">确定</button>

				</div>
			</van-popup>


			<van-cell title="修改密码" value="去修改 " is-link label="" @click='showmima = true' />
			<van-popup v-model="showmima" :style="{ width:'90%'}" click-overlay="qingkong" closeable round>
				<div class="buttom1">
					<br />
					<p>旧密码</p>
					<input type="password" class="insert" name="text" v-model="oldpass" />
					<p>新密码</p>
					<input type="password" class="insert" name="text" v-model="newpass" />
					<p>确认新密码</p>
					<input type="password" class="insert" name="text" v-model="newpass1" />
					<button class="send" @click='changemima'>确定</button>
				</div>
			</van-popup>
		</van-cell-group>
<!--    <div class="list">-->
<!--      <div>-->
<!--        <button class="queren" @click="queding">确认修改</button>-->
<!--      </div>-->
<!--      <br />-->
<!--    </div>-->
	</div>

</template>

<script>
	import {
		NavBar,
		Uploader,
		Cell,
		CellGroup,
		Popup,
		Icon,
		ActionSheet,
		Toast
	} from 'vant';
  import axios from 'axios'
  import myfun from '../../common/js/myfun'

	export default {
		name: "change",
		components: {
			[NavBar.name]: NavBar,
			[Uploader.name]: Uploader,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Popup.name]: Popup,
			[Icon.name]: Icon,
			[ActionSheet.name]: ActionSheet,
		},
		data() {
			return {
				oldpass: '',
				newpass: '',
				newpass1: '',
        covername: '',
				passworld: '',
				id: 0,
		    head:localStorage.getItem('imgUrl'),
				showname: false,
				showmima: false,

			}
		},

		created() {
			this.covername = localStorage.getItem('userName')
			this.newpass = this.passworld
			this.id = localStorage.getItem('userId')


		},
		methods: {

			changename() {
        this.changeData(this.covername,'userName')
        localStorage.setItem('userName',this.covername)
			},
			changepass() {
				this.showmima = true
			},
			changemima() {

        if(!this.oldpass || !this.newpass || !this.newpass1){
          Toast('密码不能为空')
          return
        }
        if(this.newpass !== this.newpass1){
          Toast('密码不一致')
          return
        }
        let id = localStorage.getItem('userId')
        axios.post('/users/update',{
          id:id,
          userPwd:this.oldpass,
          data:this.newpass1,
          type:'userPwd'
        })
          .then(res => {
            if(res.data.status === '200'){
              console.log('修改成功')
              this.showmima = false
            }
            if(res.data.status === '400'){
              Toast('原密码错误')
            }
          })

			},
			queding(){
				var that = this;
				that.$http.post("/users/change",{
					id:that.id,
					passworld:that.newpass,
					schoolname:that.schoolname,
					icon:that.icon,
					covername:that.covername,
					schoolid:that.schoolid,
					txt:that.txt,
					sex:that.sex
				}).then(data=>{
					console.log(data.data.data)

					var selectCity=JSON.stringify(data.data.data);//将json对象转化成字符串
				 localStorage.setItem("user",selectCity);//把选择的数据存储在localstorage中
				 Toast("修改成功")
				}).catch(err=>{
					console.log(err)
				})
			},
			qingkong(){
				this.newpass=0
				this.newpass1=0
			},
      goBack() {
				this.$router.back()
			},

			afterRead(file) {
				// 此时可以自行将文件上传至服务器
        new Promise((resolve,reject) => {
          let url = 'user'
          let formData = new window.FormData();
          let name = new Date().getTime() + this.id+Math.ceil(Math.random()*10)+myfun.createUniqueId()
          formData.append("name", name);
          formData.append("url", url);
          formData.append("file", file.file)
          axios.post('/files/upload',formData)
            .then(res =>{
              if(res.data.status === '200'){
                let url = res.data.result.path
                this.head = url
                localStorage.setItem('imgUrl',url)
                resolve(url)
              }
            })
        }).then(url =>{
          this.changeData(url,'imgUrl')
        })

			},

      changeData(data,type){
        let id = localStorage.getItem('userId')
			  axios.post('/users/update',{
          id:id,
          data:data,
          type:type
        })
          .then(res => {
            if(res.data.status === '200'){
              console.log('修改成功')
              this.showname = false
            }
            if(res.data.status === '300'){
              this.showname = true
              Toast('用户名已存在')

            }
          })
      }
		}

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
	.bg {
		margin-top: 0px;
	}

	p {
    margin-top: 10px;
		font-size: 14px;
	}

	.insert {
		border: 0px;
		width: 75%;
		height: 25px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		background-color: #f8f8f8;
	}

	.send {
		font-size: 14px;
    border: none;
		background-color: rgba(0, 0, 0, 0);
		padding-left: 15px;
	}

  .van-popup{
    padding: 30px 30px;
    box-sizing: border-box;
    background-color: #f8f8f8;
  }


	.avator {
		padding-top: 80px;
		margin: 0 auto;
		width: 100%;
		height: 110px;
		border-bottom: 1px solid  #A5D2FF;
	}

	.icon {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin: 0 auto;
	}

	.upload {
		margin: 0 auto;
		width: 85px;
		height: 90px;
	}

	.genghuan {
		font-size: 14px;
		color: #A5D2FF;
	}

	.list {
		width: 100%;
		height: 100px;
		margin: 50px auto;
    border none
	}

	.list>div {
		width: 60%;
		height: 40px;
		margin: 0 auto;
	}

	.queren {

		width: 100%;
		height: 40px;
		background-color: #A5D2FF;
		border-radius: 20px;
		font-size: 16px;
		color: white;
		margin: 0 auto;

		border: 0px;

	}
</style>
