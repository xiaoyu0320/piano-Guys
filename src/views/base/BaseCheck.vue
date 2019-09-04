
<template>
  <div class="assetsmanage ">
      <div class="heard contract">
        <label @click="goback"><img src="/images/login/icon_arrow2@2x.png" width="100%"/></label>
        <label>{{$t('message.receivables')}}</label>
        <label style="width:auto;font-size:12px" @click="download()">保存到相册</label>
      </div>
    
      <div class='baseCheck'>
        <div class="baseCheck__title">您已认购：{{price.toFixed(4)}}ASC</div>
       
        <div class="baseCheck__down" @click="menu=true">
            <div class="baseCheck__label">请选择支付方式</div>
            <div class="baseCheck__content">{{payTitle}}</div>
        </div>
    </div>
      <div class="qrcode" v-if="payTitle !='EOS'" ref="faultTree">
        <div class="qrcode-select">
          <span>
         <!--    <img :src="alldata.logo" width="100%"/> -->
            </span>{{symbol}}<span>
            <!-- <img src="/images/other/arrow_down@2x.png" width="100%"/> -->
          </span>
        </div> 
        <div class="qrcode-content">
          <div class="wallet--coin">需要转入 <font style="font-weight:600;color:red;font-size: 18px;">{{payValue.toFixed(8)}} {{this.payTitle}}</font></div>
          <qrcode-vue v-if="qrcodestatus" :value="alldata.account"></qrcode-vue>
          <qrcode-vue v-else :value="alldata.account"></qrcode-vue>
        </div>
        <div class="copy" v-if="qrcodestatus">
          <label>{{alldata.account}}</label>
          <label class="copybutton" @click="getCopy" :data-clipboard-text="alldata.account">{{$t('message.copy')}}</label>
        </div>
        <div class="copy" v-else>
          <label>{{alldata.account}}</label>
          <label class="copybutton linear-button" @click="getCopy" :data-clipboard-text="alldata.account">{{$t('message.copy')}}</label>
        </div>
        <div class="text">温馨提示：您可以使用任意钱包转入该地址，该地址只接收{{payTitle}}，转其他货币无法找回,转出后6个区块确认即可到账</div>
      </div>
       <div class="coin-white coin-detail" v-else>
          <div class="wallet--coin">需要转入{{payValue.toFixed(4)}}{{payTitle}}</div>
             <div class="coin-mask" v-show=" memoVisabled"  @click="memoVisabled = false">
                      使用其它钱包支付必须传入memo否则充值将会丢失
              </div>
            <div class="coin-code" >
                 
                  <qrcode-vue v-if="qrcodestatus" :value="alldata.account"></qrcode-vue>
            </div>
            <div class="coin-choice">
                <span>充币地址 </span>
                <span>memo  &nbsp;<img src="images/other/other.png" width="15px" @click="help()"></span>
            </div>
            <div class="coin-choice">
                <span>{{alldata.account}} </span>
                <span style="font-size:12px;color:orange">{{alldata.memo}} | baseid:{{baseid}} </span>
            </div>
            <van-row style="margin-top:35px">
                <van-col span="16">
                    <van-button class="copybutton" type="info" size="small" style="width:100%" @click="getCopy" :data-clipboard-text="alldata.account" >复制地址</van-button>
                </van-col>
                <van-col span="8" style="text-align:right">
                   <van-button class="copybutton" type="info" size="small"  @click="getCopy" :data-clipboard-text="alldata.memo" >复制标签</van-button>
                </van-col>
            </van-row>
            
    </div>

     <!-- 支付窗口  -->
      <van-button type="info" size="large" @click="payAlert()" style="width:80%;margin:0 auto 30px
      
      "> 余额支付</van-button>
     <!-- 支付窗口 -->
      <van-action-sheet
        v-model="menu"
        :actions="actions"
        @select="onSelect"
        />
   
       <!-- 支付组件 -->
      <pay :payShow="payShow"  ref="payConfirm" @callback="back"  />  
      <!-- 支付组件 -->
  </div>
