<template>
  <div class="walletmanage">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="100%"/></label>
      <label>{{$t('message.walletmanage')}}</label>
      <label></label> 
    </div>
    <div class="top">
      <span><img :src="userinfo.avatar"/></span>
      <label>{{title}}</label>
    </div>
      <div class="list" v-if="showList" >
        <template v-if="type==1">
    
        </template>
        <template v-if="type==2">
        </template>
        <template v-if="type==3">
          <li @click="goEosresource"><span><img src="/images/other/icon_jiaoyijilu@2x.png"/><label>{{$t('message.resources')}}</label></span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li> 
         <li  @click="goRightManger"><span><img src="/images/other/icon_jiaoyijilu@2x.png"/><label>{{$t('message.right')}}</label></span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li> 

          <li  @click="createAccount"><span><img src="/images/other/icon_wallet@2x.png"/><label>{{$t('message.CreateAnEOSAccount')}}</label></span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
        </template>


       

        <li @click="goExport"><span><img src="/images/other/icon_kee@2x.png"/><label>{{$t('message.exportprivatekey')}}</label></span><span><img src="/images/other/arrow@2x.png" width="100%"/></span></li>
      </div>

       <div v-else class="special">
         <div class="eos" v-if="type==3">
             <van-cell-group>
                <van-cell :title="$t('message.role')" value="active" />
            <!--     <van-cell title="公钥" :value="list.active" /> -->
                <van-cell class="clipboard"   :title="$t('message.PrivateKey')" :value="copyName" @click="getCopy(list.pk,$event)" :data-clipboard-text="copyName" />
              </van-cell-group>
              <van-cell-group >
                <van-cell :title="$t('message.role')" value="owner" />
           <!--      <van-cell title="公钥" :value="list.owner" /> -->
                <van-cell class="clipboard"  :title="$t('message.PrivateKey')" :value="copyName" @click="getCopy(list.pk,$event)" :data-clipboard-text="copyName" />
              </van-cell-group>
         </div>
         <div class="BTC" v-else-if="title=='BTC'||title=='ETH'">
             <van-cell-group>
               
                <van-cell :title="$t('message.publickey')" :value="list.account" />
                <van-cell class="clipboard"   :title="$t('message.PrivateKey')" :value="copyName" @click="getCopy(list.pk,$event)" :data-clipboard-text="copyName" />
              </van-cell-group>

         </div>
        

        
         
       </div>
       <div class="delWallet">
        <van-button size="large" type="danger" @click="delWallet()">删除钱包</van-button>
      </div>
        <van-dialog
          v-model="show"
          title="提示"
          show-confirm-button
          show-cancel-button
          @confirm="getket"
        >
        <div style="margin:0 15px">
           <input type="password" class="password" v-model="password" placeholder="请输入支付密码">
        </div>
        </van-dialog>
        <van-dialog
          v-model="showtick"
          :title="$t('message.Reminder')"
          show-confirm-button
          confirm-button-color="#376bff"
          @confirm="getinfo"
        >
        <div style="padding:20px">
          <div class="import-title"> <img src="/images/other/error.png"/> {{$t('message.NoScreenshot')}} </div>
          <div class="import-info">
            {{$t('message.acquiresyourprivate')}}
          </div>
          <div class="import-title"> <img src="/images/other/error.png"/>  {{$t('message.NoInternetTransmission')}}</div>
          <div class="import-info">
            {{$t('message.PleasedonotuseQQ')}}
          </div>
          <div class="import-title"><img src="/images/other/right.png"/> 离线保存 </div>
          <div class="import-info">
          切勿保存至邮箱、记事本 、网盘、聊天工具等，非常危险
            请抄写下私钥并存放在安全的地方
          </div>
          <div class="import-title"><img src="/images/other/right.png"/> 密码管理工具保存   </div>
            <div class="import-info">
            建议使用密码管理工具管理
          
          </div>
        </div>
        </van-dialog>
     
  </div>
</template>

