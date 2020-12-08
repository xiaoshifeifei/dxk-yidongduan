<template>
  <div class="selectindex-box">
      <div class="btn-box">
        <div class="distribution-btn"  @click="tologin('distributionlogin')">我是个人分销员</div>
        <div class="channel-btn" @click="tologin('channellogin')">我是渠道商</div>
      </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth.js'
export default {
  name: 'index',
  data() {
    return {

    }
  },
  mounted() {},
  created() {
  },
  
  methods: {
      tologin(path){
          this.$router.push(path)
      }
  },
}
</script>
<style lang="less" scoped>
.selectindex-box {
  width: 100%;
  height: 100%;
  background: url("../../assets/xkdimg/sele-bg.png");
  background-size: 100% 100%;
  .btn-box{
      position: absolute;
      bottom: 20%;
      left: 50%;
      transform: translateX(-50%);
    .distribution-btn{
        width: 630px;
        height: 100px;
        background: #ffffff;
        border-radius: 50px;
        line-height: 100px;
        color: #333333;
        font-size: 36px;
    }
    .channel-btn{
        width: 630px;
        height: 100px;
        background: #ffffff; 
        margin-top: 40px;  
        border-radius: 50px; 
        line-height: 100px;
        color: #333333;
        font-size: 36px;
    }
  }

}
</style>
