<template>
  <div class="mains">
    <headercom>
      <router-link :to="'register'" slot="textbtn" class="header-text">注册</router-link>
    </headercom>
    <div class="mainbg">
      <div class="main-box">
        <div class="title-box">
          渠道商登录
          <div class="title-btn" @click="tologin('distributionlogin')"></div>
        </div>
        <van-form @submit="onSubmit">
          <div class="ioc-box">
            <van-field
              @focus="myFocus"
              @blur="myblur"
              v-model="mobilePhone"
              name="用户名"
              placeholder="请输入手机号"
              left-icon="yonghu"
              :rules="[{ required: true, validator: mobilePhonefun }]"
              type="number"
            />
            <div class="code-tag"></div>
          </div>
          <div class="psd-box">
            <van-field
              v-model="password"
              type="password"
              @focus="myFocus"
              @blur="myblur"
              name="密码"
              left-icon="yonghu"
              placeholder="请填写密码"
              :rules="[{ required: true }]"
            />
            <div class="code-tag"></div>
          </div>

          <div style="margin-top: 16px;">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
        <div class="bottom-btn">
          <div class="toNewpsd bottom-item" @click="tologin('newPsd')">忘记密码？</div>
          <div class="toCodeLogin bottom-item" @click="toCodeLogin('channel')">验证码登录</div>
        </div>
      </div>
    </div>
    <div class="ous-btn" v-if="myParamsShow">
      <i class="ous-btn-tag"></i>
      联系客服
      <a :href="'tel:' + getServiceTel">{{ getServiceTel }}</a>
    </div>
  </div>
</template>
<script>
import { login, getUser, getServiceTel } from '@/api/user.js'
import { getToken, setToken } from '@/utils/auth.js'
import headercom from '../../components/header'
import { NumberKeyboard } from 'vant'
export default {
  name: 'index',
  data() {
    return {

      myParamsShow: true,
      mobilePhone: '', //手机号码
      password: '', //密码
      item: '',
      getServiceTel: '',
    }
  },
  components: {
    headercom,
  },
  mounted() {
    getServiceTel().then((res) => {
      this.getServiceTel = res.data.service_tel
    })
  },
  methods: {
    myFocus(e) {
      console.log('e', e)
      this.myParamsShow = false
    },
    myblur() {
      console.log(222)
      this.myParamsShow = true
    },
    mobilePhonefun(val) {
      return /^1[3456789]\d{9}$/.test(this.mobilePhone)
    },
    // passwordfun(val){
    //   return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(val)
    // },
    onSubmit(values) {
      if (values) {
        login({
          username: this.mobilePhone,
          password: this.password,
          type: 1,
        }).then((res) => {
          if (res.code === 0) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('tokentag', 1)
            getUser().then((res) => {
              this.item = res.data
            })
            this.$toast({
              message: '登录成功！',
              duration: 1000,
            })
            setTimeout(() => {
              this.$router.push({ path: 'channel', query: { item: this.item } })
            }, 1000)
          }
        })
      }
    },
    tologin(path) {
      this.$router.push(path)
    },
    toCodeLogin(tag) {
      this.$router.push({ path: 'codelogin', query: { tag: tag } })
    },
  },
}
</script>
<style lang="less" scoped>
.mains {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  position: relative;
  .mainbg {
    width: 100%;
    height: auto;
    background: url('../../assets/xkdimg/login-bg.png');
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
      .title-box {
        height: 100px;
        line-height: 100px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        position: relative;
      }
      .title-btn {
        width: 160px;
        height: 45px;
        background: url('../../assets/xkdimg/check-tag.png');
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
      }
      .btn {
        width: 100%;
        background-color: #146eeb;
        height: 100px;
        border-radius: 50px;
        margin-top: 50px;
        line-height: 100px;
        color: #fff;
        font-size: 34px;
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
    .bottom-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .bottom-item {
        margin-top: 40px;
        font-size: 30px;
        color: #999999;
        border-bottom: 1px solid #999999;
        line-height: 28px;
      }
    }
  }
  .ous-btn {
    align-items: center;
    font-size: 28px;
    margin: auto;
    margin-top: 350px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    .ous-btn-tag {
      width: 26px;
      height: 26px;
      background: url('../../assets/xkdimg/call-tall.png');
      background-size: 100% 100%;
      margin-right: 10px;
    }
    a {
      color: #146eeb;
      margin-left: 10px;
    }
  }
}
</style>
