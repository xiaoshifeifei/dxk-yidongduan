<template>
  <div class="mains">
    <!-- <headercom>
      <div class="header-title" slot="slotname">注册抖小客</div>
      <router-link :to="''" slot="textbtn"  class="header-text"></router-link>
    </headercom> -->
    <div class="mainbg">
      <div class="login-box">
        <div class="title-box" style="marginBottom:10px">
          邀请人：
          {{ mobile }}
        </div>
        <div class="title-box">
          渠道码：
          {{ code }}
        </div>
        <van-form @submit="onSubmit">
          <div class="ioc-box">
            <van-field
              v-model="mobilePhone"
              name="用户名"
              placeholder="请输入手机号"
              left-icon="yonghu"
              type="number"
              :rules="[{ required: true, validator: mobilePhonefun }]"
            />
            <div class="code-tag"></div>
          </div>
          <div class="code-box">
            <van-field
              v-model="codenum"
              name="验证码"
              left-icon="yonghu"
              placeholder="请输入验证码"
              :rules="[{ required: true }]"
            />
            <div class="code-tag"></div>
            <div class="code-btn" v-show="sendCode" @click="ObtainCode()">获取验证码</div>
            <div class="code-btn2" v-show="!sendCode">{{ authTime }} S</div>
          </div>
          <div class="psd-box">
            <van-field
              v-model="password"
              type="password"
              name="密码"
              left-icon="yonghu"
              placeholder="请输入6-20位密码"
              :rules="[{ required: true }]"
            />
            <div class="code-tag"></div>
          </div>

          <div style="margin-top: 16px;">
            <van-button round block type="info" native-type="submit">
              立即注册
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import { invitationregister, sendCode, getMobileNum } from '@/api/user.js'
import { getToken, setToken } from '@/utils/auth.js'
import headercom from '../../components/header'
import validate from '@/utils/validate'
export default {
  name: 'index',
  data() {
    return {
      mobilePhone: '', //手机号码
      password: '', //密码
      codenum: '', //验证码
      sendCode: true, // 控制发送验证码按钮显示
      authTime: 0, // 倒计时
      code: '',
      yq_code: '',
      mobile: '',
      isbtn: false,
    }
  },
  components: {
    headercom,
  },
  mounted() {
    this.code = validate.getQueryVariable('code')
    this.yq_code = validate.getQueryVariable('yq_code')
    getMobileNum({
      yq_code: this.yq_code,
    }).then((res) => {
      this.mobile = res.data.mobile
    })
  },
  methods: {
    mobilePhonefun(mobilePhonefun) {
      this.isbtn = /^1[3456789]\d{9}$/.test(this.mobilePhone)
      return this.isbtn
    },
    onSubmit(values) {
      if (values) {
        invitationregister({
          username: this.mobilePhone,
          password: this.password,
          verify: this.codenum,
          code: this.code,
          yq_code: this.yq_code,
        })
          .then((res) => {
            console.log(555,res);
            if (res.code == 8110 || res.code == 0  || res.code == 8120) {
              this.$toast({
                message: res.msg,
                duration: 1000,
              })
              setTimeout(() => {
                this.$router.push('download')
              }, 1000)
            } else {
             console.log(res);
            }
          })
          .catch((err) => {
           console.log(err);
          })
      }
    },
    tologin(path) {
      this.$router.push(path)
    },
    ObtainCode() {
      console.log(this.isbtn)
      if (!this.isbtn) {
        this.sendCode = true
        this.$toast({
          message: '手机号输入有误',
          duration: 1000,
        })
        return
      }
      sendCode({
        username: this.mobilePhone,
      }).then((res) => {
        if (res.code === 0) {
          this.$toast({
            message: '验证码发送成功！',
            duration: 1000,
          })
        }
      })
      this.sendCode = false // 控制显示隐藏
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
}
</script>
<style lang="less" scoped>
.mains {
  width: 100%;
  height: 100%;
  background-color: #3990ff;
  // /deep/.van-cell{
  //   overflow: inherit;
  //   margin-bottom: 30px !important;
  // }
  // /deep/.van-field__error-message{
  //   position: absolute;
  //   margin-top: 5px;
  // }
  .mainbg {
    width: 100%;
    height: 100%;
    background: url('../../assets/xkdimg/share-bg.png');
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    .login-box {
      width: 90%;
      background-color: #fff;
      border-radius: 20px;
      padding: 40px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5%;
      .title-box {
        width: 100%;
        height: auto;
        line-height: 50px;
        font-size: 34px;
        text-align: center;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .title-code {
          // word-break: break-all;
          // word-wrap: break-word;
        }
      }
    }
    .van-cell {
      background: url('../../assets/xkdimg/dlk.png');
      background-size: 100% 100%;
      height: auto;
      line-height: 2rem;
      margin-bottom: 10px;
      padding: 10px 21px;
    }
    .van-cell::after {
      display: none;
    }
    .ioc-box {
      position: relative;
      .code-tag {
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
    .code-box {
      position: relative;
      .code-btn {
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
      .code-btn2 {
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
      .code-tag {
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
    .psd-box {
      position: relative;
      .code-tag {
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
}
</style>
