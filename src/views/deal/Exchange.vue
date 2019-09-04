<template>
  <div class="exchangeETH">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="36%"/></label>
      <label>
       闪兑
      </label>
      <label style="font-size:14px;"></label>
    </div>
  	<div class="login-content">
         <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
          </van-swipe>
  		<span>
        <label>ASC</label>
        <input type="text" placeholder="兑换数量" v-model="ASCnumber"/>
      </span>
      <span style="border-bottom:none;"><img src="/images/other/change@2x.png" width="61%"/></span>
      <span>
        <label>ETH</label>
        <input type="text" placeholder="收到数量" v-model="ETHnumber" readonly/>
      </span>
      
  	</div>
    
    <div class="login-content" style="margin-top:0;">
      <span style="width: 100%;"><input style="text-align:left;" type="password" placeholder="请输入交易密码" v-model="password"/></span>
    </div>
    <div style="text-align:left;padding:0 25px">
       
        <div class="login-order"><span style="color:#999">汇率</span> <span> 1 ETH = ~ TUSD </span></div>
        <div class="login-order"> <span style="color:#999">手续费</span>  <span style="color:#333"> 0%</span> <span style="color:#999;background:#e8b875;color:#fff;padding:2px 5px;border-radius:4px;">现实手续费</span></div>
      
    </div>
  	<div class="login-bottom">
  		<span class="btn linear-button" @click="ok"><img src="/images/other/light@2x.png">闪电兑换</span>
     
  	</div>
  </div>
</template>

<script>
import { asc2eth } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      ASCnumber: '',
      password: '',
      ETHnumber: 0,
      proportion: 0.0003
    }
  },
  created() {
  },
  methods: {
    goback() {
      this.$router.back()
    },
    _asc2eth(){
        let obj = {}
        obj.uid = localStorage['_shop_userId']
        obj.toasc = this.ASCnumber
        obj.pay_password = this.password
        Toast.loading({
          mask: true,
          duration: 0,
          message: '提交中...'
        })
        this.ASCnumber = ''
        this.password = ''
        asc2eth(obj).then((res) => {
          if (res.status === 200) {
            Toast('已提交以太坊，请等待确认')
          } else if (res.status === 400) {
            Toast.fail(res.msg)
          }
        }).catch(() => {
          Toast.fail('请求超时')
        })
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
    }
  },
  watch: {
    ASCnumber(value) {
      this.ETHnumber = Number(value*this.proportion).toFixed(4)
    }
  },
  components: {}
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
.login-order {
  padding-top: 15px
}
.login-order span {
  font-size:14px;
  line-height: 1.5;
  display: inline-block;
  text-align: left;
  padding-right: 15px
  }
   .linear-button {
    height: 45px;
    line-height: 45px;
    padding: 0!important;
    background-image: linear-gradient(-30deg, 
		#376bff 0%, 
		#409afe 100%), 
	linear-gradient(
		#ffc333, 
		#ffc333);
	background-blend-mode: normal, 
		normal;
   }
  .linear-button img {
    width: 25px;
    display: inline-block;
    position: relative;
    top: 6px;
    margin-right: 5px;
   
  }
</style>
