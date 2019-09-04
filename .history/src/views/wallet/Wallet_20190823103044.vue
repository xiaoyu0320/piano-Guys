<template>
  <div class="assetsmanage  fixed-top">
    <div class="topbg">
      <div class="heard fixed">
        <label>
          <div  @click="goscan" style="width:100%;display: flex;justify-content: flex-start;align-items: center;">
            <img src="/images/other/icon_scan@2x.png" width="36%">
          </div>
        </label>
        <label class="select" @click="show=true"><span>{{title}}</span><img src="/images/other/arrow_down@2x.png"/></label>
        <!-- <label><span>ASC</span></label> -->
        <label style="font-size:14px;" @click="goRece">{{$t('message.receivables')}}</label>
      </div>
      <div class="top" @click="goDetail(mygold[0])">

        <div class="top-title">
           <!-- <img :src = "mygold[0].logo" /> -->
         <div>
         <span class="top-mt" >
           <label>{{title}}</label>
              <label >     
                <!-- <van-icon v-if="type==3" style="margin-right:15px;" @click.stop="showHelp = !showHelp" name="question-o" />  -->
                <van-icon @click.stop ="gomanage"  name="ellipsis" />
              </label>
         </span > 
          <!-- <span v-if = "!(mygold[0].gold_address)">您还未有地址</span> -->
           
          <span  class="top-mb" st v-if="mygold[0].gold_address">{{mygold[0].gold_address}} <van-icon @click.stop="getCopy(1)" class="copybutton copybutton1"  :data-clipboard-text="mygold[0].gold_address" style="padding-top:2px;justify-content: start;" name="notes-o" /></span>
         
         
         <!--  <span  ref="word"  v-else-if="nowGold==3 && mygold[0].gold_address"  style="width:200px; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;float:left;margin-right:10px;margin-top:2px;justify-content: start;" > {{mygold[0].gold_address | word}}  <van-icon @click.stop="getCopy(1)" class="copybutton copybutton1"  :data-clipboard-text="mygold[0].gold_address" style="padding-top:2px;" name="notes-o" /></span>  
    
          <span v-else-if="nowGold==2 && mygold[0].gold_address">{{mygold[0].gold_address.substring(0,5)}}...{{mygold[0].gold_address.substring(37)}} <van-icon @click.stop="getCopy(1)" class="copybutton copybutton1"  :data-clipboard-text="mygold[0].gold_address" style="padding-top:2px;justify-content: start;" name="notes-o" /></span> -->
           
        </div>
        <div class="real-money">
         ￥{{Number(showMoney).toFixed(2)}}
        </div>    
        </div>

        
        <!-- <ul>
          <li><span>{{$t('message.usable')}}</span><label>{{mygold[0].gold_value}}</label></li>
          <li><span>{{$t('message.freeze')}}</span><label>{{Number(mygold.ascfroze).toFixed(2)}} </label></li> 
          <li><span>{{$t('message.conversion')}}</span><label>≈￥{{Number(mygold[0].gold_real).toFixed(2)}}</label></li>
        </ul> -->
        <!-- <div class="operate">
          <van-row>
          <van-col span="8">
            <van-button round  size="small">收款</van-button>
          </van-col>
          <van-col span="8" offset="8">
             <van-button round  size="small">转账</van-button>
          </van-col>
        </van-row>
        </div> -->
      </div>
    </div>
    <div class="money">
      <van-row>
      <van-col span="4" @click.native="window.testjs.getIdentity('123')">  {{$t("message.Asset")}} </van-col>
      <van-col span="4" offset="16 " size="20px" @click.native="openFlag= true" style="position: relative;top: 3px;"><van-icon name="add-o" style="float:right"/></van-col>
    </van-row>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ul class="list" v-if="flagList.length >0">
        
    <!--<li>
          <span><label>BTC</label><label>{{Number(mygold.btc).toFixed(8)}}</label></span>
          <span>
            <label>&nbsp;</label>
            <label>折合≈￥{{Number(mygold.btc*mygold.btcrate).toFixed(2)}}</label></span>
        </li> -->
      
        <li v-for="(item,index) in flagList" :key="index" @click="goDetail(item)" >
         
          <span style="justify-content: center;" >
            <label>
              <img :src="item.logo" v-if="item.logo" style="width:6.2vw;margin-right:10px;border-radius:50%"/>
              <img src="https://s1.bqiapp.com/coin/20181030_72_webp/ethereum_200_200.webp" v-else style="width:6.2vw;margin-right:10px;"/>
            <span style="text-align:left">{{item.gold_name}}</span></label>
            <label style="font-size:12px;display:block;text-align:left;margin-top:5px;margin-left:35px">{{item.gold_name_full}}</label>
          </span>
          <span  >
             <label style="margin-bottom:5px;display:block"  v-if ="type=='1'"> {{ item.gold_value != '' ? Number(item.gold_value).toFixed(8) : '0.00'}}</label>
             <label style="margin-bottom:5px;display:block" v-else>  {{ item.gold_value}} </label>
           
            <label style="display:block">{{  item.gold_real != '0'  ? '￥'+ Number(item.gold_real).toFixed(2) : ' ~'}}</label>
          </span>
          
        </li>
        <!-- <div class="addcard">+</div> -->
      </ul>
      <empty  v-else/>
     </van-pull-refresh>
      <van-action-sheet v-model="show"  :title="$t('message.Pleaseselectwallet')"  @cancel="onlead"  >
          <h5 class="wallet--title"><van-icon name="gold-coin-o" />  {{$t("message.ImportedWallet")}}</h5>
          <div class="action-sheet--list" v-for="(child1) in arr1" :key="child1.id" @click="onSelect(child1)">
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp" v-if="child1.wallettype == 2" class="wallet__gold--img">
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/ethereum_200_200.webp" v-else-if="child1.wallettype ==1" class="wallet__gold--img">
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/eos_200_200.webp" v-else-if="child1.wallettype ==3" class="wallet__gold--img"> 
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/tether_200_200.webp" v-else-if="child1.wallettype == 4" class="wallet__gold--img">
                 <label style="display:inline-block;width:150px"> {{child1.walletname}} </label>   
          </div>
          <h5 class="wallet--title"><van-icon name="bill-o" />  {{$t("message.ImportedWallet")}}</h5>
          <div class="action-sheet--list" v-for="(child2) in arr2" :key="child2.id" @click="onSelect(child2)">
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp" v-if="child2.wallettype == 2" class="wallet__gold--img">
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/ethereum_200_200.webp" v-else-if="child2.wallettype ==1" class="wallet__gold--img">
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/eos_200_200.webp" v-else-if="child2.wallettype ==3" class="wallet__gold--img"> 
                 <img src="https://s1.bqiapp.com/coin/20181030_72_webp/tether_200_200.webp" v-else-if="child2.wallettype == 4" class="wallet__gold--img">
                 <label style="display:inline-block;width:150px">{{child2.walletname}} </label>     
          </div> 
          <div class="action-sheet--list" @click="leadWallet">
                 {{$t("message.ImportWallet")}}
          </div> 
      </van-action-sheet>
      <!-- <van-action-sheet v-model="show" :actions="actions" @select="onSelect"   @cancel="onlead"   cancel-text="导入钱包"/> -->
     
      
      
      <van-popup v-model="showPop" class="walletPopup" position="right" >
         <div class="qrcode">
          <div class="qrcode-box linear-button"> 
            <span> {{$t("message.Paymentaddress")}}</span>
          </div>
           <qrcode-vue style="padding:10% 20% 0;width:60%" :value="mygold[0].gold_address"></qrcode-vue>
             
           <p  style="    word-wrap: break-word;">{{mygold[0].gold_address}} </p>
          
          
            <van-button type="info"   size="large" class="copybutton copybutton2"  @click.stop="getCopy(2)"  :data-clipboard-text="mygold[0].gold_address">{{$t("message.copy")}}</van-button>
         </div>
     </van-popup>
     <van-popup v-model="showHelp" class="hlep-popup--style" @click-overlay="showPopup">
          <div class ="help" v-if="getCookie('lang') == 'zhCHS'" >
            <h3>为什么要创建EOS账户？</h3>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;EOS账号和以太坊不同，不再是一长串的字符，你可以自定义你的账户名。EOS账户允许的字符包括数字1-5和26个英文字母，你可以在这个范围内组合自己喜欢的账户名。</p>
           
            <p>&nbsp;&nbsp;&nbsp;&nbsp;由于EOS账户不会随机自动生成，ASC是基于EOS技术开发的代币，所以需要创建EOS账户用于存放ASC通证。EOS账号的创建需要花费少量的费用，主要是因为账号的储存会消耗一定的RAM资源，大约4kb，内存也需要花钱来购买。我们输入合适的账户名并支付费用后，就可以完成注册。</p>
      
          </div>
           <div class ="help" v-else>
            <h3>Why is creating EOS account required?</h3>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;EOS account is different from ETH, instead of being a long string of characters, you can define your own account name. The allowed characters of EOS account include the number 1-5 and 26 letters, in combine of which you can create your prefer account name.</p>
           
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Since the EOS account can not be created randomly and automatically, and ASC is a Token that developed based on EOS technology, it’s necessary to create EOS account for the storage of ASC Token. The creation of EOS account will cost slight expense, mainly because the saving of account need to cost a certain volume of RAM resource - about 4kb, which also needs money to buy. After entering a proper account name and paying for the expense, the register will be done.</p>
      
          </div>
     </van-popup>
   
      <!-- right -->
      <van-popup  v-model="leadVisabled" position="right" :overlay="true">
            <div style="padding:30px 0 30px">请选择钱包类型</div>
            <div class="van-cell--box" @click="gourl(1)">
              <div class="van-cell--icon"><img src="https://s1.bqiapp.com/coin/20181030_72_webp/ethereum_200_200.webp"></div>
              <div class="vav-cell--info">以太坊</div>
              <div class="vav-cell--right"><van-icon name="arrow"  /></div>
            </div>
             <div class="van-cell--box" @click="gourl(2)">
              <div class="van-cell--icon"><img src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp"></div>
              <div class="vav-cell--info">比特币</div>
              <div class="vav-cell--right"><van-icon name="arrow"  /></div>
            </div>
             <div class="van-cell--box" @click="gourl(3)">
              <div class="van-cell--icon"><img src="https://s1.bqiapp.com/coin/20181030_72_webp/eos_200_200.webp"></div>
              <div class="vav-cell--info">EOS</div>
              <div class="vav-cell--right"><van-icon name="arrow"  /></div>
           </div> 
           <div class="van-cell--box" @click="gourl(4)">
              <div class="van-cell--icon"><img src="https://s1.bqiapp.com/coin/20181030_72_webp/tether_200_200.webp"></div>
              <div class="vav-cell--info">USTD</div>
              <div class="vav-cell--right"><van-icon name="arrow"  /></div>
           </div> 
      </van-popup>
      <!-- right -->
       <!-- popup -->
      <van-popup
      v-model="openFlag"
      position="right"
      :style="{ height: '100%' }"
    >
      <div class="list-choice-box">
          <div class="list-choice" v-for="(item,i) in mygold" :key="i" >
            <van-row >
              <van-col :span="12" style="text-align:left">
                  <span>{{item.gold_name}}</span>
              </van-col>
              <van-col :span="12" style="text-align:right">
                  <van-switch
                    v-model="item.showFlag"
                    size="20px"
                    @change="onshow(mygold,i)"
                  />
              </van-col>
            </van-row>
          </div>
      </div>
   
    </van-popup>
    <!-- //popup -->
  </div>
  
