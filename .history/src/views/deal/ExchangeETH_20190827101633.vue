<template>
  <div class="exchangeETH fixed-top">
    <div class="heard fixed">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="36%"/></label>
      <label>
         <div class="heard-top"><span class="active" >{{$t("message.business")}}</span><span @click="gotab">{{$t("message.market")}} </span></div>
      </label>
      <label style="font-size:14px;" @click="exList()">兑换记录</label>
    </div>
  	
    <div v-if="showdiv" >
      <div class="login-tab">
        <van-row style="padding:25px">
          <van-col span="8">
           <div class="login-item">
              <img data-v-5fe228f6="" v-if="title== 'ETC'" src="http://cdnpic.ezoonet.com/20190221/5242b995f1bf939065f3dd15b89ac60d.png" width="30px">
              <img data-v-5fe228f6="" v-if="title== 'BTC'" src="http://cdnpic.ezoonet.com/20190221/9fc4e30f55ff6846c0a76c189a645a49.png" width="30px">
              <img data-v-5fe228f6="" v-if="title== 'EOS'" src="http://cdnpic.ezoonet.com/20190221/4957281945192743f3d36ca5ec4e1d12.png" width="30px">
              <img data-v-5fe228f6="" v-if="title== 'ASC'" src="http://wallet.ascchain.com/uploads/20190806/95044f3df7a9cc8f05f3ea4c19691114.png" width="30px">
              <img data-v-5fe228f6="" v-if="title== 'ETH'" src="http://cdnpic.ezoonet.com/20190221/5242b995f1bf939065f3dd15b89ac60d.png" width="30px">
              <span @click="getchange(1)">{{title}}</span>
              <img src="/images/other/selected.png" style="width:10px;top:-1px;margin-left:5px">
              <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
           </div>
           <div class="login-item">
             
             
                <input v-model="eosChange" type="number" class="login-input--style" @input="eosChangeClick" :placeholder="asc||'未发现余额'" />
             
            
           </div>
          </van-col>
           <van-col span="8" @click="changeType"><img src="/images/other/icon_xunhuan@2x.png" style="width:65px"></van-col>
          <van-col span="8">
            <div class="login-item">
              <img data-v-5fe228f6="" v-if="title2== 'ETC'" src="http://cdnpic.ezoonet.com/20190221/5242b995f1bf939065f3dd15b89ac60d.png" width="30px">
              <img data-v-5fe228f6="" v-if="title2== 'BTC'" src="http://cdnpic.ezoonet.com/20190221/9fc4e30f55ff6846c0a76c189a645a49.png" width="30px">
              <img data-v-5fe228f6="" v-if="title2== 'EOS'" src="http://cdnpic.ezoonet.com/20190221/4957281945192743f3d36ca5ec4e1d12.png" width="30px">
              <img data-v-5fe228f6="" v-if="title2== 'ASC'" src="http://wallet.ascchain.com/uploads/20190806/95044f3df7a9cc8f05f3ea4c19691114.png" width="30px">
              
              <span>{{title2}}</span>
             
            </div>
            <div class="login-item">
             
                <input  v-model="ascChange" type="number"   @input="ascChangeClick" class="login-input--style"  placeholder="请输入金额" />
            
             
           </div>
          </van-col>
        </van-row>
      </div>
      <van-row class="exchange-box">
       <van-col span="14"><span class="exchange-unit">1 {{title}} =  {{(Getethusdt*Getusdtprice/Getascprice).toFixed(4) }} {{title2}} </span></van-col>
       <van-col span="8" >
       <van-button  @click.native="changeConfirm()" type="info" size="small"  disabled>暂未开放</van-button>
       </van-col>
      </van-row>
   
        </div>
    <div class="hue"></div>

    <van-row class="manage-box">
      <van-col span="24" class="exh__flex" style="justify-content: flex-start;">
       
           
           <span style="float:left"><img src="/images/other/icon_quzhongxin@2x.png"> <span class="manage-money" >去中心化理财</span></span>
        
       
      </van-col>
    </van-row>
    <div class="manage-list"> 
         
        <van-row  class="manage-list--item" v-for="(item,i) in managedata" :key="i"  @click.native="goes(item)" v-if="item.showFlag">
    
            <van-col span="24" class="exh__flex">
              <div class="new-info">预选</div>
                <img :src="item.imgUrl" class="exh__mimg">
                <span class="manage-rate" v-if="item.type==1 || item.type == 0 "  :class="item.type == 1 ? 'active1': ''">
                  {{item.periods}}
                </span>
                <span class="manage-rate active2" v-else>
                  {{item.periods}}
                </span> 
             </van-col>
             <van-col span="24" class="exh__s--title">
                  {{item.title}}
             </van-col>
             <van-col span="24" class="exh__s--info">
                <van-col span="12">
                  本期总发行：{{item.coinTotalNum}}份
                </van-col>
                <van-col span="12">
                  已认购数：{{item.coinBuyedNum}}份
                </van-col>
              </van-col>
        </van-row>
    </div>
    <van-popup v-model="changeVisabled" class="popupbox">

       <div class="changeTitle">
          转入
       </div>
       <div class="change-box">
        
        <div class="change-info">支付金额{{title}}</div>
        <div class="chage-input"><input type="number" v-model="eosChange"  placeholder="请输入金额"></div>
        <div class="change-info">请输入密码</div>
        <div class="chage-input"><input type="password"  v-model="password" placeholder="请输入密码"></div>
        <div class="change-btn">
              <van-button type="info" @click="_transfer" size='small'>确认转入</van-button>
        </div>
       </div>
    </van-popup>
    <!-- 支付组件 -->
    <pay :payShow="payShow"  ref="payConfirm"  @callback="dom" />  
    <!-- 支付组件 -->
  </div>
