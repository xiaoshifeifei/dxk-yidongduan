<template>
  <div class="treatyprivacy-box">
      <div class="text-box" v-html="textdata">
aa
      </div>
  </div>
</template>
<script>
import { 
    treatyprivacy
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
    treatyprivacy()
    .then(res=>{
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
  .treatyprivacy-box {
    width: 100%;
    height: auto;
    min-height: 100%;
    background-color: #F8F8F8;
    .text-box{
        padding:40px 35px;
    }
  }
</style>