<script>
import { getinfobyuid,getmykey,managewallet} from '@/api/wallet'
import { Toast,Dialog  } from 'vant'
import Clipboard from "clipboard"
export default {
  data () {
    return {
     
      userinfo: [],
      password:'',
      show:false,
      showtick:false,
      showList:true,
      walletid:localStorage['walletid'],
      type:localStorage['type'],
      list:{},
      clipboard1:'',
      clipboard2:null,
      title:this.$route.query.title,
      copyName:''
    }
  },
  created() {
    console.log(localStorage['walletid'])
    this.type =  this.$route.params.type

    this._getinfobyuid()
    this.$nextTick ( ()=>{
       this.clipboard2 = new Clipboard('.clipboard');
       this.clipboard2.on("success", e => {
        Toast.success("已复制");
        // 释放内存
        
      });
      this.clipboard2.on("error", e => {
        // 不支持复制
        Toast.fail("该浏览器不支持自动复制");
        // 释放内存
      });
      
      
    })
  },
  methods: {
    delWallet(){
      let obj ={}
      obj.op = 2
      obj.id = localStorage['walletid']
      obj.uid = localStorage['_shop_userId']
      Dialog.confirm({
            title: '是否删除钱包',
          
          }).then(() => {
              managewallet(obj).then(res=>{
                if(res.status ==200) {
                  Toast.success('删除成功')
                  
                  localStorage['walletid'] = 3
                  localStorage['type'] = 3
                  this.$router.back()
                }else {
                    Toast.fail(res.msg)
                }
              })
          }).catch(() => {
            
          });
   
    },
    getCopy(content,$event) {
    },
    createAccount(){
      console.log(this.userinfo.eosaccount)
      if (this.userinfo.eosaccount){
        Toast('您已经绑定EOS账号完成，如需绑定更多EOS账户，请使用其他未绑定账号')
        return
      }
      this.$router.push({
        path: '/createAccount'
      })
    },
    goRightManger(){
      // if (!this.userinfo.eosaccount){
      //    Toast('请先创建账户')
      //    return
      // }
     
      this.$router.push({
        path: '/EosRight/'+localStorage['walletid']
      })
    },
    goback() {
      this.$router.push({
          path:'/wallet'
      })
    },
    goEosresource(){
      // if (!this.userinfo.eosaccount){
      //    Toast('请先创建账户')
      //    return
      // }
     this.$router.push({
        path: '/eosResource/'+localStorage['walletid']
        
      })
    },
    goTransactionRecord() { // 交易记录
      this.$router.push({
        path: '/transactionrecord/0'
      })
    },
    goAssetsManage() { // 总资产管理
      console.log('sss')
      this.$router.push({
        path: '/assetsmanage'
      })
    },
    goExport() {
     this.show = true
    },
    getket(){
          let that = this
         getmykey({
         uid:localStorage['_shop_userId'],
         password:this.password,
         walletid:localStorage['walletid']
        }).then(res=>{
          if(res.status == 200) {
            this.show = false
            this.showList =false
            this.copyName = res.data.data.pk
            setTimeout(()=>{
              this.showtick = true
             

              // if(document.querySelector('.clipboard2')){
              //    this.clipboard2 = new Clipboard(document.querySelector('.clipboard2')); 
              //     this.clipboard2.on("success", e => {
              //     Toast.success("已复制");
              //     // 释放内存
              //       this.clipboard2.destroy();
              //   });
              //    this.clipboard2.on("error", e => {
              //     // 不支持复制
              //     Toast.fail("该浏览器不支持自动复制");
              //     // 释放内存
              //      this.clipboard2.destroy();
              //   });
              // }
              // this.clipboard1 = new Clipboard(document.querySelector('.clipboard1')); 
     
      
              //    this.clipboard1.on("success", e => {
              //     Toast.success("已复制");
              //     // 释放内存
              //      this.clipboard1.destroy();
              //   });
              //    this.clipboard1.on("error", e => {
              //     // 不支持复制
              //     Toast.fail("该浏览器不支持自动复制");
              //     // 释放内存
              //      this.clipboard1.destroy();
              //   });
            } , 500)
             this.list= res.data.data

          }else{
            Toast.fail(res.msg)     
          }
        })
    },
    getinfo(){
      this.showtick=false
    },
    _getinfobyuid() {
      let obj = {}
      obj.uid = localStorage['_shop_userId']
      Toast.loading({
        mask: true
      })
      let that = this
      getinfobyuid(obj).then((res)=>{
        if (res.status == 200) {
          that.userinfo = res.data
 
          // this.clipboard2 = new Clipboard(document.querySelector('.clipboard2'));         
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
  components: {
    
  }
};
</script>
<style scoped lang="stylus" >
.walletmanage
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
  .top
    margin-top:25px
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
      border:1px solid #eee
      img
        width:100%
  .list
    display:flex
    flex-direction:column
    padding:0 15px
    li:last-child
      padding-top:5 0px
    li
      display:flex
      align-items: center
      justify-content: space-between
      padding:15px 0
      border-bottom:1px solid rgb(229,229,229)
      font-size:15px
      color:rgb(51,51,51)
      img
        width:5vw
      span:first-child
        display: flex
        align-items: center
        img
          margin-right:5px
  
      
</style>
<style scoped>
 .password {
   height: 30px;
   line-height: 30px;
   padding-left: 20px;
   margin:20px 0;
   border:1px solid #e5e5e5;
   font-size: 14px;
   border-radius: 5px
 }

.import-info {
  text-align: left;
  line-height: 25px;
  font-size: 12px;
  color: #777;
  margin-bottom: 15px
}
.import-title {
  text-align: left;
  position: relative;
  padding-left: 25px;
}
.import-title img {
  position: absolute;
  left: 0;
  width: 20px
}
button.van-button.van-button--default.van-button--large.van-dialog__confirm {
  background-image: linear-gradient(-30deg, 
 #376bff 0%, 
 #409afe 100%), 
 linear-gradient(
 #ffc333, 
 #ffc333);
    background-blend-mode: normal, 
 normal;
 color:#fff
}
.special {
    margin: 10px;
    padding: 15px;
    box-shadow: 0 1px 2px rgba(0,0,0,.06);
    border-radius: 5px;
}
html {
  background: #f5f5f5
}
.delWallet {
  margin: 15px
}
</style>
<style>
.special .van-cell__value span {
  word-break: break-all;
  text-align: left
}
.special .van-cell__title {
     flex: 1;
     text-align: left
}
.special .van-cell__value {
     flex: 2;
     text-align: left
}
</style>

