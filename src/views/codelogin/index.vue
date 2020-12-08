<template>
  <div class="mains">
    <headercom>
      <router-link :to="'register'" slot="textbtn"  class="header-text">注册</router-link>
    </headercom>
    <div class="mainbg">
      <div class="main-box">
        <div class="title-box">
          {{routerdata==='channel'?'渠道商登录':'个人分销员登录'}}
          <!-- <div class="title-btn" @click="tologin('channellogin')"></div> -->
        </div>
        <van-form @submit="onSubmit">
        <div class="ioc-box">
          <van-field
            v-model="mobilePhone"
            name="用户名"
            placeholder="请输入手机号"
            left-icon="yonghu"
            :rules="[{ required: true, validator: mobilePhonefun, }]"
            type="number"
            @change="mobilePhonefun"
          />
          <div class="code-tag"></div>
        </div> 
          <div class="code-box">
            <van-field
                v-model="codenum"
                name="验证码"
                left-icon="yonghu"
                placeholder="请输入验证码"
                :rules="[{ required: true,validator: inviteCodefun, }]"
            />
          <div class="code-tag"></div>
          <div class="code-btn" v-show="sendCode" @click="ObtainCode()" >获取验证码</div>
          <div class="code-btn2" v-show="!sendCode">{{authTime}} S</div>
          </div>
          <div style="margin-top: 16px;">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
        <div class="bottom-btn">
            <div @click="tologin('newPsd')" class="toNewpsd bottom-item">忘记密码？</div>
            <div class="toCodeLogin bottom-item" @click="topsdlogin()">密码登录</div>
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
import { getToken,setToken } from '@/utils/auth.js'
import headercom from '../../components/header';
import {
  loginCode,
  sendCode,
  getUser
} from "@/api/user.js";
export default {
  name: 'index',
  data() {
    return {
      mobilePhone: '',
      codenum: '',
      sendCode: true, // 控制发送验证码按钮显示
      authTime: 0, // 倒计时
      item:'',
      isbtn:false,
      routerdata:''//判断是分销商过来的验证码登录还是渠道商
    };
  },
  components:{
    headercom
  },
  watch:{
    mobilePhone(newdata,olddata){
    }
  },
  created(){
    this.routerdata=this.$route.query.tag
  },
  mounted() {
  },
  methods: {
    mobilePhonefun(mobilePhonefun){
       this.isbtn=/^1[3456789]\d{9}$/.test(this.mobilePhone)
       return this.isbtn
    },
    inviteCodefun(val){
      return /^\d{4}$/.test(val)
    },
    onSubmit(values) {
      loginCode({
        username:this.mobilePhone,
        verify:this.codenum,
        type:this.routerdata==='channel'?1:0
      }).then(res=>{
        if(res.code===0){
          localStorage.setItem("token",res.data.token)
          getUser().then(res=>{
            this.item=res.data
          })
          this.$toast({
            message: "登录成功！",
            duration: 1000
          });
          setTimeout(()=>{
            if(this.routerdata==='channel'){
              this.$router.push({path:'channel',query:{item:this.item}})
              localStorage.setItem("tokentag",1)
            }else{
              this.$router.push({path:'distribution',query:{item:this.item}})
              localStorage.setItem("tokentag",2)
            }
          },1000)
          }
      })
    },
    topsdlogin(){
      if(this.routerdata==='channel'){
        this.$router.push('channellogin')
      }else{
        this.$router.push('distributionlogin')
      }
    },
    tologin(path){
      this.$router.push(path)
    },
    ObtainCode () {
      if(!this.isbtn){
          this.sendCode=true
          this.$toast({
            message: "手机号输入有误",
            duration: 1000
          });
          return
      }
      sendCode({
        username:this.mobilePhone
      }).then(res=>{
        if(res.code===0){
          this.$toast({
            message: "验证码发送成功！",
            duration: 1000
          });
        }
      })
      this.sendCode = false  // 控制显示隐藏
      this.authTime = 60
      let timeInt = setInterval(() => {
        this.authTime--
        if (this.authTime <= 0) {
          this.sendCode = true
          window.clearInterval(timeInt)
        }
      }, 1000)
    },
  },
};
</script>
<style lang="less" scoped>
  .mains {
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    // /deep/.van-cell{
    //   overflow: inherit;
    //   margin-bottom: 30px !important;
    // }
    // /deep/.van-field__error-message{
    //   // display: none;
    //   position: absolute;
    //   margin-top: 5px;
    // }
    .mainbg {
      width: 100%;
      height: 100%;
      background: url("../../assets/xkdimg/login-bg.png");
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100%;
      padding-top: 210px;
      .main-box {
        width: 90%;
        background-color: #fff;
        margin: 80px auto 0;
        border-radius: 20px;
        padding: 40px;
        .title-box{
          height: 100px;
          line-height: 100px;
          font-size: 40px;
          font-weight: bold;
          text-align: center;
          position: relative;
        // .title-btn{
        //   width: 160px;
        //   height: 45px;
        //   background: url("../../assets/xkdimg/check-tag.png");
        //   background-size: 100% 100%;
        //   position: absolute;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   right: -20px;
        // }
        }
        .btn{
          width: 100%;
          background-color: #146EEB;
          height: 100px;
          border-radius: 50px;
          margin-top: 50px;
          line-height: 100px;
          color: #fff;
          font-size: 34px;
        }
      }
      .van-cell{
        background: url('../../assets/xkdimg/dlk.png');
        background-size: 100% 100%;
        height: auto;
        line-height: 2rem;
        margin-bottom: 10px;
        padding: 10px 21px;
      }
      .van-cell::after{
        display: none;
      }
    }
    .code-box{
        position: relative;
        .code-btn{
            width: 230px;
            height: 98px;
            background: #1989fa;
            color: #fff;
            font-size: 30px;
            line-height: 98px;
            border-radius: 50px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
        }
        .code-btn2{
            width: 230px;
            height: 98px;
            background: #ccc;
            color: #fff;
            font-size: 30px;
            line-height: 98px;
            border-radius: 50px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            pointer-events: none;
        }
        .code-tag{
            width: 42px;
            height: 42px;
            background: url('../../assets/xkdimg/code3.png');
            background-size: 100% 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 35px;
        }
    }
    .ioc-box{
        position: relative;
        .code-tag{
            width: 32px;
            height: 32px;
            background: url('../../assets/xkdimg/use.png');
            background-size: 100% 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 40px;
        }
    }
    .bottom-btn{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .bottom-item{
            margin-top: 40px;
            font-size: 30px;
            color: #999999;
            border-bottom: 1px solid #999999;
            line-height: 28px;
        }
    }
  }
</style>
