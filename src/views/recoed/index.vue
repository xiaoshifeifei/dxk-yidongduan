<template>
  <div class="boxInfo">
    <van-tabs title-active-color="orange" v-model="active" swipeable animated>
      <van-tab title="全部">
        <div class="boxbody">
          <div class="boxtitle">
            <div class="boxleft">
              提现￥20.00
            </div>
            <div class="boxright">
              处理中
            </div>
          </div>
          <div class="boxcontent">
            申请时间: 2020-04-13 15：30
          </div>
          <div class="boxcontent">
            姓名: 叶子
          </div>
          <div class="boxcontent">
            银行卡号: 456132134564131
          </div>
          <div class="boxcontent">
            银行卡类型: 中国银行
          </div>
          <div class="boxcontent">
            开户支行: 福州鼓楼支行
          </div>
          <div class="boxcontent">
            手机号: 18036523652
          </div>
          <!-- 审核失败 打款失败 显示-->
          <!-- <div class="boxcontent">
        原因: 不符合
      </div> -->

          <!-- 已打款 -->
          <!-- <div class="boxcontent">
        打款时间:  2020-04-13 15：30
      </div>
      <div class="boxcontent">
        打款说明: 不打款
      </div> -->
        </div>
      </van-tab>
      <van-tab title="处理中">
        <div class="boxbody">
          <div class="boxtitle">
            <div class="boxleft">
              提现￥20.00
            </div>
            <div class="boxright">
              处理中
            </div>
          </div>
          <div class="boxcontent">
            申请时间: 2020-04-13 15：30
          </div>
          <div class="boxcontent">
            姓名: 叶子
          </div>
          <div class="boxcontent">
            银行卡号: 456132134564131
          </div>
          <div class="boxcontent">
            银行卡类型: 中国银行
          </div>
          <div class="boxcontent">
            开户支行: 福州鼓楼支行
          </div>
          <div class="boxcontent">
            手机号: 18036523652
          </div>
          <div class="boxcontent">
            原因: 不符合
          </div>
        </div>
      </van-tab>
      <van-tab title="已打款">
        <div class="boxbody">
          <div class="boxtitle">
            <div class="boxleft">
              提现￥20.00
            </div>
            <div class="boxright">
              已打款
            </div>
          </div>
          <div class="boxcontent">
            申请时间: 2020-04-13 15：30
          </div>
          <div class="boxcontent">
            姓名: 叶子
          </div>
          <div class="boxcontent">
            银行卡号: 456132134564131
          </div>
          <div class="boxcontent">
            银行卡类型: 中国银行
          </div>
          <div class="boxcontent">
            开户支行: 福州鼓楼支行
          </div>
          <div class="boxcontent">
            手机号: 18036523652
          </div>
          <div class="boxcontent">
            打款时间: 2020-04-13 15：30
          </div>
          <div class="boxcontent">
            打款说明: 不打款
          </div>
        </div>
      </van-tab>
      <van-tab title="打款失败">
        <div class="boxbody">
          <div class="boxtitle">
            <div class="boxleft">
              提现￥20.00
            </div>
            <div class="boxright">
              打款失败
            </div>
          </div>
          <div class="boxcontent">
            申请时间: 2020-04-13 15：30
          </div>
          <div class="boxcontent">
            姓名: 叶子
          </div>
          <div class="boxcontent">
            银行卡号: 456132134564131
          </div>
          <div class="boxcontent">
            银行卡类型: 中国银行
          </div>
          <div class="boxcontent">
            开户支行: 福州鼓楼支行
          </div>
          <div class="boxcontent">
            手机号: 18036523652
          </div>
          <div class="boxcontent">
            原因: 不符合
          </div>
        </div>
      </van-tab>
      <van-tab title="审核失败">
        <div class="boxbody">
          <div class="boxtitle">
            <div class="boxleft">
              提现￥20.00
            </div>
            <div class="boxright">
              审核失败
            </div>
          </div>
          <div class="boxcontent">
            申请时间: 2020-04-13 15：30
          </div>
          <div class="boxcontent">
            姓名: 叶子
          </div>
          <div class="boxcontent">
            银行卡号: 456132134564131
          </div>
          <div class="boxcontent">
            银行卡类型: 中国银行
          </div>
          <div class="boxcontent">
            开户支行: 福州鼓楼支行
          </div>
          <div class="boxcontent">
            手机号: 18036523652
          </div>
          <div class="boxcontent">
            原因: 不符合
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { ImagePreview, Cell, CellGroup, Dialog } from 'vant'
import { get_project } from '@/api/user.js'
export default {
  data() {
    return {
      active: 1,
      tabbers: ['全部', '处理中', '已打款', '打款失败', '审核失败'],
    }
  },
  created() {},
  mounted() {},
  methods: {
    mobilePhonefun() {
      return /^1[3456789]\d{9}$/.test()
    },
    tabberclick(params) {},
  },
}
</script>

<style lang="less" scoped>
.boxInfo {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f9;
  padding: 5px 0 20px;
  .tabber {
    width: 100%;
    height: 100px;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    .tabberitem {
      width: 20%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 30px;
    }
    .van-tabs {
      width: 100%;
    }
    .active {
      color: orange;
    }
  }
  .boxbody {
    width: 95%;
    margin: auto;
    margin-top: 20px;
    border-radius: 20px;
    padding: 20px 20px 20px;
    background-color: #fff;
    .boxtitle {
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: row;
      .boxleft {
        width: 70%;
        text-align: left;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        font-weight: 700;
      }
      .boxright {
        width: 30%;
        height: 80px;
        text-align: right;
        line-height: 80px;
        color: #ff0000;
      }
    }
    .boxcontent {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: left;
    }
  }
}
.active {
  color: orange;
  /deep/.van-tab__text--ellipsis {
    color: orange !important;
  }
  /deep/ .van-tab__text {
    color: orange !important;
  }
}
/deep/ .van-tabs__line {
  background-color: transparent;
}

.col {
  // /deep/.van-tab__text--ellipsis {
  //   color: orange !important;
  // }
}
</style>