</template> 

<script>
import QrcodeVue from 'qrcode.vue'
import Clipboard from "clipboard"
import html2canvas from 'html2canvas'
import Pay from "../../components/Pay.vue"
import { judgeTerminal } from '@/utils/utils'
import { getInvestmentAccount,getNewCurrency,checkuserstatus } from '../../api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      baseid:this.$route.query.baseid,
      qrcodestatus: true,
      number:this.$route.query.number,
      menu:false,
      account:'',
      symbol:'',
      price:0,
      alldata:{},
      payTitle:'EOS',
      payShow:false,
       actions: [
        { name: 'WTC' },
        { name: 'ETH' },
        // { name: 'BTC' },
        { name: 'EOS' },
        { name: 'USDT' },
      ],
      payValue:0,
      dataURL:'',
      paramePay:{},
      //支付开启 0代表无密码  1 代表有密码
      passwordStatus:false,
      //是否传入memo
      memoVisabled:true
    }
  },
  created() {
     checkuserstatus({ uid: localStorage['_shop_userId'] }).then(res => {
       if (res.data.pay_password == 0) {
         this.passwordStatus = true
       }
    })
    switch(localStorage['type']){
      case '1' :
        this.payTitle='ETH'  
        break;
      case '2' :
        this.payTitle='BTC'  
        break;
      case '3' :
        this.payTitle='EOS'  
        break;
       case '4' :
        this.payTitle='USDT'  
        break;
    }
    this.price = this.$route.query.price*this.$route.query.number
    this.id = this.$route.params.id
    this.alldata.gold_address = this.$route.query.account
    this.symbol = this.$route.query.symbol 
    this.pay()
    this._getCurrency()
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.menu = false;
      this.payTitle= item.name
      this.pay()
      this._getCurrency()
    },
    help(){
        this.memoVisabled ?  this.memoVisabled = false : this.memoVisabled = true
    },
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
  
    //获取account
    pay(){
    
       let obj ={}
        obj.uid = localStorage['_shop_userId']
        obj.symbol= this.payTitle
        obj.baseid= this.baseid
        Toast.loading({
            duration: 1000,
            mask: true,
            message: '加载中...'
        });
        getInvestmentAccount(obj).then(res=>{
           Toast.clear()
          this.alldata = res.data
        })
    },
    //兑换币
    _getCurrency(){
       this.payValue = 0
      getNewCurrency({}).then(res=>{
          if(this.payTitle == 'ETH'){
            this.payValue = Number(this.price)/Number(res.data.EthAsc).toFixed(4)
            console.log(this.number,res.data.EthAsc)
          }else if(this.payTitle == 'EOS'){
            this.payValue =  Number(this.price)/Number(res.data.EosAsc).toFixed(4)
          }else if(this.payTitle == 'USDT'){
            this.payValue =  Number(this.price)/Number(res.data.UsdtAsc).toFixed(4)
          }else if(this.payTitle == 'WTC'){
            this.payValue = Number(this.price)/Number(res.data.WtcAsc).toFixed(4)
          }else if(this.payTitle == 'BTC'){
            this.payValue =  Number(this.price)/Number(res.data.BtcAsc).toFixed(4)
          }
       
        })
    },
    download(){
          let _canvas = this.$refs.faultTree // 截图区域
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
                    if(jsbridge){
                        jsbridge.saveImage(this.dataURL)
                    } else {
                        this.popupFlag = false
                        Toast.fail("保存失败")
                    }
                }
                if (judgeTerminal() == 'Ios') {
                    //ios 情况
                    if (window.webkit) {
                        window.webkit.messageHandlers.saveImage.postMessage(this.dataURL)
                    }else{
                          this.popupFlag = false
                        Toast.fail("保存失败");
                    }
                }
               
  
          })

      },
      returnType(str){
        switch(str){
              case 'EOS' :
                return 3
                break;
              case 'ETH' :
              case 'WTC' :
              case 'USDT' :    
                return 1     
                break;
              case 'BTC' :
                return 2   
                break;
              
            }
      },
      payAlert(){
        if(!this.payValue){
          Toast.fail('金额不能为0')
          return
        }
         if (this.passwordStatus) {
          Dialog.alert({
            title: '系统提示',
            message:'请先设置支付密码'
          }).then( () => {
               this.$router.push({
                  path:'/modifypaypassword'
               })
          })
          return
        }
         if(this.returnType(this.payTitle) != localStorage['type']){
         
          Dialog.confirm({
            title: '提示',
            message: '当前钱包类型不同是否前往切换'
          }).then(() => {
            
            this.$router.push({
              path:'/wallet'
            })
          }).catch(() => {
            // on cancel
          });
        }
        else{
              this.payShow  = true
              console.log(this.payValue)
              this.paramePay = {
                address:localStorage['asc_address'],
                money:this.payValue,
                id:this.$route.query.id,
                to:this.alldata.account,
                memo:this.alldata.memo +'|baseid:'+this.baseid,
                type:this.returnType(this.payTitle),
                symbol:this.payTitle,
                contract:this.returnContract(this.payTitle),
                account:this.alldata.account
                
              }
              this.$refs.payConfirm.reset(this.paramePay)
              
            }
      },
      returnContract(str){
            switch(str){
              case 'EOS' :
                return 'eosio.token'
                break;
              case 'ETH' :
                return 'ETH'
                break
              case 'WTC' :
                return '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74'
                break
              case 'USDT' :    
                return '0xdac17f958d2ee523a2206206994597c13d831ec7'   
                break;
              case 'BTC' :
                return 'BTC' 
                break;
              
            }
      },
      back(val){
         this.payShow = val
      }

  },
  components: {
    QrcodeVue,
    Pay
  }
};
</script>

