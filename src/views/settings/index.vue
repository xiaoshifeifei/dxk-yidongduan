<template>
  <div class="configurationss-box">
    <div class="item-text-box">
      <van-cell :value="mobile" is-link @click="isShow(1)">
        <template #title>
          <span class="custom-title">手机绑定</span>
        </template>
      </van-cell>
      <van-cell value="" is-link @click="isShow(2)">
        <template #title>
          <span class="custom-title">密码修改</span>
        </template>
      </van-cell>
      <van-cell value="" is-link @click="shows">
        <template #title>
          <span class="custom-title">意见反馈</span>
        </template>
      </van-cell>

      <van-cell value="" is-link>
        <template #title>
          <span class="custom-title">清除缓存</span>
        </template>
      </van-cell>
      <van-cell value="V1.0.0" is-link>
        <template #title>
          <span class="custom-title">当前版本</span>
        </template>
      </van-cell>
      <div class="btn-bl" @click="outlogin()">退出登录</div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="手机号"
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ required: true, validator: mobilePhonefun }]"
            />
            <div>
              <div>
                <van-field
                  v-model="verify"
                  type="verify"
                  name="验证码"
                  label="验证码"
                  placeholder="请输入验证码"
                  :rules="[{ required: true, validator: codefun }]"
                />
              </div>
              <div class="codeb">
                <div class="code-btn" v-show="sendCode" @click="ObtainCode()">获取验证码</div>
                <div class="code-btn2" v-show="!sendCode">{{ authTime }} S</div>
              </div>
            </div>
            <van-field
              v-model="isPassword"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true }]"
            />
            <div class="bit-bto">
              <van-button block type="info" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>

    <van-overlay :show="showOpen" @click="showOpen = false">
      <div @click.stop class="far">
        <van-field v-model="messages" rows="10" autosize type="textarea" placeholder="请输入反馈意见" show-word-limit />
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader v-model="uploader" />
          </template>
        </van-field>
        <div class="bit-bto">
          <van-button block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import headercom from '../../components/header'
import { ImagePreview, Cell, CellGroup, Dialog } from 'vant'
import { get_project, get_order_list, getCommission, getUser, sendCode, changePassword, changeTel } from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
      mobile: '',
      messages: '',
      show: false,
      showOpen: false,
      username: '',
      isPassword: '',
      sendCode: true, // 控制发送验证码按钮显示
      isbtn: false,
      authTime: 0, // 倒计时
      verify: '',
      commitParams: '',
      uesrName: '',
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
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
    shows() {
      this.showOpen = true
    },
    mobilePhonefun(mobilePhonefun) {
      this.isbtn = /^1[3456789]\d{9}$/.test(this.username)
      return this.isbtn
    },
    codefun(val) {
      return /^\d{4}$/.test(val)
    },
    isShow(params) {
      this.verify = ''
      this.isPassword = ''
      this.commitParams = params

      if (params == 1) {
        this.username = ''

        this.show = true
      } else if (params == 2) {
        this.mobilePhonefun()
        this.show = true
      }
    },
    onSubmit(values) {
      if (this.commitParams == 1) {
        if (values) {
          if (this.uesrName == this.username) {
            changeTel({
              username: this.username,
              verify: this.verify,
              password: this.isPassword,
            }).then((res) => {
              this.mobile = this.uesrName
              this.show = false
              this.verify = ''
              this.username = ''
              this.isPassword = ''
            })
          } else {
          }
        }
      } else if (this.commitParams == 2) {
        if (values) {
          changePassword({
            password: this.isPassword,
            verify: this.verify,
          }).then((res) => {
            console.log('res', res)
            this.show = false
            this.verify = ''
            this.username = ''
            this.isPassword = ''
          })
        }
      }
    },
    async getList() {
      let res = await getUser()
      if (res.code == 0) {
        this.mobile = res.data.mobile
        this.username = res.data.mobile
      } else {
        this.$message.error(res.msg)
      }
    },
    // mobilePhonefun(val) {
    //   return /^1[3456789]\d{9}$/.test(val)
    // },
    outlogin() {
      Dialog.confirm({
        title: '退出登录!',
        message: '是否退出登录?',
      })
        .then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('tokentag')
          this.$router.push('/selectindex')
        })
        .catch(() => {
          // on cancel
        })
    },
    ObtainCode() {
      if (!this.isbtn) {
        this.sendCode = true
        this.$toast({
          message: '手机号输入有误',
          duration: 1000,
        })
        return
      }
      this.uesrName = this.username
      console.log('this.uesrName', this.uesrName)
      sendCode({
        username: this.username,
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
.item-text-box {
  padding: 30px 40px;
  text-align: left;
  color: #999999;
  font-size: 26px;
  margin-top: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .custom-title {
    font-size: 28px;
    font-weight: 700;
  }
  .van-cell {
    padding: 10px 0px;
    color: #333333;
    font-size: 13px;
    padding-bottom: 10px;
    border-bottom: 1px solid#F5F5F5;
  }
  .van-cell::after {
    display: none;
  }
  .custom-value {
    color: #ffa433;
    font-size: 38px;
    font-weight: 500;
  }
  .btn-bl {
    width: 100%;
    height: 100px;
    margin-top: 300px;
    border-radius: 50px;
    text-align: center;
    line-height: 100px;
    font-size: 36px;
    color: #fff;
    background-color: #146eeb;
  }
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  background-color: #fff;
}

.block {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .van-cell {
    height: 50px;
  }
}
.far {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  background-color: #f8f8f8;
}
.bit-bto {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.codeb {
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
    transform: translateY(-100%);
    right: 20px;
  }
  .code-btn2 {
    width: 230px;
    height: 98px;
    background: #cccccc;
    color: #fff;
    font-size: 30px;
    line-height: 98px;
    border-radius: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    right: 20px;
  }
}
</style>
