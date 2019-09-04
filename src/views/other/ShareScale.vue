<!--  -->
<template>
  <div class='fixed-top ' style="background:#f0f0f0;"  ref="bodyHeight">
   <div style="background:#fff;padding-bottom:20px">
    <van-nav-bar
      title="分享比例配置"
      left-arrow
      @click-left="onClickLeft"
      class="fixed help"
    />
      <van-cell-group title="分润配置">
       
         <van-field  label="一级" v-model="shareObj.lv1" placeholder="请输入参数如（0.2）" input-align="right" />
         <van-field  label="二级" v-model="shareObj.lv2" placeholder="请输入参数如（0.15）" input-align="right" />
        <van-field  label="三级" v-model="shareObj.lv3" placeholder="请输入参数如（0.1）" input-align="right" />
      </van-cell-group>
        <van-cell-group title="直推配置">
       
         <van-field  label="直推配置" v-model="shareObj.direct" placeholder="请输入参数如（0.2）" input-align="right" />

      </van-cell-group>   
    
    <van-button size="large" class="linear-button help-btn" round type="info" @click="submit()">提交</van-button>
  </div>
 </div> 
</template>

<script>
import {admin} from '@/api/wallet'
import { NavBar, NoticeBar,Skeleton,Toast} from 'vant'
export default {

  data	() {
    return {
    shareObj:{}
    };
  },
  computed: {},
  watch: {

  },
  methods: {
    onClickLeft(){
      this.$router.back()
    },
    
    submit(){
       let obj = {}
       obj.text = JSON.stringify(this.shareObj)
       obj.op = 1
       obj.type= 3
       obj.uid = localStorage['_shop_userId'] 
       if(this.shareObj.direct >= 1) {
          Toast.fail('直推配置必须小于1')
          this.shareObj.direct = ''
          return false
       } 
      admin(obj).then(res=>{
        
        if(res.status==200){
          Toast.success('提交成功')
        }else{
           Toast.success('提交成功')
        }
      })
    }
  },
  created	() {
    admin({
       
        type:3,
        op:0,
        uid:localStorage['_shop_userId']
      }).then(res=>{
         
        if(res.status==200){
          this.shareObj = JSON.parse(res.data)
        }else{
           Toast.success('提交成功')
        }
      })
  },

  mounted	() {},
  destroyed	() {}, //	生命周期 - 销毁完成
  activated	() {} //	如果页面有keep-alive缓存功能，这个函数会触发
  }

</script>

<style  scoped>
 .help.van-nav-bar .van-icon {
   color:#333
 }
 .problem{
  padding:15px;
  box-sizing: border-box;
  position: relative
 }
 .problem span {
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: 600;
    display: block;
 }
 .problem textarea {
    font-size: 11px;
    color: #999;
    border: none;
    resize: none;
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box
}
.btn {
      background:rgb(229,229,229);
  	  color:#fff;
  	  font-size:15px;
  	  padding:12px 0;
  	  border-radius: 50px;
  	  width: 73.5%;
  	  margin: 0 auto;
}
.help-btn {
 
  height:44px;
  line-height: 44px;
  width: 75%;
  margin:30px auto;
  display: block
}
.problem label {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 11px;
}
</style>