</template>

<script>

import { getmygold, getgoldlist,getRegisterPost } from '@/api/wallet'
import { Toast, Dialog, Actionsheet,Popup ,Icon} from 'vant'
import Clipboard from "clipboard"
import QrcodeVue from 'qrcode.vue'
import empty from '@/components/empty.vue'
import {decodeStr} from '@/utils/utils.js'
import { judgeTerminal } from '@/utils/utils'
export default {
  data () {
    return {
      pa:'',
      money:'',
      type:0,
      showMoney:0,
      canMoney:0,
      showHelp:true,
      clipboard1: null,
      clipboard2: null,
      showPop:false,
      nowAccount:'',
      isLoading:false,
      mygold: [
      {
        nowGold:3,
        gold_name: 'ASC',
        gold_address:'',
        logo: 'https://img.ttex.com/c29389d3e004e3cd45c3eceea6c692cf',
        gold_value: 0,
        gold_real: 0
      }
      ],
      flagList:[],
      show: false,
      actions:[],
      title: 'ETH',
      leadVisabled:false,
      openFlag:false,//资产开关
      parame:'',
      arr1:[],
      arr2:[],
      scanresult:''
    }
  },
  filters:{
    word(val){
      if(!val){
        return val
      }else{
        return val.substr(0,3)+"****"+val.substr(7)
      }
    }
  },
  created() {

    if (!localStorage['_shop_userId']) { 
       this.$router.push({
         path:'/',
         })
       return
    }   
    
    if (!localStorage['type']) { 
      localStorage['type'] = 3
    }
    this.type = localStorage['type']
      if (!localStorage['walletid']) { 
      localStorage['walletid'] = 1
    } 
    this.nowGold = localStorage['type']
    this.actions.forEach((item,index)=>{
        if (item.id==localStorage['walletid']) {
          this.title = item.name
        }
      })  
    this._getgoldlist()
    this._getmygold()
    // this.test() 
  },
  
  mounted () {
    this.$parent.footshow = true
    window.scanResult = this.scanokjs
    window.getRegisterId = this.getRegisterId
 
  },
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    goscan(){
       if (judgeTerminal() == 'Android'){
        jsbridge.scan('')
       }
          if (judgeTerminal() == 'Ios') {
               window.webkit.messageHandlers.scan.postMessage("")
          }
     
    },
    
    onRefresh(){
      setTimeout(() => {
        this.$toast('刷新成功')
        this.flagList=[]
        this.isLoading = false
        this.arr1 = []
        this.arr2 = []
        this._getmygold()
         this._getgoldlist()
      }, 500)
    },
    onshow(arr,index){
      let arrFlag = []
      
      arr.map(item=>{
         if(!item.showFlag) {
           arrFlag.push(item)
         }
      })
      localStorage['_showList'] = JSON.stringify(arrFlag)
      this.flagList = []
      this._getmygold()
    },
    goback() {
      this.$router.back()
    },
    gourl(id){
       this.$router.push({
         path:'/import',
         query:{
           id:id
         }
       })
    },
    onlead(){
    this.show = false
    },
   leadWallet(){
   this.show = false
   this.leadVisabled = true
   },
    scanokjs(str){
   
      this.scanresult = (decodeStr(str))
 
      this.pa = this.scanresult.addr
      this.money = this.scanresult.money
      console.log(this.pa)
       switch (localStorage['type']){
            case '1':
            case '4':
                if (this.pa.length!=42) {
                  Toast.fail('该地址不是ETH地址，请切换地址对应钱包!')
                  this.pa = ''
                  this.money=''
                return
              }
              break;

            case '2':
              if (this.pa.length<48) {
                Toast.fail('该地址不是BTC地址，请切换地址对应钱包!')
                  this.pa = ''
                  this.money=''
                return
              }
              break;
            case '3':
              if (this.pa.length!=12) {
                Toast.fail('该地址不是EOS地址，请切换地址对应钱包!')
                  this.pa = ''
                  this.money=''
                return
              }
              break;
          }
 
      this.$router.push({
        path: '/transferASC/' + localStorage['walletid'],
        query:{
          addr: this.pa,
          transmoney : this.money,
          money:  this.canMoney
        }
      })
    },
    goRece(){
      if ( this.nowAccount) {
            this.showPop = true
            let that = this
            that.$nextTick(() => {
              that.clipboard2 = new Clipboard(document.querySelector('.copybutton2'));    
            })
      } else {
        Toast.fail('创建账户后即可收款')
      }
  
    },
    getCopy(type) {
        let clipboard = null;
        switch(type){
          case 1:
             clipboard = this.clipboard1
            break;
          case 2: 
           clipboard = this.clipboard2
            break;
        }
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
 
 
    goDetail(item) {
    
      if (!this.nowAccount) {
        Toast.fail('请先绑定账户')
        
         this.$router.push({
            path: '/walletmanage/' + localStorage['type'],
            query:{
              contract:item.contract,
              symbol:item.walletname,
              address:item.gold_address,

            }
          })
      
      }else{
             if(item.contract){
              this.$router.push({
                path: '/assetsmanage/' + item.id,
                query:{
                  contract: item.contract,
                  name:item.gold_name,
                  address:localStorage['asc_address'],
                  gold_value:item.gold_value,
                  gold_real: item.gold_real
                }
              })
            }
      }
      // if (localStorage['type']!='1') {
      //   Toast('暂未开放！')
      //   return
      // }
      // localStorage['goldId'] = goodType
 
     
    },
    goTransactionRecord() { // 交易记录
      this.$router.push({
        path: '/transactionrecord/1'
      })
    },
    goTransferASC(goldId) { // 转账
      if (localStorage['type']!='1') {
        Toast('暂未开放！')
        return
      }
      localStorage['goldId'] = goldId
      this.$router.push({
        path: '/transferASC/' + '0'
      })
    },
    goReceivables(goldId) { // 收款
      localStorage['goldId'] = goldId
      if (localStorage['type']!='1') {
        Toast('暂未开放！')
        return
      }
      this.$router.push({
        path: '/receivables'
      })
    },
    gomanage() { // 钱包管理
      this.$router.push({
        path: '/walletmanage/'+ localStorage['type'],
        query:{
          title:this.title
        }
       })
    },
    onSelect(item) {
      if(item.walletname=="EOS(待创建)"){
         this.showHelp = true
        
        return
      }
      this.show = false
      localStorage['walletid'] = item.id
      localStorage['type'] = item.wallettype
      this.type = item.wallettype
      this.nowGold = item.wallettype
      this.title = item.walletname
      this.flagList = []
      this.showMoney = 0
      this._getmygold()
    },
    _getmygold() {
      let that = this
      let obj = {}
      let newArr=[]
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.walletid = localStorage['walletid']
      Toast.loading({
        forbidClick: true,
        duration: 3000,
        message:'Loading...',
        
      })
      getmygold(obj).then((res)=>{
        if (res.status == 200) {
         
            this.$toast.clear()
            localStorage['asc_address'] = res.data.myGold[0].gold_address
            this.canMoney =  res.data.myGold[0].gold_value
            res.data.myGold.map((data,i)=>{
   
              data.showFlag= true
            
            })    
      

            res.data.myGold.map((data,i)=>{
                if (res.data.myGold[i].contract == 'eosio.token'  ||res.data.myGold[i].contract == 'ETH'  ||res.data.myGold[i].contract == 'BTC' ||   res.data.myGold[i].contract == 'USDT'  ) {
                  this.showMoney = res.data.myGold[0].gold_real  
                  return
                }  
             })  
             this.mygold = res.data.myGold
            if(localStorage['_showList']) {           
               let newArr = []
               let showList =  JSON.parse(localStorage['_showList'])
              //  console.log(this.mygold,showList)
              //  showList.map(item => {
              //    //contract
              //   this.mygold.map(item2 => {

              //   })
              //  })
               this.mygold.map((item,i)=>{
                  showList.map(child=>{
                     if(item.gold_name == child.gold_name) {
                        item.showFlag = false
                     }
                  })
               })

               this.mygold.map((data,i)=>{
                   if(data.showFlag) {
                    newArr.push(data)
                   }
               })
               this.flagList = newArr
             
            }else {
               this.flagList = res.data.myGold
            }
            //TODO
           
            that.$nextTick(() => {
              const el = document.querySelector('.copybutton1')
           
              if(el){
                this.clipboard1 = new Clipboard(el);
              }
             
            })
            


            this.nowAccount = res.data.myGold[0].gold_address
            if ( this.nowAccount ) {
            }
            Toast.clear()
        }
      })
    },
    _getgoldlist() {
     
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
    
      getgoldlist(obj).then((res)=>{
        
        if (res.status == 200) {

          let arr1 = []
          let arr2 = []
          res.data.map(item=>{    
             if(item.from == 0){
              arr1.push(item)
             }else{
               arr2.push(item)
             }  
          })
          this.arr1 = arr1
          this.arr2 = arr2
          this.actions = res.data
      
          if (localStorage['walletid']) {
           res.data.forEach((item,index)=>{     
              if (item.id==localStorage['walletid']) {
                localStorage['type'] = item.wallettype
                this.title = item.walletname
                  this.nowGold = item.wallettype
                  return
              }
            })
          } 
        } else {

          Toast.fail(res.msg)
          if (res.msg.indexOf("数据异常") >= 0) {
            localStorage.clear()
            Toast.loading({
              duration: 2000,
              mask: true,
              message: res.msg
            });
            this.$router.replace({
              path: '/'
            })
            return
          }
        }
      })
    },
    go(){
      this.$router.push({
        path:'/add'
      })
    },
    test(){
      // window.location.href='ascaction://getregisterid'
      if (judgeTerminal() == 'Android'){
         window.jsbridge.getregisterid()
      } 
      if (judgeTerminal() == 'Ios') {
        console.log(window.webkit)
         window.webkit.messageHandlers.getregisterid.postMessage()
      }
       
    },
    getRegisterId(id){
       this.parame = id

       if(id != 0 || id !='') {
          getRegisterPost({
            id:id,
            uid:localStorage['_shop_userId']
          }).then(res=>{
             this.parame = JSON.stringify(res.data)
          })
       }
       
    },
    showPopup(){
      Dialog.confirm({
          title: '提示',
          message: '您还未创建EOS账户前往创建'
        }).then(() => {

            this.$router.push({
              path:'/mycreateeos'
          })
        }).catch(() => {
          // on cancel
        });
    }
  },
  destroyed () {
    this.$toast.clear()
  },
  watch: {
  
  },
  components: {
    QrcodeVue,
    empty
  }
};
</script>
<style scoped lang="stylus" >
.assetsmanage
  position: absolute
  width: 100%
  height: 100%
  background: #fff
  text-align:center
  .topbg
    background:#fff
  .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:18%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
      justify-content: center
    .select
      display:flex
      align-items:center
      justify-content: center
      border:1px solid rgb(229,229,229)
      border-radius:15px
      padding:2px 5px
      width:80px
      span
        margin-right:10px
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px
      img
        width:20%
  .top
    padding:15px
    margin:22px 15px 0
    border-radius:8px
    display:flex
    align-items: center
    flex-direction: column
    background:url('/images/common/bg@2x.png')no-repeat center/cover
    .top-title
      width:100%
      color:#fff
      text-align:left
      img
        position: absolute
        width: 40px
        left: 8%
        border-radius:50%
      span
        display:flex
        justify-content:space-between
        // margin-left: 16%
       font-size:18px
      
    ul
      margin-top: 5%;
      width:calc(30px + 100%)
      display:flex
      justify-content: space-between
      align-items: center
      li
        display:flex
        flex:1
        flex-direction:column
        color:#fff
        span
          font-size:14px
          color:rgba(255,255,255,0.9)
          margin-bottom:10px
        label
          font-size:19px
          margin-bottom:15px
 

    .top-btn
      width:100%
      display:flex
      justify-content: center
      border-top:1px solid rgba(255,255,255,0.9)
      margin:0 15px
      span
        background:rgba(255,255,255,0.3)
        color:#fff
        border-radius:30px
        font-size:15px
        padding:2px 25px
        margin:15px 15px 0
  .qrcode
    
    max-resolution 0
    padding-bottom:0
 
    p
      margin:10px 
      font-size:12px;
      overflow hidden

  .list
    background:#fff
    display:flex
    flex-direction:column
    margin:0 15px 60px
    li
      color:rgb(51,51,51)
      display:flex
      justify-content: space-between
      background:#f5f6f7
      border-radius:8px
      padding:15px
      margin-top:15px
      span
        // display:flex
        // flex-direction:column
        // justify-content: space-between
      span:first-child
        label:first-child
          font-size:17px
          display: flex
          align-items: center
        label:last-child
          font-size:15px
      span:last-child
            display: block
            text-align: right
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
          
        // align-items: flex-end
        /*label:first-child
          font-size:30px
          transform: rotate(180deg)*/
           
        label:last-child
          font-size:15px
    .addcard
      font-size:50px
      color:rgb(229,229,229)
      margin-top:50px
  .help
    background:rgb(250,250,250)
    width:250px
    height: 400px;
    h3
      margin:15px 10px 30px
    p
      margin-left:10px
      text-align:left
      line-height: 22px;
      font-size: 14px;
  .operate 
    .van-button--default
     background:rgba(255,255,255,.3)
     color:#fff
     border:0
     min-width:70px
   
