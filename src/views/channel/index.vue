<template>
  <div class="channel-box">
    <div class="channel-title">渠道商中心</div>
    <div class="main-bg" v-if="active == 0">
      <div class="main-title"></div>
      <div class="main-box">
        <div class="qrCode-box">
          <div class="qrCode-title-box">
            <div class="qrCode-title">渠道商名称:{{ item.team_name }}</div>
            <!-- <div class="qrCode-btn" @click="topath('share')">
              <i></i>
              <span>分享分销链接</span> 
            </div> -->
          </div>
          <div class="qrCode-img">
            <img @click="ImagePreviewfun" :src="codeimg" alt="" />
          </div>
          <div class="qrCode-title-s">渠道商二维码</div>
        </div>
        <div class="centent-box">
          <div class="item-box">
            <div class="item-title-box" @click="topath('distributioMnember')">
              <div class="item-title">{{ infodata.agent.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ infodata.agent.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('customerMnember')">
              <div class="item-title">{{ infodata.customer.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ infodata.customer.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('orderslist')">
              <div class="item-title">{{ infodata.order.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ infodata.order.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('qdzyj')">
              <div class="item-title">{{ infodata.team_commission.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ infodata.team_commission.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('fxyyj')">
              <div class="item-title">{{ infodata.agent_commission.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ infodata.agent_commission.total_count }}</div>
          </div>
        </div>
        <!-- <div class="centent-box-bottom">
          <div class="item-bottom">
            <div class="item-bottom-title">分销员佣金</div>
            <div class="item-bottom-num">开发中</div>
          </div>
        </div> -->
        <div class="nav-box" @click="topath('configurationlist')">
          <div class="nav-item">分销员佣金设置</div>
          <div class="nav-item">查看</div>
          <div class="right-tag"></div>
        </div>
      </div>
    </div>
    <div class="message-box-two" v-if="active == 1">
      <div>
        消息模块等待开发
      </div>
    </div>
    <div class="setting-box" v-if="active == 2">
      <div class="msg-box">
        <div class="header-box">
          <img :src="item.avatar" alt="" />
          <div class="header-name">{{ item.nickname == '' ? item.mobile : item.nickname }}</div>
        </div>
        <div class="header-item">
          <div class="item">
            <div class="num">{{ infodata.customer.total_count }}</div>
            <div class="text">{{ infodata.customer.total_describe }}</div>
          </div>
          <div class="item">
            <div class="num">{{ infodata.agent.total_count }}</div>
            <div class="text">{{ infodata.agent.total_describe }}</div>
          </div>
          <!-- <div class="item" v-if="infodata.agent_commission.total_count">
            <div class="num">{{infodata.agent_commission.total_count}}</div>
            <div class="text">{{infodata.agent_commission.total_describe}}</div>
          </div> -->
          <div class="item" v-if="infodata.team_commission.total_count">
            <div class="num">{{ infodata.team_commission.total_count }}</div>
            <div class="text">{{ infodata.team_commission.total_describe }}</div>
          </div>
        </div>
      </div>
      <van-cell-group>
        <!-- <van-cell @click="showCodefun" title="我要提现" is-link url="../tiXian" /> -->

        <van-cell is-link url="../tiXian">
          <template #title>
            <span class="txmoney1">
              <!-- <img src="../../assets/xkdimg/ljtx2l.png" alt=""/> -->
              </span>
            <span>我要提现</span>
          </template>
        </van-cell>

        <a class="call-a" :href="'tel:' + getServiceTel">
          <van-cell is-link>
            <template #title>
              <span class="txmoney"><img src="../../assets/xkdimg/ljtx6l.png" alt=""/></span>
              <span>联系客服</span>
            </template>
          </van-cell>
        </a>
        <van-cell is-link url="../settings">
          <template #title>
            <span class="txmoney"><img src="../../assets/xkdimg/ljtx7l.png" alt=""/></span>
            <span>设置</span>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- <div class="outlogin" @click="outlogin()">退出登录</div> -->
    </div>
    <van-tabbar v-model="active" @change="onChangetabbar">
      <van-tabbar-item icon="home-o">渠道中心</van-tabbar-item>
      <van-tabbar-item icon="friends-o">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth.js'
import { ImagePreview, Cell, CellGroup, Dialog } from 'vant'
import headercom from '../../components/header'
import cookie from 'js-cookie'
import { getteamqrcode, getUser, getServiceTel, get_spread_info } from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      loading: false,
      codeimg: '',
      active: 0,
      item: '',
      images1: '../../assets/xkdimg/ljtx1.png',
      getServiceTel: '',
      infodata: {
        agent: {
          total_describe: '',
          total_count: '0.00',
        },
        customer: {
          total_describe: '',
          total_count: '0.00',
        },
        order: {
          total_describe: '',
          total_count: '0.00',
        },
        team_commission: {
          total_describe: '',
          total_count: '0.00',
        },
        agent_commission: {
          total_describe: '',
          total_count: '0.00',
        },
      },
    }
  },
  components: {
    headercom,
  },
  mounted() {
    this.getDate()
    getUser().then((res) => {
      this.item = res.data
    })
    getServiceTel().then((res) => {
      this.getServiceTel = res.data.service_tel
    })
  },
  beforeRouteLeave(to, from, next) {
    if (!to.meta.keepAlive) {
      if (localStorage.getItem('token')) {
        next('/channel')
      } else {
        next()
      }
    } else {
      next()
    }
  },
  created() {
    ;(this.active = 0),
      get_spread_info().then((res) => {
        this.infodata = res.data
      })
  },
  methods: {
    // 我要提现
    showCodefun() {},
    topath(path) {
      // this.$router.push(path)
      this.$router.push({
        name: path,
        query: { teamUsers: 'qudao' },
      })
    },
    getDate() {
      this.loading = true
      getteamqrcode().then((res) => {
        this.codeimg = res.data.url
      })
    },
    ImagePreviewfun() {
      ImagePreview([this.codeimg])
    },
    outlogin() {
      Dialog.confirm({
        title: '退出登录!',
        message: '是否退出登录?',
      })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('tokentag')
          this.$router.push('/selectindex')
        })
        .catch(() => {
          // on cancel
        })
    },
    onChangetabbar(index) {
      if (index == 0) {
        this.$route.meta.title = '渠道中心'
      } else if (index == 1) {
        this.$route.meta.title = '消息'
      } else if (index == 2) {
        this.$route.meta.title = '我的'
      }
      document.title = this.$route.meta.title
    },
  },
}
</script>
<style lang="less" scoped>
.channel-box {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .channel-title {
    font-size: 36px;
    font-size: 600;
    background: #ffffff;
    padding: 25px 0;
  }
  .main-bg {
    width: 100%;
    height: auto;
    background: url('../../assets/xkdimg/main-bg.png');
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 65px;
    padding-bottom: 135px;
    .main-title {
      width: 332px;
      height: 131px;
      margin: auto;
      background: url('../../assets/xkdimg/title2.png');
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .main-box {
      width: 100%;
      padding: 0 30px;
      height: auto;
      padding-top: 80px;
      padding-bottom: 150px;
      .qrCode-box {
        width: 100%;
        height: auto;
        background: #ffffff;
        border-radius: 9px;
        padding: 35px 0;
        .qrCode-title-box {
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .qrCode-title {
            font-size: 32px;
            width: 70%;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            font-weight: 600;
          }
          .qrCode-btn {
            min-width: 220px;
            height: 48px;
            border: 1px solid #ffa433;
            border-radius: 50px;
            color: #ffa433;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 10px;
            font-size: 27px;
            i {
              width: 22px;
              height: 22px;
              background: url('../../assets/xkdimg/code-tag.png');
              background-size: 100% 100%;
            }
          }
        }
        .qrCode-img {
          width: 100px;
          height: 100px;
          background-size: 100% 100%;
          margin: auto;
          margin-top: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .qrCode-title-s {
          font-size: 29px;
          font-weight: 500;
          margin-top: 20px;
        }
      }
      .nav-box {
        width: calc(100% - 60px);
        height: 125px;
        background: url('../../assets/xkdimg/nav-bg.png');
        background-size: 100% 100%;
        margin-top: 25px;
        display: flex;
        align-items: center;
        position: relative;
        position: fixed;
        bottom: 9%;
        .nav-item {
          width: 50%;
          // height: 100%;
          font-size: 32px;
          color: #fff;
        }
        .right-tag {
          background: url('../../assets/xkdimg/right-tag.png');
          width: 10px;
          height: 19px;
          background-size: 100% 100%;
          position: absolute;
          right: 120px;
        }
      }
      .centent-box {
        width: 100%;
        height: auto;
        margin-top: 35px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item-box {
          width: 48%;
          min-height: 180px;
          max-height: 160px;
          background: #ffffff;
          margin-bottom: 35px;
          border-radius: 9px;
          padding: 25px;
          .item-title-box {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            width: 100%;
            .item-title {
              font-size: 35px;
              font-weight: bold;
              text-align: left;
              overflow: hidden;
              white-space: normal;
              text-overflow: ellipsis;
            }
            .item-tag {
              width: 10px;
              height: 18px;
              background: url('../../assets/xkdimg/item-tag.png');
              background-size: 100% 100%;
              margin-left: 18px;
            }
          }
          .item-num {
            text-align: left;
            font-size: 40px;
            color: #999999;
            width: 100%;
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
          }
        }
      }
      .centent-box-bottom {
        width: 100%;
        height: 180px;
        background: #ffffff;
        display: flex;
        border-radius: 9px;
        .item-bottom {
          width: 100%;
          height: 100%;
          .item-bottom-title {
            color: #333333;
            font-size: 34px;
            margin-top: 40px;
            padding: 0 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .item-bottom-num {
            color: #999999;
            font-size: 38px;
            width: 100%;
            padding: 0 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 20px;
          }
        }
        .item-bottom-tag,
        .item-bottom-tag2 {
          position: relative;
        }
        .item-bottom-tag::after,
        .item-bottom-tag2::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 70%;
          background: #f1f1f1;
          right: 0;
          top: 15%;
        }
        .item-bottom-tag::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 70%;
          background: #f1f1f1;
          left: 0;
          top: 15%;
        }
      }
    }
  }
  .message-box-two {
    display: flex;
    align-items: center;
    height: calc(100% - 120px);
    justify-content: center;
    font-size: 36px;
  }
  .setting-box {
    width: 100%;
    height: 100%;
    /deep/.van-cell__title {
      text-align: left;
    }
    .msg-box {
      width: 100%;
      height: 455px;
      padding-top: 135px;
      padding-left: 35px;
      padding-right: 35px;
      background: #146eeb;
      .header-box {
        display: flex;
        align-items: center;
        img {
          width: 104px;
          height: 104px;
          border-radius: 50%;
        }
        .header-name {
          margin-left: 20px;
          font-size: 38px;
          color: #ffffff;
          max-width: 600px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .header-item {
        width: 600px;
        height: 150px;
        margin: auto;
        display: flex;
        .item {
          width: calc(100% / 3);
          height: 100%;
          font-size: 38px;
          margin-top: 40px;
          color: #ffffff;
          .num {
            margin-bottom: 15px;
          }
        }
      }
    }
    .outlogin {
      width: 80%;
      height: 100px;
      margin: 150px auto;
      color: #fff;
      background-color: #1989fa;
      border: 1px solid #1989fa;
      border-radius: 999px;
      font-size: 38px;
      line-height: 100px;
    }
    .call-a {
      width: 100%;
      height: 100%;
      text-decoration: none;
    }
  }
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
.txmoney1 {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  background: url("../../assets/xkdimg/ljtx2l.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 137% 137%;
  vertical-align: sub;
  // img {
  //   width: 100%;
  //   height: 100%;
  //   line-height: 100%;
    
  // }
}
</style>
