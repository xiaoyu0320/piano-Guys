<template>
  <div class="register">
    <div class="heard">
      <label @click="goback"><img src="/images/login/left.png" style="width:12px;margin-left:12px"/></label>
      <label></label>
      <label></label>
    </div>
    
     
  	<div class="login-content">
      <h4 class="login-title"> {{$t("message.Register")}}</h4>
  		<span><label><img src="/images/login/re-phone.png"/></label><input type="text"  v-model="mobile" @input="onIpunt" :placeholder="$t('message.Pleaseenteryourphonenumber')" /></span>
  		<span><label><img src="/images/login/re-password.png"/></label><input type="password" v-model="password"   :placeholder="$t('message.Pleaseenterloginpassword')"/></span>
      <span><label><img src="/images/login/re-rcodes.png" style="width:20px"/></label><input type="text" v-model="code" :placeholder="$t('message.Code')"/><van-button  :disabled="disabled" size="small" :class="{'disabled':disabled}"  class="code"  @click="send()" style="margin-top: 0;">{{codeName}}</van-button></span>
      <span><label><img src="/images/login/re-invite.png"/></label><input type="text" v-model="ref" :placeholder="$t('message.ReferralCode')"/></span>
      
  	</div>
  	<div class="login-bottom">
  		<span :class="checked ? 'btn-enable linear-button':'btn'" @click="save" > {{$t("message.Register")}}</span>
  		<span class="agreement" @click="goagree" >
  			<label><img src="/images/login/confirm.png"/></label>
  			<span> {{$t("message.IagreetoASCsTermsofUse")}}</span>
        <!-- 暂不开放注册 -->
  		</span>
    	<span class="agreement" style="color:#3b80ff;text-decoration: underline;font-size: 15px;" @click="login"> {{$t("message.LogIn")}}>></span>
  	</div>
  </div>
</template>

<script>
import {encode} from '@/api/password'
import { register,sendsms} from '@/api/wallet'
import international from '../assets/lang/international';
import { Toast } from 'vant';
export default {
  data(){
    return{
      mobile:'',
      password:'',
      code:'',
      ref:localStorage['ref'],
      disabled:true,
      codeName:'获取验证码',

    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    save(){
        let reg = /^[A-Za-z0-9]{6,32}$/; 
        let flag = reg.test(this.password);    
        if(!flag){
            Toast('请输入6-32位的密码')
            return
        }
        register({
          mobile:this.mobile,
          password:this.password,
          code:this.code,
          ref:this.ref
        }).then(res=>{

           if(res.status == 200) {
              if(this.$getCookie('lang') == 'en') {
                  Toast.success('login was successful')
                }else {
                  Toast.success('注册成功')
              }       
              this.$router.push({
                path: '/Notice'
              })
           }else if(res.status == 400){
              Toast.fail(res.msg)
              
           }
        })
        this.mobile=''
        this.code=''
        this.password =''
        this.onIpunt =''
        this.ref=localStorage['ref']
    },
    send(){
      // let data = {};
      // let d = new Date()
      // data.tokens = Base64.encode(d.getHours()+''+ (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()))
      // console.log(data.tokens)
      // data.mobile=this.mobile
      // axios.post(`https://api.ezoonet.com/v3index/sms/goSendsms`,data)
      // .then(res=>{
      //     console.log(res);            
      // })
      if(this.disabled)return;
      
      let d = new Date()
      let tokens = Base64.encode(d.getHours()+''+ (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()))
      this.disabled = true
      sendsms({
        mobile:this.mobile,
        tokens:tokens
      }).then(res=>{
          
       if(res.status == 200) {
        Toast('send successful')
        }else{
            Toast(res.msg)
        }
      })
      let time = 60;
           let timer1 = setInterval( () => {
              time--;
              let times = time+'s'
                this.codeName =  times      
              if(time<=0){
                let reg = /^[1][0-9]{10}$/;
                let mobile = this.mobile;
                if (reg.test(mobile)){ 
                    if(this.$getCookie('lang') == 'en') {
                      this.codeName = 'Get Code'
                    }else {
                      this.codeName = '获取验证码'
                    }
                    
                    this.disabled = false    
                }else{
                    if(this.$getCookie('lang') == 'en') {
                      this.codeName = 'Get Code'
                    }else {
                      this.codeName = '获取验证码'
                    }
                    this.disabled = false
                }
                
                clearInterval(timer1)
              }
            },1000)
    },
    login(){
      this.$router.push({
        path: '/'
      })
    },
    onIpunt(event){
    let reg = /^[1][0-9]{10}$/;
    let mobile = this.mobile;
   
    if(reg.test(mobile)){
     
        this.disabled = false,
        this.mobile = mobile
     
    }else{
      
        this.disabled=true,
        this.mobile = mobile
     
    }
  },
  goagree(){
     console.log( this.$router)
      this.$router.push({
        path: '/argeement'
      })
  }
  },
  created() {
    console.log(international)
    console.log(this.$getCookie())
     this.ref= localStorage['ref']
  },
   computed:{
      checked() {
            if(this.mobile &&this.password&&this.code&&this.ref) {
                return true;
            } else {
              return false 
            }
        }
    },
  components: {}
};
</script>
<style scoped lang="stylus" >
.register
  text-align:center
  background:url(/images/login/register-bg.png) no-repeat top
  background-size: contain;
  .heard
    display:flex
    align-items: center
    height:44px
    label:first-child
      width:6.5%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .title
    margin-top: 20px
    text-align: left
    padding-left:15px
    font-size:24px
    margin-bottom:20px
    
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
        width:20px
        img
          width:100%
      .code
        background:rgb(245,245,245)
        font-size:12px
        width:70%
        display: flex
        align-items: center
        justify-content: center
        padding:6px 0
        border-radius:12px
    input
  	  border:none
  	  outline:none
  	  width:100%
  	  padding:15px
  .login-bottom
  	display:flex
  	flex-direction: column
  	margin-top:50px
  	.btn
  	  background:#70bde9
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
  	  	width:12px
  	  	height:12px
  	  	padding:2px
  	  	margin-right:10px
  	  	img
  	  	  width:100%
  	  span
  	    color:#3b7eff
</style>
<style scoped>
.btn-enable {
  	  color:#fff;
  	  font-size:15px;
  	  padding:12px 0;
  	  border-radius: 50px;
  	  width: 73.5%;
  	  margin: 0 auto;
}
  .code .van-button__text {
    margin-top: 0!important;
    border-bottom: 0!important;
    top: -5px;
    position: relative;
  }   
  html {
    font-size: 20px
  }
  .register .login-content {
    text-align: left;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 0 10%;
    border-radius: 10px;
    padding:5% 8% 8%;
    background: rgba(255,255,255,.5);
    box-shadow: 0 1px 10px rgba(0,0,0,.06);
}
.register .login-content h4 {
  font-weight: normal;
  text-align: center;
  margin-bottom: 20px
}
</style>
