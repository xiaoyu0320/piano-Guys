<template>
  <div class="assetsmanage">
    <div class="topbg">
      <div class="heard">
      </div>
      <div class="top" @click="goAccountManage">
        <div class="top-content">
          <span :style="{backgroundImage: 'url(' + userinfo.avatar + ')' }"></span>
          <div class="invite">
            <p>{{returnStaus()}}</p>
            <p style="font-size:12px;margin-top:5px">{{$t("message.InvitationCode")}}：{{userinfo.invite_code}}   <span @click.stop="getCopy" class="copybutton copyBtn" :data-clipboard-text="userinfo.invite_code" style="border:0"><img src="/images/other/mycopy.png" style="width:16px;position:relative;top:3px"/></span></p>
          </div>
          
          <div class="home-page">{{$t('message.MyProfile')}}<img src="/images/other/right-icon.png" style="position:relative;right:-5px;width:7px"></div>
        </div>
        <!-- <div class="top-arrow"><img src="/images/other/arrow2@2x.png" width="100%"/></div> -->
      </div>
    </div>

      <ul class="list">
       <li @click="invite()">
          <div class="income">
            <h4>{{$t('message.MyEarning')}} <label>{{$t("message.Invitefriendstoearnprofits")}}</label></h4>
            
          </div>
           <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
       </li>
       <li style="margin-bottom:15px">
         <div class="income__code">
           <div class="income__code--item">
              <h5>{{$t('message.TodayEarning')}}</h5>
              <p>{{Number(userinfo.coinToday).toFixed(2)}}</p>
           </div>
           <div class="income__code--item">
              <h5>{{$t('message.TeamEarning')}}</h5>
              <p>{{Number(userinfo.teamCoin).toFixed(2)}}</p>
           </div>
           <div class="income__code--item">
              <h5>{{$t('message.TodayEarning')}}</h5>
              <p>{{Number(userinfo.coinTotal).toFixed(2)}}</p>
           </div>
         </div>
       </li>
        <li @click="goshare()">
          <span><img src="/images/other/myshare.png"/>{{$t("message.recommend")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
         <li  @click="down()">
          <span><img src="/images/other/mydown.png"/>{{$t("message.appdown")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
        <li @click="rule()">
          <span><img src="/images/other/rule.png"/>{{$t("message.rule")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
        <li @click="goaddress()">
          <span><img src="/images/other/myaddress.png"/>{{$t("message.address")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
         <li @click="gonotice()">
          <span><img src="/images/other/mynews.png"/>{{$t("message.Notification")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
        <!-- <li style="margin-bottom:15px" @click="detail">
          <span><img src="/images/other/icon_wallet@2x@2x.png"/>{{$t("message.Wallet")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li> -->
      
        <li  @click="gohelp()">
          <span><img src="/images/other/myhelp.png"/>{{$t("message.help")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
         <li  @click="goguide()">
          <span><img src="/images/other/guide.png"/>{{$t("message.Instructions")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
        <li  @click="goagement()">
          <span ><img src="/images/other/myxy.png"/>{{$t("message.agreement")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
        <li @click="goabout()">
          <span><img src="/images/other/myabout.png"/>{{$t("message.about")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>
       
        <li @click="system" v-if="userinfo.isadmin == '1'">
          <span><img src="/images/other/mymanage.png"/>{{$t("message.SystemManagement")}}</span>
          <span><img src="/images/other/arrow@2x.png" width="100%"/></span>
        </li>

        <li @click="show=true"><span>{{$t("message.language")}}</span><span><label style="color:#999">{{$t("message.languages")}}</label><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
      
      
      </ul>

        <van-popup v-model="showPop" position="right" >

         <div class="qrcode">
          <div class="qrcode-logo"  :style="{backgroundImage:'url('+ userinfo.avatar+')'}">
            
          </div>
          <div class="qrcode-box "> 
            <span>推荐分享</span>
             
            <p>{{invite_url}}</p>
            <div @click.stop="getCopy" class="copybutton copyBtn" :data-clipboard-text="invite_url">复制</div>
          </div>
          <qrcode-vue style="padding:20%;width:60%" value="http://localhost:8080/#/register?ref=000000"></qrcode-vue>
         </div>
     </van-popup>
      <van-action-sheet v-model="show" :actions="actions" @select="lang" />
      
  </div>
</template>

<script>
import { getinfobyuid,getInviteInfo } from '@/api/wallet'
import setting from '@/setting'
import { Toast, Actionsheet } from 'vant'
import QrcodeVue from 'qrcode.vue'
import Clipboard from "clipboard"
import { userInfo } from 'os';
export default {
  data () {
    return {
      invite_url:'',
      userinfo:{
        coinToday:0,
        teamCoin:0,
        coinTotal:0,
        avatar:setting.avatar
      },
      show: false,
      actions:[{
        name: '简体中文',
        index: 0
      },{ 
        name: 'English',
        index: 1
      }],
      showPop:false,
       clipboard:'',
    
    }
  },
  created() {
    
    this._getinfobyuid()
  },
  mounted () {
    this.$parent.footshow = true
  },
  beforeDestroy() {
    this.$parent.footshow = false
  },
  methods: {
     returnStaus(){
      
       switch(this.userinfo.ascrole) {
          case 0:
              return '艾达链用户'
              break;
          case 1:
              return '普通节点'
              break;
          case 2:
            return '守护节点'
            break;    
           case 3:
            return '超级节点'
            break;      
       
      } 
    },
    goback() {
      this.$router.back()
    },
    detail(){
      this.$router.push({
        path:'/detail'
      })
    },
    system(){
      this.$router.push({
        path:'/system'
      })
    },
    goAccountManage() { // 账户管理
      this.$router.push({
        path: '/accountmanage',
        query:{
          name:this.returnStaus()
        }
      })
    },
    gohelp(){
      this.$router.push({
        path: '/help'
      })
    },
    goabout(){
       this.$router.push({
        path: '/about'
      })
    },
    goagement(){
       this.$router.push({
        path: '/argeement'
      })
    },
    goaddress(){
    
       this.$router.push({
        path: '/address'
      })
    },
    gonotice(){
      this.$router.push({
        path: '/Notice'
      })
    },
    goguide(){
      this.$router.push({
        path: '/guidelist'
      })
    },
    invite(){
      this.$router.push({
        path: '/invite',
        query:{
          code:this.userinfo.invite_code
        }
      })
    },
    down(){
       this.$router.push({
        path: '/download',
        query:{
          code:this.userinfo.invite_code
        }
      })
    },
    rule(){
       this.$router.push({
        path: '/rule',
       
      })
    },
    goshare(){
     
      console.log(this.invite_url)

      this.$router.push({
        path: '/bill',
        query:{
          code:this.userinfo.invite_code
        }
      })
    },
    lang(item) {
      this.$parent.footshow = false
      // if(this.$i18n.locale=='zhCHS') {
      //   this.$i18n.locale='en'   
      // } else {
      //   this.$i18n.locale='zhCHS' 
      // }
      if(item.index=='0') {
        this.$i18n.locale='zhCHS' 
        localStorage['lang'] = 'zhCHS'
      } else {
        this.$i18n.locale='en'   
         localStorage['en'] = 'en'
      }
      setTimeout(()=>{
        this.$parent.footshow = true
        this.show = false 
      },0.001)
    },
   getCopy() {
        let el = document.querySelector('.copybutton');
            this.clipboard = new Clipboard(el);   
            console.log(this.clipboard)

      this.clipboard.on("success", e => {
        Toast.success("已复制");
        // 释放内存
        this.clipboard.destroy();
      });
      this.clipboard.on("error", e => {
        // 不支持复制
        Toast.fail("该浏览器不支持自动复制");
        // 释放内存
        this.clipboard.destroy();
      });
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
          this.userinfo = res.data
          this.invite_url = 'https://wallet.ascchain.com/?ref='+ this.userinfo.invite_code
          Toast.clear()
        } else {
          Toast.fail(res.msg)
            if (res.msg.indexOf("请重新登录") >= 0) {
              localStorage.clear()
              Toast.loading({
                duration: 2000,
                forbidClick: true,
                message: res.msg
              });
             this.$router.replace({
                path: '/'
              })
            }
        }
      })
    },

 
  },
  components: {
    QrcodeVue, 
  }
};
</script>
<style scoped lang="stylus" >
.assetsmanage
  position relative
  width: 100%
  background: rgb(245,245,245)
  text-align:center
  .topbg
    // background:linear-gradient(left top,rgb(244,170,10),rgb(244,155,10))
    background:#4fa2fe
  .heard
    height:44px
  .top
    display:flex
    align-items:center
    justify-content: space-between
    padding:0 15px 25px
    position:relative
    .top-content
      display:flex
      align-items: center
      span
        overflow:hidden
        width:13.4vw
        height:13.4vw
        border-radius: 50%
        border: 2px solid #ffe9bd;
        margin-right:15px;
        background-size:contain
      label
        font-size:15px
        color:#fff
    .top-arrow
      img
        width:18px
  .list
    display:flex
    flex-direction:column
    margin-bottom 50px
    border-bottom:10px solid rgb(245,245,245)
    li

      background:#fff
      display:flex
      align-items: center
      justify-content: space-between
      padding:15px
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
        color:rgb(51,51,51)
      span:first-child
        img
          margin-right:15px
    li:last-child
      border-bottom:none
</style>
<style scoped>

  .van-popup--right {
    right: 15%;
    border-radius: 15px;
    width: 70%;
  }
  /* .money .van-icon {
    font-size: 18px
  } */
  .copyBtn{
    width: 60px;
    height: 22px;
    line-height: 22px;
    border-radius: 20px;
    border: 1px solid;
    margin: 0 auto;
    font-size: 12px;
  }
 
  .qrcode-box {
    color: #fff;
    padding:30px 15px 10px;
    position: relative;
    border-radius: 15px 15px 0 0;
    background: #376bff
  }
  .assetsmanage .qrcode p {
    margin: 10px;
    font-size: 12px;
    overflow: hidden;
  }
  .qrcode-logo {
    width: 45px;
    height: 45px;
    position: absolute;
    z-index: 2001;
    left: 50%;
    margin-left: -22px;
    top:-25px;
    border-radius: 6px;
    background-size:cover
  }
  .van-popup {
    overflow-y: initial!important
  }
  .van-popup--right {
    height:  auto;
  }
  .income h4{
   text-align: left;
   font-size: 15px;
   font-weight:normal
  }
  .income h4 label {
    font-size:12px;
    color:#666;
    opacity: 0.6;
  }
  .income p {
    color: #666;
    font-size: 14px
  }
  .income__code {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .income__code--item {
    flex: 1;
  }
  .income__code--item h5 {
    color: #999;
    margin-bottom: 5px;
}
 .income__code--item p {
    color: #4ca1fe;
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
}
.invite p {
  color:#fff;
  text-align: left
}
.home-page {
  width: 75px;
	height: 18px;
  line-height:18px;
	background-color: #ffffff;
	border-radius: 18px;
  font-size:12px;
  color:#3872ff;
  padding: 2px 5px;
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>

