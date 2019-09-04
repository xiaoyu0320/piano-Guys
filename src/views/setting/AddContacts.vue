<template>
  <div class="addcontacts">
    <div class="heard">
      <label @click="goback"><img src="/images/login/icon_arrow@2x.png" width="36%"/></label>
      <label>添加联系人</label>
      <label style="font-size:14px;">保存</label>
    </div>
    <div class="addcontacts-content">
      <div>收钱人钱包地址<label>(至少填写一个)</label></div>
      <span><label>BTC</label><input type="text" placeholder="钱包地址"/><img src="/images/other/icon_scan@2x.png" width="6%"/></span>
      <span><label>ETC</label><input type="text" placeholder="钱包地址"/><img src="/images/other/icon_scan@2x.png" width="6%"/></span>
      <span><label>ETH</label><input type="text" placeholder="钱包地址"/><img src="/images/other/icon_scan@2x.png" width="6%"/></span>
      <span><label>ASC</label><input type="text" placeholder="钱包地址"/><img src="/images/other/icon_scan@2x.png" width="6%"/></span>
    </div>
    <div class="addcontacts-content" style="border-top:10px solid rgb(245,245,245)">
      <span><label>手机号</label><input type="text" placeholder="请输入您的手机号"/></span>
      <span><label>邮箱</label><input type="text" placeholder="请输入您的邮箱"/></span>
      <span><label>备注</label><input type="text" placeholder="备注"/></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.back()
    }
  },
  components: {}
};
</script>
<style scoped lang="stylus" >
.addcontacts
  text-align:center
  .heard
    font-size:17px
    color:rgb(51,51,51)
    display:flex
    align-items: center
    justify-content: space-between
    height:44px
    label:first-child,label:last-child
      width:18%
      height: 100%
      padding: 0 3%
      display: flex
      align-items: center
  .addcontacts-content
    text-align: left
    display: flex
    flex-direction: column
    padding:0 15px 25px
    span
      display:flex
      align-items: center
      border-bottom:1px solid rgb(229,229,229)
      margin-top:15px
      label
        font-size:15px
        margin-right:15px
        img
          width:100%
    input
      border:none
      outline:none
      flex: 1
      padding:15px 0
</style>