<template>
  <div class="createaccount"  >
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.createAccount')}}</label>

      <label></label> 
    </div>
      <div class="create--down">
          <label>{{$t('message.Pleaseselectwallet')}}</label>
          <div @click="walletShow = true" class="create__input create__cirle"> {{walletName}}</div>
          
      </div> 
       <div class="create--down">
          <label>当前余额</label>
         <input type="text" v-model="balance" class="create__input" disabled>
          
      </div> 
 
    <!-- <div class="top">
         <div style="margin: auto;">{{userinfo.mobile}}</div>
       
        <div class = "power">
          <div class="power-list">
          
            <van-field type="text" style="flex:1"  />
          </div>
          <div class="power-list">
            <span>您的已释放asc</span>
            <span>{{userinfo.ascpower}}</span>
              <span @click="goExchange">{{$t('message.exchange')}}</span>
         </div>
        </div>
      
    </div> -->
      <div class="list">
        
         <label>1.请输入创建的EOS账户（12位,a-z,1-5）<van-icon color="#888" @click="_showhelp(1)"  name="question-o" /> </label>
         <span class="span">
           <van-field v-model="newEosAccount" label ="EOS账户" required placeholder = "12位,a-z,1-5" />

           <van-button    size="small" type="info" @click="randomword">随机</van-button>
           <label style="color:red;width: 50px;" @click="checkAccount" >检查</label>
         </span>
 
          <div class="createkey">
         <label>2.请创建owner和active <van-icon color="#888"  @click="_showhelp(2)"  name="question-o" /> </label>

          <van-field v-model="owner" label ="owner" required placeholder = "" />
          <van-field v-model="active" label ="active" required placeholder = "" />  
          <div style="height:15px;"></div>
          <van-button   size="small"    type="info" @click="_createkey">生成</van-button>     
          </div>  
          <div class = "resource">
            <label>3.请选择资源 <van-icon color="#888"   @click="_showhelp(3)"  name="question-o" /> </label>
             <div style="width:90%;padding:3% 15%;" >
              <label>费用(注：价格实时浮动可能有小幅变化)</label>
              <p style="color:red;margin:10px;">需要 {{costeth}}</p>
        
            </div>

            <div style="width:90%;padding:3% 15%;" >
              <label>CPU</label>
              <van-slider v-model="cpu" active-color="#f44"  >
                <div slot="button" class="custom-button">{{(0.1+ cpu/10).toFixed(2)}} EOS </div>
              </van-slider>
            </div>
            <div style="width:90%;padding:3% 15%;" >
              <label>NET</label>
              <van-slider v-model="net"   sactive-color="#f44"   >
                <div slot="button" class="custom-button">{{(0.1+ net/10).toFixed(2)}} EOS </div>
              </van-slider>
            </div>
            <div style="width:90%;padding:3% 15%;" >
              <label>RAM</label>
              <van-slider v-model="ram"  active-color="#f44"  disabled>
                <div slot="button" class="custom-button">{{4000}} bytes </div>
              </van-slider> 
            </div>
          </div>
         

         <van-button style="margin: 5px auto 40px ;"  size="small"  type="info" @click="_createAccount" >创建</van-button>
      </div>
      <div class= "help" v-if="showHelp" @click="showHelp=false">
         <div v-html="helpText"></div>
      </div>
      <!-- 支付组件 -->
      <pay :payShow="payShow"  ref="payConfirm" @callback="back"  />  
      <!-- 支付组件 -->
      <van-action-sheet
      v-model="walletShow"
      :actions="walletList"
      @select="walletBack"
    />
  </div>
</template>

