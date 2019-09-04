<template>
  <div class="trans fixed-top" ref="trans">
      <div class="heard spceal fixed">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="36%"/></label>
      <label>
       转账管理
      </label>
      <label style="font-size:14px;" @click="manager"></label>
    </div>
    <section style="padding:20px"> 
      <div class="top ">
      <div class="logo " v-bind:style="{backgroundImage:'url(' + data.imgUrl + ')'}" style="background-size:cover"></div>
      <div class="left">
         <strong style="word-break: break-all;">{{data.title}}</strong></div>
      </div>
    </section>
    
    <div class="trans-card">
       <div class="trans-card--cell">
          <div class="trans-header" @click="transhow= true">
             <span>{{title}}</span>
             <i class="trans-i">  {{nowAsc}} ASC</i>
             <van-icon name="arrow-down" size="20px" />
          </div>
       </div>
       <div>
           <van-row>
            <van-col span="18"><input type="number" placeholder="输入数量" value="" v-model="money" ></van-col>
            <van-col span="6"><span style="height:50px;line-height:50px;text-align:right;font-size:12px;margin-top:14px;display:block"> 如 ：0.0100 </span></van-col>
           </van-row>  
       </div>
       
       <div class="trans-footer" ><div style="margin-left:auto"  v-if="type==1"><span>交易费</span><span>{{fee}} ASC</span></div></div>
       <van-button  @click= "doOperation()" type="default" size="large">{{type==0?'买入':'赎回'}}</van-button>
    </div>
     <div class="trans-notes">
       <p class="item-title">说明</p>
       <p class="item-desc">{{explainObj.explain }}</p>
    </div>
    <div class="trans-notes">
       <p class="item-title">委托</p>
       <p class="item-desc">{{explainObj.entrust }}</p>
       <p class="item-title">收益</p>
       <p class="item-desc">{{explainObj.income }}</p>
       <p class="item-title">风险</p>
       <p class="item-desc">{{explainObj.risk}}</p>
    </div>
      <!-- 支付组件 -->
    <pay :payShow="payShow"  :paramePay="paramePay" @callback="dom" ref="payConfirm" />  
    <!-- 支付组件 -->
    <van-action-sheet
    v-model="transhow"
    :actions="actions"
    cancel-text="取消"
    @select="onSelect"
  
  />
    
    <van-dialog
      v-model="showPassword"
      title="提示"
      show-confirm-button
      show-cancel-button
      @confirm="makesure"
    >
     <div style="margin:30px"><input type="password" class="password" v-model="password" placeholder="请输入支付密码"></div> 
    </van-dialog>
    

     <van-dialog
      v-model="tipShow"
      title="确认信息"
      show-confirm-button
      show-cancel-button
      @confirm="_transfer"
     
    >
  
      <div class="intro" >
         <div class="title">

            <van-row style="margin-top:15px">
                <van-col span="12"> 产品名称</van-col>
                <van-col span="12">{{data.title}}</van-col>
                
              </van-row>
         </div>
         
        <div class="title"> 

            <van-row style="margin-top:15px">
                <van-col span="12"> 投资金额</van-col>
                <van-col span="12">{{money}} ASC</van-col>
                
              </van-row>
         </div>
         <div  class= "fix-value">
             <van-row style="margin-top:15px">
                <van-col span="12"> 投资周期</van-col>
                <van-col span="12">{{data.borrowtime}}个月</van-col>
                
              </van-row>
              <van-row style="margin-top:15px">
                
                <van-col span="12"> 预计收益</van-col>
                <van-col span="12">
                   {{(parseFloat(money)+money*data.rate*data.borrowtime/12).toFixed(4)}}
                </van-col>
                
              </van-row>
            <div class="fix-text" style="clear:both">
             
                <div class="fix-title">
                <p>开始计息</p>
                <p>结束计息</p>
              </div>
              <img src="/images/other/note-time.png" style="max-width:100%">
             
              <div class="fix-title">
             
                <p>{{nowDate}}</p>
                <p>{{afterDate}}</p>
            
              </div>
            </div>

         </div>
         <!-- <div class="intro-notice"> 
           <ul>
             <li><span>交易提醒</span><span>预约申请成功后不可撤销</span></li>
             <li><span>投资下限</span><span>10.0000 EOS</span></li>
             <li><span>付币方式</span><span>直接从钱包账户扣除</span></li>
           </ul>
         </div> -->
      </div>    
    </van-dialog>
  </div>
</template>

