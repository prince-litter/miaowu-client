<template>
	<div>


		<van-list v-model="loading" :finished="finished" :offset="num" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="(item,index) in datas" :key="index" class="list">
				<div>
					<div class="list-top">
						<router-link :to="{path:'/personal',query:{id:item.id,name:item.name,data:item,schoolid:item.schoolid}}">
							<div class="list-top-logo">
                <van-image round width="35" height="35" :src="url" />
							</div>
							<div class="list-top-name">
								<div>{{item.name}}</div>
								<router-link :to="{path:'/myself',query:{id:item.cover,name:item.covername,school:item.name,schoolid:item.schoolid}}">
									<div>{{item.covername}}{{item.time}}</div>
								</router-link>
							</div>
						</router-link>
						<div class="list-top-guanzhu">
							>
						</div>
					</div>
				</div>
				<router-link :to="'/detailed?id=' + item.id">
					<div class="list-txt">{{item.txt}}</div>
				</router-link>
				<div class="list-img">
          <div v-if="count==1">
            <div v-for="item in img" class="img1">
              <van-image width="200" height="200" :src="'http://192.168.43.55:3000\\'+item.url" @click="look('http://192.168.43.55:3000\\'+item.url)" />
            </div>
          </div>
          <div v-else-if="count==2">
            <div v-for="item in img" class="img2">
              <van-image width="120" height="120" :src="'http://192.168.43.55:3000\\'+item.url" @click="look('http://192.168.43.55:3000\\'+item.url)" />
            </div>
          </div>
          <div v-else>
            <div v-for="item in img" class="img">
              <van-image width="100%" height="100" :src="'http://192.168.43.55:3000\\'+item.url" @click="look('http://192.168.43.55:3000\\'+item.url)" />
            </div>
          </div>
				</div>
				<div class="list-pinglun">
					<div>
						<van-icon name="comment-o" :info="item.pinglunId" @click="pinglun(item.id)" />
					</div>
					<div>
            <van-icon v-if="is" name="good-job" :info="num1" color="red" @click="quxiao()"/>
            <van-icon v-else name="good-job-o" :info="num1" @click="dianzhan()"/>
					</div>
					<div>
            <van-icon v-if="is" name="like" color="red" @click="qxshouchang()"/>
            <van-icon v-else name="like-o" color="#000000" @click="shouchang()"/>
					</div>
				</div>
			</van-cell>
		</van-list>



	</div>
</template>

<script>

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
	export default {
		name: "list",
		props: {
			data: {
				type: Array
			},
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
		data() {
			return {
				images: [],
				list: [],
				loading: false,
				finished: false,
				isLoading: '',
				num: 500,
				datas: [],
				i: 0,

			}
		},
		watch: {
			data(old, newdata) {
				console.log(newdata)
				this.datas = []
				this.list = []
				this.i = 0
				this.onLoad()

			}
		},
		methods: {

			onLoad() {
				// 异步更新数据
				var that = this

				setTimeout(function() {

					if (that.data.length > 0) {

						for (let j = 0; j < 5; j++) {
							if (that.data[that.i] == null) {
								break;
							} else {
								that.datas.push(that.data[that.i]);

							that.i++;
							}


						}
						// 加载状态结束
						that.loading = false;

						// 数据全部加载完成
						if (that.datas.length >= that.data.length) {
							that.finished = true;
						}
					}


				}, 500)




			},
			pinglun(key) {
				console.log(key)
				this.$router.push({
					path: "detailed",
					query: {
						id: key.toString()
					}
				})
			},




		},
		created() {
			console.log(this.data.length)
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped">
	.jiazai {
		width: 300px;

	}


	a {
		color: #000000;
	}

	.list {
		padding: 5px 10px;
		border-bottom: 5px solid rgb(0, 0, 0, 0.1);
	}


	.list-top {
		height: 50px;
	}

	.list-img {
		width: 100vw;


	}

	.list-img>img {
		width: 50vw;
		height: 150px;

	}

	.list-top-logo {
		float: left;
		padding-right: 10px;
	}

	.list-top-name {
		width: 50%;
		height: 40px;
		float: left;
	}

	.list-top-name>div {
		font-size: 0.9em;
		height: 15px;
	}

	.list-top-name>a>div {
		font-size: 0.8em;
		height: 15px;
		color: rgb(233, 200, 29);
	}

	.list-top-guanzhu {
		display: grid;

		width: 5%;
		height: 40px;
		float: right;
	}

	.list-top-guanzhu>button {
		margin: auto;
		border: 1px solid rgb(233, 200, 29);
		background-color: white;
		border-radius: 10px;
		width: 60px;
		height: 25px;
		font-size: 0.8em;
	}

	.list-top-logo>img {
		width: 35px;
		height: 35px;
		left: 20px;
		border-radius: 50%;
	}

	.list-txt {
		padding-left: 0px;

		font-size: 1.0em;

	}

	.list-pinglun {
		width: 100%;
		display: flex;
		justify-content: space-around;
		border-top: 1px solid rgb(0, 0, 0, 0.1);
		padding-top: 10px;

	}

	.list-pinglun>div {
		font-size: 20px;
		width: 50px;
		height: 20px;
		text-align: center;
		color: rgb(0, 0, 0, 0.5);
	}
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
