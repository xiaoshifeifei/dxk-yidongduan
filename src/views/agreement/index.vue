<template>
  <div class="agreement-box">
      <div class="text-box" v-html="textdata">

      </div>
  </div>
</template>
<script>
import { 
    treatyuser
} from '@/api/user.js'
export default {
  name: 'index',
  data() {
    return {
        textdata:''
    };
  },
  components:{
  },
  created(){
    treatyuser()
    .then(res=>{
        console.log(res)
       this.textdata=res.data.content
    })
  },
  mounted() {
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
  .agreement-box {
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: #F8F8F8;
    .text-box{
        padding:40px 35px;
    }
  }
</style>
