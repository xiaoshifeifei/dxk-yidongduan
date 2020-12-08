<template>
  <div class="configurationss-box">
    <div>
      <div class="s-item1">
        <div class="t-item">推广内容</div>
        <div class="t-item2">
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item v-model="value8" :options="get_project_option" />
          </van-dropdown-menu>
        </div>
      </div>
    </div>
    <div class="s-box">
      <div class="s-item-none">
        <!-- <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value2" :options="[{ text: '是否VIP商户', value: '' },{ text: '是', value: 1 },{ text: '否', value: 0 }]" />
        </van-dropdown-menu>
        <div class="jl"></div>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value3" :options="[{ text: '是否已有蓝V', value: '' },{ text: '是', value: 1 },{ text: '否', value: 0 }]" />
        </van-dropdown-menu>
        <div class="jl"></div> -->
        <van-dropdown-menu active-color="#1989fa">
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
    <div class="configurationss-num">
      共<span>{{ totalPar }}</span
      >个客户
    </div>
    <div>
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
              <!-- <div class="item-title-box" v-if="item.user_name === item.user_tel">
                <div>
                  {{ item.user_name }} <span v-if="item.user_name && item.user_tel">/</span> {{ item.user_tel }}
                  <span></span>
                </div>
                <i></i>
              </div> -->
              <div class="item-title-box">
                <div>
                  {{ item.user_name }} <span v-if="item.user_name && item.user_tel"> / </span> {{ item.user_tel }}
                </div>
                <!-- <i></i> -->
              </div>
              <div class="item-text-box">
                <van-cell title="注册时间" :value="item.create_time" />
                <!-- <van-cell title="会员到期时间" value="无数据" /> -->
                <!-- <van-cell title="累计付费金额" value="无数据" /> -->
                <!-- <van-cell title="所属分销员" :value="item.nickname + '/' + item.username" v-if="myParams == 'qudao'" /> -->
                 <van-cell title="所属分销员"  v-if="item.nickname || item.username">
                 <template>
                  {{ item.nickname }}<span class="custom-value" v-if="item.nickname && item.username"> / </span>{{ item.username }}
                </template>
                </van-cell>
                <!-- <van-cell title="平台申请蓝V" value="无数据" /> -->
                <!-- <van-cell title="已有蓝V" value="无数据" /> -->
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="no-data" v-if="!this.itemLists"></div>
    </div>
  </div>
