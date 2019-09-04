<template>
  <div class="bindphone">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.bindphone')}}</label>
      <label></label>
    </div>
  	<div class="login-content">
  		<span><input type="text" :placeholder="$t('message.mobile')" v-model="mobile"/></span>
      <span><input type="text" :placeholder="$t('message.code')" v-model="code"/><span class="code" style="margin-top: 0;">{{smsText}}</span></span>
  	</div>
  	<div class="login-bottom">
  		<span class="btn linear-button" @click="save">{{$t('message.bind')}}</span>
  	</div>
  </div>
</template>

<script>
import { getinfobyuid, forget, updatemobile } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      code: '',
      mobile:'',
      smsText: this.$i18n.t('message.getcode'),
      smsEnabeld: true
    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    _updatemobile () {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.mobile = this.mobile
      obj.code = this.code
      this.code = ''
      Toast.loading({
        mask: true,
        message: '处理中...'
      })
      updatemobile(obj).then((res) => {
        if (res.status === 200) {
          Toast.success({
            mask:true,
            duration:2000,
            message:'绑定成功'
          })
          setTimeout(() => {
            this.$router.go(-2)
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
        if (!this.mobile) {
          Toast('请输入手机号')
          return
        }
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (reg.test(this.mobile) === false) {
          Toast.fail('手机号验证错误')
          return
        }
      if (!this.code) {
        Toast('请输入验证码')
        return
      }
      this._updatemobile()
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.bindphone
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