<script>
import Pay from "../../components/Pay.vue"
import { getmygold,getaccountinfo ,createkey,getmarket,getbalance,createAccount,getinfobyuid,checkuserstatus,getgoldlist,token2EosAccount} from '../../api/wallet'
import { Toast ,Button,Field,Slider,Icon,Dialog} from 'vant'
export default {
  data () {
    return {
      showHelp:false,
      helpText:'',
      ascPrice:0,
      balance:0,
      password:'',
      costPower:0,
      cpu:0,
      net:0,
      ram:50,
      ramRate:0,
      checked:false,
      owner:'',
      active:'',
      newEosAccount:'',
      EosAccount:'',
      mygold:{
        gold_value:''
      },
      type:0,
      pk:'',
      eosPrice:0,
      eosasc:0,
      marketInfo:[],
      nowAccount:'',
      accountInfo:[],
      userinfo: [],
      ethcost:0,
      payShow:false,
      //
      money:0,
      walletShow: false,
      
      walletList: [],
      walletId:null,
      toAddress:'',
      wallettype:'',
      walletName:'',
      walletAccount:'',
      passwordStatus:false
    }
  },
  created() {

     this.type = this.$route.params.type
     this._getinfobyuid()
    //  this.init()
     // this._getaccountinfo()
      checkuserstatus({ uid: localStorage['_shop_userId'] }).then(res => {
        this.toAddress = res.data.createAccountEthAddr
       if (res.data.pay_password == 0) {
         this.passwordStatus = true
       }
    })
    this._getgoldlist()
  },
  
  methods: {
    _showhelp(id){
      this.showHelp = !this.showHelp
      if (id == 1) this.helpText = 'EOS账户由密钥对控制，并将EOS代币存放在区块链上。钱包存储用于对交易签名的密钥对。'
      if (id == 2) this.helpText = '<div style="margin:20px;text-align:left;text-indent:2em;">Active密钥：这些是你应该用于日常操作的密钥。这个私钥往往被用来操作转帐和投票等任务。Active密钥不能用来更改Owner私钥。如果Active密钥已泄露，你可以使用你的Owner密钥进行更改。</div><div style="text-align:left;text-indent:2em;margin:20px;">Owner密钥：Owner密钥=帐户的所有权。Owner密钥将让你可以做Active密钥所做的任何操作。但除此之外，Owner密钥还可以让你更改帐户的Owner和Active密钥。</div>'
      if (id == 3) this.helpText = '<div style="margin:20px;text-align:left;text-indent:2em;">RAM，CPU和NET是什么？<p>网络带宽资源（NET）<br>当用户发送一笔交易信息后，区块生产者需要将这笔交易打包生成区块，然后将区块通过网络同步给其他生产者，这个过程需要消耗一定网络带宽资源。（同步与传输）<p>CPU计算资源（CPU）<p>当用户发起调用智能合约这个动作时，区块生产者需要根据智能合约地址查找合约代码，然后将代码加载到内存中执行，这个过程需要消耗一定的CPU算力。（计算）<p>运行内存资源（RAM）<p>EOS系统中的账号信息、智能合约执行信息的当前的状态都是存储在内存中的，这些信息的储存就需要长期占用内存资源。（记录）简单来说：带宽资源主要用于传输信息；CPU资源用来计算账户余额的变化；RAM资源则是实时状态的记录。<p>资源是免费的，将在三天内恢复到初始水平。</div>'
      if (id == 4) this.helpText = '您的支付密码'
    },
    walletBack(item){
     
      this.walletShow = false
      this.walletId = item.id
      this.walletName =item.name
      this.wallettype = item.type
      this.walletAccount = item.account
      localStorage['walletid'] = item.id
      localStorage['type'] = item.type
      let obj={
        type:item.type,
        account:item.account,
        contract:'ETH'
      }
    
      getbalance(obj).then(res=>{
          this.balance = res.data +'ETH'
      })
   
    },
     _getgoldlist() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      getgoldlist(obj).then((res)=>{
        let arr = []
        if (res.status == 200) {
          res.data.map(data=>{
            if(data.wallettype == 1 && data.from ==0){
              data.walletname =  data.walletname+'(系统)'
            }
            if(data.wallettype == 1) {
               arr.push({
                 name:data.walletname,
                 id:data.id,
                 type:data.wallettype,
                 account:data.account
               })
            }
          })
          this.walletList = arr
          this.walletShow = false
          this.account = arr[0].account
          this.walletId = arr[0].id
          this.walletName =arr[0].name
          this.wallettype = arr[0].type
          this.walletAccount = arr[0].account
         
          localStorage['type'] = arr[0].type
          localStorage['walletid'] = arr[0].id
          let obj={
            type:arr[0].type,
            account:arr[0].account,
            contract:'ETH'
          }
        
          getbalance(obj).then(res=>{
              this.balance = res.data +'ETH'
          })
        } 
      })
    },
    _createAccount(){
     
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
       if (!this.checked) {
        Toast.fail('请先检查账号是否可用')
        return
      }
      if (this.owner=='') {
        Toast.fail('请先生成私钥')
        return  
      }
      if ((0.1+ this.cpu/10).toFixed(2)== 0){
        Toast.fail('cpu错误')
        return  
      }
      if ((0.1+ this.net/10).toFixed(2) == 0){
        Toast.fail('net 错误')
        return  
      }
       if (this.ram == 0){
        Toast.fail('ram 错误')
        return  
      }
  
      
      
        this.payShow  = true
                  this.paramePay = {
                  address:this.walletAccount,
                  money:this.money,
                  id:1,
                  type:this.wallettype,
                  symbol:'ETH',
                  contract:'ETH',
                  to:this.toAddress,//收款地址
                  account:this.walletAccount, //付款地址
                  addr:this.userinfo.pa,
                  
                  eosaccount:this.newEosAccount,
                  cpu:(0.1+ this.cpu/10).toFixed(2),
                  net:(0.1+ this.net/10).toFixed(2),
                  ram:4000,
                  money:this.money,
                  op:2,
                  owner:this.owner,
                  active:this.active,
                  token2Flag:1
                }
              
            this.$refs.payConfirm.reset(this.paramePay)
      // let obj ={}
      // obj.mobile = this.mobile
      // obj.uid = localStorage['_shop_userId']
      // obj.owner = this.owner
      // obj.active = this.active
      // obj.password = this.password
      // obj.stake_cpu_quantity  = (0.1+ this.cpu/10).toFixed(4)
      // obj.stake_net_quantity = (0.1+ this.net/10).toFixed(4)
      // obj.stake_ram_quantity = 4000
      // obj.username = this.newEosAccount
 
      
   
      // createAccount(obj).then(res=>{
      //   if (res.status == 200 ){
      //       Toast.success('eos账号创建成功')
      //   } else {
      //     Toast.fail(res.msg)
      //   }
      // })

    

    },
     back(val){
         this.payShow = val
    },
    
    goExchange(){
      if (this.userinfo.ascpower == 0) {
        // Toast.fail('asc余额不足')
        // return  
      }
     this.$router.replace({
        path: '/exchangeASC'
      })
    },
    init(){
      let obj={}
      getmarket(obj).then(res=>{
        if (res.status =200 ) {
          this.eosasc =  res.data.EOSASC
          res.data.data.forEach(v=>{
            if (v.name == 'EOS') {
              this.eosPrice = (v.current_price)
              return
            }
          })
        }
      })

    },
    _createkey(){
      let obj ={}
      createkey(obj).then(res=>{
        if (res.status ===200 ){
          let result =JSON.parse(res.data)
          this.pk = result.data.privateKey
          this.owner = result.data.publicKey
          this.active = result.data.publicKey
        }
      })
    },
 
    checkAccount(){
       var reg = /^[1-5a-z]+$/
       let letters =  reg.test(this.newEosAccount)
      if(this.newEosAccount.length !=12){
        Toast.fail('账号必须12位')
        return
      }
      if (!letters) {
        Toast.fail('输入的内容必须是数字或者字母组合,数字必须在1-5之间的正整数,字母必须输入小写字母')
        return
      }
      
     
    
      let obj ={}
        obj.account = this.newEosAccount
      
      getaccountinfo(obj).then(res=>{
         if (res.status ===200) {
          let result = JSON.parse(res.data)
          if (result.code == 0 ) {
            Toast.fail('该账号已经被注册')
            this.checked = false
          } else {
            Toast.success('该账号可以使用')
            this.checked = true
          }
         }
      })
    },
    randomword(){
        var str = "",
 
        arr = [ '1', '2', '3', '4', '5', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let pos = 0
       for(var i=0; i<12; i++){
          pos = Math.round(Math.random() * (arr.length-1));
          str += arr[pos];
        }
       this.newEosAccount = str
       this.checked = false
    },
    _getinfobyuid(){
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      Toast.loading({
        mask: true
      })
      let that =this
      getinfobyuid(obj).then((res)=>{
        if (res.status == 200) {
         
          this.userinfo = res.data
          Toast.clear()
         
          let obj2 ={}
          obj2.type = 1
          obj2.account = this.userinfo.eosaccount
          // this.money = (1/this.userinfo.EosEth*this.totalPower).toFixed(8) 
          // this.ethcost ='创建EOS账户需要'+this.money+'ETH'
        
        
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
    goback() {
      this.$router.back()
    },
    goTransactionRecord() { // 交易记录
      this.$router.push({
        path: '/transactionrecord/0'
      })
    },
    goAssetsManage() { // 总资产管理
    
    
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
      this.EosAccount = localStorage['asc_address']
 
       if (!this.EosAccount ) {
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
  computed:{
      totalPower(){
       
        return (0.4+ 0.1+ this.cpu/10 +0.1+ this.net/10)
      },
      costeth(){

         let _this =this 
        if(!_this.userinfo.EosEth){
          _this.userinfo.EosEth = 0
        }
         _this.money = (1/_this.userinfo.EosEth*_this.totalPower).toFixed(8) 
        
        let a = this.money+'ETH'
        return a
      }
    },
  components: {
    Pay
  }
};
</script>
<style scoped lang="stylus" >
.createaccount
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

    .power
      width:100%
      justify-content: space-between
      display: flex
      flex-direction: column  
      border:1px solid rgb(229,229,229)
      border-radius:8px
      margin-top:10px
      .power-list
        display:flex
        justify-content: space-between
        span
          font-size:14px
          font-weight:normal
        label
          padding-left:0px
          margin-top:5px
          color:rgb(100,100,100)
  .list
    width:88%
    align-items: left
    margin-left:6%
    display: flex
    justify-content: space-between
    flex-direction: column  
    label
      
      margin:10px
      font-size:14px
      text-align:left
    .span
      width:100%
      display:flex
      align-items:center
      img
        margin-right:5px
    .createkey

      width:100%
      display: flex     
      flex-direction: column  
      align-items: center
      label

        align-self: flex-start
    .resource
      width:100%
      display: flex     
      flex-direction: column 
      align-items: center 
      label
        align-self:flex-start

    .van-slider
      margin:10px

  .help
    position:fixed
    background:rgb(250,250,250)
    top:10%
    z-index:999
    width:90%
    padding:10px
    top: 50px;
    left: 0px;
    right: 0px;
    margin-left:auto;
    margin-right:auto;
    border:1px solid rgb(229,229,229)
    border-radius:15px
    h3
      margin:30px
    p
      margin-left:10px
      text-align:left
  
</style>
<style scoped>
 .create--down {
    display: flex;
    margin: 25px 25px 15px;
    align-items: center;
    font-size: 14px
 }
 .create--down label {
       flex-basis: 100px;
       padding-right:10px
 }
 .create--down div {
   border: 1px solid #eee;
    padding: 2px 20px;
    text-align:left

 }
 .create__input {
   -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 80%;
    
 }
 .create__cirle {
   position:relative;
   line-height: 32px;
 }
.create__cirle::after {
    display: block;
    content: '';
    border-width: 8px 8px 8px 8px;
    border-style: solid;
    border-color: #ddd transparent transparent transparent;
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -4px;
 }
 .create__input[type="text"]:disabled{ 
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
</style>