<style scoped lang="stylus" >
.assetsmanage
  position: absolute
  width: 100%
  min-height: 100%
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
    border-radius: 14px
    background: #fff
    padding:25px 15px 30px
    margin:50px auto 
    width:70%
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
<style scoped>
 .baseCheck {
    color: #fff;
    width: 60%;
    text-align: left;
    margin: 20px auto 0;
    font-size: 16px
 }
 .baseCheck__down {
     display: flex;
    align-items: center;
    
}
.baseCheck__content {
    border: 1px solid #eee;
    padding: 1px 20px 1px 10px;
    margin-left: 10px;
    position: relative;
    border-radius: 3px;
    font-size: 12px
}
.baseCheck__content:after{
    display: block;
    content: '';
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    right: 2px;
    top: 6px;
   
}
.baseCheck__title {
    margin-bottom: 15px
}
.coin-code {
    width: 35%;
    display: block;
    margin: 0 auto;
    position: relative
}
.coin-mask {
    position: absolute;
    width: 200px;
    height: 100px;
    left: 50%;
    top: 50px;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    color: #e6ff00;
    font-size: 12px;
    margin-left: -100px;
    z-index: 999;
    display: flex;
    align-items: center;
    line-height: 1.5;
    padding: 15px;
    box-sizing: border-box;
  
    border-radius: 5px;
}
.coin {
    background: #f5f5f5
}
.coin-white {
  background: #fff
}
.coin-detail {
    margin: 40px auto 20px auto;
    padding: 40px 25px 25px;
    border-radius: 5px;
    width: 70%;
    position: relative;
}
.coin-choice {
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
 margin-top: 15px;
}
.coin-choice span {
    align-items: center;
    display: flex;
}
.coin-infomation {
    font-size: 14px;
    padding: 15px
}
.coin-infomation h5 {
    font-size: 16px;
    font-weight: normal
}
.coin-infomation p {
    margin-top:10px;
    
}
.wallet--coin {
  position: relative;
  top:-20px;
}

@media (min-width: 320px) and (max-width:420px){
   .wallet--coin {
     font-size:12px;
   }
   .wallet--coin  font {
     font-size:14px!important
   }
   .baseCheck__title {
     font-size:12px
   }
   .baseCheck__label{
     font-size:12px
   }
}

</style>

