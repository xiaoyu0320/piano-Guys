<template>
  <div class="login">
  	<div class="logo-style" @click="saveImg()"><img src="/images/login/logo.png" width="30%;"/></div>
  	<div class="title"><span @click="text()">{{$t("message.BlockchainIdentityLogin")}}</span></div>
  	<div class="login-content">
  		<span><label>+86</label><input type="text" :placeholder="$t('message.Pleaseenteryourphonenumber')" v-model="phone"/></span>
  		<span><label><img src="/images/login/password.png" style="width:15px"></label><input type="password"  :placeholder="$t('message.Pleaseenterthepassword')" v-model="password" @keydown="submit($event)"/>
      <span class="login__forget"> <strong style="color:#3b80ff" @click="goforget">{{$t("message.Forgotpassword")}}</strong></span>
      
      </span>
     
  		<div></div>
  	</div>
  	<div class="login-bottom">
  		
     
      <div class="login__account" > {{$t("message.Forgotpassword")}}<strong style="color:#3b80ff;font-size:12px;font-weight:0" @click="goregister"> {{$t("message.Register")}}</strong></div>
       
       <span class="btn linear-button"  @click="_login">{{$t("message.LogIn")}}</span>
  		<!-- <span class="agreement ">
        
  			<label class="common-bg"><img src="/images/login/tick@2x.png"/></label>
  			登录即同意<span @click="goagree">ASC使用协议和服务条款</span>
  		</span> -->
     
  	</div>
  </div>
</template>

