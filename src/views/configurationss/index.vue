<template>
  <div class="configurationss-box">
    <!-- <headercom>
    <div class="header-title" slot="slotname">分销员佣金设置</div>
    <router-link :to="''" slot="textbtn"  class="header-text"></router-link>
    </headercom> -->
    <div class="item-box">
        <div class="item" >
            <div class="item-msg">
                <div class="item-title-box">
                    <i></i>
                    <span>{{$route.query.name?$route.query.name:distributionData.distribute_name}}</span>
                </div>
                <div class="msg-money">
                    渠道佣金
                    <span>￥{{$route.query.money}}</span>
                </div>
            </div>
            <div class="tag2-box">
                <!-- <div class="tag2-title">生效中</div> -->
                <van-cell title="直推分销员" size="large">
                    <template>
                        <van-field v-model="distributionData.setting.level1" placeholder="请输入奖励金额"/>
                    </template>
                </van-cell>
                <van-cell title="一级间推分销员" size="large">
                    <template>
                        <van-field v-model="distributionData.setting.level2" placeholder="请输入奖励金额"/>
                    </template>
                </van-cell>
                <van-cell title="二级间推分销员" size="large">
                    <template>
                        <van-field v-model="distributionData.setting.level3" placeholder="请输入奖励金额"/>
                    </template>
                </van-cell>
                <!-- <van-cell title="生效时间" size="large">
                    <template>
                        <div class="radio-box">
                            <van-radio-group v-model="radiodata">
                            <van-radio name="1">立即生效</van-radio>
                            <van-radio name="2">固定时间生效</van-radio>
                            </van-radio-group>
                        </div>
                    </template>
                </van-cell> -->
                <!-- <van-cell v-if="radiodata=='2'" title="选择时间" is-link :value="date"  @click="dateshow = true" /> -->
                <!-- <van-calendar v-model="dateshow" @confirm="onConfirm" /> -->
            </div>
        </div>
    </div>
    <div v-if="this.$route.query.plat_distribute_config_id" class="btn-box">
        <div class="btn1" @click="submint">保存</div>
    </div>
    <div v-if="this.$route.query.distribute_config_id" class="btn-box2">
        <div class="btn1" @click="submint2">保存</div>
        <div class="btn2" @click="topath('historical',$route.query.distribute_config_id,distributionData.distribute_name,$route.query.money)">查看历史记录</div>
    </div>
  </div>
</template>
<script>
import { getToken,setToken } from '@/utils/auth.js'
import headercom from '../../components/header';
import { Notify } from 'vant';
import { 
    configListDetails,
    configMoneySave,
    configMoneyUpdate
} from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
        // radiodata:'1',
        // date:'请选择时间',
        // dateshow:false
        distributionData:{
            setting:{
                level1:'',
                level2:'',
                level3:'',
            }
        }
    };
  },
  components:{
    headercom
  },
  mounted() {
      if(this.$route.query.distribute_config_id){//修改详情
        configListDetails({
            id:this.$route.query.distribute_config_id
        }).then(res=>{
            this.distributionData=res.data
        })
      }
  },
  methods: {
    topath(path,id,name,money){
      this.$router.push({name:path,query:{distribute_config_id:id,name:name,money:money}})
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.dateshow = false;
      this.date = this.formatDate(date);
    },
    submint(){//保存
      if(this.$route.query.plat_distribute_config_id){//设置
        if((Number(this.distributionData.setting.level1)+Number(this.distributionData.setting.level2)+Number(this.distributionData.setting.level3))<=Number(this.$route.query.money)){
            configMoneySave({
                plat_distribute_config_id:this.$route.query.plat_distribute_config_id,
                type:1,
                setting:this.distributionData.setting
            }).then(res=>{
                if(res.code==0){
                Notify({ type: 'success', message: '设置成功' ,duration:1000});
                setTimeout(()=>{
                this.$router.push('configurationlist')
                },1000)
                }
            })
        }else{
            Notify({ type: 'danger', message: '分销员设置金额总和，必须等于平台释放资金！' });
        }
      }
    },
    submint2(){//修改
      if(this.$route.query.distribute_config_id){
          configMoneyUpdate({
              id:this.$route.query.distribute_config_id,
              type:1,
              setting:this.distributionData.setting
          }).then(res=>{
            if(res.code==0){
            Notify({ type: 'success', message: '修改成功' ,duration:1000});
            setTimeout(()=>{
              this.$router.push('configurationlist')
            },1000)
            }
          })
      }
    }
  },
};
</script>
<style lang="less" scoped>
  .configurationss-box {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    /deep/.van-cell__title{
        text-align: left;
        padding-left: 5px;
    }
    .van-cell__value{
        position: initial;
        .van-cell{
            padding: 0;
        }
        /deep/.van-field__control{
            text-align: right !important;
            color: #999999;
        }
    }
    .radio-box{
        width: 75%;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        /deep/.van-radio-group{
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
    .item-box {
      width: 100%;
      height: 100%;
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100%;
      margin: auto;
      padding-top: 130px;
      padding-bottom: 60px;
      .item{
          width: 100%;
          height: auto;
          margin-top: 50px;
          border-radius: 30px;
          padding: 0 10px;
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
          .tag2-box{
              margin-top: 30px;
            //   .tag2-title{
            //       color: #146EEB;
            //       padding: 0 45px;
            //       text-align: left;
            //       font-size: 36px;
            //       font-weight: 600;
            //       margin-top: 25px;
            //   }
              .van-cell--large .van-cell__title{
                  text-align: left;
                  font-size: 13px;
                  color: #333333;
                  padding-left: 5px;
              }
              .van-cell__value{
                  font-size: 13px;
              }

          }
      }
    }
    .btn-box{
        margin: auto;
        width: 100%;
        position: fixed;
        bottom: 0;
        .btn1{
            background: #146EEB;
            color: #ffffff;
            font-size: 32px;
            height: 90px;
            line-height: 90px;
        }
    }
    .btn-box2{
        margin: auto;
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        .btn1{
            background: #146EEB;
            color: #ffffff;
            font-size: 32px;
            height: 90px;
            line-height: 90px;
            width: 50%;
        }
        .btn2{
            background: #ffffff;
            color: #999999;
            font-size: 32px;
            height: 90px;
            line-height: 90px;
            width: 50%;
            border-top: 1px solid #f1f1f1;
        }
    }
  }
</style>
