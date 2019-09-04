<!--  -->
<template>
  <div class='fixed-top ' style="background:#f0f0f0;"  ref="bodyHeight">
   <div style="background:#fff;padding-bottom:20px">
    <van-nav-bar
      title="关于我们配置"
      left-arrow
      @click-left="onClickLeft"
      class="fixed help"
    />
 
    <div class="problem"> 
      <span>钱包名称</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.title" placeholder="请输入您的配置名称" class="problem-input">
       </div> 
    </div>
     <div class="problem"> 
      <span>域名配置</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.version" placeholder="请输入您的配置小字" class="problem-input">
       </div> 
    </div>
     <div class="problem"> 
      <span>版本配置</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.version2" placeholder="请输入您的配置版本" class="problem-input">
       </div> 
    </div>
     <div class="problem"> 
      <span>website</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.website" placeholder="请输入您的配置website域名地址" class="problem-input">
       </div> 
    </div>
     <div class="problem"> 
      <span>Twitter</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.Twitter" placeholder="请输入您的配置Twitter域名地址" class="problem-input">
       </div> 
    </div>
     <div class="problem"> 
      <span>Wechat</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.Wechat" placeholder="请输入您的配置Wechat账号" class="problem-input">
       </div> 
    </div>
     <div class="problem"> 
      <span>Telegram</span>
      <div class="setting-right">
       <input type="text" v-model="aboutObj.Telegram" placeholder="请输入您的配置Telegram账号" class="problem-input">
       </div> 
    </div>
    <van-button size="large" class="linear-button help-btn" round type="info" @click="submit()">提交</van-button>
  </div>
 </div> 
</template>

<script>
import {Toast} from 'vant'
import {admin,changeHeadImg} from '@/api/wallet'
export default {

  data	() {
    return {
      content:'',
      url:null,
      aboutObj:{}
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
       obj.text = JSON.stringify( this.aboutObj)
       obj.op = 1
       obj.type= 2
       obj.uid = localStorage['_shop_userId'] 
       admin(obj).then(res=>{
        if(res.status==200){
          Toast.success('提交成功')
        }else{
           Toast.fail(res.msg)
        }
      })
    }
  
  },
  created	() {
   admin({
        type:2,
        op:0,
        uid:localStorage['_shop_userId']
      }).then(res=>{
      
        if(res.status==200){
          this.aboutObj = JSON.parse(res.data)
          console.log( this.aboutObj)
        }else{
           Toast.fail(res.msg)
        }
      })
  },

  mounted	() {
   
  },
  destroyed	() {}, //	生命周期 - 销毁完成
  activated	() {} //	如果页面有keep-alive缓存功能，这个函数会触发
  }

</script>
<style  scoped>
 .help.van-nav-bar .van-icon {
   color:#333
 }
 .problem{
   padding:10px;
  box-sizing: border-box;
  display: flex;
  align-items: center
 }
 .problem span {
    font-size: 14px;
    color:#999;
    display: block;
    flex-basis: 25%
 }
 .setting-right{
    flex-basis: 75%
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
.problem-input {
  border: 1px solid #eee;
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
</style>
