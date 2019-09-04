<template>
  <div class="bindphone">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.exchange')}} ASC</label>
      <label></label>
    </div>
    <div class="login-content" style="padding-bottom:15px">
      <span><input type="number" :placeholder="$t('message.number')" v-model="money"/></span>
      <span><input type="password" :placeholder="$t('message.paypassword')" v-model="password"/></span>
      <div><label>{{$t('message.total')}}：{{Number(ascinfo.ascpower).toFixed(2)}}ASC</label></div>
      <div><label>{{$t('message.poundage')}}：5</label></div>
    </div>
    <div class="login-bottom">
      <span class="btn linear-button" @click="ok">{{$t('message.complete')}}</span>
    </div>
  </div>
</template>

<script>
import { getascfroze, ascwithdraw } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      money: '',
      password: '',
      ascinfo:'',
      mygold:{
        asc:0,
        ascrate: 0,
        eth: 0,
        ascpower: 0
      } 
    }
  },
  created() {
    this._getascfroze()
  },
  methods: {
    goback() {
      this.$router.back()
    },
    ok() {
      let reg = /(^[1-9]\d*?$)/
      if (reg.test(this.money) === false || this.money == '') {
        Toast('兑换数量只能为大于0的整数')
        return
      }
      if (!this.password){
        Toast.fail('请输入交易密码')
        return
      }
      this.btnWithdraw()
    },
    _getascfroze() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.token = localStorage['_shop_token']
      obj.id = 4
      Toast.loading({
        mask: true
      })
      getascfroze(obj).then((res)=>{
        if (res.status == 200) {
          this.ascinfo = res.data
          Toast.clear()
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    btnWithdraw() {
      if (this.ascinfo.ascpower<=5) {
        Toast.fail('余额不足')
        return
      }
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      obj.toasc = this.money + '.0000 ASC'
      obj.pay_password = this.password
      Toast.loading({
        mask: true,
        duration: 0,
        message: '处理中...'
      })
      this.money = ''
      this.password = ''      
      ascwithdraw(obj).then((res)=>{
        if (res.status == 200) {
          Toast.success('成功')
           setTimeout(() => {
               this._getascfroze()
             },2000)
         
        } else if (res.status == 400) {
          Toast.fail(res.msg)
        }
      }).catch(() => {
        Toast.fail('请求超时')
      })
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
    div
      font-size:12px
      color:rgb(153,153,153)
      margin-top:15px
      display: flex
      justify-content: space-between
      label
        color:rgb(51,51,51)
    input
      border:none
      outline:none
      width:100%
      padding:15px 0
  .login-bottom
    display:flex
    flex-direction: column
    margin-top:100px
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