</template>

<script>
import { asc2eth,getSaveList,transfer,getmarket,getcurrency,getethusdt,getusdtprice,getascprice,getethcusdt,getbtcusdt,getwtdusdt,geteosusdt,getwtcusdt } from '@/api/wallet'
import axios from 'axios'
import { Toast, Dialog, Actionsheet,Popup ,Icon} from 'vant'
import Pay from "@/components/Pay.vue"
export default {
  data () {
    return {
      lastTrans:'',
      eosChange:null,
      ascChange:null,
      showdiv:true,
      ASCnumber: '',
      password: '',
      money:null,
      ascrate:0.5,
      ETHnumber: 0,
      proportion: 0.0003,
      show: false,
      ascInfo:{
        rate:1
      },
      title:'EOS',
      title2:'ASC',
      type:1,
      actions: [],
      managedata:[] ,// 理财列表
      changeVisabled:false,
      timer:null,
      asc:null,
      downId:3,
      changeRate:null,
      market:[],
      payShow:false,
      paramePay:{},
      changePrice:null,
      //美金
      Getethusdt:null,
      //人民币
      Getusdtprice:null,
      //转换率
      Getascprice:null,
    };
  
    
  },
  components:{
    Pay
  },
  created() {
     geteosusdt({}).then(res=>{
        this.Getethusdt = res
      })
      getusdtprice({}).then(res=>{
        this.Getusdtprice = res
      })
      getascprice({}).then(res=>{
        this.Getascprice = res
      })
     
    // // let Account ={
    // //   address:'asctokenbankasctokenbankasctokenbank',
    // //   privatekey:'fsfsdfsdfsfsfsdfsdfsdfsdfsdfsdfsd',
    // //   givenPovider:{
    // //     aaa:{sdfds:'sdfsd',
    // //     sdfsf:'sfsd'}
    // //   }
      
    // // }
    // // console.log(JSON.stringify(Account))
    // // return;
    // var arr = []
    //   for (let i in Account) {
    //     let o = {};
    //     o[i] = Account[i];
    //     arr.push(o)
    // }
    // console.log(arr)
    this.manageList()
    this._getmarket()
    this.getLastexchange()
  },
  mounted () {
    this.$parent.footshow = true
  },
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
    dom(e){
      this.payShow = e
    },
    getLastexchange(){

        let obj = {}
        obj.account_name = 'asctokenbank'
        obj.offset = -100
        obj.pos = -1
       
        let url = 'https://eos.greymass.com/v1/history/get_actions'
     
        let params = JSON.stringify(obj)
  
        axios.post(url,params).then((res) => {
          res.data.actions.map(item=>{
        
              if((item.action_trace.act.data.memo =='type|10') && (item.action_trace.act.account == 'eosio.token') ){
                this.lastTrans = item.action_trace.act.data.from + '->' + item.action_trace.act.data.quantity
                return
              }
          })
        
        }); 
    },
    exchangeEos(){
      Toast("暂未开放！")
    },
  
     onSelect(item) {
       console.log(item)
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.downId = item.id
      if(this.type == 1){
         this.title = item.name
      }else{
         this.title2 = item.name
      }
      if(item.name =="USDT") {
         
              this.Getethusdt = 1
         
          
      }else if(item.name == 'EOS'){
         
            geteosusdt({}).then(res=>{
              this.Getethusdt = res
            })
          }else if(item.name == 'BTC'){
         
            getbtcusdt({}).then(res=>{
              this.Getethusdt = res
            })
          }else if(item.name == 'ETH'){
         
            getethusdt({}).then(res=>{
              this.Getethusdt = res
            })
          }else if(item.name == 'WTC'){
         
            getwtcusdt({}).then(res=>{
              this.Getethusdt = res
            })
          }
      
      },
    goback() {
      this.$router.back()
    },
    goes(item){
    /**  item.type
     * 0 分红包
     * 1 理财
     * 2 限购
     */
    Dialog.confirm({
      title: '提示',
      message: '请切换至COSMOS，开始使用该服务'
    }).then(() => {
       if(item.type == 0) {
          this.$router.push({
            path:'/save/' + item.id,
          })
            // window.location.href="http://localhost:8082/save?shop_userId="+localStorage['_shop_userId']+'&_shop_token='+localStorage['_shop_token']+'&walletid='+localStorage['walletid']+'&id='+item.id+'&account='+localStorage['asc_address']
       }else if(item.type == 1)  {
          //  window.location.href="http://localhost:8082/note?shop_userId="+localStorage['_shop_userId']+'&_shop_token='+localStorage['_shop_token']+'&walletid='+localStorage['walletid']+'&id='+item.id+'&account='+localStorage['asc_address']
           this.$router.push({
              path:'/note/' + item.id,
          })
       }else if(item.type == 2)  {
         this.$router.push({
              path:'/limits/'+ item.id
          })
          // window.location.href = "http://localhost:8082/limits"
       }
      
    }).catch(() => {
      // on cancel
    });
    
    },
     _getmarket() {
    
      let obj = {}
      obj.order = -1
    
  
    //  let url = 'https://www.ttex.com/public/stock/findByName?name=USDT'
    //     axios.get(url).then((res) => {
    //       console.log(res)
    //    })     
      getmarket(obj).then((res)=>{
        if (res.status == 200) {
          this.changeRate = res.data.EOSASC
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    getchange(type){
      this.type = type
      this.show = true 
      
    },
    gotab(){
      this.$router.push({
       path:'/market'
     })
    },
    manageList(){
   Toast.loading({
        mask: true,
        message: '加载中...',
        duration:1000,
      });
      getSaveList({
        uid: localStorage['_shop_userId'],
        walletid:localStorage['walletid'],
        
      }).then(res=>{
        if(res.status == 200) {
           this.$toast.clear()
           res.data.list.map(data=>{
              if(data.title.indexOf('测试') > -1) {
                data.showFlag = false
              }else if(localStorage['_shop_userId'] == '1ee2c8720a785b648ee5963e14a9cb1c' || localStorage['_shop_userId'] == '66fd16953d7993887a89416b57808cb0' ) {
                data.showFlag = true
              }else {
                 data.showFlag = true
              }

           })

           this.managedata = res.data.list
           console.log( this.managedata)
           this.ascInfo = JSON.parse(res.data.ascInfo.sum_24_info)
           this.asc= res.data.money
           this.actions= res.data.downList
           
        }else {
          Toast.fail(res.msg)
        }
       
      })
    },
    eosChangeClick(){
     
      this.ascChange = Number(this.eosChange*this.Getethusdt*this.Getusdtprice/this.Getascprice).toFixed(4)

      
    },
    ascChangeClick(){
      //  console.log(this.changeRate,val.data)
      this.eosChange =Number(this.ascChange*(1/(this.Getethusdt*this.Getusdtprice/this.Getascprice))).toFixed(4)
     
      
    },
   changeType(){

   },
    exList(){
          this.$router.push({
             path:'/basislist'
           })
           
      // switch (localStorage['type']) {
      //   case '1':
      //     // eth
      //    Toast.fail('暂未开放')
      //   return
      //     break;
      //   case '2':
      //    Toast.fail('暂未开放')
      //   return
      //     break;
      //   case '3':
  
      //     break;
      //   case '4':
      //    Toast.fail('暂未开放')
      //   return
      //     break;

      // }

    },
    ok() {
      let reg = /(^[1-9]\d*?$)/
      if (reg.test(this.ASCnumber) === false || this.ASCnumber == '') {
        Toast('只能为大于0的整数')
        return
      }
      // if (Number(this.ASCnumber)<10) {
      //   Toast('兑换数量不能小于10')
      //   return
      // }
      if (!this.password){
        Toast.fail('请输入交易密码')
        return
      }
      this._asc2eth()
    },
    changeConfirm(){
      if (localStorage['type']!=3) {
        Dialog.confirm({
          title: '提示',
          message: '请切换至EOS钱包,才能使用Dapp功能'
          }).then(() => {
           this.$router.push({
            path:'/wallet' ,
          })
          // on confirm
          }).catch(() => {
          // on cancel
          });  
        // Toast.fail('请切换至EOS钱包')
        return
      }
      if (!this.eosChange ) {
        Toast.fail('金额不能为0')
        return   
      }
      if(!localStorage['asc_address'] || localStorage['type']!=3){
        Dialog.confirm({
          title: '提示',
          message: '请切换至EOS钱包,才能使用Dapp功能'
          }).then(() => {
           this.$router.push({
            path:'/wallet' ,
          })
          // on confirm
          }).catch(() => {
          // on cancel
          });  
        return 
       }
    
       this.payShow  = true
        
        this.paramePay = {
          address:localStorage['asc_address'],
          money:this.ascChange|'',
          id:10,
          to:'asctokenbank',
          memo:'type:1|fhbid:' + 10 +'|param:0'  ,
          type:1
        }
         this.$refs.payConfirm.reset(this.paramePay)
         
    },
     _transfer(){

      if (this.eosChange <=0) { 
        this.eosChange = 0
        return
      }

      if(this.downId == 3) {
              let obj = {}
              obj.uid = localStorage['_shop_userId']
              obj.token = localStorage['_shop_token']
              obj.memo = 'type|10'
              obj.quantity = parseFloat(this.eosChange).toFixed(4) +" EOS"
              obj.to = 'asctokenbank'
              obj.password = this.password
              obj.walletid= localStorage['walletid']
              obj.type =1

              obj.contract = 'eosio.token'
             
           
              transfer(obj).then((res)=>{
                if (res.status == 200) {
                  
                  
                  Toast.success('转账成功！') 
                  this.eosChange=''
                  this.password = ''
                  this.changeVisabled= false
                } else {
                  const toast = Toast.fail({
                      duration: 5000,       // 持续展示 toast
                      forbidClick: true, // 禁用背景点击
                      loadingType: 'spinner',
                      message: res.msg,
                   
                    });
                }
              })   
        }else {
          Toast('暂未开放')
        }
    
    },
    
  },
  watch: {
    ASCnumber(value) {
      this.ETHnumber = Number(value*this.proportion).toFixed(4)
    },
   

  }
};
</script>
<style scoped lang="stylus" >
.exchangeETH
  text-align:center
  .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    position fixed
    label:first-child,label:last-child
      width:18%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
    
  .login-content
    text-align: left
    display: flex
    padding:0 25px
    margin-top:25px
    span
      display:flex
      flex-direction:column
      justify-content: center
      align-items: center
      border-bottom:1px solid rgb(229,229,229)
      margin-top:15px
      label
        width:100%
        text-align: center
        font-size:15px
        color:rgb(51,51,51)
        margin-bottom:10px
        img
          width:100%
    input
      border:none
      outline:none
      width:100%
      padding:15px 0
      text-align: center
  .login-bottom
  	display:flex
  	flex-direction: column
  	margin-top:70px
  	.btn
  	 
  	  color:#fff
  	  font-size:15px
  	  padding:12px 0
  	  border-radius: 50px
  	  width: 73.5%
  	  margin: 0 auto
  	.agreement
      width:73.5%
      margin: 0 auto
      margin-top:18px
      font-size:12px
      color:rgb(153,153,153)
      display:flex
      justify-content:flex-start
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
        font-size:12px
        color:rgb(51,51,51)
</style>
<style scope>
.login-input {
  margin:10px;
  height: auto;
  line-height: auto
}
.login-input input{
  width: 100%;
  height: 30px;
  line-height: 30px;
  border:0;
  color: #666;
  font-size: 12px
}
.login-tab {
   
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.login-item img {
  vertical-align: middle;
  padding-right: 10px;
  position: relative;
  top: -3px
}
.exchange-box {
  height:44px;
  line-height: 60px;
  padding: 20px 0;
  font-size:14px
}
.linear-button {
  color:#fff!important
}
.exchange-name {
  color: #999
}
.exchange-wanning {
  background: #f7f9fa;
  font-size: 12px;
  color: #666;
  padding:10px;
  margin:0 20px ;
  border-radius: 4px
}
.hue {
  height: 10px;
  background: #f7f9fa;
  margin-top: 20px
}
.manage-money {
  font-size: 18px;
  color: #333;
  font-weight:600;
  letter-spacing: 2px;
  line-height: 25px
}
.manage-box{
 text-align: left;
 padding: 15px
}
.manage-box img{
  width: 20px;
  margin-right: 8px;
  position: relative;
  top: 2px
}
.manage-rate {
  color: #ff384f;
  font-size: 16px;
  line-height: 1.5;
 
}
.manage-rate.active1 {
 color: blue
}
.manage-rate.active2 {
 color: #ffa801
}

.manage-year {
  font-size: 12px;
  color: #999;
  word-break: break-all;
  padding-right: 10px
}
.manage-info {
     height: 52px;
    line-height: 52px;
    font-weight: 600;
    font-size: 16px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.manage-info img {
  position: relative;
  top:4px;
  padding-right:10px
}
.manage-list {
  margin: 0 15px 60px;
  background: #fff;
  /* box-shadow: 6px 6px 10px #eee; */
 
  border-radius: 10px;
}
.manage-list--item {
        position: relative;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
     padding: 15px 10px 10px;
    box-shadow: 0px 0px 15px rgba(0,0,0,.05);
    border-radius: 8px;
}
.heard-top {
  border: 1px solid #eee;
  border-radius: 30px;
  display: flex;
}
.heard-top span {
  display:flex;
  flex: 1;
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 30px;
}
.heard-top .active {
  background-image: linear-gradient(-30deg, #376bff 0%, #409afe 100%), linear-gradient( #ff52a7, #ff52a7);
  color: #fff
}
.changeTitle {
    padding: 15px 30px;
    background-image: linear-gradient(-30deg, #376bff 0%, #409afe 100%), linear-gradient( #ff52a7, #ff52a7);
    color: #fff
}
.change-box {
  padding: 20px
}
.change-info {
    font-size: 14px;
    color: #999;
    text-align: left;
    padding-bottom: 15px;
}
.chage-input  input{
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding:5px 10px 5px;
    color: #323233;
    background-color: transparent;
    border: 1px solid #eee;
    resize: none;
    font-size: 12px;
    height:36px;
    line-height: 36px;
    margin-bottom:20px
}
.popupbox {
  width:80%;
  border-radius: 5px
}
.circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff384f;
    display: inline-block;
    margin-right: 6px;
}
.login-item {
    height: 40px;
    line-height: 40px;
}
.login-input input::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
}
.login-input input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #999;
}
.login-input input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #999;
}
.login-input input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #999;
}
 .login-item [class*=van-hairline]::after{
  border:0
}
 .login-item .van-cell__value  {
   font-size:12px
 }
 .catesapn span {
   display:inline-block;
   margin: 5px 0 0 5px
 }
  .catesapn span i {
    position:relative;
    top:1px
  }
  .login-input--style {
    border: 0;
    font-size: 12px;
    text-align: center;
    width: 100%;
  }
  .exh__title {
    font-size:14px;
    color:#999;
    float:right;
    margin-top:2px
  }
  .exh__mimg {
    width:20px;
    margin-right:10px
  }
  .exh__flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .exh__s--title {
    
    color:#999;
    font-size:12px;
    margin:5px 0 10px
  }
  .exh__s--info {
    color:#999;
    font-size:12px;
    padding-top:10px; 
    border-top:1px solid #eee
  }
  .new-info {
    top: 0;
    position: absolute;
    left: 0;
    background: url(/images/other/jx.png);
    color: #fff;
    font-size: 10px;
    width: 60px;
    line-height: 24px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>

