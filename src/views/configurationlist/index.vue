<template>
  <div class="configurationss-box">
    <!-- <headercom>
    <div class="header-title" slot="slotname">分销员佣金设置</div>
    <router-link :to="''" slot="textbtn"  class="header-text"></router-link>
    </headercom> -->
      <div>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
    <div class="item-box" v-if="itemLists.length > 0">
      <div class="item" v-for="(item, index) in itemLists" :key="index">
        <div class="item-msg">
          <div class="item-title-box">
            <i></i>
            <span>{{ item.project_name }}</span>
          </div>
        </div>
        <div class="tag1-box">
          <div class="tag-text">分销员佣金设置</div>
          <div class="tag-btn" @click="setfun(item)">去设置</div>
        </div>
      </div>
    </div>
    <div class="bgimg" v-else>
      <div class="img-bgc"></div>
      <div class="textbg" >
        暂无任何推广数据
      </div>
    </div>
    </van-list>
      <div class="no-data" v-if="!this.itemLists"></div>
    </div>
  </div>
</template>
<script>
import { getToken, setToken } from '@/utils/auth.js'
import headercom from '../../components/header'
import { configList, configListMoney, configListread } from '@/api/user.js'
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
      total:'',
      totalPar:'',
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
      configList({
        page: this.page,
        limit: 10,
      }).then((res) => {
        
        this.totalPar = res.data.total
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
      })
    },
      onLoad() {
      this.page++
      this.getList()
    },
    setfun(item) {
      console.log('item', item)
      this.$router.push({ name: 'configurationlistDOME', query: { project_id: item.project_id } })
    },
  },
}
</script>
<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  padding-top: 50%;

  .img-bgc {
    width: 264px;
    height: 264px;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: #f8f8f8;
    background-repeat: no-repeat;
    background-image: url('../../assets/xkdimg/wrw.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .textbg {
    padding-top: 40px;
    font-size: 32px;
    font-weight: 700;
  }
}
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
      padding: 40px;
      background: #ffffff;
      .item-msg {
        .item-title-box {
          display: flex;
          justify-content: center;
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
      .tag1-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 60px;
        .tag-text {
          color: #999999;
          font-size: 32px;
        }
        .tag-btn {
          width: 200px;
          height: 70px;
          color: #ffffff;
          line-height: 70px;
          border-radius: 10px;
          font-size: 30px;
          background: #146eeb;
        }
      }
    }
  }
}
</style>
