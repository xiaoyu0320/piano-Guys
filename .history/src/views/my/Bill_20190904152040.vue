
<template>

<div class='bill'  ref="bodyHeight" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" style=" background:url(../../images/bill/new-bg.png) no-repeat center;background-size: cover;">
     <van-nav-bar
      
        class="share-bar "
        right-text="保存相册"
        left-arrow
        @click-left="onClickLeft"
        @click-right="download"
        
        />
        <img src="/images/bill/logo.png"  style="width:1.2rem;margin-top:.45rem">
        <h3 class="share_title">ASC云矿机</h3>
        <img src="/images/bill/sub-title.png"  style="width:4.19rem;margin-top:.15rem">
        <div style="width:100%;display:flex;justify-content: center; align-items: center; margin-top: 0.5rem;">
            <div class="zone">
                <h3>超强算力</h3>
                <p>高效挖矿</p>
                <p>锁定风险</p>
            </div>
        </div>
         <div style="width:100%;display:flex;justify-content: center; align-items: center; margin-top: 0.25rem;">
            <div class="zone">
                <h3>超高收益</h3>
                <p>日产+团推奖励</p>
                <p>回报高</p>    
            </div>
             <div class="zone" style="margin-left:.5rem">
                <h3>限量疯抢</h3>
                <p>全球限量</p>
                <p>抢完即止</p>    
            </div>
        </div>
     <div class="code-position">
          <qrcode-vue v-if="qrcodestatus" :value="invite_url"></qrcode-vue>
     </div>
    <van-action-sheet v-model="popupFlag" :actions="actions" cancel-text="取消" @select="onSelect"></van-action-sheet>
     <div class="share-txt">分享立即奖励5ASC</div>
     <div class="bill__opearte">
        <!-- <p>{{$t('message.InvitationLink')}}：{{invite_url}}</p> -->
        <van-button class="linear-button bill__btn copybutton" size="small" @click="getCopy"  :data-clipboard-text="invite_url">{{$t('message.CopyLink')}}</van-button>
        
    </div>     
</div>



</template>

<script>
import html2canvas from 'html2canvas'
import QrcodeVue from 'qrcode.vue'
import Clipboard from "clipboard"
import { Toast, Actionsheet } from 'vant'
import { judgeTerminal } from '@/utils/utils'
import store from '@/store'
import { mapGetters } from 'vuex'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    QrcodeVue
},
data() {
    //这里存放数据
    return {
    timeOutEvent:null,  
    account:'',
    invite:false,
    code:this.$route.query.code,
    invite_url:'',
    qrcodestatus: true,
    popupFlag: false,
    actions:[
        {
            name:'保存相册',
            type:1
        }
    ]
    }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    onSelect (val) {
        
        switch (val.type) {
            case 1: this.download()
            break
        }
    },
    //复制
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
     download(){
        let _canvas = this.$refs.bodyHeight // 截图区域
            const width = _canvas.offsetWidth; 
            const height = _canvas.offsetHeight; 
            const canvas2 = document.createElement('canvas');
            const scale = 1;
            canvas2.width = width;
            canvas2.height = height;
            const context1 = canvas2.getContext('2d')
            const opts = {
                scale,
                canvas: canvas2,
                // logging: true, //日志开关，便于查看html2canvas的内部执行流程
                width,
                height,                
                useCORS: true 
            };      
        html2canvas(_canvas,opts).then((canvas) => {
            
            this.dataURL = canvas.toDataURL("image/png")
            
            if (judgeTerminal() == 'Android'){
                // 安卓情况
                if(window.jsbridge){
                    window.jsbridge.saveImage(this.dataURL)
                } else {
                    this.popupFlag = false
                    Toast.fail("保存失败")
                }
            }
            if (judgeTerminal() == 'Ios') {
                //ios 情况
                if (window.webkit) {
                    window.webkit.messageHandlers.saveImage.postMessage({
                        content:this.dataURL
                    })
                }else{
                      this.popupFlag = false
                    Toast.fail("保存失败");
                }
            }
        })

    },
    touchStart(e){
        this.timeOutEvent = setTimeout(() => {
         this.popupFlag = true
         e.preventDefault()
        },500);
    },
    touchMove(e){
         clearTimeout(this.timeOutEvent);
        this.timeOutEvent = 0;
        // e.preventDefault();
    },
    touchEnd(e){
        clearTimeout(this.timeOutEvent);
        if(this.timeOutEvent!=0) {
            return false;
        }
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
   store.dispatch('toSetBottom',false)
   this.invite_url = 'https://wallet.ascchain.com/?ref='+this.code
   this.account = localStorage['asc_address']
},
 mounted () {
    this.$nextTick(() => {
      document.querySelector('html').style.fontSize = '13.333333333333vw'
    })
},
 destroyed () {
    document.querySelector('html').style.fontSize = '12px'
  }
}
</script>
<style  scoped>
.zone {
    background: url(/images/bill/bg-color.png) no-repeat center;
    background-size: cover;
    width: 2rem;
    height: 1.3rem;
}
.zone h3 {
    font-family: PingFang-SC-Medium;
	font-size: 0.32rem;
    margin-top:5px;
	font-weight: normal;
	font-stretch: normal;
	color: #fefefe;
}
.zone  p {
   font-family: PingFang-SC-Bold;
	font-size: .2rem;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #0af9fd;
}
.share_title {
	font-family: PingFang-SC-Heavy;
	font-size: .96rem;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #0bf7fd;
    margin-top:.45rem
}
.bill {
    position:relative;
    height: 100vh;
    overflow: auto;
    text-align: center;
}
.bill img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
}
.bill__log {
    text-align: center;
}
.code-position {
    margin-top: 10%;
    padding: 15px 10px 5px;
    background: #fff;
    width: 120px;
    margin: 10% auto 0;
    border-radius: 10px;
}

.code-opeate {
    text-align: center;
    position: absolute;
    bottom: 0;
    width:100%;
}
.share-bar {
    background: transparent;
}
.share-bar .van-nav-bar__title ,.share-bar .van-nav-bar__text {
    color: #fff;
}
.van-nav-bar .van-icon {
    color: #fff!important
}
 .van-hairline--bottom::after {
    border-width: 0;
}
.item-wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: auto;
    z-index: 2500;
}
.item-wrap .item{
    background: #fff;
    width: 100%;
}
.bill__opearte {
    text-align: center;
    margin-top: 10%;
    color: #fff;
}
.bill__opearte p{
    font-size: 12px;
}
.bill__btn {
  
    padding: 0 20px !important;    
    margin-top:20px;
    margin-bottom: 20px;
    border:0;
}
.share-txt {
    width: 2.33rem;
	height: .23rem;
	font-family: Alibaba-PuHuiTi-R;
	font-weight: normal;
	font-stretch: normal;
    font-size: .12rem;
	letter-spacing: 0px;
	color: #ffffff;
    background-color: #275ff7;
	border-radius: .19rem;
    margin:0 auto
}
</style>