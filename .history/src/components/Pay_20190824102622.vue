<!--  -->
<template>
<div class=''>
    <div class="overall__pay">
       <van-action-sheet v-model="overall"  title="支付"   @cancel="cancel"   :close-on-click-overlay="false">
          <div class="pashow__choice">
           
              <div class="payshow__choice--card" >
                 <label class="payshow__choice--name">支付金额</label>
                 <div class="payshow__choice--input" style=" display: flex;align-items: center;font-size: 10px;"> <van-field v-model="paramePay.money"  type="number" placeholder="输入金额" style="width:80%;" />{{paramePay.symbol}} </div>
              </div>

              <div class="payshow__choice--card">
                 <label class="payshow__choice--name">收款地址</label>
                 <div class="payshow__choice--input"> <textarea type="textarea" style="font-size: 10px" autosize v-model="paramePay.to" placeholder="输入收款地址"></textarea></div>
              </div>
              <!-- <div class="payshow__choice--card" v-if="paramePay.type == '3'">
                 <label class="payshow__choice--name">备注{{paramePay.type}}</label>
                 <div class="payshow__choice--input"> <van-field v-model="paramePay.memo"  placeholder="输入备注"  disabled/></div>
              </div> -->
                
             <div class="payshow__choice--card">
                 <label class="payshow__choice--name">付款地址</label>
                 <div class="payshow__choice--input"> <textarea  style="font-size: 10px" v-model="paramePay.address"  placeholder="输入付款地址" ></textarea></div>
              </div>
              <div class="payshow__choice--card" v-if="paramePay.type == '3'">
                 <label class="payshow__choice--name">memo</label>
                 <div class="payshow__choice--input">  <van-field v-model="paramePay.memo"  placeholder="输入memo"  disabled/></div>
              </div>
              <div class="payshow__choice--card item-after">
               
                 <label class="payshow__choice--name">当前余额</label>
               
                 <div class="payshow__choice--input"> <van-field v-model="balance" type="text"  disabled /></div>
                
              </div>
              <div v-if="paramePay.type == '1' || paramePay.type == '4'"  style="display:flex;display: flex;justify-content: space-between;padding: 0 5px;font-size: 14px;    padding: 5px 5px 10px;">
               <p  style="text-aiign:left;" > 手续费：{{gas.fastest/100000}}</p>
               <p > 平均到账时间1-5分钟</p>
              </div>  
             <div class="payshow__choice--card item-after">
               
                 <label class="payshow__choice--name">支付密码</label>
                 <div class="payshow__choice--input"> <van-field v-model="password" type="password"  placeholder="输入密码" /></div>
              </div>
              <div class="payshow__btn">
                  <van-button type="primary" size="large" class="linear-button" style="border:1px solid #376bff" @click="_transfer()" >去支付</van-button>
              </div>

          </div>

      </van-action-sheet>
    </div>
</div>
</template>

<script>
  let __msg = '转账失败,请检查账户状态'
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {transfer,eth2eth,transferEthtoken,token2EosAccount,getbalance,getgas,sendgas} from '../api/wallet' 
import { Toast } from 'vant'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},

props:{ 
  
    payShow:{
      type:Boolean,
      default:true
    }
},

