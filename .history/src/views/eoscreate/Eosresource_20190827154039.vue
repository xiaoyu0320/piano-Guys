<template>
  <div class="walletmanage fixed-top"  v-if="EosAccount!=''">
    <div class="heard fixed">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.resources')}}</label>

      <label></label> 
    </div>
    <div class="top">
         <div style="margin: auto;">{{accountInfo.account_name}}</div>
      
        <span>{{$t('message.asset')}}</span>
        <label>{{accountInfo.core_liquid_balance}}</label>
    
      <div class="balance"  v-if="accountInfo">
      <div class="balance-detail">
        <span>{{$t('message.CPURent')}}</span>
        <label>{{accountInfo.total_resources.cpu_weight}}</label>
      </div>
      <div class="balance-detail">      
        <span>{{$t('message.netStake')}}</span>
        <label>{{accountInfo.total_resources.net_weight}}</label>
       </div>
      <div class="balance-detail">      
        <span>{{$t('message.ramUnstake')}}</span>
        <label>{{accountInfo.total_resources.ram_bytes}}</label>
       </div>    
     </div>
    </div>
      <div class="list">
        <div class="ram">
        <span> {{$t('message.Storage')}}</span> 
         <label><van-circle v-model="ramRate" size="80px" fill="#ddd" :text ="Number((accountInfo.ram_usage/ accountInfo.ram_quota)*100).toFixed(2)+'%'" :rate="30" :speed="100" /></label>
        <label>{{accountInfo.ram_usage}} / {{accountInfo.ram_quota}}</label>
        <p>
          <van-button plain hairline size="small" @click="buttonClick()" type="primary"> {{$t('message.Buy')}}</van-button>
          <van-button plain hairline size="small" @click="buttonClick()"  type="primary"> {{$t('message.Sell')}}</van-button>
        </p>
        </div>
         <div class="cpu">
        <span>CPU</span>
         <label><van-circle v-model="ramRate" size="80px" color="#07c160" fill="#ddd" :text ="Number((accountInfo.cpu_limit.used/ accountInfo.cpu_limit.max)*100).toFixed(2)+'%'" :rate="30" :speed="100" /></label>
        <label>{{accountInfo.cpu_limit.used}} / {{accountInfo.cpu_limit.max}}</label>
         <van-button plain hairline size="small"  @click="buttonClick()"  type="primary">{{$t('message.CPURent')}}</van-button>
         </div>
          <div class="net">
         <span>NET</span>
         <label><van-circle v-model="ramRate" size="80px" color="red" fill="#ddd" :text ="Number((accountInfo.net_limit.used/ accountInfo.net_limit.max)*100).toFixed(2)+'%'" :rate="30" :speed="100" /></label>
         <label>{{accountInfo.net_limit.used}} / {{accountInfo.net_limit.max}}</label>
         <p>
          <van-button plain hairline size="small" @click="buttonClick()"  type="primary">{{$t('message.Stake')}}</van-button>
           <van-button plain hairline size="small"  @click="buttonClick()"  type="primary">{{$t('message.Unstake')}}</van-button>
         </p>
       </div>

      </div>
  </div>
</template>

<script>
import { getmygold,getaccountinfo } from '@/api/wallet'
import { Toast ,Button,Circle} from 'vant'
export default {
  data () {
    return {
      ramRate:0,
      EosAccount:'',
      mygold:{
        gold_value:''
      },
      type:0,
      nowAccount:'',
      accountInfo:'',
      userinfo: []
    }
  },
  created() {
     this.type = this.$route.params.type
     // this._getmygold()
     this._getaccountinfo()
  },
  methods: {
    buttonClick(){
      Toast('暂未开放！')
    },
    goback() {
      this.$router.back()
    },
    goTransactionRecord() { // 交易记录
      this.$router.push({
        path: '/transactionrecord/0'
      })
    },
    goAssetsManage() { // 总资产管理
      console.log('sss')
      this.$router.push({
        path: '/assetsmanage'
      })
    },
    goExport() {
      Toast('暂未开放')
    },
    _getaccountinfo(){
      let obj = {}
      obj.account = localStorage['asc_address']
      this.EosAccount = obj.account
      obj.uid = localStorage['_shop_userId']
      if (!obj.account) {
        Toast.fail('请先创建账户')
          setTimeout(() => {
            this.goback()
           },2000)
   
        return
      }
      getaccountinfo(obj).then(res=>{

         if (res.status == 200) {
          let result = JSON.parse(res.data)
          this.accountInfo = result.data
          console.log(result.data)
          Toast.clear()
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
     _getmygold() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.id = 3
      Toast.loading({
        mask: true
      })
      getmygold(obj).then((res)=>{
        if (res.status == 200) {
          this.mygold = res.data.myGold
          this.nowAccount = res.data.myGold.gold_address
          Toast.clear()
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
 },
  components: {
  }
};
</script>
<style scoped lang="stylus" >
.walletmanage
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
  .top
    margin:25px
    padding-bottom:25px
    display:flex
    align-items: left
    flex-direction: column
    border-bottom:10px solid rgb(245,245,245)
    span
      padding:10px
      font-weight:400
      font-size:16px
    label
      font-weight:400
      padding-left:10px
      font-size:25px
    .balance
      width:90%
      justify-content: space-around
      display: flex
      border:1px solid rgb(229,229,229)
      border-radius:8px
      margin-top:10px
      padding:5%
      .balance-detail
        display:flex
        flex-direction: column  
        span
          font-size:16px
          font-weight:normal
        label
          padding-left:0px
          margin-top:5px
          color:rgb(100,100,100)
          font-size:12px
  .list
    width:80%
    display:flex
    flex-direction:column
    align-items: left
    margin-left:6%
    .ram 
      p
        display:flex
        justify-content: space-around 
        margin-top:15px
      label
        margin-bottom:20px
        display: flex;
        justify-content: center
      line-height: auto;
      margin-bottom:5%
      width:100%
      padding:5%
      border-radius:8px
      border:1px solid rgb(229,229,229)
    .cpu
      p
        display:flex
        justify-content: space-around 
        margin-top:15px
      label
        margin-bottom:20px
        display: flex;
        justify-content: center
      line-height: 25px;
      margin-bottom:5%
      width:100%
      padding:5%
      border-radius:8px
      border:1px solid rgb(229,229,229)
    .net
      p
        display:flex
        justify-content: space-around 
        margin-top:15px
      label
        margin-bottom:20px
        display: flex;
        justify-content: center
      line-height: 25px;
      margin-bottom:5%
      width:100%
      padding:5%
      border-radius:8px
      border:1px solid rgb(229,229,229)
    label
      margin:15px
    span
      display: flex
      align-items: center
      justify-content:center
      img
        margin-right:5px
  
      
</style>