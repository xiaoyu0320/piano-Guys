
<template>
<div class='down' ref="bodyHeight" style=" background:url(../../images/down/down-bg.png) no-repeat center;background-size: contain;
    background-position:top;">
      <van-nav-bar
        class="share-bar"
        left-arrow
        @click-left="onClickLeft"
        style="background:transparent"
       />  
    <div >
         <div class="down__logo">
            <img src="/images/down/logo-txt.png" >
        </div>
        <div class="down__btn--box">
            <button class="down__btn IOS"  style="margin-top:60px" @click="ios()"><img src="/images/down/down-iphone.png">IOS下载 {{$t("message.IOSDownload")}}</button>
            <button class="down__btn" @click="down()" style="margin-top:25px;border-color:#3878ff;color:#127bff"><img src="/images/down/down-az.png">{{$t("message.AndroidDownload")}}</button>
        </div>
         <div class="bill__opearte">
            <van-button class="linear-button bill__btn bill__copy--btn copybutton" size="small" @click="getCopy"  :data-clipboard-text="copyUrl" ><img src="/images/down/copy.png" style="width:12px;position:relative;top:2px">{{$t("message.Copydownloadaddress")}}</van-button>
         </div>
         <div class="lead" v-if="wxStatus"  @click="wxStatus= false" style="background:url(/images/other/lead.png) no-repeat top right;background-size:60% 50%;width:100%;height:100%">
            
        </div>
        <div class="mask" v-if="wxStatus" @click="wxStatus= false"></div>
    </div>     
   
   
</div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import Clipboard from "clipboard"
import {judgeTerminal,isWeiXin} from '@/utils/utils.js'
import { Toast, Actionsheet } from 'vant'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 copyUrl:'',
 wxStatus:false,
 code:this.$route.query.code
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
onClickLeft(){
    this.$router.back()
},
getCopy() {
      
      let clipboard = new Clipboard(".copybutton");
     
      clipboard.on("success", e => {
        
        Toast.success("已复制");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast.fail("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
down(){
     this.wxStatus = isWeiXin()
    if(!this.wxStatus){
         if(judgeTerminal()=='Android'){
                window.location.href ='http://wallet.ascchain.com/download/ascwallet.apk'
            }else {
                Toast('该手机不支持安卓下载')
        }
   
    }
   
},
ios(){
     this.wxStatus = isWeiXin()
    if(!this.wxStatus){
          if(judgeTerminal()=='Ios'){
            window.location.href ='itms-services://?action=download-manifest&url=https://wallet.ascchain.com/download/ascwallet.plist'
            }else{
                Toast('该手机不支持ios下载')
            }
    } 
  
      
   
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
this.copyUrl = 'https://wallet.ascchain.com/?gourl=download&code='+this.code

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    this.$refs.bodyHeight.height= window.innerHeight + 'px'
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.mask {
    position: fixed;
    background: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
}
.lead {
    position: absolute;
    z-index: 99;
    top: 0;
    display: flex;
    justify-content: flex-end;
} 
.lead img {
    width: 60%
}
.down {
  height: 100vh
}
.down__logo {
    width: 130px;
    padding: 20px 0;
    margin: 25% auto 0;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 1px 10px rgba(0,0,0,0.15);
}
.down__logo img{
    width: 90px;
    margin: 0 auto;
    display: block;
}
.down__btn {
    color: #fff;
    border-radius: 30px;
    padding: 10px 20px;
    border:1px solid #fff;
    background: transparent;
    display: block;
    min-width: 50%;
    display: flex;
    align-items: center;
    margin:0 auto;
    justify-content: center
}
.down__btn img {
    margin-right: 10px;
    width:20px
}
.IOS {
 background-image: linear-gradient(87deg, 
        #ffffff 0%, 
        #86b7ff 0%, 
        #0d6eff 0%, 
        #3193ff 50%, 
        #54b8fe 100%);
         border: 0;
}
.share-bar {
    background: transparent
}
.share-bar .van-nav-bar__title ,.share-bar .van-nav-bar__text {
    color: #fff;
}
.van-nav-bar .van-icon {
    color: #fff!important
}
 .van-hairline--bottom::after {
    border-width: 0
}
.bill__opearte {
    text-align: center;
    margin-top: 10%;
    color: #fff;
}
.bill__copy--btn{
   
    padding: 0px 20px !important;
    border: 0px;
    color: #333!important;
    background: none;
    font-size: 16px;
    text-decoration: underline;
}
</style>