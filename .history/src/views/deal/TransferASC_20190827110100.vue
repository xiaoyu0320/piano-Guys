<template>
  <div class="bindphone">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.transfer')}}</label>
      <label></label>
    </div>
  	<div class="login-content" style="padding-bottom:15px">
  		<span>
        <input type="text" @input="input" :placeholder="$t('message.receiptaddress')" v-model="pa" />
       <div @click="goscan" style="width:8%;display: flex;justify-content: flex-start;align-items: center;">
            <img src="/images/other/icon_scan@2x.png" width="100%"/>
        </div>
    
        </span>
      <span><input type="number" :placeholder="$t('message.transferamount')" v-model="money"/></span>
      <span><input type="password" :placeholder="$t('message.paypassword')"  v-model="password"/></span>
        <div  ><label>{{$t('message.availablebalance')}}：{{canmoney}}<span v-if="type!='3'"> {{symbol}}</span> </label></div>
        
    </div>
    <div class="login-content" style="border-top:10px solid rgb(245,245,245)">
      <span><input type="text" :placeholder="$t('message.remarks')" v-model="remarks"/></span>
          <div v-if="type == '1' || type == '4'"  style="display:flex;display: flex;justify-content: space-between;padding: 0 5px;font-size: 14px;    padding: 5px 5px 10px;">
               <p  style="text-aiign:left;" > 手续费：{{gas.fastest/100000}}</p>
               <p > 平均到账时间1-5分钟</p>
     </div> 
    </div>
     
  	<div class="login-bottom">
  		<span class="btn linear-button" @click="ok">{{$t('message.transfer')}}</span>
  	</div>
  </div>
</template>
 