</template>
<script>
import headercom from '../../components/header'
import {
  get_customer_list,
  get_project,
  getFxList, //项目数据获取
  getFxLists, //项目数据获取
} from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      value8:null,
      totalPar:'',
      itemLists: [],
      loading: false,
      page: 1,
      finished: false,
      value2: '',
      value3: '',
      myParams: '',
      datarows: [],
      projectvalue: null,
      value1: 0,
      svalue: null,
      datashow: false,
      date: [],
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2050, 0, 31),
      get_project_option: [],
      myText: '选择注册时间',
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

      mobilePhonefun(val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    getList() {
      const paramsStr = this.$route.query.teamUsers
      this.myParams = paramsStr
      if (paramsStr == 'qudao') {
        get_project().then((res) => {
          console.log('res', res)
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

      // get_project().then(res=>{
      //   console.log('res',res);
      //   res.data.forEach(item => {
      //     this.get_project_option=[]
      //     this.get_project_option.push({text:item.project_name,value:item.project_id})
      //   });
      //   this.projectvalue=res.data[0].project_id
      // })
      // this.getdatalist()
    },
    getdatalist() {
      get_customer_list({
        page: this.page,
        limit: 10,
        project_id: this.value8,
        from_time: this.date[0],
        to_time: this.date[1],
        keywords: this.svalue,
      }).then((res) => {
        this.totalPar = res.data.total

        res.data.rows.map((item)=>{
            console.log('item',this.mobilePhonefun(item.user_name));
            if (this.mobilePhonefun(item.user_name)) {
              item.user_name = item.user_name.substring(0,3) + '****' + item.user_name.substring(7)
            }
             if (this.mobilePhonefun(item.user_tel)) {
              item.user_tel = item.user_tel.substring(0,3) + '****' + item.user_tel.substring(7)
            }
              if (this.mobilePhonefun(item.nickname)) {
              item.nickname = item.nickname.substring(0,3) + '****' + item.nickname.substring(7)
            }
             if (this.mobilePhonefun(item.username)) {
              item.username = item.username.substring(0,3) + '****' + item.username.substring(7)
            }
          })
        let rows = res.data.rows //请求返回当页的列表

        this.loading = false
        this.total = res.data.total

        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true
          return
        }

        // 将新数据与老数据进行合 并
        this.itemLists = this.itemLists.concat(rows)
        
        


        //如果列表数据条数>=总条数，不再触发滚动加载  返回的总数字段需要
        if (this.itemLists.length >= this.total) {
          this.finished = true
        }
      }).catch(error=>{
        this.loading = false
        this.finished = true
        this.totalPar = "0"
      })
    },
    getdatalists() {
      getFxLists({
        page: this.page,
        limit: 10,
        project_id: this.value8,
        from_time: this.date[0],
        to_time: this.date[1],
        keywords: this.svalue,
      }).then((res) => {
        this.totalPar = res.data.total

         res.data.rows.map((item)=>{
            console.log('item',this.mobilePhonefun(item.user_name));
            if (this.mobilePhonefun(item.user_name)) {
              item.user_name = item.user_name.substring(0,3) + '****' + item.user_name.substring(7)
            }
             if (this.mobilePhonefun(item.user_tel)) {
              item.user_tel = item.user_tel.substring(0,3) + '****' + item.user_tel.substring(7)
            }
          })
        let rows = res.data.rows //请求返回当页的列表

        this.loading = false
        this.total = res.data.total

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
      }).catch(error=>{
        this.loading = false
        this.finished = true
        this.totalPar = "0"
      })
    },
    setfun(item) {
      this.$router.push({ name: 'configurationlistDOME', query: { project_id: item.project_id } })
    },
     onLoad() {
      console.log('2222')
      this.page++
      this.getList()
    },
    onSearch() {
      this.itemLists = []
      this.loading=false
      this.page=1
      this.finished=false
      this.getList()
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
/deep/ .van-cell__value {
  overflow: visible !important;
}

.configurationss-box {
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #f8f8f8;
  .s-inner {
    width: 100%;
    height: 158px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    padding-top: 30px;
    .dropdown-text {
      color: #333333;
      font-size: 34px;
      font-weight: 600;
      height: 70px;
      line-height: 70px;
    }
    .dropdown-div {
      width: 218px;
      height: 70px;
    }
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
  .s-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 40px;
    .s-item {
      width: calc(100%);
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
      // display: flex;
      // flex-direction: row;
      // justify-content: space-between;
      width: 100%;
      /deep/.van-dropdown-menu__bar {
        width: 100%;
        height: 2rem;
        box-shadow: none;
        border: 1px solid #dddddd;
        border-radius: 5px;
        /deep/ .van-dropdown-menu {
          width: 100%;
          /deep/ .van-dropdown-menu__item {
          min-width: 70px;
        }
        }
        
      }
      /deep/.van-ellipsis {
        font-size: 12px;
        color: #999999;
      }
      .jl {
        margin-left: 10px;
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
    margin-bottom: 30px;
    padding: 0 10px;
    span {
      color: #146eeb;
      font-size: 40px;
      font-weight: 600;
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
          i {
            min-width: 75px;
            height: 34px;
            background: url('../../assets/xkdimg/tag2.png');
            background-size: 100% 100%;
            margin-left: 15px;
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
        }
      }
    }
  }
}

.s-item1 {
  position: relative;
  .t-item {
    text-align: left;
    height: 100px;
    line-height: 100px;
    background-color: #ffffff;
    padding-left: 40px;
    font-size: 32px;
    font-weight: 700;
    width: 100%;
  }
  .t-item2 {
    position: absolute;
    right: 5%;
    top: 10%;
    width: 40%;
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
}
</style>
