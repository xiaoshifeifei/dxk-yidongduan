<template>
  <div class="boxInfo">
    <div class="boxcontent" >
      <div class="contentop" @click="tixianClick">
        <div class="conleft">
          提现至
        </div>
        <div class="conright">
          {{ accountName }}
          <div class="imgs">
            <img src="../../assets/xkdimg/xy.png" alt="" />
          </div>
        </div>


        <!-- <div class="conleftka">
          <div class="conleftkatop"> 中国银行</div>
          <div class="conleftkabottom">1231655461316161</div>
           <div class="imgs">
            <img src="../../assets/xkdimg/xy.png" alt="" />
          </div>
        </div> -->
      </div>

      <div class="txcount">
        <div class="txcountop">
          提现金额(可提现金额1元)
        </div>
        <div class="txcountbody">
          <div class="money1">￥</div>
          <input type="text" placeholder="" />
          <div class="moneyAll">全部提现</div>
        </div>
      </div>
      <div class="contentfooter">手续费为0%,预计到账{{ 1 }}元</div>
    </div>
    <div class="btn" v-bind:class="{ active: isActive }">
      确认提现
    </div>
    <van-overlay :show="show" @click="show = false">
      <!-- @click.stop -->

      <div class="wrapper" @click.stop>
        <div class="titletop">
          选择提现账户
        </div>
        <!-- <div class="accountno">
          <div class="cuo" @click="show = false">×</div>
          <div>暂无提现账户信息</div>
          <div class="btns">立即添加</div>
        </div> -->

        <div class="accountno1">
          <div class="cuo" @click="show = false">×</div>
          <div class="infoKa">
            <div class="infotype">
              <div class="infoleft">银行卡类型:</div>
              <div class="inforight">中国银行</div>
            </div>
            <div class="infotype">
              <div class="infoleft">银行卡号:</div>
              <div class="inforight">56464646546464</div>
            </div>
            <div class="infotype">
              <div class="infoleft">开户行:</div>
              <div class="inforight">12316546</div>
            </div>
            <div class="infotype">
              <div class="infoleft">持卡人姓名:</div>
              <div class="inforight">叶子</div>
            </div>
            <div class="infotype">
              <div class="infoleft">手机号:</div>
              <div class="inforight">13972744392</div>
            </div>
          </div>
          <div class="infoKa">
            <div class="infotype">
              <div class="infoleft">银行卡类型:</div>
              <div class="inforight">中国银行</div>
            </div>
            <div class="infotype">
              <div class="infoleft">银行卡号:</div>
              <div class="inforight">56464646546464</div>
            </div>
            <div class="infotype">
              <div class="infoleft">开户行:</div>
              <div class="inforight">12316546</div>
            </div>
            <div class="infotype">
              <div class="infoleft">持卡人姓名:</div>
              <div class="inforight">叶子</div>
            </div>
            <div class="infotype">
              <div class="infoleft">手机号:</div>
              <div class="inforight">13972744392</div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { ImagePreview, Cell, CellGroup, Dialog } from 'vant'
import { get_project } from '@/api/user.js'
export default {
  data() {
    return {
      show: false,
      accountName: '请选择提现账户',
      isActive: false,
    }
  },
  created() {},
  mounted() {},
  methods: {
    mobilePhonefun() {
      return /^1[3456789]\d{9}$/.test()
    },
    tixianClick() {
      this.show = true
    },
  },
}
</script>

<style lang="less" scoped>
.boxInfo {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  background-color: #f5f5f9;
  .boxcontent {
    width: 95%;
    margin: auto;
    border-radius: 20px;
    padding: 0 20px 20px 20px;
    background-color: #fff;
    overflow: hidden;
    padding-top: 20px;
    .contentop {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      flex-direction: row;
      .conleft {
        width: 15%;
        height: 100px;
        text-align: left;
        line-height: 100px;
      }
      .conright {
        position: relative;
        width: 85%;
        height: 100px;
        text-align: left;
        line-height: 100px;
        color: #ccc;
        .imgs {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 28px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
      }
      .conleftka {
         position: relative;
        width: 85%;
        text-align: left;
        .conleftkatop {
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding-left: 40px;
        }
        .conleftkabottom {
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding-left: 40px;
        }
        .imgs {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 28px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
      }
    }
    .txcount {
      width: 100%;
      height: 150px;
      border-bottom: 1px solid #e6e6e6;

      .txcountop {
        width: 100%;
        height: 70px;
        text-align: left;
        line-height: 90px;
      }
      .txcountbody {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 80px;
        .money1 {
          width: 40px;
          height: 80px;
          line-height: 80px;
          font-size: 34px;
          font-weight: 700;
        }
        input {
          width: calc(100% - 220px);
          height: 80px;
        }
        .moneyAll {
          width: 180px;
          height: 80px;
          line-height: 80px;
          color: #169bd5;
          font-size: 12px;
        }
      }
    }
    .contentfooter {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: left;
    }
  }
  .btn {
    width: 100%;
    height: 100px;
    background-color: #169bd5;
    border-radius: 0;
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-size: 32px;
  }
  .active {
    background-color: #999999;
  }
}
.titletop {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: left;
  padding-left: 40px;
  font-size: 30px;
  font-weight: 700;
}
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #f5f5f9;
  // padding-top: 100px;
  .accountno {
    position: relative;
    width: 90%;
    border-radius: 20px;
    margin: auto;
    background-color: #fff;
    padding: 150px 0 60px 0;
    .cuo {
      position: absolute;
      right: 20px;
      top: 10px;
      width: 50px;
      height: 50px;
      font-size: 45px;
      line-height: 50px;
      text-align: center;
    }
    .btns {
      width: 250px;
      height: 70px;
      background-color: #169bd5;
      border-radius: 10px;
      margin: 50px auto 0;
      line-height: 70px;
      color: #fff;
      font-size: 28px;
    }
  }

  .accountno1 {
    position: relative;
    width: 90%;
    border-radius: 20px;
    margin: auto;
    background-color: #fff;
    padding: 80px 0 60px 0;
    .cuo {
      position: absolute;
      right: 20px;
      top: 10px;
      width: 50px;
      height: 50px;
      font-size: 45px;
      line-height: 50px;
      text-align: center;
    }
    .infoKa {
      width: 95%;
      margin: auto;
      border-radius: 20px;
      border: 1px solid #d2d2d2;
      padding-top: 20px;
      margin-bottom: 20px;
      .infotype {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        .infoleft {
          width: 30%;
          height: 50px;
          text-align: right;
          font-weight: 700;
        }
        .inforight {
          width: 70%;
          height: 50px;
          text-align: left;
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