<script>
import { getgolddetail, asc2asc, eth2eth, transfer ,transferEthtoken, checkuserstatus,getgas} from '@/api/wallet'
import { Toast, Dialog } from 'vant'
import {decodeStr,judgeTerminal} from '@/utils/utils.js'
export default {
  data () {
    return {
      id:0,
      unit:'',
      type: localStorage['type'],
      ETH: 0,
      pa:'',
      money: '',
      canmoney:this.$route.query.money,
      password: '',
      remarks: '',
      account:this.$route.query.account,
      contract:this.$route.query.contract,
      mygold: {
        gold_name: 'ASC',
        logo: '',
        gold_value: 0,
        gold_real: 0
      },
      symbol:this.$route.query.symbol,
      passwordStatus:false,
      gas:'',
      scanresult:'',
      device:0 //0 ios 1 anroid
    }
  },
  created() {
   
    getgas({}).then(res=>{
      this.gas =  res.data
    })
  
  
   
    this.id = localStorage['type']
    this.changeUnit(localStorage['type'])
    // this._getmygold()
    if (localStorage['asc_toaddress']) {
      this.pa = localStorage['asc_toaddress']
      localStorage.removeItem('asc_toaddress')
    }

// this._getgolddetail()
  },
  mounted(){
    this.pa = this.$route.query.addr
    this.money = this.$route.query.transmoney   

    window.scanResult = this.getscan
    console.log('mount', this.pa )
    window.scanokjs = this.scanokjs
    //   let str = 'ethereum:0x27A8a05dC7b24e5B44c4341b899593751E2461f3?contractAddress=0xb9feb10ec48f1377e3232504c8d55d8b829e7925&decimal=18&value=113000000000000000000'
        
    // this.getscan(str)
  },
  methods: {
 
    goscan(){
      if(judgeTerminal()=='Ios'){
        window.webkit.messageHandlers.scan.postMessage("")
      }
      if(judgeTerminal()=='Android'){
      
         jsbridge.scan('')
      }
      
    },
    getscan(str){
      console.log(str)
       this.scanresult = (decodeStr(str))
       this.pa = this.scanresult.addr
       this.money = this.scanresult.money

        switch (localStorage['type']){
            case '1':
            case '4':
                if (this.pa && this.pa.length!=42) {
                  Toast.fail('该地址不是ETH地址，请地址对应钱包!')
                  setTimeout(()=>{
                     this.$router.push({
                        path:'/wallet'
                      })
                  }, 2000)
                 
                  this.pa = ''
                  this.money=''
              
               
                return
              }
              break;

            case '2':
              if (this.pa && this.pa.length<48) {
                Toast.fail('该地址不是BTC地址，请切址对应钱包!')
                 setTimeout(()=>{
                     this.$router.push({
                        path:'/wallet'
                      })
                  }, 2000)
                  this.pa = ''
                  this.money=''
                return
              }
              break;
            case '3':
             
              if (this.pa && this.pa.length!=12) {
                Toast.fail('该地址不是EOS地址，请切换对应钱包!')
                  setTimeout(()=>{
                     this.$router.push({
                        path:'/wallet'
                      })
                  }, 2000)
                  this.pa = ''
                  this.money=''
                return
              }
              break;
          }
    },
    input(){
      this.pa = this.pa.trim()
    },
    _checkuserstatus(){
       checkuserstatus({ uid: localStorage['_shop_userId'] }).then(res => {
       if (res.data.pay_password == 0) {
         this.passwordStatus = false
       }else{
          this.passwordStatus = true
       }
    })
    },
    changeUnit(id){
      // console.log(id)
      // switch(id) {
      //   case '1':
      //     this.unit =  ' ETH '
      //     break
      //   case '2':
      //     this.unit =  ' BTC'
      //     break
      //   case '3':
      //     this.unit =  ' EOS'
      //     break 
      //   case '4':
      //     this.unit =  ' ASC'
      //     break   
      //   default:
      //     this.unit =  ''
    
      // }
      // console.log(this.unit)
    },
    scanokjs(str){
      console.log(str)
       this.pa = str
    },
    goback() {
      this.$router.replace({
        path: '/wallet'
      })
    },
    ethPayToken(){
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.num =  this.money
      obj.memo= ''
      obj.pay_password = this.password
      obj.walletid =  localStorage['walletid']
      obj.account = this.account
      obj.toaddress = this.pa
      obj.contract = this.contract
      Toast.loading({
        mask: true
      })
      transferEthtoken(obj).then((res)=>{
        if (res.status == 200) {
          //时间
          Toast.success('已提交链上，请等待确认')
          this.pa=''
          this.money = ''
          this.password = ''
        } else {
          Toast.fail(res.msg)
        }
      })  
    },
    ok() {
      this._checkuserstatus()
    //  if (!this.passwordStatus) {
    //       Dialog.alert({
    //         title: '系统提示',
    //         message:'请先设置支付密码'
    //       }).then( () => {
    //            this.$router.push({
    //               path:'/modifypaypassword'
    //            })
    //       })
    //       return
    //     }
      if (!this.pa) {
        Toast('请输入收款人钱包地址')
        return
      }

      if (!this.password){
        Toast.fail('请输入交易密码')
        return
      }

      switch (localStorage['type'] ) {
        case '1':
          if (this.pa.length!=42) {
            Toast('错误的地址')
            return
          }
          if(this.symbol=='ETH') {
              this._eth2eth()

            }else {
              this.ethPayToken()
              return 
            }
         break;
        case '2':
          Toast('系统维护中')
          return
         break;
        case '3':
         if (this.pa.length>12) {
          Toast('错误的地址')
          return
         }
         this._transfer()
         break;
        case '4':
          if (this.pa.length!=42) {
            Toast('错误的地址')
            return
          }
          this.ethPayToken()
         break;

     }
     this.pa = ''

      
    },
    _transfer(){
    
      var regex=/([0-9]+\.[0-9]{4})*/;
 

    if(this.id==3 && regex.exec(this.money)[0]==''){
        // Toast.fail("请输入正确的金额格式(4位小数)！如 0.0100 ");
        // return;
    }
      if (this.money <=0) { 
        this.money = 0
        return
      }
      let canMoney = this.canmoney.split(' ')[0]
     
    if(parseFloat(canMoney) < parseFloat(this.money)){
        Toast.fail("余额不足");
         return;
    }
  
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']

      obj.memo = this.remarks
      obj.quantity = parseFloat(this.money).toFixed(4) +' '+ this.symbol
      obj.to = this.pa
      obj.password = this.password
      obj.contract = this.contract
      obj.account = this.$route.query.account,
      obj.walletid = localStorage['walletid']
      
       obj.type =1
      
    
      Toast.loading({
        mask: true,
        duration:3000
      })
    
      transfer(obj).then((res)=>{

        if (res.status == 200) {
          
          Toast('转账成功！') 
          this.money=''
          this.password = ''
         setTimeout(() => {  
          this.$router.push({
              path: '/wallet'
           })
          },3000)
     
        } else {
           const toast = Toast.fail({
              duration: 500,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              loadingType: 'spinner',
              message: res.msg
            });
        }
      })   
    },
    // _getgolddetail() {
    //   if (!localStorage['_shop_userId']) {
    //     Toast.fail('请先登录')
    //     this.$router.push({
    //         path: '/login'
    //      })
    //     return
    //   }
    //   let obj = {}
    //   obj.uid = localStorage['_shop_userId']
    //   obj.token = localStorage['_shop_token']
    //   obj.id =  this.id
    //   obj.walletid= localStorage['walletid']
    //   obj.contract = this.contract
    //   obj.account = this.$route.query.account
    //   obj.symbol = this.symbol
    //   obj.type =localStorage['type']
    //   Toast.loading({
    //     mask: true
    //   })
    //   getgolddetail(obj).then((res)=>{
    //     if (res.status == 200) {
    //        this.canmoney = res.data.myGold.gold_value
    //       Toast.clear()
    //     } else {
    //       Toast.fail(res.msg)
    //     }
    //   })
    // },
    _asc2asc(){
        let reg = /(^[1-9]\d*?$)/
        if (reg.test(this.money) === false || this.money == '') {
          Toast('只能为大于0的整数')
          return
        }
        let obj = {}
        obj.uid = localStorage['_shop_userId']
        obj.toaddress = this.pa
        obj.asc = this.money
        obj.memo = this.remarks
        obj.pay_password = this.password
        obj.walletid = localStorage['walletid']
         obj.account = this.$route.query.account,
        Toast.loading({
          mask: true,
          duration: 3000,
          message: '转账中...'
        })
        this.pa = ''
        this.money = ''
        this.remarks = ''
        this.password = ''
        asc2asc(obj).then((res) => {
          if (res.status === 200) {
            this.$toast.clear()
            Toast.success({
              duration: 2000,
              mask: true,
              message: '已提交以太坊，请等待确认'
            })
            setTimeout(() => {  
              // this._getmygold()
            },2000)
          } else if (res.status === 400) {
            
            Toast.fail(res.msg)
          }
        }).catch(() => {
          Toast.fail('请求超时')
        })
    },
    _eth2eth(){
      if (this.money<0.0003) {
        Toast('交易金额不能低于0.0003')
        return
      }

      if (this.money>this.canmoney) {
        Toast('可用余额不足')
        return
      }
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.toaddress = this.pa
      obj.num = this.money
      obj.memo = this.remarks
      obj.walletid = localStorage['walletid']
      console.log(this.password)
      obj.pay_password = this.password
       obj.account = this.$route.query.account
      Toast.loading({
        mask: true,
        duration: 2000,
        message: '转账中...'
      })
      this.pa = ''
      this.money = ''
      this.remarks = ''
      this.password = ''
      eth2eth(obj).then((res) => {
        this.$toast.clear()
        if (res.status === 200) {
          
          Toast.success({
            duration: 500,
            mask: true,
            message: '已提交以太坊，请等待确认'
          })
          setTimeout(() => {  
            // this._getmygold()
          },500)
        } else if (res.status === 400) {
          Toast.fail(res.msg)
        }
      }).catch(() => {
        Toast.fail('请求超时')
      })
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.bindphone
  text-align:center
  .heard
    font-size:17px
    color:rgb(51,51,51)
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
  .login-content
    text-align: left
    display: flex
    flex-direction: column
    padding:0 25px
    span
      display:flex
      align-items: center
      border-bottom:1px solid rgb(229,229,229)
      margin-top:15px
      label
        width:6%
        img
          width:100%
      .code
        background:rgb(245,245,245)
        font-size:12px
        width:40%
        display: flex
        align-items: center
        justify-content: center
        padding:6px 0
        border-radius:12px
    div
      font-size:12px
      color:rgb(153,153,153)
      margin-top:15px
      display: flex
      justify-content: space-between
      label
        color:rgb(51,51,51)
    input
  	  border:none
  	  outline:none
  	  width:100%
  	  padding:15px 0
  .login-bottom
  	display:flex
  	flex-direction: column
  	margin-top:100px
  	.btn
  	 
  	  color:#fff
  	  font-size:15px
  	  padding:12px 0
  	  border-radius: 50px
  	  width: 73.5%
  	  margin: 0 auto
  	.agreement
  	  margin-top:18px
  	  font-size:12px
  	  color:rgb(153,153,153)
  	  display:flex
  	  justify-content:center
  	  align-items: center
  	  label
  	  	background:rgb(244,155,10)
  	  	border-radius:50%
  	  	width:11px
  	  	height:11px
  	  	padding:2px
  	  	margin-right:10px
  	  	img
  	  	  width:100%
  	  span
  	    color:rgb(51,51,51)
</style>