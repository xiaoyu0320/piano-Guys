<!--  -->
<template>
  <div class='wrap fixed-mb-bottom' style="margin-top:40px">
      <div class="top  note">
        <van-nav-bar
          :title="data.title"
          left-arrow
          right-text="交易明细"
          @click-left="onClickLeft"
          @click-right="onClickRight"
          class="fixed"
        />
        
        <div class="title1">{{(data.rate*100).toFixed(2)}}%</div>
        <div class="title2">预计年化收益</div>
       <div style="padding:30px 0"  > 
          <div class="release">已售 {{((data.total - data.left)*100 / data.total).toFixed(2)}}%</div>
          <van-slider v-model="value" disabled @change="onChange" active-color="#ffed15" bar-height="4px" />
       </div>
     
        <div class="flex-wrap">
          <div class="item">
            <div class="head">还款方式</div>
            <div class="bottom">到期还本付息</div>
          </div>
          <div class="item">
            <div class="head">授权出借期限</div>
            <div class="bottom">{{data.borrowtime}}个月</div>
          </div>
          <div class="item">
            <div class="head">剩余金额</div>
            <div class="bottom">{{data.left}}</div>
          </div>
        </div>
      </div>
      
     <div class="wrap-box">
      
        <van-notice-bar
          :text="noticeText"
          left-icon="volume-o"
        />
     </div>
    
      <div class="intro" >
         <div class="title">产品介绍</div>
         <div class="text">
           {{data.content}}
         </div>
      </div>
        <div class="intro " >
         <div class="title">交易规则</div>
         <div  class= "fix-value">
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
         <div class="intro-notice"> 
           <ul>
             <li><span>交易提醒</span><span>预约申请成功后不可撤销</span></li>
             <li><span>投资下限</span><span>10.0000 EOS</span></li>
             <li><span>付币方式</span><span>直接从钱包账户扣除</span></li>
           </ul>
         </div>
      </div>    
        <van-row class="progerss-op fixed-bottom" style="height:44px;line-height:44px" @click.native="goes">
           <van-col span="24" >立即出租</van-col>
        </van-row>
      
        <van-popup v-model="changeVisabled" class="popupbox">
          <div class="changeTitle">
              转入
          </div>
          <div class="change-box">
             <!-- <div class="change-info">当前余额：{{nowAsc}}</div> -->
            <div class="change-info">转入金额：(如：100.0000 )</div>
            <div class="chage-input"><input type="number" v-model="money" placeholder="请输入数量"></div>
              <div class="change-info">请输入支付密码</div>
            <div class="chage-input"><input type="password" v-model="password" placeholder="请输入支付密码"></div> 

            <div class="change-btn" style="text-align:center;margin-top:35px">
                  <van-button type="info"  size='large' @click="_transfer" >确认转入</van-button>
            </div>
          </div>
        </van-popup>
        
     <van-dialog
      v-model="tipShow"
      title="转账成功"
      show-confirm-button
      
       @confirm="ok"
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
         <div  class= "fix-value fixed-mb-bottom" style="">
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
      <!-- 支付组件 -->
    <pay :payShow="payShow"  ref="payConfirm" @callback="dom"  />  
    <!-- 支付组件 -->
  </div>
</template>

