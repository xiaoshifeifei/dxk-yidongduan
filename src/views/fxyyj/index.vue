<template>
  <div class="configurationss-box" v-if="datarows.length > 0">
    <div class="s-box"  >
      <div class="s-item-none">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value8" :options="get_project_option" />
        </van-dropdown-menu>
        <div class="jl"></div>
        <div class="s-item2-box">
          <van-search v-model="svalue" show-action placeholder="请输入商户名称/手机号" @search="onSearch">
            <template #action>
              <van-button type="info" size="mini" @click="onSearch">查询</van-button>
            </template>
          </van-search>
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="item" v-for="(item, index) in datarows" :key="index">
        <div class="item-msg" @click="topath('ordersCount',item)">
          <div class="item-title-box" >
            <div class="spans">
              <span class="span5">
                {{ item.username }} <span v-if="item.username && item.nickname"> / </span> {{ item.nickname }}
                <span></span>
              </span>
              <span class="span6"><img src="../../assets/xkdimg/xy.png" alt=""></span>
            </div>
            <!-- <i></i> -->
          </div>
          <div class="prona">
            {{ item.project_name }}
          </div>
          <div class="item-text-box" v-if="item.agent_amount || item.agent_total_amount">
            <van-cell title="佣金金额" value-class="vaClass" v-if="item.agent_amount >= 0" :value="'￥' + item.agent_amount" />
            <van-cell title="佣金金额" value-class="vaClass" v-if="item.agent_total_amount >= 0" :value="'￥' + item.agent_total_amount" />
          </div>
           <div class="item-text-box" v-else>
            <van-cell title="佣金金额" value-class="vaClass"  :value="'￥' + '0'" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="bgimg">
    <div class="img-bgc">

    </div>
    <div class="textbg">
      暂无任何数据
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
  getCommission, //获取分销员佣金详情列表数据
  getCommissionList, //获取组织总佣金列表数据
  getAgent, //获取分销员佣金列表数据
} from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      value8:null,
      value2: '',
      myParams: '',
      datarows: [
        {
          id: 79,
          create_time: '2020-10-22 11:01:30',
          agent_level: 1,
          agent_level_text: '一级直推',
          agent_amount: '100.00',
          order_amount: '588.00',
          agent_id: 91,
          username: '15715923370',
          nickname: '15715923370',
          project_id: 4,
          project_name: '小客抖test',
          order_type_name: '蓝V订单',
        },
      ],
      orderCounts: {},
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
    console.log(111);
    const paramsStr = this.$route.query.teamUsers
    this.myParams = paramsStr
      getFxList().then((res) => {
        res.data.forEach((item) => {
          this.get_project_option = [{ text: '全部推广产品', value: null }]
          this.get_project_option.push({ text: item.project_name, value: item.project_id })
        })
        this.projectvalue = res.data[0].project_id
      })
      this.getdatalists()
  },
  mounted() {},
  methods: {
       mobilePhonefun(val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    getdatalists() {
      getAgent({
        page: 1,
        limit: 100,
        project_id: this.value8,
        keywords: this.svalue,
      }).then((res) => {
         res.data.rows.map((item)=>{
            if (this.mobilePhonefun(item.username)) {
              item.username = item.username.substring(0,3) + '****' + item.username.substring(7)
            }
             if (this.mobilePhonefun(item.nickname)) {
              item.nickname = item.nickname.substring(0,3) + '****' + item.nickname.substring(7)
            }
          })
        this.datarows = res.data.rows
        
      })
    },
    topath(path,item){
      this.$router.push({
        name:path,
        query: { teamUsers: 'fenxiaoyj',params:item.id } 
      })

    },
    setfun(item) {
     
      this.$router.push({ name: 'configurationlistDOME', query: { project_id: item.project_id } })
    },
    onSearch() {
      this.getdatalists()
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

    .s-item-none {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      /deep/.van-dropdown-menu__bar {
        width: 100%;
        height: 2rem;
        box-shadow: none;
        border: 1px solid #dddddd;
        border-radius: 5px;
        /deep/ .van-dropdown-menu__item {
          min-width: 100px;
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
    .span1 {
      color: #146eeb;
      font-size: 40px;
      font-weight: 600;
    }
    .span2 {
      // color: #146eeb;
      font-size: 40px;
      font-weight: 600;
    }
    .span3 {
      color: #f8aa41;
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
    width: 30%;
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
    img {
   color: black;

    }
  }
}
.prona {
  width: 100%;
  font-size: 32px;
  font-weight: 700;
  text-align: left;
  margin-top: 10px;
}
.vaClass {
  color: #ffa438;
  font-size: 32px;
}
.configurationss-box .s-box .s-item2-box .van-button--info[data-v-b314a4de] {
    border-radius: 5px;
    height: 1.8rem;
    min-width: 2.5rem;
}
.bgimg {
  width: 100%;
  height: 100%;
  background-color: #F8F8F8;
  padding-top: 50%;
  
  .img-bgc {
    width: 264px;
    height: 264px;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: #F8F8F8;
    background-repeat: no-repeat;
    background-image: url("../../assets/xkdimg/wrw.png");
    background-size: 100% 100%;
    background-position:center ;
  }
  .textbg {
    padding-top: 40px;
    font-size: 32px;
    font-weight: 700;
  }
}
</style>
