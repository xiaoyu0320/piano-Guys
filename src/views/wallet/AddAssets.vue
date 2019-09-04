<template>
  <div class="add">
      <div class="heard spceal">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="36%"/></label>
      <label>
         <van-search placeholder="请输入搜索关键词" v-model="value" background="#fff" />
      </label>
      <label style="font-size:14px;" @click="manager">管理</label>
    </div>
    
    <div class="add__group" v-if="show">
      <div class="add__title">我的资产</div>
      <div class="add__group--cell">
         <div class="add--cell-logo">
            <img  src="http://cdnpic.ezoonet.com/20190221/5242b995f1bf939065f3dd15b89ac60d.png" width="30px">
         </div>
         <div class="add--cell-info">
           <h3>BTC</h3>
           <p>BTC</p>
           <p style="color:#f1f1f1;margin:0"></p>
          <div class="add--cell-switch" >
           <van-switch v-model="checked"  size="24px"/>
         </div>
         </div>
      </div>
       <div class="add__group--cell">
         <div class="add--cell-logo">
            <img  src="http://cdnpic.ezoonet.com/20190221/5242b995f1bf939065f3dd15b89ac60d.png" width="30px">
         </div>
         <div class="add--cell-info">
           <h3>ETH</h3>
           <p>ETH</p>
           <p style="color:#f1f1f1;margin:0"></p>
          <div class="add--cell-switch" >
           <van-switch v-model="checked"  size="24px"/>
         </div>
         </div>
      </div>
       <div class="add__group--cell">
         <div class="add--cell-logo">
            <img  src="http://cdnpic.ezoonet.com/20190221/5242b995f1bf939065f3dd15b89ac60d.png" width="30px">
         </div>
         <div class="add--cell-info">
           <h3>EOS</h3>
           <p>EOS</p>
           <p style="color:#f1f1f1;margin:0"></p>
          <div class="add--cell-switch" >
           <van-switch v-model="checked"  size="24px"/>
         </div>
         </div>
      </div>
    </div>
    <div class="anopen" v-else>
       暂未开放
    </div>
    
    
  </div>
</template>

<script>
import { asc2eth } from '@/api/wallet'
import { Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      checked: true,
      show:true
    }
  },
  created() {
  },
  methods: {
    goback() {
      this.$router.back()
    },
    onSearch(){

    },
    manager(){
     this.show = false
    }
  },

  components: {}
};
</script>

<style scope>
.add__title {
  font-size: 16px;
  color: #999;
  padding: 20px
}
.add__group--cell{
 padding: 20px 20px 0 80px;
 position: relative;
}
.add--cell-logo {
  position: absolute;
  left: 15px;
  top: 50%;
  margin-top:-20px;
  width: 50px;
  height:50px;
  line-height: 70px;
  border-radius: 50%;
  border:1px solid #fafafa;
  text-align: center;
  
}
.add--cell-logo {
  display: inline-block
}
.add--cell-info {
  position: relative;
  padding-right: 60px;
  border-bottom: 1px solid #fafafa;
  padding-bottom: 15px
}
.add--cell-switch {
  position: absolute;
  right:0;
  top: 50%;
  margin-top: -16px
}
.add--cell-info h3 {
  font-size: 16px;
  font-weight: normal;
}
.add--cell-info p {
  font-size: 14px;
  color: #888;
  margin:5px 0
}
.spceal .van-cell {
  background: #f7f8fA
}
.anopen{
   text-align: center;
    font-size: 16px;
    color: #999;
    padding: 60px 0;
}
</style>
<style scoped lang="stylus" >
   .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:12%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .login-content
    text-align: left
    display: flex
    padding:0 25px
    margin-top:25px
    span
      display:flex
      flex-direction:column
      justify-content: center
      align-items: center
      border-bottom:1px solid rgb(229,229,229)
      margin-top:15px
      label
        width:100%
        text-align: center
        font-size:15px
        color:rgb(51,51,51)
        margin-bottom:10px
        img
          width:100%
</style>