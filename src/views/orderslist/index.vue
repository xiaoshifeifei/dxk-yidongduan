<template>
  <div class="configurationss-box">
    <div class="s-box">
      <div class="s-item">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value8" :options="get_project_option" />
        </van-dropdown-menu>
      </div>
      <div class="s-item-none">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" @open="datashow = true" :options="[{ text: myText, value: 0 }]" />
        </van-dropdown-menu>
        <van-calendar
          v-model="datashow"
          color="#1989FA"
          :min-date="minDate"
          :max-date="maxDate"
          type="range"
          @confirm="onConfirm"
        />
      </div>
      <div class="s-item2-box">
        <van-search v-model="svalue" show-action placeholder="请输入商户名称/手机号" @search="onSearch">
          <template #action>
            <van-button type="info" @click="onSearch">查询</van-button>
          </template>
        </van-search>
      </div>
    </div>
    <div class="configurationss-num" style="marginBottom:5px">
      共<span>{{ totalPar }}</span
      >笔订单
    </div>
    <div class="configurationss-num" style="marginBottom:2px">累计订单金额:{{ ondata.order_total_amount }}</div>
    <div class="configurationss-num" style="marginBottom:10px">
      共获得佣金:<span class="configurationss-num-color">{{ ondata.team_total_amount }}</span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
    >
      <div class="item-box">
        <div class="item" v-for="(item, index) in itemLists" :key="index">
          <div class="item-msg">
            <!-- <div class="item-title-box" v-if="item.username === item.nickname">
              <div>
                {{ item.username }}
              </div>
              <i></i>
            </div> -->
            <div class="item-title-box">
              <!-- <div>{{ item.username }}<span v-if="item.username && item.nickname"> / </span> {{ item.nickname }}</div> -->
              <!-- <i></i> -->
              <div class="spans">
                <span class="span5">
                  {{ item.user_tel }} <span v-if="item.user_tel && item.user_name">/</span> {{ item.user_name }}
                  <span></span>
                </span>
                <span class="span6">{{ item.agent_level_text }}</span>
              </div>
            </div>
            <div class="item-title-box" style="marginTop:10px">
              {{ item.project_name }}
            </div>
            <div class="item-text-box">
              <van-cell title="佣金金额">
                <template>
                  <span class="custom-value">￥{{ item.team_amount || item.agent_amount }}</span>
                </template>
              </van-cell>
              <van-cell title="下单时间" :value="item.create_time" />
              <van-cell title="订单类型" :value="item.order_type_name" />
              <van-cell title="订单金额" :value="item.amount">
                <template>
                  <span class="custom-value">￥{{ item.order_amount }}</span>
                </template>
              </van-cell>
              <!-- <van-cell title="所属分销员" v-if="item.nickname || item.username" :value="item.nickname + '/' + item.username" /> -->

              <van-cell title="所属分销员" v-if="item.nickname || item.username">
                <template>
                  {{ item.nickname }}<span v-if="item.nickname && item.username"> / </span>{{ item.username }}
                </template>
              </van-cell>
              <!-- <van-cell title="所属分销员" v-if="item.agent_name || item.agent_tel" :value="item.agent_name + '/' + item.agent_name" /> -->

              <van-cell title="所属分销员" v-if="item.agent_name || item.agent_tel">
                <template>
                  {{ item.agent_name }}<span v-if="item.agent_name && item.agent_tel"> / </span>{{ item.agent_tel }}
                </template>
              </van-cell>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <div class="no-data" v-if="!this.itemLists"></div>
  </div>
