<template>
  <div class="accountmanage">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.accountmanagement')}}</label>
      <label></label>
    </div>
    <div class="top">
      <!-- <span><img :src="userinfo.avatar"/></span> -->
       <van-row class="setting_maincontent">
          <van-uploader :afterRead="logContent">
             <img ref="headImg" width="60" height="60" style="border-radius: 50%;" :src="userinfo.avatar">
          </van-uploader>
        </van-row>
      <label><!--{{userinfo.nickname}} --> {{name}}</label>
    </div>
      <ul class="list">
        <li @click="goReplacePhone"><span>{{$t('message.bindphone')}}</span><span><span><label>{{mobile.slice(0,3)+ '****'+mobile.slice(7,11)}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></span></li>
        <li @click="goModifyPassword"><span>{{$t('message.modifypassword')}}</span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
        <li @click="goModifyPayPassword"><span>{{$t('message.modifypaypassword')}}</span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
        <li @click="goRealName"><span>{{$t('message.certification')}}</span><span><label>{{userinfo.idno?$t('message.certified'):''}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
      </ul>
      <div class="btn" @click="popupshow=true">{{$t('message.logout')}}</div>
      <div class="bgPopup" v-show="popupshow">
        <div class="popup">
          <span>{{$t('message.logoutalert')}}</span>
          <span>
            <label @click="popupshow=false">{{$t('message.cancel')}}</label>
            <label @click="quitOK">{{$t('message.sure')}}</label>
          </span>
        </div>
      </div>
  </div>
</template>

<script>
import { getinfobyuid,changeHeadImg } from '@/api/wallet'
import { Toast } from 'vant'
export default {
  data () {
    return {
      popupshow: false,
      userinfo: [],
      mobile: '***********',
      name:this.$route.query.name
    }
  },
  created() {
    this._getinfobyuid()
  },
  methods: {

     logContent(file) {
        console.log(file)
        Toast.loading({ mask: true, message: '正在更换头像' })
        console.log(file.content)
        this.$refs.headImg.src = file.content
        let formData = new FormData()
        formData.append('user_id', localStorage['_shop_userId'])
        formData.append('imgFiles', file.file)

        const xhr = new XMLHttpRequest()
        xhr.open('POST','https://api.ascchain.com/asc/upload/upload', true)
        
        xhr.send(formData)
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 304) {
            let res = JSON.parse(xhr.responseText)
            if (res.status === 200) {
              // Toast.success('头像更新成功')
              this.userImg = res.data
              this._changeHeadImg()
            } else {
              Toast.fail(res.msg)
            }
          } else {
            Toast.fail(`${xhr.status} 请求错误!`)
          }
        }
      },
      _changeHeadImg() {
        let obj = {}
        obj.uid = localStorage['_shop_userId']
        obj.headImg = this.userImg
        changeHeadImg(obj).then((res) => {
          if (res.status === 200) {
            Toast.success('头像更新成功')  
          } else if (res.status === 400) {
          
          }
        })
    },
  
    goback() {
      this.$router.back(-1)
    },
    goReplacePhone() { // 更换绑定手机
      this.$router.push({
        path: '/replacephone'
      })
    },
    goModifyPassword() { // 修改密码
      this.$router.push({
        path: '/modifypassword'
      })
    },
    goModifyPayPassword() { // 修改交易密码
      this.$router.push({
        path: '/modifypaypassword'
      })
    },
    goRealName() { // 实名认证
      if (!this.userinfo.idno) {
        this.$router.push({
          path: '/realname'
        })
      }
    },
    quitOK(){
      localStorage.clear()
      this.$router.replace({
        path: '/'
      })
    },
    _getinfobyuid() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      Toast.loading({
        mask: true
      })
      getinfobyuid(obj).then((res)=>{
        if (res.status == 200) {
          this.userinfo = res.data
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
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.accountmanage
  position: absolute
  width: 100%
  height: 100%
  background: rgb(245,245,245)
  text-align:center
  .heard
    background:#fff
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
  .top
    background:#fff
    padding-top:25px
    padding-bottom:25px
    display:flex
    align-items: center
    flex-direction: column
    border-bottom:10px solid rgb(245,245,245)
    span
      width:13.5vw
      height:13.5vw
      border-radius: 50%
      overflow: hidden
      margin-bottom:10px
      border: 1px solid #ffe1b0
      img
        width:100%
  .list
    background:#fff
    display:flex
    flex-direction:column
    padding:0 15px
    border-bottom:10px solid rgb(245,245,245)
    li
      display:flex
      align-items: center
      justify-content: space-between
      padding:15px 0
      border-bottom:1px solid rgb(229,229,229)
      font-size:15px
      color:rgb(51,51,51)
      span
        display:flex
        align-items: center
      img
        width:5vw
      label
        margin-right:10px
        color:rgb(153,153,153)
    li:last-child
      border-bottom:none
  .btn
    background:#fff
    padding:15px 0
    font-size:15px
    color:rgb(51,51,51)
  .bgPopup
    position: fixed
    z-index: 9999
    width: 100%
    height: 100%
    top: 0
    background-color: rgba(0,0,0,0.8)
    .popup
      display:flex
      flex-direction:column
      margin:0 25px
      border-radius:16px
      overflow:hidden
      transform: translate(0%,100%)
      background:#fff
      span:first-child
        padding:30px 0 54px
        font-size:17px
        font-weight: bold
        border-bottom:1px solid rgb(229,229,229)
      span:last-child
        display:flex
        justify-content: space-between
        align-items:center
        label
          flex:1
          padding:18px 0
        label:last-child
          color:#fff
          background:linear-gradient(to right,rgb(244,170,10),rgb(244,155,10))
</style>
<style scoped>
.accountmanage .bgPopup .popup span:last-child label:last-child {
  background: linear-gradient(-30deg, 
		#376bff 0%, 
		#409afe 100%), 
	linear-gradient(
		#fafafa, 
		#fafafa);
}
</style>