</style>
<style scoped>

  .money{
    padding:20px 20px 0;
    font-size: 18px
  }
  .top-mt {
    margin-bottom: 5px
  }
  .top-mb {
    font-size:12px;
    margin-bottom: 10px;
    justify-content: start!important;
  }
  .top-mb i {
    margin-left:10px;
    position:relative;
    top:-2px
  }
  .real-money {
    text-align: right;
    margin-top: 10px 
  }
  .walletPopup.van-popup--right {
    right: 15%;
    border-radius: 10px;
    width: 70%;
    height:auto;
  }
  /* .money .van-icon {
    font-size: 18px
  } */
  .copyBtn{
    width: 100%;
    height: 22px;
    line-height: 22px;
    border-radius: 20px;
    border: 1px solid;
    margin: 0 auto;
    font-size: 12px;
  }
  .qrcode-box {
    color: #fff;
    padding:15px 20px
  }
  .van-cell--box {
    position: relative;
    padding:20px 35px 20px  60px;
    border-bottom: 1px solid #eee
  }
  .van-cell--icon {
    position: absolute;
    left: 15px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    border-radius: 50%;
    top: 50%;
    margin-top: -16.5px
  }
  .vav-cell--info {
    text-align: left;
    padding-left: 15px;
}
  .van-cell--icon  img{
    width: 25px;
    position: relative;
    vertical-align: middle;
  }
  .vav-cell--right {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top:-9px;
}
.van-cell--box:last-child{
  margin-bottom: 30px
}
.copybutton2{
  line-height:40px
}
.action-sheet--list {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
}
.wallet--title{
    text-align: left;
    background: #f8f8f8;
    padding: 10px 15px;
    font-weight: normal;
    font-size: 12px;
    color: #999;
}
.hlep-popup--style {
  border-radius:15px;
  padding:20px;
  background:#fafafa;
}
.list-choice-box {
  padding: 20px
}
.transactionrecord .van-popup--right {
  width: 70%
}
.list-choice {
    margin: 15px 0px;
    font-size: 14px;
}
.wallet__gold--img {
    width: 20px;
    position: relative;
    top: 4px;
    margin-right: 5px;
   
}
.van-action-sheet__content {
  max-height:60vh
}
</style>