</template>
<script>
import headercom from '../../components/header'
import { get_project, get_order_list, getCommission } from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      value8: null,
      totalPar: '',
      myParams: '',
      itemList: [],
      itemLists: [],
      loading: false,
      page: 1,
      finished: false,
      datarows: [],
      ondata: {
        order_total_amount: '0.00',
        team_total_amount: '0.00',
      },
      projectvalue: null,
      myText: '选择注册时间',
      value1: 0,
      svalue: null,
      datashow: false,
      total: 0,
      date: [],
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2050, 0, 31),
      get_project_option: [],
      myParams: '',
    }
  },
  components: {
    headercom,
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      const paramsStr = this.$route.query.teamUsers
      this.myParams = paramsStr
      if (paramsStr == 'qudao') {
        get_project().then((res) => {
          res.data.forEach((item) => {
            this.get_project_option = [{ text: '全部推广产品', value: null }]
            this.get_project_option.push({ text: item.project_name, value: item.project_id })
          })
          this.projectvalue = res.data[0].project_id
        })
        this.getdatalist()
      } else if (paramsStr == 'fenxiao') {
        getFxList().then((res) => {
          console.log('res', res)
          res.data.forEach((item) => {
            this.get_project_option = [{ text: '全部推广产品', value: null }]
            this.get_project_option.push({ text: item.project_name, value: item.project_id })
          })
          this.projectvalue = res.data[0].project_id
        })
        this.getdatalists()
      }
    },
    mobilePhonefun(val) {
      return /^1[3456789]\d{9}$/.test(val)
    },

    getdatalist() {
      get_order_list({
        page: this.page,
        limit: 10,
        project_id: this.value8,
        from_time: this.date[0],
        to_time: this.date[1],
        keywords: this.svalue,
      }).then((res) => {
        this.datarows = res.data.rows
        this.ondata = res.data.total

        this.totalPar = res.data.list.total

        res.data.list.rows.map((item) => {
          console.log('item', this.mobilePhonefun(item.username))
          if (this.mobilePhonefun(item.agent_name)) {
            item.agent_name = item.agent_name.substring(0, 3) + '****' + item.agent_name.substring(7)
          }
          if (this.mobilePhonefun(item.agent_tel)) {
            item.agent_tel = item.agent_tel.substring(0, 3) + '****' + item.agent_tel.substring(7)
          }
          if (this.mobilePhonefun(item.user_name)) {
            item.user_name = item.user_name.substring(0, 3) + '****' + item.user_name.substring(7)
          }
          if (this.mobilePhonefun(item.user_tel)) {
            item.user_tel = item.user_tel.substring(0, 3) + '****' + item.user_tel.substring(7)
          }
        })

        let rows = res.data.list.rows //请求返回当页的列表

        this.loading = false
        this.total = res.data.list.total

        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true
          return
        }

        // 将新数据与老数据进行合 并
        this.itemLists = this.itemLists.concat(rows)
        console.log('this.itemLists', this.itemLists)

        //如果列表数据条数>=总条数，不再触发滚动加载  返回的总数字段需要
        if (this.itemLists.length >= this.total) {
          this.finished = true
        }
      })
    },
    getdatalists() {
      getCommission({
        page: this.page,
        limit: 10,
        project_id: this.value8,
        from_time: this.date[0],
        to_time: this.date[1],
        keywords: this.svalue,
      }).then((res) => {
        this.datarows = res.data.rows
        this.ondata = res.data.total

        this.totalPar = res.data.list.total
        let rows = res.data.rows //请求返回当页的列表

        this.loading = false
        this.total = res.data.list.total

        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true
          return
        }

        // 将新数据与老数据进行合 并
        this.itemLists = this.itemLists.concat(rows)
        console.log(' this.itemLists', this.itemLists)

        //如果列表数据条数>=总条数，不再触发滚动加载  返回的总数字段需要
        if (this.itemLists.length >= this.total) {
          this.finished = true
        }
      })
    },
    setfun(item) {
      this.$router.push({ name: 'configurationlistDOME', query: { project_id: item.project_id } })
    },
    onLoad() {
      this.page++
      this.getList()
    },
    onSearch() {
      this.itemLists = []
      ;(this.loading = false), (this.page = 1), (this.finished = false), this.getList()
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    onConfirm(date) {
      const [start, end] = date
      this.datashow = false
      this.date[0] = this.formatDate(start)
      this.date[1] = this.formatDate(end)
      this.myText = this.formatDate(start) + '至' + this.formatDate(end)
    },
  },
}
</script>
<style lang="less" scoped>
.configurationss-box {
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #f8f8f8;
  .s-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 40px;
    .s-item {
      width: calc(95% / 2);
      /deep/.van-dropdown-menu__bar {
        height: 2rem;
        box-shadow: none;
        border: 1px solid #dddddd;
        border-radius: 5px;
      }
      /deep/.van-ellipsis {
        color: #999999;
      }
    }
    .s-item-none {
      width: calc(95% / 2);
      /deep/.van-dropdown-menu__bar {
        height: 2rem;
        box-shadow: none;
        border: 1px solid #dddddd;
        border-radius: 5px;
      }
      /deep/.van-ellipsis {
        color: #999999;
      }
      /deep/.van-dropdown-item--down {
        display: none !important;
      }
    }
    .s-item2-box {
      width: 100%;
      margin-top: 20px;
      .van-search {
        padding: 0;
        background: none;
        .van-search__content {
          height: 2rem;
          border: 1px solid #dddddd;
          border-radius: 5px;
          background: #fff;
          .van-cell {
            display: flex;
            align-items: center;
          }
        }
      }
      .van-search__action {
        padding-right: 0;
      }
      .van-button--info {
        border-radius: 5px;
        height: 2.2rem;
        min-width: 5rem;
      }
    }
  }
  .configurationss-num {
    width: 90%;
    margin: auto;
    text-align: left;
    font-size: 32px;
    font-weight: 600;
    padding: 0 10px;
    span {
      color: #146eeb;
      font-size: 40px;
      font-weight: 500;
    }
    .configurationss-num-color {
      color: #ffa433;
      font-size: 40px;
      font-weight: 500;
    }
  }
  .item-box {
    width: 90%;
    height: 100%;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: auto;
    padding-bottom: 60px;
    .item {
      width: 100%;
      height: auto;
      margin-bottom: 30px;
      border-radius: 30px;
      padding: 25px 30px;
      background: #ffffff;
      .item-msg {
        .item-title-box {
          text-align: left;
          color: #333333;
          font-size: 32px;
          font-weight: 600;
          width: 100%;
          display: flex;
          align-items: center;
          div {
            min-width: 400px;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .item-text-box {
          text-align: left;
          color: #999999;
          font-size: 26px;
          margin-top: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .van-cell {
            padding: 10px 0px;
            color: #333333;
            font-size: 13px;
            padding-bottom: 2px;
          }
          .van-cell::after {
            display: none;
          }
          .custom-value {
            color: #ffa433;
            font-size: 38px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
.spans {
  width: 100%;
  position: relative;
  .span5 {
    width: 70%;
  }
  .span6 {
    position: absolute;
    right: 0;
    width: 30%;
    text-align: right;
  }
}
</style>
