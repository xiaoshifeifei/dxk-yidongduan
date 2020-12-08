<template>
  <div class="mains">
    <!-- <headercom>
      <router-link :to="'distributionlogin'" slot="textbtn"  class="header-text">登录</router-link>
    </headercom> -->
    <div class="mainbg">
      <div class="main-box">
        <div class="title-box">
          个人分销员注册
        </div>
        <van-form @submit="onSubmit">
        <div class="ioc-box">
        <van-field
            v-model="mobilePhone"
            name="用户名"
            placeholder="请输入手机号"
            left-icon="yonghu"
            :rules="[{ required: true,validator: mobilePhonefun, }]"
            type="number"
        />
        <div class="code-tag"></div>
        </div>
        <div class="code-box">
          <van-field
              v-model="codenum"
              name="验证码"
              left-icon="yonghu"
              placeholder="请输入验证码"
              :rules="[{ required: true, validator: codefun, }]"
          />
        <div class="code-tag"></div>
        <div class="code-btn" v-show="sendCode" @click="ObtainCode()" >获取验证码</div>
        <div class="code-btn2" v-show="!sendCode">{{authTime}} S</div>
        </div>
        <div class="psd-box">
          <van-field
            v-model="password"
            type="password"
            name="密码"
            left-icon="yonghu"
            placeholder="请设置8-16位密码"
            :rules="[{ required: true, }]"
          />
          <div class="code-tag"></div>
        </div>
        <div class="cannel-num-box">
          <van-field
              v-model="inviteCode"
              name="渠道码"
              placeholder="请输入渠道码"
              left-icon="yonghu"
              :rules="[{ required: true, validator: inviteCodefun, }]"
          />
          <div class="code-tag"></div>
        </div>
        <a :href="'tel:'+getServiceTel" class="text-box">
          如不知渠道码，可联系客服<span>联系客服</span>
        </a>
        <div style="margin-top: 20px;">
          <van-button round block type="info" native-type="submit">
            注册并登录
          </van-button>
        </div>
        </van-form>
      </div>
    </div>
    <div  class="ous-btn">
      <input type="checkbox" v-model="checked">
      我已认真阅读并同意<router-link class="agreementcolor" :to="'agreement'">《用户协议》</router-link>和<router-link class="agreementcolor" :to="'privacyAgreement'">《隐私协议》</router-link>
    </div>
  </div>
</template>
<script>
import { 
register ,
sendCode,
login,
getUser,
getServiceTel
} from '@/api/user.js'
import { getToken,setToken } from '@/utils/auth.js'
import headercom from '../../components/header';
export default {
  name: 'index',
  data() {
    return {
      mobilePhone: '',//手机号
      codenum: '',//验证码
      password: '',//密码
      inviteCode:'',//渠道码
      sendCode: true, // 控制发送验证码按钮显示
      authTime: 0, // 倒计时
      checked:false,
      isbtn:false,
      getServiceTel:''
    };
  },
  components:{
    headercom
  },
  mounted() {
    getServiceTel().then(res=>{
      this.getServiceTel=res.data.service_tel
    })
  },
  methods: {
    mobilePhonefun(mobilePhonefun){
       this.isbtn=/^1[3456789]\d{9}$/.test(this.mobilePhone)
       return this.isbtn
    },
    codefun(val){
      return /^\d{4}$/.test(val)
    },
    // passwordfun(val){
    //   return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(val)
    // },
    inviteCodefun(val){
      return /^\d{8}$/.test(val)
    },
    onSubmit(values) {
      if(this.checked){
        register({
          username:this.mobilePhone,
          password:this.password,
          verify:this.codenum,
          code:this.inviteCode,
        }).then(res=>{
          if(res.code===0){
            this.$toast({
              message: "注册账号成功,即将自动登录！",
              duration: 1000
            });
            setTimeout(()=>{
              login({
                username:this.mobilePhone,
                password:this.password,
                type:0
              }).then(res=>{
                if(res.code===0){
                  localStorage.setItem("token",res.data.token)
                  localStorage.setItem("tokentag",2)
                  setTimeout(()=>{
                    this.$router.push({path:'distribution'})
                  },1000)
                  }
              })
            },1000)
          }
        })
      }else{
        this.$toast({
          message: "请同意用户协议！",
          duration: 1000
        });
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
    min-height: 100%;
    background-color: #F8F8F8;
    position: relative;
    .mainbg {
      width: 100%;
      height: auto;
      background: url("../../assets/xkdimg/login-bg.png");
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100%;
      padding-top: 210px;
      padding-bottom: 120px;
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
        }
        .title-btn{
          width: 160px;
          height: 45px;
          background: url("../../assets/xkdimg/check-tag.png");
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 35px;
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
    .cannel-num-box{
      position: relative;
      .code-tag{
          width: 32px;
          height: 32px;
          background: url('../../assets/xkdimg/cannel-num.png');
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 40px;
      }
    }
    .text-box{
      color: #999999;
      text-align: left;
      padding: 0 15px;
      font-size: 25px;
      span{
        color: #1989fa;
        margin-left: 15px;
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
    .psd-box{
        position: relative;
        .code-tag{
            width: 32px;
            height: 32px;
            background: url('../../assets/xkdimg/psd.png');
            background-size: 100% 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 40px;
        }
    }
    }
    .ous-btn{
      width: 690px;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #999999;
      margin: auto;
      margin-top: 130px;
      padding-bottom: 30px;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      .agreementcolor{
        color: #146EEB;
      }
      input{
        margin-right: 10px;
      }
      span{
        color: #146EEB;
        margin-left: 10px;
      }
    }
  }
</style>
