<!--  -->
<template>
  <div class='fixed-top ' style="background:#f0f0f0;"  ref="bodyHeight">
   <div style="background:#fff;padding-bottom:20px">
    <van-nav-bar
      title="协议配置"
      left-arrow
      @click-left="onClickLeft"
      class="fixed help"
    />
    <div class="problem"> 
      <span>协议内容</span>
      <textarea v-model="content" rows="30" placeholder="请输入相关协议描述..." ></textarea>
    </div>
    
    <van-button size="large" class="linear-button help-btn" round type="info" @click="submit">提交</van-button>
  </div>
 </div> 
</template>

<script>
import { Toast} from 'vant'
import {admin} from '@/api/wallet'
export default {

  data	() {
    return {
    content:''
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
      admin({
        text:this.content,
        type:1,
        op:1,
        uid:localStorage['_shop_userId']
      }).then(res=>{
        console.log(res)
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
        type:1,
        op:0,
        uid:localStorage['_shop_userId']
      }).then(res=>{
        console.log(res)
        if(res.status==200){
           this.content=res.data
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
