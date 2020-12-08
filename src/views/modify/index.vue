<template>
  <div class="modify-box">
    <div class="msg-box">
        <van-cell title="头像" size="large">
            <template>
                <div class="header-new-box">
                   <van-uploader v-model="fileList" multiple  :max-count="1" accept="image/*" :after-read="PicOnReady"/>
                </div>
            </template>
        </van-cell>
        <van-cell title="名称" size="large">
            <template>
                <van-field v-model="itemdata.nickname" placeholder="点击修改名称"/>
            </template>
        </van-cell>
    </div>
    <div class="btn-box">
        <div class="btn1" @click="submint">保存</div>
    </div>
  </div>
</template>
<script>
import {
    getUser,
    avatarUpload,
    updateInfo
} from "@/api/user.js";
import { Toast } from 'vant';
export default {
  name: 'index',
  data() {
    return {
        itemdata:'',
        fileList: [
            { url: ''},
        ],
        avatarurl:''
    };
  },
  created(){
  },
  mounted() {
    getUser().then(res=>{
      this.itemdata=res.data
      this.fileList= [
        { url: res.data.avatar},
      ]
    })
  },
  methods: {
    PicOnReady(file) {
      var avatardata=new FormData()
      avatardata.append("avatar_img",file.file);
      avatarUpload(
        avatardata
      ).then(res=>{
            if(res.code===0){
                this.$toast({
                message: "图片上传成功!",
                duration: 1000
                });
                this.avatarurl=res.data.url
            }
      })
    },
    submint(){//保存
        updateInfo({
            nickname:this.itemdata.nickname,
            avatar:this.avatarurl
        }).then(res=>{
            if(res.code===0){
            this.$toast({
              message: "修改成功!",
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.go(-1)
            },1000)
            }
        })
    },
  },
};
</script>
<style lang="less" scoped>
  .modify-box {
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    /deep/.van-cell__title{
        text-align: left;
        padding-left: 5px;
        display: flex;
        align-items: center;
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
    .msg-box{
        margin-top: 30px;
        .van-cell--large .van-cell__title{
            text-align: left;
            font-size: 13px;
            color: #333333;
            padding-left: 5px;
        }
        .van-cell__value{
            font-size: 13px;
        }
        .header-new-box{
            width: auto;
            height: auto;
            float: right;
            // /deep/.van-uploader__input{
            //     width: 2.66667rem !important;
            //     height: 2.66667rem !important;                          
            // }
            // /deep/.van-uploader__upload{
            //     width: 2.66667rem !important;
            //     height: 2.66667rem !important;
            //     margin: 0;     
            // }
            // /deep/.van-uploader__wrapper{
            //     width: 2.66667rem !important;
            //     height: 2.66667rem !important;
            //     /deep/.van-uploader__preview{
            //         margin: 0;
            //         /deep/.van-uploader__preview-image{
            //             width: 2.66667rem !important;
            //             height: 2.66667rem !important;
            //             img{
            //                 width: 2.66667rem !important;
            //                 height: 2.66667rem !important;
            //                 object-fit: inherit;
            //             }
            //         }
            //     }
            // }

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
  }
</style>
