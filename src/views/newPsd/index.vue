<template>
  <div class="newPsd-box">
    <headercom>
      <router-link :to="'distributionlogin'" slot="textbtn"  class="header-text">登录</router-link>
    </headercom>
    <div class="mainbg">
      <div class="main-box">
        <div class="title-box">
            忘记密码
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
          <div class="psd-box">
          <van-field
            v-model="password"
            type="password"
            name="密码"
            left-icon="yonghu"
            placeholder="请输入密码"
            :rules="[{ required: true, }]"
          />
          <div class="code-tag"></div>
          </div>
          <div style="margin-top: 16px;">
            <van-button round block type="info" native-type="submit">
              确认修改
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import headercom from '../../components/header';
import {
  sendCode,
  newPsd
} from "@/api/user.js";
export default {
  name: 'index',
  data() {
    return {
      mobilePhone: '',
      codenum: '',
      password:'',
      sendCode: true, // 控制发送验证码按钮显示
      authTime: 0, // 倒计时
      item:'',
      isbtn:false,
    };
  },
  components:{
    headercom
  },
  created(){
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
      newPsd({
        username:this.mobilePhone,
        verify:this.codenum,
        password:this.password
      }).then(res=>{
        if(res.code===0){
          this.$toast({
            message: "修改成功！",
            duration: 1000
          });
          setTimeout(()=>{
              this.$router.push("distributionlogin")
          },1000)
          }
      })
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
  .newPsd-box {
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
</style>
