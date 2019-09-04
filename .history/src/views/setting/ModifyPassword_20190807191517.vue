<template>
  <div class="modifypassword">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.modifypassword')}}</label>
      <label></label>
    </div>
  	<div class="login-content">
  		<span><input type="password" :placeholder="$t('message.newpassword')" v-model="newpassword"/></span>
      <span><input type="text" :placeholder="$t('message.code')" v-model="code"/><span class="code" style="margin-top: 0;" @click="_forget" :style="smsEnabeld?'':'color:#999;'">{{smsText}}</span></span>
  	</div>
  	<div class="login-bottom">
  		<span class="btn linear-button" @click="save">{{$t('message.save')}}</span>
  	</div>
  </div>
</template>

<script>
import { getinfobyuid, forget, forgetpassword,sendsms } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      newpassword: '',
      code: '',
      mobile:'',
      smsText: this.$i18n.t('message.getcode'),
      smsEnabeld: true
    }
  },
  created() {
    this._getinfobyuid()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    _getinfobyuid() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      Toast.loading({
        mask: true
      })
      getinfobyuid(obj).then((res)=>{
        if (res.status == 200) {
          this.mobile = res.data.mobile
          Toast.clear()
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
    _forget () {
      if (!this.smsEnabeld) {
        return
      }
      this.smsEnabeld = false
      let obj = {}
       let d = new Date()
      obj.mobile = this.mobile
      
      obj.tokens = Base64.encode(d.getHours()+''+ (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()))
      sendsms(obj).then((res) => {
        if (res.status === 200) {
          let s = 60
          let timer = setInterval(() => {
            this.smsText = s + '秒后重发'
            s--
            if (s <= 0) {
              clearInterval(timer)
              this.smsText = this.$i18n.t('message.getcode')
              this.smsEnabeld = true
            }
          }, 1000)
        } else {
          Toast.fail(res.msg)
          this.smsEnabeld = true
        }
      })
    },
    _forgetpassword () {
      let obj = {}
      obj.mobile = this.mobile
      obj.password = this.newpassword
      obj.code = this.code
      this.newpassword = ''
      this.code = ''
      forgetpassword(obj).then((res) => {
        if (res.status === 200) {
          Toast.success({
            mask:true,
            duration:2000,
            message:res.msg
          })
          setTimeout(() => {
            this.goback()
          },2000)
        } else {
          Toast.fail({
            mask:true,
            message:res.msg
          })
        }
      })
    },
    save() {
      if (!this.newpassword) {
        Toast('请输入新密码')
        return
      }
      if (!this.code) {
        Toast('请输入验证码')
        return
      }
      let reg = /(^\w)/
      if (reg.test(this.newpassword) === false) {
        Toast.fail('密码为任意数')
        return
      }
      Dialog.confirm({
        title: '修改密码',
        message: '请确认修改'
      }).then(() => {
        Toast.loading({ mask: true })
        this._forgetpassword()
      }).catch(() => {
        // on cancel
      })
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.modifypassword
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
        width:6%
        img
          width:100%
      .code
        background:rgb(245,245,245)
        font-size:12px
        width:40%
        display: flex
        align-items: center
        justify-content: center
        padding:6px 0
        border-radius:12px
    input
  	  border:none
  	  outline:none
  	  width:100%
  	  padding:15px 0
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
  	  margin-top:18px
  	  font-size:12px
  	  color:rgb(153,153,153)
  	  display:flex
  	  justify-content:center
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
  	    color:rgb(51,51,51)
</style>