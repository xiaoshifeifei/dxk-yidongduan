<template>
  <div class="configurationss-box">
    <!-- <headercom>
    <div class="header-title" slot="slotname">修订记录</div>
    <router-link :to="''" slot="textbtn"  class="header-text"></router-link>
    </headercom> -->
    <div class="item-box">
      <div class="item">
        <div class="item-msg">
          <div class="item-title-box">
            <i></i>
            <span>{{ $route.query.name }}</span>
          </div>
          <div class="msg-money">
            渠道佣金
            <span>￥{{ strParams }}</span>
          </div>
        </div>
        <div class="item-list">
          <div class="list-item-header">
            <!-- <div>订单类型</div> -->
            <div>直推分销员</div>
            <div>一级间推分销员</div>
            <div>二级间推分销员</div>
            <div>生效日期</div>
            <div>修改人</div>
          </div>
          <div v-for="(item, index) in rowsData" :key="index" class="list-item-body">
            <!-- <div>{{ item.order_type_name }}</div> -->
            <div>{{ item.setting.level1 == '' ? '-' : item.setting.level1 }}</div>
            <div>{{ item.setting.level2 == '' ? '-' : item.setting.level2 }}</div>
            <div>{{ item.setting.level3 == '' ? '-' : item.setting.level3 }}</div>
            <div>{{ item.create_time }}</div>
            <div>{{ item.operator }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="item-box1">
      <div class="item">
        <div class="item-msg">
          <div class="item-title-box"></div>
          <div class="msg-money">
            渠道佣金变更记录
          </div>
        </div>
        <div class="item-list">
          <div class="list-item-header">
            <div>金额</div>
            <div>生效日期</div>
            <div>修改人员</div>
          </div>
          <div v-for="(item, index) in rowsDatas" :key="index" class="list-item-body">
            <div>{{ item.value }}</div>
            <div>{{ item.create_time }}</div>
            <div>{{ item.operator }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getToken, setToken } from '@/utils/auth.js'
import headercom from '../../components/header'
import { configMoneyHistory,getDistribute,getConfig } from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      rowsData: [],
      rowsDatas: [],
      strParams:''
    }
  },
  components: {
    headercom,
  },
  mounted() {
    getDistribute({
      plat_distribute_config_id: this.$route.query.distribute_config_id1,
      page: 1,
      limit: 100,
    }).then((res) => {
      this.rowsDatas = res.data.list.rows
      this.strParams = res.data.plat_distribute_config_value
      console.log('res.data',this.rowsDatas);
    })
     getConfig({
      distribute_config_id: this.$route.query.distribute_config_id,
      page: 1,
      limit: 100,
    }).then((res) => {
      this.rowsData = res.data.rows
      console.log('res.rowsData',this.strParams);
    })
  },
  methods: {
    topath(path) {
      this.$router.push(path)
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm(date) {
      this.dateshow = false
      this.date = this.formatDate(date)
    },
    submint() {
      //保存
    },
  },
}
</script>
<style lang="less" scoped>
.configurationss-box {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/.van-cell__title {
    text-align: left;
    padding-left: 5px;
  }
  .van-cell__value {
    position: initial;
    .van-cell {
      padding: 0;
    }
    /deep/.van-field__control {
      text-align: right !important;
      color: #999999;
    }
  }
  .radio-box {
    width: 75%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    /deep/.van-radio-group {
      display: flex;
      padding: 0 10px;
      padding-left: 20px;
      justify-content: space-between;
    }
  }
  /deep/.header-box {
    width: 100%;
    height: 80px;
    position: fixed;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    align-items: center;
    padding-top: 75px;
    padding-bottom: 50px;
    background: #ffffff;
    margin-top: 0;
  }
  /deep/.header-tag {
    width: 16px;
    height: 34px;
    background: url('../../assets/xkdimg/item-tag.png');
    background-size: 100% 100%;
    transform: rotate(180deg);
  }
  /deep/.header-title {
    color: #333333;
  }
  .item-box {
    width: 90%;
    // height: 100%;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: auto;
    padding-top: 20px;
    // padding-bottom: 60px;
    .item {
      width: 100%;
      height: auto;
      margin-top: 30px;
      border-radius: 30px;
      padding: 40px;
      background: #ffffff;
      .item-msg {
        padding-bottom: 45px;
        border-bottom: 4px dashed #707070;
        .item-title-box {
          display: flex;
          justify-content: left;
          align-items: center;
          color: #333333;
          font-size: 36px;
          font-weight: 600;
          i {
            width: 48px;
            height: 48px;
            background: url('../../assets/xkdimg/tag.png');
            background-size: 100% 100%;
            margin-right: 15px;
          }
        }
      }
      .msg-money {
        color: #333333;
        font-size: 32px;
        margin-top: 36px;
        span {
          color: #ffa433;
          font-size: 40px;
        }
      }
      .item-list {
        margin-top: 40px;
        background: #ffffff;
        padding-bottom: 0;
        // white-space:nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        .list-item-header {
          width: 170%;
          display: flex;
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
          overflow: hidden;
          div:nth-child(6) {
            border-right: none;
          }
          div {
            padding: 0 10px;
            width: 200px !important;
            height: 110px;
            background: #f1f1f1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #e8e8e8;
            font-size: 26px;
            color: #333333;
          }
        }
        .list-item-body {
          width: 168%;
          display: flex;
          // border-bottom: 1px solid #e8e8e8;
          div:nth-child(6) {
            border-right: none;
          }
          div {
            padding: 0 10px;
            width: 200px !important;
            height: 110px;
            background: #f8f8f8;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #e8e8e8;
            border-bottom: 1px solid #e8e8e8;
            font-size: 26px;
            color: #333333;
          }
        }
      }
    }
  }

  .item-box1 {
    width: 90%;
    // height: 100%;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: auto;
    padding-top: 20px;
    // padding-bottom: 60px;
    .item {
      width: 100%;
      height: auto;
      margin-top: 30px;
      border-radius: 30px;
      padding: 40px;
      background: #ffffff;
      .item-msg {
        padding-bottom: 45px;
        border-bottom: 4px dashed #707070;
        .item-title-box {
          display: flex;
          justify-content: left;
          align-items: center;
          color: #333333;
          font-size: 36px;
          font-weight: 600;
          i {
            width: 48px;
            height: 48px;
            background: url('../../assets/xkdimg/tag.png');
            background-size: 100% 100%;
            margin-right: 15px;
          }
        }
      }
      .msg-money {
        color: #333333;
        font-size: 32px;
        margin-top: 36px;
        span {
          color: #ffa433;
          font-size: 40px;
        }
      }
      .item-list {
        margin-top: 40px;
        background: #ffffff;
        padding-bottom: 0;
        // white-space:nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        .list-item-header {
          width: 100%;
          display: flex;
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
          overflow: hidden;
          div:nth-child(3) {
            border-right: none;
          }
          div {
            padding: 0 10px;
            width: calc(100% / 3) !important;
            height: 110px;
            background: #f1f1f1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #e8e8e8;
            font-size: 26px;
            color: #333333;
          }
        }
        .list-item-body {
          width: 100%;
          display: flex;
          border-bottom: 1px solid #e8e8e8;
          div:nth-child(3) {
            border-right: none;
          }
          div {
            padding: 0 10px;
            width: calc(100% / 3) !important;
            height: 110px;
            background: #f8f8f8;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #e8e8e8;
            font-size: 26px;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
