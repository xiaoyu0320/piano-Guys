<!--  -->
<template>
  <div class='fixed-top ' style="margin-top:46px">
   <div style="background:#fff;">
    <van-nav-bar
      :title="$t('message.about')"
      left-arrow
      @click-left="onClickLeft"
      class="fixed help"
    />
    
  </div>
  <div class="about-img">
     <img src="@/assets/logo.png" width="40%;display:block;margin:0 auto"/>
      <h2>{{content.title}}</h2>
      <p>{{content.version2}}</p>
  </div>
  <div class="card-box">
    <div class="card-item">
      <label>{{$t('message.LatestVersion')}}</label>
      <span style="color:#c8c9cc;font-size:14px"> {{content.version2}} </span>
    </div>
  </div>
  <div style="height:20px;background:#FCFCFC"></div> 
  <div class="card-box">
    <div class="card-item">
      <label>Website</label>
      <a :href="content.website" style="color:#4DA2C4;font-size:14px"> {{content.website}}</a>
    </div>
    <div class="card-item">
      <label>Telegram</label>
      <a :href="content.Telegram" style="color:#4DA2C4;font-size:14px"> {{content.Telegram}}</a>
    </div>
    <div class="card-item">
      <label>Twitter</label>
      <a :href="content.Twitter" style="color:#4DA2C4;font-size:14px">{{content.Twitter}}</a>
    </div>
    <div class="card-item">
      <label>Wechat</label>
      <span style="color:#4DA2C4;font-size:14px"> {{content.Wechat}}</span>
    </div>
  </div>
 </div> 
</template>

<script>

import { NavBar, NoticeBar,Skeleton,Toast} from 'vant'
import {admin} from '@/api/wallet'
export default {

  data	() {
    return {
    content:''
    };
  },
  computed: {},
  watch: {

  },
  methods: {
    onClickLeft(){
      this.$router.back()
    }
  },
  created	() {
     admin({
        type:2,
        op:0,
        uid:localStorage['_shop_userId']
      }).then(res=>{
        console.log(res)
        if(res.status==200){
           this.content=JSON.parse(res.data)
           console.log(this.content)
        }else{
           Toast.fail(res.msg)
        }
      })
  },

  mounted	() {
  //  this.$refs.bodyHeight.style.height= window.innerHeight + 'px'
  },
  destroyed	() {}, //	生命周期 - 销毁完成
  activated	() {} //	如果页面有keep-alive缓存功能，这个函数会触发
  }

</script>
<style  scoped>
 .help.van-nav-bar .van-icon {
   color:#333
 }
 .problem{
   padding:15px;
  box-sizing: border-box
 }
 .problem span {
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: 600;
    display: block;
 }
 .problem textarea {
    font-size: 11px;
    color: #999;
    border: none;
    resize: none;
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box
}
.btn {
      background:rgb(229,229,229);
  	  color:#fff;
  	  font-size:15px;
  	  padding:12px 0;
  	  border-radius: 50px;
  	  width: 73.5%;
  	  margin: 0 auto;
}
.help-btn {
  height:44px;
  line-height: 44px;
  width: 75%;
  margin:30px auto;
  display: block
}
.about-img {
  text-align: center;
  background: #FCFCFC;
  padding: 30px 0
}
/* .about-img img{
   width: 60px;
   height: 60px;
   border-radius: 50%;
   overflow: hidden
} */
.about-img h2 {
  font-weight: normal;
  color: #333;
  margin:15px 0 10px
}
.about-img p {
  font-size: 14px;
  color:#999;
}
.card-item {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.card-co1 {
  color: #f7f7f7
}
</style>
