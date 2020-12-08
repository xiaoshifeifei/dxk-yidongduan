<template>
  <div class="boxInfo">
    <div class="moneyModle">
      <div class="modle1">
        <div class="contentitle">
          累计佣金
        </div>
        <div class="moneycount">
          ￥ 100.00
        </div>
        <div class="mebles">
          ( 含待结算 :
        </div>
        <div class="mebles1">
          ￥15.00 )
        </div>
      </div>
      <div class="modle1">
        <div class="contentitle">
          可提现
        </div>
        <div class="moneycount">
          ￥ 50.00
        </div>
      </div>
      <div class="modle1">
        <div class="contentitle">
          已提现
        </div>
        <div class="moneycount">
          ￥ 35.00
        </div>
      </div>
    </div>
    <div class="bodycontent">
      <van-cell  is-link url="../nowtixian">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="txmoney"><img src="../../assets/xkdimg/ljtx1.png" alt=""></span>
          <span>立即提现</span>
        </template>
      </van-cell>
      <van-cell value="有新进展"  is-link url="../recoed">
        <template #title>
          <span class="txmoney"><img src="../../assets/xkdimg/ljtx4l.png" alt=""></span>
          <span>提现记录</span>
        </template>
      </van-cell>
      <van-cell is-link url="../account">
        <template #title>
          <span class="txmoney"><img src="../../assets/xkdimg/ljtx3.png" alt=""></span>
          <span>提现账户</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import { ImagePreview, Cell, CellGroup, Dialog } from 'vant'
import { get_project } from '@/api/user.js'
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    mobilePhonefun() {
      return /^1[3456789]\d{9}$/.test()
    },
  },
}
</script>

<style lang="less" scoped>
.boxInfo {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #f5f5f9;
  .moneyModle {
    display: flex;
    justify-content: space-between;
    width: 100%;
    // background-color: pink;
    padding-bottom: 40px;
    .modle1 {
      width: 30%;
      // height: 200px;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px 10px 20px 20px;
      .contentitle {
        text-align: left;
        font-size: 30px;
      }
      .moneycount {
        text-align: left;
        font-size: 32px;
        font-weight: 700;
        color: #ff0000;
      }
      .mebles {
        width: 100%;
        // white-space:nowrap;
        font-size: 12px;
        text-align: left;
        color: #ff0000;
      }
      .mebles1 {
        width: 100%;
        // white-space:nowrap;
        font-size: 12px;
        text-align: right;
        color: #ff0000;
      }
    }
  }
  .bodycontent {
    width: 100%;
    background-color: skyblue;
  }
}
.custom-title {
  text-align: left;
}
.van-cell__title {
  text-align: left;
}
.van-cell__value {
  color: #ff0000;
}
.txmoney {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  vertical-align: sub;
  img {
    width: 100%;
    height: 100%;
    line-height: 100%;
  }
}
</style>
