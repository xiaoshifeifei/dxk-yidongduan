<template>
  <div class="boxInfo">
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="name"
          name="持卡人姓名"
          label="持卡人姓名"
          placeholder="请填写持卡人姓名"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="请填写手机号"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="bankCard"
          name="银行卡号"
          label="银行卡号"
          placeholder="请填写银行卡号"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="bankCardType"
          name="银行卡类型"
          label="银行卡类型"
          placeholder="请填写银行卡类型"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="deposit"
          name="开户行"
          label="开户行"
          placeholder="请填写开户行"
          :rules="[{ required: true }]"
        />
        <div class="tijiao"> 
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { ImagePreview, Cell, CellGroup, Dialog } from 'vant'
import { get_project } from '@/api/user.js'
export default {
  data() {
    return {
      name: '',
      phone: '',
      bankCard: '',
      bankCardType: '',
      deposit: '',
    }
  },
  created() {},
  mounted() {},
  methods: {
    mobilePhonefun() {
      return /^1[3456789]\d{9}$/.test()
    },
    onSubmit(values) {
      console.log('submit', values)
      if (values) {
        
      }
    },
  },
}
</script>

<style lang="less" scoped>
.boxInfo {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f9;
  padding: 5px 0 20px;
  .tijiao {
    position: absolute;
    bottom: 0;
    width: 100%;
    .van-button {
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