<script>
import { getNoteDetail,transfer,getgolddetail } from '@/api/wallet' 
import { dateFtt } from '@/common/time'
import { Dialog,NavBar, NoticeBar,Skeleton,Toast} from 'vant'
import Pay from "@/components/Pay.vue"
export default {
  components: {
    Pay
  },
  data	() {
    return {
     id:0,
     noticeText:'用户 asctokenbank 刚刚投资了2000.0000 EOS，预计收益为 2412.0000 EOS ',
     value: 0,
     fixValue: 30,
     data:'',
     nowDate:'',
     afterDate:'',
     timeCount:'',
     changeVisabled:false,
     money:null,
     password:null,
     tipShow:false,
     nowAsc:0,
    payShow:false,
    paramePay:{}
    };
  },
  computed: {},
  watch: {

  },
  methods: {
     goes(){
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
          money:this.money|'',
          id:this.$route.params.id,
          to:'asctokenbank',
          memo:'type:1|fhbid:' + this.$route.params.id +'|param:0'  ,
          type:1
        }
         this.$refs.payConfirm.reset(this.paramePay)
   },
   p(s){
    return s < 10 ? '0' + s: s;
   },
   onClickLeft() {
      this.$router.back()
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
   onChange(value) {
      this.$toast('已释放：' + value);
   },
   scrollWindow(){
   
    window.scrollTo(0,0);
  },
   dom(e){
      this.payShow = e
    },
  ok(){
    this.money=''
    this.password = ''
    this.$router.push({
      path:'/exchangeETH'
    }) 
  },
    _transfer(){
      
      if (this.password == '') {
        Toast.fail('密码不能为空')
        return
      }
      // var regex=/([0-9]+\.[0-9])*/;

      // if(regex.exec(this.money)[0]==''){
      //     Toast.fail("请输入正确的金额格式(4位小数)！如 0.0100 ");
      //     return;
      // }
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
      obj.walletid =  localStorage['walletid']
      obj.type =1
      obj.contract = 'asctokenbank'
      Toast.loading({
        mask: true
      })
      console.log(obj)
    
      transfer(obj).then((res)=>{
        if (res.status == 200) {
           //时间
          
          Toast.success('转账成功')
        
       
          let that = this
          setTimeout(function(){
               that.tipShow=true
          },1000)
        } else {
          Toast.fail(res.msg)
        }
      })   
    },
    // getgold (){
    //   let obj={
    //      uid : localStorage['_shop_userId'],
    //      token :localStorage['_shop_token'],
    //      id : 4,
    //      walletid:localStorage['walletid']
    //   }
    //   getgolddetail(obj).then(res=>{
    //     this.nowAsc = res.data.myGold.gold_value
    //   })
    // },
    onClickRight(){
      this.$router.push({
        path:'/notelist',
        query:{
          id:this.id  
        }
      })
    }
  },
  created	() {
    this.scrollWindow()
    // this.getgold()
    this.id = this.$route.params.id

     let obj ={}
      obj.id = this.id
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token'] 
     
      getNoteDetail(obj).then(res=>{
        if(res.status == 200) {
             
            this.data = res.data
            this.formatetime()
            this.value = (this.data.total - this.data.left) *100 / this.data.total
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
              this.afterDate = now2
          
        }else {
          Toast.fail(res.msg)
        }
        
      })
  

  },

  mounted	() {
  
  },
  destroyed	() {}, //	生命周期 - 销毁完成
  activated	() {} //	如果页面有keep-alive缓存功能，这个函数会触发
  }

</script>
<style lang='stylus' scoped>
  .swiper{
    background: #fff;
    height:30px;
    line-height 30px;
    .van-swipe-item{
      padding:0 10px;
      font-size:14px;
      color:#999
    }
  }
  .flex-wrap{
    display:flex;
  }
  .wrap{
    min-height :100vh;
    background #f2f5f7;
    .top{
      padding-bottom:20px;
      position: relative;
      background:url(/images/other/bg3@2x.png);
      .arrow-icon{
        position: absolute;
        width: 20px;
        height: 20px;
        left:20px;
        top:20px;
        transform: rotate(-180deg)
      }
      .van-nav-bar{
        background: #509ff7;
       .van-nav-bar__title van-ellipsis{
          color: #fff
        }
      }
 
      .item{
        flex: 1;
        color #fff;
        text-align :center
        .head{
          font-size:13px;
          margin-bottom :5px;
        }
        .bottom{
          font-size :14px;
          line-height:22px;
          font-weight:600;
        }
      }
      .title1{
        font-size:40px;
        font-weight:600;
        line-height 1.5
      }
      .title2{
        font-size:14px;
      }
      .title1,.title2{
        text-align center;
        color: #fff;
      }
    }
    .intro{
      padding:15px;
      background #fff;
      margin-top 15px;
      .title{
        font-size:18px;
        height 22px;
        line-height:22px;
        margin-bottom:5px;
      }
      .text{
        font-size: 14px;
        line-height: 1.5;
        color:#353535
      }
      // .fix-value{
      //   display: flex
      // }
    }
  }
.intro-notice
 
  li
    display: flex
    font-size: 14px
    span 
     padding-right:15px
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
.wrap-box {
  position:relative;
  background #fff;
  
}
.wrap-left{
    width 20px;
    position : absolute;
    left:5px;
    top :7px
  }
.release {
  color: #fff;
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 15px;
}
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
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #323233;
    background-color: transparent;
    border: 1px solid #eee;
    margin-bottom: 20px;
    width: 100%;
    resize: none;
    font-size: 12px;
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
}
.popupbox {
  width:80%;
  border-radius: 5px
}

.wrap .intro .title,.intro .van-col{
  font-size:14px

}
.fixed-bottom{
  position:fixed;
  bottom:7px;
  width:100%;
  background:#fff
}
.fixed-mb-bottom{
  margin-bottom:60px
}
</style>
<style scope>
.note .van-nav-bar__title.van-ellipsis {
  color:#fff
}
.note .van-nav-bar .van-icon ,.note .van-nav-bar__text {
  color: #fff!important
}
</style>