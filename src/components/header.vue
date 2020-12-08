<template>
  <div class="header-box">
      <div class="header-tag" @click="tobblock()"></div>
      <slot name="slotname">
        <div class="header-title">抖小客</div>
      </slot>
      <slot name="textbtn"></slot>
  </div>
</template>
<script>
export default {
  name: 'headercom',
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    tobblock(){
        this.$router.go(-1)
    }
  },
};
</script>
<style lang="less" scoped>
  .header-box {
    width: 100%;
    height: 80px;
    position: fixed;
    color: #ffffff;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    align-items: center;
    margin-top: 30px;
    .header-tag{
        width: 35px;
        height: 35px;
        background: url("../assets/xkdimg/header-tag.png");
        display: none;
        background-size: 100% 100%;
    }
    .header-title{
        font-size: 35px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .header-text{
        margin-right: 10px;
        color: #ffffff;
        position: absolute;
        right: 10%;
    }
  }
</style>