<script>
import { getNoteDetail,getgolddetail,transfer,fhbsh,AscManager} from '@/api/wallet'
import Pay from "@/components/Pay.vue"
import { Toast, Dialog } from 'vant'
import { dateFtt } from '@/common/time'
export default {
  data () {
    return {
      showPassword:false,
      password:'',
      tipShow:false,
      checked: true,
      //分红宝type 0转入  1 赎回
      type:0,
      transhow:false,
      title:'可转余额',
      actions: [
        { name: '可转余额' },
       
      ],
      id:0,
      data:{
        imgUrl:'',
        title:'',
        content:''
      },
      mydata:'',
      nowAsc:0,
      money:null,
      remarks:'',
      nowDate:'',
      afterDate:'', 
      payShow:false,
      paramePay:{},
      explainObj:{}
    }
  },
  created() {
   
     this.id = this.$route.query.id
     this.type = this.$route.query.type
      
     this.$nextTick(()=>{
      
       this.$refs.trans.style.height =  window.innerHeight + 'px'
     })
     if (!this.id) return
     getNoteDetail({
      id:this.id,
      token:localStorage['_shop_token'],
      uid:localStorage['_shop_userId'],
     
      }).then(res=>{
      if(res.status == 200) {
         this.data= res.data
        this.formatetime()
      }else {
        Toast.fail(res.msg)
      }
       
    })
     if (this.type ==0 ){
      //转入
          getgolddetail({
           uid:localStorage['_shop_userId'],
           id: 4,
           walletid:localStorage['walletid'],
            contract:'asctokenbank',
           account:localStorage['asc_address'],
           symbol:'ASC',
           type:3
         }).then(res=>{
          if(res.status == 200) {
             this.mydata= res.data.myGold
             this.nowAsc = res.data.myGold.gold_value.split(' ')[0]
              
            
          }else {
            Toast.fail(res.msg)
          }
           
        }) 
     } else {
      //转出
       getgolddetail({
           uid:localStorage['_shop_userId'],
           id: 4,
           walletid:localStorage['walletid'],
           account:localStorage['asc_address'],
           contract:'asctokenbank',
           symbol:'ASC',
           type:3
         }).then(res=>{
          if(res.status == 200) {
             this.mydata= res.data.myGold
             this.nowAsc = res.data.ascFHB.total
              
            
          }else {
            Toast.fail(res.msg)
          }
           
        }) 
     }
    //委托内容
      AscManager({
        op:0,
       
      }).then(res=>{
        console.log(res)
        if(res.status==200){
           res.data.map(data=>{
              console.log(data.id,Number(this.id))
              if(data.id== Number(this.id)){
                 
                 this.explainObj = data
              }
           })
        }
        
      })
    
  },
  computed:{//计算属性
    fee:function(){
       return  this.money* 0.001<0.0001?0.0001:(this.money* 0.005).toFixed(4);
    }
  },
  methods: {
    
    dom(e){
      this.payShow = e
    },
    makesure(){
       if(this.type == 1) {
         this.redeem()
       }else {
        this.formatetime()
        this.tipShow = true
       }
      
    },
     _transfer(){
      
       /**type 0 转入 1  赎回*/
      this.payShow = true
      this.paramePay ={
        address:localStorage['asc_address'],
        money:this.money|'',
        id:this.id,
        to:'asctokenbank',
        memo:'type:1|fhbid:' + this.id +'|param:0' ,
        type:1
      }
       this.$refs.payConfirm.reset(this.paramePay)
      return
      if (this.password == '') {
        Toast.fail('密码不能为空')
        return
      }
      // var regex=/([0-9]+\.[0-9]{4})*/;

      // if(regex.exec(this.money)[0]==''){
      //     Toast.fail("请输入正确的金额格式(4位小数)！如 0.0100 ");
      //     return;
      // }
      //支付弹窗
      

      if (this.money <=0) { 
          Toast.fail('金额错误')
          return
      }
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      let str =  " ASC"
      obj.memo = 'type:' + this.data.type + '|' + 'fhbid:' + this.id
      obj.quantity = parseFloat(this.money).toFixed(4) +str
      obj.to = 'asctokenbank'
      obj.password = this.password
      obj.walletid= localStorage['walletid']
      obj.type =1
      obj.contract =  'asctokenbank'
      Toast.loading({
        mask: true
      })
      transfer(obj).then((res)=>{
        if (res.status == 200) {
           //时间
          
          Toast.success('转账成功')
          this.money=''
          this.password = ''
          let that = this
          setTimeout(function(){
             that.$router.push({
               path:'/exchangeETH'
             }) 
          },3000)
        } else {
          Toast.fail(res.msg)
        }
      })   
     
     
    },
    formatetime(){
      const myDate = new Date();
      this.nowDate =  dateFtt("yyyy-MM-dd",myDate)
      var month=myDate.getMonth()+1;
      const myDate2 = new Date();
     
        myDate2.setMonth(month + parseInt(this.data.borrowtime));

        //获取当前年
        var year2=myDate2.getFullYear();
        //获取当前月
        var month2=myDate2.getMonth();
        //获取当前日
        var date2=myDate2.getDate(); 
        
        var now2=year2+'-'+this.p(month2)+"-"+this.p(date2);
        console.log(this.data)
        this.afterDate = now2
    },
    goTrans(){
      let obj ={}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.password = this.password
      obj.money = this.money

      if (obj.password == '') {
        Toast.fail('密码不能为空')
        return
      }
      if( obj.money <= 0 ) {
          Toast.fail('金额错误')
          return
      }
      console.log(obj)
    },
    /**赎回接口 */
    redeem(){
      fhbsh({
           uid : localStorage['_shop_userId'],
           token : localStorage['_shop_token'],
           password : this.password,
           money : this.money,
           fhbid:this.id
        }).then(res=>{
          if(res.status  == 200 ){
            Toast.success('赎回成功')
          }else {
             Toast.fail(res.msg)
          }
        })
       
    },
    doOperation(){
      if(!localStorage['asc_address']){
         Toast.fail('请先切换至EOS钱包')
         return
      }
      if (this.type == 0 ) {

        if ((parseFloat(this.money) + parseFloat(this.fee)) > parseFloat(this.nowAsc)) {
          Toast.fail('余额不足')
          return
        }
        this.tipShow =true
        //do in
      } else {

        this.tipShow =true
       
       
      }
    },
    goback() {
      this.$router.back()
    },
   p(s){
    return s < 10 ? '0' + s: s;
   },
     onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.transhow = false;
      this.title = item.name
    },
    ok(){
      this.tipShow = false
       this.$router.push({
        path:'/exchangeETH'
      })
    },
    manager(){
     this.show = false
    }
  },
  watch:{
    money(val){
       if(val<0){
        Toast('请输入大于0的数字')
        this.money = 0
      }
    }
  },
  components: {
    Pay
  }
};
</script>
<style  lang='stylus' scoped>
.fix-text {
  margin: 20px 0
}
.fix-title {
  position: relative;
}
.fix-title p {
  width:50%;
  text-align:center;
  font-size:12px;
  color:#999;
  float:left;
  box-sizing :border-box
}
.fix-title p:first-child{
   
    padding-right:15px
}
.fix-title p:last-child{
    float:right;
    padding-left:18px
}
 .progerss-op  {
  margin-top:20px;
  bottom :20px
}
.progerss-op .van-col {
    background: linear-gradient(0deg, 
		#376bff 0%, 
		#409afe 100%), 
	linear-gradient(
		#70bde9, 
		#70bde9);
    color: #fff;
    position: relative;
    left: 10%;
    width: 80%;
    border-radius 30px; 
}

</style>

<style scope>
.intro {
  padding:0 20px 20px
}
.intro .van-col{
  word-break: break-all;
  color:#666
}
.trans-card {
  padding: 0 20px 10px
}
.trans-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    border-radius: 4px;
    border: .5px solid #ddd;;
    padding-right:10px
}
.trans-header span {
    display: block;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 20px;
    font-size: 15px;
    color: #98a2a9;
}
.trans-header .trans-i{
    margin-left: auto;
    padding-right:10px;
    font-size: 13px;
    font-style: normal;
    line-height: 1.54;
    letter-spacing: .2px;
    color: #777a8c;
}
.trans-card input {
    height: 50px;
    margin-top: 13px;
    box-sizing: border-box;
    border-radius: 4px;
    border: .5px solid #ddd;
    font-size: 15px;
    line-height: 1.4;
    letter-spacing: .2px;
    color: #98a2a9;
    text-indent: 20px;
    padding-left: 0;
    width: 100%
}

.trans-notes {
  padding: 15px 20px 0;
}
.password {
    /* margin: 20px 30px; */
    border: 1px solid #eee;
    height: 35px;
    line-height: 35px;
    padding-left: 20px;
    font-size: 14px;
    box-sizing: border-box;
    width: 100%;
}
.trans-notes .item-title {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: .2px;
    color: #666;
    padding-left: 12px;
    position: relative;
}
.trans-notes .item-title:before {
    width: 2px;
    height: 12px;
    background: #098de6;
    display: block;
    left: 0;
    top: 2px;
    content: "";
    color: #fff;
    position: absolute;
}
.trans-notes .item-desc {
    font-size: 13px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.54;
    letter-spacing: .2px;
    color: #777;
    padding-left: 12px;
    margin-bottom: 10px;
    margin-top: 5px;
}
.trans-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0 10px;
    font-size: 13px;
    font-style: normal;
    letter-spacing: .2px;
    color: #777a8c;
} 
.trans-footer  span {
  padding-right:4px
}
.trans .top {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.logo {
    padding: 7px;
    border: .5px solid #e6e8eb;
    border-radius: 100%;
    overflow: hidden;
    background-color: #fff;
    width: 26px;
    height: 26px;
}
.trans .top .left {
    flex: 1 1;
    padding: 2px 0;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
 .trans .top .left span {
    display: block;
    width: 135px;
    height: 11px;
    white-space: nowrap;
    font-family: PingFang SC;
    font-size: 11px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: .1px;
    color: #98a2a9;
}

</style>
<style scoped lang="stylus" >
   .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:12%
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
</style>