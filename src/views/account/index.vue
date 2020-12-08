<template>
  <div class="boxInfo">
    <div v-if="false">
      <div class="boxbody">
        <div class="boxcontent">
          银行卡类型: 中国银行
        </div>
        <div class="boxcontent">
          银行卡号: 66666666666666
        </div>
        <div class="boxcontent">
          开户行: 150000000
        </div>
        <div class="boxcontent">
          持卡人姓名: 叶子
        </div>
        <div class="boxcontent">
          手机号: 18036523652
        </div>
        <div class="btn">
          <div>删除</div>
          <div>编辑</div>
          <div style="clear: both"></div>
        </div>
      </div>

      <div class="boxbody">
        <div class="boxcontent">
          银行卡类型: 中国银行
        </div>
        <div class="boxcontent">
          银行卡号: 66666666666666
        </div>
        <div class="boxcontent">
          开户行: 150000000
        </div>
        <div class="boxcontent">
          持卡人姓名: 叶子
        </div>
        <div class="boxcontent">
          手机号: 18036523652
        </div>
        <div class="btn">
          <div>删除</div>
          <div>编辑</div>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
    <div v-else class="boxfooter">
      <div class="box1">
        <img src="../../assets/xkdimg/psd.png" alt="">
      </div>
      <div class="box2">
        暂无银行卡信息
      </div>
      <div class="boxbtn">
       <van-button color="#169BD5" url="../add">立即添加</van-button>
      </div>
    </div>
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
      height: 50px;
      line-height: 50px;
      text-align: left;
      border-radius: 20px;
    }
    .btn {
      width: 100%;
      height: 50px;
      border-radius: 0;
      padding: 0;
      div {
        display: inline-block;
        width: 100px;
        height: 50px;
        line-height: 50px;
        float: right;
        color: #169bd5;
      }
    }
  }
  .boxfooter {
    padding-top: 200px;
    .box1 {
      width: 150px;
      height: 100px;
      margin: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .box2 {
      margin-top: 40px;
      font-size: 32px;
      font-weight: 700;
      text-align: center;
    }
    .boxbtn {
      margin-top: 40px;
      .van-button{
        width: 140px;
        height: 40px;
        border-radius: 5px;
      }
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

</style>