data() {
//这里存放数据
return {
  
    password:null,
    address:null,
    money:null,
    note:null,
    borker:0,
    overall:false,
    paramePay:{},
    type:null,
    balance:0,
    gas:'',//手续费
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
  payShow(val){
     if(val){
        this.overall = true
     }else{
       this.overall = false
     }
  }

},
//方法集合
methods: {
  
    _transfer(){
        console.log(this.paramePay.symbol)
        // this.$emit('callback',false)
       if (this.password == '') {
        Toast.fail('密码不能为空')
          return
        }
        if (this.paramePay.money <=0) { 
            Toast.fail('金额错误')
            return
      }
     // BTC 普通转账
      if(this.paramePay.type == 2){
       Toast('暂未开放')
       return
      }else if(this.paramePay.type == 1){ 
        //ETH 普通转账
          if(this.paramePay.symbol == 'ETH') {
              let obj = {}
              obj.uid = localStorage['_shop_userId']
              obj.token = localStorage['_shop_token']
            
            
              obj.num = this.paramePay.money
              obj.memo= ''
              obj.pay_password = this.password
              obj.walletid =  localStorage['walletid']
              obj.account = this.paramePay.address
              obj.toaddress = this.paramePay.to

              // obj.money = this.paramePay.money
              Toast.loading({
                mask: true
              })
              eth2eth(obj).then((res)=>{
                if (res.status == 200) {
                  //传递合约地址
                 
                  //时间
                  Toast.success('已提交链上，请等待确认')
                         
                        if(this.paramePay.token2Flag == 1) {       
                            token2EosAccount({
                                uid:localStorage['_shop_userId'],
                                addr:this.paramePay.addr,
                                type:this.paramePay.type,
                                eosaccount:this.paramePay.eosaccount,
                                cpu:this.paramePay.cpu,
                                net:this.paramePay.net,
                                ram:4000,
                                money:this.paramePay.money,
                                op:2,
                                owner:this.paramePay.owner,
                                active:this.paramePay.active
                              }).then(res=>{
                                if(res.status== 200) {
                                   sendgas({
                                      uid: localStorage['_shop_userId'],
                                      addr: this.paramePay.to
                                    }).then(res => {

                                    })
                                }else{
                                  Toast.fail(res.msg)
                                  
                                }
                              })
                        }
                  this.$emit('callback',false)
                } else {
                  Toast.fail(res.msg)
                }
              })  
          }else if(this.paramePay.symbol == 'WTC'){

              let obj = {}
              obj.uid = localStorage['_shop_userId']
              obj.token = localStorage['_shop_token']
              obj.num = this.paramePay.money
              obj.memo= ''
              obj.pay_password = this.password
              obj.walletid =  localStorage['walletid']
              obj.account = this.paramePay.address
              obj.toaddress = this.paramePay.to
              obj.contract = '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74'
              // obj.money = this.paramePay.money
              Toast.loading({
                mask: true
              })
              transferEthtoken(obj).then((res)=>{
                if (res.status == 200) {
                  //时间
                  sendgas({
                    uid: localStorage['_shop_userId'],
                    addr: this.paramePay.to
                  }).then(res => {

                  })
                  Toast.success('已提交链上，请等待确认')
                  this.$emit('callback',false)
                } else {
                  Toast.fail(res.msg)
                }
              })  
          }else if(this.paramePay.symbol == 'USDT'){
              
              let obj = {}
              obj.uid = localStorage['_shop_userId']
              obj.token = localStorage['_shop_token']
              obj.num = this.paramePay.money
              obj.memo= ''
              obj.pay_password = this.password
              obj.walletid =  localStorage['walletid']
              obj.account = this.paramePay.address
              obj.toaddress = this.paramePay.to
              obj.contract = '0xdac17f958d2ee523a2206206994597c13d831ec7'
              // obj.money = this.paramePay.money
              Toast.loading({
                mask: true
              })
              transferEthtoken(obj).then((res)=>{
                if (res.status == 200) {
                  //时间
                   sendgas({
                      uid: localStorage['_shop_userId'],
                      addr: this.paramePay.to
                    }).then(res => {

                    })
                  Toast.success('已提交链上，请等待确认')
                  this.$emit('callback',false)
                } else {
                  Toast.fail(res.msg)
                }
              })  
          }
            
      }else if(this.paramePay.type == 3){
        //EOS普通转账
            let obj = {}
            obj.uid = localStorage['_shop_userId']
            obj.token = localStorage['_shop_token']
            let str = ' '+ this.paramePay.symbol
            obj.memo = this.paramePay.memo
            obj.quantity = parseFloat(this.paramePay.money).toFixed(4) +str
            obj.to = this.paramePay.to
            obj.password = this.password
            obj.walletid =  localStorage['walletid']
            obj.contract =  this.paramePay.contract
            // obj.type = this.paramePay.type
            // obj.money = this.paramePay.money
            Toast.loading({
              mask: true
            })
            transfer(obj).then((res)=>{
              if (res.status == 200) {
              
                //时间
                Toast.success('转账成功,请等待链上确认')
                this.$emit('callback',false)
              } else {
                Toast.fail(res.msg)
              }
            })   
      }
     

    },
    cancel(){
      this.$emit('callback',false)
    },
   
    reset(obj){
      
      this.paramePay = obj
      console.log(obj)
      getbalance({
        type:this.paramePay.type,
        account:this.paramePay.address,
        contract:this.paramePay.contract
      }).then(res=>{
        this.balance = res.data
        console.log(res)
      })
      if(this.paramePay.type == 3) {
         this.paramePay.money = Number(this.paramePay.money).toFixed(4)
      }else {
         this.paramePay.money = Number(this.paramePay.money).toFixed(8)
      }
     

      if( this.paramePay.money == 0) {
         this.paramePay.money = ''
      }

      
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 getgas({}).then(res=>{
   this.gas =  res.data
 })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {
 this.$parent.payShow = false
}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.payshow__choice--input  textarea {
    height: 30px;
    line-height: 30px;
    border: 0;
    width: 100%;
    text-align: left;
    padding-left: 10px;
}
.overall__pay {
  overflow: hidden;
}

</style>