<script>
import { login } from '@/api/wallet'
import { Toast } from 'vant'
import {ECPair,payments} from 'bitcoinjs-lib';
import {bip32}  from 'bip32'
const wif = require('wif');
export default {
 data () {
    return {
      phone: '',
      password: '',
      base64Str:'data:image/png;base64,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ChStAEArWmHSRwEUKE0BgFaa1GSEAihQtAIArWiFSR8FUKA0BQBaaVKTEQqgQNEKALSiFSZ9FECB0hQAaKVJTUYogAJFKwDQilaY9FEABUpTAKCVJjUZoQAKFK0AQCtaYdJHARQoTQGAVprUZIQCKFC0AgCtaIVJHwVQoDQFAFppUpMRCqBA0QoAtKIVJn0UQIHSFABopUlNRiiAAkUrANCKVpj0UQAFSlMAoJUmNRmhAAoUrQBAK1ph0kcBFChNAYBWmtRkhAIoULQCAK1ohUkfBVCgNAUAWmlSkxEKoEDRCgC0ohUmfRRAgdIUAGilSU1GKIACRSsA0IpWmPRRAAVKUwCglSY1GaEAChStAEArWmHSRwEUKE0BgFaa1GSEAihQtAIArWiFSR8FUKA0BSoD2pNPPqm+//3vq2uvvVbtuuuuasaMGer+++9vqvgVV1yhTj311N7ft2zZon74wx+qc845R+25557q9ddfV5dccolavnx5I8ykSZPUxRdf3Pi35PHPf/6zEX/FihWN39euXdsnDx1e0vWVwYxw0kknqcsvv7xR5tjLLJddHzNNCff73/++tz763vz589W+++6rjj766D5FEC1uv/129cUvfrFP+aTud911V0Mns9w+TcxETf0l/MMPP6zOO++8PvlKO+6333592kkHsOv34x//WB133HHqgAMOiJWvTzxXer76SlnE3s4444ym/JM0MuuclEbR7SU633bbbYm6aXs2+5f0E7M9fBq46qZtdfXq1eqBBx5o9Nm82i4XA7ASqQxoUg7pgFdddZW64IIL1O9+97teSOkymh0/qTF1I9odzgaa3Rl9HbQIoW1QadCGAs3sLHkCzQUol/7ym6lXUnuYEDTrt379eidYY/X2Adxsd/MhMH369KCszPJLPT/xiU80Hizy/8MPP9wLRbONimgvs/BJYNXhdP+SB5mGUFK8JKCJUyDpidMxYcKEIB2rCFQp0MynRqyHJp3bNlTxovbaay81Z86cRhbDhw9veDkCT5+HVrT4prG89tprvZ6jDTTdgcT7Suog8sSUp/WQIUN6n5pmB5f66Cex/NvnoYUCzQSYzvOvf/1rH09R2kIu7RFL2meddVavRy3eo8vDML3q0HZwAXXatGnqjjvuaGrjm266qeHNZvXQTK9NRgUf+chHGh3aHEmY+hfdXjbQzJFKkm72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',
    }
  },
  created() {
    if (localStorage['_shop_userId']) {
      this.$router.replace({
        path: '/wallet'
      })
    }

  },
  methods: {
    saveImg(){
     
      window.jsbridge.saveImage(this.base64Str)
    },
    goagree(){
      this.$router.push({
        path: '/argeement'
      })
      
    },
    text(){
      // Toast('text1')
     
      // window.scatter.getIdentity('123456')
     
    },
    text1(){
    //  Toast('text2')
    //  if( !window.scatter){
    //     Toast('notscatter')
    //  }
    //   window.scatter.getIdentity({
    //     'abc':'123',
    //     'efg':'456'
    //   })
    },
    submit(e){
   
      if(e.keyCode === 13){

        this._login()
       
      }
    },
  	goregister() {
  	  this.$router.push({
        path: '/register'
       })
    },
    goforget(){
        this.$router.push({
        path: '/forgetpassword'
       })
    },
    _login() {
       let reg = /^[A-Za-z0-9]{6,32}$/; 
       let flag = reg.test(this.password);    
      if (!this.phone) {
        Toast('请输入手机号码')
        return
      }
      if (!this.password) {
        Toast('请输入登录密码')
        return
      }
         
      
      if(!flag){
        
          Toast('请输入6-32位的密码')
          return
      }
    const keyPair = ECPair.makeRandom()
    const wif = keyPair.toWIF();
 
 
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey })
 
      Toast.loading({
        mask: true,
        message: '登录中...',
        duration:0
      })
      let obj = {}
      obj.mobile = this.phone
      obj.password = this.password
      obj.btcpa = address
      obj.btcpk =wif
  
      login(obj).then((res)=>{
        if (res.status == 200) {
          this.phone = ''
          this.password = ''
          localStorage.setItem('_shop_userId', res.data.uid)
          localStorage.setItem('_shop_token', res.data.token)
          Toast.clear()
          Toast.success('登录成功')
          this.$router.push({
            path: '/wallet'
          })
        } else {
          Toast.fail(res.msg)
        }
      })
      this.phone = ''
      this.password = ''
    }
  }
};
</script>
<style scoped lang="stylus" >
.login
  text-align:center
  .logo-style
    padding: 20% 0 30%;
  .title
    
  	text-align:left
  	font-size:20px
  	margin-bottom:20px
   
  .login-content
    text-align: left
    display: flex
    flex-direction: column
    padding:0 15%
    position:relative
    span
      display:flex
      align-items: center
      
      margin-top:15px
      label
        color:#507ef2
        img
          width:100%
     div
  	  font-size:12px
  	  color:rgb(153,153,153)
  	  margin-top:15px
  	  label
  	    color:rgb(51,51,51)
    input
  	 
  	  outline:none
  	  width:100%
  	  padding:15px 0
      
  .login-bottom
  	display:flex
  	flex-direction: column
  	margin-top:60px
    padding:0 20px 40px
  
  	.btn
  	  
  	  color:#fff
  	  font-size:15px
  	  padding:12px 0
  	  border-radius: 50px
  	  width: 73.5%
  	  margin: 10% auto 0
  	.agreement
  	  margin-top:18px
  	  font-size:12px
  	  color:rgb(153,153,153)
  	  display:flex
  	  justify-content:center
  	  align-items: center
  	  label
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
<style scope>
  .posifixed {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 100%;
  }
  .login {
    background: url(/images/login/logo-bg.png) #fff no-repeat;
    background-position: top center;
    background-size: contain;
  }
.login__account {
  text-align:right;
  padding:0 15%;
  font-size:12px;
  color:#999
}
.login .login-content span .login__forget {
    position: absolute;
    right: 0;
    font-size: 12px;
    margin-top: 0;
    border: 0;
    right: 15%;
    font-weight:normal
}
.login .login-content input {
  border: 0;
  border-bottom:1px solid #eee
}
.login .title {
  margin-top:20px;
  padding: 0 15%;
}
.login .login-content span label{
    width: 30px;
    display: block;
    text-align: right;
    margin-right:10px
}
</style>
