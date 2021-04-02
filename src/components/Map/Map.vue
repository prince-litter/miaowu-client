<template>
  <div class="map-wrp">
    <div class="map-btn">
      <div class="cancel" @click="cancel">取消</div>
      <div class="send" @click="send">发送</div>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {Toast} from 'vant'
  export default {
    data(){
      return{
        info:{}
      }
    },
    mounted() {

    },
    methods:{
      initMap(id){
        let that = this
        let mapObj = new AMap.Map(id, {
          zoom:11,//级别
        })
        let geolocation;
        mapObj.plugin(['AMap.Geolocation'], function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: 'RB',  // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);
        })
        function onComplete (data) {
          //定位成功
          let res = data.position
          let lat = res.lat     //纬度
          let lng = res.lng       //经度
          // 创建一个 Marker 实例：
          let marker = new AMap.Marker({
            position: new AMap.LngLat(lng, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          });

        // 将创建的点标记添加到已有的地图实例：
          mapObj.add(marker);

        // // 移除已创建的 marker
        //   map.remove(marker);
          axios.get('https://restapi.amap.com/v3/geocode/regeo',{
            params:{
              key:'e43af04521a59f2709e00e5f01e48f26',
              location: `${lng},${lat}`
            }
          }).then((res)=>{
            let addr = res.data.regeocode.formatted_address
            let info = {
              address:addr,
              latitude:lat,
              longitude:lng
            }
            that.info = info
          })
          console.log('成功')
        }
        function onError (data) {
          // 定位出错
          Toast('定位失败')
          setTimeout(()=>{
            that.cancel()
          })
          console.log('失败',data)
        }
        return geolocation;
      },
      cancel (){
        this.$emit('position',false)
      },
      send () {
        this.$emit('addr',this.info)
      }
    }


  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .map-wrp
    position absolute
    top 0
    bottom 0
    right 0
    left 0
    z-index 200
    .map-btn
      width 100%
      padding 30px
      height 50px
      position absolute
      top 0
      display flex
      justify-content space-between
      align-items center
      box-sizing border-box
      color white
      z-index 200
      .send
        background-color #A5D2FF
        padding 7px 10px
        border-radius 5px
      .cancel
        background-color rgba(255,255,255,0.5)
        padding 7px 10px
        border-radius 5px
        color #7e8c8d
    #container
      width 100%
      height 100vh


</style>
