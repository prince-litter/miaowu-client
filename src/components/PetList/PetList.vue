<template>

  <div class="pet_container" ref="wrapper">
    <ul class="pet-lists right">
      <li class="pet-list right">
        <a href="javascript:">
          <img src="./images/dog1.jpg" alt="">
        </a>
      </li>
      <li class="pet-list right">
        <a href="javascript:">
          <img src="./images/dog3.jpg" alt="">
        </a>
      </li>
      <li class="pet-list right">
        <a href="javascript:">
          <img src="./images/dog1.jpg" alt="">
        </a>
      </li>

    </ul>
    <ul class="pet-lists left">
      <li class="pet-list left">
        <a href="javascript:">
          <img src="./images/dog2.jpg" alt="">
        </a>
      </li>
      <li class="pet-list left">
        <a href="javascript:">
          <img src="./images/dog4.jpg" alt="">
        </a>
      </li>
      <li class="pet-list left">
        <a href="javascript:">
          <img src="./images/dog2.jpg" alt="">
        </a>
      </li>

    </ul>
  </div>

</template>
<script>

  export default {

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

    .pet_container
      width 100%
      margin-top 10px
      text-align center
      .pet-lists
        display inline-block
        vertical-align: top
        &.left
          margin-left 20px
          margin-top 35px
        .pet-list
          margin-top 20px


</style>
