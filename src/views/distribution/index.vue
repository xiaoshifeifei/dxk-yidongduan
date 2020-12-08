<template>
  <div class="distribution-box">
    <div class="main-bg" v-if="active == 0">
      <div class="main-title"></div>
      <div class="main-box">
        <div class="qrCode-box">
          <div class="qrCode-title-box">
            <div class="qrCode-title">所属渠道商:{{ item.team_name }}</div>
            <!-- <div class="qrCode-btn" @click="topath('share')">
              <i></i>
              <span>分享分销链接</span>
            </div> -->
          </div>
          <div class="qrCode-img">
            <img @click="ImagePreviewfun" :src="codeimg" alt="" />
          </div>
          <div class="qrCode-title-s">小客抖推广码</div>
          <!-- <div class="qrCode-title-s">邀请分销员</div> -->
        </div>
        <!-- <div class="nav-box">
          <div class="nav-item">推广任务</div>
          <div class="nav-item">查看</div>
          <div class="right-tag"></div>
        </div> -->
        <div class="centent-box">
          <div class="item-box">
            <div class="item-title-box" @click="topath('distributioMnember')">
              <div class="item-title">{{ myInfo.agent.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ myInfo.agent.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('customerMnember')">
              <div class="item-title">{{ myInfo.customer.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ myInfo.customer.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('ordersCount')">
              <div class="item-title">{{ myInfo.order.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ myInfo.order.total_count }}</div>
          </div>
          <div class="item-box">
            <div class="item-title-box" @click="topath('ordersCount')">
              <div class="item-title">{{ myInfo.commission.total_describe }}</div>
              <div class="item-tag"></div>
            </div>
            <div class="item-num">{{ myInfo.commission.total_count }}</div>
          </div>
        </div>
        <div class="centent-box-bottom">
          <div class="item-bottom">
            <div class="item-bottom-num">{{ myInfo.commission.today_count }}</div>
            <div class="item-bottom-title"><span class="contentshoptext">{{ myInfo.commission.today_describe }}</span></div>
          </div>
          <div class="item-bottom item-bottom-tag">
            <div class="item-bottom-num">{{ myInfo.order.today_count }}</div>
            <div class="item-bottom-title"><span class="contentshoptext">{{ myInfo.order.today_describe }}</span></div>
          </div>
          <div class="item-bottom item-bottom-tag2">
            <div class="item-bottom-num">{{ myInfo.customer.today_count }}</div>
            <div class="item-bottom-title"><span class="contentshoptext">{{ myInfo.customer.today_describe }}</span></div>
          </div>
          <div class="item-bottom">
            <div class="item-bottom-num">{{ myInfo.agent.today_count }}</div>
            <div class="item-bottom-title"><span class="contentshoptext">{{ myInfo.agent.today_describe }}</span></div>
          </div>
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
        <div class="header-box" @click="topath('modify')">
          <img :src="item.avatar" alt="" />
          <div class="header-name">{{ item.nickname == '' ? item.mobile : item.nickname }}</div>
          <i></i>
        </div>
        <div class="header-item">
          <div class="item">
            <div class="num">{{ myInfo.customer.total_count }}</div>
            <div class="text">{{ myInfo.customer.total_describe }}</div>
          </div>
          <div class="item">
            <div class="num">{{ myInfo.agent.total_count }}</div>
            <div class="text">{{ myInfo.agent.total_describe }}</div>
          </div>
          <div class="item">
            <div class="num">{{ myInfo.commission.total_count }}</div>
            <div class="text">{{ myInfo.commission.total_describe }}</div>
          </div>
        </div>
      </div>
      <van-cell-group>
        <van-cell is-link url="../tiXian">
          <template #title>
            <span class="txmoney"><img src="../../assets/xkdimg/ljtx2l.png" alt=""/></span>
            <span>我要提现</span>
          </template>
        </van-cell>
        <!-- <van-cell @click="showCodefun()" title="邀请分销员" is-link value="" /> -->
        <van-cell @click="showCodefun()" is-link >
          <template #title>
            <span class="txmoney"><img src="../../assets/xkdimg/ljtx8l.png" alt="" ></span>
            <span>邀请分销员</span>
          </template>
        </van-cell>
        <van-cell is-link value="开发中">
          <template #title>
            <span class="txmoney"><img src="../../assets/xkdimg/ljtx5l.png" alt="" ></span>
            <span>我的邀请人</span>
          </template>
        </van-cell>

        
        <a class="call-a" :href="'tel:' + getServiceTel">
          <!-- <van-cell title="联系客服" is-link value=""> </van-cell> -->
           <van-cell is-link >
          <template #title>
            <span class="txmoney"><img src="../../assets/xkdimg/ljtx6l.png" alt=""></span>
            <span>联系客服</span>
          </template>
        </van-cell>
        </a>

        <!-- <van-cell title="设置" is-link value="开发中" /> -->
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
      <van-tabbar-item icon="home-o">分销中心</van-tabbar-item>
      <van-tabbar-item icon="friends-o">消息</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth.js'
import { ImagePreview } from 'vant'
import Vue from 'vue'
import { Cell, CellGroup, Dialog } from 'vant'
import {
  getCode,
  getCodeDome,
  getUser,
  getServiceTel,
  getInfo, //获取分销员推广信息统计数据
} from '@/api/user.js'
import cookie from 'js-cookie'
export default {
  name: 'index',
  data() {
    return {
      loading: false,
      codeimg: '',
      codeimg2: '',
      active: 0,
      item: '',
      getServiceTel: '',
      myInfo: {
        agent: {
          total_describe: '',
          total_count: '0',
        },
        customer: {
          total_describe: '',
          total_count: '0',
        },
        order: {
          total_describe: '',
          total_count: '0',
        },
        commission: {
          total_describe: '',
          total_count: '0',
        },
      },
    }
  },
  components: {},
  mounted() {
    getServiceTel().then((res) => {
      this.getServiceTel = res.data.service_tel
    })
  },
  // watch: {
  //   $router: {
  //     handler: 'test',
  //     //调用方法
  //     immediate: true,
  //     //进入立即执行一次
  //   },
  // },
  beforeRouteLeave(to, from, next) {
    if (!to.meta.keepAlive) {
      if (localStorage.getItem('token')) {
        next('/distribution')
      } else {
        next()
      }
    } else {
      next()
    }
  },
  created() {
    this.getInfos()
    this.active = 0
    this.getDate()

    getUser().then((res) => {
      this.item = res.data
    })
  },
  methods: {
    async getInfos() {
      let res = await getInfo()
      console.log('res', res)
      this.myInfo = res.data
    },
    getDate() {
      this.loading = true
      getCodeDome().then((res) => {
        this.codeimg = res.data[0].url
      })
      getCode().then((res) => {
        this.codeimg2 = res.data.url
      })
    },
    topath(path){
      // this.$router.push(path)
      this.$router.push({
        name:path,
        query: { teamUsers: 'fenxiao' } 
      })

    },
    ImagePreviewfun() {
      ImagePreview([this.codeimg])
    },
    showCodefun() {
      ImagePreview([this.codeimg2])
    },
    outlogin() {
      Dialog.confirm({
        title: '退出登录!',
        message: '是否退出登录?',
      })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('tokentag')
          this.$router.push('selectindex')
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
.distribution-box {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/.van-cell__title {
    text-align: left;
  }
  .main-bg {
    width: 100%;
    height: 100%;
    background: url('../../assets/xkdimg/main-bg.png');
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    padding-top: 35px;
    .main-title {
      width: 497px;
      height: 131px;
      margin: auto;
      background: url('../../assets/xkdimg/title.png');
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .main-box {
      width: 100%;
      padding: 0 30px;
      height: auto;
      .qrCode-box {
        width: 100%;
        height: auto;
        background: #ffffff;
        margin-top: 40px;
        border-radius: 9px;
        padding-top: 15px;
        padding-bottom: 15px;
        .qrCode-title-box {
          padding: 0 10px;
          display: flex;
          text-align: left;
          align-items: center;
          justify-content: space-around;
          .qrCode-title {
            font-size: 32px;
            width: 70%;
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
          font-size: 30px;
          font-weight: 500;
          margin-top: 20px;
        }
      }
      .nav-box {
        width: 100%;
        height: 125px;
        background: url('../../assets/xkdimg/nav-bg.png');
        background-size: 100% 100%;
        margin-top: 15px;
        display: flex;
        align-items: center;
        position: relative;
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
            font-weight: 700;
            // text-align: center;
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
          width: calc((98% / 4));
          // height: 100%;
          .item-bottom-num {
            color: #333333;
            font-size: 38px;
            margin-top: 40px;
            width: 100%;
            padding: 0 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .item-bottom-title {
            // color: #999999;
            // font-size: 30px;
            // margin-top: 10px;
            // padding: 0 15px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
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
        i {
          width: 30px;
          height: 30px;
          background: url('../../assets/xkdimg/re-tag.png');
          background-size: 100% 100%;
          margin-left: 18px;
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

// 超出两行 隐  藏
.contentshoptext {
  font-size: 30px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
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
