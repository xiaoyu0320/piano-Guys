<template>
  <div class="walletmanage fixed-top" >
    <div class="heard fixed">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.resources')}}</label>

      <label></label> 
    </div>
    <div class="top">
         <div style="margin: auto;">{{accountInfo.account_name}}</div>
       
      
    </div>
      <div class="list">
        <div class="role">
           <span>
                 <label>角色</label> 
                 <label>owner</label>
           </span>
          <span>
            <label>公钥</label>
            <label>{{accountInfo.permissions[0].required_auth.keys[0].key}}</label>
          </span>
           <span>
            <label>权重</label>
            <label>1</label>
          </span> 
        </div>

          <div class="role">
           <span>
                 <label>角色</label> 
                 <label>active</label>
           </span>
          <span>
            <label>公钥</label>
            <label>{{accountInfo.permissions[0].required_auth.keys[0].key}}</label>
          </span>
           <span>
            <label>权重</label>
            <label>1</label>
          </span> 
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
  
      nowAccount:'',
      accountInfo:[],
      userinfo: []
    }
  },
  created() {
   
     // this._getmygold()
     this._getaccountinfo()
  },
  methods: {
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
    
       if (!obj.account ) {
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
          console.log(this.accountInfo)
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
      font-size:20px
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
  .list
    width:80%
    align-items: left
    margin-left:6%
    .role 
      span
        display:flex
        justify-content: space-between 
  
      label:last-child
        flex: 1
        word-break: break-all
        width: 90%
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
      align-items: left
      img
        margin-right:5px
  
      
</style>