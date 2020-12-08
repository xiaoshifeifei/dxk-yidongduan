<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
    >
      <div class="configurationss-box">
        <div class="item-box">
          <div class="item" v-for="(item, index) in itemLists" :key="index">
            <div class="item-msg">
              <div class="item-title-box">
                {{ item.nickname || '' }}<span v-if="item.nickname && item.username"> / </span>{{ item.username || '' }}
              </div>
              <div class="item-text-box">
                {{ item.create_time }}
              </div>
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
import { getAgentList, getNewList } from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      datarows: [],
      itemList: [],
      itemLists: [],
      loading: false,
      page: 1,
      finished: false,
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
      if (paramsStr == 'qudao') {
        getAgentList({
          page: this.page,
          limit: 10,
        }).then((res) => {
          // this.itemList = res.data.rows
           res.data.rows.map((item)=>{
            console.log('item',this.mobilePhonefun(item.nickname));
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
          console.log(' this.itemLists', this.itemLists);

          //如果列表数据条数>=总条数，不再触发滚动加载  返回的总数字段需要
          if (this.itemLists.length >= this.total) {
            this.finished = true
          }
        })
      } else if (paramsStr == 'fenxiao') {
        getNewList({
          page: this.page,
          limit: 10,
        }).then((res) => {
          // this.itemList = res.data.rows
            res.data.rows.map((item)=>{
            console.log('item',this.mobilePhonefun(item.nickname));
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
          console.log(' this.itemLists', this.itemLists);

          //如果列表数据条数>=总条数，不再触发滚动加载  返回的总数字段需要
          if (this.itemLists.length >= this.total) {
            this.finished = true
          }
        })
      }

      // getAgentList({
      //   page: 1,
      //   limit: 100,
      // }).then((res) => {
      //   this.datarows = res.data.rows
      // })
    },
    setfun(item) {
      this.$router.push({ name: 'configurationlistDOME', query: { project_id: item.project_id } })
    },
    //滚动加载时触发，list组件定义的方法
    onLoad() {
      console.log('2222')
      this.page++
      this.getList()
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
    height: 100%;
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: auto;
    padding-top: 30px;
    padding-bottom: 60px;
    .item {
      width: 100%;
      height: auto;
      margin-top: 30px;
      border-radius: 30px;
      padding: 30px 45px;
      background: #ffffff;
      .item-msg {
        .item-title-box {
          text-align: left;
          color: #333333;
          font-size: 32px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-text-box {
          text-align: left;
          color: #999999;
          font-size: 26px;
          margin-top: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
