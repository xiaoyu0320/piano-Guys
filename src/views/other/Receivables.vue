<template>
  <div class="assetsmanage ">
      <div class="heard">
        <label @click="goback"><img src="/images/login/icon_arrow2@2x.png" width="100%"/></label>
        <label>{{$t('message.receivables')}}</label>
        <label></label>
      </div>
      <div class="qrcode">
        <div class="qrcode-select">
          <span>
         <!--    <img :src="alldata.logo" width="100%"/> -->
            </span>{{symbol}}<span>
            <!-- <img src="/images/other/arrow_down@2x.png" width="100%"/> -->
          </span>
        </div> 
        <div class="qrcode-content">
          <qrcode-vue v-if="qrcodestatus" :value="alldata.gold_address"></qrcode-vue>
          <qrcode-vue v-else :value="alldata.gold_address"></qrcode-vue>
        </div>
        <div class="copy" v-if="qrcodestatus">
          <label>{{alldata.gold_address}}</label>
          <label class="copybutton" @click="getCopy" :data-clipboard-text="alldata.gold_address">{{$t('message.copy')}}</label>
        </div>
        <div class="copy" v-else>
          <label>{{alldata.gold_address}}</label>
          <label class="copybutton linear-button" @click="getCopy" :data-clipboard-text="alldata.gold_address">{{$t('message.copy')}}</label>
        </div>
        <div class="text">温馨提示：此地址只接收{{symbol}}转其他货币无法找回</div>
      </div>
  </div>
</template> 

<script>
import QrcodeVue from 'qrcode.vue'
import Clipboard from "clipboard"
import { getgolddetail} from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      id:0,
      qrcodestatus: true,
      account:'',
      symbol:'',
      alldata:{
        logo:'',
        gold_address: '**************************************************'
      }
    }
  },
  created() {
  
    this.id = this.$route.params.id
    this.alldata.gold_address = this.$route.query.account

    this.symbol = this.$route.query.symbol 
  },
  methods: {
    goback() {
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
    _getmygold() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.id = this.id
      obj.walletid= localStorage['walletid']
      Toast.loading({
        mask: true
      })
      getgolddetail(obj).then((res)=>{
        if (res.status == 200) {
          
              this.alldata = res.data.myGold  
              this.qrcodestatus = false 
       
        
          Toast.clear()
        } else {
          Toast.fail(res.msg)
          if (res.msg.indexOf("请重新登录") >= 0) {
            localStorage.clear()
            Toast.loading({
              duration: 2000,
              mask: true,
              message: res.msg
            });
           this.$router.replace({
              path: '/'
            })
          }
        }
      })
    },
  },
  components: {
    QrcodeVue
  }
};
</script>
<style scoped lang="stylus" >
.assetsmanage
  position: absolute
  width: 100%
  height: 100%
  background: rgb(245,245,245)
  text-align:center
  background:#3F4766
  .heard
    font-size:17px
    color:#fff
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:6.5%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .qrcode
    display: flex
    flex-direction: column
    justify-content: center
    border-radius: 16px
    background: #fff
    padding:25px 30px 30px
    margin:50px auto 
    width:60%
    .qrcode-select
      display:flex
      justify-content: center
      align-items: center
      font-size:15px
      color:rgb(51,51,51)
      span
        width:4.8%
        display: flex
        align-items: flex-end
      span:first-child
        margin-right:5px
      span:last-child
        margin-left:5px
    .qrcode-content
    
      padding:30px
    .copy
      width:100%
      display:flex
      justify-content: space-between
      align-items:center
      word-break: break-all
      text-align: left
      background:rgb(250,250,250)
      border-radius:8px
      overflow:hidden
      color:rgb(153,153,153)
      font-size:12px
      label:first-child
        padding:0 11px 0 16px
        line-height: 1.6
      label:last-child
        font-size:15px
        color:#fff
        
        width:22vw
        padding:20px 0px 
        text-align: center
    .text
      margin-top:30px
      font-size:12px
      color:rgb(51,51,51)
      text-align: left
      word-break: break-all
</style>