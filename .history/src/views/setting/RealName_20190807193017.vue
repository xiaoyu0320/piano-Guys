<template>
  <div class="realname">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.certification')}}</label>
      <label></label>
    </div>
  	<div class="login-content">
  		<span><input type="text" :placeholder="$t('message.realname')" v-model="username"/></span>
      <span><input type="text" :placeholder="$t('message.idnumber')" v-model="idno"/></span>
  	</div>
  	<div class="login-bottom">
  		<span class="btn linear-button" @click="okButton">{{$t('message.submit')}}</span>
  	</div>
  </div>
</template>

<script>
import { getinfobyuid, bindId } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      user: {},
      username: '',
      idno: '',
      realname: '',
      realidno: '',
      avatarBack: '',
      avatarFront: '',
      idcardt: '/static/images/idcardt.png',
      idcardf: '/static/images/idcardf.png',
    }
  },
  methods: {
    goback() {
      this.$router.back()
    },
    // _getinfobyUid () {
    //   let obj = {}
    //   obj.uid = localStorage['_shop_userId']
    //   obj.token = localStorage['_shop_token']
    //   Toast.loading({
    //     mask: true
    //   })
    //   getinfobyUid(obj).then((res) => {
    //     if (res.status == 200) {
    //       this.user = res.data
    //       this.realname = res.data.real_name
    //       Toast.clear()
    //     } else {
    //       Toast.fail(res.msg)
    //     }
    //   })
    // },
    okButton() {
      if (!this.username) {
        Toast('请输入真实姓名')
        return
      }
      if (!this.idno) {
        Toast('请输入身份证号')
        return
      }
      Toast.loading({
        duration: 0,
        mask: true,
        message: '验证中...'
      })
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.name = this.username
      obj.idnum = this.idno
      bindId(obj).then((res) => {
        if (res.status === 200) {
         // if (this.idcardt === '/static/images/idcardt.png' || this.idcardf === '/static/images/idcardf.png') {
         //  Toast('提交成功')
         //  this._getinfobyUid()
         // } else {
         //   this._setIdcardImg()
         // }
        Toast.success({
          mask:true,
          duration:2000,
          message:'提交成功'
        })
        setTimeout(() => {
          this.goback()
        },2000)
        } else {
          Toast(res.msg)
        }
      })
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.realname
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