<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>

  import FooterGuide from './components/FooterGuide/FooterGuide'


  export default {
  name: 'App',
  components:{
    FooterGuide
  },

  watch:{
    '$route':function(to,from){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0
    }

  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/

</style>
