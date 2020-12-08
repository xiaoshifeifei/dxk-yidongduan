<template>
  <div class="configurationss-box">
    <!-- <headercom>
    <div class="header-title" slot="slotname">分销员佣金设置</div>
    <router-link :to="''" slot="textbtn"  class="header-text"></router-link>
    </headercom> -->
    <div class="item-box">
        <div class="dome-title">
            <div class="item-title-box">
                <i></i>
                <span>小客抖</span>
            </div> 
        </div>
        <div class="item" v-for="(item,index) in datarows" :key="index">
            <div class="item-msg">
                <div class="item-title-box">
                    <span>{{item.distribute_name}}</span>
                </div>
                <div class="msg-money">
                    渠道佣金
                    <span>￥{{item.value}}</span>
                </div>
                <div v-if="item.distribute_config_id!=0&&item.status==0" class="message-text">已过期，请重新设置</div>
            </div>
            <div class="tag-box">
                <!-- 设置的时候传的是plat_distribute_config_id -->
                <!-- {{item}} -->
                <div v-if="item.distribute_config_id==0" class="tag-btn" @click="topath('configurationss',item.plat_distribute_config_id,1,item.distribute_name,item.value)">设置分销员奖励</div>
                <div v-if="item.distribute_config_id!=0" class="tag-btn" @click="topath('configurationss',item.distribute_config_id,2,item.distribute_name,item.value)">设置分销员奖励</div>
                <div v-if="item.distribute_config_id!=0" class="tag-btn2" @click="topath('historical',item.distribute_config_id,2,item.distribute_name,item.value,item.plat_distribute_config_id)">查看修改记录</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { getToken,setToken } from '@/utils/auth.js'
import headercom from '../../components/header';
import { 
    configListDome
} from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
        datarows:[
            {},
            {}
        ]
    };
  },
  components:{
    headercom
  },
  created(){
      configListDome({
          page:1,
          limit:100,
          project_id:this.$route.query.project_id
      }).then(res=>{
          this.datarows=res.data.rows
      })
  },
  mounted() {
  },
  methods: {
    topath(path,id,tag,name,money,id1){
        if(tag==1){
            this.$router.push({name:path,query:{plat_distribute_config_id:id,money:money,name:name}})
        }else if(tag==2){
            this.$router.push({name:path,query:{distribute_config_id:id,distribute_config_id1:id1,name:name,money:money}})
        }
    }
  },
};
</script>
<style lang="less" scoped>
  .configurationss-box {
    width: 100%;
    height: auto;
    background-color: #F8F8F8;
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
        margin-top:0;
    }
    /deep/.header-tag{
        width: 16px;
        height: 34px;
        background: url("../../assets/xkdimg/item-tag.png");
        background-size: 100% 100%;    
        transform:rotate(180deg)  
    }
    /deep/.header-title{
        color: #333333;
    }
    .dome-title{
        margin-top: 20px;
        .item-title-box{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333333;
            font-size: 34px;
            i{
            width: 48px;
            height: 48px;
            background: url("../../assets/xkdimg/tag.png");
            background-size: 100% 100%;
            margin-right: 15px;
            }
        }
    }
    .item-box {
      width: 90%;
      height: auto;
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100%;
      margin: auto;
      padding-top: 30px;
      padding-bottom: 60px;
      .item{
          width: 100%;
          height: auto;
          margin-top: 30px;
          border-radius: 30px;
          padding: 40px;
          background: #ffffff;
          .item-msg{
              .item-title-box{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #333333;
                  font-size: 36px;
                  font-weight: 600;
                  i{
                    width: 48px;
                    height: 48px;
                    background: url("../../assets/xkdimg/tag.png");
                    background-size: 100% 100%;
                    margin-right: 15px;
                  }
              }
              .msg-money{
                color: #333333;
                font-size: 32px;
                margin-top: 30px;
                span{
                    color: #FFA433;
                    font-size: 40px;
                }
              }
              .message-text{
                  color: #146EEB;
                  font-size: 28px;
                  margin-top: 20px;
              }
          }
          .tag-box{
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 35px;
              .tag-btn{
                  width: 250px;
                  height: 70px;
                  background: #146EEB;
                  color: #ffffff;
                  line-height: 70px;
                  border-radius: 10px;
                  font-size: 30px;
                  margin-right: 25px;
              }
              .tag-btn2{
                  width: 250px;
                  height: 70px;
                  color: #000000;
                  line-height: 70px;
                  border-radius: 10px;
                  font-size: 30px;
                  border: 1px solid #999999;
              }
          }
      }
    }
  }
</style>
