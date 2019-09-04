<template>
  <div class="register">
    <div class="heard">
      <label @click="goback"><img src="/images/login/left.png" style="width:12px;margin-left:12px"/></label>
      <label></label>
      <label></label>
    </div>
    	<!-- <div class="logo-style"><img src="@/assets/logo.png" width="50%;" style="display:block;margin:30px auto"/></div> -->
  	<!-- <div class="title"><span>ASC区块链身份注册</span></div> -->
  	<div class="login-content">
       <h4 class="login-title">忘记密码</h4>
  		<span>><label style="width: 40px;font-size:12px;" @click="showSelect = true">{{areaCode}}</label><label><img src="/images/login/icon_phone@2x.png"/></label><input type="text"  v-model="mobile" @input="onIpunt" placeholder="请输入手机号码" /></span>
  	
  		<span><label><img src="/images/login/icon_key@2x.png"/></label><input type="password" v-model="password"  placeholder="请输入新密码"/></span>
    
    <span><label><img src="/images/login/re-rcodes.png" style="width:17px"/></label><input type="text" v-model="code" placeholder="请输入验证码"/><van-button  :disabled="disabled" size="small" :class="{'disabled':disabled}"  class="code"  @click="send()" style="margin-top: 0;">{{codeName}}</van-button></span>
  	</div>
 	<div class="login-bottom">
  		<span :class="checked ? 'btn-enable linear-button':'btn'" @click="save" >提交</span>
  	
      
  </div>
   <van-popup v-model="showSelect" position="bottom">
      <van-picker
        show-toolbar
        :columns="areaList"
        @cancel="showSelect = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import {getforget,sendsms} from '@/api/wallet'

import { Toast } from 'vant';
export default {
  data(){
    return{
      mobile:'',
      password:'',
      confirmPassword:'',
      code:'',
      ref:localStorage['ref'],
      disabled:true,
      codeName:'获取验证码',
      areaList: [],
      showSelect: false,
       areaCode: '+86'
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
          Toast('请输入6-32位的密码仅限输入数字和字母')
          return
      }   
        getforget({
          mobile:this.mobile,
          password:this.password,
          code:this.code,
          uid:localStorage['_shop_userId']
        }).then(res=>{

           if(res.status == 200) {
             Toast.success('修改成功')
              this.$router.push({
                path: '/'
              })
           }else if(res.status == 400){
              Toast.fail(res.msg)
           }
        })
        this.mobile ='';
        this.password ='';
        this.code = ''
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
      let tbase64 = Base64.encode(d.getTime())
       this.disabled = true  
      sendsms({
        mobile:this.mobile,
        tokens:tokens,
        t:tbase64,
        uid:localStorage['_shop_userId']
      }).then(res=>{
    
       if(res.status == 200) {
        Toast('发送成功')
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
          let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          let mobile = this.mobile;
          if (reg.test(mobile)){ 
              this.codeName =  '获取验证码',
              this.disabled = false    
          }else{
              this.codeName = '获取验证码',
              this.disabled = false
          }
          
          clearInterval(timer1)
        }
      },1000)
   
    },
    onIpunt(event){
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
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
    this.areaList = international
     this.ref= localStorage['ref']
  },
   computed:{
      checked() {
            if(this.mobile &&this.password&&this.code) {
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
